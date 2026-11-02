OHL.add({n:11,lead:"Wind-driven conductor motion: aeolian vibration and fatigue, subspan oscillation, galloping, and short-circuit swing, with their remedies. Printed pages 321 to 345.",
init:function(K){var $=K.$,fmt=K.fmt,lg=K.log10;
function rng(a,b,n){var o=[];for(var i=0;i<=n;i++)o.push(a+(b-a)*i/n);return o}
(function(){var R=[["Galloping",.1,1,"v4"],["Subspan oscillation",1,5,"v3"],["Aeolian vibration",5,100,"v1"]],W=640,L=170,sc=function(f){return L+(lg(f)+1)/3*(W-L-30)},h="";[.1,1,10,100].forEach(function(t){h+='<path class="gr" d="M'+sc(t)+' 0V100"/><text x="'+sc(t)+'" y="116" text-anchor="middle">'+t+' Hz</text>'});R.forEach(function(r,i){var y=i*32+6;h+='<text class="i" x="'+(L-8)+'" y="'+(y+15)+'" text-anchor="end">'+r[0]+'</text><rect x="'+sc(r[1])+'" y="'+y+'" width="'+(sc(r[2])-sc(r[1]))+'" height="22" rx="2" fill="var(--'+r[3]+')"/>'});$("typChart").innerHTML='<div class="scroll"><div style="min-width:500px"><svg class="c" viewBox="0 0 '+W+' 122" role="img" aria-label="Frequency ranges of three vibration types">'+h+'</svg></div></div>'})();
K.calc("wavCalc",{f:[{k:"V",l:"Wind across conductor",min:.5,max:10,step:.1,v:3,u:"m/s"},{k:"D",l:"Diameter",min:10,max:45,step:.5,v:30,u:"mm"},{k:"a",l:"Span",min:100,max:800,step:10,v:400,u:"m"},{k:"H",l:"Tension",min:5,max:60,step:1,v:25,u:"kN"},{k:"m",l:"Mass",min:.5,max:3,step:.05,v:1.65,u:"kg/m"}],run:function(v,c){
 var f=.185*v.V/(v.D/1000),s=Math.sqrt(v.H*1000/v.m),f1=s/(2*v.a),k=Math.max(1,Math.round(f/f1)),lam=s/f,W=640,n=Math.min(8,k),p="",S=rng(0,1,200);S.forEach(function(t,i){p+=(i?"L":"M")+(20+t*600)+" "+(60-34*Math.sin(Math.PI*n*t))});
 $(c).innerHTML='<div class="scroll"><div style="min-width:480px"><svg class="c" viewBox="0 0 '+W+' 120" role="img" aria-label="Standing wave"><path d="M20 60H620" class="gr"/><path d="'+p+'" fill="none" stroke="var(--accent)" stroke-width="2.4"/></svg></div></div>';
 return'<span class="big">f = '+fmt(f,1)+' Hz</span><span>Wave speed c = '+fmt(s)+' m/s, fundamental '+fmt(f1,3)+' Hz</span><span>Harmonic k ≈ '+fmt(k)+', wave length λ = '+fmt(lam,1)+' m, loop length '+fmt(lam/2,1)+' m</span>'}});
K.calc("psCalc",{f:[{k:"w",l:"Bending amplitude",min:.05,max:1.2,step:.05,v:.5,u:"mm"},{k:"s",l:"Conductor stress",min:30,max:90,step:1,v:60,u:"N/mm²"},{k:"A",l:"Total area",min:200,max:800,step:1,v:573,u:"mm²"},{k:"d",l:"Outer strand",min:2,max:5,step:.01,v:3.52,u:"mm"}],run:function(v,c){
 var H=v.s*v.A,EI=36.5e6,a=Math.sqrt(H/EI),x=89,e=(v.d*a/4)/(x-(1-Math.exp(-a*x))/a),fac=e*68900,sg=fac*v.w;
 return'<span>Factor '+fmt(fac,1)+' N/mm² per mm amplitude</span><span class="big">σ = '+fmt(sg,1)+' N/mm²</span><span>Bending strain '+fmt(e*v.w*1e6)+' μm/m, design limit 150 μm/m</span>'}});
var N=[[2.1,3.331e6],[5.9,1.71e6],[9.9,.602e6],[13.9,.14e6],[17.8,.018e6],[21.8,.001e6]];
function Nf(s){var n=Math.pow(450/s,5);if(n>2e7)n=Math.pow(263/s,1/.17);return n}
K.calc("minCalc",{f:[{k:"m",l:"Activity scale",min:.25,max:10,step:.25,v:1,u:"× recorded"}],run:function(v,c){
 var sum=0;N.forEach(function(r){sum+=r[1]*v.m/Nf(r[0])});var L=rng(4,10,60).map(function(e){var n=Math.pow(10,e);return[n,n<=2e7?450*Math.pow(n,-.2):263*Math.pow(n,-.17)]});
 K.plot(c,{h:250,x:{min:1e4,max:1e10,log:true,label:"Cycles to failure (log scale)"},y:{min:1,max:100,log:true,label:"Stress, N/mm² (log)"},series:[{p:L,c:"accent",t:"Safe border line"}],marks:N.map(function(r){return{x:Math.max(1e4,r[1]*v.m),y:r[0],c:"v4"}}),aria:"Safe border line"});
 var life=1/sum;return'<span>Σ n/N = '+fmt(sum,4)+' per year</span><span class="big '+(life>=50?"good":"bad")+'">'+fmt(life)+' years</span>'}});
var TR=[["A, open, flat, snow or water",1000],["B, open, flat, no snow",1125],["C, with few obstacles",1225],["D, built-up, trees",1425]],CD=[["AL1/ST1A, 6.0:1",3.43,56],["AL1/ST1A, 7.7:1",3.25,52],["AL1 or AL3",2.703,30]];
K.calc("sdtCalc",{f:[{k:"t",l:"Terrain",o:TR.map(function(r,i){return[i,r[0]]}),v:2},{k:"c",l:"Conductor",o:CD.map(function(r,i){return[i,r[0]]}),v:0}],run:function(v){var p=TR[v.t][1],r=CD[v.c],s=p*r[1]*9.81/1000;return'<span>H/(m·g) = '+p+' m</span><span class="big">σ ≈ '+fmt(s)+' N/mm²</span><span>EN 50341-3-4 everyday stress: '+r[2]+' N/mm²</span>'}});
K.stepper("dmpStep",[["Stockbridge damper","Two masses on a messenger cable, usually fitted 0.5 to 2.0 m from the clamp. Asymmetric designs add resonances."],["Festoons and Bretelles","A length of conductor fixed around the clamp. Effectiveness remains an open question; Stockbridge is preferred."],["Spacer dampers","For bundles, rubber hinges each worth about 100 m of self-damping, detuning the system."],["Damper check","Energy balance gives free-span angle against the limit; also check the damper clamp velocity."]]);
K.calc("subCalc",{f:[{k:"n",l:"Subconductors",o:[[2,"2"],[3,"3"],[4,"4"]],v:2},{k:"s",l:"Spacing",min:300,max:800,step:10,v:400,u:"mm"},{k:"d",l:"Diameter",min:15,max:40,step:.5,v:22.4,u:"mm"},{k:"L",l:"Largest subspan",min:20,max:80,step:1,v:40,u:"m"}],run:function(v){var r=v.s/v.d,lim=v.n===4?20:18,a=r>lim,b=v.L<=40;return'<span class="big">s/d = '+fmt(r,1)+'</span><span class="'+(a?"good":"bad")+'">'+(a?"Over":"Not over")+' the '+lim+' guide</span><span class="'+(b?"good":"bad")+'">Subspan '+(b?"within":"over")+' 40 m</span>'}});
K.stepper("galStep",[["Single conductors","Torsion pendulums and spring-mass dampers. Reduce amplitude, do not stop it."],["Bundles","Pendulums add mass and tension. Free-rotating spacer clamps ice more evenly."],["Phase spacers","Composite spacers between phases. At least three per span; more means fewer flashovers."],["Tower design","Horizontal phases are better than vertical or triangular. Larger clearances are possible but cost much under 400 kV."],["Operation","De-energise the endangered circuit of a double circuit line, if possible."]]);
},
cards:[
["Aeolian vibration","Vortex-induced, 5 to 100 Hz, laminar wind up to 5 to 10 m/s.","p. 322"],
["Subspan oscillation","Bundle wake effect, 1 to 5 Hz, 4 to 18 m/s.","p. 322"],
["Galloping","Iced conductor, under 1 Hz, 6 to 25 m/s, amplitude up to sag.","p. 322–323"],
["Strouhal relation","f<sub>w</sub> = S<sub>r</sub>·V/D, S<sub>r</sub> near 0.185.","p. 325, 328"],
["String model","f = (k/2a)·√(H/m).","p. 325"],
["Energy balance principle","Wind power equals damper and self-damping power.","p. 325–326"],
["Free-span angle ψ","2π·A/λ, intensity of vibration.","p. 327"],
["Bending amplitude","Conductor displacement at 89 mm from clamp.","p. 327, 337"],
["Bending stiffness limits","Between free strands and locked strands.","p. 327–328"],
["Kármán vortex street","Alternating vortices behind a cylinder.","p. 328"],
["Beat pattern","Several frequencies at once, from wind varying along the span.","p. 329"],
["Fretting","Rubbing between strands, the usual start of cracks.","p. 331"],
["150 μm/m","Usual bending strain limit, half the fatigue strength.","p. 331"],
["EDS method","Everyday stress as % RTS, from 1960, statistical.","p. 332"],
["Safe design tension","Scientific approach using H/mg and a·D/m.","p. 332–333"],
["Stockbridge damper","Two masses on a messenger cable.","p. 335"],
["Festoon damper","Conductor piece over the clamp; uncertain.","p. 336"],
["Vibration recorder","Measures for 10 s every 15 minutes, about 3 to 4 months.","p. 337"],
["S-N curve","Stress against cycles to failure.","p. 339"],
["Safe border line","Conservative Cigré S-N curve.","p. 339"],
["Miner's rule","Sum n/N gives yearly damage; its inverse is life.","p. 340"],
["Phase spacer","Limits conductor motion in galloping.","p. 343"],
["Kissing conductors","Subconductors stuck together after a fault.","p. 343"]],
fm:[
["f<sub>k</sub> = (k/2a)·√(H/m<sub>c</sub>)","Natural frequency.","11.20, p. 325"],
["c = √(H/m<sub>c</sub>)","Wave speed.","11.21, p. 325"],
["λ = c/f","Wave length.","11.25, p. 325"],
["f<sub>w</sub> = S<sub>r</sub>·V<sub>w</sub>/D","Strouhal.","11.26, p. 325"],
["P<sub>W</sub> = P<sub>D</sub> + P<sub>S</sub>","Energy balance.","11.27, p. 326"],
["ψ = 2π·A<sub>f</sub>/λ","Free-span angle.","11.32, p. 327"],
["ε(0) = e·ψ·√(H/EI)","Bending strain at the clamp.","11.34, p. 327"],
["ε(0) = (d·w<sub>b</sub>·α/4)/(x<sub>b</sub> − [1−exp(−αx<sub>b</sub>)]/α)","Poffenberger-Swart.","11.35, p. 327"],
["σ = ε·E<sub>Al</sub>","Strand stress.","11.36, p. 327"],
["σ<sub>bF</sub> = C·N<sup>z</sup>","Safe border line, C = 450, z = −0.2 to 2·10⁷, then 263, −0.17.","11.39, p. 339"],
["t = 1/Σ(n<sub>i</sub>/N<sub>i</sub>)","Miner's rule, years.","11.40, p. 340"]],
wx:[
["Vortex frequency","D = 30 mm, V = 0.5 to 10 m/s.",["f = 0.185·0.5/0.03 = 3.1 Hz.","f = 0.185·10/0.03 = 61.7 Hz.","With H = 25 kN, m = 1.65 kg/m, c = 123 m/s.","At 30 Hz, λ = 4.1 m."]],
["Life from Table 11.3","Recorded 10 s every 15 min for 3024 h. Conductor Curlew.",["Measured time: 3024·40 s = 33.6 h.","Scale to a year: 8760/33.6 = 261.","Amplitudes convert at 31.6 N/mm² per mm.","Sum n/N = 0.0092.","Life = 1/0.0092 = about 110 years. Class 4 does most damage."]],
["Safe stress","Terrain C, ACSR 6:1, H/mg = 1225 m, density 3.43 kg/dm³.",["σ = 1225·3430·9.81 Pa.","σ = 41 N/mm², 14 % RTS."]]],
bad:[
["Thinking strong wind causes aeolian vibration","Light steady laminar wind does."],
["Raising tension for shorter sag without care","Self-damping falls and vibration rises."],
["Believing a clamp damps vibration","Armor rods reduce stress, but do not dissipate energy."],
["Using a damper at any position","Location comes from a study for that damper."],
["Treating spacer dampers as a cure for subspan oscillation","They do not fully suppress it."],
["Expecting phase spacers to stop galloping","They limit motion and flashovers."],
["Reading a recorder at the wrong point","Install where no damper lies between it and midspan."]],
q:[
{t:"x",sec:"11.1",p:"p. 322–323",q:"Match each vibration to its frequency range.",pairs:[["Aeolian","5 to 100 Hz"],["Subspan","1 to 5 Hz"],["Galloping","Under 1 Hz"]],w:"From high to low."},
{t:"s",sec:"11.1",p:"p. 322",q:"What amplitude can aeolian vibration reach?",o:["One conductor diameter","Half spacing","Sag","1 m"],a:[0],w:"About the diameter at the antinode."},
{t:"s",sec:"11.1",p:"p. 323",q:"What almost always accompanies galloping?",o:["Ice accretion","Hot weather","Corona","Earth faults"],a:[0],w:"Ice creates an unstable profile."},
{t:"n",sec:"11.2",p:"Eq. 11.26, p. 325",q:"V = 4 m/s, D = 25 mm, S<sub>r</sub> = 0.185. f, Hz? One decimal.",a:29.6,tol:.1,u:"Hz",w:"0.185·4/0.025 = 29.6 Hz."},
{t:"n",sec:"11.2",p:"Eq. 11.21, p. 325",q:"H = 20 000 N, m = 2 kg/m. Wave speed, m/s?",a:100,tol:.1,u:"m/s",w:"√10 000 = 100 m/s."},
{t:"n",sec:"11.2",p:"Eq. 11.20, p. 325",q:"c = 100 m/s, a = 400 m. Fundamental, Hz? Three decimals.",a:.125,tol:.001,u:"Hz",w:"100/(2·400) = 0.125 Hz."},
{t:"n",sec:"11.2",p:"Eq. 11.25, p. 325",q:"c = 120 m/s, f = 20 Hz. λ, m?",a:6,tol:.01,u:"m",w:"120/20 = 6 m."},
{t:"s",sec:"11.2",p:"p. 330",q:"Which terrain favours aeolian vibration?",o:["Boulders and trees","Water and flat land","Urban areas","Rolling forest"],a:[1],w:"Laminar air."},
{t:"s",sec:"11.2",p:"p. 330",q:"Why are AL1 and AL3 conductors more exposed?",o:["Low weight for their diameter","More steel","Higher sag","Better damping"],a:[0],w:"They reach steady vibration faster."},
{t:"n",sec:"11.2",p:"p. 331",q:"1 hour daily at 30 Hz: cycles per year? Give in millions, whole number.",a:39,tol:1,u:"million",w:"30·3600·365 = 39·10⁶."},
{t:"n",sec:"11.2",p:"p. 331",q:"Fatigue strain 300 μm/m. Design limit, μm/m?",a:150,tol:.5,u:"μm/m",w:"Half of it."},
{t:"s",sec:"11.2",p:"p. 331",q:"Where do fatigue cracks usually start?",o:["Fretting marks","Mid-span","Steel core","Grease"],a:[0],w:"Where strands rub."},
{t:"s",sec:"11.2",p:"p. 332",q:"Higher tension does what?",o:["Cuts self-damping and raises vibration","Stops vibration","Lowers frequency only","Removes the need for clamps"],a:[0],w:"Hence limits on everyday stress."},
{t:"n",sec:"11.2",p:"Table 11.2, p. 333",q:"H/mg limit in terrain A, m?",a:1000,tol:.5,u:"m",w:"1000, 1125, 1225, 1425 for A to D."},
{t:"n",sec:"11.2",p:"Table 11.2, p. 333",q:"Conductor weighs 15 N/m, terrain B. Largest H without dampers, kN? Two decimals.",a:16.88,tol:.02,u:"kN",w:"1125·15 = 16 875 N."},
{t:"s",sec:"11.2",p:"p. 336",q:"Where do Stockbridge dampers go, as a guideline?",o:["0.5 to 2.0 m from the clamp","Mid-span","25 m out","Inside the clamp"],a:[0],w:"Final position comes from a study."},
{t:"n",sec:"11.2",p:"Eq. 11.39, p. 339",q:"Safe border stress at N = 10⁷ with C = 450, z = −0.2, N/mm²? One decimal.",a:17.9,tol:.1,u:"N/mm²",w:"450·10<sup>−1.4</sup> = 17.9."},
{t:"n",sec:"11.2",p:"Eq. 11.40, p. 340",q:"Σn/N = 0.02 per year. Life, years?",a:50,tol:.1,u:"years",w:"1/0.02 = 50."},
{t:"t",sec:"11.2",p:"p. 337",q:"True or false: a recorder can have a damper ahead of it toward midspan.",a:false,w:"No damper may sit between it and midspan."},
{t:"n",sec:"11.3",p:"p. 341",q:"Quad, d = 28 mm. Smallest spacing to meet the ratio, mm?",a:560,tol:1,u:"mm",w:"20·28 = 560 mm."},
{t:"s",sec:"11.3",p:"p. 341",q:"Which arrangement avoids wake oscillation best?",o:["Vertical twin","Horizontal twin","Twisted twin","Closer horizontal twin"],a:[0],w:"Subconductors are not one behind the other."},
{t:"s",sec:"11.4",p:"p. 343",q:"Which phase layout suits galloping best?",o:["Horizontal","Vertical","Triangular","Compact"],a:[0],w:"Phases do not lie above each other."},
{t:"n",sec:"11.4",p:"p. 343",q:"Minimum phase spacers per span, from experience?",a:3,tol:0,u:"",w:"At least three."},
{t:"s",sec:"11.5",p:"p. 344",q:"Why are short-circuit forces low on single conductors?",o:["Far apart and low frequency","Currents are small","Ice shields them","Earth wire cancels them"],a:[0],w:"Natural frequency is below 0.3 Hz."}
]});
