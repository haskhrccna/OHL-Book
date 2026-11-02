OHL.add({n:17,lead:"Handing over a finished line, running it, managing it as an asset, maintaining it, and raising its capacity later. Printed pages 677 to 731.",
init:function(K){var $=K.$,fmt=K.fmt;
K.stepper("supStep",[["Public","Announce through municipalities, and speak directly to farmers and owners."],["Conditions","Check approval conditions on schedule. The owner is liable."],["Route","Partial inspection after right-of-way clearing."],["Access roads","Record condition first, to avoid arguments later."],["Foundations","Recheck pegging before digging. No residual concrete nearby."],["Towers","Check completeness before erection, search for lost bolts after."],["Stringing","Check scaffolds, ground contact and clearances. Sag and clearance tables."],["Clean-up","Random checks of earthing, jumpers, dampers. Remove all residue, record crop damage."]]);
K.checks($("finalChk"),"final",["Right-of-way cleared, risk trees removed","Access roads and drainage in order","Terrain and foundations: embankments, rain channels, legs protected","Earthing: depth, connections, records, fences","Structures: verticality, members, bolts, numbering, warning plates","Insulators: count, position, locking devices, condition","Hardware: spacers, dampers, armour rods, arcing horns, corona rings","Conductors: clearances, strands, jumpers, aerial warning spheres"]);
K.calc("resCalc",{f:[{k:"v1",l:"V<sub>AB</sub>",min:10,max:30,step:.1,v:23.7,u:"V"},{k:"i1",l:"I<sub>AB</sub>",min:1,max:5,step:.01,v:2.8,u:"A"},{k:"v2",l:"V<sub>BC</sub>",min:10,max:30,step:.1,v:23.4,u:"V"},{k:"i2",l:"I<sub>BC</sub>",min:1,max:5,step:.01,v:2.79,u:"A"},{k:"v3",l:"V<sub>AC</sub>",min:10,max:30,step:.1,v:23.5,u:"V"},{k:"i3",l:"I<sub>AC</sub>",min:1,max:5,step:.01,v:2.75,u:"A"},{k:"L",l:"Line length",min:10,max:300,step:.1,v:73.2,u:"km"},{k:"T",l:"Mean temperature",min:0,max:50,step:.1,v:32.9,u:"°C"},{k:"n",l:"Nominal",min:.02,max:.2,step:.0005,v:.0545,u:"Ω/km"}],run:function(v,c){var ab=v.v1/v.i1,bc=v.v2/v.i2,ac=v.v3/v.i3,R=[(ab+ac-bc)/2,(ab+bc-ac)/2,(ac+bc-ab)/2],l=1.02*v.L,f=1+.00403*(v.T-20),U=R.map(function(r){return r/l/f}),hi=v.n*1.05,lo=v.n*.95,ok=U.every(function(u){return u<=hi&&u>=lo});K.bars(c,{lw:80,minw:320,u:" Ω/km",max:v.n*1.3,rows:[["Phase A",+U[0].toFixed(4),"accent"],["Phase B",+U[1].toFixed(4),"accent"],["Phase C",+U[2].toFixed(4),"accent"],["Nominal",v.n,"rule"]],aria:"Resistance at 20 °C by phase"});return'<span>R = '+R.map(function(r){return fmt(r,3)}).join(", ")+' Ω</span><span class="big '+(ok?"good":"bad")+'">'+(ok?"All within 5 %":"Outside 5 %")+'</span>'}});
K.stepper("testStep",[["Earthing","Measured before earth wire stringing, or by a high-frequency device with wires connected."],["Energization","Finds flaws and forgotten earths, measures Ferranti rise and switching overvoltage, shows corona. Needs a closing scheme, and reactors on."],["Fields","Across the right-of-way, ideally during energization, with voltages and currents controlled."],["Aeolian","After energization, several weeks, sensors 89 mm from the clamp, in sites of laminar wind at 2 to 10 m/s."],["Subspan","Spans with winds above 10 m/s, sensors horizontal."]]);
K.bars("rtBars",{lw:190,minw:400,u:" %",max:40,rows:[["Average, real-time",15,"accent"],["Maximum, real-time",35,"accent"],["Short-term, weather stations",30,"v3"],["Norway, air-temperature based",10,"v3"]],aria:"Reported ampacity gains"});
K.calc("grcCalc",{f:[{k:"d",l:"Line to wind angle",min:0,max:90,step:1,v:90,u:"°"},{k:"I",l:"Gust intensity",min:0,max:1,step:.01,v:.3,u:""},{k:"V",l:"Wind velocity",min:0,max:30,step:.5,v:15,u:"m/s"},{k:"T",l:"Air temperature",min:-8,max:8,step:.1,v:.5,u:"°C"},{k:"Dp",l:"Air minus dew point",min:0,max:6,step:.1,v:.5,u:"K"}],run:function(v,c){var n=(1+Math.sin(v.d*Math.PI/180))*(1+.5*v.I)*v.V,g=function(T){return n/(1+v.Dp/2+T*T)},G=g(v.T),P=[];for(var t=-8;t<=8.01;t+=.25)P.push([t,g(t)]);var m=Math.max(45,n/(1+v.Dp/2)*1.05);K.plot(c,{h:220,x:{min:-8,max:8,label:"Air temperature, °C"},y:{min:0,max:m,label:"GRC"},series:[{p:P,c:"accent"},{p:[[-8,40],[8,40]],c:"v4",dash:true,t:"Threshold 40"}],marks:[{x:v.T,y:G,t:fmt(G,1)}],aria:"Galloping readiness against air temperature"});return'<span class="big '+(G>=40?"bad":"good")+'">GRC = '+fmt(G,1)+'</span><span>'+(G>=40?"Warning for 10 hours":"Below threshold")+'</span>'}});
K.calc("probCalc",{f:[{k:"T",l:"Return period",min:5,max:500,step:1,v:50,u:"years"},{k:"n",l:"Service period",min:1,max:80,step:1,v:5,u:"years"}],run:function(v,c){var p=1/v.T,f=function(n){return (1-Math.pow(1-p,n))*100},P=[];for(var i=0;i<=80;i++)P.push([i,f(i)]);K.plot(c,{h:210,x:{min:0,max:80,label:"Years"},y:{min:0,max:100,label:"Failure chance, %"},series:[{p:P,c:"accent"}],marks:[{x:v.n,y:f(v.n),t:fmt(f(v.n),1)+" %"}],aria:"Failure probability over time"});return'<span>P<sub>s</sub> = '+fmt(1-p,4)+'</span><span class="big">Chance in '+v.n+' years: '+fmt(f(v.n),1)+' %</span>'}});
K.stepper("defStep",[["Maintenance","Routine care and small repairs across working life."],["Refurbishment","Extensive repair, restores the design working life."],["Life extension","Extensive repair, without restoring that life."],["Upgrading","More mechanical strength. Failure probability falls."],["Uprating","More electric capacity. Consequences of failure can rise."],["Restoration","Repair of something that already failed."]]);
K.stepper("loopStep",[["A Failure","Cannot be fully excluded."],["C Causes","Events, some outside management's control."],["D Data","Find the cause. No data, no improvement."],["F Data base","Line, components, critical elements."],["G Inspect","Patrol, update degradation."],["H Assess","Present capability, remaining life, risk per option."],["E Decide","Reduce, accept or increase risk. Review specifications."]]);
K.calc("binCalc",{f:[{k:"n",l:"Elements",min:1,max:200,step:1,v:50,u:""},{k:"x",l:"Failing",min:0,max:5,step:1,v:1,u:""},{k:"p",l:"Failure chance each",min:.0001,max:.01,step:.0001,v:.0001,u:"per year"},{k:"C",l:"Loss per failure",min:100,max:1e7,step:100,v:9600000,u:"EUR"}],run:function(v,c){var f=function(x){var r=1;for(var i=0;i<x;i++)r*=(v.n-i)/(i+1);return r*Math.pow(v.p,x)*Math.pow(1-v.p,v.n-x)},P=f(v.x),A=v.n*v.p*v.C;return'<span class="big">P = '+P.toExponential(5)+'</span><span>Risk from any number of failures '+fmt(A)+' EUR/year</span>'}});
K.bars("riskBars",{lw:190,minw:420,u:" EUR",max:130000,rows:[["Crossing, insulators",119940,"v4"],["Energy losses",90089,"rule"],["System, towers",48000,"accent"],["Crossing, towers",19999,"v4"],["Management",10000,"rule"],["System, insulators",6720,"accent"],["Repair",150,"accent"]],aria:"Annual costs and risks"});
var OP=[["Do nothing",0,294898,"rule"],["Double crossing insulators",6000,174982,"v1"],["Better insulators",117600,193530,"v3"],["Emergency towers",20000,256498,"v2"],["Second line",1000000,205284,"v4"],["Combined",26000,136582,"accent"]];
K.calc("npvCalc",{f:[{k:"r",l:"Discount rate",min:1,max:12,step:.5,v:5,u:"%"},{k:"n",l:"Years",min:1,max:30,step:1,v:20,u:""}],run:function(v,c){var r=v.r/100,f=function(n){return r?(1-Math.pow(1+r,-n))/r:n},N=function(o,n){return o[1]+o[2]*f(n)},mx=N(OP[4],30);OP.forEach(function(o){mx=Math.max(mx,N(o,30))});var S=OP.map(function(o){var P=[];for(var i=0;i<=30;i++)P.push([i,N(o,i)/1e6]);return{p:P,c:o[3],t:o[0],dash:o[0]==="Emergency towers"}});K.plot(c,{h:270,x:{min:0,max:30,label:"Years"},y:{min:0,max:mx/1e6*1.02,label:"NPV, million EUR"},series:S,aria:"Net present value of options"});var B=OP.slice().sort(function(a,b){return N(a,v.n)-N(b,v.n)});return'<span class="big">Best: '+B[0][0]+', '+fmt(N(B[0],v.n))+' EUR</span><span>Do nothing: '+fmt(N(OP[0],v.n))+' EUR</span><span>Second line: '+fmt(N(OP[4],v.n))+' EUR</span>'}});
var TOOL={0:["Infra-red, climbing, or joint resistance","Loose or bad joints heat up. Needs 50 to 60 % of full load."],1:["Eddy current or steel core detector","Finds lost galvanizing or lost steel section. Visual inspection misses early stages."],2:["Corona or net spy from a helicopter","Field distortion, up to 50 km/h, rated voltage needed but no load."],3:["Voltage drop or spark-gap tester","Compare unit to unit. Never in wet weather."],4:["Field measurement plus infra-red","Use two or more methods."],5:["Visual, or level 1 to 4 foundation inspection","Corrosion is often patchy, so spot checks mislead."],6:["Jacks, deflection test, or magnetic flux","Tension and broken strands in stays."]};
K.calc("toolCalc",{f:[{k:"d",l:"Suspected problem",o:[[0,"Hot joint or connector"],[1,"Internal conductor corrosion"],[2,"Loose spacer, damaged part"],[3,"Cracked cap-and-pin insulator"],[4,"Aged composite insulator"],[5,"Steel or foundation corrosion"],[6,"Guy wire"]],v:0}],run:function(v){var t=TOOL[v.d];return'<span class="big">'+t[0]+'</span><span>'+t[1]+'</span>'}});
K.stepper("fndStep",[["Level 1","Visual, all foundations. Type, land use, cover, concrete, steel."],["Level 2","Types, deterioration, geotechnical data. Finds those to refurbish."],["Level 3","Data for strength and deterioration, to plan refurbishment."],["Level 4","Full-scale load tests."]]);
var IV=[[500,25,15],[380,20,13],[345,17,11],[230,14,7],[138,9,5],[110,8,4],[69,5,2]];
K.calc("insCalc",{f:[{k:"i",l:"Voltage",o:[[0,"500 kV"],[1,"380 kV"],[2,"345 kV"],[3,"230 kV"],[4,"138 kV"],[5,"110 kV"],[6,"69 kV"]],v:1},{k:"b",l:"Damaged units found",min:0,max:14,step:1,v:3,u:""}],run:function(v){var a=IV[v.i],ok=a[1]-v.b>=a[2];return'<span>About '+a[1]+' in the string, '+a[2]+' sound needed</span><span class="big '+(ok?"good":"bad")+'">'+(a[1]-v.b)+' sound, '+(ok?"live work allowed":"do not work live")+'</span>'}});
K.plot("lvChart",{h:220,x:{min:0,max:800,label:"Voltage, kV"},y:{min:0,max:5,label:"Clearance, m"},series:[{p:[[36,.7],[72.5,.92],[145,1.1],[245,1.55],[362,2.2],[525,3.6],[765,4.6]],c:"accent"}],marks:[{x:145,y:1.1,t:"1.10"},{x:525,y:3.6,t:"3.60"}],aria:"Live-line clearance against voltage"});
K.stepper("liveStep",[["Barehand","Lineman at phase potential, insulated from all else. Highest voltages."],["Hot-stick","Fibreglass sticks at a distance. Intermediate voltages."],["Insulated glove","Gloves, sleeves and covers. Below 60 kV."],["De-energized","Parts may be at potential before earthing or after removal, and energization can be accidental."]]);
K.bars("failBars",{lw:170,minw:400,u:"",max:1000,rows:[["Wind, HV",606,"accent"],["Wind, EHV",240,"v3"],["Ice, HV",205,"accent"],["Ice, EHV",469,"v3"],["Wind + ice, HV",122,"accent"],["Wind + ice, EHV",21,"v3"],["Soil sliding",22,"rule"],["Others",43,"rule"]],aria:"Towers failed by cause"});
K.calc("availCalc",{f:[{k:"L",l:"Length",min:50,max:800,step:10,v:350,u:"km"},{k:"T",l:"Return period",min:50,max:500,step:10,v:150,u:"years"},{k:"d",l:"Failure duration",min:1,max:30,step:1,v:7,u:"days"},{k:"o",l:"Lightning outages",min:.1,max:5,step:.1,v:1,u:"/100 km·a"},{k:"s",l:"Unsuccessful reclosing",min:0,max:100,step:1,v:35,u:"%"},{k:"r",l:"Repair time",min:1,max:6,step:.5,v:2,u:"h"},{k:"e",l:"Power-frequency events",min:0,max:2,step:.1,v:.3,u:"per year"},{k:"h",l:"Hours each",min:1,max:24,step:1,v:8,u:"h"},{k:"n",l:"Scheduled outages",min:0,max:10,step:1,v:3,u:"per year"},{k:"m",l:"Hours each",min:1,max:24,step:1,v:8,u:"h"}],run:function(v,c){var Tr=v.L>100?Math.round(v.T*100/v.L):v.T,m1=1/(Tr*2)*24*v.d,m2=.3*m1,e1=v.s/100*(v.o*v.L/100)*v.r,e2=v.e*v.h,F=m1+m2+e1+e2,Sc=v.n*v.m,FEU=F/8760*100,SEU=Sc/8760*100;K.bars(c,{lw:150,minw:340,u:" h/a",max:Math.max(Sc,F,5),rows:[["Mechanical",+(m1+m2).toFixed(2),"accent"],["Electrical",+(e1+e2).toFixed(2),"v3"],["Scheduled",+Sc.toFixed(1),"rule"]],aria:"Unavailable hours per year"});return'<span>FEU = '+fmt(FEU,3)+' %, SEU = '+fmt(SEU,2)+' %</span><span class="big">EA = '+fmt(100-FEU-SEU,2)+' %</span>'}});
K.stepper("upStep",[["Refurbishment","Renew worn components. No gain in strength or capacity."],["Upgrading","Raise reliability, aiming for risk about ten times lower."],["Uprating","More power: hotter conductor, new conductor, higher voltage, or compaction."],["OPGW","Replacing earth wire with fibre, now common."]]);
K.bars("capBars",{lw:120,minw:340,u:" MVA",max:4000,rows:[["Before",2080,"rule"],["After",3700,"accent"]],aria:"Capacity before and after conversion"});
K.bars("rpBars",{lw:190,minw:420,u:" years",max:320,rows:[["Weser, original wind",35,"rule"],["Weser, upgraded wind",300,"accent"],["Ice line, original",20,"rule"],["Ice line, upgraded",200,"accent"]],aria:"Return periods before and after upgrading"});
},
cards:[
["Commissioning stages","Approval and design, construction, final inspection.","p. 677–678"],
["Owner liability","The owner answers for breaches of approval conditions.","p. 679"],
["Acceptance record","Lists shortcomings, actions and dates.","p. 681"],
["Resistance test","DC, phase pairs, shorted at one end.","p. 683"],
["Reference at 20 °C","R₂₀ = R<sub>T</sub>/(1 + α(T − 20)), α = 0.00403/K.","p. 684"],
["Energization test","Checks flaws, Ferranti rise, overvoltage and corona.","p. 684"],
["Thermal rating","Current that holds the design temperature.","p. 686"],
["Real-time gain","Average 15 %, up to 35 %.","p. 687"],
["Tension monitoring","Load cell averages a whole section.","p. 688"],
["GRC","Galloping readiness coefficient, threshold 40.","p. 691"],
["Risk","Annual failure probability × cost of consequences.","p. 694"],
["Upgrading","More mechanical strength, less failure probability.","p. 694"],
["Uprating","More electric capacity, may raise consequences.","p. 694"],
["Refurbishment","Restores design working life.","p. 694"],
["Predictable event","Can be reduced economically with proactive measures.","p. 693"],
["NPV","Discounted planned cost plus risk.","p. 695"],
["Survival over n years","P<sub>s</sub>ⁿ, if annual chance is constant.","p. 696"],
["Binomial failures","Chance of x failures among n.","p. 701"],
["Inspection levels","Foundations: 1 visual to 4 full-scale.","p. 707"],
["Thermography","Needs at least 50 to 60 % of load.","p. 710"],
["Critical joint","Resistance two to three times the conductor's.","p. 712"],
["10 % rule","Over 10 % steel loss: replace.","p. 714"],
["Repair priority","U, A, B, C.","p. 715"],
["Investigation rule","Avoid judging before the facts are in.","p. 720"],
["Weakest link","Suspension tower first.","p. 722"],
["FEU and SEU","Forced and scheduled unavailability.","p. 723–724"],
["Line length effect","Above 100 km, return period × 100/L.","p. 726"]],
fm:[
["R<sub>A</sub> = (R<sub>AB</sub> + R<sub>AC</sub> − R<sub>BC</sub>)/2","Phase resistance.","17.4, p. 683"],
["T<sub>mean</sub> = (T<sub>S</sub> + T<sub>M</sub> + T<sub>E</sub>)/3","Average temperature.","17.7, p. 683"],
["R₂₀ = R<sub>T</sub>/(1 + α(T<sub>mean</sub> − 20))","Reference resistance.","17.8, p. 684"],
["GRC = (1 + sin δ)(1 + 0.5 I<sub>w</sub>)V<sub>w</sub>/(1 + (T<sub>air</sub> − T<sub>D</sub>)/2 + T<sub>air</sub>²)","Galloping readiness.","17.9, p. 691"],
["NPV = ΣC<sub>i</sub>/(1 + r)<sup>i</sup>","Net present value.","17.10, p. 695"],
["E<sub>pi</sub> = POF·E<sub>f</sub>","Risk of failure.","17.12, p. 696"],
["P<sub>fn</sub> = 1 − P<sub>s</sub>ⁿ","Failure in n years.","17.15, p. 696"],
["P<sub>x,n</sub> = (1−p)<sup>n−x</sup>·pˣ·n!/[x!(n−x)!]","Binomial.","17.16, p. 700"],
["P<sub>f</sub> = 1/(2T<sub>R</sub>)","Annual tower failure.","17.17, p. 725"],
["EA = 100 − (FEU + SEU)","Energy availability.","p. 726"]],
wx:[
["Resistance","220 kV, 73.2 km, pairs 23.7/2.8, 23.4/2.79, 23.5/2.75 V/A, 32.9 °C.",["R<sub>AB</sub> = 8.464, R<sub>BC</sub> = 8.387, R<sub>AC</sub> = 8.545 Ω.","R<sub>A</sub> = (8.464 + 8.545 − 8.387)/2 = 4.311 Ω.","Conductor length 1.02·73.2 = 74.66 km.","0.0577 Ω/km at 32.9 °C.","Divide by 1.052: 0.0548 Ω/km, against 0.0545."]],
["Failure chance","Line for a 50-year storm, over 5 years.",["P<sub>s</sub> = 0.98.","0.98⁵ = 0.904.","P = 9.6 %."]],
["System risk","50 towers, p = 0.0001, repair 240 h, 40 MW lost at 1000 EUR/MWh.",["Loss 240·40·1000 = 9.6 million EUR.","Expected failures 50·0.0001 = 0.005 per year.","Risk 48 000 EUR/year."]],
["NPV","Option 6: invest 26 000 EUR, annual 136 582 EUR, 20 years at 5 %.",["Annuity factor (1 − 1.05⁻²⁰)/0.05 = 12.462.","136 582·12.462 = 1 702 122.","Add 26 000: 1 728 122 EUR."]],
["Availability","500 kV, 350 km, T<sub>R</sub> 150 years, 7 days, 1 outage/100 km·a.",["T<sub>R</sub>·100/350 = 43 years.","Towers: 24·7/(2·43) = 2.0 h/a, or 0.022 %. Others 30 %: total 0.029 %.","Lightning 0.35·3.5·2 = 2.45 h. Power frequency 2.4 h. Total 0.055 %.","FEU 0.084 %, SEU 3·8/87.6 = 0.27 %.","EA = 99.65 %."]]],
bad:[
["Assuming the contractor carries all liability","The owner answers for approval conditions."],
["Trying to measure line losses directly","Measure resistance instead."],
["Running at real-time limit all the time","Losses increase, so it is for peak needs."],
["Using one temperature sensor","Temperature varies from span to span."],
["Treating risk increase as always wrong","It can be a valid choice with money saved."],
["Testing insulators live in wet weather","Forbidden for safety."],
["Trusting appearance of a conductor","Inner wires can be severed with outer strands intact."],
["Judging a failure on first sight","Test several scenarios against the data."],
["Calling uprating a reliability gain","Uprating without upgrading raises risk."],
["Removing the temporary earth too early","The line is hot until earthed, and voltage can return."]],
q:[
{t:"s",sec:"17.1",p:"p. 678",q:"How many supervision stages are there?",o:["Three","One","Five","Seven"],a:[0],w:"Approval to manufacturing, construction, final."},
{t:"t",sec:"17.1",p:"p. 679",q:"The line owner is held responsible for violations of approval conditions.",a:true,w:"So schedule preventive checks."},
{t:"m",sec:"17.1",p:"p. 681",q:"Which are on the final inspection list? Select all.",o:["Earthing","Bolts","Spacers","Staff salaries"],a:[0,1,2],w:"Staff salaries are not."},
{t:"s",sec:"17.1.6",p:"p. 683",q:"Why measure resistance instead of losses?",o:["Losses are near instrument accuracy","Losses are zero","Cheaper conductors","Law requires it"],a:[0],w:"Transducers are not precise enough."},
{t:"n",sec:"17.1.6",p:"Eq. 17.4",q:"R<sub>AB</sub> = 8, R<sub>AC</sub> = 9, R<sub>BC</sub> = 7. R<sub>A</sub>, Ω?",a:5,tol:.01,u:"Ω",w:"(8 + 9 − 7)/2."},
{t:"n",sec:"17.1.6",p:"Eq. 17.8",q:"0.06 Ω/km at 45 °C, α = 0.00403. R₂₀? Four decimals.",a:.0545,tol:.0002,u:"Ω/km",w:"0.06/1.10075."},
{t:"n",sec:"17.1.6",p:"p. 685",q:"Vibration sensor distance from clamp, mm?",a:89,tol:.1,u:"mm",w:"89 mm."},
{t:"s",sec:"17.2",p:"p. 687",q:"Average gain from real-time rating?",o:["15 %","1 %","50 %","100 %"],a:[0],w:"Up to 35 %."},
{t:"s",sec:"17.2",p:"p. 688",q:"Why is tension preferred to temperature?",o:["It averages the section, closest to sag","It is cheaper to read","Sensors are live","It needs no power"],a:[0],w:"It reflects all conditions in the section."},
{t:"n",sec:"17.2",p:"Eq. 17.9",q:"δ = 90°, I<sub>w</sub> = 0.4, V = 10 m/s, T = 0 °C, T<sub>D</sub> = 0. GRC?",a:24,tol:.1,u:"",w:"2·1.2·10/1."},
{t:"n",sec:"17.2",p:"p. 691",q:"GRC warning threshold?",a:40,tol:.1,u:"",w:"40, caught 85 % of cases."},
{t:"t",sec:"17.2",p:"p. 692",q:"Long rod insulators need in-service puncture tests.",a:false,w:"They are puncture-proof."},
{t:"n",sec:"17.3",p:"Eq. 17.15",q:"100-year storm, 10 years. Failure chance, %? One decimal.",a:9.6,tol:.1,u:"%",w:"1 − 0.99¹⁰."},
{t:"s",sec:"17.3",p:"p. 694",q:"What does uprating raise?",o:["Electric capacity","Mechanical strength","Tree height","Only cost"],a:[0],w:"Upgrading raises strength."},
{t:"s",sec:"17.3",p:"p. 696",q:"Unpredictable events are managed mainly by:",o:["Reactive measures","Proactive measures","Doing nothing","Stronger towers"],a:[0],w:"Probability cannot be economically reduced."},
{t:"s",sec:"17.3",p:"p. 699",q:"Fast restoration changes:",o:["Consequences","Failure probability","Voltage","Conductor"],a:[0],w:"Reactive options reduce consequences."},
{t:"n",sec:"17.3.11",p:"p. 701",q:"Repair 5 h, 40 MW lost, 1000 EUR/MWh. Loss, EUR?",a:200000,tol:1,u:"EUR",w:"5·40·1000."},
{t:"n",sec:"17.3.11",p:"p. 702",q:"Annual 100 000 EUR, 5 % for 10 years. NPV to the nearest 1000?",a:772000,tol:1000,u:"EUR",w:"Factor 7.72."},
{t:"s",sec:"17.3.11",p:"p. 703",q:"Which option is best in the example?",o:["Combined action","Second line","Do nothing","All new insulators"],a:[0],w:"Insulators at crossing plus emergency towers."},
{t:"s",sec:"17.4.2",p:"p. 704",q:"Which is the most important inspection class?",o:["Preventive","Corrective","Annual report","Legal"],a:[0],w:"It catches problems early."},
{t:"n",sec:"17.4.2",p:"p. 705",q:"Helicopter patrol, km a day up to?",a:300,tol:1,u:"km",w:"Up to 300 km."},
{t:"s",sec:"17.4.2",p:"p. 709",q:"Corona inspection detects faults via:",o:["Electric field distortion","Heat","Sound of wind","X-ray"],a:[0],w:"Requires voltage, not load."},
{t:"s",sec:"17.4.2",p:"p. 712",q:"Critical joint resistance is about:",o:["2 to 3 times the conductor's","Half","Equal","100 times"],a:[0],w:"Same length of conductor."},
{t:"s",sec:"17.4.2",p:"p. 713",q:"Main failure cause of porcelain cap-and-pin units:",o:["Pin corrosion","Bird nests","Glass bubbles","Wind"],a:[0],w:"From leakage and discharge at the pin."},
{t:"n",sec:"17.4.3",p:"p. 714",q:"Steel loss above which a component is replaced, %?",a:10,tol:.1,u:"%",w:"More than 10 %."},
{t:"n",sec:"17.4.3",p:"Table 17.7",q:"Minimum sound units at 380 kV?",a:13,tol:.1,u:"",w:"13."},
{t:"s",sec:"17.4.3",p:"p. 716",q:"Which method runs the lineman at phase potential?",o:["Barehand","Hot stick","Glove","Dead line"],a:[0],w:"Highest voltages."},
{t:"s",sec:"17.4.3",p:"p. 717",q:"Clearing cycle in moderate climate, years:",o:["5 to 10","1","20 to 30","50"],a:[0],w:"Three in the tropics."},
{t:"s",sec:"17.4.4",p:"p. 720",q:"First rule for a failure investigation:",o:["No early judgement","Start repairs","Blame vendor","Replace tower"],a:[0],w:"Investigate completely first."},
{t:"s",sec:"17.4.4",p:"p. 722",q:"Largest cause of towers failed, HV lines:",o:["Wind","Ice","Vandalism","Vehicles"],a:[0],w:"606 towers."},
{t:"n",sec:"17.5",p:"Eq. 17.17",q:"T<sub>R</sub> = 50 years. P<sub>f</sub>?",a:.01,tol:.0005,u:"",w:"1/100."},
{t:"n",sec:"17.5",p:"p. 726",q:"FEU 0.1 %, SEU 0.3 %. EA, %?",a:99.6,tol:.01,u:"%",w:"100 − 0.4."},
{t:"t",sec:"17.5",p:"p. 726",q:"In the example, scheduled unavailability exceeds forced.",a:true,w:"0.27 against 0.084 %."},
{t:"n",sec:"17.6",p:"p. 728",q:"50 to 80 °C gives about what power gain, %?",a:30,tol:.5,u:"%",w:"About 30 %."},
{t:"s",sec:"17.6",p:"p. 730",q:"Target of upgrading:",o:["About 10× lower failure risk","Double voltage","Lower towers","Fewer spans"],a:[0],w:"One order of magnitude."}
]});
