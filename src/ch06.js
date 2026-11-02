OHL.add({n:6,lead:"How reliable a line should be, how its components are coordinated, and how wind and ice loads are derived from measurements and standards. Printed pages 143 to 192.",
init:function(K){var $=K.$,fmt=K.fmt;
function rng(a,b,n){var o=[];for(var i=0;i<=n;i++)o.push(a+(b-a)*i/n);return o}
function Phi(x){var z=x/Math.SQRT2,t=1/(1+.5*Math.abs(z)),r=t*Math.exp(-z*z-1.26551223+t*(1.00002368+t*(.37409196+t*(.09678418+t*(-.18628806+t*(.27886807+t*(-1.13520398+t*(1.48851587+t*(-.82215223+t*.17087277)))))))));return z>=0?1-r/2:r/2}
function invPhi(p){var lo=-8,hi=8;for(var i=0;i<70;i++){var m=(lo+hi)/2;if(Phi(m)<p)lo=m;else hi=m}return(lo+hi)/2}
K.stepper("caseStep",[["1. Both fixed","Load Q and strength R constant. If R is above Q, reliability is 1."],["2. Fixed load, scattered strength","Q constant, R distributed. Reliability = 1 − F<sub>R</sub>(e). For e = 10 %, 0.90."],["3. Scattered load, fixed strength","Reliability = 1 − 1/T<sub>r</sub>, independent of load scatter."],["4. Both scattered","The general case. Reliability is about 1 − 1/(2T<sub>r</sub>) for v<sub>R</sub> up to 0.1."]]);
function pf(T,vQ,vR){var b=vQ*Math.sqrt(6)/Math.PI,a=1-.5772*b,QT=a-b*Math.log(-Math.log(1-1/T)),R=QT/(1-1.28*vR);var s=0,N=4000,x0=a-8*b,x1=a+70*b,dx=(x1-x0)/N;for(var i=0;i<=N;i++){var x=x0+i*dx,u=(x-a)/b,f=Math.exp(-u-Math.exp(-u))/b,Fr=vR>0?Phi((x-R)/(vR*R)):(x>=R?1:0);s+=f*Fr*dx}return s}
K.calc("pfCalc",{f:[{k:"T",l:"Return period",o:[[50,"50 years"],[150,"150 years"],[500,"500 years"]],v:50},{k:"Q",l:"Load variation v<sub>Q</sub>",min:.2,max:.5,step:.05,v:.4,u:""},{k:"R",l:"Strength variation v<sub>R</sub>",min:0,max:.2,step:.01,v:.05,u:""}],run:function(v,c){
 var S=rng(0,.2,20),p=pf(v.T,v.Q,v.R),m=1/v.T;K.plot(c,{h:240,x:{min:0,max:.2,label:"Strength variation v_R",ticks:[0,.05,.1,.15,.2]},y:{min:0,max:m*1.2,label:"Yearly failure probability"},series:[{p:S.map(function(r){return[r,pf(v.T,v.Q,r)]}),c:"accent"}],hlines:[{y:m,t:"1/T",c:"v4"},{y:m/2,t:"1/(2T)",c:"v1"}],marks:[{x:v.R,y:p}],aria:"Failure probability against strength variation"});
 return'<span class="big">P<sub>f</sub> = '+fmt(p,4)+'</span><span>Between 1/T = '+fmt(m,4)+' and 1/(2T) = '+fmt(m/2,4)+'</span>'}});
K.calc("lifeCalc",{f:[{k:"T",l:"Return period T<sub>r</sub>",o:[[50,"50 years"],[150,"150 years"],[500,"500 years"],[1000,"1000 years"]],v:50},{k:"N",l:"Life",min:10,max:100,step:5,v:50,u:"years"}],run:function(v,c){
 function s(f,N){return Math.pow(1-f,N)}K.plot(c,{h:220,x:{min:0,max:100,label:"Years in service"},y:{min:0,max:1,label:"Reliability"},series:[{p:rng(0,100,50).map(function(N){return[N,s(1/v.T,N)]}),c:"v4",t:"P_f1 = 1/T"},{p:rng(0,100,50).map(function(N){return[N,s(.5/v.T,N)]}),c:"accent",t:"P_f1 = 1/(2T)"}],vlines:[{x:v.N}],aria:"Survival over life"});
 return'<span>Survival over '+v.N+' years: '+fmt(s(1/v.T,v.N),2)+' to '+fmt(s(.5/v.T,v.N),2)+'</span><span>Theoretical failure: '+fmt(1-s(1/v.T,v.N),2)+' to '+fmt(1-s(.5/v.T,v.N),2)+'</span>'}});
K.stepper("coordStep",[["Conductors: no","Fails the first three criteria: a break throws dynamic load on towers, repair is slow, and the range from damage to collapse is wide."],["Hardware: no","A cheap part in series with a costly one should be as strong: its failure is just as severe."],["Strain towers: no","Their failure spreads load and takes longer to repair."],["Foundations: no","Hard to repair and a wide scatter of strength."],["Suspension towers: yes","Failure stays local, a few towers. New towers go on intact foundations, and cascades are avoided."],["Exceptions","Crossings of shipping lanes and avalanche zones can be built to withstand broken conductors."]]);
K.calc("phiCalc",{f:[{k:"N",l:"Components N",min:1,max:160,step:1,v:10,u:""},{k:"v",l:"v<sub>R</sub>",min:.05,max:.3,step:.01,v:.2,u:""}],run:function(v,c){
 var eN=.1,f=function(N,V){var e1=1-Math.pow(1-eN,1/N),UN=-invPhi(eN),U1=-invPhi(e1);return{e:e1,n:(1-U1*V)/(1-UN*V),l:Math.exp(-U1*Math.sqrt(Math.log(V*V+1)))/Math.exp(-UN*Math.sqrt(Math.log(V*V+1)))}},r=f(v.N,v.v),S=[1,2,5,10,20,40,80,160];
 K.plot(c,{h:230,x:{min:1,max:160,log:true,label:"Number of components (log scale)",ticks:[1,2,5,10,20,50,100,160]},y:{min:0,max:1,label:"Strength factor"},series:[{p:S.map(function(N){return[N,f(N,v.v).n]}),c:"v4",t:"Normal"},{p:S.map(function(N){return[N,f(N,v.v).l]}),c:"accent",t:"Log-normal"}],aria:"Strength factor against number of components"});
 return'<span>e₁ = '+fmt(r.e,4)+'</span><span class="big">φ<sub>N</sub> = '+fmt(r.n,2)+' normal, '+fmt(r.l,2)+' log-normal</span>'}});
var UW=[[.95,.85,.75,.55],[1,.95,.85,.65],[1,1,.95,.75]],UG=[[.85,.75,.65,.5],[.95,.85,.75,.6],[1,1,.85,.7]];
K.calc("useCalc",{f:[{k:"t",l:"Suspension tower types",o:[[0,"1"],[1,"2"],[2,"3"]],v:0},{k:"c",l:"Terrain and constraints",o:[[0,"A1"],[1,"B1, A2"],[2,"B2, C1"],[3,"C2"]],v:1}],run:function(v){return'<span>Mean use factor for wind span: <b>'+fmt(UW[v.t][v.c],2)+'</b></span><span>Mean use factor for weight span: <b>'+fmt(UG[v.t][v.c],2)+'</b></span>'}});
K.bars("gmBars",{lw:220,minw:480,max:2.2,rows:[["Insulators",2,"v4"],["Fittings",1.9,"v4"],["Guyed towers, anchors",1.6,"v1"],["Concrete poles",1.5,"v1"],["Conductors",1.25,"accent"],["Bolted, welded connections",1.25,"accent"],["Reinforcement",1.15,"accent"],["Lattice members, steel poles",1.1,"accent"]],aria:"Material partial factors"});
var CT={10:[.94963,.49521],20:[1.06282,.52355],50:[1.16066,.54854],1000:[1.28255,.57722]};
K.calc("gumCalc",{f:[{k:"V",l:"Mean yearly maximum",min:10,max:40,step:.5,v:24,u:"m/s"},{k:"v",l:"Coefficient of variation",min:.05,max:.6,step:.01,v:.2,u:""},{k:"n",l:"Years of records",o:[[10,"10"],[20,"20"],[50,"50"],[1000,"very many"]],v:10},{k:"T",l:"Return period",o:[[50,"50 years"],[150,"150 years"],[500,"500 years"]],v:50}],run:function(v,c){
 var C=CT[v.n],f=function(T){return 1+v.v*(-C[1]/C[0]-Math.log(-Math.log(1-1/T))/C[0])},S=rng(.3,3,40).map(function(t){return Math.pow(10,t)}),r=f(v.T);
 K.plot(c,{h:230,x:{min:2,max:1000,log:true,label:"Return period, years (log scale)",ticks:[2,5,10,50,150,500,1000]},y:{min:.8,max:Math.max(2,f(1000)*1.05),label:"x_T / mean"},series:[{p:S.map(function(T){return[T,f(T)]}),c:"accent"}],marks:[{x:v.T,y:r,t:fmt(r,2)}],aria:"Gumbel ratio"});
 return'<span class="big">'+fmt(v.V*r,1)+' m/s</span><span>Ratio x<sub>T</sub>/x̄ = '+fmt(r,2)+', wind load up by '+fmt(r*r,2)+' times</span>'}});
var BF=[[.2,0,"calm"],[1.5,1,"light air"],[3.3,2,"light breeze"],[5.4,3,"gentle breeze"],[7.9,4,"moderate breeze"],[10.7,5,"fresh breeze"],[13.8,6,"strong breeze"],[17.1,7,"near gale"],[20.7,8,"gale"],[24.4,9,"strong gale"],[28.4,10,"storm"],[32.6,11,"violent storm"],[36.9,12,"hurricane"],[41.1,13,"hurricane"],[45.8,14,"hurricane"],[50.8,15,"hurricane"],[55.6,16,"hurricane"],[999,17,"hurricane"]];
K.calc("bfCalc",{f:[{k:"V",l:"Wind velocity",min:0,max:60,step:.5,v:24,u:"m/s"}],run:function(v){var b=BF.filter(function(x){return v.V<=x[0]})[0];return'<span class="big">Force '+b[1]+', '+b[2]+'</span>'}});
K.calc("rhoCalc",{f:[{k:"t",l:"Temperature",min:-30,max:40,step:1,v:5,u:"°C"},{k:"H",l:"Altitude",min:0,max:4000,step:100,v:1000,u:"m"}],run:function(v){var r=1.225*288/(v.t+273)*Math.exp(-.00012*v.H);return'<span class="big">'+fmt(r,3)+' kg/m³</span>'}});
K.stepper("iceStep",[["Glaze","700 to 900 kg/m³, strong adhesion, transparent, cylindrical with icicles. Freezing rain on wide plains."],["Wet snow","400 to 700 kg/m³, medium adhesion, white, cylindrical. Freezes hard if temperature falls after accretion."],["Hard rime","700 to 900 kg/m³, strong adhesion, opaque to transparent, eccentric pennants into wind."],["Soft rime","200 to 600 kg/m³, medium adhesion, white, eccentric pennants into wind. In-cloud icing above the cloud base."]]);
K.calc("iceCalc",{f:[{k:"t",l:"Radial ice thickness",min:1,max:60,step:1,v:15,u:"mm"},{k:"d",l:"Conductor diameter",min:10,max:45,step:.5,v:30,u:"mm"},{k:"D",l:"Density",min:200,max:900,step:50,v:900,u:"kg/m³"}],run:function(v,c){
 var g=9.81e-3*v.D*Math.PI*v.t*(v.d/1000+v.t/1000),gN=g,Di=v.d+2*v.t;K.plot(c,{h:220,x:{min:0,max:60,label:"Radial thickness, mm"},y:{min:0,max:9.81e-3*v.D*Math.PI*60*(v.d/1000+.06)*1.05,label:"Ice load, N/m"},series:[{p:rng(0,60,30).map(function(t){return[t,9.81e-3*v.D*Math.PI*t*(v.d/1000+t/1000)]}),c:"accent"}],marks:[{x:v.t,y:gN,t:fmt(gN,1)+" N/m"}],aria:"Ice load against thickness"});
 return'<span class="big">g<sub>I</sub> = '+fmt(gN,1)+' N/m</span><span>Equivalent ice diameter '+fmt(Di)+' mm</span>'}});
var TC={2:[.19,.05],3:[.22,.3],4:[.24,1]},VZ={1:[24.3,800],2:[27.6,1050]};
K.calc("wpCalc",{f:[{k:"z",l:"Wind zone",o:[[1,"Zone 1, 24.3 m/s"],[2,"Zone 2, 27.6 m/s"]],v:1},{k:"t",l:"Terrain",o:[[2,"II, open"],[3,"III, suburban"],[4,"IV, urban"]],v:2},{k:"h",l:"Height",min:5,max:80,step:1,v:50,u:"m"}],run:function(v,c){
 var k=TC[v.t],Vr=VZ[v.z][0],q0=VZ[v.z][1];function en(z){var V=k[0]*Vr*Math.log(z/k[1]),G=Math.pow(1+2.28/Math.log(z/k[1]),2);return .6125*1.05*G*V*V}function de(z){return 1.35*(q0+30*z/10)}
 var S=rng(5,80,30);K.plot(c,{h:250,x:{min:0,max:1500,label:"Design wind pressure, N/m²"},y:{min:0,max:80,label:"Height, m"},series:[{p:S.map(function(z){return[en(z),z]}),c:"v4",t:"EN 50341-1"},{p:S.map(function(z){return[de(z),z]}),c:"accent",t:"EN 50341-3-4 × 1.35"}],marks:[{x:en(v.h),y:v.h,t:fmt(en(v.h))}],aria:"Wind pressure against height"});
 return'<span>EN 50341-1: <b>'+fmt(en(v.h))+' N/m²</b></span><span>EN 50341-3-4 with partial factor: <b>'+fmt(de(v.h))+' N/m²</b></span>'}});
K.calc("glCalc",{f:[{k:"a",l:"Wind span",min:200,max:800,step:10,v:400,u:"m"}],run:function(v,c){var S=rng(200,800,30),en=function(a){return 1.3-.082*Math.log(a)},de=function(a){return .45+60/a};
 K.plot(c,{h:220,x:{min:200,max:800,label:"Wind span, m"},y:{min:.5,max:1.05,label:"G_L",ticks:[.5,.6,.7,.8,.9,1]},series:[{p:S.map(function(a){return[a,en(a)]}),c:"v4",t:"EN 50341-1"},{p:S.map(function(a){return[a,de(a)]}),c:"accent",t:"EN 50341-3-4"}],vlines:[{x:v.a}],aria:"Span factor"});
 return'<span>EN 50341-1: '+fmt(en(v.a),2)+'; EN 50341-3-4: '+fmt(de(v.a),2)+'</span>'}});
K.bars("ratBars",{lw:140,minw:360,w:460,rows:[["IEC, terrain B",3.05],["IEC, terrain C",3.44],["IEC, terrain D",4.01],["EN 50341-1",3.63],["EN 50341-3-4",4.7],["Hornisgrinde",6.5,"v4"]],aria:"Wind ratio"});
K.bars("momBars",{lw:140,minw:360,w:460,u:"%",max:120,rows:[["IEC 60826",88],["EN 50341-1",110,"v4"],["EN 50341-3-4",100]],aria:"Moment comparison"});
K.stepper("niStep",[["Uniform ice","All conductors carry g<sub>IR</sub>. Maximum weight."],["One conductor differs","All at 0.7·g<sub>IR</sub>, one at 0.28·g<sub>IR</sub>. Torsion."],["Adjacent spans differ","One side 0.28, other side 0.7·g<sub>IR</sub>. Longitudinal bending."],["One circuit differs","One circuit 0.28, others 0.7·g<sub>IR</sub>. Transverse bending."]]);
K.calc("deCalc",{f:[{k:"d",l:"Conductor diameter",min:10,max:45,step:.5,v:30,u:"mm"},{k:"t",l:"Ice zone",o:[[1,"Zone 1"],[2,"Zone 2"],[4,"Zone 3"]],v:1}],run:function(v){var g=v.t*(5+.1*v.d),D=Math.sqrt(v.d*v.d/1e6+4*g/(Math.PI*7500))*1000;return'<span class="big">'+fmt(g,1)+' N/m</span><span>D<sub>I</sub> = '+fmt(D,1)+' mm for combined wind and ice</span>'}});
(function(){var g=Math.sqrt(6)/Math.PI,V=.3,p2=Math.sqrt(Math.log(V*V+1)),p3=-.5*p2*p2,S=rng(-4,4,120);
K.plot("distCalc",{h:240,x:{min:-4,max:4,label:"Standardised variable"},y:{min:0,max:.55,label:"Density"},series:[{p:S.map(function(u){return[u,Math.exp(-u*u/2)/Math.sqrt(2*Math.PI)]}),c:"v1",t:"Normal"},{p:S.map(function(u){var x=(u/g+.5772),z=x;return[u,Math.exp(-z-Math.exp(-z))/g]}),c:"v4",t:"Gumbel"},{p:S.map(function(u){var x=1+u*V;if(x<=0)return[u,null];return[u,V*Math.exp(-.5*Math.pow((Math.log(x)-p3)/p2,2))/(x*p2*Math.sqrt(2*Math.PI))]}),c:"accent",t:"Log-normal"}],aria:"Probability density functions"})})();
},
cards:[
["Line components","Supports, foundations, conductors, interfaces.","p. 145"],
["Reliability","Probability of surviving a period, such as a year, without failure.","p. 145"],
["Series system","Reliability is the product of component reliabilities.","p. 145"],
["Eq. 6.6 design rule","Load of return period T<sub>r</sub> equals strength with 10 % exclusion limit.","p. 148"],
["Yearly failure rate","Between 1/T<sub>r</sub> and 1/(2T<sub>r</sub>).","p. 148–149"],
["Reliability levels","1: 50 years. 2: 150 years. 3: 500 years.","p. 151"],
["Strength coordination","Sequencing strengths so the least harmful failure happens first: suspension towers.","p. 150–151"],
["Strength factor φ<sub>N</sub>","Reduces nominal strength when N components meet the peak load.","p. 152–153"],
["Use factor U","Span used at a site over the maximum design span.","p. 154"],
["Damage limit","Elastic limit, or a chosen value without one.","p. 157"],
["Failure limit","Complete collapse or rupture.","p. 157"],
["Characteristic strength","R<sub>c</sub> = R̄·(1 − U<sub>e</sub>·v<sub>R</sub>).","p. 158"],
["Reference wind","Ten minute mean, 10 m above terrain B.","p. 159"],
["Gumbel distribution","Extreme value type I. Used for yearly maximum wind and ice.","p. 159, 191"],
["v<sub>Q</sub> = 2·v<sub>V</sub>","Load scatter is twice velocity scatter because load goes with V².","p. 161"],
["Terrain categories","A/I open sea, B/II farmland, C/III suburban, D/IV urban.","p. 162"],
["Roughness length z₀","0.01, 0.05, 0.30 and 1.00 m by terrain.","p. 162"],
["Gust response factor","G<sub>q</sub> = [1 + 2.28/ln(z/z₀)]².","p. 164, 175"],
["Span factor G<sub>L</sub>","Reduction in wind load with span, because gusts do not act along the full span.","p. 164"],
["Precipitation icing","Glaze from freezing rain, and wet snow.","p. 165"],
["In-cloud icing","Rime from supercooled droplets, on exposed heights.","p. 166"],
["Reference ice load","g<sub>IR</sub> = K<sub>RI</sub>·K<sub>n</sub>·K<sub>d</sub>·K<sub>z</sub>·ḡ<sub>I</sub>.","p. 168"],
["Combination rule","Rare value of one variable with common values of the others.","p. 170"],
["Empirical Approach","National wind and ice values validated by operating experience.","p. 174"],
["Residual static load","Tension left after one conductor is released, for security design.","p. 187"]],
fm:[
["P<sub>Ss</sub> = ∏ P<sub>Si</sub>","System reliability.","6.2, p. 145"],
["P<sub>s</sub> = 1 − ∫ f<sub>Q</sub>·F<sub>R</sub> dξ","Yearly reliability.","6.5, p. 147"],
["Q<sub>T</sub> = R·(1 − U<sub>e</sub>·v<sub>R</sub>)","Design relation, 10 % exclusion, U<sub>e</sub> = 1.28.","6.6, p. 148"],
["P<sub>SN</sub> = (1 − P<sub>f1</sub>)<sup>N</sup>","Survival over N years.","6.8, p. 149"],
["e₁ = 1 − (1 − e<sub>N</sub>)<sup>1/N</sup>","Exclusion limit of one of N.","6.11, p. 152"],
["φ<sub>N</sub> = (1 − U<sub>e1</sub>·v<sub>R</sub>)/(1 − U<sub>eN</sub>·v<sub>R</sub>)","Strength factor, normal.","6.14, p. 153"],
["R = R<sub>c</sub>/γ<sub>M</sub>","Design value.","6.28, p. 158"],
["x<sub>T</sub> = x̄ − (C₂/C₁)σ − (σ/C₁)·ln[−ln(1−1/T<sub>r</sub>)]","Gumbel design value.","6.32, p. 160"],
["Q<sub>x</sub> = q<sub>z</sub>·G<sub>q</sub>·G<sub>x</sub>·C<sub>x</sub>·A","Wind force on an element.","6.46, p. 163"],
["q<sub>z</sub> = ½·ρ·V<sub>z</sub>²","Dynamic pressure.","6.47, p. 164"],
["ρ = ρ₀·(288/T)·exp(−0.00012·H)","Air density.","6.48, p. 164"],
["V<sub>z</sub> = k<sub>T</sub>·V<sub>R</sub>·ln(z/z₀)","Velocity with height.","6.64, p. 174"],
["G<sub>L</sub> = 1.30 − 0.082·ln a<sub>w</sub>","EN span factor.","6.68, p. 175"],
["q<sub>z</sub> = q₀ + 30·z/10","German basic pressure.","6.70, p. 176"],
["g<sub>I</sub> = 0.0277·t<sub>RI</sub>(d + t<sub>RI</sub>)","Ice load, N/m, 900 kg/m³, mm.","6.52, p. 168"],
["D<sub>I</sub> = √(d² + 4g<sub>I</sub>/(π·g·δ))","Equivalent ice diameter.","6.59, p. 171"],
["x(T<sub>r</sub>) = m(1 + u<sub>T</sub>·v)","Normal distribution design value.","6.96, p. 190"]],
wx:[
["Strength factor for ten towers","N = 10, v<sub>R</sub> = 0.20, e<sub>N</sub> = 0.1.",["e₁ = 1 − 0.9<sup>1/10</sup> = 0.0105.","Normal tables: U<sub>eN</sub> = 1.28, U<sub>e1</sub> = 2.31.","φ<sub>N</sub> = (1 − 2.31·0.2)/(1 − 1.28·0.2) = 0.72.","Log-normal: p₂ = 0.198, p₃ = −0.0196.","R<sub>eN</sub> = exp(−1.28·0.198 − 0.0196) = 0.761.","R<sub>e1</sub> = exp(−2.31·0.198 − 0.0196) = 0.621.","φ<sub>N</sub> = 0.621/0.761 = 0.82."]],
["Lifetime failure","T<sub>r</sub> = 50 years, 50 year life.",["P<sub>f1</sub> is between 0.02 and 0.01.","P<sub>S50</sub> = 0.98⁵⁰ = 0.36, or 0.99⁵⁰ = 0.61.","P<sub>f50</sub> = 0.64 to 0.39.","Partial factors make the real rate far lower."]],
["EN wind pressure on a tower","Zone 1, V<sub>R</sub> = 24.3 m/s, terrain II, k<sub>T</sub> = 0.19, z₀ = 0.05 m, z = 50 m.",["V₅₀ = 0.19·24.3·ln(1000) = 31.9 m/s.","G<sub>q</sub> = [1 + 2.28/6.91]² = 1.77.","q = ½·1.225·1.05·1.77·31.9² = 1158 N/m².","At 10 m: 779 N/m². Conductors omit the 1.05."]],
["Tower to conductor ratio","IEC, terrain B, 30 m, q<sub>zc</sub> = 815, q<sub>zT</sub> = 833 N/m², C<sub>T</sub> = 2.8, G<sub>L</sub> = 0.94.",["Tower per m²: 2.8·833.","Conductor per m²: 0.94·815.","Ratio = 3.05."]]],
bad:[
["Thinking a 50 year load fails once in 50 years only","Over a 50 year life the theoretical failure chance is 39 to 64 %, before partial factors."],
["Using v<sub>V</sub> as load variation","Use v<sub>Q</sub> = 2·v<sub>V</sub>, because load goes with V²."],
["Making the foundation the weakest link","Suspension tower first: it is quick to replace on intact foundations."],
["Forgetting the number of components","Peak wind meets many towers, so nominal strength needs φ<sub>N</sub>."],
["Designing suburban lines for lower wind","The book recommends terrain B even in C and D, as reliability should be higher."],
["Using 2 s gust for conductors","Conductors follow ten minute means."],
["Mixing rare ice with rare wind","Combine a rare value of one with common values of the other."],
["Adding ice to towers","EN 50341-3-4 applies ice to conductors, insulators and markers, not structures."]],
q:[
{t:"s",sec:"6.1",p:"p. 145",q:"Which is not one of the four line components?",o:["Supports","Foundations","Interfaces","Substations"],a:[3],w:"The four are supports, foundations, conductors and interfaces."},
{t:"n",sec:"6.1",p:"Eq. 6.2, p. 145",q:"Three components in series have reliabilities 0.99, 0.999 and 0.999. Find the system reliability. Three decimals.",a:.988,tol:.0015,u:"",w:"0.99·0.999·0.999 = 0.988."},
{t:"s",sec:"6.1",p:"p. 148",q:"With constant strength equal to the load of return period T<sub>r</sub>, what is the yearly failure probability?",o:["1/T<sub>r</sub>","1/(2T<sub>r</sub>)","10 %","Zero"],a:[0],w:"Case 3: reliability 1 − 1/T<sub>r</sub>."},
{t:"n",sec:"6.1",p:"Eq. 6.8, p. 149",q:"P<sub>f1</sub> = 0.002. Survival probability over 50 years? Two decimals.",a:.9,tol:.01,u:"",w:"0.998⁵⁰ = 0.905, as Table 6.2 shows 0.90."},
{t:"s",sec:"6.1",p:"p. 151",q:"Which component should have the lowest strength?",o:["Conductors","Foundations","Suspension supports","Dead-end supports"],a:[2],w:"Failure stays local, and towers go back on intact foundations."},
{t:"x",sec:"6.1",p:"p. 151",q:"Match the reliability level to its return period.",pairs:[["Level 1","50 years"],["Level 2","150 years"],["Level 3","500 years"]],w:"From EN 50341-1."},
{t:"n",sec:"6.1",p:"Eq. 6.11, p. 152",q:"N = 2, e<sub>N</sub> = 0.19. Find e₁. Two decimals.",a:.1,tol:.002,u:"",w:"1 − 0.81<sup>1/2</sup> = 0.10."},
{t:"s",sec:"6.1",p:"p. 154",q:"Why is log-normal preferred for strength with large N?",o:["It is easier","Strength has a lower threshold","It has no parameters","It suits wind"],a:[1],w:"The lower tail matters, and strength has a defined minimum."},
{t:"s",sec:"6.2",p:"Table 6.10, p. 159",q:"What is the conductor damage limit?",o:["About 40 % RTS","About 75 % RTS","100 % RTS","120 % RTS"],a:[1],w:"About 75 % of rated tensile strength."},
{t:"n",sec:"6.2",p:"Eq. 6.25, p. 158",q:"R̄ = 100 kN, v<sub>R</sub> = 0.1, U<sub>e</sub> = 1.28. R<sub>c</sub> in kN? One decimal.",a:87.2,tol:.1,u:"kN",w:"100·(1 − 0.128) = 87.2 kN."},
{t:"n",sec:"6.2",p:"Table 6.9, p. 158",q:"Characteristic strength of a lattice member is 275 kN. Design value at γ<sub>M</sub> = 1.10, kN?",a:250,tol:.5,u:"kN",w:"275/1.1 = 250 kN."},
{t:"s",sec:"6.3",p:"p. 159",q:"What are the reference wind conditions?",o:["3 s gust at 30 m","Ten minute mean at 10 m in open terrain","Hourly mean at sea level","Daily mean at tower top"],a:[1],w:"Terrain B or II, 10 m."},
{t:"n",sec:"6.3",p:"Eq. 6.37, p. 161",q:"Wind velocity variation is 0.12. What is load variation?",a:.24,tol:.005,u:"",w:"2·0.12 = 0.24."},
{t:"n",sec:"6.3",p:"Table 6.12, p. 161",q:"Mean V 25 m/s, v = 0.20, T<sub>r</sub> = 50, n = 20 years gives ratio 1.64. Design V, m/s?",a:41,tol:.1,u:"m/s",w:"25·1.64 = 41 m/s."},
{t:"n",sec:"6.3",p:"Eq. 6.47, p. 164",q:"V = 30 m/s, ρ = 1.225 kg/m³. q in N/m²? One decimal.",a:551.3,tol:1,u:"N/m²",w:"½·1.225·900 = 551 N/m²."},
{t:"s",sec:"6.4",p:"p. 165–166",q:"Which ice forms from freezing rain?",o:["Soft rime","Hoar frost","Glaze","Dry snow"],a:[2],w:"Clear, hard glaze, often with icicles."},
{t:"s",sec:"6.4",p:"p. 165",q:"A line crossing a valley, compared with one running along it, has what?",o:["Less ice","Often more ice","The same ice","No ice"],a:[1],w:"Air flow raises accretion, and wind and ice act together more often."},
{t:"n",sec:"6.4",p:"Eq. 6.52, p. 168",q:"t = 10 mm, d = 30 mm, 900 kg/m³. g<sub>I</sub> in N/m? One decimal.",a:11.1,tol:.1,u:"N/m",w:"0.0277·10·40 = 11.1 N/m."},
{t:"s",sec:"6.4",p:"p. 167",q:"How is the mean taken if only a maximum ice value is known?",o:["0.2·g<sub>Imax</sub>","0.45·g<sub>Imax</sub>","0.9·g<sub>Imax</sub>","1.0·g<sub>Imax</sub>"],a:[1],w:"0.45·g<sub>Imax</sub>, with σ half of that."},
{t:"t",sec:"6.5",p:"p. 170",q:"True or false: wind and ice combinations use rare values of all variables at once.",a:false,w:"False. One rare value is paired with common values of the others."},
{t:"m",sec:"6.5",p:"p. 171",q:"Without statistics, which are given for wind with ice? Select all.",o:["V<sub>IL</sub> = 0.60 to 0.85·V<sub>T</sub>","V<sub>IH</sub> = 0.40 to 0.50·V₅₀","V<sub>IL</sub> = 2·V<sub>T</sub>"],a:[0,1],w:"Use the upper limits for conservative design."},
{t:"n",sec:"6.6",p:"Eq. 6.68, p. 175",q:"Find EN G<sub>L</sub> at a<sub>w</sub> = 400 m. Two decimals.",a:.81,tol:.01,u:"",w:"1.30 − 0.082·ln 400 = 0.81."},
{t:"n",sec:"6.6",p:"Eq. 6.70, p. 176",q:"German zone 1, z = 30 m. q<sub>z</sub> in N/m²?",a:890,tol:.5,u:"N/m²",w:"800 + 30·3 = 890."},
{t:"s",sec:"6.6",p:"p. 180",q:"Hornisgrinde tests showed conductors are governed by what?",o:["2 s gusts","Ten minute mean velocities","Hourly maxima","Wind at ground level"],a:[1],w:"So EN's use of a 2 s gust on conductors overstates the load."},
{t:"n",sec:"6.6",p:"p. 182–183",q:"Germany, zone 2, d = 30 mm. Ice load, N/m?",a:16,tol:.05,u:"N/m",w:"10 + 0.2·30 = 16 N/m."},
{t:"s",sec:"6.7",p:"p. 185",q:"For moving conductors in stringing, IEC uses what tension factor?",o:["1.0","1.5","2.0","3.0"],a:[2],w:"2 × moving, 1.5 × stationary."},
{t:"s",sec:"6.8",p:"p. 187",q:"What is the main purpose of security measures?",o:["Lower cost","Minimise cascading failure","Reduce noise","Increase capacity"],a:[1],w:"They contain failures to the initial section."},
{t:"n",sec:"6.9",p:"Eq. 6.97, p. 190",q:"m = 200, v = 0.1, u<sub>e</sub> = −1.28. Find x(e).",a:174.4,tol:.1,u:"",w:"200·(1 − 0.128) = 174.4."}
]});
