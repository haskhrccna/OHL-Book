OHL.add({n:14,lead:"The geometry and forces of a hanging conductor, how they change with temperature and ice, and how to verify clearances. Printed pages 539 to 570.",
init:function(K){var $=K.$,fmt=K.fmt;
function rng(a,b,n){var o=[];for(var i=0;i<=n;i++)o.push(a+(b-a)*i/n);return o}
function solve(H1,EA,et,a,w1,w2,dT,extra1,extra2){var C=EA*(a*w1)*(a*w1)/(24*H1*H1)+EA*et*dT-H1,R=EA*(a*w2)*(a*w2)/24;if(extra1!=null){C=EA/(H1*H1)*extra1+EA*et*dT-H1;R=EA*extra2}var x=H1;for(var i=0;i<100;i++){var f=x*x*(x+C)-R,d=3*x*x+2*C*x;x-=f/d;if(x<1)x=1}return x}
function cat(H,w,a){return H/w*(Math.cosh(w*a/(2*H))-1)}
K.calc("catCalc",{f:[{k:"a",l:"Span",min:100,max:1500,step:10,v:800,u:"m"},{k:"H",l:"Horizontal force",min:5,max:60,step:.5,v:14,u:"kN"},{k:"m",l:"Mass",min:.5,max:3,step:.005,v:1.235,u:"kg/m"}],run:function(v,c){var w=v.m*9.81,H=v.H*1000,fc=cat(H,w,v.a),fp=w*v.a*v.a/(8*H),cc=H/w,S=rng(-v.a/2,v.a/2,60);
 K.plot(c,{h:230,x:{min:-v.a/2,max:v.a/2,label:"Along span, m"},y:{min:-fc*1.08,max:0,label:"Sag below chord, m"},series:[{p:S.map(function(x){return[x,-(cat(H,w,v.a)-(cc*Math.cosh(x/cc)-cc))]}),c:"accent",t:"Catenary"},{p:S.map(function(x){return[x,-fp*(1-4*x*x/(v.a*v.a))]}),c:"v4",dash:true,t:"Parabola"}],aria:"Conductor curve"});
 return'<span>c = '+fmt(cc)+' m</span><span class="big">Catenary '+fmt(fc,2)+' m, parabola '+fmt(fp,2)+' m</span><span class="'+(fc-fp<=.1?"good":"warn")+'">Difference '+fmt(fc-fp,2)+' m</span><span>Support tension S = '+fmt(H*Math.cosh(v.a/(2*cc))/1000,1)+' kN</span>'}});
K.calc("lenCalc",{f:[{k:"a",l:"Span",min:100,max:800,step:10,v:400,u:"m"},{k:"e",l:"Extra length",min:.01,max:1,step:.01,v:.1,u:"%"}],run:function(v){var f=v.a*Math.sqrt(3/8*v.e/100);return'<span class="big">Sag '+fmt(f,1)+' m</span><span>Extra length '+fmt(v.e/100*v.a,3)+' m</span>'}});
K.calc("incCalc",{f:[{k:"a",l:"Span",min:100,max:900,step:10,v:400,u:"m"},{k:"h",l:"Height difference",min:-100,max:100,step:1,v:40,u:"m"},{k:"H",l:"Horizontal force",min:5,max:60,step:.5,v:15,u:"kN"},{k:"w",l:"Weight",min:5,max:30,step:.1,v:12,u:"N/m"}],run:function(v,c){var H=v.H*1000,xA=-v.a/2+H/v.w*v.h/v.a,ae=v.a+2*H*v.h/(v.w*v.a),S=rng(0,v.a,60),yy=function(x){var X=x+xA;return v.w/(2*H)*(X*X-xA*xA)},mn=Math.min.apply(null,S.map(yy)),mx=Math.max(v.h,0);K.plot(c,{h:240,x:{min:0,max:v.a,label:"Distance from support A, m"},y:{min:mn-Math.abs(mn)*.1-1,max:mx+Math.abs(mx)*.1+1,label:"Level relative to A, m"},series:[{p:S.map(function(x){return[x,yy(x)]}),c:"accent",t:"Conductor"},{p:[[0,0],[v.a,v.h]],c:"rule",t:"Chord"}],aria:"Inclined span"});
 var inside=-xA>0&&-xA<v.a;return'<span>Complementary span a<sub>e</sub> = '+fmt(Math.abs(ae))+' m</span><span class="'+(inside?"good":"warn")+'">Vertex '+(inside?fmt(-xA)+" m from A":"outside the span: support A gets uplift")+'</span>'}});
K.calc("scCalc",{f:[{k:"a1",l:"Span 1",min:50,max:700,step:5,v:350,u:"m"},{k:"a2",l:"Span 2",min:50,max:700,step:5,v:200,u:"m"},{k:"a3",l:"Span 3",min:50,max:700,step:5,v:450,u:"m"},{k:"a4",l:"Span 4",min:50,max:700,step:5,v:275,u:"m"},{k:"a5",l:"Span 5",min:50,max:700,step:5,v:500,u:"m"},{k:"a6",l:"Span 6",min:50,max:700,step:5,v:325,u:"m"},{k:"T",l:"Temperature",min:-20,max:100,step:1,v:60,u:"°C"},{k:"i",l:"Ice",min:0,max:30,step:.5,v:0,u:"N/m"}],run:function(v,c){
 var L=[v.a1,v.a2,v.a3,v.a4,v.a5,v.a6],s3=0,s1=0;L.forEach(function(x){s3+=x*x*x;s1+=x});var aid=Math.sqrt(s3/s1),A=353.7,E=77000,et=18.9e-6,w=1.235*9.81,H1=50*A,w2=w+v.i,H2=solve(H1,E*A,et,aid,w,w2,v.T-10),big=Math.max.apply(null,L),f=cat(H2,w2,big),S=rng(-20,100,24);
 K.plot(c,{h:230,x:{min:-20,max:100,label:"Temperature, °C"},y:{min:0,max:45,label:"Sag in longest span, m"},series:[{p:S.map(function(t){return[t,cat(solve(H1,E*A,et,aid,w,w2,t-10),w2,big)]}),c:"accent"}],marks:[{x:v.T,y:f,t:fmt(f,2)+" m"}],aria:"Sag against temperature"});
 return'<span>Ruling span a<sub>id</sub> = '+fmt(aid,2)+' m</span><span class="big">H₂ = '+fmt(H2)+' N</span><span>Sag in '+big+' m span: '+fmt(f,2)+' m</span>'}});
K.calc("clCalc",{f:[{k:"G",l:"Load at midspan",min:0,max:5000,step:50,v:2000,u:"N"},{k:"a",l:"Span",min:100,max:800,step:10,v:400,u:"m"}],run:function(v){var A=297.8,E=74000,w=.998*9.81,H1=50*A,I0=w*w*Math.pow(v.a,3)/12,I2=v.G*v.G*v.a/4+v.G*w*v.a*v.a/4+w*w*Math.pow(v.a,3)/12,H2=solve(H1,E*A,0,v.a,w,w,0,I0/(2*v.a),I2/(2*v.a)),f=(w*v.a*v.a/8+v.G*v.a/4)/H2,f0=w*v.a*v.a/(8*H1);return'<span>H rises '+fmt((H2/H1-1)*100)+' % to '+fmt(H2)+' N</span><span class="big">Sag '+fmt(f0,2)+' → '+fmt(f,2)+' m</span>'}});
K.calc("flxCalc",{f:[{k:"a",l:"Span",min:30,max:150,step:1,v:50,u:"m"},{k:"T",l:"Temperature",min:-20,max:80,step:1,v:40,u:"°C"}],run:function(v){var A=635.5,E=68000,et=19.4e-6,m=2.116*9.81,G=150*9.81,L=5,b=function(a){return m*m*a*a/24+G*m*L/2+G*G*L/(3*a)},H1=6355,B=b(v.a),H2=solve(H1,E*A,et,v.a,m,m,v.T-10,B,B),f=(m*v.a*v.a/4+m*L*L+G*L)/(2*H2);return'<span>H₂ = '+fmt(H2)+' N</span><span class="big">Sag '+fmt(f,2)+' m</span>'}});
K.calc("iceCalc",{f:[{k:"f",l:"Sag with ice in all spans",min:3,max:30,step:.01,v:10.43,u:"m"},{k:"w",l:"Conductor weight",min:3,max:30,step:.01,v:9.79,u:"N/m"},{k:"i",l:"Ice",min:.5,max:10,step:.01,v:3.62,u:"N/m"},{k:"p",l:"Position",o:[[1.03,"First or last span"],[1.06,"Second span"],[1.07,"Inner span"]],v:1.03},{k:"K3",l:"K₃",min:.9,max:1.1,step:.005,v:.985,u:""},{k:"K4",l:"K₄",min:.94,max:1.03,step:.01,v:1.02,u:""}],run:function(v){var r=v.w/(v.w+v.i),K1=Math.sqrt(2/(1+r*r));return'<span>K₁ = '+fmt(K1,3)+'</span><span class="big">f = '+fmt(v.f*K1*v.p*v.K3*v.K4,2)+' m</span>'}});
K.calc("grCalc",{f:[{k:"a",l:"Span",min:100,max:800,step:1,v:425,u:"m"},{k:"id",l:"Ruling span",min:100,max:800,step:.01,v:340.32,u:"m"},{k:"fi",l:"Ruling sag",min:3,max:30,step:.01,v:12.55,u:"m"},{k:"xi",l:"Position ξ",min:10,max:800,step:1,v:255,u:"m"},{k:"h1",l:"Left conductor level",min:270,max:320,step:.1,v:299.9,u:"m"},{k:"h2",l:"Right conductor level",min:270,max:320,step:.05,v:285.45,u:"m"},{k:"g",l:"Ground",min:240,max:290,step:.5,v:266,u:"m"},{k:"r",l:"Required",min:3,max:15,step:.1,v:6,u:"m"}],run:function(v,c){
 var xi=Math.min(v.xi,v.a),fm=v.a*v.a/(v.id*v.id)*v.fi,f=function(x){return 4*fm*x/v.a*(1-x/v.a)},lv=function(x){return v.h1-(v.h1-v.h2)*x/v.a-f(x)},cl=lv(xi)-v.g,S=rng(0,v.a,60);
 K.plot(c,{h:240,x:{min:0,max:v.a,label:"Along span, m"},y:{min:v.g-5,max:Math.max(v.h1,v.h2)+5,label:"Level, m"},series:[{p:S.map(function(x){return[x,lv(x)]}),c:"accent",t:"Conductor"},{p:[[0,v.g+v.r],[v.a,v.g+v.r]],c:"v4",dash:true,t:"Required line"},{p:[[0,v.g],[v.a,v.g]],c:"v3",t:"Ground"}],marks:[{x:xi,y:lv(xi),t:fmt(cl,2)+" m"}],aria:"Span profile"});
 return'<span>Midspan sag '+fmt(fm,2)+' m, at ξ '+fmt(f(xi),2)+' m</span><span class="big '+(cl>=v.r?"good":"bad")+'">a = '+fmt(cl,2)+' m</span>'}});
K.bars("cmpBars",{lw:230,minw:480,u:"m",max:2.2,rows:[["Ground, 80 °C",.25,"accent"],["Road, 80 °C",.17,"accent"],["Road, local ice",1.88,"v4"],["Line, 80 °C",.21,"accent"],["Line, local ice",.43,"v1"],["Line, wind",.82,"v3"]],aria:"Difference between hand and program clearances"});
},
cards:[
["Sag","Vertical distance from conductor to chord.","p. 540"],
["Horizontal force H","Constant along the span.","p. 541"],
["Catenary","y = c·cosh(x/c), shape of a hanging chain.","p. 542"],
["Parameter c","c = H/(m·g), in metres.","p. 544"],
["Support tension","S = H·cosh(x/c).","p. 543"],
["Mean tension","H·L/a.","p. 543"],
["Parabola","Weight along span, f = w·a²/(8H).","p. 544"],
["Parabola rule","Use up to about 500 m at 0.1 m error.","p. 546"],
["Complementary span","Level span giving the same vertex.","p. 546"],
["State change equation","Links H, T and load between two states.","p. 547"],
["Equivalent span","√(Σa³/Σa), the ruling span.","p. 548"],
["Concentrated load","Sag equals beam moment over H.","p. 549"],
["Rigid and flexible sets","Long rod, or chain of many units.","p. 551"],
["Tensioning section","Spans between two strain towers.","p. 553"],
["Set offset","Suspension string swinging along the line.","p. 553–554"],
["Inverted V set","Limits along-line swing, resists compression.","p. 556"],
["Local ice","Ice in one span only, K₁ to K₄ estimate.","p. 562"],
["Sag scaling","f<sub>i</sub> = (a<sub>i</sub>/a<sub>id</sub>)²·f<sub>id</sub>.","p. 564"],
["Crossing clearance","Dpp for crossing lines, Del + 6 m for roads.","p. 565, 569"]],
fm:[
["y = (H/w)·cosh(w·x/H)","Catenary.","14.9, p. 542"],
["f<sub>max</sub> = (H/w)[cosh(w·a/2H) − 1]","Catenary sag.","14.17, p. 543"],
["S = H·cosh(w·x/H)","Tension.","14.19, p. 543"],
["f<sub>max</sub> = w·a²/(8H)","Parabola sag.","14.25, p. 544"],
["f = 4f<sub>max</sub>(ξ/a)(1 − ξ/a)","Sag at ξ.","14.26, p. 544"],
["L = a[1 + (8/3)(f/a)²]","Length.","14.31, p. 545"],
["a<sub>e</sub> = a + 2H·h/(w·a)","Complementary span.","14.35, p. 546"],
["S<sub>A</sub> = H + f<sub>e</sub>·w","Tension at support.","14.36, p. 546"],
["a<sub>id</sub> = √(Σa³/Σa)","Ruling span.","14.43, p. 548"],
["H₂²[H₂ − H₁ + EA(a w₁)²/(24H₁²) + EAε(T₂−T₁)] = EA(a w₂)²/24","State change.","14.40, p. 547"],
["f<sub>x</sub> = M<sub>x</sub>/H","Concentrated loads.","14.46, p. 550"],
["K₁ = √(2/(1 + (w/w<sub>ice</sub>)²))","Local ice factor.","14.81, p. 562"],
["a = h₁ − (h₁ − h₂)ξ/a − f<sub>ξ</sub> − NN","Clearance.","14.83, p. 564"]],
wx:[
["Catenary and parabola","304-AL1/49-ST1A, H = 14 kN, m = 1.235 kg/m.",["c = 14 000/(1.235·9.81) = 1155 m.","400 m: catenary 17.35, parabola 17.31 m.","800 m: 69.92 against 69.23 m.","Errors 0.04 and 0.69 m."]],
["State change in a section","Spans 350, 200, 450, 275, 500, 325 m, 50 N/mm² at 10 °C.",["a<sub>id</sub> = √(322.125·10⁶/2100) = 391.65 m.","Fill Eq. 14.44 for 60 °C: H²(H + 89 742) = 2554.95·10¹⁰.","Iterate: H = 15 575 N.","Sag in 500 m span = 24.39 m."]],
["Clearance","Span 425 m, ruling 340.32 m, f<sub>id</sub> = 12.55 m at 80 °C, levels 299.9 and 285.45, ground 266, ξ = 255 m.",["f = (425/340.32)²·12.55 = 19.58 m.","f<sub>ξ</sub> = 4·19.58·0.6·0.4 = 18.80 m.","Chord level: 299.9 − 14.45·0.6 = 291.23 m.","a = 291.23 − 18.80 − 266 = 6.43 m, above 6.0 m."]],
["Local ice","Last span, f₍₋₅,ice₎ = 10.43 m, w = 9.79, ice 3.62 N/m.",["K₁ = 1.142.","K₂ = 1.03, K₃ = 0.985, K₄ = 1.02.","f = 12.33 m."]]],
bad:[
["Applying the state change to one span of a section","Use the ruling span."],
["Assuming parabola is fine at any span","Long spans need the catenary."],
["Using height difference to correct sag","Parabola sag at ξ does not depend on it."],
["Checking only 80 °C","Ice and local ice can govern at crossings."],
["Taking σ = H/A as the true stress of ACSR","It is an equivalent, not measurable, value."],
["Trusting hand checks for wind crossings","Differences were up to 0.82 m."],
["Ignoring tension sets in a short span","Their weight matters."]],
q:[
{t:"s",sec:"14.2",p:"p. 541",q:"Which quantity is constant along the span?",o:["Total tension","Horizontal force","Vertical force","Slope"],a:[1],w:"H is constant."},
{t:"s",sec:"14.2",p:"p. 543",q:"Where is tension highest?",o:["Midspan","Supports","Quarter span","Equal everywhere"],a:[1],w:"S = H·cosh(x/c)."},
{t:"n",sec:"14.2",p:"p. 544",q:"H = 20 000 N, w = 10 N/m. c, m?",a:2000,tol:.5,u:"m",w:"H/w."},
{t:"n",sec:"14.3",p:"Eq. 14.25, p. 544",q:"w = 10 N/m, a = 400 m, H = 20 kN. Sag, m?",a:10,tol:.02,u:"m",w:"10·160 000/(8·20 000)."},
{t:"n",sec:"14.3",p:"Eq. 14.26, p. 544",q:"f<sub>max</sub> = 20 m, ξ/a = 0.25. Sag at ξ, m?",a:15,tol:.02,u:"m",w:"4·20·0.25·0.75."},
{t:"n",sec:"14.3",p:"Eq. 14.31, p. 545",q:"a = 400 m, f = 20 m. L − a, m? Two decimals.",a:.67,tol:.01,u:"m",w:"400·(8/3)·0.0025 = 0.67."},
{t:"t",sec:"14.3",p:"p. 545",q:"True or false: in the parabola, sag at a point does not depend on height difference.",a:true,w:"Eq. 14.24."},
{t:"s",sec:"14.3",p:"p. 546",q:"Up to what span does the parabola stay within 0.1 m in the example?",o:["100 m","500 m","1000 m","Any"],a:[1],w:"500 m."},
{t:"n",sec:"14.4",p:"Eq. 14.35, p. 546",q:"a = 400 m, h = 20 m, H/w = 2000 m. a<sub>e</sub>, m?",a:420,tol:.5,u:"m",w:"400 + 2·2000·20/400 = 400 + 20 = 420 m."},
{t:"n",sec:"14.4",p:"Eq. 14.36, p. 546",q:"H = 15 kN, f<sub>e</sub> = 20 m, w = 15 N/m. S<sub>A</sub>, kN?",a:15.3,tol:.01,u:"kN",w:"15 + 0.3."},
{t:"n",sec:"14.5",p:"Eq. 14.43, p. 548",q:"Spans 300 and 400 m. Ruling span, m? Whole number.",a:361,tol:1,u:"m",w:"√((2.7 + 6.4)·10⁷/700) = 361."},
{t:"s",sec:"14.5",p:"p. 547",q:"Why write the equation in H instead of σ?",o:["It applies to composite conductors exactly","It is shorter","Tradition","No reason"],a:[0],w:"H/A is not measurable in composites."},
{t:"s",sec:"14.5",p:"p. 549",q:"Ignoring the ruling span for a long span gives what?",o:["Sag about 1 m too low","Sag about 1 m too high","No change","Doubled sag"],a:[0],w:"23.35 m instead of 24.39 m."},
{t:"s",sec:"14.6",p:"p. 551",q:"A midspan load raises tension 69 %. By how much does sag rise?",o:["5 %","20 %","69 %","138 %"],a:[1],w:"About 20 %."},
{t:"s",sec:"14.7",p:"p. 553",q:"Rigid or flexible sets change what most?",o:["Tension","Sag, by about 0.1 m","Voltage","Nothing"],a:[1],w:"Tensions are almost equal."},
{t:"s",sec:"14.8",p:"p. 554",q:"Ice in one span moves suspension sets how?",o:["Towards the iced span","Away from it","Upward","Not at all"],a:[0],w:"Tension rises less, sag more."},
{t:"s",sec:"14.8",p:"p. 556",q:"Which feature do inverted V strings need?",o:["Compression resistance","Lower voltage","Steel wire","Heavy weights"],a:[0],w:"They can see compression."},
{t:"n",sec:"14.8",p:"Eq. 14.81, p. 562",q:"w = 10, with ice 20 N/m. K₁? Three decimals.",a:1.265,tol:.003,u:"",w:"√(2/1.25)."},
{t:"n",sec:"14.9",p:"Eq. 14.82, p. 564",q:"f<sub>id</sub> = 12 m, a<sub>id</sub> = 300, a = 450 m. Sag, m?",a:27,tol:.02,u:"m",w:"1.5²·12."},
{t:"n",sec:"14.9",p:"Eq. 14.83, p. 564",q:"Chord 300 m, sag 20 m, ground 272 m. Clearance, m?",a:8,tol:.01,u:"m",w:"300 − 20 − 272."},
{t:"m",sec:"14.9",p:"p. 563",q:"Which conditions are checked? Select all.",o:["Maximum temperature","Ice","Local ice in one span","Earthquake"],a:[0,1,2],w:"Those three."}
]});
