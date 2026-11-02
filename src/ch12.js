OHL.add({n:12,lead:"How supports are chosen, shaped, loaded and proved: lattice steel towers in depth, then steel, concrete and wood poles, and tower testing. Printed pages 353 to 466.",
init:function(K){var $=K.$,fmt=K.fmt;
function rng(a,b,n){var o=[];for(var i=0;i<=n;i++)o.push(a+(b-a)*i/n);return o}
K.stepper("fnStep",[["Suspension","Carries conductors in a straight line, no tension in normal service. Light and cheapest, so used wherever possible."],["Angle suspension","Suspension strings at small deflections, 0 to 20°. Mostly up to 110 kV: higher voltages give a poor tower head."],["Angle","Tension sets, carries the resultant, not designed for unequal spans. Rare where icing is heavy."],["Strain, angle-strain","Tension sets, designed for unequal tension. Rigid points against cascades, every 5 to 10 km on long straights."],["Dead-end","Takes full tension from one side. Double circuit with one circuit strung has high torsion."],["Special","Branch-off supports combine functions, and their load cases."]]);
K.stepper("dsgStep",[["Self-supporting lattice","Traditional, for narrow sites, tall and multi-circuit, easily repaired or upgraded, recycled. Hot-dip galvanised."],["Steel poles","Urban and suburban, compact and neat. High foundation cost at high voltage."],["Concrete poles","No maintenance, attractive near homes. Heavy, so short hauls and accessible terrain."],["Wood poles","Where good timber is plentiful. 110 and 220 kV in the Americas and Australia."],["Guyed V or Y","Long single circuit lines in flat or accessible terrain. Protect anchors from machinery."],["Crossarmless chainette","Rope crossarm, least steel, compact, needs wide sites. First on 735 kV in Canada."]]);
K.calc("cmCalc",{f:[{k:"a",l:"Span",min:200,max:900,step:10,v:500,u:"m"},{k:"f",l:"Sag at 40 °C",min:5,max:50,step:.1,v:25.6,u:"m"},{k:"l",l:"Insulator length",min:0,max:8,step:.1,v:4,u:"m"},{k:"z",l:"Height",min:15,max:70,step:1,v:34,u:"m"},{k:"d",l:"Diameter",min:15,max:40,step:.1,v:22.4,u:"mm"},{k:"m",l:"Mass",min:.5,max:3,step:.01,v:.994,u:"kg/m"},{k:"D",l:"Dpp",min:.5,max:6,step:.05,v:2,u:"m"},{k:"r",l:"Relative position",o:[[0,"Range 1, under 30°"],[1,"Range 2, 30 to 80°"],[2,"Range 3, horizontal"]],v:2}],run:function(v,c){
 var q=.58*(800+3*v.z),G=.45+60/v.a,p=Math.atan(q*v.d/1000*G/(v.m*9.81))*180/Math.PI,R=p>65?0:p>55?1:p>40?2:3,kc=[[.95,.75,.70],[.85,.70,.65],[.75,.65,.62],[.70,.62,.60]][R][v.r],C=Math.max(kc*Math.sqrt(v.f+v.l)+.75*v.D,kc);
 K.bars(c,{minw:440,lw:170,u:"m",rows:[["k_c·√(f + l)",kc*Math.sqrt(v.f+v.l),"accent",fmt(kc*Math.sqrt(v.f+v.l),2)+" m"],["k₁·Dpp",.75*v.D,"v1",fmt(.75*v.D,2)+" m"]],aria:"Terms of clearance"});
 return'<span>q<sub>z</sub> = '+fmt(q)+' N/m², swing '+fmt(p,1)+'°, k<sub>c</sub> = '+fmt(kc,2)+'</span><span class="big">C<sub>min</sub> = '+fmt(C,2)+' m</span>'}});
K.calc("asCalc",{f:[{k:"b",l:"Line deflection β",min:0,max:30,step:1,v:10,u:"°"},{k:"T",l:"Tension per subconductor",min:5,max:60,step:1,v:30,u:"kN"},{k:"n",l:"Subconductors",o:[[1,"1"],[2,"2"]],v:1},{k:"g",l:"Conductor weight on the span",min:2,max:20,step:.5,v:6,u:"kN"}],run:function(v){var N=2*v.T*v.n*Math.sin(v.b/2*Math.PI/180),W=v.n*v.g+.3;return'<span class="big">φ = '+fmt(Math.atan(N/W)*180/Math.PI,1)+'°</span><span>Transverse pull '+fmt(N,1)+' kN against weight '+fmt(W,1)+' kN, taking half the insulator set as 0.3 kN.</span>'}});
K.stepper("lpStep",[["1. Actions","Find actions for each load case, from conductors, support type and geometry."],["2. Effects","Compute forces and moments in every member, keeping the maxima."],["3. Rate","Choose materials and sections so that resistance exceeds them."],["4. Repeat","Tower weight and wind area changed, so iterate."]]);
K.stepper("lcStep",[["A","Wind along crossarms, no ice, +5 °C. Legs and face bracings, on suspension and tall angle towers."],["B","Wind in line direction, no ice. Faces parallel to wind on tall towers."],["C","Diagonal wind 45°. Often the highest leg and foundation loads."],["D, E, F","Half wind pressure with ice in three directions. Governs legs at angles over about 40° and dead-ends."],["G","−20 °C, unbalanced ice, uplift cases."],["H","Strain towers only: one full conductor plus two thirds of the others one-sided."],["I","Construction and maintenance, +5 °C. Crossarms and climbable members."],["J","Torsion: one conductor reduced. Governs bracings and crossarm chords."],["K","Longitudinal: all conductors reduced."],["L","One insulator string fails, mainly crossarms."]]);
K.calc("trqCalc",{f:[{k:"t",l:"Support and conductor",o:[[0,"Suspension, single conductor"],[1,"Suspension, bundle, set up to 2.5 m"],[2,"Suspension, bundle, set over 2.5 m"],[3,"Earth wire on suspension"],[4,"Angle, strain, dead-end"]],v:1},{k:"T",l:"Horizontal tension",min:10,max:200,step:5,v:100,u:"kN"}],run:function(v){var J=[50,35,25,65,100][v.t],Kk=[20,20,15,40,40][v.t];return'<span>Load case J: '+J+' % of one conductor: '+fmt(J*v.T/100,1)+' kN</span><span>Load case K: '+Kk+' % of all conductors: '+fmt(Kk*v.T/100,1)+' kN each</span>'}});
K.bars("pfBars",{lw:230,minw:480,max:1.7,rows:[["Wind, level 1",1,"accent"],["Wind, level 2",1.2,"accent"],["Wind, level 3",1.4,"accent"],["Ice, level 2",1.25,"v1"],["Ice, level 3",1.5,"v1"],["Wind, Empirical",1.3,"v3"],["Wind, ice, tension, German",1.35,"v4"],["Construction",1.5,"v5"]],aria:"Partial factors"});
K.calc("bkCalc",{f:[{k:"L",l:"Buckling length",min:500,max:4000,step:50,v:1500,u:"mm"},{k:"i",l:"Radius of gyration",min:7,max:60,step:.5,v:19.5,u:"mm"},{k:"A",l:"Area",min:300,max:13300,step:10,v:1550,u:"mm²"},{k:"f",l:"Steel",o:[[235,"S235"],[355,"S355"]],v:235},{k:"c",l:"Curve",o:[[.49,"c, by calculation"],[.34,"b, tested"]],v:.49}],run:function(v,c){
 function kap(lam,a){var la=Math.PI*Math.sqrt(210000/v.f),l=lam/la,p=.5*(1+a*(l-.2)+l*l);return Math.min(1,1/(p+Math.sqrt(p*p-l*l)))}
 var lam=v.L/v.i,k=kap(lam,v.c),N=k*v.A*v.f/1.1/1000,S=rng(0,200,50);
 K.plot(c,{h:240,x:{min:0,max:200,label:"Slenderness λ"},y:{min:0,max:1.05,label:"Reduction factor κ",ticks:[0,.25,.5,.75,1]},series:[{p:S.map(function(l){return[l,kap(l,.49)]}),c:"v4",t:"Curve c"},{p:S.map(function(l){return[l,kap(l,.34)]}),c:"v1",t:"Curve b"}],marks:[{x:Math.min(lam,200),y:k,t:"κ = "+fmt(k,3)}],aria:"Buckling curve"});
 return'<span>λ = '+fmt(lam,1)+', κ = '+fmt(k,3)+'</span><span class="big">N<sub>Rd</sub> = '+fmt(N)+' kN</span>'}});
K.calc("tnCalc",{f:[{k:"A",l:"Gross area",min:300,max:6000,step:10,v:1550,u:"mm²"},{k:"t",l:"Thickness",min:4,max:20,step:1,v:8,u:"mm"},{k:"d",l:"Hole diameter",min:13,max:32,step:1,v:17,u:"mm"},{k:"n",l:"Holes in the path",min:1,max:6,step:1,v:4,u:""},{k:"s",l:"Sum of s²/(4p) on the path",min:0,max:50,step:.1,v:32.4,u:"mm"},{k:"f",l:"Steel",o:[[235,"S235"],[355,"S355"]],v:235}],run:function(v,c){var fu=v.f===235?360:510,An=v.A-v.n*v.d*v.t+v.s*v.t,Nn=.9*An*fu/1.25/1000,Ng=v.A*v.f/1.1/1000;
 K.bars(c,{minw:440,lw:170,u:"kN",rows:[["Net section",Nn,"accent"],["Gross section",Ng,"v1"]],aria:"Tension resistance"});return'<span>A<sub>net</sub> = '+fmt(An)+' mm²</span><span class="big">N<sub>Rd</sub> = '+fmt(Math.min(Nn,Ng))+' kN</span>'}});
K.calc("blCalc",{f:[{k:"d",l:"Bolt",o:[[12,"M12"],[16,"M16"],[20,"M20"],[24,"M24"],[27,"M27"],[30,"M30"]],v:16},{k:"g",l:"Grade",o:[[400,"4.6"],[500,"5.6"],[800,"8.8"],[1000,"10.9"]],v:500},{k:"n",l:"Shear planes",o:[[1,"1"],[2,"2"]],v:1},{k:"t",l:"Plate thickness",min:4,max:20,step:1,v:8,u:"mm"},{k:"e",l:"End distance e₁",min:15,max:80,step:1,v:35,u:"mm"},{k:"f",l:"Plate steel",o:[[360,"S235"],[510,"S355"]],v:360}],run:function(v,c){
 var d0=v.d+({12:2,16:2,20:2,24:2,27:2,30:2}[v.d]),A=Math.PI*v.d*v.d/4,Fv=.6*v.g*A/1.25/1000*v.n,ab=Math.min(1.2*v.e/d0,1.85*(v.e/d0-.5)),Fb=ab*v.f*v.d*v.t/1.25/1000;
 K.bars(c,{minw:440,lw:150,u:"kN",rows:[["Bolt shear",Fv,"v4"],["Bearing",Fb,"accent"]],aria:"Bolt resistances"});return'<span>α<sub>b</sub> = '+fmt(ab,2)+', d₀ = '+d0+' mm</span><span class="big">'+fmt(Math.min(Fv,Fb),1)+' kN per bolt</span><span class="'+(Fb<Fv?"good":"warn")+'">'+(Fb<Fv?"Bearing governs: holes yield first":"Bolt shear governs: check ductility")+'</span>'}});
K.calc("rdCalc",{f:[{k:"N",l:"Leg force",min:50,max:3000,step:10,v:800,u:"kN"},{k:"l",l:"Leg slenderness",min:10,max:120,step:1,v:60,u:""}],run:function(v){var K2=Math.min(2,Math.max(1,(v.l+32)/60)),h=K2/100*v.N;return'<span>K = '+fmt(K2,2)+'</span><span class="big">N<sub>hyp</sub> = '+fmt(h,1)+' kN</span>'}});
K.calc("dfCalc",{f:[{k:"P",l:"Characteristic top force",min:10,max:200,step:5,v:60,u:"kN"},{k:"H",l:"Height",min:20,max:80,step:1,v:40,u:"m"},{k:"A",l:"Leg area",min:1000,max:8000,step:100,v:3000,u:"mm²"},{k:"b",l:"Mean width",min:1,max:6,step:.1,v:3,u:"m"},{k:"j",l:"Leg joints",min:1,max:10,step:1,v:5,u:""}],run:function(v){var I=4*v.A*Math.pow(v.b*1000/2,2),fd=v.P*1000*Math.pow(v.H*1000,3)/(3*.9*210000*I)/1000,ang=.004/v.b,Sh=0;for(var i=1;i<=v.j;i++)Sh+=v.H*i/v.j;var fs=ang*Sh;return'<span>Elastic: '+fmt(fd,2)+' m</span><span>Joint slip: '+fmt(fs,2)+' m</span><span class="big">'+fmt(fd+fs,2)+' m</span><span>'+fmt((fd+fs)/v.H*100,1)+' % of height</span>'}});
var KP={8:[6.16,4.83],12:[21.39,11.2],16:[51.22,20.11]};
K.calc("plCalc",{f:[{k:"n",l:"Sides",o:[[8,"8"],[12,"12"],[16,"16"]],v:12},{k:"b",l:"Side width b",min:50,max:400,step:5,v:133,u:"mm"},{k:"t",l:"Wall",min:3,max:16,step:1,v:6,u:"mm"},{k:"f",l:"Steel",o:[[235,"S235"],[355,"S355"]],v:355}],run:function(v){var I=KP[v.n][0]*Math.pow(v.b,3)*v.t,lim=v.f===235?42:34,r=v.b/v.t,ok=r<=lim;return'<span>I = '+fmt(I/1e8,2)+'·10⁸ mm⁴</span><span class="big '+(ok?"good":"bad")+'">b/t = '+fmt(r,1)+'</span><span>'+(ok?"No local buckling hazard":"Use effective section, limit "+lim)+'</span>'}});
K.calc("ccCalc",{f:[{k:"S",l:"Horizontal force",min:1,max:50,step:1,v:10,u:"kN"},{k:"h",l:"Lever arm above ground",min:5,max:30,step:.5,v:14,u:"m"},{k:"L",l:"Pole length above ground",min:6,max:40,step:.5,v:15,u:"m"}],run:function(v){return'<span class="big">S<sub>H</sub> = '+fmt(v.S*v.h/v.L,1)+' kN</span>'}});
K.calc("wdCalc",{f:[{k:"P",l:"Top force",min:.5,max:10,step:.1,v:2,u:"kN"},{k:"Q",l:"Wind on pole",min:0,max:3,step:.1,v:.5,u:"kN"},{k:"h",l:"Height",min:5,max:20,step:.5,v:10,u:"m"},{k:"d",l:"Diameter at ground",min:150,max:400,step:5,v:250,u:"mm"}],run:function(v){var M=v.P*v.h+v.Q*v.h/2,W=Math.PI*Math.pow(v.d,3)/32,s=M*1e6/W,I=Math.PI*Math.pow(v.d,4)/64,f=(v.P/3+v.Q/8)*1000*Math.pow(v.h*1000,3)/(10000*I);return'<span>M = '+fmt(M,1)+' kN·m</span><span class="big">σ = '+fmt(s,1)+' N/mm²</span><span>Deflection '+fmt(f)+' mm, '+fmt(f/(v.h*10),1)+' % of height</span>'}});
K.stepper("tstStep",[["Design or acceptance","Design: prototype to design load or failure. Acceptance: production sample to design load."],["Foundations and material","Rigid base, representative steel, mill or coupon reports."],["Assembly","As specified, plumb within about 3 % of height, 0.5 m at most."],["Load points","Same degrees of freedom as in service. Ropes adjusted as the tower deflects."],["Record","Load cells near attachment, deflections and strain gauges."],["Pass","Design loads held one minute with no failure. Slight bowing of tension members, or ovalised holes in under half a joint, are not failures."],["Destruction","Optional, in 5 % steps, to find reserves."]]);
K.bars("tstBars",{lw:100,minw:420,u:"%",max:100,rows:[["Step 1",50],["Step 2",75],["Step 3",90],["Step 4",95],["Step 5",100,"v4"]],aria:"Load steps"});
},
cards:[
["Suspension support","Carries conductors in a straight line. Lightest.","p. 354"],
["Angle suspension support","Suspension strings at deflections of 0 to 20°.","p. 355"],
["Angle support","Tension sets, no design for unequal spans.","p. 355"],
["Strain support","Rigid point against cascades.","p. 355–356"],
["Dead-end support","Full one-sided tension.","p. 356"],
["Chainette","Crossarmless guyed tower, first at 735 kV.","p. 360"],
["Phase span","The maximum span a tower family is designed for.","p. 362"],
["k₁","Reduces clearances under wind. 0.75 to 1.00.","p. 361"],
["1 % of span","Phase spacing for spans over 1000 m.","p. 363"],
["Three goals","Reliability, security, safety.","p. 367"],
["Effect of action","Internal forces and moments from loads.","p. 367–368"],
["Load case C","Diagonal wind, often highest leg load.","p. 371"],
["Load case J","Torsion by reducing one conductor.","p. 371–372"],
["General and Empirical","Factors on actions, or on their effects.","p. 373"],
["Plate slenderness","Leg width over thickness; reduction above 17 (S235) and 13.8 (S355).","p. 398"],
["Buckling curve c","Angle sections by calculation, α = 0.49.","p. 400"],
["Staggered bracing","Slenderness 1.2·L/i<sub>yy</sub>.","p. 401"],
["Flexural torsional buckling","Twist with bending at low slenderness in thin angles.","p. 407"],
["Net section factor","0.9·A<sub>net</sub>·f<sub>u</sub>/1.25.","p. 413"],
["Bearing resistance","Borehole face strength, Eq. 12.106.","p. 416"],
["Redundant member","Cuts buckling length, sized on 1 to 2 % of force.","p. 417"],
["0.5 m rule","Increase of deflection above everyday value.","p. 418"],
["Duplex","Galvanising plus paint, over double life.","p. 379"],
["Slip joint","Pole sections pushed together, overlap 1.5 diameters.","p. 442"],
["Second order moment","Increase from deflection of the pole.","p. 443"],
["Characteristic pole load","Equivalent force at 0.25 m below top.","p. 452"],
["Proof test","Static full size test on rigid foundations.","p. 461"]],
fm:[
["C<sub>min</sub> = k<sub>c</sub>·√(f + l) + k₁·D<sub>pp</sub>","Midspan spacing.","12.1, p. 361"],
["φ<sub>c</sub> = tan⁻¹[q<sub>z</sub>·d·G<sub>xc</sub>·C<sub>c</sub>/(m·g)]","Conductor swing.","12.4, p. 362"],
["φ = tan⁻¹[(Q<sub>WC</sub> + 0.5Q<sub>Wins</sub>)/(W<sub>c</sub> + 0.5W<sub>ins</sub>)]","Insulator swing.","12.7, p. 365"],
["E<sub>d</sub> ≤ R<sub>d</sub> = R<sub>K</sub>/γ<sub>M</sub>","Verification.","12.15, p. 369"],
["N<sub>Rd</sub> = κ·A<sub>eff</sub>·f<sub>y</sub>/γ<sub>M</sub>","Compression.","12.60, p. 399"],
["κ = 1/(Φ + √(Φ² − λ̄²))","Reduction factor.","12.63, p. 400"],
["Φ = 0.5[1 + α(λ̄ − 0.2) + λ̄²]","Auxiliary value.","12.64, p. 400"],
["λ<sub>vi</sub> = 5·b/t","Equivalent slenderness, EN approximation.","12.81, p. 408"],
["N<sub>Rd</sub> = 0.9·A<sub>net</sub>·f<sub>u</sub>/γ<sub>M</sub>","Tension at connection.","12.94, p. 413"],
["F<sub>v</sub> = 0.6·f<sub>ub</sub>·A/γ<sub>M</sub>","Bolt shear per plane.","12.104, p. 415"],
["N<sub>hyp</sub> = K·N<sub>d</sub>/100","Redundant member force.","12.115, p. 417"],
["f = P·L³/(3EI)","Cantilever deflection.","12.118, p. 419"],
["I = 4A·(b/2 − e)²","Tower stiffness.","p. 419"],
["M<sub>II</sub> = 1.05·M<sub>I</sub>","Second order shortcut, suspension poles.","p. 443"],
["S<sub>H</sub> = ΣS<sub>Hi</sub>·h<sub>i</sub>/L<sub>M</sub>","Characteristic pole load.","12.141, p. 452"],
["σ = N/A + M/W","Wood pole.","12.145, p. 460"]],
wx:[
["Phase spacing, 220 kV","Twin 264-AL1/34-ST1A, a = 500 m, f = 25.6 m, l = 4 m, z = 34 m, Dpp = 2.0 m.",["q<sub>z</sub> = 0.58·(800 + 3·34) = 523 N/m².","G<sub>xc</sub> = 0.45 + 60/500 = 0.57.","φ = tan⁻¹(523·0.0224·0.57/(0.994·9.81)) = 34.4°.","k<sub>c</sub> = 0.60, horizontal plane.","C<sub>min</sub> = 0.6·√29.6 + 0.75·2.0 = 4.76 m."]],
["Net section","L100 × 8, A = 1550 mm², holes 17 mm.",["Section I: 1550 − 2·17·8 = 1278 mm².","Section II: 1550 − 4·17·8 + 2·40²·8/(4·30) + 40²·8/(4·70) = 1265 mm².","Section III: 1294 mm².","Governing: 1265 mm², S235: 0.9·1265·360/1.25 = 328 kN."]],
["Buckling","S235, L = 1500 mm, i = 19.5 mm, A = 1550 mm².",["λ = 76.9, λ̄ = 76.9/93.9 = 0.819.","Φ = 0.5·[1 + 0.49·0.619 + 0.67] = 0.986.","κ = 1/(0.986 + √(0.972 − 0.67)) = 0.65.","N<sub>Rd</sub> = 0.65·1550·235/1.1 = 215 kN."]],
["Redundant","Leg 1000 kN, λ = 88.",["K = 120/60 = 2.0.","N<sub>hyp</sub> = 20 kN."]]],
bad:[
["Assuming suspension towers carry conductor tension normally","Only under unbalanced or broken conditions."],
["Using angle towers in heavy ice areas","They are not designed for unequal spans; use angle-strain."],
["Adding factors on both action and effect","General Approach factors actions, Empirical factors effects."],
["Assuming a redundant cures everything","Cutting buckling length does not help tension or torsional buckling."],
["Ignoring slip","4 mm per joint can matter for deflection."],
["Using 8.8 bolts as stronger is better","Then angle sections deform; use bearing behaviour knowingly."],
["Using grades 5.8 and 6.8","Not permitted in Central Europe, low ductility."],
["Assuming the added angle shares load equally","The old leg stays preloaded, carrying more."],
["Punching heavy tension members","Hardened edges later flaw; drill them."],
["Testing as if it proves in-service behaviour","Tests are static on rigid bases."]],
q:[
{t:"s",sec:"12.1",p:"p. 354",q:"Which support is the most favourable in cost?",o:["Suspension","Strain","Dead-end","Branch-off"],a:[0],w:"No tension load in normal service."},
{t:"s",sec:"12.1",p:"p. 356",q:"How often should strain supports appear on long straights?",o:["Every 500 m","Every 5 to 10 km","Every 100 km","Never"],a:[1],w:"As rigid points."},
{t:"x",sec:"12.1",p:"p. 355–356",q:"Match the support to its feature.",pairs:[["Angle suspension","Suspension strings at small angles"],["Angle","Tension sets, not for unequal tension"],["Strain","Rigid point against cascades"],["Dead-end","Full tension from one side"]],w:"By function."},
{t:"s",sec:"12.1",p:"p. 358",q:"What is the main drawback of concrete poles?",o:["High weight","Corrosion","Paint","Sparks"],a:[0],w:"Transport and erection are limited."},
{t:"n",sec:"12.2",p:"Eq. 12.1, p. 361",q:"k<sub>c</sub> = 0.6, f = 20 m, l = 5 m, k₁·Dpp = 2.4 m. C<sub>min</sub>, m?",a:5.4,tol:.02,u:"m",w:"0.6·5 + 2.4 = 5.4 m."},
{t:"n",sec:"12.2",p:"p. 362",q:"q₀ = 800, z = 40 m. German three-year wind pressure, N/m²?",a:533,tol:1,u:"N/m²",w:"0.58·(800 + 120) = 533."},
{t:"n",sec:"12.2",p:"p. 363",q:"Span 1200 m. Phase spacing by 1 %, m?",a:12,tol:.05,u:"m",w:"Eq. 12.1 is not used beyond 1000 m."},
{t:"s",sec:"12.2",p:"p. 366",q:"What jumper loop swing has proved sufficient?",o:["10°","30°","60°","90°"],a:[1],w:"30°, because of short length and stiffness."},
{t:"m",sec:"12.3",p:"p. 367",q:"Which are EN 50341-1 goals? Select all.",o:["Reliability","Security","Safety","Beauty"],a:[0,1,2],w:"Three requirements."},
{t:"t",sec:"12.3",p:"p. 368",q:"True or false: static design is iterative.",a:true,w:"Dead weight and wind area depend on the result."},
{t:"s",sec:"12.4",p:"p. 371",q:"Which case often gives the highest leg forces?",o:["A","B","C","I"],a:[2],w:"Diagonal wind."},
{t:"n",sec:"12.4",p:"p. 372",q:"Suspension, bundle, set 3 m, tension 80 kN. Load case J reduction, kN?",a:20,tol:.05,u:"kN",w:"25 %."},
{t:"n",sec:"12.4",p:"p. 372",q:"Angle tower, tension 100 kN. One-sided J load, kN?",a:100,tol:.05,u:"kN",w:"100 %."},
{t:"n",sec:"12.4",p:"p. 372",q:"Ice with wind in load case D: share of dynamic pressure?",a:50,tol:.5,u:"%",w:"Reduced by 50 %."},
{t:"s",sec:"12.4",p:"Table 12.3, p. 374",q:"EN General level 3 wind factor?",o:["1.0","1.2","1.4","1.5"],a:[2],w:"1.0, 1.2, 1.4."},
{t:"n",sec:"12.5",p:"p. 379",q:"Zinc 80 μm, 8 μm/year. Years to loss?",a:10,tol:.05,u:"years",w:"80/8 = 10, within the book's 10 to 15 year guide."},
{t:"n",sec:"12.5",p:"Eq. 12.61, p. 400",q:"λ<sub>a</sub> for S235, whole number?",a:94,tol:.5,u:"",w:"π√(210000/235) = 93.9."},
{t:"n",sec:"12.5",p:"Eq. 12.66, p. 401",q:"L = 2000 mm, i = 20 mm. λ?",a:100,tol:.1,u:"",w:"2000/20."},
{t:"s",sec:"12.5",p:"p. 400",q:"Which curve applies by calculation?",o:["a","b","c","d"],a:[2],w:"Curve c, α = 0.49."},
{t:"n",sec:"12.5",p:"Eq. 12.94, p. 413",q:"A<sub>net</sub> = 1000 mm², S235 (360 N/mm²). N<sub>Rd</sub>, kN?",a:259,tol:1,u:"kN",w:"0.9·1000·360/1.25 = 259 kN."},
{t:"n",sec:"12.5",p:"Eq. 12.104, p. 415",q:"M16 grade 5.6 in single shear, shank area 201 mm². F<sub>v</sub>, kN? One decimal.",a:48.2,tol:.3,u:"kN",w:"0.6·500·201/1.25 = 48.2 kN."},
{t:"n",sec:"12.5",p:"Eq. 12.115, p. 417",q:"λ = 28, leg 900 kN. N<sub>hyp</sub>, kN?",a:9,tol:.05,u:"kN",w:"K = 1, so 1 %."},
{t:"n",sec:"12.5",p:"p. 418",q:"Deflection under everyday load 0.3 m. Highest under maximum, m?",a:.8,tol:.01,u:"m",w:"0.3 + 0.5."},
{t:"s",sec:"12.5",p:"p. 423",q:"Which reinforcement is preferred for added leg angles?",o:["Welding","Fitted bolts","Glue","Black bolts"],a:[1],w:"Fitted bolts keep movement low without harming zinc."},
{t:"n",sec:"12.6",p:"p. 445",q:"Polygonal S355, b = 170 mm, t = 5 mm. b/t? Is it over the limit? Enter b/t.",a:34,tol:.05,u:"",w:"Exactly at the 34 limit."},
{t:"n",sec:"12.6",p:"p. 447",q:"Suspension pole 30 m. Deflection limit, m?",a:1.2,tol:.01,u:"m",w:"4 %."},
{t:"s",sec:"12.7",p:"p. 449",q:"How do spun poles avoid cracks under load?",o:["Prestress","Paint","Grease","Thin walls"],a:[0],w:"Compression must be overcome first."},
{t:"n",sec:"12.8",p:"Eq. 12.144, p. 460",q:"P = 2 kN, h = 10 m, wind 0.5 kN, pole 10 m. M at ground, kN·m?",a:22.5,tol:.05,u:"kN·m",w:"20 + 2.5."},
{t:"n",sec:"12.9",p:"p. 464",q:"Design load holds at 100 %. How long minimum, in minutes?",a:1,tol:0,u:"min",w:"One minute."},
{t:"s",sec:"12.9",p:"p. 464",q:"Which is not a failure?",o:["Slight bow of tension-only member","Collapse","Bolt shearing","Leg buckling"],a:[0],w:"Also minor ovalisation."}
]});
