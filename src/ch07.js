OHL.add({n:7,lead:"What conductors are made of, how they are tested, and how to pick one for current, cost, voltage stress and mechanical load. Printed pages 195 to 239.",
init:function(K){var $=K.$,fmt=K.fmt;
function rng(a,b,n){var o=[];for(var i=0;i<=n;i++)o.push(a+(b-a)*i/n);return o}
K.stepper("desStep",[["243-AL1/39-ST1A","243 mm² hard aluminium over 39 mm² steel, former ACSR 240/40, 26 aluminium and 7 steel wires."],["AL1","Hard-drawn aluminium."],["AL2 to AL7","Aluminium-magnesium-silicon alloys, called Aldrey and Almelec historically."],["ST1A","Steel strength class 1, zinc class A."],["20SA","Aluminium-clad steel, 20 % IACS. A or B before it marks steel strength."],["AAAC, ACSR, AACSR","International names: all aluminium alloy, aluminium steel reinforced, alloy steel reinforced."],["Bird and flower names","North America, UK and France: Finch is 565-AL1/72-ST1A, Lynx is 183-AL1/43-ST1A."]]);
K.stepper("hisStep",[["About 1880","Copper, sized for strength, not conduction, so heavy with short spans."],["1895 to 1900","First aluminium lines, California 1895, Germany 1900."],["1907","ACSR introduced. Used in Germany from 1920, and dominant by 1930."],["1921 to 1930s","Aluminium alloys, Aldrey and Almelec."],["1929 to 1930","Corona at 220 kV brings hollow copper conductors, then bundles."],["Recent","Worldwide trend to AAAC and new high temperature alloys."]]);
var M=[["AL1",35.38,160,200,60],["AL3",30.74,295,295,60],["TAL",34.8,160,190,60],["ST1A",5.21,1100,1170,207],["ST4A",5.21,1225,1275,207],["20SA",11.8,1000,1200,162],["40SA",23.2,500,500,109],["E-Cu",56,422,422,130]];
K.calc("matCalc",{f:[{k:"p",l:"Compare",o:[[1,"Conductivity, m/(Ω·mm²)"],[2,"Strength, N/mm² (lower value)"],[4,"Modulus, kN/mm²"]],v:1}],run:function(v,c){K.bars(c,{minw:460,lw:90,rows:M.map(function(r){return[r[0],r[v.p],r[4]>150?"v1":"accent"]}),aria:"Material comparison"});return null}});
K.calc("compCalc",{f:[{k:"m",l:"Area ratio m",o:[[1.4,"1.4"],[4.3,"4.3"],[6,"6.0"],[7.7,"7.7"],[11.3,"11.3"],[14.5,"14.5"]],v:6},{k:"s",l:"Overall stress",min:10,max:150,step:5,v:60,u:"N/mm²"}],run:function(v,c){
 var m=v.m,EA=60,EF=207,E=(EA*m+EF)/(m+1),e=(23*EA*m+11.5*EF)/(m*EA+EF),g=(2.703*m+7.78)/(m+1),sa=v.s*(1+m)/(m+EF/EA),sf=v.s*(1+m)/(1+m*EA/EF);
 K.bars(c,{minw:440,lw:150,u:"N/mm²",rows:[["Aluminium wires",sa,"accent",fmt(sa,1)+" N/mm²"],["Steel wires",sf,"v1",fmt(sf,1)+" N/mm²"]],aria:"Wire stresses"});
 return'<span>E ≈ '+fmt(E)+' kN/mm², ε ≈ '+fmt(e,1)+'·10⁻⁶/K, density ≈ '+fmt(g,2)+' kg/dm³</span>'}});
var A=[["122-AL1/20-ST1A",141.4,15.5,491,44.5,.2376,410],["184-AL1/30-ST1A",213.6,19,741,65.27,.1571,535],["231-AL1/30-ST1A",260.8,21,870.9,72.13,.125,630],["243-AL1/39-ST1A",282.5,21.8,980.1,85.12,.1188,645],["304-AL1/49-ST1A",353.7,24.4,1227.3,105.09,.0949,740],["382-AL1/49-ST1A",431.2,27,1442.5,121.3,.0758,840],["434-AL1/56-ST1A",490.6,28.8,1641.3,133.59,.0666,900],["494-AL1/34-ST1A",528.4,29.9,1632.6,117.96,.0584,985],["562-AL1/49-ST1A",611.2,32.2,1939.5,146.28,.0515,1040],["653-AL1/45-ST1A",698.8,34.4,2159.9,156.18,.0442,1120],["1046-AL1/45-ST1A",1090.9,43,3248.2,218.92,.0277,1580]];
var pts=A.map(function(r){return[r[1],r[6]]});
K.calc("acsrCalc",{f:[{k:"i",l:"Conductor",o:A.map(function(r,i){return[i,r[0]]}),v:3}],run:function(v,c){var r=A[v.i];
 K.plot(c,{h:220,x:{min:0,max:1200,label:"Total cross section, mm²"},y:{min:0,max:1800,label:"Ampacity, A"},series:[{p:pts,c:"accent"}],marks:[{x:r[1],y:r[6],t:r[6]+" A"}],aria:"Ampacity against cross section"});
 return'<span>'+r[1]+' mm², '+r[2]+' mm diameter, '+r[3]+' kg/km</span><span>'+r[4]+' kN rated, '+r[5]+' Ω/km DC, <b>'+r[6]+' A</b></span>'}});
K.calc("crpCalc",{f:[{k:"e",l:"ε at 1 hour",min:20,max:200,step:5,v:60,u:"μm/m"},{k:"n",l:"Slope n",min:.1,max:.4,step:.01,v:.2,u:""}],run:function(v,c){var f=function(t){return v.e*Math.pow(t,v.n)};K.plot(c,{h:220,x:{min:1,max:100000,log:true,label:"Time, hours (log scale)"},y:{min:10,max:10000,log:true,label:"Creep, μm/m (log scale)"},series:[{p:[[1,f(1)],[100000,f(100000)]],c:"accent"}],aria:"Creep log log"});return'<span>At 100 000 h, about 10 years: <b>'+fmt(f(1e5))+' μm/m</b></span>'}});
K.stepper("spcStep",[["Long spans","High steel content: the 400 kV Bosphorus crossing uses 1805-AL4/228-A20SA, 850 kN."],["Single big conductor","BC Hydro's 500 kV Mission Ridge: 76.2 mm, 2787-AL4/607-ST1A, 1463 kN, against severe icing."],["High temperature","Annealed aluminium over steel, 63 % IACS, or TAL at 150 °C: 650 A rises to 1015 A, with bigger sag and about 50 % more cost."],["INVAR core","Low expansion keeps sag nearly constant, at very high cost and losses."],["Enlarged diameter","Austrian 667-AL1/75-A20SA hollow conductor, 54 mm, to cut noise on a 220 kV line uprated to 400 kV."],["Formed wires","Smooth, compact, drag factor 0.46 to 0.8."],["Compacted","Rolled, 8 to 11 % smaller diameter."],["Self-damping","Loose core in a hollow conductor. Dropped in Europe because of noise."],["Vibration resistant, T2","Two twisted conductors, used widely in the USA in the 1980s."],["Low noise","Formed outer wires, up to 15 dB(A) less wind noise, Japan."],["Treated surface","Black paint raises emission to 0.8, and so ampacity. Coloured or dull finishes reduce visibility, which can be a risk for birds."]]);
var air=[[0,1.29,.0243,.175],[100,.95,.0316,.222]];
function amp(r,Ta,T,V,S){var D=r[2]/1000,Tm=(T+Ta)/2,f=Tm/100,g=(1.29+(0.95-1.29)*f),l=.0243+(.0316-.0243)*f,e=(.175+(.222-.175)*f)*1e-4,Re=V*D*g/e,Nu=Re<=1000?.32+.43*Math.pow(Re,.52):.24*Math.pow(Re,.6),Nc=Math.PI*l*Nu*(T-Ta),TK=T+273,TaK=Ta+273,Nr=5.67e-8*.6*D*Math.PI*(.75*(Math.pow(TK,4)-Math.pow(TaK,4))+.25*(Math.pow(TK,4)-Math.pow(217,4))),Nr2=5.67e-8*.6*D*Math.PI*(Math.pow(TK,4)-Math.pow(TaK,4)),Ns=D*.5*S,R=r[5]*1e-3*(1+.00403*(T-20))*1.02;return{Nc:Nc,Nr:Nr,Ns:Ns,R:R,I:Math.sqrt(Math.max(0,Nc+Nr-Ns)/R),I2:Math.sqrt(Math.max(0,Nc+Nr2-Ns)/R)}}
K.calc("ampCalc",{f:[{k:"i",l:"Conductor",o:A.map(function(r,i){return[i,r[0]]}),v:8},{k:"Ta",l:"Ambient",min:0,max:45,step:1,v:35,u:"°C"},{k:"T",l:"Conductor temperature",min:50,max:100,step:1,v:80,u:"°C"},{k:"V",l:"Wind",min:.2,max:6,step:.1,v:.6,u:"m/s"},{k:"S",l:"Sun",min:0,max:1350,step:50,v:900,u:"W/m²"}],run:function(v,c){var r=A[v.i],a=amp(r,v.Ta,v.T,v.V,v.S);
 K.plot(c,{h:220,x:{min:0,max:6,label:"Wind velocity, m/s"},y:{min:0,max:Math.ceil(amp(r,v.Ta,v.T,6,v.S).I/500+.5)*500,label:"Ampacity, A"},series:[{p:rng(.2,6,30).map(function(V){return[V,amp(r,v.Ta,v.T,V,v.S).I]}),c:"accent"}],marks:[{x:v.V,y:a.I,t:fmt(a.I)+" A"}],aria:"Ampacity against wind"});
 return'<span class="big">'+fmt(a.I2)+' A</span><span>Radiation by Eq. 7.24. Eq. 7.23 gives '+fmt(a.I)+' A.</span><span>Convection '+fmt(a.Nc,1)+' W/m + radiation '+fmt(a.Nr,1)+' W/m (7.23) − sun '+fmt(a.Ns,1)+' W/m</span><span>Table 7.9 standard value: '+r[6]+' A</span>'}});
K.calc("ecoCalc",{f:[{k:"S",l:"Apparent power",min:10,max:200,step:5,v:50,u:"MVA"},{k:"U",l:"Voltage",o:[[110,"110 kV"],[220,"220 kV"]],v:110},{k:"Ep",l:"Generation investment E<sub>p</sub>",min:1000,max:3000,step:100,v:2000,u:"EUR/kW"},{k:"p",l:"Energy price p₃",min:.02,max:.12,step:.01,v:.05,u:"EUR/kWh"},{k:"t",l:"Loss hours t<sub>L</sub>",min:1000,max:8000,step:100,v:4800,u:"h/year"}],run:function(v,c){
 var I=v.S*1e6/(Math.sqrt(3)*v.U*1e3),q=(.15*v.Ep+v.p*v.t)*.0849,den=.5*.15*400,A0=I*Math.sqrt(q/den),f=function(a){return den*a},l=function(a){return q*I*I/a},mx=f(1000);
 K.plot(c,{h:240,x:{min:50,max:1000,label:"Aluminium cross section, mm²"},y:{min:0,max:Math.max(mx,f(A0)*3),label:"EUR/(km·year)"},series:[{p:[[50,f(50)],[1000,f(1000)]],c:"v1",t:"Fixed"},{p:rng(50,1000,50).map(function(a){return[a,l(a)]}),c:"v4",t:"Losses"},{p:rng(50,1000,50).map(function(a){return[a,f(a)+l(a)]}),c:"accent",t:"Total varying cost"}],vlines:[{x:Math.min(A0,1000),t:"Optimum"}],aria:"Cost against cross section"});
 return'<span>I = '+fmt(I)+' A</span><span class="big">A<sub>opt</sub> = '+fmt(A0)+' mm²</span>'}});
K.bars("t716",{lw:230,minw:480,u:"MW",max:800,rows:[["1 × 1805-AL4/228, 360 Ω",445,"v3"],["2 × 565-AL1/72, 300 Ω",535,"v2"],["3 × 434-AL1/56, 260 Ω",615,"v1"],["4 × 264-AL1/34, 250 Ω",640,"accent"],["4 × 264-AL1/34, 1 m, 210 Ω",765,"v4"]],aria:"Surge impedance load"});
var ST=[["AL1/ST1A, 1.4:1",90,401,585],["AL1/ST1A, 4.3:1",57,240,354],["AL1/ST1A, 6.0:1",56,208,301],["AL1/ST1A, 7.7:1",52,189,272],["AL1/ST1A, 11.3:1",44,165,239],["AL1/ST1A, 14.5:1",40,152,223],["AL1",30,120,160],["AL3/ST1A, 7.7:1",63,284,392],["A20SA",137,1112,1340]];
K.calc("strCalc",{f:[{k:"i",l:"Conductor",o:ST.map(function(r,i){return[i,r[0]]}),v:3}],run:function(v,c){var r=ST[v.i];K.bars(c,{minw:440,lw:160,u:"N/mm²",rows:[["Everyday stress",r[1],"accent"],["Long-term stress",r[2],"v1"],["RTS/1.25",r[3]/1.25,"v3",fmt(r[3]/1.25)+" N/mm²"],["Rated strength",r[3],"v4"]],aria:"Stress limits"});return'<span>Long-term is '+fmt(r[2]/r[3]*100)+' % of rated strength.</span>'}});
},
cards:[
["ACSR","Aluminium conductor steel reinforced, now AL1/ST1A.","p. 197, 206"],
["AAAC","All aluminium alloy conductor, AL3 in EN 50182.","p. 197"],
["AACSR","Alloy conductor with steel reinforcement.","p. 197"],
["Lay direction","Right-hand conforms to Z, left-hand to S. Outermost preferably right-hand.","p. 197"],
["IACS","Copper reference. AL1 is 61 %.","p. 200"],
["Recrystallisation","Above 100 °C hard aluminium loses strength.","p. 202"],
["TAL","Zirconium alloy, up to 150 °C.","p. 202–203"],
["Bird caging","Outer wires lifting apart during stringing. Tested at 20 % RTS.","p. 216"],
["Cross-sectional ratio","Aluminium area to steel area. 6.0 to 14.5 for most phase conductors.","p. 207–208"],
["Virtual modulus","Weighted E for composite conductors, Eq. 7.2.","p. 209"],
["RTS","Sum of aluminium strength and steel stress at 1 % elongation, each × area.","p. 211"],
["Creep","Permanent elongation under load, ε = ε<sub>1h</sub>·tⁿ.","p. 216"],
["Grease case 1","Only the steel core is greased. Minimum requirement.","p. 212"],
["Reel barrel diameter","30 × conductor or 60 × steel core diameter, whichever larger.","p. 213"],
["Bundle conductors","Parallel subconductors in a set geometry, patented 1930.","p. 217"],
["Skin effect","Current moves to outer layers, raising AC resistance.","p. 225"],
["Heat balance","N<sub>J</sub> + N<sub>S</sub> + N<sub>M</sub> = N<sub>R</sub> + N<sub>C</sub>.","p. 224"],
["Nusselt number","Relates convection to Reynolds number, Eq. 7.26.","p. 226"],
["Utilisation period","Energy in a year over maximum power, t<sub>m</sub>.","p. 229"],
["Loss hours t<sub>L</sub>","Equivalent hours for losses, linked to t<sub>m</sub> by Fig. 7.19.","p. 229"],
["Weather-based rating","Forecasts raise capacity 25 to 30 %.","p. 232"],
["Everyday stress (EDS)","Limit protecting against vibration fatigue.","p. 237"],
["Long-term stress","Sustained a year without failure.","p. 237"],
["Corona losses","2 kW/km fair, 5 rain, up to 100 frost.","p. 235"]],
fm:[
["E = (E<sub>Al</sub>·m + E<sub>Fe</sub>)/(m + 1)","Virtual modulus.","7.2, p. 209"],
["ε = (ε<sub>Al</sub>·E<sub>Al</sub>·m + ε<sub>Fe</sub>·E<sub>Fe</sub>)/(m·E<sub>Al</sub> + E<sub>Fe</sub>)","Virtual expansion.","7.3, p. 209"],
["σ<sub>Fe</sub> = σ(1+m)/(1+m·E<sub>Al</sub>/E<sub>Fe</sub>)","Steel stress.","7.8, p. 211"],
["ε = ε<sub>1h</sub>·tⁿ","Creep.","7.10, p. 216"],
["m·c·dT/dt = N<sub>J</sub> + N<sub>S</sub> + N<sub>M</sub> − N<sub>R</sub> − N<sub>C</sub>","Heat balance.","7.12, p. 224"],
["R'<sub>AC</sub> ≈ R'<sub>DC</sub>(1 + x⁴/3)","Skin effect, x ≤ 1.","7.16, p. 225"],
["N<sub>S</sub> = D·k<sub>a</sub>·N<sub>Sh</sub>","Solar gain.","7.22, p. 226"],
["N<sub>R</sub> = k<sub>s</sub>k<sub>e</sub>Dπ[0.75(T⁴−T<sub>am</sub>⁴) + 0.25(T⁴−T<sub>h</sub>⁴)]","Radiation loss.","7.23, p. 226"],
["N<sub>C</sub> = π·λ·Nu·(T − T<sub>am</sub>)","Convection loss.","7.25, p. 226"],
["Re = V·D·γ/η","Reynolds number.","7.28, p. 227"],
["I = √[(N<sub>R</sub> + N<sub>C</sub> − N<sub>S</sub>)/R']","Current carrying capacity.","7.31, p. 227"],
["K<sub>Tr</sub> = 100·100·ΣK/(√3·U·I·t<sub>m</sub>·cos φ)","Specific transmission costs.","7.36, p. 230"],
["A<sub>Al</sub> = I·√[(p₂E<sub>p</sub> + p₃t<sub>L</sub>)R/(0.5p₁E₂)]","Economic cross section.","7.41, p. 231"]],
wx:[
["Wire stress, 304-AL1/49-ST1A","m = 6.0, σ = 60 N/mm². Use Table 7.5 moduli.",["E<sub>Fe</sub>/E<sub>Al</sub> = 207/60 = 3.45.","σ<sub>Al</sub> = 60·7/(6 + 3.45) = 44.4 N/mm².","σ<sub>Fe</sub> = 3.45·44.4 = 153 N/mm².","The book's 45.8 and 144.8 imply a ratio of 3.16."]],
["Economic section","50 MVA, 110 kV, E<sub>p</sub> = 2000 EUR/kW, p₃ = 0.05 EUR/kWh, t<sub>L</sub> = 4800 h.",["I = 50·10⁶/(√3·110·10³) = 262 A.","Numerator: (0.15·2000 + 0.05·4800)·0.0849 = 45.8.","Denominator: 0.5·0.15·400 = 30.","A = 262·√(45.8/30) = 324 mm².","Choose 339-AL1/30-ST1A."]],
["Heat balance check","562-AL1/49-ST1A, 35 °C, 80 °C, 0.6 m/s, 900 W/m².",["N<sub>S</sub> = 0.0322·0.5·900 = 14.5 W/m.","Re ≈ 1050 and Nu ≈ 15.6, so N<sub>C</sub> ≈ 63 W/m.","N<sub>R</sub> ≈ 22 W/m from the simple Eq. 7.24.","R' at 80 °C ≈ 6.7·10⁻⁵ Ω/m, with 2 % for AC, assumed here.","I = √((63 + 22 − 14.5)/R') ≈ 1040 A."]],
["Stress check","231-AL1/30-ST1A, EDS limit 52 N/mm², RTS 276 N/mm².",["Maximum: 276/1.25 = 221 N/mm².","Wind zone 3, ice zone 2: 48 N/mm² EDS, because the top limit governs.","Ice zone 1: EDS of 52 N/mm² governs."]]],
bad:[
["Choosing a conductor on ampacity alone","Run the economics. Lines usually operate far below their thermal limit."],
["Calling σ = F/A the real stress","Aluminium and steel carry different stresses, Eq. 7.7 and 7.8."],
["Greasing the outer layer","Can cause corona and affect clamps."],
["Treating a higher EDS as always cheaper","Lower towers, but heavier angle towers. It can cost more with many strain towers."],
["Comparing ampacities with different weather","35 °C at 0.6 m/s gives 1040 A; 20 °C at 1 m/s can give about 1460 A."],
["Adding gradient-safe spacing without limit","1.0 m spacing raises SIL, and also gradient over 17 kV/cm."],
["Assuming mono-metallic conductors behave like ACSR","They cannot shift load onto steel, so fatigue is worse."],
["Running a line at its limit all year","Losses make it uneconomic."]],
q:[
{t:"s",sec:"7.1",p:"Table 7.3, p. 197",q:"What does 243-AL1/39-ST1A have as its steel area?",o:["243 mm²","39 mm²","1 mm²","282 mm²"],a:[1],w:"The number before ST1A is steel area. Total is 282.5 mm²."},
{t:"n",sec:"7.1",p:"p. 200",q:"AL1 at 35.38 m/(Ω·mm²): what IACS percentage, against 58? Nearest whole.",a:61,tol:.5,u:"%",w:"35.38/58 = 61 %."},
{t:"s",sec:"7.1",p:"p. 202",q:"Why is permanent temperature limited to 80 °C?",o:["Steel melts","Aluminium recrystallises and elongates above about 100 °C","Grease burns","Insulators crack"],a:[1],w:"Higher temperatures also raise permanent inelastic elongation."},
{t:"s",sec:"7.1",p:"p. 207",q:"Why do composite conductors resist fatigue better?",o:["They are lighter","Aluminium creeps and load shifts to steel","They have fewer wires","They run hotter"],a:[1],w:"Aluminium stress falls with time, helping against bending fatigue."},
{t:"n",sec:"7.1",p:"Eq. 7.2, p. 209",q:"m = 7.7, E<sub>Al</sub> = 60, E<sub>Fe</sub> = 207. Find E in kN/mm². One decimal.",a:76.9,tol:.2,u:"kN/mm²",w:"(462 + 207)/8.7 = 76.9. Table 7.11 gives 70 after stranding."},
{t:"m",sec:"7.1",p:"p. 215–216",q:"Which are true of the stress-strain test? Select all.",o:["Load steps of 30, 50, 70, 85 % RTS","Test length at least 400 × diameter","Holds of one day each","Initial load 5 % RTS"],a:[0,1,3],w:"Holds are 0.5 h at 30 % and 1 h otherwise."},
{t:"n",sec:"7.1",p:"p. 214",q:"Rated strength 100 kN. Lowest passing breaking load, kN?",a:95,tol:.1,u:"kN",w:"Fracture at 95 % RTS or above passes."},
{t:"s",sec:"7.1",p:"p. 217",q:"From which voltage are bundles essential, per the book?",o:["110 kV","220 kV","420 kV","800 kV only"],a:[2],w:"420 kV and above are not feasible without them."},
{t:"s",sec:"7.1",p:"p. 218",q:"Twin 243-AL1/39 against single 490-AL1/64: what is the single's surge impedance load share?",o:["60 %","83 %","100 %","120 %"],a:[1],w:"300/360 = 83 %."},
{t:"x",sec:"7.1",p:"p. 219–222",q:"Match special conductors with their purpose.",pairs:[["TAL","Operates at 150 °C"],["INVAR core","Keeps sag almost constant"],["T2","Resists vibration and galloping"],["Black coating","Raises emission and ampacity"]],w:"Each design solves a specific limit."},
{t:"s",sec:"7.2",p:"p. 224",q:"Which is not a heat input?",o:["Joule heat","Solar radiation","Magnetic losses","Convection"],a:[3],w:"Convection and radiation remove heat."},
{t:"n",sec:"7.2",p:"Eq. 7.22, p. 226",q:"D = 30 mm, k<sub>a</sub> = 0.5, 900 W/m². Solar gain, W/m?",a:13.5,tol:.05,u:"W/m",w:"0.03·0.5·900 = 13.5 W/m."},
{t:"n",sec:"7.2",p:"Eq. 7.31, p. 227",q:"N<sub>C</sub> + N<sub>R</sub> − N<sub>S</sub> = 50 W/m, R' = 5·10⁻⁵ Ω/m. Current, A?",a:1000,tol:1,u:"A",w:"√(50/5·10⁻⁵) = √10⁶ = 1000 A."},
{t:"t",sec:"7.2",p:"p. 227",q:"True or false: the deterministic ampacity method is usually conservative.",a:true,w:"It assumes rare conditions together."},
{t:"s",sec:"7.2",p:"p. 228",q:"Which costs fall per kWh as utilisation rises?",o:["Fixed costs","Energy losses","Solar","Corona"],a:[0],w:"Fixed costs spread over more energy."},
{t:"n",sec:"7.2",p:"Eq. 7.41, p. 231",q:"The square root in Eq. 7.41 is 1.236, I = 400 A. Find optimum area, mm².",a:494,tol:1,u:"mm²",w:"400·1.236 = 494 mm²."},
{t:"s",sec:"7.2",p:"Eq. 7.41, p. 231",q:"Optimum area changes how with current?",o:["With I²","Proportional to I","With √I","Independent"],a:[1],w:"A<sub>opt</sub> = I·√(...)."},
{t:"n",sec:"7.2",p:"p. 232",q:"Rating 1000 A, weather-based forecast adds 25 %. New capacity, A?",a:1250,tol:1,u:"A",w:"25 to 30 % higher."},
{t:"s",sec:"7.3",p:"Table 7.16, p. 233",q:"From single to quad bundle, what happens to X<sub>L</sub> and SIL?",o:["X<sub>L</sub> falls, SIL rises","Both rise","Both fall","No change"],a:[0],w:"0.384 to 0.260 Ω/km, 445 to 640 MW."},
{t:"s",sec:"7.3",p:"p. 235",q:"Why does corona loss not peak with Joule losses?",o:["Foul weather cools the conductors","Corona is DC","They cancel","Corona stops in rain"],a:[0],w:"Foul weather improves cooling."},
{t:"n",sec:"7.4",p:"p. 236",q:"RTS = 300 N/mm². Maximum stress at γ<sub>M</sub> = 1.25, N/mm²?",a:240,tol:.5,u:"N/mm²",w:"300/1.25 = 240."},
{t:"s",sec:"7.4",p:"p. 237",q:"What is everyday stress meant to prevent?",o:["Corona","Fatigue from aeolian vibration","Earth faults","Lightning"],a:[1],w:"It limits exposure to vibration fatigue."},
{t:"s",sec:"7.4",p:"p. 239",q:"20 % more EDS with 10 % strain towers changed investment how?",o:["Fell 4 %","Rose 4 %","Fell 20 %","No change"],a:[0],w:"With 20 % strain towers, it stayed about equal."},
{t:"n",sec:"7.4",p:"Table 7.11, p. 210",q:"Long-term 208 N/mm², worst stress 150 N/mm², partial factor 1.3. Result, N/mm²?",a:195,tol:.3,u:"N/mm²",w:"1.3·150 = 195, under 208."}
]});
