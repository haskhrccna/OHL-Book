OHL.add({n:5,lead:"Why towers are earthed, what makes touch voltages safe, how to calculate electrodes, and how to measure soil and earthing resistance. Printed pages 115 to 141.",
init:function(K){var $=K.$,fmt=K.fmt;
function rng(a,b,n){var o=[];for(var i=0;i<=n;i++)o.push(a+(b-a)*i/n);return o}
var T51=[[.05,900,1090,735],[.1,750,1125,633],[.2,600,1175,528],[.5,200,1360,204],[1,80,1780,107],[2,60,2000,90],[5,51,2130,81],[10,50,2130,80]];
function li(x,i){var L=Math.log(x);for(var k=0;k<T51.length-1;k++){var a=T51[k],b=T51[k+1];if(x<=b[0]){var t=(L-Math.log(a[0]))/(Math.log(b[0])-Math.log(a[0]));return Math.exp(Math.log(a[i])+t*(Math.log(b[i])-Math.log(a[i])))}}return T51[7][i]}
K.calc("potCalc",{f:[{k:"I",l:"Earth current",min:50,max:5000,step:50,v:500,u:"A"},{k:"r",l:"Soil resistivity",min:10,max:2000,step:10,v:100,u:"Ω·m"},{k:"a",l:"Electrode radius",min:.2,max:3,step:.1,v:1,u:"m"}],run:function(v,c){
 var R=v.r/(2*Math.PI*v.a),UE=v.I*R,p=function(x){return x<v.a?UE:v.I*v.r/(2*Math.PI*x)},T=UE-p(v.a+1),S=p(v.a+1)-p(v.a+2);
 K.plot(c,{h:230,x:{min:0,max:20,label:"Distance from centre, m"},y:{min:0,max:UE*1.08,label:"Potential, V"},series:[{p:rng(0,20,80).map(function(x){return[x,p(x)]}),c:"accent"}],aria:"Surface potential"});
 return'<span>R<sub>E</sub> = '+fmt(R,1)+' Ω, U<sub>E</sub> = '+fmt(UE/1000,2)+' kV</span><span>Touch at 1 m: '+fmt(T)+' V, '+fmt(T/UE*100)+' % of U<sub>E</sub></span><span>Step: '+fmt(S)+' V, '+fmt(S/UE*100)+' % of U<sub>E</sub></span>'}});
K.calc("touchCalc",{f:[{k:"t",l:"Fault duration",min:.05,max:10,step:.05,v:.5,u:"s"},{k:"R",l:"Additional resistance R<sub>a</sub>",o:[[0,"None, bare feet"],[1750,"1750 Ω, shoes"],[4000,"4000 Ω"],[7000,"7000 Ω"]],v:1750}],run:function(v,c){
 var U=li(v.t,3),Z=li(v.t,2),UD=U*(1+v.R/Z),S=[.05,.1,.2,.5,1,2,5,10];
 function ser(R){return S.map(function(t){return[t,li(t,3)*(1+R/li(t,2))]})}
 K.plot(c,{h:250,x:{min:.05,max:10,log:true,label:"Fault duration, s (log scale)",ticks:[.05,.1,.5,1,5,10]},y:{min:10,max:10000,log:true,label:"Voltage, V"},series:[{p:ser(0),c:"v4",t:"None"},{p:ser(1750),c:"v2",t:"1750 Ω"},{p:ser(4000),c:"v1",t:"4000 Ω"},{p:ser(7000),c:"v5",t:"7000 Ω"}],marks:[{x:v.t,y:UD,t:fmt(UD)+" V"}],aria:"Permissible touch voltage against duration"});
 return'<span>U<sub>TP</sub> = '+fmt(U)+' V, body current about '+fmt(li(v.t,1))+' mA</span><span class="big">U<sub>D</sub> = '+fmt(UD)+' V</span>'}});
K.bars("rBars",{lw:190,minw:480,max:1.05,rows:[["AL1/ST1A 304/49",.61],["AL1/ST1A 264/34",.62],["AL1/ST1A 184/30",.62],["AL1/ST1A 97/56",.70],["AL1/ST1A 44/32",.77],["Bronze 50",.75],["Bronze 70",.69],["Steel 50",1,"v4","about 1.00"],["Steel 70",.97,"v4"]],aria:"Reduction factors"});
K.stepper("flow",[["1. Insulating tower?","Wood or other non-conductive supports with no conducting parts to earth: no earthing requirement."],["2. Often occupied surroundings?","Review carefully if people stay for hours a day over some weeks, or briefly but very often, near homes or playgrounds. Forests and open country are not in this group."],["3. Rare access plus automatic disconnection?","Touch voltage need not be considered, because a coincidence is negligible."],["4. Find earth potential rise","ΔU<sub>E</sub> = Z<sub>E</sub>·r<sub>E</sub>·3I₀."],["5. ΔU<sub>E</sub> ≤ 2·U<sub>D</sub>?","Then the design is acceptable."],["6. Find permissible voltage","U<sub>D</sub> from body impedance and R<sub>a</sub>, Eq. 5.5."],["7. Check U<sub>TP</sub> from Eq. 5.6","It must stay within Fig. 5.5."],["8. Otherwise, take measures","Insulate the location, or improve earthing, until the requirements are met."]]);
K.calc("eprCalc",{f:[{k:"I",l:"3I₀",min:500,max:40000,step:500,v:10000,u:"A"},{k:"RT",l:"Tower resistance R<sub>T</sub>",min:1,max:50,step:1,v:10,u:"Ω"},{k:"Zs",l:"Earth wire per span Z<sub>S</sub>",min:.05,max:2,step:.05,v:.4,u:"Ω"},{k:"r",l:"Reduction factor r<sub>E</sub>",min:.5,max:1,step:.01,v:.62,u:""},{k:"t",l:"Fault duration",min:.1,max:5,step:.1,v:.5,u:"s"},{k:"R",l:"R<sub>a</sub>",o:[[0,"None"],[1750,"1750 Ω"],[4000,"4000 Ω"]],v:1750}],run:function(v){
 var Z=.25*(v.Zs+Math.sqrt(v.Zs*(4*v.RT+v.Zs))),E=Z*v.r*v.I,UD=li(v.t,3)*(1+v.R/li(v.t,2)),ok=E<=2*UD;
 return'<span>Z<sub>E</sub> = '+fmt(Z,2)+' Ω</span><span class="big">ΔU<sub>E</sub> = '+fmt(E)+' V</span><span>2·U<sub>D</sub> = '+fmt(2*UD)+' V</span><span class="'+(ok?"good":"bad")+'">'+(ok?"Acceptable at step 5":"Over the limit: continue to steps 6 to 8")+'</span>'}});
K.bars("t55",{lw:120,minw:440,max:100,u:"%",rows:[["20 kA",80],["30 kA",90],["40 kA",95],["50 kA",98],["60 kA",99]],aria:"Probability of short circuit current"});
K.calc("xsCalc",{f:[{k:"m",l:"Material",o:[[0,"Copper"],[1,"Aluminium"],[2,"Steel"]],v:2},{k:"I",l:"Current",min:1,max:63,step:1,v:20,u:"kA"},{k:"t",l:"Duration",min:.1,max:5,step:.1,v:1,u:"s"},{k:"Ti",l:"Initial temperature",min:0,max:80,step:5,v:20,u:"°C"}],run:function(v){
 var M=[[226,234.5,300,16],[148,228,200,35],[78,202,300,50]][v.m],A=v.I*1000/M[0]*Math.sqrt(v.t)/Math.sqrt(Math.log((M[2]+M[1])/(v.Ti+M[1])));return'<span class="big">A = '+fmt(A)+' mm²</span><span>Mechanical minimum for this material: '+M[3]+' mm²</span>'}});
(function(){var R=[["Sea water",1,1.2],["Marshy soil",5,40],["Loam, clay, humus",50,350],["Sand",200,2500],["Lime stone",350,420],["Weathered rock",100,1000],["Gravel",2000,3000],["Sand stone",2000,3000],["Granite",3000,50000]],W=640,L=160,rh=26,lg=K.log10,sc=function(v){return L+(lg(v)/5)*(W-L-30)},h="";
[1,10,100,1000,10000,100000].forEach(function(t){h+='<path class="gr" d="M'+sc(t)+' 0V'+(R.length*rh)+'"/><text x="'+sc(t)+'" y="'+(R.length*rh+14)+'" text-anchor="middle">'+fmt(t)+'</text>'});
R.forEach(function(r,i){var y=i*rh+3;h+='<text class="i" x="'+(L-8)+'" y="'+(y+14)+'" text-anchor="end">'+r[0]+'</text><rect x="'+sc(r[1])+'" y="'+y+'" width="'+Math.max(5,sc(r[2])-sc(r[1]))+'" height="18" rx="2" fill="var(--accent)"/>'});
$("soilFig").innerHTML='<div class="scroll"><div style="min-width:520px"><svg class="c" viewBox="0 0 '+W+' '+(R.length*rh+22)+'" role="img" aria-label="Soil resistivity ranges in ohm metres">'+h+'</svg></div></div><p class="cap">Ω·m, log scale. Lime stone is one value, 350. Weathered rock is listed as "up to 1000", so its lower end here is only a drawing choice.</p>'})();
K.calc("elecCalc",{f:[{k:"r",l:"Soil resistivity",min:20,max:3000,step:10,v:400,u:"Ω·m"},{k:"L",l:"Length or ring diameter",min:2,max:60,step:1,v:25,u:"m"},{k:"d",l:"Diameter",min:5,max:30,step:1,v:10,u:"mm"}],run:function(v,c){
 var d=v.d/1000,L=v.L,Rod=v.r/(2*Math.PI*L)*Math.log(4*L/d),Wire=v.r/(2*Math.PI*L)*Math.log(2*L/d),Rad=v.r/(Math.PI*L)*Math.log(2*L/d),Ring=v.r/(Math.PI*Math.PI*L)*Math.log(2*Math.PI*L/d);
 K.bars(c,{minw:460,lw:190,u:"Ω",rows:[["Vertical rod, 5.14",Rod,"v1",fmt(Rod,1)+" Ω"],["Buried wire, Table 5.8",Wire,"accent",fmt(Wire,1)+" Ω"],["Radial, 5.19",Rad,"v3",fmt(Rad,1)+" Ω"],["Ring diameter L, 5.20",Ring,"v4",fmt(Ring,1)+" Ω"]],aria:"Electrode resistance"});return null}});
K.bars("rodBars",{lw:120,minw:440,max:100,u:"%",rows:[["1 rod",100],["2 rods",60],["3 rods",40],["4 rods",33]],aria:"Parallel rods"});
K.calc("wenCalc",{f:[{k:"a",l:"Spacing a",o:[[2,"2 m"],[4,"4 m"],[8,"8 m"],[16,"16 m"],[32,"32 m"]],v:8},{k:"R",l:"Instrument reading",min:.5,max:60,step:.1,v:6,u:"Ω"}],run:function(v,c){var W=640,s="",xs=[120,250,380,510],lab=["C₁","P₁","P₂","C₂"];
 s+='<path d="M20 60H620" stroke="var(--ink)" stroke-width="2"/><path d="M120 60C200 190 430 190 510 60" fill="none" stroke="var(--v1)" stroke-dasharray="5 4"/><path d="M120 60C220 130 410 130 510 60" fill="none" stroke="var(--v1)" stroke-dasharray="5 4"/>';
 xs.forEach(function(x,i){s+='<path d="M'+x+' 40V84" stroke="var(--live)" stroke-width="4"/><text class="b" x="'+x+'" y="30" text-anchor="middle">'+lab[i]+'</text>'});
 [0,1,2].forEach(function(i){s+='<text x="'+(xs[i]+65)+'" y="52" text-anchor="middle">a = '+v.a+' m</text>'});
 $(c).innerHTML='<div class="scroll"><div style="min-width:480px"><svg class="c" viewBox="0 0 '+W+' 180" role="img" aria-label="Four probes in a line">'+s+'</svg></div></div>';
 return'<span class="big">ρ<sub>E</sub> = '+fmt(2*Math.PI*v.a*v.R)+' Ω·m</span><span class="small">2π · '+v.a+' · '+fmt(v.R,1)+'</span>'}});
K.stepper("mthStep",[["Earth megger, fall-of-potential","For small and medium electrodes, frequency up to 150 Hz. Probe at least 2.5 times the electrode extent and over 20 m away, auxiliary electrode 4 times the extent beyond it and over 40 m."],["High-frequency tester","Measures a single tower without lifting the earth wire, because the line impedance becomes high at the test frequency. Less reliable than meggers in practice."],["Heavy-current injection","For large systems. System frequency, remote electrode at least 5 km away if possible, over 50 A. Earth wires stay connected, and Eq. 5.31 uses the reduction factor to get Z<sub>E</sub>."]]);
K.calc("fopCalc",{f:[{k:"l",l:"Distance l between C₁ and C₂",min:20,max:100,step:5,v:60,u:"m"}],run:function(v,c){var r=1,l=v.l,f=function(a){return (1/r-1/(l-r)-1/a+1/(l-a))/(1/r)};
 K.plot(c,{h:220,x:{min:0,max:l,label:"Distance a from C₁, m"},y:{min:0,max:1.3,label:"R / R true"},series:[{p:rng(1,l-1,80).map(function(a){return[a,Math.min(1.29,f(a))]}),c:"accent"}],vlines:[{x:.62*l,t:"0.62·l"}],marks:[{x:.62*l,y:f(.62*l)}],aria:"Fall of potential curve"});
 return'<span>Best probe position: '+fmt(.62*l,1)+' m</span>'}});
K.calc("chkCalc",{f:[{k:"a",l:"30 m reading",min:1,max:40,step:.1,v:7.5,u:"Ω"},{k:"b",l:"40 m reading",min:1,max:40,step:.1,v:10.5,u:"Ω"},{k:"d",l:"50 m reading",min:1,max:40,step:.1,v:12,u:"Ω"}],run:function(v){var m=(v.a+v.b+v.d)/3,D=Math.max(Math.abs(v.a-m),Math.abs(v.b-m),Math.abs(v.d-m))/m*100,ok=D<=20;return'<span>Mean '+fmt(m,1)+' Ω</span><span class="big">'+fmt(D,1)+' %</span><span class="'+(ok?"good":"bad")+'">'+(ok?"Within 20 %":"Over 20 %: repeat at l = 80 m")+'</span>'}});
K.calc("layCalc",{f:[{k:"p",l:"ρ₁, upper",min:20,max:1500,step:10,v:520,u:"Ω·m"},{k:"q",l:"ρ₂, lower",min:20,max:1500,step:10,v:80,u:"Ω·m"},{k:"d",l:"d₁",min:.5,max:20,step:.1,v:6.2,u:"m"}],run:function(v,c){var k=(v.q-v.p)/(v.p+v.q);
 function rho(a){var s=0;for(var n=1;n<=40;n++){var kn=Math.pow(k,n),x=2*n*v.d/a;s+=kn/Math.sqrt(1+x*x)-kn/Math.sqrt(4+x*x)}return v.p*(1+4*s)}
 var mx=Math.max(v.p,v.q)*1.15;K.plot(c,{h:230,x:{min:.5,max:100,log:true,label:"Spacing a, m (log scale)",ticks:[1,2,5,10,20,50,100]},y:{min:0,max:mx,label:"ρ apparent, Ω·m"},series:[{p:rng(0,2,60).map(function(t){var a=.5*Math.pow(100/.5,t/2);return[a,rho(a)]}),c:"accent"}],hlines:[{y:v.p,t:"ρ₁",c:"v1"},{y:v.q,t:"ρ₂",c:"v4"}],aria:"Apparent resistivity"});
 return'<span class="big">k = '+fmt(k,2)+'</span><span>Lower layer is '+(k<0?"more":"less")+' conductive.</span>'}});
},
cards:[
["Earthing priorities","Safety of persons and animals comes first in EN 50341-1.","p. 117"],
["Three types of earthing","Operational, protection, and lightning protection.","p. 117"],
["Earthing voltage U<sub>E</sub>","Voltage of the electrode against remote reference earth.","p. 118"],
["Touch voltage","Part of U<sub>E</sub> bridged between hand and feet. Can reach about 50 %.","p. 118"],
["Step voltage","Part of U<sub>E</sub> across a stride. Can reach about 30 %.","p. 118"],
["Potential control","Ring electrodes that cut touch and step voltage to under 10 %.","p. 118"],
["Iterative network impedance","Impedance of the chain of towers and earth wires, usually a few ohms.","p. 118"],
["Permissible touch voltage","80 V at long duration to 735 V at 0.05 s in Table 5.1.","p. 120"],
["Reduction factor r<sub>E</sub>","Share of zero-sequence current returning through earth. Between 0.2 and 1.0.","p. 120, 121"],
["Long-duration fault limit","65 V touch voltage in isolated or resonant systems.","p. 122"],
["I<sub>RES</sub>","Residual earth fault current, 5 to 15 % of I<sub>C</sub>, at most 10 % if unknown.","p. 122"],
["Double earth fault current","May be taken as 85 % of three-phase initial short circuit current.","p. 121"],
["Earth potential rise","ΔU<sub>E</sub> = Z<sub>E</sub>·r<sub>E</sub>·3I₀.","p. 123"],
["Moisture","Red clay at 10 % moisture is over 30 times more resistive than at 20 %.","p. 126"],
["Wenner method","Four equally spaced rods; ρ<sub>E</sub> = 2π·a·R<sub>E</sub>.","p. 130–132"],
["Apparent resistivity","Average value from a measurement, depending on electrode geometry.","p. 130"],
["Fall of potential","Earthing resistance read on the flat part of the curve, a = 0.62·l.","p. 134"],
["Heavy-current injection","System frequency test with a remote electrode about 5 km off, over 50 A.","p. 133"],
["Two-layer model","Soil reduced to one layer of depth d₁ over an infinite layer.","p. 135"],
["Reflection coefficient k","(ρ₂ − ρ₁)/(ρ₁ + ρ₂). Positive when ρ grows with depth.","p. 135"],
["Mean resistivity factor M₀","ρ̄ = M₀·ρ₁, from Table 5.10.","p. 136"],
["Penetration factor F<sub>K</sub>","Correction for a rod that passes through the first layer.","p. 138"]],
fm:[
["Z<sub>E</sub> ≤ 130/I<sub>E</sub>","Long-duration earth faults; I<sub>E</sub> = r<sub>E</sub>·I<sub>F</sub>.","5.2, p. 122"],
["ΔU<sub>E</sub> = Z<sub>E</sub>·r<sub>E</sub>·3I₀","Earth potential rise.","5.3, p. 123"],
["Z<sub>E</sub> = 0.25(Z<sub>S</sub> + √(Z<sub>S</sub>(4R<sub>T</sub> + Z<sub>S</sub>)))","Impedance to earth.","5.4, p. 124"],
["U<sub>D</sub> = U<sub>TP</sub>(1 + R<sub>a</sub>/Z<sub>B</sub>)","Touch voltage with extra resistance.","5.5, p. 124"],
["A = (I/K<sub>E</sub>)·√t<sub>F</sub>/√ln[(T<sub>f</sub>+β)/(T<sub>i</sub>+β)]","Conductor cross section.","5.8, p. 125"],
["R<sub>E</sub> = ρ/(2πr)","Hemisphere radius r.","5.13, p. 127"],
["R<sub>E</sub> = ρ/(2πL)·ln(4L/d)","Single rod.","5.14, p. 127"],
["R<sub>E</sub> = ρ/(πL)·ln(2L/d)","Radial electrode.","5.19, p. 130"],
["R<sub>E</sub> = ρ/(π²D)·ln(2πD/d)","Ring electrode.","Table 5.8, p. 128"],
["r<sub>e</sub> = √(d/2·s), ∛(d/2·s²)","Equivalent radius of 2 and 3 rods.","5.16–5.17, p. 128"],
["ρ<sub>E</sub> = 2π·a·R<sub>E</sub>","Wenner.","5.30, p. 132"],
["k = (ρ₂ − ρ₁)/(ρ₁ + ρ₂)","Reflection coefficient.","p. 135"],
["ρ̄ = M₀·ρ₁","Mean resistivity.","5.41, p. 136"]],
wx:[
["Hemisphere in 1000 Ω·m soil","r = 1 m.",["R<sub>E</sub> = ρ/(2πr) = 1000/(2π·1) ≈ 160 Ω.","Half of this lies between r and 2r.","90 % lies out to 10r: within nine metres of the electrode surface."]],
["Earthing impedance limit","110 kV resonant earthed system, 130 A residual current.",["Eq. 5.2 with r<sub>E</sub> = 1.00, steel wire: Z<sub>E</sub> ≤ 130/(1.00·130) = 1.00 Ω.","With the book's ACSR earth wire, r<sub>E</sub> = 0.62.","Z<sub>E</sub> ≤ 130/(0.62·130) = 1.55 Ω."]],
["Tower in two-layer soil","Four radial strips, L = 32 m, d = 5 mm, depth 1 m. ρ₁ = 520, ρ₂ = 80 Ω·m.",["ρ₂/ρ₁ = 0.15, so M₀ = 0.757.","Mean ρ̄ = 520·0.757 = 393 Ω·m.","Read d₁ = 6.2 m from the curve.","R = 393/(8π·32)·(ln(128/0.005) + ln(64) + 2.91).","R = 8.41 Ω. Measured value 11.4 Ω."]],
["Wenner reading","a = 8 m, R = 6 Ω.",["ρ<sub>E</sub> = 2π·8·6.","ρ<sub>E</sub> ≈ 302 Ω·m apparent."]]],
bad:[
["Only checking step voltage","Check touch voltage. Meeting it also covers step voltage."],
["Using total fault current for touch voltage","Multiply by r<sub>E</sub> as earth wires carry part of it."],
["Assuming a thicker electrode solves it","Material and size hardly matter: resistivity and length do."],
["Driving rods close together","Keep spacing above rod length, or the fields overlap."],
["Reading ρ<sub>E</sub> from one spacing only","Use 2, 4, 8, 16, 32 m, since resistivity varies with depth."],
["Placing the potential probe near an electrode","Use the flat region around a = 0.62·l."],
["Accepting scattered measurements","More than 20 % off the mean means repeating at l = 80 m."],
["Using gravel around a counterpoise","High resistance. Keep stones and gravel off the conductor."]],
q:[
{t:"s",sec:"5.1",p:"p. 117",q:"Which earthing requirement has priority?",o:["Performance","Safety of persons, including animals","Cost","Corrosion"],a:[1],w:"The first requirement has priority and includes animals such as grazing cattle."},
{t:"m",sec:"5.1",p:"p. 117",q:"Which are the three types of earthing? Select all.",o:["Operational","Protection","Lightning protection","Decorative"],a:[0,1,2],w:"These are the three named purposes."},
{t:"s",sec:"5.2",p:"p. 118",q:"With potential control, touch and step voltages can fall to about what share of U<sub>E</sub>?",o:["Under 10 %","About 30 %","About 50 %","Over 75 %"],a:[0],w:"Without control they may reach 50 % and 30 %."},
{t:"n",sec:"5.3",p:"Table 5.1, p. 120",q:"For 0.5 s, body current 200 mA, body impedance 1360 Ω with 75 % used. Touch voltage in V?",a:204,tol:1,u:"V",w:"0.2·1360·0.75 = 204 V, as Table 5.1 lists."},
{t:"s",sec:"5.3",p:"p. 120",q:"Why can step voltage usually be ignored?",o:["People never walk near towers","Permissible step values are higher than touch values","It is always zero","It is included in lightning"],a:[1],w:"Meeting the touch limit excludes step hazards."},
{t:"s",sec:"5.3",p:"p. 120",q:"Maximum temperature for aluminium earthing conductors?",o:["100 °C","200 °C","300 °C","500 °C"],a:[1],w:"200 °C for aluminium, 300 °C for copper and steel."},
{t:"x",sec:"5.3",p:"p. 120",q:"Match each material to its minimum earthing conductor.",pairs:[["Copper","16 mm²"],["Aluminium","35 mm²"],["Steel","50 mm²"]],w:"From EN 50341-1."},
{t:"s",sec:"5.3",p:"Table 5.4, p. 121",q:"Which earth wire gives the lowest reduction factor?",o:["70 mm² steel","50 mm² steel","304/49 AL1/ST1A","44/32 AL1/ST1A"],a:[2],w:"0.61: high conductivity. Steel is near 1.00."},
{t:"n",sec:"5.4",p:"Eq. 5.2, p. 122",q:"I<sub>F</sub> = 100 A, r<sub>E</sub> = 0.65. Largest Z<sub>E</sub>, Ω?",a:2,tol:.01,u:"Ω",w:"130/(0.65·100) = 2.0 Ω."},
{t:"s",sec:"5.4",p:"p. 122",q:"Touch voltage limit in long-duration earth faults?",o:["25 V","65 V","130 V","250 V"],a:[1],w:"65 V."},
{t:"n",sec:"5.4",p:"Eq. 5.3, p. 123",q:"Z<sub>E</sub> = 1.5 Ω, r<sub>E</sub> = 0.6, 3I₀ = 10 kA. Earth potential rise, V?",a:9000,tol:5,u:"V",w:"1.5·0.6·10000 = 9000 V."},
{t:"n",sec:"5.4",p:"Eq. 5.5, p. 124",q:"U<sub>TP</sub> = 200 V, R<sub>a</sub> = 1750 Ω, Z<sub>B</sub> = 1400 Ω. U<sub>D</sub>, V?",a:450,tol:1,u:"V",w:"200·(1 + 1.25) = 450 V."},
{t:"t",sec:"5.4",p:"p. 124",q:"True or false: under the design flow, a rise below 2·U<sub>D</sub> is acceptable.",a:true,w:"True, at step 5, as touch is only a fraction of the rise."},
{t:"s",sec:"5.6",p:"Table 5.5, p. 125",q:"Up to what current do 95 % of cases fall in Central Europe?",o:["20 kA","30 kA","40 kA","60 kA"],a:[2],w:"40 kA."},
{t:"n",sec:"5.8",p:"p. 126",q:"Red clay at 20 % moisture is 50 Ω·m. At 10 % moisture, at least what, in Ω·m?",a:1500,tol:1,u:"Ω·m",w:"Over 30 times: 1500 Ω·m."},
{t:"s",sec:"5.9",p:"p. 127",q:"How much of a hemisphere's resistance lies out to X = 2r?",o:["10 %","50 %","90 %","All"],a:[1],w:"50 %, which is why nearby soil dominates."},
{t:"n",sec:"5.9",p:"Eq. 5.14, p. 127",q:"Rod L = 3 m, d = 19 mm, ρ = 100 Ω·m. R in Ω? Nearest whole number.",a:34,tol:.6,u:"Ω",w:"100/(2π·3)·ln(12/0.019) = 5.31·6.45 = 34 Ω."},
{t:"s",sec:"5.9",p:"p. 127",q:"Two rods in parallel reach about what share of one rod?",o:["33 %","40 %","60 %","100 %"],a:[2],w:"60 %: not 50 %, because of mutual influence."},
{t:"s",sec:"5.10",p:"p. 132",q:"Wider Wenner spacing tells you what?",o:["Surface moisture","Resistivity at greater depth","Rod corrosion","Lightning density"],a:[1],w:"Current flows through deeper strata."},
{t:"n",sec:"5.10",p:"Eq. 5.30, p. 132",q:"a = 16 m, R = 2 Ω. ρ<sub>E</sub> in Ω·m? Nearest whole number.",a:201,tol:1,u:"Ω·m",w:"2π·16·2 = 201 Ω·m."},
{t:"n",sec:"5.11",p:"p. 134",q:"l = 80 m. Best probe position a, m? One decimal.",a:49.6,tol:.1,u:"m",w:"0.62·80 = 49.6 m."},
{t:"s",sec:"5.11",p:"p. 133",q:"What is the minimum current normally used for heavy-current injection?",o:["1 A","5 A","Above 50 A","5000 A"],a:[2],w:"Above 50 A, so readings exceed interference."},
{t:"n",sec:"5.12",p:"p. 135",q:"ρ₁ = 100, ρ₂ = 300 Ω·m. Find k. Two decimals.",a:.5,tol:.005,u:"",w:"(300 − 100)/400 = 0.5."},
{t:"s",sec:"5.13",p:"p. 140",q:"How deep are counterpoises usually laid?",o:["0.1 m","0.5 to 1.0 m","3 m","10 m"],a:[1],w:"0.5 to 1.0 m, frost-proof."}
]});
