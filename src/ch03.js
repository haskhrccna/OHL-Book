OHL.add({n:3,lead:"Turning a physical line into numbers: resistance, reactance, capacitance and admittance in positive and zero sequence, and the circuit models used for short, medium and long lines. Printed pages 77 to 98.",
init:function(K){var $=K.$,fmt=K.fmt;
function C(r,i){return{r:r,i:i||0}}function add(a,b){return C(a.r+b.r,a.i+b.i)}function sub(a,b){return C(a.r-b.r,a.i-b.i)}function mul(a,b){return C(a.r*b.r-a.i*b.i,a.r*b.i+a.i*b.r)}function div(a,b){var d=b.r*b.r+b.i*b.i;return C((a.r*b.r+a.i*b.i)/d,(a.i*b.r-a.r*b.i)/d)}function abs(a){return Math.hypot(a.r,a.i)}function arg(a){return Math.atan2(a.i,a.r)*180/Math.PI}function sqrt(a){var m=Math.sqrt(abs(a)),t=Math.atan2(a.i,a.r)/2;return C(m*Math.cos(t),m*Math.sin(t))}function ch(a){return C(Math.cosh(a.r)*Math.cos(a.i),Math.sinh(a.r)*Math.sin(a.i))}function sh(a){return C(Math.sinh(a.r)*Math.cos(a.i),Math.cosh(a.r)*Math.sin(a.i))}
function cz(z,d){return fmt(z.r,d)+(z.i<0?" − j":" + j")+fmt(Math.abs(z.i),d)}
function rng(a,b,n){var o=[];for(var i=0;i<=n;i++)o.push(a+(b-a)*i/n);return o}
var SEQ={p:["Positive sequence","Currents equal in size and 120° apart. They sum to zero, so no earth return. Used for load flow, losses and voltage drop."],z:["Zero sequence","Currents equal and in phase. Their sum needs a return path through earth and earth wires. Used for phase-to-ground fault currents and ground relay settings."]};
function seq(k){var W=240,c=120,h='<circle cx="'+c+'" cy="'+c+'" r="90" class="gr"/>',A=k==="p"?[90,210,330]:[84,90,96],col=["v4","v3","v1"];
 A.forEach(function(a,i){var x=c+85*Math.cos(a*Math.PI/180),y=c-85*Math.sin(a*Math.PI/180);h+='<line x1="'+c+'" y1="'+c+'" x2="'+x+'" y2="'+y+'" stroke="var(--'+col[i]+')" stroke-width="4"/><circle cx="'+x+'" cy="'+y+'" r="5" fill="var(--'+col[i]+')"/>'});
 $("seqFig").innerHTML='<svg class="c" viewBox="0 0 '+W+' '+W+'" role="img" aria-label="'+SEQ[k][0]+' current phasors">'+h+'</svg>';
 $("seqOut").innerHTML="<b>"+SEQ[k][0]+"</b><span>"+SEQ[k][1]+"</span>";["p","z"].forEach(function(x){$("sq"+x).setAttribute("aria-pressed",x===k)})}
["p","z"].forEach(function(k){var b=document.createElement("button");b.className="ghost";b.id="sq"+k;b.textContent=SEQ[k][0];b.onclick=function(){seq(k)};$("seqBtn").appendChild(b)});seq("p");
K.calc("resCalc",{f:[{k:"R",l:"R' at 20 °C, one subconductor",min:.01,max:.7,step:.0001,v:.0584,u:"Ω/km"},{k:"T",l:"Temperature",min:-10,max:120,step:1,v:50,u:"°C"},{k:"n",l:"Subconductors",o:[[1,"1"],[2,"2"],[3,"3"],[4,"4"]],v:3}],run:function(v,c){
 var a=.00403,f=function(T){return v.R*(1+a*(T-20))/v.n};
 K.plot(c,{h:220,x:{min:-10,max:120,label:"Temperature, °C"},y:{min:0,max:f(120)*1.1,label:"R', Ω/km"},series:[{p:[[-10,f(-10)],[120,f(120)]],c:"accent"}],marks:[{x:v.T,y:f(v.T),t:fmt(f(v.T),4)}],aria:"Resistance against temperature"});
 return'<span class="big">'+fmt(f(v.T),4)+' Ω/km</span>'}});
K.calc("bunCalc",{f:[{k:"n",l:"Subconductors",o:[[1,"1"],[2,"2"],[3,"3"],[4,"4"],[6,"6"],[8,"8"]],v:3},{k:"d",l:"Subconductor diameter",min:15,max:45,step:.1,v:29.6,u:"mm"},{k:"s",l:"Spacing s",min:200,max:600,step:10,v:400,u:"mm"},{k:"D",l:"Geometric mean distance D<sub>M</sub>",min:2,max:30,step:.25,v:15.75,u:"m"}],run:function(v,c){
 var n=v.n,r=v.d/2000,s=v.s/1000,k1=n>1?Math.pow(n,1/(n-1))/(2*Math.sin(Math.PI/n)):1,rB=n>1?r*Math.pow(k1*s/r,(n-1)/n):r,r0=n>1?s/(2*Math.sin(Math.PI/n)):0,X=.0628*(Math.log(v.D/rB)+1/(4*n)),W=240,sc=70/Math.max(r0,.15),h="";
 for(var i=0;i<n;i++){var t=2*Math.PI*i/n+Math.PI/2,x=120+r0*sc*Math.cos(t),y=100-r0*sc*Math.sin(t);h+='<circle cx="'+x+'" cy="'+y+'" r="'+Math.max(4,r*sc*1.6)+'" fill="var(--accent)"/>'}
 h+='<circle cx="120" cy="100" r="'+rB*sc+'" fill="none" stroke="var(--live)" stroke-dasharray="5 4" stroke-width="2"/><text x="120" y="194" text-anchor="middle" class="i">dashed: equivalent radius</text>';
 $(c).innerHTML='<div style="max-width:300px;margin:auto"><svg class="c" viewBox="0 0 240 200" role="img" aria-label="Bundle with equivalent radius">'+h+'</svg></div>';
 return'<span>k₁ = '+fmt(k1,2)+', r₀ = '+fmt(r0,3)+' m</span><span class="big">r<sub>B</sub> = '+fmt(rB,3)+' m</span><span>X₁\' = '+fmt(X,4)+' Ω/km at 50 Hz</span>'}});
var T32=[["20 kV, 1×48-AL1",.666,.42,8.6,395,.81,1.60,3.81],["110 kV, 1×184-AL1",.176,.41,8.9,385,.42,1.00,2.44],["220 kV, 1×434-AL1",.075,.40,9.0,375,.30,.98,2.45],["380 kV, 2×562-AL1",.029,.33,11.1,310,.24,.84,2.55],["500 kV, 3×494-AL1",.022,.30,12.0,280,.23,.80,2.67],["750 kV, 4×653-AL1",.012,.29,12.5,270,.22,.78,2.69]];
K.calc("t32Calc",{f:[{k:"i",l:"Line",o:T32.map(function(r,i){return[i,r[0]]}),v:4},{k:"p",l:"Compare across lines",o:[[1,"Resistance R₁', Ω/km"],[2,"Reactance X₁', Ω/km"],[3,"Capacitance, nF/km"],[4,"Surge impedance, Ω"],[6,"Zero-sequence X₀', Ω/km"]],v:4}],run:function(v,c){
 var L={1:"Ω/km",2:"Ω/km",3:"nF/km",4:"Ω",6:"Ω/km"}[v.p];K.bars(c,{minw:480,lw:180,u:L,rows:T32.map(function(r,i){return[r[0],r[v.p],i===v.i?"live":"accent"]}),aria:"Table 3.2 values"});var r=T32[v.i];
 return'<span>R₁\' '+r[1]+', X₁\' '+r[2]+' Ω/km; C₁\' '+r[3]+' nF/km; Z<sub>c</sub> '+r[4]+' Ω</span><span>R₀\' '+r[5]+', X₀\' '+r[6]+' Ω/km; X₀/X₁ = '+r[7]+'</span>'}});
K.calc("z0Calc",{f:[{k:"rho",l:"Earth resistivity",min:10,max:3000,step:10,v:300,u:"Ω·m"},{k:"RE",l:"Earth wire R' at 20 °C",min:.1,max:3,step:.0001,v:.5644,u:"Ω/km"}],run:function(v,c){
 var f=50,m=4*Math.PI*1e-4,w=2*Math.PI*f*4*Math.PI*1e-7,d=1.85/Math.sqrt(w/v.rho),Rp=.0218,rB=.134,DM=15.75,n=3,DME=15.31,rE=.00585,DEE=20,base=f*m;
 var Z0=C(Rp+3*Math.PI/4*base,base*(3*Math.log(d/Math.cbrt(rB*DM*DM))+1/(4*n))),ZCE=C(Math.PI/4*base,base*Math.log(d/DME)),ZE=C(v.RE/2+Math.PI/4*base,base*(Math.log(d/Math.sqrt(rE*DEE))+10/8)),Z2=sub(Z0,div(mul(C(3),mul(ZCE,ZCE)),ZE));
 K.bars(c,{minw:480,lw:190,u:"Ω/km",rows:[["R₀', no earth wire",Z0.r,"v1",fmt(Z0.r,3)],["R₀', two earth wires",Z2.r,"accent",fmt(Z2.r,3)],["X₀', no earth wire",Z0.i,"v1",fmt(Z0.i,3)],["X₀', two earth wires",Z2.i,"accent",fmt(Z2.i,3)]],aria:"Zero sequence impedance with and without earth wires"});
 return'<span>Return depth δ = '+fmt(d)+' m</span><span>No earth wire: '+cz(Z0,3)+' Ω/km</span><span><b>Two earth wires: '+cz(Z2,3)+' Ω/km</b></span><span>X₀/X₁ = '+fmt(Z2.i/.3046,2)+'</span>'}});
$("capFig").innerHTML='<svg class="c" viewBox="0 0 280 200" role="img" aria-label="Capacitances between three phases and to earth"><path d="M20 170H260" stroke="var(--ink)" stroke-width="2"/>'+[60,140,220].map(function(x,i){return'<circle cx="'+x+'" cy="50" r="8" fill="var(--accent)"/><text class="i" x="'+x+'" y="30" text-anchor="middle">'+"ABC"[i]+'</text><path d="M'+x+' 58V100M'+(x-10)+' 100H'+(x+10)+'M'+(x-10)+' 110H'+(x+10)+'M'+x+' 110V170" stroke="var(--muted)" fill="none"/><text x="'+(x+14)+'" y="110">C₀</text>'}).join("")+'<path d="M68 50H95M95 40V60M105 40V60M105 50H132M148 50H175M175 40V60M185 40V60M185 50H212" stroke="var(--live)" fill="none"/><text class="i" x="100" y="78" text-anchor="middle">C</text><text class="i" x="180" y="78" text-anchor="middle">C</text></svg>';
K.calc("capCalc",{f:[{k:"D",l:"D<sub>M</sub>",min:2,max:30,step:.25,v:15.75,u:"m"},{k:"r",l:"r<sub>B</sub>",min:.01,max:.5,step:.001,v:.134,u:"m"},{k:"h",l:"h<sub>M</sub>",min:6,max:40,step:.1,v:14.7,u:"m"}],run:function(v){
 var e=8.854e-12,C1=2*Math.PI*e*1000/Math.log(v.D/(v.r*Math.sqrt(1+Math.pow(v.D/(2*v.h),2)))),nF=C1*1e9;return'<span class="big">C₁\' = '+fmt(nF,1)+' nF/km</span><span>X<sub>c1</sub>\' = '+fmt(1/(2*Math.PI*50*C1)/1e6,3)+' MΩ·km, B₁\' = '+fmt(2*Math.PI*50*C1*1e6,2)+' μS/km</span>'}});
K.stepper("modStep",[["Short line","Series R and X only, capacitance ignored. U<sub>s</sub> = U<sub>R</sub> + Z·I<sub>R</sub>, I<sub>s</sub> = I<sub>R</sub>."],["Medium line, nominal Π","Series Z in the middle, Y/2 at each end, all from per-km values × length. U<sub>s</sub> = (ZY/2 + 1)U<sub>R</sub> + Z·I<sub>R</sub>."],["Long line, exact","Over about 100 km, for accuracy, use distributed parameters: exponential or hyperbolic equations."],["Long line, equivalent Π","Same form as nominal, with Z = Z<sub>c</sub>·sinh(γa) and Y/2 = (1/Z<sub>c</sub>)·tanh(γa/2). Exact at both ends, but says nothing about intermediate points."]]);
var Zp=C(.0218,.3046),Yp=C(0,3.77e-6),g=sqrt(mul(Zp,Yp)),Zc=sqrt(div(Zp,Yp));
function solve(a,P,Ur){var ga=C(g.r*a,g.i*a),IR=C(P*1e6/(3*Ur)),Us=add(mul(C(Ur),ch(ga)),mul(mul(IR,Zc),sh(ga))),Is=add(mul(IR,ch(ga)),mul(div(C(Ur),Zc),sh(ga)));return{Us:Us,Is:Is}}
K.calc("llCalc",{f:[{k:"a",l:"Length",min:50,max:1000,step:10,v:300,u:"km"},{k:"P",l:"Load",min:0,max:2000,step:10,v:1000,u:"MW"}],run:function(v,c){
 var Ur=500e3/Math.sqrt(3),s=solve(v.a,v.P,Ur),Pin=3*(s.Us.r*s.Is.r+s.Us.i*s.Is.i)/1e6,pts=rng(0,v.a,40).map(function(x){var q=solve(x,v.P,Ur);return[v.a-x,abs(q.Us)*Math.sqrt(3)/1e3]}),mn=Math.min.apply(null,pts.map(function(p){return p[1]})),mx=Math.max.apply(null,pts.map(function(p){return p[1]}));
 K.plot(c,{h:240,x:{min:0,max:v.a,label:"Distance from sending end, km"},y:{min:Math.floor(mn/20)*20-20,max:Math.ceil(mx/20)*20+20,label:"Voltage, kV"},series:[{p:pts,c:"accent"}],hlines:[{y:500,t:"500 kV"}],aria:"Voltage profile along the line"});
 var dU=(abs(s.Us)*Math.sqrt(3)/500e3-1)*100;return'<span class="big">U<sub>s</sub> = '+fmt(abs(s.Us)*Math.sqrt(3)/1e3,1)+' kV</span><span>Power angle '+fmt(arg(s.Us),1)+'°, I<sub>s</sub> = '+fmt(abs(s.Is))+' A</span><span>Sending power '+fmt(Pin)+' MW, losses '+fmt(Pin-v.P)+' MW, regulation '+fmt(dU,1)+' %</span>'}});
K.plot("piChart",{h:230,x:{min:0,max:1000,label:"Line length, km"},y:{min:0,max:50,label:"Error in |Z|, %"},series:[{p:rng(10,1000,50).map(function(a){var e=mul(Zc,sh(C(g.r*a,g.i*a)));return[a,(abs(Zp)*a/abs(e)-1)*100*(1)]}),c:"v4"}],aria:"Error of the nominal Pi circuit against length"});
},
cards:[
["Line parameters","R, L and C per unit length, combining conductor properties with the physical arrangement.","p. 80"],
["Symmetrical components","Positive, negative and zero sequence impedances used in system studies.","p. 80"],
["IACS","100 % is annealed copper at 58 m/(Ω·mm²). Hard aluminium is about 61 %.","p. 81"],
["Bundle resistance","One subconductor's resistance divided by n₂.","p. 81"],
["Conductor temperature for losses","Use 40 to 50 °C rather than the design maximum, to avoid overestimating losses.","p. 82"],
["Positive-sequence impedance","Z₁' = R₁' + jX₁', the main parameter for normal operation.","p. 82–83"],
["Equivalent radius r<sub>B</sub>","(n·r·r₀<sup>n−1</sup>)<sup>1/n</sup>. Larger values cut inductance and raise capacitance.","p. 83–84"],
["Full transposition","Phase orders ABC, BCA, CAB each hold one third of the length.","p. 84"],
["Zero-sequence reactance","1.5 to 4 times X₁, because the return path changes the field.","p. 85"],
["Return depth δ","Effective depth of earth return current, 1613 m for 300 Ω·m at 50 Hz.","p. 86, 88"],
["Earth wire permeability","About 25 for steel earth wires, about 1 for aluminium types.","p. 87"],
["Capacitive susceptance","B<sub>c</sub> = 2πfC, the inverse of X<sub>c</sub>.","p. 88"],
["C₁ = C₀ + 3C","Delta to star result linking positive sequence, ground and interphase capacitances.","p. 89"],
["Conductance G'","Real part of admittance, very small on overhead lines, neglected.","p. 91"],
["Nominal Π-circuit","Series Z in the middle, Y/2 at each end, from per-km values times length.","p. 92"],
["Propagation constant γ","√(Z'Y') = α + jβ. α attenuates, β shifts phase.","p. 94"],
["Wave length λ","2π/β, about 5870 km at 50 Hz.","p. 94"],
["Flat line","Terminated in Z<sub>c</sub> so no wave is reflected.","p. 94"],
["Surge impedance load","Power into a purely resistive load equal to Z<sub>c</sub>.","p. 95"],
["Equivalent Π-circuit","Lumped circuit corrected with hyperbolic terms, exact at both ends.","p. 96–97"]],
fm:[
["R'<sub>DC</sub> = ρ/A","DC resistance per unit length.","3.1, p. 81"],
["R'<sub>T</sub> = R'<sub>20</sub>·[1 + α(T − 20)]","Temperature correction.","3.2, p. 81"],
["r<sub>B</sub> = r·(k₁·s/r)<sup>(n−1)/n</sup>","Bundle equivalent radius.","3.6, p. 83"],
["k₁ = n<sup>1/(n−1)</sup>/[2 sin(π/n)]","Table 3.1 gives 1.12 for n = 4.","p. 83"],
["D<sub>M</sub> = ∛(D<sub>AB</sub>·D<sub>AC</sub>·D<sub>BC</sub>)","Geometric mean distance.","3.7, p. 84"],
["X₁' = 0.0628·[ln(D<sub>M</sub>/r<sub>B</sub>) + 1/(4n)]","Ω/km at 50 Hz. 0.0754 at 60 Hz.","3.13, p. 84"],
["δ = 1.85/√(ωμ₀/ρ<sub>E</sub>)","Return depth of earth current.","3.15, p. 86"],
["Z₀₂E' = Z₀' − 3·Z<sub>CE</sub>'²/Z<sub>E</sub>'","Zero sequence with earth wires, Z<sub>E</sub>' for the two wires.","3.20, p. 87"],
["X<sub>c</sub> = 1/(2πfC)","Capacitive reactance.","3.28, p. 88"],
["C₁ = C₀ + 3C","Positive sequence capacitance.","3.29, p. 89"],
["C₁' = 2πε₀/ln[D<sub>M</sub>/(r<sub>B</sub>√(1+(D<sub>M</sub>/2h<sub>M</sub>)²))]","Single circuit.","3.33, p. 90"],
["ΔU % = (|U<sub>s</sub>|/|U<sub>R</sub>| − 1)·100","Voltage regulation.","3.48, p. 93"],
["Z<sub>c</sub> = √(Z'/Y'), γ = √(Z'Y') = α + jβ","Surge impedance, propagation constant.","3.51–3.52, p. 94"],
["U<sub>s</sub> = U<sub>R</sub>·cosh γa + I<sub>R</sub>·Z<sub>c</sub>·sinh γa","Sending voltage.","3.57, p. 95"],
["I<sub>s</sub> = I<sub>R</sub>·cosh γa + (U<sub>R</sub>/Z<sub>c</sub>)·sinh γa","Sending current.","3.58, p. 95"],
["Z = Z<sub>c</sub> sinh γa; Y/2 = (1/Z<sub>c</sub>) tanh(γa/2)","Equivalent Π elements.","3.61–3.62, p. 96"]],
wx:[
["Positive-sequence impedance, 500 kV","3 × 494-AL1/34-ST1A, d = 29.9 mm, s = 400 mm, D = 12.5, 12.5, 25 m, R = 0.0584 Ω/km at 20 °C, α = 0.00403.",["R at 50 °C: 0.0584·[1 + 0.00403·30]/3 = 0.0218 Ω/km.","D<sub>M</sub> = ∛(12.5·12.5·25) = 15.75 m.","r₀ = 0.400/[2 sin 60°] = 0.231 m.","r<sub>B</sub> = ∛(3·0.014805·0.231²) = 0.134 m.","X₁' = 0.0628·[ln(15.75/0.134) + 1/12] = 0.3046 Ω/km.","Z₁' = 0.0218 + j0.3046 = 0.3054∠85.9° Ω/km."]],
["Zero sequence with two earth wires","Same line. ρ<sub>E</sub> = 300 Ω·m, 51-AL1/30-ST1A wires, 0.5644 Ω/km, r<sub>E</sub> = 5.85 mm, 20 m apart, D<sub>ME</sub> = 15.31 m.",["δ = 1.85/√(2π·50·4π·10⁻⁷/300) = 1613 m.","No wires: Z₀' = 0.170 + j1.177 Ω/km.","Mutual: Z<sub>CE</sub>' = 0.0493 + j0.2926 Ω/km.","Earth wires: Z<sub>E</sub>' = 0.332 + j0.610 Ω/km.","Z₀₂E' = Z₀' − 3Z<sub>CE</sub>'²/Z<sub>E</sub>' = 0.232 + j0.802 Ω/km.","Polar: 0.835∠73.9° Ω/km, about 2.6 times X₁'."]],
["300 km, 1000 MW at 500 kV","Unity power factor at the receiving end. Unrounded solution; see the note on rounding at the end of the Summary.",["γ = √(Z'Y') = 1.073·10⁻³∠87.95° /km; γa = 0.0115 + j0.322.","Z<sub>c</sub> = 284.6∠−2.05° Ω.","U<sub>R</sub> = 288.7 kV, I<sub>R</sub> = 1154.7 A.","cosh γa ≈ 0.949, sinh γa ≈ 0.316∠88°.","U<sub>s</sub> = 300.1 kV to earth at about 20.4°, so 519.7 kV phase to phase.","I<sub>s</sub> = 1142 A, P<sub>s</sub> = 1026 MW, losses about 26 MW."]]],
bad:[
["Using the design maximum temperature for loss estimates","Real temperatures are lower. Use 40 to 50 °C for economic loss studies."],
["Taking X₀ = X₁","X₀ is 1.5 to 4 times X₁."],
["Thinking earth wires change C₁","They affect zero-sequence capacitance only."],
["Multiplying R by n₂ for a bundle","Divide by n₂: subconductors are in parallel."],
["Using μ = 1 for a steel earth wire","Use about 25; 5 to 10 for one-layer ACSR."],
["Using r₀ where r<sub>B</sub> is needed","r₀ is the bundle circle. r<sub>B</sub> is the equivalent radius."],
["Trusting a nominal Π for very long lines","Error grows with length. Use the equivalent circuit."],
["Expecting the equivalent Π to give mid-line voltages","It is exact at the ends only. Build another circuit to the intermediate point."]],
q:[
{t:"s",sec:"3.2",p:"p. 81",q:"Compared with annealed copper at 100 % IACS, what is hard-drawn aluminium?",o:["97 %","61 %","35 %","120 %"],a:[1],w:"61 % IACS, 35.38 m/(Ω·mm²). 97 % is hard-drawn copper."},
{t:"n",sec:"3.2",p:"Eq. 3.2, p. 81",q:"R' = 0.0600 Ω/km at 20 °C, α = 0.004 /K. What is it at 70 °C, in Ω/km? Three decimals.",a:.072,tol:.0006,u:"Ω/km",w:"0.06·(1 + 0.004·50) = 0.072."},
{t:"n",sec:"3.2",p:"p. 81",q:"A subconductor has 0.0654 Ω/km. What is a triple bundle's resistance, in Ω/km? Four decimals.",a:.0218,tol:.0002,u:"Ω/km",w:"0.0654/3 = 0.0218 Ω/km."},
{t:"s",sec:"3.2",p:"p. 82",q:"Which conductor temperature does the book advise for Joule loss calculations?",o:["About 20 °C","40 to 50 °C","60 to 80 °C","100 °C"],a:[1],w:"Measured temperatures are lower than theoretical ones, so 40 to 50 °C avoids overstating losses."},
{t:"n",sec:"3.3",p:"Table 3.1, p. 83",q:"Twin bundle, r = 16 mm, s = 400 mm. What is r<sub>B</sub> in mm?",a:80,tol:.5,u:"mm",w:"√(16·400) = 80 mm, as in Table 3.1."},
{t:"n",sec:"3.3",p:"Eq. 3.7, p. 84",q:"Flat line with D<sub>AB</sub> = D<sub>BC</sub> = 10 m, D<sub>AC</sub> = 20 m. What is D<sub>M</sub> in m? Two decimals.",a:12.6,tol:.02,u:"m",w:"∛(10·10·20) = 12.60 m."},
{t:"s",sec:"3.3",p:"p. 84",q:"For 60 Hz, what replaces 0.0628 in Eq. 3.13?",o:["0.0524","0.0754","0.1257","0.314"],a:[1],w:"0.0754, which is 0.0628·60/50."},
{t:"m",sec:"3.3",p:"Table 3.2, p. 84",q:"Going from 110 kV single to 750 kV quad in Table 3.2, what happens? Select all.",o:["X₁' falls","C₁' rises","Z<sub>c</sub> falls","R₁' rises"],a:[0,1,2],w:"Bundles raise r<sub>B</sub>: less inductance, more capacitance, lower Z<sub>c</sub>. Resistance falls."},
{t:"s",sec:"3.4",p:"p. 85",q:"What is the main use of zero-sequence impedance?",o:["Corona loss","Phase-to-ground short circuit currents","Sag calculation","Radio noise"],a:[1],w:"Phase-to-ground fault currents, needed to set ground fault relays."},
{t:"s",sec:"3.4",p:"p. 85",q:"How large is X₀ compared with X₁?",o:["Equal","Half","1.5 to 4 times","10 to 20 times"],a:[2],w:"1.5 to 4 times. Table 3.2 shows 2.44 to 3.81."},
{t:"t",sec:"3.4",p:"p. 85",q:"True or false: zero-sequence currents flow only if a return path exists.",a:true,w:"True. They are in phase, so they need earth or earth wires to return."},
{t:"n",sec:"3.4",p:"Eq. 3.15, p. 88",q:"Earth resistivity rises 100 times. By what factor does δ change?",a:10,tol:.01,u:"times",w:"δ grows with √ρ<sub>E</sub>, so √100 = 10."},
{t:"s",sec:"3.4",p:"p. 87",q:"Which μ suits a steel earth wire?",o:["About 1","5 to 10","About 25","Over 500"],a:[2],w:"About 25 on average."},
{t:"n",sec:"3.5",p:"Eq. 3.28, p. 88",q:"C' = 12 nF/km at 50 Hz. What is X<sub>c</sub>' in MΩ·km? Three decimals.",a:.265,tol:.003,u:"MΩ·km",w:"1/(2π·50·12·10⁻⁹) = 0.265 MΩ·km, listed as 0.26."},
{t:"n",sec:"3.5",p:"Eq. 3.29, p. 89",q:"C₀ = 9 nF/km and C = 1 nF/km. What is C₁, in nF/km?",a:12,tol:.01,u:"nF/km",w:"C₁ = C₀ + 3C = 12."},
{t:"s",sec:"3.5",p:"p. 90",q:"What do earth wires change?",o:["Positive-sequence capacitance","Zero-sequence capacitance","Both equally","Neither"],a:[1],w:"Only C₀; C₁ comes from Eq. 3.33 regardless."},
{t:"s",sec:"3.6",p:"p. 91",q:"Why can overhead line shunt conductance be neglected?",o:["It is very small","It equals susceptance","It cancels with R","It is infinite"],a:[0],w:"G' is very small, so Y' ≈ jB'."},
{t:"s",sec:"3.7",p:"p. 92",q:"What does a short line model ignore?",o:["Resistance","Reactance","Shunt capacitance","Voltage"],a:[2],w:"Only series R and X remain."},
{t:"s",sec:"3.7",p:"p. 93",q:"From about what length does the book want distributed parameters for accuracy?",o:["10 km","100 km","1000 km","Any length"],a:[1],w:"Lines longer than 100 km."},
{t:"n",sec:"3.7",p:"Eq. 3.53, p. 94",q:"β = 1.05·10⁻³ rad/km. What is λ in km? Nearest 10.",a:5984,tol:15,u:"km",w:"2π/(1.05·10⁻³) = 5984 km."},
{t:"s",sec:"3.7",p:"p. 94",q:"A line terminated in its characteristic impedance has what?",o:["Full reflection","No reflected wave","Infinite voltage","Zero current"],a:[1],w:"The reflected term is zero: a flat line."},
{t:"n",sec:"3.7",p:"Eq. 3.48, p. 93",q:"|U<sub>s</sub>| = 525 kV, |U<sub>R</sub>| = 500 kV. Voltage regulation in %?",a:5,tol:.01,u:"%",w:"(525/500 − 1)·100 = 5 %."},
{t:"x",sec:"3.7",p:"p. 92–96",q:"Match each model with its feature.",pairs:[["Short line","Series impedance only"],["Nominal Π","Unit values × length, Y/2 at each end"],["Hyperbolic equations","Exact with distributed parameters"],["Equivalent Π","Lumped circuit with sinh and tanh corrections"]],w:"Each model adds a level of accuracy."},
{t:"s",sec:"3.7",p:"p. 96",q:"What can the equivalent Π-circuit not give directly?",o:["Sending voltage","Sending current","Voltage at an intermediate point","Power at the ends"],a:[2],w:"Only the ends are exact; build another circuit for a mid-point."}
]});
