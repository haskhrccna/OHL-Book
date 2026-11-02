OHL.add({n:1,lead:'How a utility decides that a line is needed, what voltage it should run at, what it should look like, and whether it should be a line at all. Printed pages 1 to 23.',
init:function(K){var $=K.$,fmt=K.fmt,log10=K.log10,checks=K.checks;
/* 1.1 STAGES */
var STG=[
 ["Long-term planning","First system evaluations. The line exists only as a need in a future network.",""],
 ["Medium-term planning","Further planning steps refine the need into a definite reference programme.",""],
 ["Performance studies","Reactive compensation, load flows and stability, transposition, switching surges, reliability.",""],
 ["Basic and detailed design","The line owner designs the line in increasing detail, with all associated activities.",""],
 ["Rights-of-way and approvals","Rights-of-way established, environmental impact studies approved, landowners indemnified. Survey and construction are not legal until this is done.",""],
 ["Survey and construction","Now legally able to start, and carried through to completion.",""],
 ["Commissioning","Commissioning and start-up of operation end the process.",""]];
STG.forEach(function(s,i){var b=document.createElement("button");b.className="ghost";b.id="st"+i;b.textContent=(i+1)+". "+s[0];b.onclick=function(){setS(i)};$("stages").appendChild(b)});
function setS(i){STG.forEach(function(s,j){$("st"+j).setAttribute("aria-pressed",j===i)});$("stageOut").innerHTML="<b>"+STG[i][0]+"</b><span>"+STG[i][1]+"</span>"}
setS(4);

/* HORIZONS */
(function(){
 var W=640,L=120,sc=(W-L-20)/30,x=function(y){return L+y*sc},h='<svg class="c" viewBox="0 0 '+W+' 134" role="img" aria-label="Short-term planning below 3 years, medium-term 10 to 15 years, long-term 15 to 30 years">';
 [0,5,10,15,20,25,30].forEach(function(y){h+='<line class="gr" x1="'+x(y)+'" x2="'+x(y)+'" y1="4" y2="106"/><text x="'+x(y)+'" y="122" text-anchor="middle">'+y+'</text>'});
 [["Short-term",0,3,"--v4"],["Medium-term",10,15,"--v2"],["Long-term",15,30,"--v1"]].forEach(function(r,i){var y=10+i*32;
  h+='<text class="i" x="0" y="'+(y+15)+'">'+r[0]+'</text><rect x="'+x(r[1])+'" y="'+y+'" width="'+(x(r[2])-x(r[1]))+'" height="20" rx="2" fill="var('+r[3]+')"/>'});
 h+='<text x="'+(W-20)+'" y="133" text-anchor="end">years ahead</text></svg>';$("hz").innerHTML=h;
})();

/* FUNNEL */
(function(){
 var S=[["Data","Market forecast, generation, existing network, preferred routes"],["Alternatives","Simplified technical and economic screening"],["Electrical studies","Flow, stability, voltage, conductors, corona, insulation"],["Economic evaluation","Present worth, sensitivity, cost-benefit"]];
 var W=640,H=236,h='<svg class="c" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Four planning steps narrowing to one chosen alternative">';
 S.forEach(function(s,i){var y=4+i*52,w1=W-i*70,w2=W-(i+1)*70,c=W/2;
  h+='<path d="M'+(c-w1/2)+' '+y+' L'+(c+w1/2)+' '+y+' L'+(c+w2/2)+' '+(y+46)+' L'+(c-w2/2)+' '+(y+46)+'Z" fill="var(--surface)" stroke="var(--accent)"/>';
  h+='<text class="b" x="'+c+'" y="'+(y+20)+'" text-anchor="middle" style="font-size:14px">'+s[0]+'</text>';
  h+='<text x="'+c+'" y="'+(y+37)+'" text-anchor="middle" style="font-size:'+(i>1?9.5:10.5)+'px">'+s[1]+'</text>'});
 h+='<text class="b" x="'+W/2+'" y="226" text-anchor="middle" style="font-size:14px;fill:var(--live)">Optimum alternative</text></svg>';$("funnel").innerHTML=h;
})();

/* N-1 */
var n1={on:[true,true,true]};
[0,1,2].forEach(function(i){var b=document.createElement("button");b.className="ghost";b.id="n1b"+i;b.textContent="Trip circuit "+(i+1);b.onclick=function(){n1.on[i]=!n1.on[i];drawN1()};$("n1btn").appendChild(b)});
$("n1load").oninput=drawN1;
function drawN1(){
 var load=+$("n1load").value,rate=500,cnt=n1.on.filter(Boolean).length,flow=cnt?load/cnt:0,pc=flow/rate*100;
 $("n1v").textContent=load+" MVA";
 var W=640,h='<svg class="c" viewBox="0 0 '+W+' 160" role="img" aria-label="Source feeding a load through three parallel circuits">';
 h+='<rect x="10" y="44" width="80" height="72" rx="3" fill="var(--surface)" stroke="var(--ink)"/><text class="i" x="50" y="85" text-anchor="middle">Source</text>';
 h+='<rect x="550" y="44" width="80" height="72" rx="3" fill="var(--surface)" stroke="var(--ink)"/><text class="i" x="590" y="85" text-anchor="middle">'+load+'</text><text x="590" y="100" text-anchor="middle">MVA</text>';
 [30,80,130].forEach(function(y,i){var on=n1.on[i],over=on&&pc>100,c=!on?"var(--rule)":over?"var(--bad)":"var(--accent)";
  h+='<path d="M90 '+(y<80?60:y>80?100:80)+' L140 '+y+' H500 L550 '+(y<80?60:y>80?100:80)+'" fill="none" stroke="'+c+'" stroke-width="'+(on?3:1.5)+'"'+(on?' class="flow"':'')+'/>';
  h+='<rect x="264" y="'+(y-12)+'" width="112" height="24" rx="3" fill="var(--bg)" stroke="'+c+'"/><text class="i" x="320" y="'+(y+4)+'" text-anchor="middle">'+(on?fmt(pc)+" %":"tripped")+'</text>'});
 $("n1").innerHTML=h+'</svg>';
 [0,1,2].forEach(function(i){var b=$("n1b"+i);b.setAttribute("aria-pressed",!n1.on[i]);b.textContent=(n1.on[i]?"Trip":"Restore")+" circuit "+(i+1)});
 var secure=2*rate,ok=load<=secure,now=cnt?(pc<=100?'<span class="good">Within rating now</span>':'<span class="bad">Overloaded now</span>'):'<span class="bad">Load lost</span>';
 $("n1out").innerHTML=now+'<span>(n−1) limit with all three in service: '+secure+' MVA. '+(ok?'<span class="good">This load passes.</span>':'<span class="bad">This load fails: losing one circuit overloads the others.</span>')+'</span>';
}
drawN1();

/* LIMITS */
(function(){
 var R=[["Transformer, normal",100,"no overload"],["After line or unit loss",120,"20 % overload"],["After transformer loss",140,"40 % overload"],["Overvoltage, saturable equip.",140,"140 %"],["Overvoltage, other points",150,"150 %"]];
 var W=640,L=200,sc=(W-L-90)/160,h='<svg class="c" viewBox="0 0 '+W+' 170" role="img" aria-label="Allowed percentages for transformer load and temporary overvoltage">';
 R.forEach(function(r,i){var y=6+i*32,c=i<3?"--v1":"--v4";
  h+='<text class="i" x="0" y="'+(y+15)+'" style="font-size:11.5px">'+r[0]+'</text><rect x="'+L+'" y="'+y+'" width="'+r[1]*sc+'" height="20" rx="2" fill="var('+c+')"/><text class="b" x="'+(L+r[1]*sc+6)+'" y="'+(y+15)+'">'+r[2]+'</text>'});
 h+='<line x1="'+(L+100*sc)+'" x2="'+(L+100*sc)+'" y1="2" y2="166" stroke="var(--ink)" stroke-dasharray="3 3"/></svg>';
 $("limits").innerHTML=h+'<p class="small mono">Bus voltage: 0.95 to 1.05 p.u.</p>';
})();

/* HISTORY */
var HIST=[[1891,15,"Lauffen to Frankfurt, Germany","First three-phase transmission"],[1911,110,"Lauchhammer to Riesa, Germany","110 kV line"],[1929,220,"Brauweiler to Hoheneck, Germany","220 kV"],[1932,287,"Boulder Dam to Los Angeles, USA","287 kV"],[1952,380,"Harspranget to Halsberg, Sweden","380 kV"],[1965,725,"Manicouagan to Montreal, Canada","725 kV in the text; see the discrepancy note at the end of this tab"],[1985,1200,"Ekibastuz to Kokchetav, former Soviet Union","1200 kV, with no plans for AC above this"]];
function drawHist(sel){
 var W=640,H=250,L=52,R=20,T=10,B=30,x=function(y){return L+(y-1885)/(2000-1885)*(W-L-R)},y=function(k){return H-B-k/1400*(H-B-T)},h='<svg class="c" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Step chart of the highest AC transmission voltage from 1891 to 1985">';
 [0,200,400,600,800,1000,1200,1400].forEach(function(k){h+='<line class="gr" x1="'+L+'" x2="'+(W-R)+'" y1="'+y(k)+'" y2="'+y(k)+'"/><text x="'+(L-6)+'" y="'+(y(k)+4)+'" text-anchor="end">'+k+'</text>'});
 [1900,1920,1940,1960,1980,2000].forEach(function(t){h+='<text x="'+x(t)+'" y="'+(H-10)+'" text-anchor="middle">'+t+'</text>'});
 var d="M"+x(1891)+" "+y(15);HIST.slice(1).forEach(function(p,i){d+=" H"+x(p[0])+" V"+y(p[1])});d+=" H"+x(2000);
 h+='<path d="'+d+'" fill="none" stroke="var(--accent)" stroke-width="2.5"/>';
 HIST.forEach(function(p,i){var on=i===sel;h+='<g tabindex="0" role="button" aria-label="'+p[0]+', '+p[1]+' kV" data-h="'+i+'" style="cursor:pointer"><circle cx="'+x(p[0])+'" cy="'+y(p[1])+'" r="14" fill="transparent"/><circle cx="'+x(p[0])+'" cy="'+y(p[1])+'" r="'+(on?7:5)+'" fill="var(--'+(on?"live":"accent")+')"/></g>'});
 $("hist").innerHTML=h+'<text transform="translate(12,'+(H/2)+') rotate(-90)" text-anchor="middle">kV</text></svg>';
 var p=HIST[sel];$("histOut").innerHTML="<b>"+p[0]+" · "+p[1]+" kV</b><span>"+p[2]+". "+p[3]+".</span>";
}
$("hist").addEventListener("click",function(e){var g=e.target.closest("[data-h]");if(g)drawHist(+g.dataset.h)});
$("hist").addEventListener("keydown",function(e){var g=e.target.closest("[data-h]");if(g&&(e.key==="Enter"||e.key===" ")){e.preventDefault();drawHist(+g.dataset.h)}});
drawHist(0);

/* CLASS */
var CL=[["LV",0.1,1,"--v1"],["MV",1,45,"--v2"],["HV",45,300,"--v3"],["EHV",300,750,"--v4"],["UHV",800,3000,"--v5"]];
function drawCls(){
 var v=+$("clsv").value||0,W=420,m=8,x=function(k){return m+(log10(k)+1)/(log10(3000)+1)*(W-2*m)},h='<svg class="c" viewBox="0 0 '+W+' 66" role="img" aria-label="Voltage classes on a logarithmic scale">';
 CL.forEach(function(c){h+='<rect x="'+x(c[1])+'" y="14" width="'+(x(c[2])-x(c[1]))+'" height="24" fill="var('+c[3]+')"/><text class="b" x="'+(x(c[1])+x(c[2]))/2+'" y="54" text-anchor="middle">'+c[0]+'</text>'});
 if(v>=0.1&&v<=3000)h+='<path d="M'+x(v)+' 6 V44" stroke="var(--ink)" stroke-width="2.5"/>';
 $("cls").innerHTML=h+'</svg>';
 var r=v<1?"Low voltage (LV)":v<=45?"Medium voltage (MV)":v<=300?"High voltage (HV)":v<=750?"Extra-high voltage (EHV)":v<=800?"Between EHV and UHV in the book's list":"Ultra-high voltage (UHV)";
 $("clsOut").innerHTML="<b>"+fmt(v,v<1?2:0)+" kV</b><span>"+r+"</span>";
}
$("clsv").oninput=drawCls;drawCls();
function drawSq(){var a=+$("sqa").value,b=+$("sqb").value;$("sqOut").innerHTML=a>0&&b>0?'<span class="big">× '+fmt(b*b/(a*a),2)+'</span><span>('+b+' / '+a+')²</span>':'<span>Enter two voltages above zero.</span>'}
$("sqa").oninput=drawSq;$("sqb").oninput=drawSq;drawSq();

/* FIGURE 1.2 */
var P0=[138,319];
var BANDS=[
 {k:"110 kV",c:"--v1",p:[[138,592],[379,592],[379,331],[306,264],[195,264],P0],lx:330,ly:582},
 {k:"220 kV",c:"--v2",p:[[138,457],[450,457],[450,268],[374,198],[265,198],P0],lx:394,ly:448},
 {k:"380 kV",c:"--v3",p:[[138,354],[497,354],[497,213],[427,145],[320,145],P0],lx:440,ly:345},
 {k:"500 kV",c:"--v4",p:[[138,320],[531,320],[531,182],[461,114],[353,114],P0],lx:474,ly:311},
 {k:"700 kV",c:"--v5",p:[[228,234],[564,234],[564,148],[495,81],[388,81]],lx:506,ly:226}];
var pxX=function(l){return 138+225*log10(l/10)},pxY=function(p){return 620-229.5*log10(p/10)};
var selS={p:Math.pow(10,2.7),l:Math.pow(10,2.3)};
function inPoly(x,y,P){var c=false;for(var i=0,j=P.length-1;i<P.length;j=i++){var a=P[i],b=P[j];if((a[1]>y)!==(b[1]>y)&&x<(b[0]-a[0])*(y-a[1])/(b[1]-a[1])+a[0])c=!c}return c}
function drawSel(){
 var X=pxX(selS.l),Y=pxY(selS.p),hit=BANDS.filter(function(b){return inPoly(X,Y,b.p)});
 var h='<svg class="c" id="selSvg" viewBox="84 60 500 590" role="img" aria-label="Log-log chart of power per circuit against length with a region for each voltage" style="cursor:crosshair">';
 [10,20,50,100,200,500,1000,2000].forEach(function(p){h+='<line class="gr" x1="138" x2="570" y1="'+pxY(p)+'" y2="'+pxY(p)+'"/><text x="130" y="'+(pxY(p)+4)+'" text-anchor="end">'+p+'</text>'});
 [10,20,50,100,200,500].forEach(function(l){h+='<line class="gr" x1="'+pxX(l)+'" x2="'+pxX(l)+'" y1="70" y2="620"/><text x="'+pxX(l)+'" y="636" text-anchor="middle">'+l+'</text>'});
 BANDS.forEach(function(b){var on=hit.indexOf(b)>=0;h+='<polygon points="'+b.p.map(function(q){return q.join(",")}).join(" ")+'" fill="var('+b.c+')" fill-opacity="'+(on?.2:.05)+'" stroke="var('+b.c+')" stroke-width="'+(on?2.5:1.25)+'"/>';
  h+='<text x="'+b.lx+'" y="'+b.ly+'" style="fill:var('+b.c+');font-weight:500">'+b.k+'</text>'});
 h+='<circle cx="'+X+'" cy="'+Y+'" r="7" fill="var(--ink)" stroke="var(--bg)" stroke-width="2"/>';
 h+='<text x="560" y="648" text-anchor="end">km</text><text x="90" y="72">MW</text></svg>';
 $("sel").innerHTML=h;
 $("selPv").textContent=fmt(selS.p)+" MW";$("selLv").textContent=fmt(selS.l)+" km";
 $("selOut").innerHTML=hit.length?'<span>'+fmt(selS.p)+' MW over '+fmt(selS.l)+' km</span><b class="big" style="font-family:var(--display)">Candidates: '+hit.map(function(b){return b.k}).join(", ")+'</b>':'<span>'+fmt(selS.p)+' MW over '+fmt(selS.l)+' km</span><b>Outside every band. Too much power for the distance, or beyond the range of the figure.</b>';
}
$("selP").oninput=function(){selS.p=Math.pow(10,+this.value);drawSel()};
$("selL").oninput=function(){selS.l=Math.pow(10,+this.value);drawSel()};
$("sel").addEventListener("click",function(e){var s=$("selSvg"),r=s.getBoundingClientRect(),X=84+(e.clientX-r.left)/r.width*500,Y=60+(e.clientY-r.top)/r.height*590;
 var l=10*Math.pow(10,(X-138)/225),p=10*Math.pow(10,(620-Y)/229.5);selS.l=Math.min(708,Math.max(10,l));selS.p=Math.min(2512,Math.max(10,p));$("selP").value=log10(selS.p);$("selL").value=log10(selS.l);drawSel()});
drawSel();

/* TABLE 1.3 */
(function(){
 var D=[[20,7,null],[110,120,32],[220,340,135],[380,1380,500],[500,2470,910],[750,5690,2170]];
 var W=640,H=250,L=56,B=34,T=24,y=function(v){return H-B-(log10(v)/log10(10000))*(H-B-T)},bw=30,h='<svg class="c" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Thermal limit and surge impedance load by rated voltage">';
 [1,10,100,1000,10000].forEach(function(v){h+='<line class="gr" x1="'+L+'" x2="'+W+'" y1="'+y(v)+'" y2="'+y(v)+'"/><text x="'+(L-6)+'" y="'+(y(v)+4)+'" text-anchor="end">'+fmt(v)+'</text>'});
 D.forEach(function(d,i){var x=L+16+i*96;
  h+='<rect x="'+x+'" y="'+y(d[1])+'" width="'+bw+'" height="'+(y(1)-y(d[1]))+'" fill="var(--v4)"/><text class="i" x="'+(x+bw/2)+'" y="'+(y(d[1])-5)+'" text-anchor="middle" style="font-size:11px">'+fmt(d[1])+'</text>';
  if(d[2]){h+='<rect x="'+(x+bw+2)+'" y="'+y(d[2])+'" width="'+bw+'" height="'+(y(1)-y(d[2]))+'" fill="var(--v1)"/><text class="i" x="'+(x+bw*1.5+2)+'" y="'+(y(d[2])-5)+'" text-anchor="middle" style="font-size:11px">'+fmt(d[2])+'</text>'}
  h+='<text x="'+(x+bw)+'" y="'+(H-14)+'" text-anchor="middle">'+d[0]+' kV</text>'});
 h+='<rect x="'+L+'" y="2" width="12" height="12" fill="var(--v4)"/><text class="i" x="'+(L+18)+'" y="12">Thermal limit, MVA</text><rect x="'+(L+190)+'" y="2" width="12" height="12" fill="var(--v1)"/><text class="i" x="'+(L+208)+'" y="12">Surge impedance load, MW</text></svg>';
 $("t13").innerHTML=h;
})();

/* SHARE */
(function(){
 var W=320,cx=86,cy=86,r=62,C=2*Math.PI*r,mid=.325;
 var h='<svg class="c" viewBox="0 0 '+W+' 172" role="img" aria-label="Conductors make up 30 to 35 percent of line investment"><circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="var(--rule)" stroke-width="24"/><circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="none" stroke="var(--accent)" stroke-width="24" stroke-dasharray="'+C*mid+' '+C+'" transform="rotate(-90 '+cx+' '+cy+')"/>';
 h+='<text class="b" x="'+cx+'" y="'+(cy+6)+'" text-anchor="middle" style="font-size:18px">30–35 %</text><text class="i" x="180" y="78">Conductors</text><text x="180" y="96">of total line</text><text x="180" y="112">investment</text></svg>';
 $("share").innerHTML=h;
})();

/* TOWERS */
var TW=[
 ["Single circuit","Fig. 1.4 a","Preferred in Central Europe for single-circuit lines because of the narrower right-of-way.",{h:1,arms:[[-34,.28],[34,.28],[-46,.5]]}],
 ["Horizontal","Fig. 1.4 b","Very often adopted in other regions. Relatively low foundation loads.",{h:.72,arms:[[-70,.3],[0,.3],[70,.3]]}],
 ["Danube","Fig. 1.4 d, 1.5","Double circuit 110, 220 and 380 kV in Europe. A compromise between right-of-way width, tower height and investment, with enough lightning protection.",{h:.9,arms:[[-30,.2],[30,.2],[-58,.45],[-28,.45],[28,.45],[58,.45]]}],
 ["Vertical","Fig. 1.4 e","Narrow right-of-way, but a taller tower and a more visible line.",{h:1.1,arms:[[-32,.16],[32,.16],[-36,.33],[36,.33],[-32,.5],[32,.5]]}],
 ["Multi-circuit","Fig. 1.4 f to h, 1.6","Four or more circuits, used where rights-of-way are scarce, as in Central Europe and Japan. Operationally and economically harder, with extensive and costly construction.",{h:1.25,arms:[[-30,.13],[30,.13],[-44,.28],[-22,.28],[22,.28],[44,.28],[-44,.42],[-22,.42],[22,.42],[44,.42],[-60,.57],[-30,.57],[30,.57],[60,.57]]}],
 ["Guyed V","Fig. 1.7, 1.8","For 500 kV and above, especially long lines. Guyed V, Y and portal types are used extensively.",{h:.95,guy:1,arms:[[-62,.2],[0,.2],[62,.2]]}]];
TW.forEach(function(t,i){var b=document.createElement("button");b.className="ghost";b.id="tw"+i;b.textContent=t[0];b.onclick=function(){drawT(i)};$("tw").appendChild(b)});
function drawT(i){
 TW.forEach(function(t,j){$("tw"+j).setAttribute("aria-pressed",j===i)});
 var T=TW[i],o=T[3],W=280,H=240,G=226,top=G-o.h*170,tH=G-top,h='<svg class="c" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Schematic of '+T[0]+' tower"><line class="ax" x1="10" x2="'+(W-10)+'" y1="'+G+'" y2="'+G+'"/>',c=W/2;
 if(o.guy){h+='<path d="M'+c+' '+G+' L'+(c-54)+' '+(top+30)+' M'+c+' '+G+' L'+(c+54)+' '+(top+30)+' M'+(c-54)+' '+(top+30)+' H'+(c+54)+'" fill="none" stroke="var(--ink)" stroke-width="3"/>';
  h+='<path d="M'+(c-54)+' '+(top+30)+' L'+(c-112)+' '+G+' M'+(c+54)+' '+(top+30)+' L'+(c+112)+' '+G+'" stroke="var(--muted)" stroke-dasharray="4 3" fill="none"/>'}
 else{h+='<path d="M'+(c-16)+' '+G+' L'+c+' '+top+' L'+(c+16)+' '+G+'" fill="none" stroke="var(--ink)" stroke-width="2.5"/>'}
 var lv={};
 o.arms.forEach(function(a){var y=o.guy?top+30:top+a[1]*tH,x=c+a[0];lv[y]=Math.max(lv[y]||0,Math.abs(a[0]))});
 Object.keys(lv).forEach(function(y){h+='<line x1="'+(c-lv[y]-6)+'" x2="'+(c+lv[y]+6)+'" y1="'+y+'" y2="'+y+'" stroke="var(--ink)" stroke-width="2"/>'});
 o.arms.forEach(function(a){var y=o.guy?top+30:top+a[1]*tH,x=c+a[0];h+='<line x1="'+x+'" x2="'+x+'" y1="'+y+'" y2="'+(y+14)+'" stroke="var(--accent)" stroke-width="2"/><circle cx="'+x+'" cy="'+(y+16)+'" r="3.2" fill="var(--live)"/>'});
 $("twSvg").innerHTML=h+'</svg>';
 $("twOut").innerHTML="<b>"+T[0]+"</b><span class='pg'>"+T[1]+"</span><span>"+T[2]+"</span>";
}
drawT(2);

/* DC RATIO */
function drawCos(){
 var v=+$("cos").value,r=2*Math.SQRT2/(3*v),W=320,H=190,L=44,B=28,x=function(c){return L+(c-.8)/.2*(W-L-28)},y=function(q){return H-B-(q-.9)/(1.2-.9)*(H-B-8)},h='<svg class="c" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Ratio of DC to AC power against power factor">';
 [.9,1,1.1,1.2].forEach(function(q){h+='<line class="gr" x1="'+L+'" x2="'+(W-12)+'" y1="'+y(q)+'" y2="'+y(q)+'"/><text x="'+(L-5)+'" y="'+(y(q)+4)+'" text-anchor="end">'+q.toFixed(1)+'</text>'});
 [.8,.85,.9,.95,1].forEach(function(c){h+='<text x="'+x(c)+'" y="'+(H-10)+'" text-anchor="middle">'+c.toFixed(2)+'</text>'});
 var d="";for(var c=.8;c<=1.0001;c+=.01){d+=(d?"L":"M")+x(c)+" "+y(2*Math.SQRT2/(3*c))}
 h+='<path d="'+d+'" fill="none" stroke="var(--accent)" stroke-width="2.5"/><line x1="'+L+'" x2="'+(W-12)+'" y1="'+y(1)+'" y2="'+y(1)+'" stroke="var(--ink)" stroke-dasharray="4 3"/>';
 h+='<circle cx="'+x(v)+'" cy="'+y(r)+'" r="6" fill="var(--live)"/></svg>';
 $("dcr").innerHTML=h;$("cosv").textContent=v.toFixed(3);
 $("cosOut").innerHTML='<span>P<sub>DC</sub> / P<sub>AC</sub> = <b>'+r.toFixed(3)+'</b></span>';
}
$("cos").oninput=drawCos;drawCos();

/* BREAK EVEN */
function drawBE(){
 var a=+$("beA").value,c=+$("beC").value,be=c*1000/(.3*a),W=320,H=190,L=44,B=28,R=28,mx=2000,x=function(k){return L+k/mx*(W-L-R)},my=a*mx/1000,y=function(m){return H-B-m/my*(H-B-8)},h='<svg class="c" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="AC and DC total cost against distance">';
 [500,1000,1500,2000].forEach(function(k){h+='<line class="gr" x1="'+x(k)+'" x2="'+x(k)+'" y1="8" y2="'+(H-B)+'"/><text x="'+x(k)+'" y="'+(H-10)+'" text-anchor="middle">'+k+'</text>'});
 h+='<line class="ax" x1="'+L+'" x2="'+(W-R)+'" y1="'+(H-B)+'" y2="'+(H-B)+'"/><line class="ax" x1="'+L+'" x2="'+L+'" y1="8" y2="'+(H-B)+'"/>';
 h+='<line x1="'+x(0)+'" y1="'+y(0)+'" x2="'+x(mx)+'" y2="'+y(my)+'" stroke="var(--v1)" stroke-width="2.5"/>';
 h+='<line x1="'+x(0)+'" y1="'+y(c)+'" x2="'+x(mx)+'" y2="'+y(c+.7*a*mx/1000)+'" stroke="var(--v4)" stroke-width="2.5"/>';
 if(be<=mx)h+='<circle cx="'+x(be)+'" cy="'+y(a*be/1000)+'" r="6" fill="var(--ink)"/>';
 h+='<text x="'+(L+6)+'" y="20" class="b" style="fill:var(--v1)">AC</text><text x="'+(L+36)+'" y="20" class="b" style="fill:var(--v4)">DC</text><text x="'+(W-R)+'" y="'+(H-B-6)+'" text-anchor="end">km</text></svg>';
 $("be").innerHTML=h;$("beAv").textContent=a+" kEUR/km";$("beCv").textContent=c+" MEUR";
 $("beOut").innerHTML='<span>Break-even at <b>'+fmt(be)+' km</b></span>';
}
$("beA").oninput=drawBE;$("beC").oninput=drawBE;drawBE();

/* PHASORS */
function drawPh(){
 var N=+$("phN").value,U=+$("phU").value,upp=2*U*Math.sin(Math.PI/N),S=200,c=S/2,r=80,h='<svg class="c" viewBox="0 0 '+S+' '+S+'" role="img" aria-label="'+N+' phase voltages spaced evenly around a circle" style="max-width:280px;margin:auto">';
 h+='<circle cx="'+c+'" cy="'+c+'" r="'+r+'" class="gr"/>';
 var p=[];for(var i=0;i<N;i++){var a=-Math.PI/2+i*2*Math.PI/N;p.push([c+r*Math.cos(a),c+r*Math.sin(a)]);h+='<line x1="'+c+'" y1="'+c+'" x2="'+p[i][0]+'" y2="'+p[i][1]+'" stroke="var(--'+(i===0?"accent":"rule")+')" stroke-width="'+(i===0?3:1.5)+'"/>'}
 h+='<line x1="'+p[0][0]+'" y1="'+p[0][1]+'" x2="'+p[1][0]+'" y2="'+p[1][1]+'" stroke="var(--live)" stroke-width="3.5"/>';
 $("ph").innerHTML=h+'</svg>';
 $("phOut").innerHTML='<span>Adjacent phase-to-phase</span><b class="big" style="font-family:var(--display)">'+fmt(upp)+' kV</b><span class="small">Teal: U<sub>pg</sub> '+U+' kV. Orange: U<sub>pp</sub>. '+(N===6?'Six phases: equal.':N>6?'Lower than phase-to-ground.':'Higher than phase-to-ground.')+'</span>';
}
$("phN").onchange=drawPh;$("phU").onchange=drawPh;drawPh();

/* TABLE 1.5 */
(function(){
 var D=[["Surge impedance, Ω",502,274],["Surge impedance load, MW",455,434],["Thermal limit, MW",1648,1625],["Electric field, kV/m",3.6,6],["Magnetic field, µT/kA",10,50]];
 var W=640,L=180,bw=W-L-70,h='<svg class="c" viewBox="0 0 '+W+' 214" role="img" aria-label="Twelve-phase and three-phase line data compared">';
 h+='<rect x="'+L+'" y="0" width="12" height="12" fill="var(--v2)"/><text class="i" x="'+(L+18)+'" y="10">12-phase 138 kV</text><rect x="'+(L+170)+'" y="0" width="12" height="12" fill="var(--v4)"/><text class="i" x="'+(L+188)+'" y="10">3-phase 345 kV</text>';
 D.forEach(function(d,i){var y=22+i*38,m=Math.max(d[1],d[2]);
  h+='<text class="i" x="0" y="'+(y+18)+'" style="font-size:11.5px">'+d[0]+'</text>';
  h+='<rect x="'+L+'" y="'+y+'" width="'+d[1]/m*bw+'" height="13" fill="var(--v2)"/><text class="b" x="'+(L+d[1]/m*bw+6)+'" y="'+(y+11)+'">'+d[1]+'</text>';
  h+='<rect x="'+L+'" y="'+(y+15)+'" width="'+d[2]/m*bw+'" height="13" fill="var(--v4)"/><text class="b" x="'+(L+d[2]/m*bw+6)+'" y="'+(y+26)+'">'+d[2]+'</text>'});
 $("t15").innerHTML=h+'</svg>';
})();

/* INVESTMENT */
var T16={v:[110,220,380,500,750],m:{"Thermal limit, MVA":[[100,350],[300,1000],[1400,2700],[1800,3000],[3000,5000]],"Economic power, MVA":[[20,100],[120,350],[500,1200],[700,1500],[2000,3000]],"Right-of-way, m":[[40,50],[55,60],[60,70],[60,70],[80,120]],"Tower weight, t/km":[[15,25],[25,35],[45,65],[16,25],[28,50]],"Concrete, m³/km":[[100,200],[120,250],[150,300],[120,250],[150,250]],"Investment, kEUR/km":[[125,200],[150,400],[650,1200],[250,400],[350,4500]]}};
function drawK(){
 var U=+$("kU").value,n=+$("kN").value,a=+$("kA").value||0,A=n*a,k=60+.4*U+.4*Math.pow(n,.25)*A;
 var R=[["K1C, single",k*.45,k*.5],["K2D(1), double with one circuit",k*.75,k*.8],["K2C, double",k,k],["K4C, four circuits",k*2.1,k*2.2]];
 var mx=k*2.2,W=640,L=216,sc=(W-L-100)/mx,h='<svg class="c" viewBox="0 0 '+W+' 136" role="img" aria-label="Investment by number of circuits">';
 R.forEach(function(r,i){var y=4+i*32;h+='<text class="i" x="0" y="'+(y+15)+'" style="font-size:11.5px">'+r[0]+'</text><rect x="'+L+'" y="'+y+'" width="'+r[1]*sc+'" height="20" fill="var(--v2)"/>';
  if(r[2]>r[1])h+='<rect x="'+(L+r[1]*sc)+'" y="'+y+'" width="'+(r[2]-r[1])*sc+'" height="20" fill="var(--v2)" fill-opacity=".45"/>';
  h+='<text class="b" x="'+(L+r[2]*sc+6)+'" y="'+(y+15)+'">'+(r[2]>r[1]?fmt(r[1])+"–"+fmt(r[2]):fmt(r[1]))+'</text>'});
 $("kChart").innerHTML=h+'</svg>';
 var idx=T16.v.indexOf(U),rg=T16.m["Investment, kEUR/km"][idx],dbl=U<=380;
 $("kOut").innerHTML='<span>A<sub>Al</sub> = '+n+' × '+a+' = '+fmt(A)+' mm²</span><span>K<sub>2C</sub> = 60 + 0.4·'+U+' + 0.4·⁴√'+n+'·'+fmt(A)+' = <b>'+fmt(k)+' kEUR/km</b></span><span class="small">Table 1.6 for '+U+' kV ('+(dbl?"double":"single")+' circuit): '+fmt(rg[0])+' to '+fmt(rg[1])+' kEUR/km</span>';
}
["kU","kN","kA"].forEach(function(i){$(i).oninput=drawK;$(i).onchange=drawK});drawK();

/* T1.6 */
var t16s="Right-of-way, m";
Object.keys(T16.m).forEach(function(k,i){var b=document.createElement("button");b.className="ghost";b.textContent=k.split(",")[0];b.dataset.k=k;b.onclick=function(){t16s=k;drawT16()};$("t16b").appendChild(b)});
function drawT16(){
 $("t16b").querySelectorAll("button").forEach(function(b){b.setAttribute("aria-pressed",b.dataset.k===t16s)});
 var D=T16.m[t16s],mx=Math.max.apply(null,D.map(function(d){return d[1]})),W=640,L=70,sc=(W-L-120)/mx,h='<svg class="c" viewBox="0 0 '+W+' 176" role="img" aria-label="Range of '+t16s+' by voltage">';
 D.forEach(function(d,i){var y=8+i*33;h+='<text class="i" x="0" y="'+(y+15)+'">'+T16.v[i]+' kV</text><line class="gr" x1="'+L+'" x2="'+(W-120)+'" y1="'+(y+10)+'" y2="'+(y+10)+'"/><rect x="'+(L+d[0]*sc)+'" y="'+y+'" width="'+Math.max(3,(d[1]-d[0])*sc)+'" height="20" rx="2" fill="var(--v1)"/><text class="b" x="'+(L+d[1]*sc+6)+'" y="'+(y+15)+'">'+fmt(d[0])+'–'+fmt(d[1])+'</text>'});
 $("t16").innerHTML=h+'</svg><p class="small mono">'+t16s+'</p>';
}
drawT16();

/* T1.7 */
var T17={110:[[35,45],[35,45],[15,25],5],220:[[40,50],[35,45],[10,20],4],380:[[45,55],[35,45],[7,15],3],500:[[45,60],[30,45],[7,15],3],750:[[45,60],[30,45],[7,15],3]},t17s=380;
[110,220,380,500,750].forEach(function(v){var b=document.createElement("button");b.className="ghost";b.textContent=v+" kV";b.dataset.v=v;b.onclick=function(){t17s=v;drawT17()};$("t17b").appendChild(b)});
function drawT17(){
 $("t17b").querySelectorAll("button").forEach(function(b){b.setAttribute("aria-pressed",+b.dataset.v===t17s)});
 var D=T17[t17s],N=["Circuits","Towers","Foundations","Engineering"],W=640,L=110,sc=(W-L-90)/70,h='<svg class="c" viewBox="0 0 '+W+' 164" role="img" aria-label="Investment shares at '+t17s+' kV">';
 [0,10,20,30,40,50,60,70].forEach(function(p){h+='<line class="gr" x1="'+(L+p*sc)+'" x2="'+(L+p*sc)+'" y1="0" y2="136"/><text x="'+(L+p*sc)+'" y="154" text-anchor="middle">'+p+' %</text>'});
 N.forEach(function(n,i){var y=6+i*33,d=D[i],lo=d.length?d[0]:d,hi=d.length?d[1]:d;
  h+='<text class="i" x="0" y="'+(y+15)+'">'+n+'</text>';
  h+=d.length?'<rect x="'+(L+lo*sc)+'" y="'+y+'" width="'+(hi-lo)*sc+'" height="20" rx="2" fill="var(--v4)"/>':'<circle cx="'+(L+lo*sc)+'" cy="'+(y+10)+'" r="7" fill="var(--v4)"/>';
  h+='<text class="b" x="'+(L+hi*sc+10)+'" y="'+(y+15)+'">'+(d.length?lo+"–"+hi:lo)+' %</text>'});
 $("t17").innerHTML=h+'</svg>';
}
drawT17();

/* T1.8 */
var T18=[["110 to 219",220,820,6100,7,3.4,16],["220 to 362",600,390,4900,13,5.1,21.1],["363 to 764",1800,185,3700,20,14.6,33.3]];
(function(){
 var W=640,H=214,L=100,R=120,lo=100,hi=10000,x=function(v){return L+(log10(v)-log10(lo))/(log10(hi)-log10(lo))*(W-L-R)},h='<svg class="c" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="Investment per kilometre and MVA for overhead lines and cables by voltage range">';
 [100,1000,10000].forEach(function(v){h+='<line class="gr" x1="'+x(v)+'" x2="'+x(v)+'" y1="20" y2="'+(H-30)+'"/><text x="'+x(v)+'" y="'+(H-14)+'" text-anchor="middle">'+fmt(v)+'</text>'});
 h+='<text x="'+(W-R)+'" y="'+(H-1)+'" text-anchor="end">EUR/(km·MVA)</text><circle cx="'+L+'" cy="8" r="6" fill="var(--v2)"/><text class="i" x="'+(L+12)+'" y="12">Overhead</text><circle cx="'+(L+100)+'" cy="8" r="6" fill="var(--v4)"/><text class="i" x="'+(L+112)+'" y="12">Cable</text>';
 T18.forEach(function(d,i){var y=50+i*50;
  h+='<text class="i" x="0" y="'+(y+4)+'">'+d[0]+' kV</text><line x1="'+x(d[2])+'" x2="'+x(d[3])+'" y1="'+y+'" y2="'+y+'" stroke="var(--muted)" stroke-width="3"/>';
  h+='<circle cx="'+x(d[2])+'" cy="'+y+'" r="8" fill="var(--v2)"/><circle cx="'+x(d[3])+'" cy="'+y+'" r="8" fill="var(--v4)"/>';
  h+='<text class="b" x="'+x(d[2])+'" y="'+(y-13)+'" text-anchor="middle">'+d[2]+'</text><text class="b" x="'+x(d[3])+'" y="'+(y-13)+'" text-anchor="middle">'+fmt(d[3])+'</text>';
  h+='<text class="b" x="'+(W-R+14)+'" y="'+(y)+'">× '+d[4]+'</text><text x="'+(W-R+14)+'" y="'+(y+15)+'" style="font-size:10.5px">['+d[5]+' to '+d[6]+']</text>'});
 $("t18").innerHTML=h+'</svg>';
})();
function drawC(){
 var d=T18[+$("cR").value],P=+$("cP").value||0,L=+$("cL").value||0,o=d[2]*P*L/1e6,c=d[3]*P*L/1e6;
 $("cOut").innerHTML='<span>Overhead: '+d[2]+' × '+fmt(P)+' × '+L+' = <b>'+fmt(o,1)+' MEUR</b></span><span>Cable: '+fmt(d[3])+' × '+fmt(P)+' × '+L+' = <b>'+fmt(c,1)+' MEUR</b></span><span class="small">Survey mean ratio '+d[4]+', spread '+d[5]+' to '+d[6]+'</span>';
}
["cR","cP","cL"].forEach(function(i){$(i).oninput=drawC;$(i).onchange=drawC});drawC();
var h4a=document.createElement("h4");h4a.textContent="To define";$("res1").appendChild(h4a);
var h4b=document.createElement("h4");h4b.textContent="Then study";$("res2").appendChild(h4b);
checks($("res1"),"d",["Commissioning date","Terminal substations and line length","Power, normal and emergency","Type: AC or DC","Conductors, voltage, shield wires","Number of circuits","Tower type, phase configuration","Earth wires, such as optical ground wires","Maximum allowable losses","Required availability and reliability","Limits for fields and other impacts","Work schedule"]);
checks($("res2"),"s",["Overvoltages (insulation, clearances, tower size)","Short-circuit levels (shield wires, earthing)","Transposition","Reactive compensation","Future intermediate switching stations","Future lines in the same corridor","Required electric performance","Environmental impacts of electric origin","Static and dynamic stability"]);
},
cards:[
["(n−1) criterion","The system must support the non-simultaneous outage of any one component, without losing load.","p. 5"],
["(n−2) criterion","A stricter criterion, one way to limit the effect of cable faults, at added investment.","p. 18"],
["Long-term planning","15 to 30 years. Sets future structure, generation mix and new backbones.","p. 2"],
["Medium-term planning","10 to 15 years. Sets voltages, main lines and substations in a reference programme.","p. 2–3"],
["Operation planning","Under 3 years. A continuous tool for urgent needs like uprating or earlier dates.","p. 3"],
["Load flow","First study run. Finds bus voltages, line and transformer loads, and losses.","p. 5"],
["Surge impedance load","The natural power of a line. Table 1.3 lists it by voltage; treated fully in Chapter 2.","p. 7"],
["Thermal limit","The power at the steady-state current limit, at 80 °C conductor temperature in Table 1.3.","p. 7"],
["Corona performance","A selection factor for conductors, depending on voltage and on line and conductor configuration.","p. 8"],
["ACSR","Aluminium conductor steel reinforced. Aluminium's electrical properties with steel's strength.","p. 8"],
["Present value","Future costs such as losses reduced to one base, so alternatives can be compared.","p. 8"],
["Compact structures","Usually double circuit, vertical configuration, for dense urban and suburban areas.","p. 9"],
["Danube configuration","Two crossarm levels. Balances corridor width, height and cost, with lightning protection.","p. 11"],
["Guyed structures","V, Y or portal types, increasingly common at 500 kV and above on long lines.","p. 11"],
["Chainette","Crossrope, crossarmless tower. Good where right-of-way is not a major constraint.","p. 11"],
["Bipolar DC line","Two pole conductors. Total power 2·U·I.","p. 12"],
["Back-to-back station","Converter link between systems of different frequencies.","p. 13"],
["Creepage distance","Surface insulation path. DC needs a longer specific path due to pollution attraction.","p. 13"],
["Hexaphase, dodecaphase","Six-phase and twelve-phase lines, tried as ways to raise corridor capacity.","p. 14–15"],
["Phase spacers","Needed on multi-phase lines in several cases, as phases sit closer together.","p. 15"],
["Indemnities","Payments to landowners. In some cases near the investment of the line itself.","p. 16"],
["Photomontage","Usually the best way to show a line's visual effect to the public.","p. 17"],
["Long-term overload","Current too low to trip protection, too long for comfort. Ages a cable, tolerated by a line.","p. 18"],
["Reconductoring","Raising line capacity with new conductors. Cables have no easy equivalent.","p. 19"],
["Thermal backfill","Stabilised cable backfill that raises transfer capability and lowers life cycle cost.","p. 20"]],
fm:[["P<sub>AC</sub> = 3 · U<sub>AC</sub> · I<sub>AC</sub> · cos φ","Three-phase AC power. U is phase-to-ground rms.","1.1, p. 12"],
 ["P<sub>DC</sub> = 2 · U<sub>DC</sub> · I<sub>DC</sub>","Bipolar DC power.","1.2, p. 12"],
 ["P<sub>DC</sub> / P<sub>AC</sub> = 2√2 / (3 cos φ)","With U<sub>DC</sub> = √2·U<sub>AC</sub>, I<sub>DC</sub> = I<sub>AC</sub>. Near 1 at cos φ = 0.945.","1.4–1.5, p. 12–13"],
 ["K<sub>2C</sub> ~ 60 + 0.4 U<sub>N</sub> + 0.4 ⁴√n<sub>2</sub> · A<sub>Al</sub>","kEUR/km, double circuit, no indemnities. U<sub>N</sub> kV, A<sub>Al</sub> mm².","1.6, p. 16"],
 ["K<sub>1C</sub> ≈ 0.45 to 0.5 K<sub>2C</sub>","Single circuit.","1.7, p. 16"],
 ["K<sub>2D(1)</sub> ≈ 0.75 to 0.8 K<sub>2C</sub>","Double circuit towers, one circuit installed.","1.8, p. 16"],
 ["K<sub>4C</sub> ≈ 2.1 to 2.2 K<sub>2C</sub>","Four circuits.","1.9, p. 16"],
 ["Capability ∝ U²","Line capability grows with the square of voltage.","p. 6"],
 ["SIL = U² / Z","Added context, treated in Chapter 2. Reproduces Table 1.3 closely.","Ch. 2"],
 ["P<sub>th</sub> = √3 · U · I","Added context. Reproduces the thermal limits in Table 1.3.","Table 1.3"],
 ["U<sub>pp</sub> = 2 U<sub>pg</sub> sin(π/N)","Added context, adjacent phases. Reproduces Table 1.4.","Table 1.4"]],
wx:[
["Equal power, AC and DC","Show that a bipolar DC line can carry the same power as an AC line, at cos φ = 0.945.",["Start from P<sub>DC</sub> / P<sub>AC</sub> = 2·U<sub>DC</sub>·I<sub>DC</sub> / (3·U<sub>AC</sub>·I<sub>AC</sub>·cos φ).","Substitute U<sub>DC</sub> = √2·U<sub>AC</sub> and I<sub>DC</sub> = I<sub>AC</sub>. Voltage and current cancel.","That leaves 2√2 / (3 cos φ) = 2.828 / 2.835.","Result: 0.998, about 1. Same power, two conductors in place of three."]],
["Estimate a 380 kV line","Double circuit, 4 subconductors of 240 mm² aluminium per phase.",["A<sub>Al</sub> = 4 × 240 = 960 mm² (reading the total as per phase).","⁴√4 = 1.414.","K<sub>2C</sub> = 60 + 0.4·380 + 0.4·1.414·960 = 60 + 152 + 543.","Result: about 755 kEUR/km, inside Table 1.6's 650 to 1200.","Single circuit: 0.45 to 0.5 × 755 = 340 to 378 kEUR/km."]],
["Line or cable at 1800 MVA","10 km in the 363 to 764 kV range, from Table 1.8 means.",["Overhead: 185 EUR/(km·MVA) × 1800 MVA = 333 000 EUR/km.","Cable: 3700 × 1800 = 6 660 000 EUR/km.","For 10 km: 3.3 MEUR against 66.6 MEUR.","Ratio 20, before losses. Lower cable losses narrow it somewhat."]],
["Twelve-phase surge load","Check Table 1.5: 138 kV phase-to-ground, 502 Ω per phase. Added context.",["Each phase carries U<sub>pg</sub>²/Z = 138² / 502 = 37.9 MW.","Twelve phases: 12 × 37.9 = 455 MW.","That matches Table 1.5's 455 MW.","So a much lower voltage matches a 345 kV line's 434 MW."]]],
bad:[["Treating (n−1) as \"the line never fails\"","It means supply survives one outage. Load must not be lost, and limits like the 20 % and 40 % overloads still apply."],
["Calling the DC line one third cheaper overall","Conductors drop to about two thirds. Practice puts the whole DC line at around 70 %, and converter stations come on top."],
["Comparing DC at the AC rms voltage","The equal-power result assumes U<sub>DC</sub> equals the AC peak to ground, √2 · U<sub>AC</sub>."],
["Using 800 km as a firm rule","It is a rough indication. The book says no universal break-even distance exists."],
["Quoting line-to-line voltage for multi-phase lines","Above three phases, phase-to-ground is the reference, and phase-to-phase depends on which conductors are compared."],
["Reading the cable ratio as a fixed multiple","20 is a mean for the top range. The spread is 14.6 to 33.3, and it falls to 7 at lower voltages."],
["Assuming four circuits cost double two","K<sub>4C</sub> is 2.1 to 2.2 × K<sub>2C</sub>, because towers more than double. Indemnities need not double, which can favour it."],
["Choosing a conductor on purchase price","Compare initial cost plus present value of lifetime losses."]],
q:[
{t:"s",sec:"1.2",p:"p. 2",q:"What horizon does the text give for long-term planning?",o:["Up to 3 years","10 to 15 years","15 to 30 years","Over 50 years"],a:[2],w:"The text gives 15 to 30 years. Under 3 is operation planning, and 10 to 15 is medium-term. Table 1.1 condenses these to 15, 10 and 3."},
{t:"s",sec:"1.1",p:"p. 1–2",q:"When can survey and construction legally start?",o:["After long-term planning","After load flow studies","After rights-of-way, approved environmental studies and landowner indemnification","After commissioning"],a:[2],w:"Only after those last stages. Commissioning ends the process, and studies come much earlier."},
{t:"m",sec:"1.2",p:"p. 2, Table 1.1",q:"Which items does medium-term planning define? Select all that apply.",o:["Losses","Terminal substations","Years of operation","List of operational constraints"],a:[0,1,2],w:"The operational constraints list belongs to short-term planning. Losses, terminal substations and years of operation are medium-term outputs."},
{t:"t",sec:"1.4",p:"p. 5",q:"True or false: (n−1) requires the system to survive any two components failing together.",a:false,w:"False. It covers the non-simultaneous outage of any one component. Two components is (n−2)."},
{t:"n",sec:"1.4",p:"p. 5",q:"A transformer is rated 300 MVA. A parallel transformer is lost. What is the highest usual load on the remaining unit, in MVA?",a:420,tol:1,u:"MVA",w:"Loss of a transformer allows 40 % overload: 300 × 1.4 = 420 MVA. The 20 % figure applies to losing a line or generator."},
{t:"s",sec:"1.4",p:"p. 5",q:"A load flow shows a bus at 0.93 p.u. after an outage. What should you conclude?",o:["Acceptable, above 0.90","Outside the usual 0.95 to 1.05 p.u. range","Acceptable, as only overvoltage is limited","It shows a short circuit"],a:[1],w:"The usual range is 0.95 to 1.05 p.u., so 0.93 is low. The range has a lower limit too."},
{t:"s",sec:"1.4",p:"p. 5",q:"What is the usual maximum temporary overvoltage at a point with saturable equipment?",o:["120 %","140 %","150 %","200 %"],a:[1],w:"140 % at points with saturable equipment, 150 % elsewhere."},
{t:"s",sec:"1.5",p:"p. 6",q:"In the book's classification, what is 275 kV?",o:["Medium voltage","High voltage","Extra-high voltage","Ultra-high voltage"],a:[1],w:"HV runs from 45 to 300 kV. EHV starts at 300 kV. Many people loosely call 275 kV EHV, but this book's list does not."},
{t:"n",sec:"1.5",p:"p. 6",q:"Voltage rises from 110 kV to 220 kV. By what factor does transmitting capability rise?",a:4,tol:.01,u:"times",w:"Capability grows with the square of voltage: (220/110)² = 4."},
{t:"s",sec:"1.5",p:"Fig. 1.2, p. 7",q:"Using the voltage chart, which are candidates for 100 MW per circuit over 60 km?",o:["110 kV or 220 kV","380 kV only","500 kV or 700 kV","None"],a:[0],w:"That point falls inside the 110 and 220 kV regions. The 380 kV region begins at about 140 MW."},
{t:"n",sec:"1.5",p:"Table 1.3, p. 7",q:"At 380 kV with surge impedance 284 Ω, what is the surge impedance load from U²/Z, in MW? Nearest whole number.",a:508,tol:8,u:"MW",w:"380² / 284 = 508 MW. Table 1.3 lists a rounded 500 MW, so answers from 500 to 516 are accepted. The formula itself comes from Chapter 2."},
{t:"s",sec:"1.6",p:"p. 8",q:"What share of total line investment do conductors represent in the conductor section?",o:["5 to 10 %","15 to 20 %","30 to 35 %","60 to 70 %"],a:[2],w:"30 to 35 %, which is why conductor choice is called a key point."},
{t:"s",sec:"1.6",p:"p. 8",q:"Why did ACSR displace plain aluminium?",o:["Higher conductivity than copper","Steel adds the strength needed for long spans","It eliminates corona","It never corrodes"],a:[1],w:"Aluminium was too weak for long spans. Steel added strength. ACSR cores can still corrode, which led to alloy conductors."},
{t:"x",sec:"1.7",p:"p. 9–11",q:"Match each configuration to its main feature.",pairs:[["Danube","Compromise of width, height and investment"],["Vertical","Narrow corridor, but taller and more visible"],["Guyed V","Common at 500 kV and above on long lines"],["Multi-circuit","Used where rights-of-way are scarce"]],w:"Danube balances the three factors. Vertical trades height for width. Guyed types suit long EHV lines. Multi-circuit lines answer scarce rights-of-way, at operational cost."},
{t:"n",sec:"1.8",p:"Eq. 1.4, p. 12",q:"Calculate P_DC / P_AC when cos φ = 0.90. Two decimals.",a:1.05,tol:.01,u:"",w:"2√2 / (3 × 0.90) = 2.828 / 2.7 = 1.05."},
{t:"m",sec:"1.8",p:"p. 13",q:"Which are true advantages of DC lines? Select all that apply.",o:["Lower switching overvoltages","Connects systems of different frequencies","Cheap to tap for intermediate substations","Converters need no reactive power"],a:[0,1],w:"Tapping is uneconomic, and converters need reactive power up to 60 % of active power."},
{t:"s",sec:"1.8",p:"p. 13",q:"What does the book give as a rough transmission distance for considering DC?",o:["Over 100 km","Over 800 km","Over 3000 km","There is an exact universal figure"],a:[1],w:"More than 800 km, as a rough indication only. It stresses there is no universal break-even distance."},
{t:"n",sec:"1.9",p:"Table 1.4, p. 14",q:"A 12-phase system has 133 kV phase-to-ground. What is the adjacent phase-to-phase voltage, in kV?",a:69,tol:1,u:"kV",w:"Table 1.4 gives 69 kV. Check: 2 × 133 × sin(15°) = 68.8 kV."},
{t:"t",sec:"1.9",p:"p. 14",q:"True or false: in a six-phase system, phase-to-phase voltage equals phase-to-ground voltage.",a:true,w:"True. That is why Table 1.4 shows the same numbers in the phase-to-ground and N = 6 columns."},
{t:"n",sec:"1.10",p:"Eq. 1.6, p. 16",q:"Estimate K2C for 380 kV, n₂ = 4, A_Al = 960 mm². Give kEUR/km.",a:755,tol:6,u:"kEUR/km",w:"60 + 152 + 0.4 × 1.414 × 960 = 755 kEUR/km."},
{t:"s",sec:"1.10",p:"Eq. 1.9, p. 16",q:"A double circuit line costs 800 kEUR/km. What is a four-circuit line?",o:["1600 kEUR/km exactly","1680 to 1760 kEUR/km","3200 kEUR/km","Under 1200 kEUR/km"],a:[1],w:"K4C is 2.1 to 2.2 × K2C. Towers more than double, so it is above simple doubling."},
{t:"s",sec:"1.11",p:"p. 17",q:"You must show the public how a new line will look. Which method does the book favour?",o:["Quantitative scoring tables","Photomontages","Conductor tension charts","Load flow plots"],a:[1],w:"Photomontages. With the public, qualitative assessment is preferred, and quantitative systems are kept for experts."},
{t:"s",sec:"1.12",p:"Table 1.8, p. 20",q:"What is the mean cable to overhead investment ratio in the 363 to 764 kV range?",o:["2","7","13","20"],a:[3],w:"20, with a spread of 14.6 to 33.3. 7 and 13 are the lower ranges."},
{t:"s",sec:"1.12",p:"p. 19",q:"An overhead line in a meshed network is replaced by cable. What happens to fault current?",o:["Falls, as cables are insulated","Rises, as cable impedance is lower","Unchanged","Drops to zero"],a:[1],w:"Lower impedance raises fault current. Component capacity and protection settings must be rechecked."},
{t:"s",sec:"1.12",p:"p. 18",q:"Why may (n−1) not hold as well for cables?",o:["Cables cannot be switched","Repair time is much longer, so a second fault is more likely during repair","Cables have no protection","Cables cannot carry load"],a:[1],w:"(n−1) assumes repair is quick enough that no second fault occurs. Cable repairs take significantly longer."}
]});
