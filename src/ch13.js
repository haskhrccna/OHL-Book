OHL.add({n:13,lead:"Reading the ground, choosing a foundation, checking it for bearing, overturning and uplift, and proving it by test. Printed pages 471 to 534.",
init:function(K){var $=K.$,fmt=K.fmt;
function rng(a,b,n){var o=[];for(var i=0;i<=n;i++)o.push(a+(b-a)*i/n);return o}
K.calc("szCalc",{f:[{k:"e",l:"Particle size (log scale slider)",min:-3,max:2.6,step:.05,v:0,u:"log₁₀ mm"}],run:function(v){var s=Math.pow(10,v.e),n=s>200?"Boulders":s>63?"Stones":s>2?"Gravel":s>.06?"Sand":s>.002?"Silt":"Clay",c=s>.06?"Non-cohesive":"Cohesive";return'<span class="big">'+n+'</span><span>'+fmt(s,3)+' mm, '+c+'</span>'}});
K.calc("dpCalc",{f:[{k:"t",l:"Foundation depth",min:1,max:10,step:.1,v:3,u:"m"},{k:"b",l:"Largest horizontal size",min:1,max:10,step:.1,v:3,u:"m"},{k:"l",l:"Loading",o:[["u","Uplift"],["c","Compression"]],v:"c"}],run:function(v){var d=v.l==="u"?v.t:Math.min(Math.max(1.1*v.t,v.b+v.t),v.t+3);return'<span class="big">'+fmt(d,1)+' m</span>'}});
K.stepper("toolStep",[["Trial pits","Simple, but slow and costly. See the layers above water."],["Exploratory borings","Auger 300 to 500 mm to 7 m. Worm 100 to 150 mm to 12 m. Leave open hours for water level."],["Drilling probes","Grooved rod giving continuous profile. Not in sand under water."],["Driven probes","DPL 10 kg, DPM 30 kg, DPH 50 kg. Blows per 0.1 m. Only compactness, and non-cohesive."],["SPT","63.2 kg falling 0.76 m. Blows for 0.30 m after 0.15 m. 10 to 30 is medium dense, 8 to 15 stiff."],["Vane","Shear strength in soft saturated cohesive soils."],["Gouda cone","Pressed in, gives point pressure and skin friction every 0.2 m. Direct use for pile lengths."]]);
K.calc("cptCalc",{f:[{k:"q",l:"Point pressure q<sub>s</sub>",min:.5,max:35,step:.5,v:10,u:"MN/m²"},{k:"f",l:"Local skin friction f<sub>s</sub>",min:.01,max:.4,step:.01,v:.08,u:"MN/m²"}],run:function(v){var R=v.f/v.q*100,t=R>6?"Peat":R>2.5?"Cohesive":R>1?"Mixed particle":"Non-cohesive",c=v.q<2.5?"very loose":v.q<7.5?"loose":v.q<15?"medium dense":v.q<25?"dense":"very dense";return'<span class="big">R<sub>f</sub> = '+fmt(R,1)+' %, '+t+' soil</span><span>If uniform sand: '+c+'. E<sub>s</sub> ≈ '+fmt(1.5*v.q,0)+' to '+fmt(3*v.q,0)+' MN/m²</span>'}});
var S=[["Sand, loose",17,9,30,200,320,3.5],["Soft, purely cohesive",18,9,15,40,65,2],["Firm, purely cohesive",18,9,17.5,100,160,2.5],["Stiff, purely cohesive",18,10,22.5,200,320,3],["Stiff, with non-cohesive additions",19,11,25,200,320,3.5],["Hard, purely cohesive",18,0,27.5,400,640,3.5],["Hard, with non-cohesive additions",19,0,30,400,640,4]];
K.calc("soilCalc",{f:[{k:"i",l:"Soil",o:S.map(function(r,i){return[i,r[0]]}),v:4},{k:"t",l:"Depth",min:1.5,max:8,step:.1,v:3.2,u:"m"}],run:function(v,c){var r=S[v.i],p=r[4]+(v.t-1.5)*r[1]*r[6],u=r[5]+1.6*(v.t-1.5)*r[1]*r[6];
 K.bars(c,{minw:440,lw:190,u:"kN/m²",rows:[["At 1.5 m, permissible",r[4],"v1"],["At depth, permissible",p,"accent"],["At 1.5 m, ultimate",r[5],"v3"],["At depth, ultimate",u,"v4"]],aria:"Bearing pressure"});return'<span>γ = '+r[1]+' kN/m³, φ = '+r[3]+'°, κ = '+r[6]+'</span>'}});
K.stepper("ftStep",[["Monoblock","Compact, medium voltage, poles and narrow towers. Earth lateral resistance helps. Uneconomic for wide lattice towers."],["Monoblock with enlarged base","Soil that will not stand, high water, or heavy loads."],["Slab","Reinforced mat under all four legs. Shallow, for high water and fair soil, or very high leg forces."],["Single grillage","Timber or steel sleepers, where concrete is costly."],["Single pile","Tube around a pole, for weak top layers."],["Separate stepped block","Each leg its own footing, towers at least 3.5 m wide. The usual choice from 110 kV."],["Auger-bored","Fast in dry cohesive soils, needs a rig."],["Grillage","Steel only, 2 to 4 m deep, backfill essential."],["Piles","Driven steel, grouted, in-situ or precast, or drilled, for water and weak soil. Up to 40 m."],["Rock anchors","Grouted in sound rock."]]);
K.calc("mbCalc",{f:[{k:"b",l:"Width",min:.6,max:3,step:.05,v:1.5,u:"m"},{k:"t",l:"Depth",min:1,max:4,step:.05,v:2,u:"m"},{k:"M",l:"Moment",min:20,max:300,step:1,v:80,u:"kN·m"},{k:"H",l:"Horizontal force",min:2,max:40,step:.5,v:10,u:"kN"},{k:"p",l:"Permissible pressure",min:50,max:400,step:10,v:200,u:"kN/m²"}],run:function(v,c){var h=v.M/v.H,s=12*v.M*(h+2/3*v.t)/(h*v.b*v.t*v.t),Mp=v.p*v.t*v.t*v.b*h/(12*(h+2/3*v.t));
 K.bars(c,{minw:440,lw:170,u:"kN/m²",rows:[["Pressure",s,s<=v.p?"accent":"v4",fmt(s)+" kN/m²"],["Permissible",v.p,"v1"]],aria:"Pressure check"});return'<span>Virtual height h = '+fmt(h,1)+' m</span><span>M<sub>perm</sub> = '+fmt(Mp,1)+' kN·m</span><span class="'+(s<=v.p?"good":"bad")+'">'+(s<=v.p?"Passes":"Fails")+'</span>'}});
K.calc("slCalc",{f:[{k:"bx",l:"Slab width",min:4,max:14,step:.1,v:8,u:"m"},{k:"N",l:"Vertical load",min:800,max:6000,step:10,v:2709,u:"kN"},{k:"Mx",l:"M<sub>x</sub>",min:0,max:12000,step:1,v:2402,u:"kN·m"},{k:"My",l:"M<sub>y</sub>",min:0,max:12000,step:1,v:7251,u:"kN·m"},{k:"s",l:"Ultimate bearing",min:100,max:800,step:.1,v:346.6,u:"kN/m²"}],run:function(v,c){
 var ex=v.Mx/v.N,ey=v.My/v.N,g=1/(2*Math.hypot(ex/v.bx,ey/v.bx)),b1=v.bx-2*ex,b2=v.bx-2*ey,Nr=b1>0&&b2>0?v.s*b1*b2/1.2:0,W=240,sc=200/v.bx,cx=120,cy=120,rx=v.bx/(2*1.2)*sc,ok=g>=1.2&&Nr>=1.35*v.N;
 $(c).innerHTML='<div style="max-width:320px;margin:auto"><svg class="c" viewBox="0 0 240 240" role="img" aria-label="Slab plan with resultant"><rect x="20" y="20" width="200" height="200" fill="var(--sunk)" stroke="var(--muted)"/><ellipse cx="'+cx+'" cy="'+cy+'" rx="'+rx+'" ry="'+rx+'" fill="none" stroke="var(--accent)" stroke-dasharray="5 4"/><path d="M20 120H220M120 20V220" class="gr"/><circle cx="'+Math.min(235,cx+ex*sc)+'" cy="'+Math.max(5,cy-ey*sc)+'" r="6" fill="var(--live)"/></svg></div>';
 return'<span>e<sub>x</sub> = '+fmt(ex,2)+' m, e<sub>y</sub> = '+fmt(ey,2)+' m</span><span class="big '+(g>=1.2?"good":"bad")+'">γ<sub>M</sub> = '+fmt(g,2)+'</span><span>Bearing resistance '+fmt(Nr)+' kN against 1.35·N = '+fmt(1.35*v.N)+' kN</span><span class="'+(ok?"good":"bad")+'">'+(ok?"Passes both":"Check fails")+'</span>'}});
K.calc("frCalc",{f:[{k:"m",l:"Type",o:[["a","Block, Type A"],["b","Auger-bored"]],v:"a"},{k:"b",l:"Base width",min:1.2,max:5,step:.05,v:3,u:"m"},{k:"T",l:"Frustum depth",min:1.5,max:7,step:.05,v:2.95,u:"m"},{k:"lo",l:"β₀ at large width",min:10,max:35,step:1,v:17,u:"°"},{k:"hi",l:"β₀ at small width",min:10,max:46,step:1,v:26,u:"°"},{k:"G",l:"Concrete weight",min:50,max:500,step:1,v:252,u:"kN"},{k:"V",l:"Volume of concrete in soil",min:1,max:30,step:.1,v:8.9,u:"m³"},{k:"E",l:"Characteristic uplift",min:100,max:2000,step:1,v:658,u:"kN"},{k:"g",l:"Soil weight",min:12,max:22,step:.5,v:19,u:"kN/m³"}],run:function(v,c){
 var bL=v.m==="a"?5:2.1,bS=v.m==="a"?1.5:1.2,b0=v.lo+(v.hi-v.lo)*(bL-v.b)/(bL-bS);b0=Math.max(Math.min(v.lo,v.hi),Math.min(Math.max(v.lo,v.hi),b0));var r=v.b/v.T,be=r>=1?b0:b0*Math.sqrt(r);be=Math.min(be,35);var B=v.b+2*v.T*Math.tan(be*Math.PI/180),A=v.m==="a"?(B*B+B*v.b+v.b*v.b):(B*B+B*v.b+v.b*v.b)*.785,Vf=v.T/3*A-v.V,Ws=Vf*v.g,R=Ws+v.G,W=640,sc=Math.min(260/B,160/v.T)*1,x0=320;
 var h='<path d="M0 30H640" stroke="var(--ink)" stroke-width="2"/><path d="M'+(x0-B/2*sc)+' 30L'+(x0-v.b/2*sc)+' '+(30+v.T*sc)+'H'+(x0+v.b/2*sc)+'L'+(x0+B/2*sc)+' 30Z" fill="var(--accent)" opacity=".18" stroke="var(--accent)"/><rect x="'+(x0-v.b/2*sc)+'" y="'+(30+v.T*sc-14)+'" width="'+(v.b*sc)+'" height="14" fill="var(--muted)"/><rect x="'+(x0-.5*sc)+'" y="24" width="'+(1*sc)+'" height="'+(v.T*sc-8)+'" fill="var(--muted)"/>';
 $(c).innerHTML='<div class="scroll"><div style="min-width:440px"><svg class="c" viewBox="0 0 '+W+' '+(50+v.T*sc)+'" role="img" aria-label="Earth frustum section">'+h+'</svg></div></div>';
 var f=R/v.E;return'<span>β = '+fmt(be,2)+'°, top width '+fmt(B,2)+' m</span><span>Soil '+fmt(Ws)+' kN, resistance '+fmt(R)+' kN</span><span class="big '+(f>=1.5?"good":"bad")+'">R/E = '+fmt(f,2)+'</span><span class="small">Characteristic check needs at least 1.5.</span>'}});
K.calc("blCalc",{f:[{k:"P",l:"Force",min:5,max:200,step:.5,v:29.5,u:"kN"},{k:"h",l:"Lever arm to bearing soil",min:1,max:20,step:.1,v:11,u:"m"},{k:"d",l:"Pile diameter",min:.2,max:2,step:.01,v:.762,u:"m"},{k:"f",l:"f<sub>w</sub>",min:10,max:80,step:.5,v:30,u:"kN/m³"}],run:function(v){
 var c=6*(v.P+1.2)/v.f,x=1;for(var i=0;i<60;i++){x=x-(x*x*x+3*v.d*x*x-c)/(3*x*x+6*v.d*x)}
 var Rhs=4*x*x*(x+3*v.d),t0=2;for(i=0;i<200;i++){var F=t0*t0*t0*(t0+4*v.d)/(t0+v.h)-Rhs,D=(Math.pow(t0+.001,3)*(t0+.001+4*v.d)/(t0+.001+v.h)-Rhs-F)/.001;t0-=F/D}
 var M=v.P*(v.h+x)-v.f*(v.d*x*x*x/6+Math.pow(x,4)/24);return'<span>x<sub>m</sub> = '+fmt(x,2)+' m</span><span>t₀ = '+fmt(t0,2)+' m</span><span class="big">t = '+fmt(1.2*t0,2)+' m</span><span>M<sub>max</sub> ≈ '+fmt(M)+' kN·m</span>'}});
K.plot("tgChart",{h:230,x:{min:0,max:40,label:"Displacement, mm"},y:{min:0,max:60,label:"Load, kN"},series:[{p:rng(0,40,40).map(function(d){return[d,48*(1-Math.exp(-d/6))+.2*d]}),c:"accent",t:"Load test"},{p:[[0,0],[6,48]],c:"v4",t:"Elastic tangent",dash:true},{p:[[0,41.5],[40,49.5]],c:"v1",t:"Plastic tangent",dash:true}],marks:[{x:5.2,y:41.5,t:"Capacity"}],aria:"Tangent intersection"});
K.calc("clCalc",{f:[{k:"b",l:"Foundation width or pile diameter",min:.3,max:5,step:.1,v:3,u:"m"},{k:"t",l:"Depth",min:1,max:8,step:.1,v:3.2,u:"m"}],run:function(v){return'<span>Footing: C<sub>L</sub> = '+fmt(v.b+.7*v.t,2)+' m</span><span>Pile: C<sub>L</sub> = '+fmt(Math.max(3*v.b,2),2)+' m</span>'}});
},
cards:[
["Loose soil","Natural pile of mineral grains separable without force.","p. 473"],
["Cohesive soil","Particles under 0.06 mm: silt and clay.","p. 474"],
["Non-cohesive soil","Particles over 0.06 mm: sand, gravel, stones.","p. 474"],
["Organic soil","Over 3 % or 5 % organics, poor bearing.","p. 475"],
["Residual soil","Stays where rock weathered, generally firm.","p. 474"],
["Investigation depth","1.1 × depth, or width + depth, up to 3 m below base.","p. 475"],
["Quality classes","1 to 5; class 4 or 5 samples suffice for lines.","p. 476"],
["SPT","63.2 kg, 0.76 m, count n₃₀.","p. 480"],
["Gouda probe","Measures point pressure and skin friction.","p. 480"],
["Friction ratio","R<sub>f</sub> = f<sub>s</sub>/q<sub>s</sub>, identifies soil.","p. 480–481"],
["Subgrade modulus","K<sub>s</sub> = 1.4·E<sub>s</sub>/d.","p. 481"],
["Limit resistance","Load beyond which a foundation fails.","p. 488"],
["Compact foundation","One body taking moments.","p. 490"],
["Separate foundation","Footing per leg taking axial forces.","p. 502–503"],
["Earth frustum angle","Stands in for shear resistance under uplift.","p. 504"],
["Type A block","Bottom step concreted to soil.","p. 503"],
["Type S block","Concreted to planking, for poor ground.","p. 503"],
["n ≥ 1.4","Height over projection of an unreinforced step.","p. 505"],
["Auger-bored foundation","Dry drilling, base bell, vertical shaft.","p. 507"],
["Grillage","Steel pyramid foundation, soil compaction key.","p. 511"],
["Blum method","Pile embedment from a plastic failure model.","p. 501"],
["Negative skin friction","Settling upper soil drags a pile down.","p. 513"],
["Proof test","60 to 75 % of design load on production foundation.","p. 527"],
["Tangent intersection","Load capacity from two tangents.","p. 531"]],
fm:[
["σ<sub>t</sub> = σ₁.₅ + (t − 1.5)·γ·κ","Permissible pressure at depth.","13.4, p. 490"],
["σ<sub>t</sub> = σ₁.₅ + 1.6(t − 1.5)·γ·κ","Ultimate.","13.5, p. 490"],
["σ = 12M(h + 2t/3)/(h·b·t²)","Monoblock lateral pressure.","13.12, p. 493"],
["M<sub>perm</sub> = σ·t²·b·h/[γ<sub>M</sub>·12(h + 2t/3)]","Moment.","13.13, p. 493"],
["γ<sub>M</sub> = 1/(2√((e<sub>x</sub>/b<sub>x</sub>)² + (e<sub>y</sub>/b<sub>y</sub>)²))","Overturning.","13.14, p. 494"],
["N ≤ σ(b<sub>x</sub> − 2e<sub>x</sub>)(b<sub>y</sub> − 2e<sub>y</sub>)/γ<sub>M</sub>","Bearing.","13.15, p. 494"],
["k<sub>p</sub> = tan²(45 + φ/2)","Passive earth pressure, flat ground, no wall friction.","13.16, p. 500"],
["x<sub>m</sub>³ + 3d·x<sub>m</sub>² = 6P/f<sub>w</sub>","Depth of maximum moment.","13.19, p. 501"],
["t₀³(t₀ + 4d)/(t₀ + h) = 4x<sub>m</sub>²(x<sub>m</sub> + 3d)","Blum embedment.","13.21, p. 502"],
["β = β₀·√(b/T)","Earth frustum angle.","13.23, p. 504"],
["R<sub>K</sub>/E<sub>K</sub> ≥ 1.5","Uplift, characteristic, German.","p. 505"],
["C<sub>L</sub> = b + 0.7·t","Clear distance of supports.","13.37, p. 529"]],
wx:[
["Monoblock","b = 1.5 m, t = 2.0 m, M = 80 kN·m, H = 10 kN, 200 kN/m².",["h = 80/10 = 8.0 m.","σ = 12·80·(8 + 1.33)/(8·1.5·4) = 187 kN/m².","Under 200 kN/m².","M<sub>perm</sub> = 85.7 kN·m."]],
["Slab","8 × 8 m, N = 2709 kN, M<sub>x</sub> = 2402, M<sub>y</sub> = 7251 kN·m.",["e<sub>x</sub> = 0.89 m, e<sub>y</sub> = 2.68 m.","γ<sub>M</sub> = 1/(2√(0.111² + 0.335²)) = 1.42.","σ<sub>ult</sub> at 1.75 m = 320 + 1.6·0.25·3.5·19 = 346.6.","N<sub>d</sub> = 346.6·6.22·2.64/1.2 = 4743 kN.","Above 1.35·2709 = 3657 kN."]],
["Type A block","b = 3 m, T = 2.95 m, uplift 658 kN.",["β₀ = 17 + 9·(5 − 3)/3.5 = 22.14°.","Top width 3 + 2·2.95·tan 22.14° = 5.40 m.","Soil: 44.55 m³ × 19 = 846 kN.","Add concrete 252: R = 1098 kN.","1098/658 = 1.67, over 1.5."]],
["Blum pile","P = 29.5 kN, lever 11 m, d = 0.762 m, f<sub>w</sub> = 30.",["Solve x³ + 2.29·x² = 6.14: x = 1.30 m.","M = 29.5·12.3 − 30·(0.279 + 0.119) = 351 kN·m.","t₀ = 3.76 m, t = 4.5 m. Pile 5.5 m."]]],
bad:[
["Skipping soil checks in uniform terrain","Peat and fill need finding."],
["Using an earth frustum as the real failure","It is a calculating stand-in for shear."],
["Using frustum when soil may be dug away","Lateral resistance needs soil kept in place."],
["Forgetting buoyancy","Use submerged weight with the worst water table."],
["Letting frustums of two legs overlap freely","Check their reach against tower width."],
["Auger-bored in water-bearing sand","Needs stable, dry cohesive soil."],
["Testing concrete too early","Wait 14 days, and 21 for piles in cohesive soil."],
["Designing foundations weaker than towers","Coordinate strength: foundations should be stronger."]],
q:[
{t:"x",sec:"13.2",p:"p. 474",q:"Match each soil to its particle size.",pairs:[["Gravel","2 to 63 mm"],["Sand","0.06 to 2 mm"],["Silt","0.002 to 0.06 mm"],["Clay","Below 0.002 mm"]],w:"Tables 13.2 and 13.3."},
{t:"s",sec:"13.2",p:"p. 475",q:"When is a cohesive soil classed as organic?",o:["Over 1 %","Over 3 %","Over 5 % organic by weight","Over 50 %"],a:[2],w:"Non-cohesive: over 3 %."},
{t:"s",sec:"13.2",p:"p. 475",q:"Is rubbish fill suitable?",o:["Yes","Only with piles or removal; settlement is too large","It is ideal","Only for towers"],a:[1],w:"Uncompacted fill and rubbish settle too much."},
{t:"n",sec:"13.3",p:"p. 475",q:"Compression foundation t = 3 m, width 3 m. Investigation depth, m?",a:6,tol:.05,u:"m",w:"Greater of 3.3 and 6, capped at t + 3 = 6."},
{t:"s",sec:"13.3",p:"p. 476",q:"Which sample class suffices for lines?",o:["1 only","2","4 or 5","None"],a:[2],w:"Lab geotechnical data are normally unnecessary."},
{t:"n",sec:"13.3",p:"p. 480",q:"SPT hammer drop height, m?",a:.76,tol:.005,u:"m",w:"63.2 kg from 0.76 m."},
{t:"s",sec:"13.3",p:"p. 481",q:"R<sub>f</sub> = 7 % suggests what?",o:["Sand","Silt","Peat","Gravel"],a:[2],w:"Over 6 %."},
{t:"n",sec:"13.3",p:"p. 481",q:"q<sub>s</sub> = 10 MN/m², E<sub>s</sub> at 2 × q<sub>s</sub>, d = 1 m. K<sub>s</sub>, MN/m³?",a:28,tol:.1,u:"MN/m³",w:"1.4·20/1."},
{t:"n",sec:"13.4",p:"Eq. 13.4, p. 490",q:"σ₁.₅ = 200, γ = 19, κ = 3.5, t = 3.2 m. σ<sub>t</sub>, kN/m²? Whole number.",a:313,tol:1,u:"kN/m²",w:"200 + 1.7·19·3.5 = 313."},
{t:"n",sec:"13.4",p:"Eq. 13.5, p. 490",q:"Same with ultimate 320. σ<sub>t</sub>, kN/m²? Whole number.",a:501,tol:2,u:"kN/m²",w:"320 + 1.6·113 = 501, printed 500."},
{t:"s",sec:"13.4",p:"p. 492",q:"Inclination limit of a monoblock under characteristic loads?",o:["0.1 %","1 %","5 %","10 %"],a:[1],w:"1.5 % at ultimate."},
{t:"n",sec:"13.4",p:"Eq. 13.12, p. 493",q:"M = 60, H = 10, b = 1, t = 2. σ, kN/m²? Whole number.",a:220,tol:1,u:"kN/m²",w:"h = 6 m, so 12·60·7.33/(6·1·4) = 220."},
{t:"s",sec:"13.4",p:"p. 495",q:"Why is lateral embedment ignored in slabs?",o:["Depth is shallow, its effect low","Soil is rock","Water","Code forbids slabs"],a:[0],w:"The load goes via the subface."},
{t:"n",sec:"13.4",p:"Eq. 13.14, p. 494",q:"Square 10 m, e<sub>x</sub> = 0, e<sub>y</sub> = 2.5 m. γ<sub>M</sub>?",a:2,tol:.01,u:"",w:"1/(2·0.25) = 2.0."},
{t:"s",sec:"13.4",p:"p. 503",q:"In which soil is Type S used?",o:["Firm dry","Not firmly standing, wet","Rock","Peat only"],a:[1],w:"Concreted to planking."},
{t:"n",sec:"13.4",p:"Eq. 13.23, p. 504",q:"β₀ = 32°, b/T = 0.25. β, degrees?",a:16,tol:.05,u:"°",w:"32·0.5."},
{t:"t",sec:"13.4",p:"p. 504",q:"True or false: frustum angle is limited below 35°.",a:true,w:"As stated for blocks."},
{t:"n",sec:"13.4",p:"p. 506",q:"R = 1098, E = 658 kN. Ratio? Two decimals.",a:1.67,tol:.01,u:"",w:"1.67 over 1.5."},
{t:"s",sec:"13.4",p:"p. 505",q:"Unreinforced step height over projection minimum?",o:["0.5","1.0","1.4","2.0"],a:[2],w:"n ≥ 1.4."},
{t:"s",sec:"13.4",p:"p. 512",q:"When are piles expedient?",o:["High water or deep bearing layers","Hard rock at surface","Dry sand","Always cheapest"],a:[0],w:"Avoids dewatering and buoyancy."},
{t:"n",sec:"13.4",p:"p. 501",q:"γ = 19, φ = 25°: f<sub>w</sub>, kN/m³? One decimal.",a:46.8,tol:.2,u:"kN/m³",w:"19·tan²57.5° = 46.8."},
{t:"n",sec:"13.4",p:"p. 502",q:"t₀ = 3.76 m. Embedment t, m? Two decimals.",a:4.51,tol:.01,u:"m",w:"1.2·t₀."},
{t:"s",sec:"13.5",p:"p. 527",q:"Proof tests go to what level?",o:["10 %","60 to 75 % of design","100 %","Failure"],a:[1],w:"Foundation stays serviceable."},
{t:"n",sec:"13.5",p:"p. 528",q:"Minimum days before testing reinforced concrete?",a:14,tol:0,u:"days",w:"21 for piles in cohesive soil."},
{t:"n",sec:"13.5",p:"Eq. 13.37, p. 529",q:"b = 3, t = 3 m. C<sub>L</sub>, m? One decimal.",a:5.1,tol:.01,u:"m",w:"3 + 2.1."},
{t:"n",sec:"13.5",p:"p. 533",q:"German pile test load for nominal 400 kN, kN?",a:500,tol:1,u:"kN",w:"1.25 × nominal."}
]});
