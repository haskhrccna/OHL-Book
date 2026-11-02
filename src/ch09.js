OHL.add({n:9,lead:"Materials and forms of insulators, how they are tested, how sets are built, and why pollution rules the design. Printed pages 257 to 300.",
init:function(K){var $=K.$,fmt=K.fmt;
function rng(a,b,n){var o=[];for(var i=0;i<=n;i++)o.push(a+(b-a)*i/n);return o}
K.stepper("hisStep",[["1849","Porcelain bell insulator, Siemens."],["1858 to 1920","Twin bell, then HD line post types, still seen up to 69 kV."],["About 1910","Hewlett suspension insulators, then cap-and-pin strings."],["1919","Motor insulator, Switzerland: double shed solid core, loading porcelain in tension."],["Long rod","Its development, with good pollution performance, preferred in several European countries."],["Mid 1960s on","Composite insulators, increasingly accepted."]]);
K.bars("mtbf",{lw:190,minw:480,w:640,max:6.2,rows:[["Porcelain cap-and-pin",Math.log10(10),"v4","10 hours"],["Glass cap-and-pin",Math.log10(144),"v3","6 days"],["Composite",Math.log10(420),"v2","2.5 weeks"],["Porcelain long rod",Math.log10(157680),"accent","18 years"]],aria:"Mean time between failures, log scale"});
K.stepper("tstStep",[["Type tests","Once for a design or process. Dimensions, wet power frequency, dry lightning impulse, thermal-mechanical, failing load."],["Sample tests","Random samples of each lot, checks of production quality. Mechanical failing load, temperature cycle, thermal shock (glass), puncture (type B), porosity, galvanising."],["Routine tests","Every unit. Visual and mechanical: 80 % of failing load for 1 minute on long rods, 50 % for 3 s on glass. Optional ultrasonic."],["Composite design test","Extra, before type test: interfaces, load-time, 1000 h salt fog at 1 kV per 34.6 mm, rod material."],["Composite type and routine","96 h at 70 % SML, then 1 minute at 100 %. Routine: at least 50 % SML for 10 s."]]);
K.calc("smpCalc",{f:[{k:"N",l:"Lot size",min:100,max:10000,step:100,v:3000,u:"units"}],run:function(v){var r=v.N<=300?"By agreement":v.N<=2000?"E1 = 4, E2 = 3":v.N<=5000?"E1 = 8, E2 = 4":"E1 = 12, E2 = 6";return'<span class="big">'+r+'</span>'}});
K.stepper("polStep",[["I, Light, 16 mm/kV (DC 30)","Few industries or homes, or frequent wind and rain, agriculture, mountains, 10 to 20 km from the sea."],["II, Medium, 20 mm/kV (DC 40)","Industry without much smoke, average housing, or sea wind further inland."],["III, Heavy, 25 mm/kV (DC 50)","High density of industry and suburbs, areas close to the sea."],["IV, Very heavy, 31 mm/kV (DC 70)","Conductive dust and smoke, sea spray, deserts with salt and condensation."]]);
var I=[["U 160 BS",315,146,0],["U 160 BSP",440,146,0],["U 210 B",370,170,0],["U 210 BP",525,170,0],["L 160 C 650",2320,1465,130],["L 210 C 650",2320,1500,130],["LG 75/32S/1465",3850,1465,130]];
K.calc("selCalc",{f:[{k:"U",l:"Highest voltage",o:[[123,"123 kV"],[245,"245 kV"],[420,"420 kV"],[525,"525 kV"],[765,"765 kV"]],v:420},{k:"p",l:"Pollution",o:[[16,"I Light"],[20,"II Medium"],[25,"III Heavy"],[31,"IV Very heavy"]],v:16},{k:"i",l:"Insulator",o:I.map(function(r,i){return[i,r[0]]}),v:0}],run:function(v,c){
 var r=I[v.i],C=v.U*v.p,n=Math.ceil(C/r[1]),L=n*r[2]+(n-1)*r[3],H=r[3]>0;
 K.bars(c,{minw:440,lw:150,u:"mm",max:Math.max(C,n*r[1])*1.05,rows:[["Required creepage",C,"v4"],["Provided",n*r[1],"accent"]],aria:"Creepage comparison"});
 return'<span class="big">'+n+' × '+r[0]+'</span><span>Set length '+fmt(L)+' mm, without conductor side fittings</span>'+(H?'<span>Lightning withstand '+fmt(n*650)+' kV at 650 kV a unit.</span>':'<span class="warn">Check lightning withstand from maker data.</span>')}});
K.calc("susCalc",{f:[{k:"ag",l:"Weight span",min:200,max:900,step:10,v:600,u:"m"},{k:"aw",l:"Wind span",min:200,max:800,step:10,v:450,u:"m"},{k:"n",l:"Subconductors",o:[[1,"1"],[2,"2"],[3,"3"],[4,"4"]],v:4},{k:"z",l:"Height",min:10,max:60,step:1,v:30,u:"m"}],run:function(v,c){
 var mg=.994*9.81,g=7.24,QG=v.n*v.ag*(mg+g)/1000,D=Math.sqrt(.0224*.0224+.00017*g),q=800+3*v.z,QW=.5*q*v.aw*D*(.45+60/v.aw)*v.n/1000,Q=Math.hypot(QG,QW),d=1.35*Q,r=2.3*d;
 K.bars(c,{minw:440,lw:170,u:"kN",rows:[["Weight Q_G",QG,"v1",fmt(QG,1)+" kN"],["Wind on ice Q_WI",QW,"v3",fmt(QW,1)+" kN"],["Resultant",Q,"accent",fmt(Q,1)+" kN"],["Design × 1.35",d,"v2",fmt(d,1)+" kN"],["Rated × 2.3",r,"v4",fmt(r,1)+" kN"]],aria:"Insulator set load"});
 return'<span>Choose a rated unit of '+(r<=120?"120":r<=160?"160":r<=210?"210":r<=300?"300":"400 or a double set")+' kN.</span>'}});
K.calc("dstCalc",{f:[{k:"m",l:"Condition",o:[["c","Clean, capacitive"],["r","With grading ring"],["d","Polluted, low humidity"],["h","Polluted, high humidity"]],v:"c"}],run:function(v,c){
 var P={c:[[0,0],[33,55],[66,82],[100,100]],r:[[0,0],[33,38],[66,70],[100,100]],d:[[0,0],[100,100]],h:[[0,0],[10,10],[20,85],[30,92],[100,100]]}[v.m];
 K.plot(c,{h:230,x:{min:0,max:100,label:"Position from live end, %"},y:{min:0,max:100,label:"Voltage drop, %"},series:[{p:[[0,0],[100,100]],c:"rule",t:"Even"},{p:P,c:"accent",t:"This condition"}],aria:"Voltage distribution along a string"});return null}});
K.stepper("flaStep",[["Deposit","Salt, dust, cement or fertiliser settles."],["Moisten","Fog, dew or light rain wets it without washing it off, so the layer conducts."],["Surface current","Rises strongly on the surface."],["Dry bands","Water evaporates at high current density spots."],["Partial arcs","Arcs form across dry bands and usually die out."],["Flashover","If resistance falls enough, arcs bridge units and the whole set flashes over."]]);
K.stepper("mntStep",[["Lower voltage at critical hours","20 % reduction during dew, near the sea."],["Washing","Live or preferably dead, low conductivity water, special nozzles, at intervals."],["Hand cleaning","Scrubbing or steel wool for hard layers."],["Silicone grease","About 1 mm, lasts about two years, stops continuous water films."],["Semi-conductive glaze","A small current warms and dries the surface, and smooths voltage."]]);
},
cards:[
["Type A insulator","Puncture path at least half the flashover path. Long rods.","p. 258"],
["Type B insulator","Puncture path under half the flashover path. Cap-and-pin, line post.","p. 258"],
["Cap-and-pin insulator","Discs joined by ball-and-socket or clevis-and-tongue.","p. 259"],
["Long rod insulator","One solid body with sheds, from the Motor insulator of 1919.","p. 260"],
["C-130 porcelain","High-strength aluminous porcelain.","p. 262"],
["Toughened glass","Surface compression from air quenching.","p. 265"],
["Self shattering","Stress defects shatter a glass shell early, but the cap keeps about 90 % force.","p. 266"],
["GFC rod","Glass fibre reinforced core of a composite.","p. 267"],
["ECR glass","Electric grade corrosion resistant glass, resists brittle failure.","p. 267"],
["Brittle failure","Rod fracture from moisture at the fitting seal.","p. 269"],
["Hydrophobic surface","Silicone repels water, so less creepage is needed.","p. 269"],
["SML","Specified mechanical load of a composite.","p. 279"],
["Routine test","Every unit: visual and mechanical.","p. 277"],
["Creepage distance","Surface path along an insulator.","p. 281"],
["Specific creepage","mm per kV phase-to-phase: 16, 20, 25, 31.","p. 285"],
["Arcing horn","Guides a power arc away from the insulator.","p. 280"],
["Yoke plate","Connects strings, limits impact after failure.","p. 281"],
["Grading ring","Evens voltage distribution.","p. 286"],
["ESDD","Equivalent salt deposit density method.","p. 293"],
["Withstand salinity","Salt concentration a given voltage withstands.","p. 291"],
["Zinc sleeve","Sacrificial electrode on pins.","p. 266, 286"],
["Relative insulation strength","Corrects tests to standard air.","p. 296"]],
fm:[
["C<sub>req</sub> = s·U<sub>s</sub>","Required creepage, s in mm/kV, U<sub>s</sub> phase to phase.","Table 9.8"],
["n ≥ C<sub>req</sub>/c","Units of creepage c.","p. 299"],
["Q<sub>G</sub> = n₂·a<sub>g</sub>·(m·g + g<sub>I</sub>)","Weight force.","p. 298"],
["D<sub>I</sub> = √(d² + 0.00017·g<sub>I</sub>)","Equivalent ice diameter.","p. 298"],
["Q<sub>WI</sub> = 0.5·C<sub>c</sub>·q·a<sub>w</sub>·D<sub>I</sub>·(0.45 + 60/a<sub>w</sub>)·n₂","Wind on ice, half wind pressure.","p. 298"],
["Q<sub>is</sub> = √(Q<sub>G</sub>² + Q<sub>WI</sub>²)","Resultant.","p. 298"],
["Rated ≥ 1.35·Q<sub>is</sub>·γ<sub>M</sub>","γ<sub>M</sub> 2.0 EN, 2.3 German.","p. 298–299"],
["Test voltage = U<sub>w</sub>·RIS","Withstand correction.","p. 296"],
["U<sub>ext</sub> ≥ 1.05·U<sub>s</sub>/√3","Corona extinction guide.","p. 297"]],
wx:[
["Suspension set at 420 kV","Quad 264-AL1/34, a<sub>g</sub> = 600 m, a<sub>w</sub> = 450 m, m = 0.994 kg/m, g<sub>I</sub> = 7.24 N/m, z = 30 m.",["Q<sub>G</sub> = 4·600·(9.75 + 7.24) = 40.8 kN.","D<sub>I</sub> = 41.6 mm, q = 890 N/m².","Q<sub>WI</sub> = 0.5·890·450·0.0416·0.583·4 = 19.5 kN.","Q<sub>is</sub> = 45.2 kN.","Design: 61.0 kN. Load case J gives 48.0 kN, so case D governs.","Rated: 61.0·2.3 = 140.3 kN, so L 160 or U 160."]],
["Dead-end set","Horizontal force under ice and wind 116.1 kN for four subconductors.",["Design: 1.35·116.1 = 157 kN.","Rated: 157·2.3 = 361 kN total.","Crossings need double sets, 180 kN each.","L 210 or U 210 is chosen."]],
["Creepage and count","420 kV, heavy pollution, U 160 BS and U 160 BSP.",["Required 25·420 = 10 500 mm.","U 160 BS, 315 mm: 34 units, 4964 mm long.","U 160 BSP, 440 mm: 24 units, 3500 mm long.","The anti-pollution unit saves almost 1.5 m."]]],
bad:[
["Selecting by creepage only","Also check lightning withstand: 13 U 210 BP fall short."],
["Using phase-to-earth voltage in Table 9.8","AC specific creepage is per kV phase-to-phase."],
["Assuming composite insulators are maintenance free","Seals and silicone are sensitive, and ageing is a concern."],
["Treating glass breakage as failure of the string","The stub keeps about 90 % of the force, though the unit must be replaced."],
["Ignoring DC pollution","DC attracts far more: use longer creepage."],
["Measuring porcelain cap-and-pin by eye","Punctured units look intact, needing live measurements."],
["Loading line post insulators heavily","Rigid fastening limits them to low loads, not angle or dead-end towers."]],
q:[
{t:"s",sec:"9.1",p:"p. 258",q:"A type A insulator has a shortest puncture path of what?",o:["Under a quarter of flashover path","At least half of flashover path","Equal to creepage","Zero"],a:[1],w:"So it is considered puncture-proof."},
{t:"s",sec:"9.1",p:"p. 258",q:"Which is type A?",o:["Porcelain long rod","Porcelain cap-and-pin","Glass cap-and-pin","Line post"],a:[0],w:"Long rods are type A."},
{t:"s",sec:"9.2",p:"p. 259",q:"Why did Motor insulator porcelain need high quality?",o:["It was loaded in tension","It carried no load","It was thin glass","It was outdoors only"],a:[0],w:"Porcelain's tensile strength is only a tenth of its compressive strength."},
{t:"t",sec:"9.2",p:"p. 263",q:"True or false: specific strength of porcelain falls as cross section rises.",a:true,w:"So test bar values cannot be applied directly."},
{t:"s",sec:"9.3",p:"p. 265",q:"How is glass toughened?",o:["Fast air cooling of the surface after reheating to about 600 °C","Adding lead","Slow cooling for weeks","Glazing"],a:[0],w:"Compression at the surface and tension inside."},
{t:"n",sec:"9.3",p:"p. 266",q:"A shattered cap-and-pin held 100 kN. Remaining force on the pin, kN?",a:90,tol:1,u:"kN",w:"About 90 % of its original value."},
{t:"s",sec:"9.4",p:"p. 269",q:"What should be protected most on a composite insulator?",o:["Seal between fitting, rod and housing","Paint","Cap cement","Glaze"],a:[0],w:"Intrusion of moisture risks brittle failure."},
{t:"m",sec:"9.4",p:"p. 269–269",q:"Composite strengths include? Select all.",o:["Low weight","Hydrophobic surface","Resistance to vandalism","No ageing"],a:[0,1,2],w:"Ageing is a known sensitivity."},
{t:"s",sec:"9.5",p:"p. 271",q:"Which had the longest MTBF in the Cigré study?",o:["Porcelain cap-and-pin","Glass cap-and-pin","Composite","Porcelain long rod"],a:[3],w:"18 years."},
{t:"x",sec:"9.6",p:"p. 272–277",q:"Match tests to their class.",pairs:[["Once for a new design","Type test"],["Random from each lot","Sample test"],["Every unit","Routine test"]],w:"Three classes."},
{t:"n",sec:"9.6",p:"p. 277",q:"Failing load 160 kN. Long rod routine test load, kN?",a:128,tol:.5,u:"kN",w:"80 % of failing load: 128 kN."},
{t:"s",sec:"9.6",p:"Table 9.6, p. 274",q:"Lot of 4000 units. How many units in sample E1?",o:["4","8","12","20"],a:[1],w:"2000 to 5000: E1 8, E2 4."},
{t:"s",sec:"9.7",p:"p. 279–280",q:"Why arrange double suspension strings in line direction?",o:["Arc pushed away from tower, and no parallelogram in swing","Cheaper steel","Less creepage","Higher voltage"],a:[0],w:"Also less visible."},
{t:"n",sec:"9.8",p:"Table 9.8, p. 285",q:"U<sub>s</sub> = 245 kV, medium pollution. Required creepage, mm?",a:4900,tol:1,u:"mm",w:"20·245 = 4900 mm."},
{t:"n",sec:"9.8",p:"p. 299",q:"Required 6720 mm, units 315 mm. Units needed?",a:22,tol:0,u:"",w:"6720/315 = 21.3, round up to 22."},
{t:"n",sec:"9.8",p:"p. 287",q:"DC 500 kV, light pollution 30 mm/kV, 5 % margin. Creepage, mm?",a:15750,tol:5,u:"mm",w:"500·1.05·30 = 15 750 mm."},
{t:"s",sec:"9.8",p:"p. 284–285",q:"What governs string design on DC lines?",o:["Switching surges","Operating voltage with pollution","Lightning only","Wind"],a:[1],w:"Slow-front overvoltages are low, near 1.7 p.u."},
{t:"s",sec:"9.8",p:"p. 287",q:"EN 50341-1 material partial factor for insulators?",o:["1.25","1.35","2.0","3.0"],a:[2],w:"2.0, independent of type."},
{t:"n",sec:"9.9",p:"p. 287",q:"In a clean string, what share of voltage drops over the live third, %?",a:55,tol:1,u:"%",w:"About 55 %."},
{t:"s",sec:"9.9",p:"p. 287",q:"With conductive pollution, flashover falls to about what of the clean dry value?",o:["80 %","50 %","20 %","5 %"],a:[2],w:"About 20 %."},
{t:"s",sec:"9.9",p:"p. 289",q:"Why reduce creepage 10 % in dead-end position at some utilities?",o:["They clean better","They carry less voltage","They are shorter","They are longer"],a:[0],w:"Horizontal strings wash better."},
{t:"s",sec:"9.9",p:"p. 291",q:"When is a dry pollution layer harmful?",o:["It is not, until moistened","Always","Only at night","At high temperature"],a:[0],w:"Light rain or dew makes it conduct."},
{t:"s",sec:"9.9",p:"p. 294",q:"How long does silicone grease last in heavy pollution?",o:["2 weeks","About two years","Ten years","For life"],a:[1],w:"Then it is removed and reapplied."},
{t:"s",sec:"9.10",p:"p. 297",q:"Wet slow-front withstand testing is required for what?",o:["Every voltage","Above 245 kV","Under 36 kV","DC only"],a:[1],w:"Dry fast-front is required for all voltages."}
]});
