OHL.add({n:10,lead:"The hardware that clamps, joins, spaces and damps conductors, and links insulators to towers. Printed pages 305 to 317.",
init:function(K){var $=K.$,fmt=K.fmt;
K.stepper("susStep",[["Articulated clamp","The usual type. Body hung from straps, cover clamps the conductor, groove designed for steep downstrain."],["Armor rod suspension","Helical rods spread forces along up to 2.5 m, for a gentle curve. Short, light body follows asymmetrical modes."],["Armor grip suspension","Rubber lining inside rods reduces compression. Vibration resistant and more expensive. Well suited to OPGW and ADSS, as concentrated force would disturb the fibres."],["Suspended dead-end","For river crossings. No static bending, since conductors are dead-ended on both sides."],["Saddle clamp","For a conductor passing uncut. Bodies up to 2 m, custom made, as on the Bosphorus."],["Release and sliding clamps","Let go at about 45° or at set differences. Mostly abandoned in Europe as unreliable. Load control devices are the modern family."]]);
K.stepper("dedStep",[["Wedge clamp","Wedge tightens as tension rises. No special tools, sag can be corrected by shifting. Suits single-material conductors and ACSR with more than one aluminium layer. Greased cores can reduce interlock."],["Compression clamp","All standard conductors, up to RTS. Hydraulic press and dies, no later shifting. Steel sleeve first, then outer aluminium sleeve. Bosphorus: 850 kN."],["Preformed dead-end","Helical rods installed by hand, friction over a long length, sand coated inside. Mainly small conductors and optical cables."]]);
K.calc("repCalc",{f:[{k:"p",l:"Failed strands in outer layer",min:0,max:60,step:1,v:15,u:"%"}],run:function(v){var r=v.p===0?"No repair needed":v.p<=25?"Repair patch rods":"Tension-proof connector patch rod";return'<span class="big">'+r+'</span><span class="small">As a rule, patch rods suit damage up to 25 % of the outer layer. Check the maker\'s instructions.</span>'}});
K.calc("spcCalc",{f:[{k:"a",l:"Span",min:150,max:800,step:10,v:400,u:"m"}],run:function(v,c){
 var L=[],x=15,s=15,half=v.a/2,A=[];while(x+s+5<half){A.push(x);s=Math.min(70,s+5);x+=s}var X=A.concat(A.slice().reverse().map(function(p){return v.a-p}));
 if(X.length&&X[X.length/2]-X[X.length/2-1]>70+5){X.splice(X.length/2,0,v.a/2)}
 var W=640,sc=(W-40)/v.a,h='<path d="M20 34Q'+(W/2)+' 110 '+(W-20)+' 34" fill="none" stroke="var(--ink)" stroke-width="2"/>';X.forEach(function(p){var t=p/v.a,xx=20+p*sc,yy=34+(1-Math.pow(2*t-1,2))*38;h+='<path d="M'+xx+' '+(yy-8)+'V'+(yy+8)+'" stroke="var(--live)" stroke-width="3"/>'});
 h+='<path d="M20 10V120M'+(W-20)+' 10V120" stroke="var(--muted)" stroke-width="3"/>';
 $(c).innerHTML='<div class="scroll"><div style="min-width:480px"><svg class="c" viewBox="0 0 '+W+' 130" role="img" aria-label="Spacers along a span">'+h+'</svg></div></div>';
 return'<span class="big">'+X.length+' spacers</span><span class="small">First at 15 m, longest subspan '+fmt(Math.max.apply(null,X.slice(1).map(function(p,i){return p-X[i]})))+' m.</span>'}});
K.calc("mecCalc",{f:[{k:"R",l:"Conductor RTS",min:20,max:300,step:1,v:105,u:"kN"},{k:"T",l:"Maximum conductor tension",min:5,max:150,step:1,v:40,u:"kN"}],run:function(v,c){K.bars(c,{minw:440,lw:190,u:"kN",rows:[["Dead-end hold, 85 % RTS",.85*v.R,"accent",fmt(.85*v.R,1)+" kN"],["Slip, 20 % RTS",.2*v.R,"v1",fmt(.2*v.R,1)+" kN"],["Slip, 25 % RTS",.25*v.R,"v1",fmt(.25*v.R,1)+" kN"],["Suspension design, 1.35·T",1.35*v.T,"v3",fmt(1.35*v.T,1)+" kN"]],aria:"Fitting requirements"});return null}});
K.calc("corCalc",{f:[{k:"U",l:"Highest system voltage",o:[[123,"123 kV"],[145,"145 kV"],[245,"245 kV"],[420,"420 kV"]],v:420}],run:function(v){var T={123:[95,30,75,34],145:[110,30,88,34],245:[185,35,150,40],420:[320,40,260,46]}[v.U];return'<span>Formula: '+fmt(1.05*v.U/Math.sqrt(3),1)+' kV</span><span>Stringent: '+T[0]+' kV, '+T[1]+' dB</span><span>Standard: '+T[2]+' kV, '+T[3]+' dB</span>'}});
},
cards:[
["Line fittings","Attach, connect and protect conductors and insulators.","p. 305"],
["Four clamp stresses","Tension, static bending, compression, alternating bending.","p. 305"],
["Articulated suspension clamp","Pivoted body on straps. Most used.","p. 305"],
["Armor rods","Helical rods spreading clamp forces up to 2.5 m.","p. 306"],
["Armor grip suspension","Rubber lining plus rods, for optical cables.","p. 306"],
["Saddle clamp","Long custom body for steep downstrain.","p. 307"],
["Load control device","Family of fittings limiting high longitudinal forces.","p. 307"],
["Wedge dead-end","Self tightening under tension.","p. 308"],
["Compression dead-end","Press-formed sleeves, up to RTS.","p. 308"],
["Preformed dead-end","Helical, hand fitted.","p. 309"],
["Turnbuckle","Adjusts length, never in bending.","p. 309"],
["Parallel groove clamp","Non-tension connector, used three or four at a jumper.","p. 310"],
["Contact corrosion","Between Al and Cu in humidity.","p. 310"],
["Rigid spacer","Keeps subconductor spacing fixed.","p. 310"],
["Spacer damper","Spacer with rubber hinges that dissipates energy.","p. 312"],
["Phase spacer","Reduces flashovers during galloping.","p. 311"],
["Stockbridge damper","Spring-mass vibration damper.","p. 312"],
["Energy balance principle","Balances wind input against dissipation.","p. 312"],
["85 % RTS","Minimum hold of dead-ends and tension joints.","p. 315"],
["Slip resistance","20 to 25 % RTS as used worldwide.","p. 315"]],
fm:[
["Hold ≥ 0.85·RTS","Dead-end clamps and tension joints.","p. 315"],
["Slip = 0.20 to 0.25·RTS","Suspension clamps.","p. 315"],
["F<sub>design</sub> = 1.35·T","Suspension clamp, German.","p. 315"],
["γ<sub>M</sub> ≥ 1.6","Partial factor on failing load.","p. 315"],
["J ≤ 70 A/mm²; 80 A/mm²","Tension-loaded; non-tension.","p. 314"],
["U<sub>test</sub> = 1.05·U<sub>s</sub>/√3","Corona test.","p. 314"]],
wx:[
["Fitting strength","Conductor RTS 105 kN, maximum tension 40 kN.",["Dead-end hold: 0.85·105 = 89 kN.","Slip range: 21 to 26 kN.","Suspension design load: 1.35·40 = 54 kN.","Partial factor 1.6 on failing load."]],
["Choosing a dead-end","ACSR with one aluminium layer and a greased core, at a dead-end tower.",["Wedge types rely on friction with the steel core through the aluminium.","With only one layer and grease, interlock may fail.","Use a compression clamp."]],
["Current density check","Short circuit 30 kA through a tension fitting.",["Limit 70 A/mm².","Area ≥ 30 000/70 = 429 mm²."]]],
bad:[
["Earthing to a spacer in maintenance","Hinges and insulators do not conduct. Spacers are no earthing point."],
["Connecting aluminium directly to copper","Use a bimetal sheet or Al/Cu clamp."],
["Fitting phase spacers to stop galloping","They do not stop it, but reduce clashing and flashovers."],
["Using release clamps for cascades","Mostly abandoned in Europe as unreliable."],
["Bending a turnbuckle","Not allowed: the thread is notch sensitive."],
["Heavy clamp bodies","Light bodies follow vibration and reduce alternating bending."]],
q:[
{t:"s",sec:"10.1",p:"p. 305",q:"Are insulators counted among fittings for insulator sets?",o:["Yes","No, they are excluded","Only glass ones","Only long rods"],a:[1],w:"Connecting parts are included; the insulators are excluded."},
{t:"m",sec:"10.2",p:"p. 305",q:"Which stresses act in a clamp? Select all.",o:["Tensile","Static bending","Compression","Alternating bending"],a:[0,1,2,3],w:"All four superimpose."},
{t:"s",sec:"10.2",p:"p. 306",q:"What suits OPGW suspension best?",o:["Armor grip suspension","Saddle clamp","Wedge clamp","Release clamp"],a:[0],w:"Concentrated force would disturb fibres."},
{t:"n",sec:"10.2",p:"p. 306",q:"Up to how many metres do armor rods spread clamp forces?",a:2.5,tol:.05,u:"m",w:"Up to 2.5 m, depending on cross section."},
{t:"s",sec:"10.2",p:"p. 307",q:"In a suspended dead-end, what is removed?",o:["Static bending","Tension","Insulators","All vibration"],a:[0],w:"Conductors attach by dead-end clamps."},
{t:"s",sec:"10.2",p:"p. 308",q:"How does a wedge clamp grip harder?",o:["Wedge slides in as tension rises","By hydraulic press","Using glue","By heat"],a:[0],w:"Transverse force rises progressively."},
{t:"s",sec:"10.2",p:"p. 308",q:"What needs a hydraulic press?",o:["Wedge clamp","Compression clamp","Preformed rods","Turnbuckle"],a:[1],w:"And no shifting afterwards."},
{t:"x",sec:"10.2",p:"p. 308–309",q:"Match the dead-end to its use.",pairs:[["Preformed rods","Optical aerial cables"],["Compression","All standard conductors"],["Wedge","ACSR with several aluminium layers"]],w:"Each has its field."},
{t:"s",sec:"10.2",p:"p. 310",q:"Damage to 40 % of outer strands needs what?",o:["Nothing","Repair patch rod","Tension-proof connector patch rod","Grease"],a:[2],w:"Repair rods suit up to 25 %."},
{t:"t",sec:"10.2",p:"p. 310",q:"True or false: spacer elements can serve as earthing points.",a:false,w:"They cannot conduct across hinges and insulating parts."},
{t:"n",sec:"10.2",p:"p. 310",q:"Subspans start at 15 m and rise in 5 m steps. Length of the fourth subspan, m?",a:30,tol:.1,u:"m",w:"15, 20, 25, 30."},
{t:"s",sec:"10.2",p:"p. 312",q:"Stockbridge dampers rely on what?",o:["Damped spring-mass oscillation","Corona","Thermal expansion","Friction with air alone"],a:[0],w:"Tuned masses on a messenger cable."},
{t:"s",sec:"10.2",p:"p. 312",q:"One hinge of a spacer damper equals about how much conductor damping?",o:["1 m","10 m","100 m","1000 m"],a:[2],w:"Roughly 100 m."},
{t:"s",sec:"10.3",p:"p. 313",q:"What secures ball and socket connections?",o:["V or W split pins","Welds","Cement","Nothing"],a:[0],w:"Standardised elastic pins."},
{t:"n",sec:"10.4",p:"p. 315",q:"RTS 80 kN. Dead-end minimum hold, kN?",a:68,tol:.1,u:"kN",w:"0.85·80 = 68 kN."},
{t:"n",sec:"10.4",p:"p. 315",q:"RTS 100 kN. Lower slip resistance in usual range, kN?",a:20,tol:.1,u:"kN",w:"20 % of RTS."},
{t:"n",sec:"10.4",p:"p. 314",q:"10 kA fault in a non-tension fitting at 80 A/mm². Minimum area, mm²?",a:125,tol:.5,u:"mm²",w:"10 000/80 = 125 mm²."},
{t:"s",sec:"10.4",p:"p. 314",q:"What rule applies to clamp resistance?",o:["No higher than equal length of conductor","Twice conductor","Any value","Zero only"],a:[0],w:"So it stays no hotter than the conductor."},
{t:"s",sec:"10.4",p:"p. 316",q:"Which test proves the batch quality?",o:["Type test","Sample test","Corona test","None"],a:[1],w:"Random samples from the lot."},
{t:"n",sec:"10.4",p:"p. 314",q:"U<sub>s</sub> = 245 kV. Corona test voltage by formula, kV? One decimal.",a:148.5,tol:.2,u:"kV",w:"1.05·245/√3 = 148.5, rounded to 150 in Table 10.1."}
]});
