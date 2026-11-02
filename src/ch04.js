OHL.add({n:4,lead:"How lightning forms, how often it hits a line, how earth wires intercept it, and how tower earthing carries it away. Printed pages 99 to 112.",
init:function(K){var $=K.$,fmt=K.fmt;
function rng(a,b,n){var o=[];for(var i=0;i<=n;i++)o.push(a+(b-a)*i/n);return o}
function interp(P,x){if(x<=P[0][0])return P[0][1];for(var i=0;i<P.length-1;i++)if(x<=P[i+1][0])return P[i][1]+(P[i+1][1]-P[i][1])*(x-P[i][0])/(P[i+1][0]-P[i][0]);return P[P.length-1][1]}
K.stepper("stkStep",[["Stepped leader","A streamer leaves the cloud in steps some tens of metres long, 40 to 100 μs apart, branching as it goes."],["Upward predischarge","As it nears the ground, the field rises and upward predischarges start from salient points such as towers and trees."],["Attachment","One predischarge meets the leader, short circuiting cloud to ground. The attachment point is decided only about a hundred metres up."],["Return stroke","A bright flash runs from earth to cloud at about one third of light speed, neutralising the leader's charge."],["Dart leader","After about 40 ms a continuous leader follows the same channel, about 100 times slower than the return stroke."],["Complete discharge","Lasts 0.2 to 1 s, with 3 to 4 partial discharges on average."]]);
K.calc("dCalc",{f:[{k:"I",l:"Stroke current",min:5,max:150,step:1,v:35,u:"kA"}],run:function(v,c){var f=function(I){return 6.7*Math.pow(I,.8)};K.plot(c,{h:220,x:{min:0,max:150,label:"Stroke current, kA"},y:{min:0,max:350,label:"Strike distance, m"},series:[{p:rng(1,150,50).map(function(I){return[I,f(I)]}),c:"accent"}],marks:[{x:v.I,y:f(v.I),t:fmt(f(v.I))+" m"}],aria:"Strike distance against current"});return'<span class="big">D = '+fmt(f(v.I))+' m</span>'}});
K.calc("ngCalc",{f:[{k:"N",l:"Keraunic level N<sub>k</sub>",min:5,max:200,step:1,v:30,u:"days/year"},{k:"w",l:"Tower height",o:[[.15,"40 m, exposure 150 m"],[.25,"60 m, exposure 250 m"],[.35,"80 m, exposure 350 m"]],v:.25}],run:function(v,c){
 var a=.04*Math.pow(v.N,1.25),b=.2*v.N,S=rng(5,200,40);
 K.plot(c,{h:240,x:{min:0,max:200,label:"Thunderstorm days a year"},y:{min:0,max:42,label:"Flashes/km²·year"},series:[{p:S.map(function(N){return[N,.04*Math.pow(N,1.25)]}),c:"accent",t:"Eriksson, Eq. 4.2"},{p:S.map(function(N){return[N,.2*N]}),c:"v4",t:"Eq. 4.3"}],vlines:[{x:v.N}],aria:"Flash density"});
 return'<span>Eq. 4.2: '+fmt(a,1)+' flashes/km²·year → <b>'+fmt(a*v.w*100)+'</b> per 100 km·year</span><span>Eq. 4.3: '+fmt(b,1)+' flashes/km²·year → <b>'+fmt(b*v.w*100)+'</b> per 100 km·year</span>'}});
K.plot("curChart",{h:220,x:{min:10,max:200,log:true,label:"Stroke current, kA (log scale)",ticks:[10,15,20,30,65,130,200]},y:{min:0,max:100,label:"Share below, %"},series:[{p:[[15,15],[20,20],[30,30],[65,85],[130,99]],c:"accent"}],marks:[{x:15,y:15,t:"15 %"},{x:20,y:20},{x:30,y:30,t:"30 %"},{x:65,y:85,t:"85 %"},{x:130,y:99,c:"v4",t:"99 %"}],aria:"Stroke current distribution points quoted in the text"});
var TBL=[[123,550,5,15],[245,950,3,20],[420,1300,1.5,20],[525,1550,1,25],[765,2100,.5,25]];
K.calc("ucCalc",{f:[{k:"I",l:"Stroke current",min:1,max:100,step:1,v:30,u:"kA"},{k:"Z",l:"Surge impedance Z<sub>c</sub>",min:250,max:450,step:10,v:300,u:"Ω"}],run:function(v,c){var U=.5*v.I*v.Z;
 K.bars(c,{minw:480,lw:170,u:"kV",rows:[["Overvoltage U<sub>c</sub>".replace(/<[^>]+>/g,""),U,"v4"]].concat(TBL.map(function(t){return[t[0]+" kV withstand",t[1],"accent"]})),aria:"Overvoltage against withstand levels"});
 var n=TBL.filter(function(t){return U>t[1]}).length;return'<span class="big">'+fmt(U)+' kV</span><span class="small">Exceeds '+n+' of the 5 listed withstand levels.</span>'}});
K.calc("egmCalc",{f:[{k:"I",l:"Stroke current",min:3,max:100,step:1,v:15,u:"kA"},{k:"a",l:"Shielding angle",min:0,max:45,step:1,v:30,u:"°"},{k:"h",l:"Earth wire height",min:20,max:70,step:1,v:40,u:"m"},{k:"H",l:"Wire to phase distance",min:4,max:20,step:.5,v:10,u:"m"},{k:"b",l:"β<sub>s</sub>",o:[[.8,"0.8, range I"],[.67,"0.67, range II"]],v:.8}],run:function(v,c){
 var A=v.a*Math.PI/180,wx=0,wy=v.h,cx=v.H*Math.sin(A),cy=v.h-v.H*Math.cos(A);
 function ex(D){var gy=v.b*D,dx=cx-wx,dy=cy-wy,L=Math.hypot(dx,dy),mx=(wx+cx)/2,my=(wy+cy)/2;if(L/2>=D)return null;var q=Math.sqrt(D*D-L*L/4),Qx=mx+(-dy/L)*q,Qy=my+(dx/L)*q,Ex,Ey=gy;if(Math.abs(gy-cy)>=D)return{Qx:Qx,Qy:Qy,Ex:cx+D,Ey:cy,w:Qy>cy?cx+D-Qx:0,gy:gy};Ex=cx+Math.sqrt(D*D-(gy-cy)*(gy-cy));return{Qx:Qx,Qy:Qy,Ex:Ex,Ey:Ey,w:Qy>gy?Ex-Qx:0,gy:gy}}
 var D=6.7*Math.pow(v.I,.8),r=ex(D),Ic=null;for(var I=1;I<=300;I+=.5){var q=ex(6.7*Math.pow(I,.8));if(q&&q.w<=.01){Ic=I;break}}
 var W=640,H=320,X0=-20,span=Math.max(v.h*2.2,D*2),sc=Math.min(W/(span*1.5),(H-20)/Math.max(v.h*1.35,D*1.5)),px=function(x){return 200+x*sc},py=function(y){return H-16-y*sc},s="";
 s+='<path d="M0 '+py(0)+'H'+W+'" stroke="var(--ink)" stroke-width="2"/><path d="M0 '+py(r?r.gy:0)+'H'+W+'" stroke="var(--muted)" stroke-dasharray="5 4"/><text x="'+(W-6)+'" y="'+(py(r?r.gy:0)-5)+'" text-anchor="end">β·D above ground</text>';
 s+='<circle cx="'+px(wx)+'" cy="'+py(wy)+'" r="'+D*sc+'" fill="none" stroke="var(--v1)"/><circle cx="'+px(cx)+'" cy="'+py(cy)+'" r="'+D*sc+'" fill="none" stroke="var(--rule)"/>';
 if(r&&r.w>0){s+='<path d="M'+px(r.Qx)+' '+py(r.Qy)+'A'+D*sc+' '+D*sc+' 0 0 1 '+px(r.Ex)+' '+py(r.Ey)+'" fill="none" stroke="var(--bad)" stroke-width="4"/>'}
 s+='<path d="M'+px(0)+' '+py(0)+'V'+py(wy)+'M'+px(0)+' '+py(wy)+'L'+px(cx)+' '+py(cy)+'" stroke="var(--muted)" fill="none"/><circle cx="'+px(wx)+'" cy="'+py(wy)+'" r="5" fill="var(--v1)"/><circle cx="'+px(cx)+'" cy="'+py(cy)+'" r="5" fill="var(--live)"/>';
 $(c).innerHTML='<div class="scroll"><div style="min-width:520px"><svg class="c" viewBox="0 0 '+W+' '+H+'" style="background:var(--surface)" role="img" aria-label="Electrogeometric model">'+s+'</svg></div></div>';
 return'<span>Strike distance D = '+fmt(D)+' m</span><span class="'+(r&&r.w>0?"bad":"good")+'">'+(r&&r.w>0?"Exposed arc, about "+fmt(r.w)+" m wide: this current can reach the phase":"Shielded at this current")+'</span><span>Critical current, above which shielding holds: '+(Ic?fmt(Ic,1)+" kA":"over 300 kA")+'</span>'}});
var F={55:[[0,12],[10,15],[20,21],[30,32],[38,47]],40:[[0,8],[10,10],[20,14],[30,20],[38,29]],25:[[0,4],[10,5],[20,7.5],[30,11],[38,15]]};
K.calc("f410",{f:[{k:"h",l:"Earth wire height",o:[[25,"25 m"],[40,"40 m"],[55,"55 m"]],v:55},{k:"a",l:"Angle θ",min:0,max:38,step:1,v:10,u:"°"}],run:function(v,c){var P=F[v.h],y=interp(P,v.a);
 K.plot(c,{h:240,x:{min:0,max:40,label:"Angle θ, degrees"},y:{min:0,max:50,label:"Current, kA"},series:[{p:F[25],c:v.h===25?"accent":"rule",t:"25 m"},{p:F[40],c:v.h===40?"accent":"rule",t:"40 m"},{p:F[55],c:v.h===55?"accent":"rule",t:"55 m"}],marks:[{x:v.a,y:y,t:fmt(y)+" kA"}],aria:"Figure 4.10 redrawn"});
 return'<span class="big">About '+fmt(y)+' kA</span><span class="small">Only currents below this can reach the phase conductor directly.</span>'}});
K.calc("bfCalc",{f:[{k:"B",l:"Insulation level",min:300,max:2200,step:10,v:550,u:"kV"},{k:"Z",l:"Earth surge impedance",min:2,max:40,step:1,v:10,u:"Ω"},{k:"k",l:"Coupling factor k",min:0,max:40,step:1,v:15,u:"%"}],run:function(v){var I=v.B/(v.Z*(1-v.k/100));return'<span class="big">'+fmt(I)+' kA at the tower</span><span>'+fmt(2*I)+' kA at midspan</span>'}});
K.bars("tally",{lw:230,minw:500,max:100,rows:[["Flashes, per 100 km·year",100,"v1","50 to 100"],["Below 30 kA, 30 %",30,"v2","15 to 30"],["50 % reach a phase",15,"v3","7.5 to 15"],["About half flash over",8,"v4","4 to 8"]],aria:"Book estimate for 55 metre earth wire height"});
K.calc("perfCalc",{f:[{k:"i",l:"Highest voltage",o:TBL.map(function(t,i){return[i,t[0]+" kV"]}),v:2},{k:"N",l:"Keraunic level",min:5,max:150,step:1,v:30,u:"days/year"}],run:function(v,c){var t=TBL[v.i],n=t[2]*v.N/30;
 K.bars(c,{minw:480,lw:150,u:"per 100 km·yr",rows:TBL.map(function(x,i){return[x[0]+" kV",x[2]*v.N/30,i===v.i?"live":"accent",fmt(x[2]*v.N/30,1)]}),aria:"Outages by voltage"});
 return'<span class="big">'+fmt(n,1)+' outages per 100 km·year</span><span class="small">Lightning withstand '+t[1]+' kV, tower earthing '+t[3]+' Ω.</span>'}});
K.calc("elCalc",{f:[{k:"I",l:"Peak current",min:10,max:200,step:5,v:150,u:"kA"},{k:"r",l:"Soil resistivity",min:10,max:3000,step:10,v:100,u:"Ω·m"}],run:function(v,c){var s=Math.sqrt(v.I*v.r);K.bars(c,{minw:440,lw:130,u:"m",rows:[["Deep",.2*s,"accent",fmt(.2*s)+" m"],["Shallow",.3*s,"v1",fmt(.3*s)+" m"]],aria:"Effective electrode length"});return null}});
},
cards:[
["Outage share","About 65 % of line outages come from lightning.","p. 100"],
["Stepped leader","Streamer from the cloud in steps some tens of metres long, 40 to 100 μs apart.","p. 101"],
["Return stroke","Bright flash from earth to cloud at about a third of light speed.","p. 101"],
["Dart leader","Continuous leader of later strokes, about 40 ms after the first.","p. 101"],
["Strike distance","D = 6.7·I<sup>0.8</sup>. Distance at which final jump occurs.","p. 102"],
["Negative discharge","80 to 90 % in temperate regions. Several strokes, first front about 10 μs.","p. 102"],
["Positive discharge","One stroke of 0.1 to 0.2 s, slow front, current can pass 100 kA.","p. 103"],
["Keraunic level","Average thunderstorm days a year in a place.","p. 103"],
["Flash density N<sub>g</sub>","Flashes per km² and year. Preferred over keraunic level.","p. 103"],
["Exposure width","About 150, 250 and 350 m for 40, 60 and 80 m towers.","p. 104"],
["Mean stroke current","35 kA recommended, from structures up to 100 m.","p. 104"],
["Induced overvoltage","Stroke to nearby ground, rarely over 600 kV. Negligible above 90 kV.","p. 105"],
["Shielding failure","Stroke reaches a phase. Peak is U<sub>c</sub> = ½·I·Z<sub>c</sub>.","p. 105–106"],
["Back-flashover","Tower potential rises until flashover from tower to phase.","p. 105–106"],
["Coupling factor k","Share of the tower voltage appearing on the phase from earth wire coupling, reducing the voltage across the insulator.","p. 106"],
["Electrogeometric model","Circles of strike distance around wire and phase, with a ground line at β<sub>s</sub>·D.","p. 106–107"],
["β<sub>s</sub>","0.8 for range I, 0.67 for range II.","p. 107"],
["Shielding angle","Usually 10 to 35°, around 10° for EHV.","p. 107–108"],
["Line surge arrester","Fitted across insulators, can replace earth wires. Up to 145 kV so far.","p. 110"],
["FLASH","IEEE program calculating shielding and back-flashover failure rates.","p. 110"],
["Earth surge impedance","0.25 to 1.0 times power frequency resistance.","p. 111"],
["Counterpoise","Buried wire, starts near 150 Ω and decays to its resistance.","p. 112"]],
fm:[
["D = 6.7·I<sup>0.8</sup>","Strike distance, m, I in kA.","4.1, p. 102"],
["N<sub>g</sub> = 0.04·N<sub>k</sub><sup>1.25</sup>","Eriksson's flash density.","4.2, p. 104"],
["N<sub>g</sub> ≈ 0.2·N<sub>k</sub>","Alternative. About twice 4.2 for N<sub>k</sub> = 20 to 40.","4.3, p. 104"],
["U<sub>c</sub> = ½·I·Z<sub>c</sub>","Direct stroke to a conductor.","4.4, p. 106"],
["U<sub>c</sub> + U<sub>pf</sub> ≥ U<sub>50%</sub>","Flashover condition.","4.5, p. 106"],
["U<sub>M</sub> = (1−k)(Z<sub>M</sub>·I + L<sub>M</sub>·dI/dt)","Tower overvoltage.","4.6, p. 106"],
["I<sub>crit</sub> = BIL/[Z·(1−k)]","Critical back-flashover current, from the example.","p. 109"],
["S = I/t<sub>front</sub>","50 kA in 1.2 μs is about 40 kA/μs, exceeded by 10 %.","p. 105"],
["l = 0.2·√(I·ρ<sub>E</sub>), 0.3·√(I·ρ<sub>E</sub>)","Effective length, deep and shallow.","p. 112"]],
wx:[
["Flashes on a 380 kV line","60 m towers, N<sub>g</sub> = 2 to 4 flashes/km²·year.",["Exposure width: 250 m, 0.25 km.","Area per 100 km: 25 km².","Flashes: 25 × 2 to 4 = 50 to 100 per 100 km·year."]],
["Direct stroke at 500 kV","Z<sub>c</sub> = 300 Ω, I = 30 kA.",["Current splits both ways, so the line sees I/2 on Z<sub>c</sub>.","U<sub>c</sub> = ½·30·300 = 4500 kV.","Far above a 1550 kV withstand: flashover."]],
["110 kV back-flashover","BIL 550 kV, Z = 10 Ω, k = 15 %.",["I = 550/(10·0.85) ≈ 65 kA at the tower.","15 % of strokes reach that.","At midspan, half flows each way, so 130 kA is needed.","About 1 % of strokes reach that."]],
["Shielding at 10°, 500 kV","About 50 to 100 flashes per 100 km·year. Only currents below 15 kA reach phases.",["15 % of currents are below 15 kA.","With 50 % probability: about 4 to 8 strike phases.","Only 10 to 15 kA can flash over, 1/3.","About 1.5 to 2.5 flashovers per 100 km·year."]]],
bad:[
["Assuming a stronger stroke is always harder to shield","Higher current has a larger strike distance and is caught more easily. Low currents reach the phase."],
["Using keraunic level as flash density","Convert: N<sub>g</sub> = 0.04·N<sub>k</sub><sup>1.25</sup>."],
["Forgetting the current splits","Direct stroke voltage uses ½·I·Z<sub>c</sub>."],
["Thinking higher voltage means fewer flashovers automatically","Taller towers offset better insulation. European statistics show the rate nearly independent of voltage from 110 to 380 kV."],
["Treating measured earth resistance as the surge value","Surge impedance is 0.25 to 1.0 times it, so it is a pessimistic estimate."],
["Using one long counterpoise","Several shorter radial strips reach their steady resistance faster."],
["Applying the same shield angle to every tower height","Taller towers need smaller angles."]],
q:[
{t:"s",sec:"4.1",p:"p. 100",q:"What share of line outages comes from lightning?",o:["About 15 %","About 35 %","About 65 %","About 95 %"],a:[2],w:"About 65 % in international statistics."},
{t:"s",sec:"4.2",p:"p. 101",q:"What travels from earth to cloud at about a third of light speed?",o:["Stepped leader","Dart leader","Return stroke","Upward predischarge"],a:[2],w:"The return stroke neutralises the leader's charge."},
{t:"n",sec:"4.2",p:"Eq. 4.1, p. 102",q:"Calculate strike distance at 20 kA, in m. Nearest whole number.",a:74,tol:1.5,u:"m",w:"6.7·20<sup>0.8</sup> = 6.7·11.0 = 74 m."},
{t:"m",sec:"4.2",p:"p. 102–103",q:"Which describe positive discharges? Select all.",o:["Usually one stroke","Long wave front of 20 to 50 μs","Current can exceed 100 kA","80 to 90 % of temperate discharges"],a:[0,1,2],w:"Negative discharges are the 80 to 90 %."},
{t:"s",sec:"4.2",p:"p. 102",q:"Upward discharges hit what more often?",o:["Flat fields","Sharp, elevated objects","Rivers","Underground cables"],a:[1],w:"Such as telecommunication towers and towers on hilltops."},
{t:"n",sec:"4.3",p:"Eq. 4.3, p. 104",q:"N<sub>k</sub> = 40. Find N<sub>g</sub> from Eq. 4.3, in flashes/km²·year.",a:8,tol:.01,u:"",w:"0.2·40 = 8."},
{t:"n",sec:"4.3",p:"Eq. 4.2, p. 104",q:"N<sub>k</sub> = 40. Find N<sub>g</sub> from Eq. 4.2. One decimal.",a:4,tol:.1,u:"",w:"0.04·40<sup>1.25</sup> = 0.04·100.6 = 4.0, half of Eq. 4.3's result."},
{t:"s",sec:"4.3",p:"p. 103",q:"Why is flash density preferred to keraunic level?",o:["It is cheaper","Keraunic level relies on subjective hearing of thunder","It uses fewer years","Lightning has no season"],a:[1],w:"Keraunic data depend on human observers."},
{t:"n",sec:"4.3",p:"p. 104",q:"With N<sub>g</sub> = 3 and 80 m towers (350 m exposure), how many flashes per 100 km and year?",a:105,tol:1,u:"",w:"0.35 km × 100 km × 3 = 105."},
{t:"s",sec:"4.3",p:"p. 104",q:"What mean stroke current does the book cite as recommended?",o:["10 kA","35 kA","100 kA","200 kA"],a:[1],w:"35 kA."},
{t:"s",sec:"4.3",p:"p. 105",q:"Why are induced overvoltages negligible above 90 kV?",o:["They rarely exceed 600 kV, below the insulation level","No strokes occur near such lines","Earth wires cancel them","They are all DC"],a:[0],w:"Insulation at those voltages is usually above 600 kV."},
{t:"n",sec:"4.3",p:"Eq. 4.4, p. 106",q:"I = 20 kA, Z<sub>c</sub> = 400 Ω. U<sub>c</sub>, in kV?",a:4000,tol:5,u:"kV",w:"½·20·400 = 4000 kV."},
{t:"t",sec:"4.3",p:"Eq. 4.5, p. 106",q:"True or false: the instantaneous power frequency voltage counts toward flashover.",a:true,w:"True: U<sub>c</sub> + U<sub>pf</sub> ≥ U<sub>50%</sub>."},
{t:"n",sec:"4.3",p:"Eq. 4.6, p. 106",q:"k = 0.2, Z<sub>M</sub> = 10 Ω, I = 100 kA, L term negligible. U<sub>M</sub> in kV?",a:800,tol:1,u:"kV",w:"0.8·10·100 = 800 kV."},
{t:"s",sec:"4.4",p:"p. 107",q:"What is β<sub>s</sub> for range II lines?",o:["0.5","0.67","0.8","1.0"],a:[1],w:"0.67 for range II, 0.8 for range I, as EPRI recommends."},
{t:"s",sec:"4.4",p:"p. 107",q:"Shielding is complete when what occurs?",o:["Earth wire is above the phase","Circles and the ground line meet at one point","Angle is exactly 30°","Strike distance is zero"],a:[1],w:"Then no exposed arc is left on the phase circle."},
{t:"s",sec:"4.4",p:"p. 108",q:"For the same protection, a taller tower needs what?",o:["A larger angle","A smaller angle","The same angle","No earth wire"],a:[1],w:"Higher towers require lower shielding angles."},
{t:"n",sec:"4.4",p:"p. 109",q:"BIL 1050 kV, Z 15 Ω, k 20 %. Critical tower current in kA?",a:87.5,tol:.6,u:"kA",w:"1050/(15·0.8) = 87.5 kA."},
{t:"s",sec:"4.4",p:"p. 109",q:"Statistics show lightning flashover rates in Europe from 110 to 380 kV are what?",o:["Rising strongly with voltage","Nearly independent of voltage","Zero at 380 kV","Falling tenfold"],a:[1],w:"1.1 to 1.6 flashovers per 100 km and year."},
{t:"s",sec:"4.4",p:"p. 110",q:"Up to what voltage have line surge arresters been used per the book?",o:["36 kV","145 kV","420 kV","765 kV"],a:[1],w:"Up to 145 kV; EHV use remains under consideration."},
{t:"n",sec:"4.4",p:"Table 4.2, p. 111",q:"A 245 kV line runs where N<sub>k</sub> = 60. Rough outages per 100 km and year?",a:6,tol:.05,u:"",w:"3 at N<sub>k</sub> = 30, so 3·60/30 = 6."},
{t:"s",sec:"4.5",p:"p. 111",q:"What is the range of earth surge impedance relative to power frequency resistance?",o:["0.25 to 1.0 times","2 to 5 times","10 times","Exactly equal"],a:[0],w:"At worst it reaches the power frequency resistance."},
{t:"s",sec:"4.5",p:"p. 112",q:"How does a counterpoise behave under a stroke?",o:["Starts about 150 Ω then decays to its resistance","Starts at zero and rises","Stays at 150 Ω","Melts"],a:[0],w:"The transition takes as long as the first reflection, at 100 m/μs."},
{t:"n",sec:"4.5",p:"p. 112",q:"I = 100 kA, ρ<sub>E</sub> = 400 Ω·m. Deep electrode effective length, m?",a:40,tol:.5,u:"m",w:"0.2·√40000 = 40 m."}
]});
