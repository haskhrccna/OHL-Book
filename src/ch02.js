OHL.add({n:2,lead:"The electrical behaviour that shapes a line: natural power and its limits, fields, corona and noise, insulation coordination, and the air clearances that fix the tower head. Printed pages 25 to 76.",
init:function(K){var $=K.$,fmt=K.fmt,log10=K.log10;
function rng(a,b,n){var o=[];for(var i=0;i<=n;i++)o.push(a+(b-a)*i/n);return o}
K.calc("silCalc",{f:[{k:"U",l:"Phase-to-phase voltage",min:69,max:765,step:1,v:400,u:"kV"},{k:"Z",l:"Surge impedance Z<sub>c</sub>",min:220,max:420,step:10,v:280,u:"Ω"}],
 run:function(v,c){var P=v.U*v.U/v.Z,th=[["1 conductor, 400 Ω",400],["2, 320 Ω",320],["3, 280 Ω",280],["4, 240 Ω",240]];
  K.bars(c,{rows:th.map(function(t){return[t[0],v.U*v.U/t[1],t[1]===v.Z?"live":"accent"]}),u:"MW",lw:170,aria:"SIL for each bundle size at the selected voltage"});
  return'<span class="big">'+fmt(P)+' MW</span><span class="small">'+fmt(v.U)+'² / '+v.Z+' = surge impedance load</span>'}});
K.calc("limCalc",{f:[{k:"L",l:"Line length",min:20,max:600,step:10,v:200,u:"km"}],run:function(v,c){
  K.plot(c,{h:150,minw:300,b:42,l:20,x:{min:0,max:600,label:"Length, km",ticks:[0,80,320,600]},y:{min:0,max:1,ticks:[]},bands:[{a:0,b:80,c:"v4"},{a:80,b:320,c:"v1"},{a:320,b:600,c:"v5"}],vlines:[{x:v.L}],aria:"Governing limit by line length"});
  var g=v.L<=80?"Thermal limit":v.L<=320?"Voltage regulation":"Stability";return'<span class="big">'+g+'</span><span class="small">Up to 80 km thermal, 80 to 320 km voltage, above 320 km stability.</span>'}});
K.calc("angCalc",{f:[{k:"c",l:"Series compensation of X<sub>L</sub>",min:0,max:60,step:5,v:0,u:"%"},{k:"d",l:"Power angle δ",min:5,max:90,step:1,v:30,u:"°"}],run:function(v,c){
  var X=100*(1-v.c/100),U=500,f=function(d){return U*U/X*Math.sin(d*Math.PI/180)},p=rng(0,90,45).map(function(d){return[d,f(d)]}),base=rng(0,90,45).map(function(d){return[d,U*U/100*Math.sin(d*Math.PI/180)]});
  K.plot(c,{h:250,minw:320,x:{min:0,max:90,label:"Power angle δ, degrees",ticks:[0,15,30,45,60,75,90]},y:{min:0,max:6500,label:"P, MW",ticks:[0,2000,4000,6000]},series:[{p:base,c:"rule",t:"No compensation"},{p:p,c:"accent",t:"With compensation"}],vlines:[{x:45,t:"45°",c:"warn"}],marks:[{x:v.d,y:f(v.d)}],aria:"Power angle curve"});
  return'<span>U<sub>A</sub> = U<sub>e</sub> = 500 kV, X<sub>L</sub> = 100 Ω before compensation</span><span class="big">'+fmt(f(v.d))+' MW</span>'}});
K.bars("effBars",{rows:[["230 kV, 165 MVA, 45 m",3.7,"v1"],["500 kV, 1000 MVA, 65 m",15.4,"v2"],["765 kV, 2500 MVA, 95 m",26.3,"v4"]],u:"MVA/m",lw:210,aria:"Efficiency ratio of right of way"});
var FLD={E:{t:"Electric field, kV/m",lim:5,max:14,r:[["765",8,13],["525",5,9],["420",4,8],["245",2,3.5],["123",1,2],["70",1,1.5]],lt:"5 kV/m"},B:{t:"Magnetic flux density, μT",lim:100,max:110,r:[["765",28,32],["525",25,30],["420",22,28],["245",20,25],["123",12,15],["70",2,2.5]],lt:"100 μT"}};
function fld(k){var d=FLD[k],W=640,L=80,rh=30,sc=(W-L-30)/d.max,h="",H=d.r.length*rh+36;
 d.r.forEach(function(r,i){var y=i*rh+6;h+='<text class="i" x="'+(L-10)+'" y="'+(y+15)+'" text-anchor="end">'+r[0]+' kV</text><rect x="'+(L+r[1]*sc)+'" y="'+y+'" width="'+Math.max(4,(r[2]-r[1])*sc)+'" height="20" rx="2" fill="var(--accent)"/><text class="b" x="'+(L+r[2]*sc+6)+'" y="'+(y+15)+'">'+r[1]+'–'+r[2]+'</text>'});
 var lx=L+d.lim*sc;h+='<path d="M'+lx+' 2V'+(H-26)+'" stroke="var(--live)" stroke-dasharray="5 4"/><text class="i" x="'+lx+'" y="'+(H-12)+'" text-anchor="middle">'+d.lt+'</text>';
 $("fldChart").innerHTML='<div class="scroll"><div style="min-width:500px"><svg class="c" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+d.t+' range by voltage">'+h+'</svg></div></div>';
 ["E","B"].forEach(function(x){$("fb"+x).setAttribute("aria-pressed",x===k)})}
["E","B"].forEach(function(k){var b=document.createElement("button");b.className="ghost";b.id="fb"+k;b.textContent=FLD[k].t;b.onclick=function(){fld(k)};$("fldBtn").appendChild(b)});fld("E");
K.calc("corCalc",{f:[{k:"U",l:"Highest voltage",min:110,max:800,step:10,v:420,u:"kV"},{k:"n",l:"Subconductors",o:[[1,"1"],[2,"2"],[3,"3"],[4,"4"],[6,"6"],[8,"8"]],v:2},{k:"d",l:"Subconductor diameter",min:15,max:45,step:.1,v:32.2,u:"mm"},{k:"s",l:"Bundle spacing",min:200,max:600,step:10,v:400,u:"mm"},{k:"D",l:"Phase spacing, adjacent",min:3,max:15,step:.5,v:7.5,u:"m"},{k:"h",l:"Mean height",min:8,max:40,step:1,v:15,u:"m"}],run:function(v,c){
  var n=v.n,r=v.d/20,s=v.s/10,DM=Math.pow(2,1/3)*v.D,k1={1:1,2:1,3:1,4:1.12,5:1.27,6:1.43,8:1.76}[n],rB=n>1?v.d/2*Math.pow(k1*v.s/(v.d/2),(n-1)/n)/1000:v.d/2000,k2=n>1?2*(n-1)*Math.sin(Math.PI/n):0;
  var E=(1+k2*r/s)/(n*r*Math.sqrt(3))*v.U/Math.log(DM/(rB*Math.sqrt(1+Math.pow(DM/(2*v.h),2)))),RI=3.5*E+12*r-33*log10(40/20)-30+1.5,re=n>2?.58*Math.pow(n,.48)*v.d/2:v.d/2;
  var NPi=-164.6+120*log10(E)+55*log10(2*re),AN=10*log10(3*Math.exp(.23*(NPi-11.4*log10(40)-5.8)));
  function cl(ok){return ok?"good":"bad"}
  K.bars(c,{minw:480,lw:170,rows:[["Gradient, limit 17",E,E<=17.5?"accent":"v4",fmt(E,1)+" kV/cm"],["Radio noise",Math.max(RI,0),"v1",fmt(RI,1)+" dB"],["Audible noise, 50",Math.max(AN,0),AN<=50?"accent":"v4",fmt(AN,1)+" dB(A)"]],max:70,aria:"Gradient and noise results"});
  return'<span>Equivalent bundle radius r<sub>B</sub> = '+fmt(rB*1000,1)+' mm</span><span class="'+cl(E<=17.5)+'">'+(E<=17.5?"Gradient near or under the 17 kV/cm guide":"Gradient above the 17 kV/cm guide")+'</span><span class="'+cl(AN<=50)+'">'+(AN<=50?"Audible noise under 50 dB(A)":AN<=55?"Audible noise between 50 and 55 dB(A)":"Above 55 dB(A): complaints expected")+'</span>'}});
var T210=[["More phase spacing","↑","↑","↓","↓"],["More ground clearance","↓","↓","↓","↓"],["More subconductors","↑","→","↓","↓"],["Larger cross section","→","→","↓","↓"],["More bundle spacing","→","→","→","↑"],["Inverse phase sequence, double circuit","↓*","↓*","→","→"]];
$("t210").innerHTML='<tr><th>Change</th><th>E field</th><th>B field</th><th>Radio</th><th>Audible</th></tr>'+T210.map(function(r){return'<tr>'+r.map(function(c,i){return i?'<td class="mono '+(c[0]==="↓"?"good":c[0]==="↑"?"bad":"")+'">'+c+'</td>':'<td>'+c+'</td>'}).join("")+'</tr>'}).join("");
K.stepper("stressStep",[["Power frequency","Lasts all the time. Governs insulator length through pollution, and the clearance at maximum swing under 50 year wind."],["Slow-front (switching)","Energising or reclosing, 250/2500 μs. Considered at 300 kV and above, combined with moderate wind of 50 to 60 % of the 50 year velocity."],["Fast-front (lightning)","Strokes and back-flashovers, 1.2/50 μs. Considered at all voltages, in no-wind conditions at everyday temperature."],["Live-line work","Clearances for linemen working by the bare-hand or hot-stick method, which can govern parts of the tower."]]);
(function(){function w(t1,t2){var a=Math.log(2)/t2*1.0,b=2.5/t1,N=1;var pk=0;rng(-1,4,200).forEach(function(l){var x=Math.pow(10,l),u=Math.exp(-a*x)-Math.exp(-b*x);if(u>pk)pk=u});return function(t){return(Math.exp(-a*t)-Math.exp(-b*t))/pk}}
var f=w(1.2,50),s=w(250,2500),P=rng(-1,4,160).map(function(l){return Math.pow(10,l)});
K.plot("impChart",{h:240,x:{min:.1,max:10000,log:true,label:"Time, μs (log scale)"},y:{min:0,max:1.05,label:"Per unit",ticks:[0,.5,1]},series:[{p:P.map(function(t){return[t,f(t)]}),c:"v4",t:"Fast-front 1.2/50 μs"},{p:P.map(function(t){return[t,s(t)]}),c:"v1",t:"Slow-front 250/2500 μs"}],aria:"Standard impulse shapes on a log time axis"})})();
K.calc("pfoCalc",{f:[{k:"u",l:"Overvoltage U<sub>2%</sub>",min:800,max:1300,step:10,v:1050,u:"kV"},{k:"w",l:"Gap U<sub>90%</sub> withstand",min:800,max:1800,step:10,v:1250,u:"kV"}],run:function(v,c){
  var su=.1*v.u/1.0,mu=v.u-2.054*su,sw=.06,U50=v.w/(1-1.3*sw),sg=sw*U50;
  function nrm(x,m,s){return Math.exp(-.5*Math.pow((x-m)/s,2))/(s*Math.sqrt(2*Math.PI))}
  function cdf(x){var z=x/Math.SQRT2,t=1/(1+.5*Math.abs(z)),r=t*Math.exp(-z*z-1.26551223+t*(1.00002368+t*(.37409196+t*(.09678418+t*(-.18628806+t*(.27886807+t*(-1.13520398+t*(1.48851587+t*(-.82215223+t*.17087277)))))))));return z>=0?1-r/2:r/2}
  var R=0,dx=2,pf=[],pk=[];for(var x=200;x<2800;x+=dx){var p=nrm(x,mu,su),F=cdf((x-U50)/sg);R+=p*F*dx}
  rng(300,2200,120).forEach(function(x){pf.push([x,nrm(x,mu,su)/nrm(mu,mu,su)]);pk.push([x,cdf((x-U50)/sg)])});
  K.plot(c,{h:250,x:{min:300,max:2200,label:"Voltage, kV"},y:{min:0,max:1.05,label:"Relative, probability",ticks:[0,.5,1]},series:[{p:pf,c:"v1",t:"Overvoltage density f(u)"},{p:pk,c:"v4",t:"Flashover probability F(u)"}],vlines:[{x:v.u,t:"U2%",c:"v1"},{x:v.w,t:"U90%",c:"v4"}],aria:"Stress and strength distributions"});
  var cl=R<=1e-2&&R>=0?"good":"bad";return'<span>Overvoltage σ = 10 % of U<sub>2%</sub>, gap σ = 6 % of U<sub>50%</sub> = '+fmt(sg)+' kV</span><span class="big">PFO '+R.toExponential(1)+'</span><span class="'+(R<=1e-2?"good":"bad")+'">'+(R<=1e-4?"Better than the usual 10⁻⁴ to 10⁻² range; the gap may be oversized":R<=1e-2?"Inside the usual 10⁻⁴ to 10⁻² range":"Riskier than the usual range")+'</span>'}});
var KA=[0,100,300,500,1000,1500,2000,2500,3000],KAT=[[1,.994,.982,.970,.938,.904,.870,.834,.798],[1,.995,.985,.975,.946,.915,.883,.849,.815],[1,.997,.990,.982,.959,.934,.906,.875,.844],[1,.998,.993,.987,.970,.948,.923,.896,.867],[1,.999,.996,.992,.978,.960,.938,.913,.885]];
function ka(h,U){var b=U<=200?0:U<=400?1:U<=700?2:U<=1100?3:4,t=KAT[b];for(var i=0;i<KA.length-1;i++)if(h<=KA[i+1])return t[i]+(t[i+1]-t[i])*(h-KA[i])/(KA[i+1]-KA[i]);return t[8]}
K.calc("clrCalc",{f:[{k:"Us",l:"Highest system voltage U<sub>s</sub>",min:52,max:800,step:1,v:420,u:"kV"},{k:"U9",l:"Lightning withstand U<sub>90%</sub>",min:200,max:2200,step:5,v:1780,u:"kV"},{k:"U2",l:"Switching U<sub>2%</sub>",min:300,max:1500,step:5,v:1050,u:"kV"},{k:"h",l:"Altitude",min:0,max:3000,step:100,v:500,u:"m"},{k:"g",l:"Gap, phase-to-earth",o:[[1.45,"Conductor to tower, 1.45"],[1.25,"Conductor to tower window, 1.25"],[1.30,"Conductor to obstacle, 1.30"],[1.15,"Conductor to plane, 1.15"],[1.40,"Conductor to guys, 1.40"]],v:1.45}],run:function(v,c){
  var Kg=v.g,Kf=.74+.26*Kg,Kp=1.35*Kg-.35*Kg*Kg,Kgp=1.6,Kfp=1.16,Kpp=1.26,kzf=.961,kzs=.922,kzp=.91,h=v.h;
  var r3=Math.sqrt(3),Del_ff=v.U9/(530*ka(h,v.U9)*kzf*Kf),Dpp_ff=1.2*v.U9/(530*ka(h,1.2*v.U9)*kzf*Kfp);
  var ue=1.05*v.U2,up=1.4*ue,sf=v.Us>=300,Del_sf=sf?2.17*(Math.exp(ue/(1080*ka(h,ue)*kzs*Kg))-1):0,Dpp_sf=sf?2.17*(Math.exp(up/(1080*ka(h,up)*kzs*Kgp))-1):0;
  var upe=Math.SQRT2/r3*v.Us,upp=Math.SQRT2*v.Us,Dpf_e=1.64*Math.pow(Math.exp(v.Us/(750*r3*ka(h,upe)*kzp*Kp))-1,.833),Dpf_p=1.64*Math.pow(Math.exp(v.Us/(750*ka(h,upp)*kzp*Kpp))-1,.833);
  K.bars(c,{minw:480,lw:190,u:"m",rows:[["Del fast-front",Del_ff,"v4",fmt(Del_ff,2)+" m"],["Del slow-front",Del_sf,"v1",sf?fmt(Del_sf,2)+" m":"not required"],["Del power freq.",Dpf_e,"v2",fmt(Dpf_e,2)+" m"],["Dpp fast-front",Dpp_ff,"v4",fmt(Dpp_ff,2)+" m"],["Dpp slow-front",Dpp_sf,"v1",sf?fmt(Dpp_sf,2)+" m":"not required"],["Dpp power freq.",Dpf_p,"v2",fmt(Dpf_p,2)+" m"]],aria:"Required clearances"});
  var gov=Del_ff>=Del_sf?"fast-front":"slow-front";return'<span>K<sub>g</sub> fast-front '+fmt(Kf,3)+', power frequency '+fmt(Kp,3)+'</span><span><b>Governing Del: '+fmt(Math.max(Del_ff,Del_sf),2)+' m ('+gov+')</b>, Dpp: '+fmt(Math.max(Dpp_ff,Dpp_sf),2)+' m</span>'}});
var D20=[[52,.6],[72.5,.7],[82.5,.75],[100,.9],[123,1],[145,1.2],[170,1.3],[245,1.7],[300,2.1],[420,2.8],[525,3.5],[765,4.9]];
K.calc("obsCalc",{f:[{k:"o",l:"Obstacle",o:[["5","Normal ground, farmed, 5.0"],["2","Steep slope, 2.0"],["1.5","Climbable tree, 1.5"],["2.01","Fire resistant roof over 15°, 2.0, at least 3"],["4.01","Fire resistant roof under 15°, 4.0, at least 5"],["10","Non-fire resistant roof, 10.0"],["6","Road, 6.0"],["7","Recreational area, 7.0"],["8","Swimming pool, 8.0"]],v:"2.01"},{k:"U",l:"Highest voltage",o:D20.map(function(d){return[d[0],d[0]+" kV, Del "+d[1]+" m"]}),v:420},{k:"a",l:"Longest air gap a<sub>som</sub>",min:.5,max:8,step:.1,v:4.5,u:"m"}],run:function(v,c){
  var del=D20.filter(function(d){return d[0]===v.U})[0][1],add=Math.floor(v.o*10)/10,m=v.o===2.01?3:v.o===4.01?5:0,s=del+add,g=1.1*v.a,C=Math.max(s,g,m);
  K.bars(c,{minw:460,lw:170,rows:[["Del + Dadd",s,"accent",fmt(s,2)+" m"],["1.1 × a<sub>som</sub>".replace(/<[^>]+>/g,""),g,"v1",fmt(g,2)+" m"]].concat(m?[["Stated minimum",m,"v3",m+" m"]]:[]),aria:"Clearance components"});
  return'<span class="big">C<sub>min</sub> = '+fmt(C,2)+' m</span><span class="small">Governed by '+(C===g?"1.1·a<sub>som</sub>":C===m?"the stated minimum":"Del + Dadd")+'.</span>'}});
K.calc("swCalc",{f:[{k:"V",l:"Mean wind velocity",min:5,max:45,step:.5,v:32,u:"m/s"},{k:"G",l:"Span factor G<sub>L</sub>",min:.5,max:1,step:.01,v:.94,u:""},{k:"L",l:"Insulator set length",min:1,max:8,step:.1,v:5,u:"m"},{k:"c",l:"Clearance needed",min:.2,max:5,step:.01,v:.61,u:"m"}],run:function(v,c){
  function phi(V){var q=1.225/2*V*V,N=q*v.G*.03285*400*2+1.2*1.5*q/2,W=2*400/1.3*2.11*9.81+300*9.81/2;return Math.atan(N/W)*180/Math.PI}
  var p=phi(v.V),sg=2.25*(1-Math.exp(-v.V*v.V/230)),e=p+2*sg,x=v.L*Math.sin(e*Math.PI/180)+.2+v.c,S=[];
  K.plot(c,{h:240,x:{min:0,max:45,label:"Mean wind velocity, m/s"},y:{min:0,max:70,label:"Swing angle, °",ticks:[0,20,40,60]},series:[{p:rng(0,45,45).map(function(V){return[V,phi(V)]}),c:"accent",t:"Mean swing, Eq. 2.63"},{p:rng(0,45,45).map(function(V){return[V,phi(V)+4.5*(1-Math.exp(-V*V/230))]}),c:"v4",dash:true,t:"Plus 2σ"}],marks:[{x:v.V,y:e,t:fmt(e,1)+"°"}],aria:"Swing angle against wind"});
  return'<span>Mean '+fmt(p,1)+'° + 2σ of '+fmt(sg,2)+'° = '+fmt(e,1)+'°</span><span class="big">'+fmt(x,2)+' m</span><span class="small">Tower body to conductor attachment point</span>'}});
var KC=[[.95,.75,.70],[.85,.70,.65],[.75,.65,.62],[.70,.62,.60]];
K.calc("midCalc",{f:[{k:"f",l:"Sag at 40 °C",min:2,max:30,step:.1,v:20,u:"m"},{k:"l",l:"Swinging insulator length",min:0,max:8,step:.1,v:5,u:"m"},{k:"p",l:"Conductor swing φ<sub>c</sub>",min:0,max:80,step:.1,v:25.4,u:"°"},{k:"r",l:"Relative position",o:[[0,"Range 1, under 30°"],[1,"Range 2, 30 to 80°"],[2,"Range 3, 80 to 90°"]],v:2},{k:"D",l:"Dpp",min:.5,max:6,step:.05,v:3.2,u:"m"},{k:"b",l:"Bundle term used in the examples",min:0,max:.6,step:.01,v:.4,u:"m"}],run:function(v,c){
  var row=v.p>65?0:v.p>55?1:v.p>40?2:3,k=KC[row][v.r],C=Math.max(k*Math.sqrt(v.f+v.l)+.75*v.D+v.b,k);
  K.bars(c,{minw:460,lw:170,u:"m",rows:[["k<sub>c</sub>·√(f+l)".replace(/<[^>]+>/g,""),k*Math.sqrt(v.f+v.l),"accent",fmt(k*Math.sqrt(v.f+v.l),2)+" m"],["0.75 · Dpp",.75*v.D,"v1",fmt(.75*v.D,2)+" m"]],aria:"Terms of midspan clearance"});
  return'<span>k<sub>c</sub> = '+fmt(k,2)+'</span><span class="big">C<sub>min</sub> = '+fmt(C,2)+' m</span>'}});
},
cards:[
["Surge impedance Z<sub>c</sub>","√(L/C), the ratio U/I when electric and magnetic stored energies are equal. Resistance is neglected.","p. 28"],
["Surge impedance load","Natural power U²/Z<sub>c</sub>. Reactive losses are exactly offset by line capacitance.","p. 28"],
["Steady-state stability","Ability to survive small perturbations. Depends on the operating state.","p. 29"],
["Transient stability","Ability to survive big perturbations such as line faults. Depends on their size and site.","p. 29"],
["Voltage regulation","Voltage drop limit, at most 5 to 10 % in practice. Limits radial lines up to 150 kV.","p. 30"],
["Capability limits by length","Thermal to 80 km, voltage regulation 80 to 320 km, stability above 320 km, for range II.","p. 30"],
["FEU and SEU","Forced and Scheduled Energy Unavailability: unplanned or planned out-of-service hours over 8760, as a percentage.","p. 31"],
["Series compensation","Capacitors in series offsetting line reactance. Improves stability and voltage drop. Risk: sub-synchronous resonance.","p. 31"],
["Ferranti effect","Capacitive power of long EHV lines at light load, handled by shunt reactors.","p. 32"],
["Efficiency ratio","Power transmitted over right-of-way width, in MVA/m.","p. 32"],
["Emergency condition","Conductor loses no more than 10 % of strength over life. 100 to 120 °C for Al and ACSR.","p. 32"],
["Corona","Air breakdown around a conductor at critical surface gradient. 21 kV<sub>rms</sub>/cm for stranded conductors.","p. 37"],
["Equivalent bundle radius r<sub>B</sub>","Radius of a single conductor equivalent to a bundle, Eq. 2.19.","p. 38–39"],
["Signal-to-noise ratio","Decides radio reception quality. Class C needs 22 to 27 dB.","p. 39"],
["Range I and II","Range I: 1 to 245 kV. Range II: above 245 kV, where switching overvoltages count.","p. 44–45"],
["Temporary overvoltage","Oscillatory, relatively long, weakly damped. Ignored for clearances if earth fault factor is 1.3 or below.","p. 44"],
["Slow-front overvoltage","Switching type, standard 250/2500 μs. Considered from 300 kV.","p. 46"],
["Fast-front overvoltage","Lightning type, standard 1.2/50 μs, considered at all voltages.","p. 46"],
["BSIL and BIL","Basic surge insulation level for switching, basic insulation level for lightning.","p. 47, 51"],
["PFO","Probability of flashover, the risk of failure, usually 10⁻² to 10⁻⁴.","p. 49"],
["U<sub>2%</sub> and U<sub>90%</sub>","Overvoltage exceeded with 2 % probability, and voltage withstood with 90 % probability.","p. 49"],
["Shielding failure","Stroke bypasses the earth wire and hits a phase.","p. 50"],
["Back-flashover","Stroke current raises tower potential until an insulator flashes from tower to phase.","p. 50"],
["Gap factor K<sub>g</sub>","Strength of a gap relative to rod-to-plane. 1.45 conductor to tower, 1.6 conductor to conductor.","p. 53"],
["Dadd","Extra clearance to obstacles so that people and objects do not breach Del.","p. 58"],
["a<sub>som</sub>","Shortest air gap across an insulator set. External clearance must be over 1.1 times this.","p. 51, 59"]],
fm:[
["Z<sub>c</sub> = √(L/C) = √(X<sub>L</sub>·X<sub>c</sub>)","Surge impedance.","2.3–2.4, p. 28"],
["P<sub>nat</sub> = U<sub>pp</sub>²/Z<sub>c</sub>","Surge impedance load.","2.5, p. 28"],
["P<sub>G</sub> = (U<sub>A</sub>·U<sub>e</sub>/X<sub>L</sub>)·sin δ","Stability limit.","2.7, p. 29"],
["P<sub>j</sub> = 3·R<sub>AC</sub>·I²","Three-phase ohmic loss.","2.9, p. 32"],
["B = μ₀·μ<sub>r</sub>·H","1 A/m = 1.256 μT in air.","2.10–2.11, p. 34"],
["r<sub>B</sub> = r·(k₁·s/r)^((n−1)/n)","Equivalent bundle radius.","2.19, p. 38"],
["D<sub>M</sub> = (D<sub>AB</sub>·D<sub>AC</sub>·D<sub>BC</sub>)^(1/3)","Mean geometric phase distance.","2.20, p. 38"],
["E = (1+k₂·r/s)/(n·r) · 1/ln[D<sub>M</sub>/(r<sub>B</sub>√(1+(D<sub>M</sub>/2h<sub>M</sub>)²))] · U/√3","Mean gradient, single circuit.","2.22, p. 38"],
["NP<sub>I</sub> = 3.5E + 12r − 33·log(D/20) − 30","Radio level in dB, fair weather. r in cm.","2.24, p. 40"],
["NP<sub>total</sub> = (NP₁+NP₂)/2 + 1.5","Combining the top two phases.","2.25, p. 40"],
["NP<sub>Ai</sub> = −164.6 + 120·log E + 55·log(2r<sub>e</sub>)","Noise potential, with diameter in mm as used in the example.","2.27, p. 41"],
["r<sub>e</sub> = 0.58·n<sup>0.48</sup>·r","Equivalent radius for audible noise above two subconductors. r<sub>e</sub> = r for one or two, as the example shows.","2.28, p. 41"],
["δ = (288/T)·exp(−0.00012·h)","Relative air density.","2.31, p. 49"],
["K<sub>g,ff</sub> = 0.74 + 0.26·K<sub>g</sub>","Fast-front gap factor.","2.38, p. 53"],
["U<sub>rw</sub> = K<sub>a</sub>·K<sub>z</sub>·K<sub>g</sub>·U<sub>50%rp</sub>","Required withstand of a real gap.","2.45, p. 54"],
["D<sub>el,ff</sub> = U<sub>90%</sub>/(530·K<sub>a</sub>·K<sub>z</sub>·K<sub>g,ff</sub>)","Fast-front, phase-to-earth.","2.51, p. 56"],
["D<sub>el,sf</sub> = 2.17·(exp[U<sub>rp</sub>/(1080·K<sub>a</sub>·K<sub>z</sub>·K<sub>g</sub>)] − 1)","Slow-front.","2.53, p. 56"],
["D<sub>pf</sub> = 1.64·(exp[U<sub>s</sub>/(750√3·K<sub>a</sub>·K<sub>z</sub>·K<sub>g,pf</sub>)] − 1)<sup>0.833</sup>","Power frequency, phase-to-earth. Omit √3 for phase-to-phase.","2.55–2.56, p. 57"],
["V<sub>T</sub> = V̄ − σ<sub>v</sub>[0.45 + ln(−ln(1−1/T))·√6/π]","Gumbel, wind for return period T.","2.57, p. 61"],
["σ<sub>φ</sub> = 2.25·[1 − exp(−V²/230)]","Swing scatter, degrees.","2.65, p. 64"],
["C<sub>min</sub> = k<sub>c</sub>·√(f+l) + 0.75·D<sub>pp</sub>","Midspan phase spacing.","2.68, p. 66"]],
wx:[
["Conductor gradient at 400 kV","Twin 562-AL1/49-ST1A, r = 1.61 cm, s = 400 mm. D = 7.5, 7.5, 15 m, h = 15 m. U<sub>s</sub> = 420 kV.",["r<sub>B</sub> = 16.1·(1·400/16.1)<sup>1/2</sup> = 80.25 mm.","D<sub>M</sub> = (7.5·7.5·15)<sup>1/3</sup> = 9.45 m.","Numerator: 1 + 2·(16.1/400) = 1.0805.","Bracket: ln[9.45/(0.08025·√(1+(9.45/30)²))] = 4.72.","E = 1.0805·420/(2·1.61·√3·4.72) = 17.2 kV/cm, right at the 17 kV/cm guide."]],
["Noise at 40 m, twin against quad","E = 17.2 for twin, 11.5 for quad, r = 1.61 cm.",["Twin radio: 3.5·17.2 + 12·1.61 − 33·log 2 − 30 = 39.6 dB.","All three equal, so add 1.5: 41.1 dB, or 113.5 μV/m.","Quad radio: 19.6 + 1.5 = 21.1 dB.","Twin audible potential: −164.6 + 120·log 17.2 + 55·log 32.2 = 66.6 dB.","NP<sub>A</sub> = 10·log{3·exp[0.23(66.6 − 11.4·log 40 − 5.8)]} = 47.3 dB(A).","Quad with 2r<sub>e</sub> = 36.3 mm gives 29.2 dB(A), about 18 dB(A) less."]],
["380 kV clearances","500 m altitude, tower gap K<sub>g</sub> = 1.45. U<sub>90%</sub> = 1780 kV, U<sub>2%</sub> = 1050 kV.",["K<sub>g,ff</sub> = 0.74 + 0.26·1.45 = 1.12. K<sub>a</sub> = 0.992 above 1100 kV.","Del fast-front = 1780/(530·0.992·0.961·1.12) = 3.15 m.","U<sub>rp</sub> slow-front = 1.05·1050 = 1103 kV.","Del slow-front = 2.17·(exp[1103/(1080·0.992·0.922·1.45)] − 1) = 2.52 m.","Dpp fast-front = 1.2·1780/(530·0.992·0.961·1.16) = 3.64 m.","Fast-front governs, because U<sub>90%</sub> of this string is high."]],
["Crossing a roof at 380 kV","Fire resistant roof over 15°. a<sub>som</sub> = 4.50 m.",["Table 2.24: Dadd = 2.0 m. Table 2.20 at 420 kV: Del = 2.80 m.","Sum: 4.80 m.","Check: 1.1·4.50 = 4.95 m.","Result: 4.95 m governs, so the flashover stays on the line."]],
["European tower check at 380 kV","Twin, a = 400 m, q<sub>c</sub> = 499 N/m², G<sub>L</sub> = 0.6. Sag 20 m, set 5 m, Dpp 3.2 m.",["Conductor swing: φ<sub>c</sub> = 25.4° from Eq. 2.64.","Table 2.22: k<sub>c</sub> = 0.60.","C<sub>min</sub> = 0.6·√25 + 0.40 + 0.75·3.2 = 5.8 m.","Insulator: tan⁻¹(8314/14209) = 30.3°.","The statistical route gave 6.5 m, so the European route is a little tighter."]]],
bad:[
["Using U<sub>pg</sub> in U²/Z<sub>c</sub>","Eq. 2.5 uses phase-to-phase voltage."],
["Thinking long lines are limited by conductor heat","Above 320 km, stability usually governs. Thermal governs only up to 80 km."],
["Treating 1.2/50 and 250/2500 as similar strength tests","Air withstands far less slow-front stress: compare 1080·ln(0.46d+1) with 530·d."],
["Applying the same K<sub>g</sub> to every stress","K<sub>g,ff</sub> and K<sub>g,pf</sub> come from K<sub>g</sub> by Equations 2.38 and 2.39."],
["Combining extreme wind with overvoltage clearance","Extreme swing pairs with power frequency clearance. Overvoltages pair with moderate wind."],
["Using gust speed for swing","Conductors react to 5 to 10 minute means. Gusts are too short."],
["Forgetting the 1.1·a<sub>som</sub> check","External clearance must also exceed 1.1 times the longest internal gap."],
["Reducing external clearances the way internal ones are reduced","Internal flashovers only interrupt supply. External clearances protect people, so Del applies in any case."],
["Assuming switching matters at 123 kV","Slow-front overvoltages are considered from 300 kV only."],
["Adding more subconductors to cut ground field","More subconductors lower noise but raise the ground level electric field."]],
q:[
{t:"n",sec:"2.1",p:"Eq. 2.5, p. 28",q:"A 500 kV line has Z<sub>c</sub> = 280 Ω. What is its surge impedance load, in MW? Nearest whole number.",a:893,tol:2,u:"MW",w:"500²/280 = 893 MW, matching Table 2.1."},
{t:"s",sec:"2.1",p:"p. 28–29",q:"A line is operated far below its natural power. What may be needed?",o:["Shunt capacitors","Shunt reactors","Series capacitors only","Nothing, ever"],a:[1],w:"Below P<sub>nat</sub> the line generates surplus reactive power, so shunt reactors may be needed. Capacitors help far above it."},
{t:"m",sec:"2.1",p:"p. 29",q:"Which raise surge impedance load? Select all that apply.",o:["Higher voltage","Compact phase spacing","More subconductors per phase","Wider phase spacing"],a:[0,1,2],w:"Each lowers Z<sub>c</sub> or raises U. Wider spacing goes the wrong way."},
{t:"s",sec:"2.1",p:"p. 30",q:"A radial 300 km, 500 kV line is usually limited by what?",o:["Thermal limit","Voltage regulation","Stability","Corona"],a:[1],w:"80 to 320 km: voltage regulation. Under 80 thermal, over 320 stability."},
{t:"s",sec:"2.1",p:"p. 31",q:"About what share of reclosing operations after lightning flashovers are unsuccessful?",o:["1 to 2 %","10 %","30 to 35 %","80 %"],a:[2],w:"30 to 35 %, matching the 60 to 70 % described as transient."},
{t:"n",sec:"2.1",p:"Eq. 2.7, p. 29",q:"U<sub>A</sub> = U<sub>e</sub> = 400 kV, X<sub>L</sub> = 80 Ω, δ = 30°. What is P<sub>G</sub> in MW?",a:1000,tol:2,u:"MW",w:"400·400/80 · sin 30° = 2000·0.5 = 1000 MW."},
{t:"n",sec:"2.1",p:"Table 2.2, p. 33",q:"A 500 kV line carries 1000 MVA in a 65 m corridor. What is the efficiency ratio in MVA/m? One decimal.",a:15.4,tol:.1,u:"MVA/m",w:"1000/65 = 15.4 MVA/m."},
{t:"s",sec:"2.2",p:"p. 32",q:"What temperature range does the book give for emergency operation of ACSR?",o:["Up to 60 °C","Up to 80 °C","100 to 120 °C","150 to 200 °C"],a:[2],w:"100 to 120 °C, against up to 80 °C for normal operation."},
{t:"s",sec:"2.3",p:"p. 36",q:"Comparing Table 2.6 with the precaution values, which is more likely to affect design?",o:["Magnetic field at all voltages","Electric field at 420 kV and above","Neither at any voltage","Magnetic field at 70 kV"],a:[1],w:"Line B values stay well under 100 μT. E can reach 4 to 8 kV/m at 420 kV against 5 kV/m."},
{t:"n",sec:"2.3",p:"Eq. 2.11, p. 34",q:"What is 100 A/m in air, in μT? One decimal.",a:125.6,tol:.5,u:"μT",w:"1 A/m = 1.256 μT, so 125.6 μT."},
{t:"s",sec:"2.3",p:"p. 37",q:"What surface gradient does the book recommend as a practical limit?",o:["About 12 kV<sub>rms</sub>/cm","About 17 kV<sub>rms</sub>/cm","About 21 kV<sub>rms</sub>/cm","About 27 kV<sub>rms</sub>/cm"],a:[1],w:"21 is critical for stranded conductors and 27 for smooth ones. The working limit is about 17."},
{t:"n",sec:"2.3",p:"p. 39",q:"Class C reception needs 22 dB. The signal to protect is 70 dB. What is the highest RI allowed at the right-of-way edge, in dB?",a:48,tol:.1,u:"dB",w:"70 − 22 = 48 dB, the same method as the book's 66 − 22 = 44."},
{t:"s",sec:"2.3",p:"p. 40",q:"When does audible noise from corona mainly occur?",o:["In dry, clear weather","In foul weather","Only at night","Only in winter at low load"],a:[1],w:"Conductors normally operate below corona inception when dry."},
{t:"x",sec:"2.3",p:"Table 2.10, p. 42",q:"Match each change to its effect.",pairs:[["More ground clearance","Reduces all four effects"],["More subconductors","Lower noise, higher electric field"],["Larger cross section","Lower noise, little field change"],["More bundle spacing","Only audible noise rises"]],w:"These are the rows of Table 2.10."},
{t:"s",sec:"2.4",p:"p. 44",q:"Temporary overvoltages are usually ignored for clearances when the earth fault factor is what?",o:["1.3 or below","2 or more","Any value","Exactly 1.7"],a:[0],w:"In directly earthed systems with earth fault factors of 1.3 or below."},
{t:"t",sec:"2.4",p:"p. 48",q:"True or false: in the statistical method, air insulation is selected to allow a certain number of flashovers.",a:true,w:"True. Air recovers, unlike solid insulation, so a specified low risk is accepted."},
{t:"s",sec:"2.4",p:"p. 49",q:"A PFO of 10⁻³ means what?",o:["One outage per 1000 switching operations","One outage per 1000 years","0.1 % of towers fail","1000 flashovers per year"],a:[0],w:"PFO of 10⁻² to 10⁻⁴ means one outage in 100 to 10 000 operations."},
{t:"n",sec:"2.4",p:"Eq. 2.31, p. 49",q:"Calculate relative air density at 1000 m and 293 K. Two decimals.",a:.87,tol:.01,u:"",w:"(288/293)·exp(−0.12) = 0.983·0.887 = 0.87."},
{t:"s",sec:"2.5",p:"p. 54",q:"Slow-front overvoltages must be considered for which systems?",o:["All voltages","Nominal 300 kV and above","Only DC","Under 100 kV"],a:[1],w:"Range II only. Fast-front counts at all voltages."},
{t:"n",sec:"2.5",p:"Eq. 2.38, p. 53",q:"K<sub>g</sub> is 1.30 for conductor-to-obstacle. Find K<sub>g,ff</sub>. Two decimals.",a:1.08,tol:.005,u:"",w:"0.74 + 0.26·1.30 = 1.078, listed as 1.08."},
{t:"n",sec:"2.5",p:"Eq. 2.51, p. 69",q:"Del for fast-front: U<sub>90%</sub> = 325 kV, K<sub>a</sub> = 0.975, K<sub>z</sub> = 0.961, K<sub>g,ff</sub> = 1.12. Metres, two decimals.",a:.58,tol:.01,u:"m",w:"325/(530·0.975·0.961·1.12) = 0.58 m."},
{t:"n",sec:"2.5",p:"Eq. 2.48, p. 55",q:"U<sub>2%</sub> = 1000 kV, K<sub>cs</sub> = 1.05. What is the phase-to-phase representative voltage, in kV?",a:1470,tol:2,u:"kV",w:"1.4·1.05·1000 = 1470 kV."},
{t:"n",sec:"2.5",p:"Tables 2.20, 2.24, p. 59, 68",q:"A 245 kV line crosses a road (Dadd 6.0 m). Del is 1.70 m and a<sub>som</sub> is 2.0 m. Minimum clearance, in m? One decimal.",a:7.7,tol:.05,u:"m",w:"6.0 + 1.7 = 7.7 m, well over 1.1·2.0 = 2.2 m."},
{t:"s",sec:"2.5",p:"p. 63",q:"Why are measured swing angles smaller than those from peak gust velocity?",o:["Conductor mass must be accelerated, so short gusts do little","Gusts have lower density","Insulators are rigid","Instruments read low"],a:[0],w:"Peak gusts are too short. Only sustained means of 5 to 10 minutes matter."},
{t:"s",sec:"2.5",p:"Table 2.23, p. 67",q:"Which clearance applies under extreme wind?",o:["Del and Dpp","0.75·Dpp","Power frequency clearances Dpf","Dadd"],a:[2],w:"Extreme wind is paired with power frequency voltage, since an overvoltage at that moment is very unlikely."},
{t:"n",sec:"2.5",p:"Eq. 2.65, p. 64",q:"What is σ<sub>φ</sub> at V = 20 m/s, in degrees? Two decimals.",a:1.85,tol:.03,u:"°",w:"exp(−400/230) = 0.176, so 2.25·0.824 = 1.85°."}
]});
