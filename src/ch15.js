OHL.add({n:15,lead:"Choosing a route, getting it approved, surveying it, spotting towers and documenting the line. Printed pages 573 to 617.",
init:function(K){var $=K.$,fmt=K.fmt;
K.stepper("flowStep",[["Maps and data","Overview 1:100 000, area maps 1:25 000 to 1:50 000, plots 1:5000. Use the latest editions."],["Route options","Establish several in maps, check on site with municipalities and authorities."],["Inform","Ask municipalities to inform the public before surveying."],["Bird data","Record nesting and migration in the right seasons."],["Licensing","Documents, EIA, consultation. Expect route changes."],["Agree sites","Angle points first, then suspension sites."],["Survey and spot","Profile, tower spotting, pegging, documents."]]);
K.calc("xaCalc",{f:[{k:"w",l:"Width to cross",min:10,max:100,step:1,v:40,u:"m"},{k:"a",l:"Crossing angle",min:5,max:90,step:1,v:30,u:"°"}],run:function(v,c){var f=function(a){return v.w/Math.sin(a*Math.PI/180)},P=[];for(var a=5;a<=90;a+=1)P.push([a,f(a)]);K.plot(c,{h:220,x:{min:5,max:90,label:"Crossing angle, °"},y:{min:0,max:v.w/Math.sin(5*Math.PI/180),label:"Line length in strip, m"},series:[{p:P,c:"accent"}],marks:[{x:v.a,y:f(v.a),t:fmt(f(v.a))+" m"}],aria:"Crossing length against angle"});return'<span class="big">Crossing length '+fmt(f(v.a))+' m</span><span>'+fmt(f(v.a)/v.w,2)+' × the square crossing</span>'}});
K.calc("wtCalc",{f:[{k:"d",l:"Rotor diameter",min:40,max:170,step:1,v:90,u:"m"},{k:"p",l:"Conductors",o:[[3,"Not protected against vibration"],[1,"Protected against vibration"]],v:3},{k:"h",l:"Distance available",min:50,max:600,step:5,v:200,u:"m"}],run:function(v){var r=v.d*v.p,ok=v.h>=r;return'<span class="big '+(ok?"good":"bad")+'">Required '+fmt(r)+' m, available '+fmt(v.h)+' m</span><span>'+(ok?"Meets the rule":"Add vibration protection, move, or show the line is outside the wake")+'</span>'}});
K.stepper("prmStep",[["Need","Justification and public interest. Usually the electricity supply authority."],["Routing","Route and mitigation. Physical planning and environmental authority."],["Construction","Construction and mitigation. Several levels of authority."],["Compensation","Utilities, land owners, expropriation authority."],["Appeals","Tribunals or boards, often courts. A serious risk of losing a licence and starting again."]]);
K.stepper("eiaStep",[["Water","Groundwater quality, existing strains, protection and catchment areas."],["Soil","Removal, compaction, erosion, contamination, sealing."],["Air and climate","Microclimate, mainly forest aisles. Foundations are negligible."],["Flora","Biotopes from maps, updated on site. Effects mostly at tower sites."],["Fauna","Game only where hunting is affected. Birds need detail on long lines with tall towers."],["Landscape","Divide into units, judge sensitivity step by step. No accepted tool."],["Culture and economy","Monuments, mines, farming and forestry areas."],["People","Existing burdens, and recreation that has positive value."]]);
K.calc("scoreCalc",{f:[{k:"c",l:"Weight on cost",min:0,max:10,step:1,v:5,u:""},{k:"l",l:"Weight on landscape",min:0,max:10,step:1,v:5,u:""},{k:"b",l:"Weight on birds",min:0,max:10,step:1,v:5,u:""}],run:function(v,c){var W=v.c+v.l+v.b||1,R=[["Route A, valley",7,4,3],["Route B, ridge",8,2,7],["Route C, forest edge",4,8,6]],S=R.map(function(r){return[r[0],(r[1]*v.c+r[2]*v.l+r[3]*v.b)/W]}),m=Math.max.apply(null,S.map(function(s){return s[1]}));K.bars(c,{lw:170,minw:380,u:"",max:10,rows:S.map(function(s){return[s[0],+s[1].toFixed(1),s[1]===m?"accent":"rule"]}),aria:"Route scores"});return'<span class="big">Best: '+S.filter(function(s){return s[1]===m})[0][0]+'</span><span>Same routes, different weights</span>'}});
K.stepper("visStep",[["Route","Avoid parks, scenic and historic areas, open water and marshland. Cross rivers near a right angle. Few sharp angles, placed out of sight."],["Valleys","Keep apparent height low, break views with trees."],["Forest","A sinuous cut or angle near viewpoints, so people cannot see far down the line."],["Skyline","Do not break it. Follow natural lines. Set towers near vertical elements such as trees and slopes."],["Hilltops","Use lower supports."],["Flat land","Taller towers, longer spans."],["Complex landscape","Lowest tower, absorbed in the background."],["Fields","Field boundaries and woodland edges, not free-standing."]]);
(function(){var P=[];function g(x){return 20+70*Math.exp(-Math.pow((x-500)/230,2))}for(var x=0;x<=1000;x+=10){P.push([x,g(x)])}
 function tw(xs,h){return xs.map(function(x){return{p:[[x,g(x)],[x,g(x)+h]],c:"accent",w:3}})}
 K.plot("visChart",{h:230,x:{min:0,max:1000,label:"Distance, m"},y:{min:0,max:150,label:"Level, m"},series:[{p:P,c:"rule",t:"Hill and skyline"}].concat(tw([0,250,500,750,1000],20)).concat([{p:[[500,g(500)],[500,g(500)+55]],c:"v4",dash:true,w:2,t:"Tall tower breaks the skyline"}]),aria:"Low towers on a hill, and a tall tower breaking the skyline"})})();
K.bars("birdBars",{lw:200,minw:420,u:" %",max:100,rows:[["Without diverters",100,"rule"],["With diverters, best case",10,"accent"]],aria:"Collisions relative to no diverters"});
K.stepper("luStep",[["Route for birds","Avoid wetlands. Run parallel to flight corridors. Stay near trees, buildings or roads so birds fly higher."],["Line design","Flat configuration, thicker earth wires, diverters on earth wires and phases."],["Farmland","Follow field borders and paths, leave machines unrestricted, restore all damage."],["Forest","Over the trees or by aisle. Restricted timber, compensation by age and value."],["Industry","Usually simple if the corridor was planned. Storage and parking under the line."],["Airports","Height limit, warning paint, lights and spheres."],["Mines","Pollution for insulation, settlement for foundations."],["Military, microwave","Protected zones and links found late can force rerouting or new tower sites."],["Roads, rail, water","Bundling is good. Protective strips, specific crossing rules, gauges for shipping, care in drinking-water areas."],["Urban","Encroachment is the main problem. Reuse corridors for parking, gardens, paths."]]);
K.calc("tachCalc",{f:[{k:"s",l:"Inclined distance s",min:50,max:3000,step:10,v:1000,u:"m"},{k:"z",l:"Zenith angle z",min:80,max:120,step:.01,v:98.5,u:"gon"},{k:"i",l:"Instrument height i",min:1,max:2,step:.01,v:1.6,u:"m"},{k:"t",l:"Reflector height t",min:1,max:3,step:.01,v:1.8,u:"m"},{k:"H",l:"Station altitude H₀",min:0,max:1000,step:1,v:250,u:"m"},{k:"c",l:"Constant c",min:-.1,max:.1,step:.001,v:0,u:"m"},{k:"m",l:"Factor m",min:.999,max:1.001,step:.0001,v:1,u:""}],run:function(v,c){var z=v.z*Math.PI/200,R=6370000,L0=v.c+v.s*v.m*Math.sin(z),F=L0*L0/(2*R),dh=v.c+v.s*v.m*Math.cos(z)+F,L=L0+F,Hx=v.H+v.i+dh-v.t,P=[];for(var x=0;x<=3000;x+=100)P.push([x,x*x/(2*R)]);K.plot(c,{h:200,x:{min:0,max:3000,label:"Distance L, m"},y:{min:0,max:.75,label:"F, m"},series:[{p:P,c:"accent"}],marks:[{x:Math.min(L0,3000),y:F,t:"F = "+fmt(F,3)+" m"}],aria:"Curvature against distance"});return'<span>F = '+fmt(F,3)+' m</span><span>Δh = '+fmt(dh,3)+' m</span><span>L = '+fmt(L0,3)+' m, or '+fmt(L,3)+' m as printed with F</span><span class="big">H<sub>x</sub> = '+fmt(Hx,3)+' m</span>'}});
K.calc("sagCalc",{f:[{k:"a",l:"Δh₁",min:.2,max:30,step:.1,v:1.5,u:"m"},{k:"b",l:"Δh₂",min:.2,max:30,step:.1,v:13.5,u:"m"},{k:"s",l:"Span aph",min:100,max:800,step:10,v:400,u:"m"}],run:function(v,c){var r=Math.sqrt(v.a/v.b),p=r/(r+1),fc=v.a+p*(v.b-v.a),fm=fc/(4*p*(1-p)),S=[],T=[[0,-v.a],[v.s,-v.b]];for(var i=0;i<=50;i++){var q=i/50;S.push([q*v.s,-4*fm*q*(1-q)])}var low=Math.min(-fm,-v.a,-v.b);K.plot(c,{h:230,x:{min:0,max:v.s,label:"Along span, m"},y:{min:low*1.1,max:0,label:"Below chord, m"},series:[{p:S,c:"accent",t:"Conductor"},{p:T,c:"v4",dash:true,t:"Line of sight"}],marks:[{x:p*v.s,y:-fc,t:"C"}],aria:"Sag with sight tangent"});return'<span>L<sub>C</sub>/a<sub>ph</sub> = '+fmt(p,3)+'</span><span>f<sub>C</sub> = '+fmt(fc,2)+' m</span><span class="big">f<sub>max</sub> = '+fmt(fm,2)+' m</span>'}});
K.stepper("clrStep",[["Maximum temperature","At least 60 °C in Germany. Often 80, 100 or 120 °C, allowing for creep."],["Ice","Specified ice on all conductors and spans."],["Local ice","At crossings: 50 % of specified ice in the crossing span."],["Medium wind","Three-year return, 58 % of design wind load. Sags at +40 °C. Table 2.22 values plus D<sub>el</sub>."],["50-year wind","In EN 50341-1, power-frequency clearance only. Not required by the German rules."],["Wind with ice","National rules decide. Not required in Germany."]]);
function ter(x){return 240+22*Math.sin(x/260)+14*Math.sin(x/95+1)+-16*Math.exp(-Math.pow((x-1250)/130,2))}
K.calc("spotCalc",{f:[{k:"m",l:"Longest span",min:300,max:700,step:10,v:450,u:"m"},{k:"c",l:"Ground clearance",min:6,max:14,step:.5,v:8,u:"m"}],run:function(v,c){var st=20,n=107,Hs=[18,24,30,36,42],co=function(h){return 100+h*h/8},par=1500,best=[],amin=120,i,hh,j,kk,x;
 var cl=function(a,b,ha,hb){var za=ter(a*st)+ha,zb=ter(b*st)+hb,L=(b-a)*st;for(var q=a+1;q<b;q++){var d=(q-a)*st,y=za+(zb-za)*d/L-d*(L-d)/(2*par);if(y-ter(q*st)<v.c)return false}return true};
 for(i=0;i<=n;i++){best[i]=[];for(hh=0;hh<Hs.length;hh++)best[i][hh]=i===0?{c:co(Hs[hh]),p:null}:null}
 for(i=1;i<=n;i++)for(hh=0;hh<Hs.length;hh++){var lo=Math.max(0,i-Math.floor(v.m/st)),hiJ=i-Math.ceil(amin/st);for(j=lo;j<=hiJ;j++)for(kk=0;kk<Hs.length;kk++){var b=best[j][kk];if(!b)continue;var tot=b.c+co(Hs[hh]);if(best[i][hh]&&tot>=best[i][hh].c)continue;if(cl(j,i,Hs[kk],Hs[hh]))best[i][hh]={c:tot,p:[j,kk]}}}
 var e=null,eh=0;for(hh=0;hh<Hs.length;hh++)if(best[n][hh]&&(!e||best[n][hh].c<e.c)){e=best[n][hh];eh=hh}
 var G=[];for(x=0;x<=n*st;x+=st)G.push([x,ter(x)]);var ser=[{p:G,c:"rule",t:"Terrain"}];
 if(!e){K.plot(c,{h:250,x:{min:0,max:n*st,label:"Distance, m"},y:{min:190,max:330,label:"Level, m"},series:ser,aria:"Terrain, no solution"});return'<span class="big bad">No solution with this tower family</span><span>Allow a longer span or lower the clearance</span>'}
 var chain=[],cur={i:n,h:eh};while(cur){chain.unshift(cur);var p=best[cur.i][cur.h].p;cur=p?{i:p[0],h:p[1]}:null}
 var sp=[],hts=[];chain.forEach(function(t,ix){var X=t.i*st,Z=ter(X),H=Hs[t.h];hts.push(H);ser.push({p:[[X,Z],[X,Z+H]],c:"accent",w:3,t:ix?undefined:"Towers"});if(ix){var u=chain[ix-1],a=u.i*st,L=X-a,za=ter(a)+Hs[u.h],zb=Z+H,P=[];sp.push(L);for(var k=0;k<=16;k++){var d=L*k/16;P.push([a+d,za+(zb-za)*d/L-d*(L-d)/(2*par)])}ser.push({p:P,c:"v4",t:ix===1?"Conductor at maximum sag":undefined})}});
 K.plot(c,{h:260,minw:520,x:{min:0,max:n*st,label:"Distance, m"},y:{min:190,max:330,label:"Level, m"},series:ser,aria:"Optimum tower spotting on terrain"});
 return'<span class="big">'+chain.length+' towers, cost '+fmt(e.c)+' units</span><span>Spans '+sp.join(", ")+' m</span><span>Heights '+hts.join(", ")+' m</span>'}});
K.bars("famBars",{lw:210,minw:430,u:"",max:7,rows:[["One type, 400 m",6,"rule"],["Two types, 400 and 550 m",4,"v3"],["Three types, 400, 500, 700 m",3,"accent"]],aria:"Tower locations for each family"});
K.calc("mapCalc",{f:[{k:"s",l:"Map scale",o:[[2000,"1:2000"],[5000,"1:5000"],[25000,"1:25 000"],[50000,"1:50 000"]],v:25000},{k:"t",l:"Reading tolerance",min:.1,max:1,step:.1,v:.5,u:"mm"}],run:function(v){return'<span class="big">± '+fmt(v.s*v.t/1000,1)+' m on the ground</span>'}});
},
cards:[
["Line route inputs","End points, voltage and section come from network planning.","p. 573"],
["Two line categories","Dense regions force compromise. Rural lines can be fully optimised.","p. 575"],
["Angle points","Costly, so avoid them where possible.","p. 575"],
["Crossing angle","Small angles give long crossing sections.","p. 576"],
["Wind turbine rule","3 rotor diameters, or 1 with vibration protection.","p. 576, 605"],
["Uprating","Keeps a secured right-of-way.","p. 577"],
["Intermediate cable section","Short cable between overhead sections. An operational weak point.","p. 577"],
["EIA trigger, EU","At least 220 kV and more than 15 km.","p. 578"],
["Permit time","1 to 10 years with EIA and appeals.","p. 579"],
["Land compensation","Can reach 20 % of investment.","p. 579"],
["EIA","Study plus public consultation.","p. 580"],
["Reference alternative","How the area would develop without the line.","p. 583"],
["Operating horizon","At least 50 years.","p. 583"],
["Integrate or assert","Hide the line in the landscape, or make it a feature.","p. 584"],
["Photomontage","Most suitable visual method for the public.","p. 588"],
["Power corridor","Lines bundled together or with transport routes.","p. 585"],
["Fence effect","Tall vertical phase arrangement, also a bird hazard.","p. 590"],
["Electrocution","Mainly below about 60 kV.","p. 591"],
["Diverters","Reduce victims by up to 90 %.","p. 592"],
["Total station","Automatic theodolite, below 10 mm up to 3 km.","p. 596–597"],
["Reduction coefficient F","F = L²/(2R), the Earth's curvature.","p. 597"],
["Laser scanning","Helicopter at 100 m and 50 km/h, 200 km per day.","p. 599"],
["Tangential sag survey","Sight the tangent to the conductor to find sag.","p. 602"],
["Sagging template","Catenary and ground curve for ruling span at maximum temperature.","p. 606"],
["Successive elimination","Keep only the cheapest solution to each profile step.","p. 607"],
["Diagonal profile","Sets leg extensions on sloping sites.","p. 611"]],
fm:[
["F = L²/(2R), R = 6370 km","Earth curvature term.","15.1, p. 597"],
["Δh = c + s·m·cos z + F","Height difference.","15.2, p. 597"],
["L = c + s·m·sin z + F","Horizontal distance, as printed.","15.3, p. 597"],
["H<sub>x</sub> = H₀ + i + Δh − t","Level of measured point.","15.4, p. 597"],
["b₂ = L₂ sin β<sub>M2</sub>/sin(200 gon − α₂ − β<sub>M2</sub>)","Crossarm width.","15.5, p. 601"],
["f<sub>C</sub> = Δh₁ + (L<sub>C</sub>/a<sub>ph</sub>)(Δh₂ − Δh₁)","Sag at tangent.","15.8, p. 602"],
["L<sub>C</sub>/a<sub>ph</sub> = √(Δh₁/Δh₂)/(√(Δh₁/Δh₂) + 1)","Tangent position.","15.9, p. 602"],
["f<sub>max</sub> = f<sub>C</sub>/[4(L<sub>C</sub>/a<sub>ph</sub>)(1 − L<sub>C</sub>/a<sub>ph</sub>)]","Midspan sag.","15.10, p. 602"]],
wx:[
["Existing sag","Tangent sight gives Δh₁ = 1.5 m and Δh₂ = 13.5 m. (Illustrative.)",["√(1.5/13.5) = 1/3.","L<sub>C</sub>/a<sub>ph</sub> = (1/3)/(4/3) = 0.25.","f<sub>C</sub> = 1.5 + 0.25·12 = 4.5 m.","f<sub>max</sub> = 4.5/(4·0.25·0.75) = 6.0 m."]],
["Trigonometric height","s = 1000 m, z = 98.5 gon, i = 1.6, t = 1.8, H₀ = 250 m, c = 0, m = 1. (Illustrative.)",["L ≈ 1000·sin(98.5 gon) = 999.7 m.","F = 999.7²/(2·6 370 000) = 0.078 m.","Δh = 1000·cos(98.5 gon) + 0.078 = 23.64 m.","H<sub>x</sub> = 250 + 1.6 + 23.64 − 1.8 = 273.44 m."]],
["Reading a corridor","An overview plan at 1:50 000 is read to ±0.5 mm.",["0.5 mm × 50 000 = 25 000 mm.","So ±25 m on the ground.","Use a 1:2000 or 1:5000 layout for plot boundaries."]],
["Wind park","Rotor 90 m, no vibration protection, turbine tip 200 m from the line.",["3·90 = 270 m needed.","200 m fails.","With protection, 1·90 = 90 m needed, so it passes.","Tips must also stay out of the right-of-way."]]],
bad:[
["Presenting one route","Carry several options and discuss them early."],
["Fixing suspension sites first","Agree angle points first, suspension sites can move."],
["Starting bird surveys late","They depend on the season and can delay the permit."],
["Using numbers to convince the public","Photomontage works better than scoring formulas."],
["Assuming tall towers always look worse","They suit open land and fewer structures, not hilltops."],
["Taking a coating colour lightly","A wrong colour can make the line more visible."],
["Relying on GPS for crossed object heights","Use a tachymeter for those."],
["Trusting a terrain model alone","Its mesh limits accuracy. Check critical points on site."],
["Checking clearance only at maximum temperature","Ice, local ice and wind also count."],
["Spotting from one end only","Start at crossings and fixed sites."]],
q:[
{t:"s",sec:"15.1",p:"p. 574",q:"What should be agreed with owners first?",o:["Angle points","Suspension sites","Conductor type","Access roads"],a:[0],w:"Suspension sites can still move along a straight section."},
{t:"t",sec:"15.1",p:"p. 574",q:"Bird recording should be started early because it depends on the seasons.",a:true,w:"Late data delays licensing."},
{t:"m",sec:"15.2.1",p:"p. 575–576",q:"What should routes avoid? Select all.",o:["Angle points","Rock noses","Cement plant surroundings","Field boundaries"],a:[0,1,2],w:"Field boundaries are good sites."},
{t:"s",sec:"15.2.1",p:"p. 575",q:"Guyed towers suit which region?",o:["Low land compensation, enough space","Dense cities","Intensive farming","Narrow forest aisles"],a:[0],w:"They need room for anchors."},
{t:"n",sec:"15.2.1",p:"p. 576",q:"Rotor 100 m, conductors without vibration protection. Minimum distance, m?",a:300,tol:1,u:"m",w:"3·D."},
{t:"s",sec:"15.2.1",p:"p. 577",q:"Why are intermediate cable sections avoided?",o:["No overload capability, operational weak point","Too cheap","Too noisy","Too tall"],a:[0],w:"Cable limits the line."},
{t:"n",sec:"15.2.2",p:"p. 578",q:"EU EIA applies to lines above how many km (at 220 kV or above)?",a:15,tol:.1,u:"km",w:"Directive 97/11."},
{t:"s",sec:"15.2.2",p:"p. 579",q:"Compensation to land owners can reach about:",o:["20 % of investment","2 %","50 %","80 %"],a:[0],w:"In total."},
{t:"t",sec:"15.2.2",p:"p. 578",q:"Normal maintenance generally needs an EIA.",a:false,w:"Only major changes may."},
{t:"s",sec:"15.2.3",p:"p. 583",q:"The reference alternative describes:",o:["The development without the line","A second route","A cable option","The worst case"],a:[0],w:"It forms the base for comparison."},
{t:"n",sec:"15.2.3",p:"p. 583",q:"Minimum operating period to consider, years?",a:50,tol:.1,u:"years",w:"At least 50."},
{t:"s",sec:"15.2.4",p:"p. 584",q:"Which choice follows from landscape scale?",o:["Integrate or assert","Voltage","Conductor type","Sag"],a:[0],w:"Scale is the key element."},
{t:"s",sec:"15.2.4",p:"p. 587",q:"Crossing a hilltop calls for:",o:["Lower supports","Taller supports","White towers","Guy wires"],a:[0],w:"Stay below the skyline."},
{t:"s",sec:"15.2.4",p:"p. 588",q:"Best visual method for the public:",o:["Photomontage","Terrain model alone","Formula scores","Plan layout"],a:[0],w:"Lifelike and understood."},
{t:"t",sec:"15.2.4",p:"p. 589",q:"Poles suit foreground views, lattice distant views.",a:true,w:"As stated on p. 589."},
{t:"s",sec:"15.2.5",p:"p. 592",q:"Which part of a line is especially likely to cause collisions?",o:["Earth wires","Foundations","Insulators","Tower legs"],a:[0],w:"The book singles them out."},
{t:"n",sec:"15.2.5",p:"p. 592",q:"Diverters reduce victims by up to what, %?",a:90,tol:.1,u:"%",w:"Up to 90."},
{t:"s",sec:"15.2.5",p:"p. 593",q:"Preferred vegetation control:",o:["Mechanical","Herbicide","Burning","None ever"],a:[0],w:"Mechanical methods."},
{t:"m",sec:"15.2.5",p:"p. 595",q:"Near airports what can be needed? Select all.",o:["Height limits","Warning colours","Warning spheres","Larger conductors"],a:[0,1,2],w:"And night lighting."},
{t:"n",sec:"15.3",p:"Eq. 15.1, p. 597",q:"L = 2000 m, R = 6370 km. F, m? Three decimals.",a:.314,tol:.002,u:"m",w:"4·10⁶/(2·6.37·10⁶)."},
{t:"n",sec:"15.3",p:"Eq. 15.10, p. 602",q:"f<sub>C</sub> = 6 m at L<sub>C</sub>/a<sub>ph</sub> = 0.5. f<sub>max</sub>, m?",a:6,tol:.01,u:"m",w:"4·0.5·0.5 = 1."},
{t:"s",sec:"15.3",p:"p. 598",q:"A weakness of GPS for line surveys:",o:["No heights of crossed objects","Needs sight between units","Fails in rain","Low accuracy of metres"],a:[0],w:"Tachymeters do that."},
{t:"n",sec:"15.4.1",p:"p. 604",q:"The three-year wind load is what percentage of design wind?",a:58,tol:.1,u:"%",w:"58 %."},
{t:"s",sec:"15.4.1",p:"p. 604",q:"Local ice load at a crossing is:",o:["50 % of specified ice","100 %","25 %","200 %"],a:[0],w:"In the crossing span."},
{t:"s",sec:"15.4.2",p:"p. 607",q:"Successive elimination stores:",o:["The best solution per profile step","All solutions","Only the end point","Random samples"],a:[0],w:"That keeps effort small."},
{t:"n",sec:"15.4.2",p:"p. 610",q:"Figure 15.16: three suspension types give how many tower locations?",a:3,tol:.1,u:"",w:"Six, four, then three."},
{t:"s",sec:"15.4.3",p:"p. 611",q:"Which document sets leg extensions?",o:["Diagonal profile","Overview plan","Land owner list","Sagging table"],a:[0],w:"It shows ground at each leg."},
{t:"n",sec:"15.4.3",p:"p. 610",q:"1:25 000 map, ±0.5 mm reading. Ground tolerance, m?",a:12.5,tol:.05,u:"m",w:"12.5 m."}
]});
