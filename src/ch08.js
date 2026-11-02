OHL.add({n:8,lead:"Why earth wires are there, how short-circuit heating sizes them, how they sag, and how they became fibre optic links. Printed pages 243 to 255.",
init:function(K){var $=K.$,fmt=K.fmt;
function rng(a,b,n){var o=[];for(var i=0;i<=n;i++)o.push(a+(b-a)*i/n);return o}
K.stepper("fnStep",[["Shield against lightning","Main purpose, working with good tower earthing against back-flashovers."],["Return path","Carries phase-to-ground fault current."],["Reduce interference","Lowers influence on parallel lines."],["Help substations","Current in the first spans lightens the earthing mat, saving size and cost."],["Carry power or data","Small amounts of low voltage energy, or optical fibres."]]);
var W=[["49-ST1A",49.5,481,.192,.00778,.0045,200],["66-ST1A",65.8,481,.192,.00778,.0045,200],["93-ST1A",93.3,481,.192,.00778,.0045,200],["117-ST1A",117,481,.192,.00778,.0045,200],["49-A20SA",49.5,518,.0848,.0066,.0036,200],["93-A20SA",93.3,518,.0848,.0066,.0036,200],["117-A20SA",117,518,.0848,.0066,.0036,200],["44-AL1/32-ST1A",75.7,605,.045,.00488,.00403,160],["97-AL1/56-ST1A",152.8,623,.0457,.00463,.00403,160],["122-AL1/71-ST1A",193.8,623,.0457,.00463,.00403,160],["264-AL1/34-ST1A",297.8,772,.0326,.00328,.00403,160]];
function I(r,t,T1,T2){return Math.sqrt(r[4]*r[2]/(r[3]*r[5])*Math.log((1+r[5]*(T2-20))/(1+r[5]*(T1-20)))*r[1]*r[1]/t)/1000}
K.calc("scCalc",{f:[{k:"i",l:"Earth wire",o:W.map(function(r,i){return[i,r[0]]}),v:8},{k:"t",l:"Duration",min:.1,max:2,step:.05,v:.5,u:"s"},{k:"T1",l:"Initial temperature",min:10,max:80,step:5,v:40,u:"°C"},{k:"T2",l:"Final temperature",min:120,max:400,step:10,v:160,u:"°C"}],run:function(v,c){var r=W[v.i],S=rng(.05,2,40),Y=I(r,.05,v.T1,v.T2);
 K.plot(c,{h:230,x:{min:.05,max:2,log:true,label:"Short-circuit duration, s (log scale)",ticks:[.05,.1,.2,.5,1,2]},y:{min:0,max:Y*1.05,label:"Current, kA"},series:[{p:S.map(function(t){return[t,I(r,t,v.T1,v.T2)]}),c:"accent"}],marks:[{x:v.t,y:I(r,v.t,v.T1,v.T2),t:fmt(I(r,v.t,v.T1,v.T2),1)+" kA"}],aria:"Permissible current against duration"});
 var m=(Math.exp(4*50*v.t*Math.log(.8))-1)/(2*50*v.t*Math.log(.8));return'<span class="big">I<sub>th</sub> = '+fmt(I(r,v.t,v.T1,v.T2),1)+' kA</span><span>m = '+fmt(m,3)+', I\"<sub>k</sub> = '+fmt(I(r,v.t,v.T1,v.T2)/Math.sqrt(m+1),1)+' kA</span><span>Table limit for this type: '+r[6]+' °C</span>'}});
K.calc("ftCalc",{f:[{k:"i",l:"Earth wire",o:W.map(function(r,i){return[i,r[0]]}),v:3},{k:"I",l:"Current",min:1,max:40,step:.5,v:7,u:"kA"},{k:"t",l:"Duration",min:.1,max:2,step:.05,v:.5,u:"s"},{k:"T",l:"Initial temperature",min:10,max:80,step:5,v:40,u:"°C"}],run:function(v,c){var r=W[v.i];function T2(i){var a=r[5];return 20+((1+a*(v.T-20))*Math.exp(i*i*1e6*r[3]*a*v.t/(r[1]*r[1]*r[4]*r[2]))-1)/a}
 var X=rng(.5,40,50),v2=T2(v.I);K.plot(c,{h:230,x:{min:0,max:40,label:"Short-circuit current, kA"},y:{min:0,max:500,label:"Final temperature, °C"},series:[{p:X.map(function(i){return[i,T2(i)]}),c:"accent"}],hlines:[{y:r[6],t:r[6]+" °C limit"}],marks:v2<=500?[{x:v.I,y:v2,t:fmt(v2)+" °C"}]:[],aria:"Final temperature against current"});
 return'<span class="big '+(v2<=r[6]?"good":"bad")+'">'+fmt(v2)+' °C</span>'}});
K.bars("limBars",{lw:220,minw:480,u:"°C",rows:[["ACSR, EN 60865-1",160,"accent"],["OPGW, makers' top value",220,"v2"],["Steel, EN 60865-1",200,"accent"],["ACSR, EN 50341-3-4",200,"v1"],["Steel, some utilities",300,"v3"],["Zinc starts to melt",420,"v4"]],aria:"Temperature limits"});
K.stepper("recStep",[["First zone","About 0.1 s including relay and breaker."],["Back-up protection","0.4 to 0.5 s if a relay or breaker fails."],["First automatic reclose","Usually successful, so the fault stays below 0.1 s."],["Reclose onto a fault","Line trips again: total fault current time 0.2 to 0.3 s."],["Manual reclosing","About 60 and 300 s after the failure, in some schemes."]]);
K.bars("sagBars",{lw:220,minw:480,u:"m",max:8,rows:[["200 °C, instantaneous",2.7,"accent"],["300 °C, instantaneous",4.5,"v1"],["300 °C, permanent",1,"v3"],["400 °C, instantaneous",7.5,"v4"],["400 °C, permanent",2.2,"v5"]],aria:"Sag increase"});
K.checks("stepChk","s8",["Find short-circuit currents for at least 10 years ahead","Find current sharing between earth wire and earth, moving the fault along the line","Choose one or two sizes, and position for shielding; a strain tower is the best place to change size","Set everyday stress to coordinate sag with the conductors","Decide vibration protection"]);
K.stepper("optStep",[["OPGW","Stranded metallic conductor containing fibres, in new lines or replacing an earth wire. Over 100 fibres available."],["ADSS","All-dielectric self-supporting cable with aramid strength member, independent of the power line. More prone to vibration, with large ice sag and a risk of touching phases, so utilities seldom use it."],["Attached cable","All-dielectric cable fastened to an earth wire or phase. Cheap in strength, but unprotected from lightning, with repair needing joints."]]);
var O=[["97-AL1/48-A20SA",82,16,16,615,112],["167-AL3/43-A20SA",103,19.2,36,788,425],["68-A20SA",81,12.1,36,505,38]];
K.calc("opCalc",{f:[{k:"i",l:"OPGW",o:O.map(function(r,i){return[i,r[0]]}),v:0},{k:"t",l:"Duration",min:.1,max:2,step:.05,v:.5,u:"s"}],run:function(v){var r=O[v.i];return'<span>'+r[1]+' kN, '+r[2]+' mm, '+r[3]+' fibres, '+r[4]+' kg/km</span><span class="big">I = '+fmt(Math.sqrt(r[5]/v.t),1)+' kA</span><span class="small">From I²·t = '+r[5]+' kA²·s</span>'}});
},
cards:[
["Main purpose of earth wire","Shielding conductors from direct lightning.","p. 243"],
["Earth wire losses","Small induced currents, negligible in steady state.","p. 243"],
["Sizing case","Phase-to-earth short circuit.","p. 243"],
["Adiabatic heating","Heat stored, none lost, because the fault is so short.","p. 244"],
["Thermally equivalent current I<sub>th</sub>","I\"<sub>k</sub>·√(m + n).","p. 246"],
["Factor m","Heating by the DC component, 0.0448 at 1 s.","p. 246"],
["Factor n","AC component, usually 1.","p. 246"],
["Assumption B","Aluminium and steel both conduct and store heat.","p. 244"],
["Equivalent duration","0.5 to 1.0 s up to 300 kV, 0.2 to 0.6 s above.","p. 247"],
["Sag coordination","90 to 95 % of conductor sag at mean temperature.","p. 251"],
["Mixed earth wire","Conductive wire near substations, steel beyond.","p. 243"],
["OPGW","Optical ground wire: stranded conductor with fibres.","p. 252"],
["ADSS","All-dielectric self-supporting cable.","p. 253"],
["Attached cable","Dielectric fibre cable fastened to earth wire or phase.","p. 253"],
["Thixotropic gel","Filling that decouples fibres in the tube.","p. 252"],
["I²·t rating","How OPGW makers state short-circuit capacity.","p. 249"],
["Zinc limit","Coating starts to melt above 420 °C.","p. 250"],
["Strength scaling","From 200 to 300 °C multiply steel rating by 1.20, to 400 °C by 1.33.","p. 248"]],
fm:[
["T₂ = 20 + {[1 + α(T₁−20)]·exp[I²ρα·t<sub>K</sub>/(A₁A₂γc)] − 1}/α","Final temperature.","8.5, p. 245"],
["I<sub>th</sub> = √[(γc/ρα)·ln(...)·A₁A₂/t<sub>K</sub>]","Permissible current.","8.6, p. 245"],
["I<sub>th</sub> = I\"<sub>k</sub>·√(m + n)","Equivalent current.","8.7, p. 246"],
["m = {exp[4f·t·ln(κ−1)] − 1}/[2f·t·ln(κ−1)]","DC heating, κ = 1.8.","8.8, p. 246"],
["I ∝ 1/√t","Duration scaling, from 8.6.","p. 244"],
["S<sub>EW</sub> = 0.90 to 0.95·S<sub>cond</sub>","Sag coordination.","p. 251"]],
wx:[
["Aluminium only, assumption A","264-AL1/34-ST1A, 1 s, 40 to 160 °C. A = 263.7 mm², c = 897, γ = 0.002703, ρ = 0.0283, α = 0.00403.",["γc/(ρα) = 2.425/1.14·10⁻⁴ = 21 260.","ln[(1 + 0.00403·140)/(1 + 0.00403·20)] = 0.370.","A² = 69 540 mm⁴.","I<sub>th</sub> = √(21 260·0.370·69 540/1) = 23.4 kA."]],
["DC factor","f = 50 Hz, t = 1 s, κ = 1.8.",["ln(0.8) = −0.223.","exp(4·50·1·(−0.223)) ≈ 0.","m = (0 − 1)/(100·(−0.223)) = 0.0448.","I\"<sub>k</sub> = I<sub>th</sub>/√1.0448, a 2 % difference, so it can be ignored."]],
["Rescale a rating","97-AL1/56-ST1A: 15.6 kA for 0.5 s at 160 °C. Want 200 °C at 0.2 s.",["Temperature: × 1.12 = 17.5 kA.","Duration: × √(0.5/0.2) = 1.58.","Result: about 27.6 kA."]]],
bad:[
["Sizing an earth wire by normal current","Only tiny currents flow. Short circuit governs."],
["Allowing for cooling between reclosures","Gaps are too short. Use an equivalent duration."],
["Forgetting future fault levels","Look at least 10 years ahead."],
["Using one size for the entire line","High current is near substations. Change size at a strain tower."],
["Letting earth wire sag equal conductor sag","Use 90 to 95 %, so midspan separation holds."],
["Treating 400 °C as acceptable for steel","Only in exceptional cases. Keep to 300 °C at the most."],
["Replacing strands with fibre tubes without checks","More than one needs a strength check."]],
q:[
{t:"s",sec:"8.1",p:"p. 243",q:"What is the main purpose of an earth wire?",o:["Carry load","Shield against direct lightning","Reduce sag","Support towers"],a:[1],w:"Protection from direct strokes."},
{t:"m",sec:"8.1",p:"p. 243",q:"Which are further earth wire functions? Select all.",o:["Return path for fault current","Lower interference on parallel lines","Reduce substation earthing mat","Raise voltage"],a:[0,1,2],w:"All except raising voltage."},
{t:"s",sec:"8.1",p:"p. 243",q:"What does a mixed earth wire arrangement use near substations?",o:["Steel","High conductivity wire","No wire","Fibre only"],a:[1],w:"High conductivity for 5 to 10 km, then steel."},
{t:"s",sec:"8.2",p:"p. 243",q:"What determines earth wire selection electrically?",o:["Load current","Phase-to-earth short-circuit current","Corona","Capacitance"],a:[1],w:"Normal currents are too low to matter."},
{t:"t",sec:"8.2",p:"p. 244",q:"True or false: short-circuit heating is treated as adiabatic.",a:true,w:"No heat exchange occurs in so short a time."},
{t:"n",sec:"8.2",p:"Eq. 8.6, p. 245",q:"A wire carries 20 kA for 0.2 s to its limit. What for 0.8 s, kA?",a:10,tol:.05,u:"kA",w:"I falls with √t: 20·√(0.2/0.8) = 10 kA."},
{t:"n",sec:"8.2",p:"Eq. 8.7, p. 246",q:"I\"<sub>k</sub> = 24 kA, m = 0.0448, n = 1. I<sub>th</sub>, kA? One decimal.",a:24.5,tol:.1,u:"kA",w:"24·√1.0448 = 24.5 kA."},
{t:"s",sec:"8.2",p:"p. 244",q:"Assumption C does what?",o:["Ignores steel conductivity, counts steel mass","Ignores everything of steel","Counts everything of steel","Doubles aluminium"],a:[0],w:"A₁ is aluminium, A₂ the total."},
{t:"n",sec:"8.2",p:"Table 8.2, p. 248",q:"93-ST1A carries 6.2 kA at 0.5 s and 200 °C. At 300 °C, kA? One decimal.",a:7.4,tol:.1,u:"kA",w:"× 1.20 = 7.4 kA."},
{t:"n",sec:"8.2",p:"p. 249",q:"97-AL1/56-ST1A: 15.6 kA at 160 °C. At 300 °C, kA? One decimal.",a:21.1,tol:.2,u:"kA",w:"× 1.35 = 21.1 kA."},
{t:"s",sec:"8.2",p:"p. 247",q:"What duration suits lines up to 300 kV?",o:["0.05 s","0.2 to 0.3 s","0.5 to 1.0 s","5 s"],a:[2],w:"0.2 to 0.6 s above 300 kV."},
{t:"s",sec:"8.2",p:"p. 247",q:"Why ignore cooling between reclosures?",o:["Intervals are too short","It is impossible to calculate","The wire is insulated","Sun heats it"],a:[0],w:"60 to 300 s does not cool much."},
{t:"s",sec:"8.3",p:"p. 250",q:"Above what temperature does zinc start to melt?",o:["200 °C","300 °C","420 °C","650 °C"],a:[2],w:"Above 420 °C."},
{t:"n",sec:"8.3",p:"p. 251",q:"A 400 m steel wire at 300 °C: total instantaneous and later permanent sag rise as listed. Permanent sag rise, m?",a:1,tol:.05,u:"m",w:"1.0 m permanent, with 4.5 m instantaneous."},
{t:"n",sec:"8.3",p:"p. 251",q:"Conductor sag 12 m at mean temperature. Earth wire at 95 %, m?",a:11.4,tol:.05,u:"m",w:"0.95·12 = 11.4 m."},
{t:"s",sec:"8.4",p:"p. 251",q:"Where is the best place to change earth wire size?",o:["Midspan","A strain tower","A suspension tower","A substation fence"],a:[1],w:"A strain tower."},
{t:"s",sec:"8.5",p:"p. 252",q:"Why suit optical fibres to power lines?",o:["Immune to electromagnetic interference","Conduct current","Add strength","Stop lightning"],a:[0],w:"That immunity is the main advantage."},
{t:"x",sec:"8.5",p:"p. 252–253",q:"Match the aerial cable to its feature.",pairs:[["OPGW","Metallic stranded conductor with fibres"],["ADSS","Self-supporting dielectric cable"],["Attached cable","Relies on another wire for support"]],w:"The three types."},
{t:"n",sec:"8.5",p:"Table 8.3, p. 249",q:"I²·t = 112 kA²·s. For 0.5 s, kA? One decimal.",a:15,tol:.1,u:"kA",w:"√(112/0.5) = 15.0 kA."},
{t:"s",sec:"8.5",p:"p. 255",q:"At which wavelength is attenuation checked?",o:["850 nm","1300 nm","1550 nm","10 μm"],a:[2],w:"1550 nm."}
]});
