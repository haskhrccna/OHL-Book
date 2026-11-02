import glob,re,subprocess,sys,os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
R=lambda p:open(p,encoding='utf8').read()
chs=sorted(glob.glob('src/ch[0-9][0-9].js'))
tpl=''
for f in chs:
    n=int(f[-5:-3]); h=f[:-3]+'.html'
    if os.path.exists(h): tpl+=f'<template id="tpl-{n}">{R(h)}</template>\n'
for f in ['src/engine.js']+chs:
    r=subprocess.run(['node','--check',f],capture_output=True,text=True)
    if r.returncode: sys.exit(f+r.stderr)
js=R('src/engine.js')+''.join(R(f) for f in chs)+'\nOHL.start();\n'
if '</script' in js: sys.exit('script close inside js')
head='''<title>Overhead Lines Study Route</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;700&family=IBM+Plex+Mono:wght@400;500&family=IBM+Plex+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap">
'''
out=head+'<style>\n'+R('src/shell.css')+'</style>\n'+R('src/shell.html')+tpl+'<script>\n'+js+'</script>\n'
open('ohl-study.html','w',encoding='utf8').write(out)
open('test.html','w',encoding='utf8').write('<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0}</style></head><body>'+out+'</body></html>')
# Standalone page for GitHub Pages: the artifact host adds this skeleton itself, Pages does not.
page_head=head.replace('<meta name="claude:viewport-fit-sides" content="cover">\n','')
os.makedirs('dist',exist_ok=True)
open('dist/index.html','w',encoding='utf8').write('<!doctype html>\n<html lang="en">\n<head>\n<meta charset="utf-8">\n<meta name="viewport" content="width=device-width,initial-scale=1">\n'+page_head+'<style>\nbody{margin:0}\n'+R('src/shell.css')+'</style>\n</head>\n<body>\n'+R('src/shell.html')+tpl+'<script>\n'+js+'</script>\n</body>\n</html>\n')
print('built',len(chs),'chapters',len(out)//1024,'KB')
