OHL.add({n:16,lead:"From site planning through foundations, concrete, tower erection and conductor stringing, to setting initial sags. Printed pages 621 to 673.",
init:function(K){var $=K.$,fmt=K.fmt;
K.stepper("seqStep",[["Plan","Survey the site conditions, schedule, stockyard, access."],["Foundations","Excavate or drive, stubs, concrete, cure, backfill, test."],["Earthing","Electrodes, measure, improve."],["Erect","After 80 % strength, about 14 days at 10 to 20 °C."],["Insulators","Sets and stringing blocks on suspension towers."],["String","Scaffolds, pilot rope, pulling rope, conductor."],["Sag","Set initial sags, terminate, clip in with offsets."],["Finish","Jumpers, dampers, spacers, markers, clean-up."]]);
K.stepper("soilStep",[["1 Normal soil","Clay, silt, sand, easy rock fragments. Hydraulic excavators."],["2 Decomposing rock","Pebbles or gravel. Back-action shovels with high force."],["3 Loose stones","Large stones. High excavating force."],["4 Sound rock","Pneumatic or hydraulic hammers, or explosives. Rock anchors minimise excavation."],["5 Under water, swamp","Driven piles, which need no excavation."]]);
(function(){var D=[.5,1.5,2.5,3.5,4.5,5.5,6.5,7.5,8.5,9.5,10.5,11.5],L=[[10,15,19,22,38,51,72,81,90,95,108,118],[9,12,14,18,22,33,48,57,83,91,96,105],[8,9,12,15,19,24,37,49,55,73,88,100],[11,13,16,19,24,31,38,44,55,76,83,97]],C=["accent","v3","v4","v1"];
K.plot("pileChart",{h:240,x:{min:0,max:12,label:"Depth, m"},y:{min:0,max:125,label:"Blows per metre"},series:L.map(function(l,i){return{p:l.map(function(v,j){return[D[j],v]}),c:C[i],t:"Leg "+(i+1)}}),aria:"Blows per metre with depth for four legs"})})();
K.bars("groutBars",{lw:80,minw:320,u:"",max:1,rows:[["Leg 1",.81,"accent"],["Leg 2",.83,"accent"],["Leg 3",.76,"v4"],["Leg 4",.93,"accent"]],aria:"Grouting factor by leg"});
K.plot("proofChart",{h:220,x:{min:0,max:1.5,label:"Load / working load"},y:{min:0,max:7,label:"Displacement, mm"},series:[{p:[[0,0],[1.2,3.9]],c:"accent",t:"Pile 1, test"},{p:[[1.2,3.9],[1.5,5.2]],c:"accent",dash:true},{p:[[0,0],[1.2,1.1]],c:"v3",t:"Pile 2, test"},{p:[[1.2,1.1],[1.5,1.5]],c:"v3",dash:true},{p:[[0,6],[1.5,6]],c:"v4",t:"Limit 6 mm"}],marks:[{x:1.5,y:5.2,t:"5.2"},{x:1.5,y:1.5,t:"1.5"}],aria:"Proof test load against displacement"});
K.calc("mixCalc",{f:[{k:"c",l:"Cement",min:240,max:400,step:10,v:280,u:"kg/m³"},{k:"w",l:"Water-cement ratio",min:.4,max:.8,step:.01,v:.6,u:""},{k:"g",l:"Aggregate",min:1700,max:2100,step:10,v:1980,u:"kg/m³"},{k:"m",l:"Surface moisture",min:0,max:6,step:.1,v:2.5,u:"%"}],run:function(v,c){var W=v.c*v.w,S=v.g*v.m/100,A=Math.max(W-S,0);K.bars(c,{lw:150,minw:340,u:" l",max:Math.max(W,200),rows:[["Total water",+W.toFixed(0),"rule"],["In aggregate",+S.toFixed(0),"v3"],["Add at mixer",+A.toFixed(0),"accent"]],aria:"Water balance"});return'<span class="big">Add '+fmt(A)+' l/m³</span><span>'+fmt(S/W*100)+' % comes with the aggregate</span><span class="'+(v.w>=.5&&v.w<=.6?"good":"warn")+'">'+(v.w>=.5&&v.w<=.6?"In the usual range for plastic concrete":"Outside 0.5 to 0.6")+'</span>'}});
K.bars("ageBars",{lw:170,minw:380,u:" l/m³",max:220,rows:[["ENV 206, 280 × 0.55",154,"v4"],["Fig. 16.9, 280 × 0.60",168,"v3"],["DIN 1045, 320 × 0.60",192,"accent"]],aria:"Water content of mixes"});
K.calc("cubeCalc",{f:[{k:"s",l:"Measured",min:10,max:60,step:.5,v:35,u:"N/mm²"},{k:"t",l:"Specimen",o:[[1,"Cube 150 mm"],[.95,"Cube 200 mm"],[.8065,"Cylinder"]],v:1}],run:function(v){var c=v.s/v.t;return'<span>Cube 150: '+fmt(c,1)+'</span><span>Cube 200: '+fmt(c*.95,1)+'</span><span class="big">Cylinder: '+fmt(c/1.24,1)+' N/mm²</span>'}});
K.stepper("concStep",[["Clean pit","Pump out water or use underwater concrete. Lean concrete first."],["Delivery","Check note and consistence. Place at once."],["Time limit","At 20 °C: 60 min for German, 45 min for EN cement, without retarder."],["Temperature","Between 5 and 30 °C fresh. Protect until 6 N/mm²."],["Falling","Chutes above 2.0 m."],["Compaction","Layers of 0.5 m. Vibrator every 0.4 to 0.8 m, 0.15 m into the layer below. Stop when air stops."],["Curing","2 to 10 days wet, covered or sprayed."],["Testing","Compression at 28 days. C20/25 site control may be done by the contractor."]]);
var inc=[[95,1.75],[100,1.68],[110,1.53],[120,1.36],[130,1.15],[140,.96],[145,.86],[150,.76],[160,.52],[170,.27]];function ip(x){for(var i=1;i<inc.length;i++)if(x<=inc[i][0]){var a=inc[i-1],b=inc[i];return a[1]+(b[1]-a[1])*(x-a[0])/(b[0]-a[0])}return inc[inc.length-1][1]}
K.calc("incCalc",{f:[{k:"a",l:"Line angle",min:95,max:170,step:1,v:145,u:"°"},{k:"w",l:"Tower width",min:2,max:15,step:.05,v:6.3,u:"m"}],run:function(v,c){var p=ip(v.a);K.plot(c,{h:220,x:{min:90,max:175,label:"Line angle, °"},y:{min:0,max:1.9,label:"Inclination, %"},series:[{p:inc,c:"accent"}],marks:[{x:v.a,y:p,t:fmt(p,2)+" %"}],aria:"Inclination against line angle"});return'<span class="big">Raise stubs by '+fmt(v.w*p*10)+' mm</span>'}});
K.calc("poleCalc",{f:[{k:"h",l:"Reference height",min:15,max:60,step:1,v:30,u:"m"},{k:"e",l:"Elastic deflection",min:0,max:1.5,step:.01,v:.4,u:"m"},{k:"n",l:"Slip joints",min:0,max:5,step:1,v:2,u:""},{k:"t",l:"Tilt per joint",min:.3,max:.4,step:.01,v:.35,u:"°"},{k:"f",l:"Foundation",min:0,max:.5,step:.01,v:.1,u:"°"}],run:function(v){var S=0;for(var i=1;i<=v.n;i++)S+=Math.tan(v.t*Math.PI/180)*v.h*(1-i/(v.n+1));var F=Math.tan(v.f*Math.PI/180)*v.h,r=v.e+S+F,b=Math.atan(r/v.h)*180/Math.PI;return'<span>Joints add '+fmt(S,3)+' m</span><span>Foundation adds '+fmt(F,3)+' m</span><span class="big">r<sub>m</sub> = '+fmt(r,3)+' m, β = '+fmt(b,2)+'°</span>'}});
K.calc("ereCalc",{f:[{k:"a",l:"Crane access in all weather",o:[[1,"Yes"],[0,"No"]],v:0},{k:"t",l:"Tower",o:[[0,"Light and narrow"],[1,"Medium"],[2,"Wide or very tall"],[3,"Guyed"]],v:2},{k:"g",l:"Room for ground anchors",o:[[1,"Yes"],[0,"No"]],v:0},{k:"u",l:"Very short time or no access",o:[[0,"No"],[1,"Yes"]],v:0}],run:function(v){var m,w;if(v.u){m="Helicopter";w="Costly and weather-dependent. Preassemble to its capacity."}else if(v.t===3){m=v.a?"Crane, assembled on the ground":"Auxiliary mast or manual";w=v.a?"Quick and cheap on flat land. Beam needed above 32 m.":"Needs no special roads or terrain cuts."}else if(v.a&&v.t<2){m="Mobile crane";w="One piece up to about 30 m high and 2.5 m wide."}else if(v.t===0){m=v.a?"Crane or gin pole at a leg member":"Gin pole at a leg, or elevation";w="No anchors needed, watch bending."}else if(v.t===2){m="Gin pole in the tower centre";w="No ground anchors. Used for the 227 m Elbe towers."}else{m=v.g?"Gin pole outside the tower":"Gin pole in the tower centre";w=v.g?"Needs a wide work area for four anchors.":"No ground anchors."}return'<span class="big">'+m+'</span><span>'+w+'</span>'}});
K.stepper("ereStep",[["Elevation","Low, light towers. Legs, diaphragm, then pieces with winches and trucks."],["Crane","Sections or whole towers, needs a wide assembly area and access."],["Outside gin pole","Bracket on a leg, four head anchors to the ground."],["Centre gin pole","Foot and head anchors to brackets in the tower. Two thirds above brackets."],["Leg gin pole","Hinged inside at one leg. Small lifts only."],["Helicopter","Crews on several towers in turn. Strong wake with heavy machines."]]);
K.bars("torqueBars",{lw:60,minw:320,u:" N·m",max:650,rows:[["M12",60,"accent"],["M16",120,"accent"],["M20",180,"accent"],["M22",230,"accent"],["M24",340,"accent"],["M27",610,"accent"]],aria:"Upper limit bolt torque"});
K.stepper("trainStep",[["Reel stand","Braked, six reel widths behind tensioner."],["Tensioner","Holds tension. Mechanical, hydraulic or engine-driven."],["Running board","Joins bundle to one rope, keeps it level."],["Stringing blocks","Lined sheaves on each tower."],["Pulling rope","Pulled from tensioner to puller."],["Puller","Twin bullwheels, up to 50 to 100 m/min."],["Reel winder","Winds the rope under low tension."]]);
K.calc("eqCalc",{f:[{k:"a",l:"Conductor section",min:50,max:1000,step:10,v:564,u:"mm²"},{k:"n",l:"Subconductors",min:1,max:4,step:1,v:2,u:""},{k:"d",l:"Diameter",min:8,max:40,step:.1,v:32.2,u:"mm"}],run:function(v){var F=v.a*50*v.n/1000;return'<span>Stringing force about '+fmt(F,1)+' kN</span><span class="big">Rope at least '+fmt(F*3)+' kN</span><span>Block sheave ≥ '+fmt(v.d*20)+' mm</span><span>Tensioner wheel ≥ '+fmt(v.d*30)+' mm</span>'}});
K.calc("waveCalc",{f:[{k:"a",l:"Span",min:100,max:800,step:10,v:400,u:"m"},{k:"H",l:"Horizontal force",min:5,max:60,step:.5,v:15,u:"kN"},{k:"m",l:"Mass",min:.4,max:3,step:.005,v:1.235,u:"kg/m"}],run:function(v,c){var C=Math.sqrt(v.H*1000/v.m),t=v.a/C,f=9.81/8*t*t,P=[];for(var x=0;x<=40;x+=1)P.push([x,.03406*x*x]);var t6=6*t;K.plot(c,{h:210,x:{min:0,max:40,label:"t₆, s"},y:{min:0,max:55,label:"Sag, m"},series:[{p:P,c:"accent"}],marks:[{x:Math.min(t6,40),y:Math.min(f,55),t:fmt(f,1)+" m"}],aria:"Sag against wave time"});return'<span>Wave speed '+fmt(C,1)+' m/s</span><span>t₆ = '+fmt(t6,1)+' s</span><span class="big">Sag '+fmt(f,2)+' m</span>'}});
K.calc("sightCalc",{f:[{k:"a",l:"Span",min:150,max:900,step:10,v:500,u:"m"},{k:"f",l:"Initial sag",min:4,max:40,step:.1,v:16,u:"m"},{k:"D",l:"Attachment above theodolite",min:1,max:40,step:.1,v:16,u:"m"},{k:"h",l:"Height difference",min:-80,max:80,step:1,v:30,u:"m"}],run:function(v,c){var k=(v.h-4*v.f+4*Math.sqrt(v.f*v.D))/v.a,ph=Math.atan(k)*180/Math.PI,x=v.a*Math.sqrt(v.D/(4*v.f)),ok=x>=v.a/3&&x<=2*v.a/3,S=[];for(var i=0;i<=50;i++){var q=i/50*v.a;S.push([q,v.h*q/v.a-4*v.f*q*(v.a-q)/(v.a*v.a)])}var ys=S.map(function(p){return p[1]}).concat([-v.D,0,v.h]);K.plot(c,{h:230,x:{min:0,max:v.a,label:"Along span, m"},y:{min:Math.min.apply(null,ys)-3,max:Math.max.apply(null,ys)+3,label:"Level from attachment, m"},series:[{p:S,c:"accent",t:"Conductor"},{p:[[0,-v.D],[v.a,-v.D+k*v.a]],c:"v4",dash:true,t:"Sight"}],marks:[{x:Math.min(x,v.a),y:-v.D+k*Math.min(x,v.a),t:"Touch"}],aria:"Sight line tangent to conductor"});var fh=v.f*Math.pow(1+Math.abs(v.h)/(4*v.f),2)-Math.abs(v.h);return'<span class="big">φ = '+fmt(ph,2)+'°</span><span class="'+(ok?"good":"bad")+'">Touches at '+fmt(x)+' m, '+(ok?"central third":"outside central third")+'</span><span>Horizontal sight sag f<sub>h</sub> = '+fmt(fh,2)+' m'+(Math.abs(v.h)>4*v.f?" (vertex outside span)":"")+'</span>'}});
K.stepper("safeStep",[["Reclosers","Disable auto-reclosing on live lines that could be touched."],["Machines","Earth rod below 25 Ω, on an earthing mat."],["Running earths","In front of puller and tensioner."],["Blocks","Earth first structures, then every third support."],["Work points","Earth all conductors at the tower where clipping-in or jumper work is done."],["Earth removal","Earth is broken, voltage returns. Keep sections short, watch the last earths."],["Rating","Earthing gear tested to 20 kA for 0.4 s."]]);
function L(H,w,a,h){return Math.sqrt(h*h+Math.pow(2*H/w*Math.sinh(a*w/(2*H)),2))}
K.calc("secCalc",{f:[{k:"s",l:"Clipped-in stress",min:45,max:60,step:.1,v:54.6,u:"N/mm²"},{k:"K",l:"Insulator set length",min:1,max:3,step:.1,v:2,u:"m"},{k:"G",l:"Insulator set weight",min:100,max:3000,step:50,v:300,u:"N"}],run:function(v,c){var A=157.8,w=.59*9.81,H0=v.s*A,a=[412,293,239,250,438],h=[15.06,96,96.65,73.56,1.09],n=5,Lo=a.map(function(x,i){return Math.sqrt(x*x+h[i]*h[i])}),H=[H0,H0,H0,H0,H0],k,i,G=v.G;
 function tip(H,a,h,s){return H/w*(Math.cosh(w*a/(2*H)+s*Math.asinh(h*w/(2*H*Math.sinh(w*a/(2*H)))))-1)}
 var N=0;for(i=0;i<n;i++)N+=Math.pow(a[i],4)/Lo[i];
 for(k=0;k<60;k++){var H2=[H[0]];for(i=0;i<n-1;i++)H2.push(H2[i]+w*(tip(H[i],a[i],h[i],1)-tip(H[i+1],a[i+1],h[i+1],-1)));var D=0;for(i=0;i<n;i++)D+=Math.pow(a[i],4)/Lo[i]/(H2[i]*H2[i]);var E=Math.sqrt(N/D);H=H2.map(function(x){return x+H0-E})}
 var ds=[0,0,0,0,0,0],ap=a.slice();for(k=0;k<20;k++){for(i=1;i<n;i++){var hl=H[i-1],hr=H[i],sl=ap[i-1]+2*hl*h[i-1]/(w*ap[i-1]),sr=ap[i]-2*hr*h[i]/(w*ap[i]),V=hl*Math.sinh(sl*w/(2*hl))+hr*Math.sinh(sr*w/(2*hr));ds[i]=v.K*Math.sin(Math.atan((H[i]-H[i-1])/(V+G/2)))}ap=a.map(function(x,j){return x+ds[j+1]-ds[j]})}
 var off=[],c2=0;for(i=0;i<n;i++){c2+=L(H0,w,a[i],h[i])-L(H[i],w,ap[i],h[i]);off.push(c2*100)}
 K.bars(c,{lw:100,minw:340,u:" N/mm²",max:75,rows:H.map(function(x,i){return["Span "+(i+1)+", "+a[i]+" m",+(x/A).toFixed(1),"accent"]}),aria:"Stress in each span on blocks"});
 return'<span>Clipped-in stress '+fmt(v.s,1)+' in every span</span><span class="big">Offsets at towers 3 to 7: '+off.map(function(x){return fmt(x)}).join(", ")+' cm</span><span>Book, 14 days: −12, −88, −98, −58, 2 cm</span>'}});
K.calc("creepCalc",{f:[{k:"w",l:"Steel share of mass",min:0,max:50,step:1,v:39,u:"%"},{k:"s",l:"Everyday stress",min:5,max:30,step:.1,v:13.7,u:"% RTS"},{k:"n",l:"Exponent n",min:.1,max:.3,step:.01,v:.2,u:""},{k:"t",l:"Time to sagging",o:[[12,"12 h"],[24,"24 h"],[168,"7 d"],[336,"14 d"],[720,"30 d"]],v:336},{k:"e",l:"Expansion",min:15,max:25,step:.1,v:18.9,u:"10⁻⁶/K"}],run:function(v,c){var e30b=1.12-.97*v.w/100,ks=v.s/20,e30=e30b*ks,T=262800,e1=e30/Math.pow(T,v.n),done=e1*Math.pow(v.t,v.n),rest=e30-done,dT=rest/1000/(v.e*1e-6),P=[];for(var l=0;l<=5.42;l+=.1){var tt=Math.pow(10,l);P.push([l,e1*Math.pow(tt,v.n)])}K.plot(c,{h:210,x:{min:0,max:5.42,label:"log₁₀ time, hours"},y:{min:0,max:Math.max(e30*1.1,.2),label:"Creep, ‰"},series:[{p:P,c:"accent"}],marks:[{x:Math.log(v.t)/Math.LN10,y:done,t:fmt(done,3)+" ‰"}],aria:"Creep strain with time"});return'<span>ε₃₀ = '+fmt(e30,3)+' ‰, e<sub>1h</sub> = '+fmt(e1,4)+' ‰</span><span>Still to come '+fmt(rest,3)+' ‰</span><span class="big">Sag at '+fmt(dT,1)+' K colder</span>'}});
K.calc("ovCalc",{f:[{k:"a",l:"Span",min:100,max:800,step:10,v:600,u:"m"},{k:"T",l:"Equivalent temperature",min:0,max:50,step:1,v:30,u:"K"}],run:function(v,c){var A=635.5,E=68000,et=19.4e-6,w=2.116*9.81,H1=57*A,R=function(a){if(v.T===0)return{r:0,f:w*a*a/(8*H1),H:H1};var C=E*A*Math.pow(a*w,2)/(24*H1*H1)-E*A*et*v.T-H1,Q=E*A*Math.pow(a*w,2)/24,x=H1;for(var i=0;i<100;i++){var f=x*x*(x+C)-Q,d=3*x*x+2*C*x;x-=f/d}var f1=w*a*a/(8*H1),f2=w*a*a/(8*x);return{r:f1-f2,f:f1,H:x}},P=[],r=R(v.a);for(var a=100;a<=800;a+=20)P.push([a,R(a).r/R(a).f*100]);K.plot(c,{h:210,x:{min:100,max:800,label:"Span, m"},y:{min:0,max:60,label:"Sag reduction, %"},series:[{p:P,c:"accent"}],marks:[{x:v.a,y:r.r/r.f*100,t:fmt(r.r/r.f*100,1)+" %"}],aria:"Sag reduction against span"});return'<span class="big">Sag less by '+fmt(r.r,2)+' m</span><span>Stress rises to '+fmt(r.H/A,1)+' N/mm²</span>'}});
},
cards:[
["Construction schedule","Plots quantities against time, or a network on large jobs.","p. 622–623"],
["Access road limits","Ramp below 20 %, radius 10 m, width 3 m.","p. 625"],
["Fence earthing","Sectionalise and earth wire fences before stringing.","p. 625"],
["Lean concrete layer","50 to 100 mm under reinforcement.","p. 626"],
["Backfill layer","About 0.20 m, compacted.","p. 626"],
["Driving report","Blows per metre, indicates resistance and uplift capacity.","p. 628"],
["Grouting factor","Mortar injected over theoretical space.","p. 628"],
["Proof testing","At least 5 % of piles.","p. 629"],
["Bare pile test wait","Three weeks after driving.","p. 629"],
["C20/25","Cylinder 20, 150 mm cube 25 N/mm².","p. 633"],
["Water-cement ratio","0.5 to 0.6 for plastic tower concrete.","p. 634"],
["Exposure 2b","Humid with frost, the normal condition for towers.","p. 635–636"],
["Fresh concrete temperature","5 to 30 °C.","p. 635"],
["Concrete layer","0.5 m, vibrator 0.4 to 0.8 m apart.","p. 638"],
["Erection strength","80 % after 14 days at 10 to 20 °C.","p. 639"],
["Earth electrode depth","0.6 to 1.0 m.","p. 640"],
["Tower inclination","Lean against conductor pull at everyday load.","p. 642"],
["Bolt slip","4 mm per joint.","p. 644"],
["Slip joint tilt","0.3 to 0.4° per joint.","p. 644"],
["Gin pole","Lattice mast of 5 m parts replacing a crane.","p. 646"],
["Guy tension","7 to 10 % of RTS.","p. 652"],
["Tower tolerance","3 mm per metre of height.","p. 652"],
["Tensioner and puller","Hold back and pull, kilometres apart.","p. 654"],
["Sheave diameter","At least 20 × conductor.","p. 657"],
["Wave method","f = g·t²/8, independent of conductor.","p. 662"],
["Conductor creep","Permanent stretch growing with stress and heat.","p. 670"],
["Clamp offset","Clip-in shift that makes sets hang plumb.","p. 663"],
["Equivalent temperature","ΔT = e/ε<sub>T</sub>, a colder sagging temperature.","p. 671"]],
fm:[
["β = arctan(r<sub>m</sub>/h<sub>T</sub>)","Erection lean.","16.1, p. 642"],
["r<sub>m</sub> = r<sub>el</sub> + Σα<sub>si</sub>·s<sub>i</sub>","Top displacement.","16.2, p. 643"],
["c = √(H/m<sub>C</sub>)","Wave speed.","16.7, p. 662"],
["f = g·t²/8","Sag from running time.","16.10, p. 662"],
["φ = arctan[(h − 4f + 4√(f·D))/a]","Sight angle.","16.12, p. 662"],
["f<sub>h</sub> = f[1 + h/(4f)]² − h","Horizontal sight sag.","16.13, p. 663"],
["H<sub>i+1</sub> − H<sub>i</sub> = h<sub>si</sub>·m<sub>C</sub>g","Equilibrium on blocks.","16.14, p. 667"],
["Σa⁴/(L₀·H<sub>i</sub>²) = (1/H₀²)Σa⁴/L₀","Length balance.","16.29, p. 669"],
["e = e<sub>1h</sub>·t<sup>n</sup>","Creep with time.","16.32, p. 670"],
["ε̄₃₀ = 1.12 − 0.97·w/100","30-year creep at 20 % RTS, ‰.","16.34, p. 671"],
["k<sub>σ</sub> = σ̄/20","Stress factor.","16.35, p. 671"],
["ΔT<sub>id</sub> = e/ε<sub>T</sub>","Equivalent temperature.","16.36, p. 671"]],
wx:[
["Stub rise","Line angle 145°, width 6.30 m.",["Figure 16.12: 0.86 %.","6.30·0.86·1000/100 = 54 mm."]],
["Water for a mix","C20/25, 280 kg cement, w/c 0.6, 1980 kg aggregate with 2.5 % moisture.",["Water 280·0.6 = 168 l.","Surface water 1980·0.025 = 50 l.","Add about 118 l, so 30 % arrives with the aggregate."]],
["Wave timing","Span 400 m, H = 15 kN, m = 1.235 kg/m. (Illustrative.)",["c = √(15 000/1.235) = 110.2 m/s.","t = 400/110.2 = 3.63 s.","f = 9.81/8·3.63² = 16.2 m.","t₆ = 21.8 s, and 0.03406·21.8² = 16.2 m."]],
["Creep allowance","128-AL1/30-ST1A: steel 39 %, 13.7 % RTS, n = 0.2, sag at 14 days, ε<sub>T</sub> = 18.9·10⁻⁶/K.",["ε̄₃₀ = 1.12 − 0.97·0.39 = 0.74 ‰.","k<sub>σ</sub> = 13.7/20 = 0.685, so e₃₀ ≈ 0.51 ‰.","e<sub>1h</sub> = 0.51/(2.628·10⁵)^0.2 = 0.042 ‰.","At 336 h: 0.134 ‰ done, 0.376 ‰ to come.","ΔT = 0.376·10⁻³/18.9·10⁻⁶ = 19.9 K."]]],
bad:[
["Assuming site-mixed concrete is as sure as plant concrete","Stay at C20/25, and verify a mix."],
["Adding extra water for workability","Strength falls. Use plasticiser and good grading."],
["Removing backfill care above concrete","Wait 24 hours before compaction."],
["Testing bare piles straight away","Wait three weeks, friction is still growing."],
["Erecting strain towers plumb","They need a lean against conductor pull."],
["Using ordinary grips on fibre conductors","Use armour rods."],
["Treating an earthed conductor as dead","Remove the earth and voltage returns."],
["Sagging to final sag","Set initial sag, allowing for creep."],
["Assuming H is equal on blocks","Tension S is equal on blocks, H is equal in clamps."],
["Applying Eq. 16.11 as printed","The constant is 0.03406."]],
q:[
{t:"s",sec:"16.1",p:"p. 623",q:"What does comparing plan and actual progress need?",o:["A time schedule","A sag table","A tower list","A soil probe"],a:[0],w:"Insert actual progress into the schedule."},
{t:"n",sec:"16.2",p:"p. 625",q:"Minimum access road width, m?",a:3,tol:.01,u:"m",w:"3 m."},
{t:"s",sec:"16.3",p:"p. 626",q:"Best foundation under water or in swamp:",o:["Driven piles","Slab","Grillage","Rock anchor"],a:[0],w:"They need no excavation."},
{t:"n",sec:"16.3",p:"p. 626",q:"Backfill layer thickness, m?",a:.2,tol:.01,u:"m",w:"About 0.20 m."},
{t:"s",sec:"16.3",p:"p. 628",q:"More blows per metre mean:",o:["Higher resistance","Softer soil","Bad grout","Lower capacity"],a:[0],w:"They indicate driving resistance and uplift capacity."},
{t:"n",sec:"16.3",p:"Table 16.1",q:"Grout 1.75 m³ with theoretical 2.16 m³. Factor? Two decimals.",a:.81,tol:.01,u:"",w:"1.75/2.16."},
{t:"n",sec:"16.3",p:"p. 629",q:"Minimum share of piles proof-tested, %?",a:5,tol:.01,u:"%",w:"5 %."},
{t:"s",sec:"16.3.7",p:"p. 633",q:"In C20/25, what is 25?",o:["150 mm cube strength","Cylinder strength","Water content","Cement class"],a:[0],w:"First value cylinder, second cube."},
{t:"n",sec:"16.3.7",p:"p. 634",q:"Cement 300 kg/m³, w/c 0.55. Water, l?",a:165,tol:1,u:"l",w:"300·0.55."},
{t:"s",sec:"16.3.7",p:"p. 635",q:"Fresh concrete must stay between:",o:["5 and 30 °C","0 and 40 °C","10 and 20 °C","−5 and 25 °C"],a:[0],w:"Before placing."},
{t:"t",sec:"16.3.7",p:"p. 633",q:"Sea water with sea aggregates is no longer accepted on the Arabian peninsula.",a:true,w:"After corrosion damage."},
{t:"n",sec:"16.3.7",p:"p. 638",q:"Fall height above which chutes are needed, m?",a:2,tol:.01,u:"m",w:"Above 2.0 m."},
{t:"n",sec:"16.3.7",p:"p. 639",q:"Cube 150 result 31 N/mm². Cylinder strength?",a:25,tol:.1,u:"N/mm²",w:"31/1.24."},
{t:"s",sec:"16.4",p:"p. 640–641",q:"Which raises earthing resistance?",o:["Stones at the electrode","Cohesive soil","Bright connections","Deep rods"],a:[0],w:"Stones and coarse gravel."},
{t:"n",sec:"16.5",p:"p. 644",q:"0.86 % on 6.30 m. Rise, mm?",a:54,tol:1,u:"mm",w:"54 mm."},
{t:"s",sec:"16.5",p:"p. 642",q:"Which aim needs the larger lean before stringing?",o:["Horizontal crossarm","Vertical top","No lean","Same"],a:[0],w:"Stated on p. 642."},
{t:"s",sec:"16.6",p:"p. 647",q:"Which gin pole needs no ground anchors on large towers?",o:["In the tower centre","Outside","At a leg with loads","None"],a:[0],w:"Anchored to brackets inside."},
{t:"n",sec:"16.6",p:"p. 652",q:"Tolerance on a 40 m guyed tower, mm?",a:120,tol:1,u:"mm",w:"3 mm/m."},
{t:"s",sec:"16.7",p:"p. 653",q:"Joints must be how far from a structure?",o:["At least 10 m","1 m","100 m","Any"],a:[0],w:"At least 10 m."},
{t:"s",sec:"16.8.3",p:"p. 654",q:"Why is stringing done under tension?",o:["To avoid ground contact and damage","To save rope","To shorten the line","To cut noise"],a:[0],w:"And corrosion from soil."},
{t:"n",sec:"16.8.3",p:"p. 657",q:"Conductor 30 mm. Minimum block sheave, mm?",a:600,tol:1,u:"mm",w:"20 × d."},
{t:"s",sec:"16.8.3",p:"p. 656",q:"Which connection may not run over a bullwheel?",o:["Swivel","Rigid connector","Both may","Neither"],a:[0],w:"Only rigid connectors."},
{t:"n",sec:"16.8.4",p:"Eq. 16.10",q:"t₆ = 20 s. True sag, m? One decimal.",a:13.6,tol:.1,u:"m",w:"0.03406·400. The printed constant is misprinted."},
{t:"t",sec:"16.8.4",p:"p. 662",q:"The wave method depends on conductor material.",a:false,w:"m and H cancel."},
{t:"s",sec:"16.8.4",p:"p. 666",q:"Earth resistance limit of stringing equipment rods:",o:["Below 25 Ω","Below 1000 Ω","Below 0.1 Ω","None"],a:[0],w:"IEC 61328."},
{t:"n",sec:"16.8.4",p:"p. 665",q:"Induced voltage may reach what share of the live voltage, %?",a:30,tol:.1,u:"%",w:"As much as 30 %."},
{t:"s",sec:"16.8.5",p:"p. 666",q:"On stringing blocks what is equal either side?",o:["Tensile force","Horizontal force","Sag","Span"],a:[0],w:"No moment about the axle."},
{t:"n",sec:"16.8.5",p:"Eq. 16.34",q:"Steel 0 %, ε̄₃₀ in ‰?",a:1.12,tol:.01,u:"‰",w:"All-aluminium type value."},
{t:"n",sec:"16.8.5",p:"Eq. 16.36",q:"e = 0.4 ‰, ε<sub>T</sub> = 20·10⁻⁶/K. ΔT, K?",a:20,tol:.1,u:"K",w:"0.0004/0.00002."},
{t:"s",sec:"16.8.5",p:"p. 671",q:"Overtensioning reduces sag most, in percent, in:",o:["Short spans","Long spans","All equally","No span"],a:[0],w:"27.5 % at 200 m, 5.5 % at 600 m."}
]});
