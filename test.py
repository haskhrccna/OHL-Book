import asyncio,glob,os,sys,json
from playwright.async_api import async_playwright
want=[int(a) for a in sys.argv[1:]]
JUNK=['NaN','undefined','Infinity','null','[object']
async def quiz(pg,n):
    Q=await pg.evaluate(f"OHL.CH[{n}].q.map(q=>({{t:q.t,q:q.q,a:q.a,pairs:q.pairs||null}}))")
    for i in range(len(Q)):
        idx=await pg.evaluate(f"(()=>{{const h=document.querySelector('#quizRoot h2').textContent,d=document.createElement('div');return OHL.CH[{n}].q.findIndex(q=>{{d.innerHTML=q.q;return d.textContent===h}})}})()")
        if idx<0: print('NOMATCH',repr(await pg.inner_text('#quizRoot h2')),i,len(Q))
        q=Q[idx]
        if q['t'] in 'sm':
            for v in q['a']: await pg.check(f'[name=qo][value="{v}"]')
        elif q['t']=='t': await pg.check(f'[name=qo][value="{0 if q["a"] else 1}"]')
        elif q['t']=='n': await pg.fill('#qn',str(q['a']))
        else:
            for j,pr in enumerate(q['pairs']): await pg.select_option(f'#qx{j}',label=pr[1])
        await pg.click('#qc'); await pg.click('#qc')
    return await pg.inner_text('#quizRoot h2')
async def main():
    async with async_playwright() as p:
        exe=sorted(glob.glob(os.path.expanduser('~/.cache/ms-playwright/chromium-*/chrome-linux*/chrome')))[-1]
        br=await p.chromium.launch(executable_path=exe); fails=0
        for name,w,sch in [('desk',1040,'light'),('phone',400,'dark')]:
            c=await br.new_context(viewport={'width':w,'height':900},color_scheme=sch); pg=await c.new_page(); errs=[]
            pg.on('pageerror',lambda e:errs.append(str(e)))
            pg.on('console',lambda m:errs.append(m.text) if m.type=='error' and 'font' not in m.text.lower() and 'ERR_' not in m.text else None)
            await pg.goto('file://'+os.getcwd()+'/test.html'); await pg.wait_for_timeout(300)
            built=await pg.evaluate("Object.keys(OHL.CH).map(Number)")
            for m in built:
                await pg.evaluate(f"location.hash='ch{m}/summary'"); await pg.wait_for_timeout(40)
                if not await pg.evaluate("document.querySelectorAll('#p-summary details.sec').length"): print('BLANK',m); fails+=1
            for n in (want or built):
                await pg.evaluate(f"location.hash='ch{n}/summary'"); await pg.wait_for_timeout(120)
                # exercise every control
                await pg.evaluate("""()=>{document.querySelectorAll('#p-summary input[type=range]').forEach(r=>{for(const f of [0,1,.5]){r.value=+r.min+(r.max-r.min)*f;r.dispatchEvent(new Event('input',{bubbles:true}))}});
                 document.querySelectorAll('#p-summary select').forEach(s=>{for(let i=0;i<s.options.length;i++){s.selectedIndex=i;s.dispatchEvent(new Event('change',{bubbles:true}))}});
                 document.querySelectorAll('#p-summary .steps button,#p-summary button').forEach(b=>{if(b.id!=='collapse')b.click()})}""")
                await pg.wait_for_timeout(60)
                txt=await pg.inner_text('#p-summary'); junk=[j for j in JUNK if j in txt]
                svg=await pg.evaluate("[...document.querySelectorAll('#p-summary svg')].filter(s=>/NaN|undefined/.test(s.innerHTML)).length")
                empty=await pg.evaluate("[...document.querySelectorAll('#p-summary .out')].filter(e=>!e.hidden&&!e.textContent.trim()).map(e=>e.id)")
                if empty: print('EMPTY',empty); junk=junk+['empty']
                o=await pg.evaluate("document.documentElement.scrollWidth-document.documentElement.clientWidth")
                widgets=await pg.evaluate("document.querySelectorAll('#p-summary svg').length")
                info=f'{name} ch{n}: overflow {o}, svgs {widgets}, junk {junk}, badsvg {svg}'
                if name=='desk':
                    await pg.screenshot(path=f'shots/c{n}.png',full_page=True)
                    await pg.evaluate(f"location.hash='ch{n}/study'"); await pg.wait_for_timeout(60)
                    await pg.click('.flip'); await pg.click('.flip button[data-m=again]'); await pg.click('#wb0')
                    await pg.evaluate(f"location.hash='ch{n}/quiz'"); await pg.wait_for_timeout(60)
                    await pg.click('#qc'); e=await pg.inner_text('#fb')
                    info+=' | '+await quiz(pg,n)+' | empty: '+('ok' if 'first' in e else 'BAD')
                else:
                    await pg.screenshot(path=f'shots/p{n}.png',full_page=True)
                    for t in ['study','quiz']:
                        await pg.evaluate(f"location.hash='ch{n}/{t}'"); await pg.wait_for_timeout(60)
                        o2=await pg.evaluate("document.documentElement.scrollWidth-document.documentElement.clientWidth"); o=max(o,o2)
                    info+=f' maxoverflow {o}'
                if o>0 or junk or svg: fails+=1
                print(info)
            if errs: fails+=1
            print('errors',errs[:6])
        print('FAILS',fails); await br.close()
asyncio.run(main())
