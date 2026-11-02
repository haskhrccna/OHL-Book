import os,sys,subprocess,glob,re
# usage: pg.py CH pattern... -> pdf page in chapter file for each pattern
ch=sys.argv[1].zfill(2); f=glob.glob(os.path.join(os.environ.get('OHL_CHAPTERS_DIR','.'),f'{ch}-*.pdf'))[0]
t=subprocess.run(['pdftotext','-layout',f,'-'],capture_output=True,text=True).stdout.split('\f')
def printed(pg):
    head=[l.strip() for l in pg.split('\n') if l.strip()][:2]+[l.strip() for l in pg.split('\n') if l.strip()][-1:]
    for h in head:
        m=re.search(r'(?:^(\d{1,3})\s+\d+[ .])|(?:\s(\d{1,3})$)',h)
        if m: return m[1] or m[2]
    return '?'
for pat in sys.argv[2:]:
    print(pat,[(i+1,printed(p)) for i,p in enumerate(t) if re.search(pat,p)][:6])
