window.OHL=(function(){
"use strict";
var $=function(i){return document.getElementById(i)};
var KEY="ohl-study-v1",store={},CH={},cur=0,tab="summary";
var TITLES=["Overall planning","Electric requirements and design","Electric parameters","Lightning protection","Earthing","Requirements on loading and strength","Selection of conductors","Earth wire selection","Insulators","Overhead line fittings","Conductor vibrations","Supports","Foundations","Sag and tension calculations","Route selection and detailed line design","Construction","Commissioning, operation and line management"];
try{store=JSON.parse(localStorage.getItem(KEY))||{}}catch(e){store={}}
if(!store.c){store.c={};if(store.cards||store.best||store.chk){store.c[1]={cards:store.cards,best:store.best,chk:store.chk}}}
function save(){try{localStorage.setItem(KEY,JSON.stringify(store))}catch(e){}}
function st(n){n=n||cur;store.c[n]=store.c[n]||{};return store.c[n]}
function log10(x){return Math.log(x)/Math.LN10}
function fmt(x,d){return Number(x).toLocaleString("en-US",{maximumFractionDigits:d==null?0:d,minimumFractionDigits:d==null?0:d})}
function shuffle(a){a=a.slice();for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1)),t=a[i];a[i]=a[j];a[j]=t}return a}
function el(x){return typeof x==="string"?$(x):x}

/* CHART HELPERS */
function nice(a,b,n){var s=(b-a)/(n||6),m=Math.pow(10,Math.floor(log10(s))),r=s/m,k=r<1.5?1:r<3?2:r<7?5:10,d=k*m,t=[],v=Math.ceil(a/d-1e-9)*d;for(;v<=b+d*1e-6;v+=d)t.push(+v.toPrecision(10));return t}
function tickFmt(v){var A=Math.abs(v);if(A>=10000)return fmt(v);return String(+v.toPrecision(6))}
function plot(target,o){
 var W=o.w||640,H=o.h||320,L=o.l||62,R=o.r||22,T=o.t||14,B=o.b||46,X=o.x,Y=o.y;
 function map(a,v,p0,p1){var q=a.log?(log10(v)-log10(a.min))/(log10(a.max)-log10(a.min)):(v-a.min)/(a.max-a.min);return p0+q*(p1-p0)}
 function sx(v){return map(X,v,L,W-R)}function sy(v){return map(Y,v,H-B,T)}
 function logT(a){var t=[],e=Math.ceil(log10(a.min)-1e-9);for(;Math.pow(10,e)<=a.max*1.0001;e++)t.push(Math.pow(10,e));return t}
 var xt=X.ticks||(X.log?logT(X):nice(X.min,X.max,6)),yt=Y.ticks||(Y.log?logT(Y):nice(Y.min,Y.max,5)),h="";
 yt.forEach(function(v){var y=sy(v);h+='<path class="gr" d="M'+L+' '+y+'H'+(W-R)+'"/><text x="'+(L-6)+'" y="'+(y+4)+'" text-anchor="end">'+tickFmt(v)+'</text>'});
 xt.forEach(function(v){var x=sx(v);h+='<path class="gr" d="M'+x+' '+T+'V'+(H-B)+'"/><text x="'+x+'" y="'+(H-B+16)+'" text-anchor="middle">'+tickFmt(v)+'</text>'});
 h+='<path class="ax" d="M'+L+' '+T+'V'+(H-B)+'H'+(W-R)+'"/>';
 if(X.label)h+='<text class="i" x="'+((L+W-R)/2)+'" y="'+(H-8)+'" text-anchor="middle">'+X.label+'</text>';
 if(Y.label)h+='<text class="i" transform="translate(13 '+((T+H-B)/2)+') rotate(-90)" text-anchor="middle">'+Y.label+'</text>';
 (o.bands||[]).forEach(function(b){var a=sx(Math.max(b.a,X.min)),z=sx(Math.min(b.b,X.max));h+='<rect x="'+a+'" y="'+T+'" width="'+Math.max(0,z-a)+'" height="'+(H-B-T)+'" fill="var(--'+(b.c||"accent")+')" opacity=".14"/>'});
 (o.hlines||[]).forEach(function(l){var y=sy(l.y);h+='<path d="M'+L+' '+y+'H'+(W-R)+'" stroke="var(--'+(l.c||"live")+')" stroke-dasharray="5 4" fill="none"/>';if(l.t)h+='<text class="i" x="'+(W-R-4)+'" y="'+(y-5)+'" text-anchor="end">'+l.t+'</text>'});
 (o.vlines||[]).forEach(function(l){var x=sx(l.x);h+='<path d="M'+x+' '+T+'V'+(H-B)+'" stroke="var(--'+(l.c||"live")+')" stroke-dasharray="5 4" fill="none"/>';if(l.t)h+='<text class="i" x="'+(x+5)+'" y="'+(T+13)+'">'+l.t+'</text>'});
 var leg="";
 (o.series||[]).forEach(function(s){var c="var(--"+(s.c||"v1")+")",d="",pen=false;
  s.p.forEach(function(q){if(q[1]==null||!isFinite(q[1])||q[1]<Y.min||q[1]>Y.max){pen=false;return}d+=(pen?"L":"M")+sx(q[0]).toFixed(1)+" "+sy(q[1]).toFixed(1);pen=true});
  h+='<path d="'+d+'" fill="none" stroke="'+c+'" stroke-width="'+(s.w||2.2)+'"'+(s.dash?' stroke-dasharray="6 4"':'')+'/>';
  if(s.t)leg+='<span><i style="background:'+c+'"></i>'+s.t+'</span>'});
 (o.marks||[]).forEach(function(m){var x=sx(m.x),y=sy(m.y),end=x>W-R-120;h+='<circle cx="'+x+'" cy="'+y+'" r="5" fill="var(--'+(m.c||"live")+')"/>';if(m.t)h+='<text class="b" x="'+(end?x-9:x+9)+'" y="'+(y-7)+'"'+(end?' text-anchor="end"':'')+'>'+m.t+'</text>'});
 el(target).innerHTML='<div class="scroll"><div style="min-width:'+(o.minw||520)+'px"><svg class="c" viewBox="0 0 '+W+' '+H+'" role="img" aria-label="'+(o.aria||"Chart").replace(/"/g,"")+'">'+h+'</svg></div></div>'+(leg?'<div class="legend">'+leg+'</div>':'');
}
function bars(target,o){
 var rows=o.rows,W=o.w||640,LW=o.lw||200,rh=o.rh||30,max=o.max||Math.max.apply(null,rows.map(function(r){return r[1]})),h="";
 rows.forEach(function(r,i){var y=i*rh+4,bw=Math.max(1,r[1]/max*(W-LW-90));
  h+='<text class="i" x="'+(LW-8)+'" y="'+(y+15)+'" text-anchor="end">'+r[0]+'</text><rect x="'+LW+'" y="'+y+'" width="'+bw+'" height="'+(rh-10)+'" rx="2" fill="var(--'+(r[2]||"accent")+')"/><text class="b" x="'+(LW+bw+6)+'" y="'+(y+15)+'">'+(r[3]!=null?r[3]:tickFmt(r[1])+(o.u?" "+o.u:""))+'</text>'});
 el(target).innerHTML='<div class="scroll"><div style="min-width:'+(o.minw||520)+'px"><svg class="c" viewBox="0 0 '+W+' '+(rows.length*rh+8)+'" role="img" aria-label="'+(o.aria||"Bar chart").replace(/"/g,"")+'">'+h+'</svg></div></div>';
}
function calc(id,o){
 var root=el(id),h='<div class="fields">';
 o.f.forEach(function(f){
  if(f.o)h+='<label class="f">'+f.l+'<select id="'+id+'_'+f.k+'">'+f.o.map(function(x){return'<option value="'+x[0]+'"'+(x[0]===f.v?' selected':'')+'>'+x[1]+'</option>'}).join("")+'</select></label>';
  else h+='<label class="f"><span>'+f.l+': <output id="'+id+'_'+f.k+'_o"></output></span><input type="range" id="'+id+'_'+f.k+'" min="'+f.min+'" max="'+f.max+'" step="'+f.step+'" value="'+f.v+'"></label>'});
 root.className="calc";root.innerHTML=h+'</div><div id="'+id+'__c"></div><div class="out" id="'+id+'__o" aria-live="polite"></div>';
 function go(){var v={};o.f.forEach(function(f){var e=$(id+"_"+f.k);v[f.k]=f.o?(isNaN(+e.value)?e.value:+e.value):+e.value;
   if(!f.o){var d=String(f.step).indexOf(".")<0?0:String(f.step).split(".")[1].length;$(id+"_"+f.k+"_o").textContent=fmt(v[f.k],d)+(f.u?" "+f.u:"")}});
  var r=o.run(v,id+"__c");if(r!=null)$(id+"__o").innerHTML=r;else $(id+"__o").hidden=true}
 o.f.forEach(function(f){var e=$(id+"_"+f.k);e.addEventListener("input",go);e.addEventListener("change",go)});go();
}
function stepper(id,items){
 var root=el(id);root.style.display="grid";root.style.gap="10px";root.innerHTML='<div class="steps" id="'+id+'_b"></div><div class="out" id="'+id+'_o" aria-live="polite"></div>';
 function show(i){items.forEach(function(s,j){$(id+"_"+j).setAttribute("aria-pressed",j===i)});$(id+"_o").innerHTML="<b>"+items[i][0]+"</b><span>"+items[i][1]+"</span>"}
 items.forEach(function(s,i){var b=document.createElement("button");b.className="ghost";b.id=id+"_"+i;b.textContent=(items.length>1&&items.numbered?(i+1)+". ":"")+s[0];b.onclick=function(){show(i)};$(id+"_b").appendChild(b)});show(0);
}
function checks(root,prefix,items){items.forEach(function(t,i){var id=prefix+i,l=document.createElement("label"),c=document.createElement("input"),S=st();c.type="checkbox";c.id=id;c.checked=!!(S.chk&&S.chk[id]);c.onchange=function(){var S=st();S.chk=S.chk||{};S.chk[id]=c.checked;save()};l.appendChild(c);var s=document.createElement("span");s.textContent=t;l.appendChild(s);el(root).appendChild(l)})}
var K={$:$,fmt:fmt,log10:log10,plot:plot,bars:bars,calc:calc,stepper:stepper,checks:checks};

/* ROUTE */
function drawRoute(){
 var h="",n=17,x0=24,dx=(1000-48)/(n-1),tx=function(i){return x0+i*dx};
 for(var i=0;i<n-1;i++){var a=tx(i),b=tx(i+1),on=i===cur-1;h+='<path d="M'+a+' 24 Q'+((a+b)/2)+' 46 '+b+' 24" fill="none" stroke="var(--'+(on?"live":"rule")+')" stroke-width="'+(on?2:1.5)+'"'+(on?' class="flow"':'')+'/>'}
 for(i=0;i<n;i++){var N=i+1,x=tx(i),here=N===cur,done=(st(N).best||0)>=80,c=here?"var(--live)":done?"var(--good)":CH[N]?"var(--accent)":"var(--rule)";
  h+='<a href="#ch'+N+'/'+tab+'" aria-label="Chapter '+N+': '+TITLES[i]+'"><rect x="'+(x-14)+'" y="10" width="28" height="84" fill="transparent"/><path d="M'+(x-7)+' 74 L'+x+' 18 L'+(x+7)+' 74 M'+(x-10)+' 30 H'+(x+10)+' M'+(x-4)+' 52 H'+(x+4)+'" fill="none" stroke="'+c+'" stroke-width="'+(here?2.4:1.4)+'"/><text x="'+x+'" y="90" text-anchor="middle"'+(here?' style="fill:var(--live)"':'')+'>'+N+'</text></a>'}
 $("route").innerHTML=h;
}

/* CHAPTER RENDER */
function nav(){
 [["prevT","prevB",cur-1],["nextT","nextB",cur+1]].forEach(function(r){[r[0],r[1]].forEach(function(i){var e=$(i);if(r[2]<1||r[2]>17){e.hidden=true}else{e.hidden=false;e.href="#ch"+r[2]+"/"+tab}})});
 document.querySelectorAll(".tabs a").forEach(function(a){a.href="#ch"+cur+"/"+a.dataset.t;if(a.dataset.t===tab)a.setAttribute("aria-current","page");else a.removeAttribute("aria-current")});
 ["summary","study","quiz"].forEach(function(k){$("p-"+k).hidden=k!==tab});
 $("chSel").value=cur;
 document.title="Ch "+cur+" · Overhead Lines Study Route";
}
function renderChapter(n){
 var c=CH[n];cur=n;
 $("title").textContent=n+" · "+TITLES[n-1];
 if(!c){$("lead").textContent="This chapter has not been built yet.";$("p-summary").innerHTML="";["cards","fm","wx","bad","quizRoot"].forEach(function(i){$(i).innerHTML=""});return}
 $("lead").innerHTML=c.lead;
 var t=$("tpl-"+n);$("p-summary").innerHTML=t?t.innerHTML:"";
 var secs=Array.prototype.slice.call($("p-summary").querySelectorAll("details.sec"));
 if($("chips"))secs.forEach(function(d){var b=document.createElement("a");b.href="#ch"+n+"/summary";b.textContent=d.querySelector(".num").textContent;b.title=d.querySelector(".t").textContent;b.addEventListener("click",function(e){e.preventDefault();d.open=true;d.scrollIntoView({block:"start"})});$("chips").appendChild(b)});
 if($("collapse")){var open=true;$("collapse").onclick=function(){open=!open;secs.forEach(function(d){d.open=open});this.textContent=open?"Collapse all sections":"Expand all sections"}}
 if(c.init)c.init(K);
 drawCards();
 $("fm").innerHTML='<tr><th>Relation</th><th>Meaning</th><th>Source</th></tr>'+c.fm.map(function(f){return'<tr><td class="mono" style="white-space:nowrap">'+f[0]+'</td><td>'+f[1]+'</td><td class="pg">'+f[2]+'</td></tr>'}).join("");
 $("wx").innerHTML="";
 c.wx.forEach(function(w,i){var d=document.createElement("div");d.className="fig";d.innerHTML='<h4>'+w[0]+'</h4><p class="small">'+w[1]+'</p><ol class="small" id="wl'+i+'"></ol><div class="row"><button id="wb'+i+'">Show next step</button><button class="ghost" id="wr'+i+'">Start over</button></div>';$("wx").appendChild(d);
  var k=0;function up(){$("wl"+i).innerHTML=w[2].slice(0,k).map(function(s){return"<li>"+s+"</li>"}).join("");$("wb"+i).disabled=k>=w[2].length}
  $("wb"+i).onclick=function(){k++;up()};$("wr"+i).onclick=function(){k=0;up()};up()});
 $("bad").innerHTML='<tr><th>Mistake</th><th>Correction</th></tr>'+c.bad.map(function(b){return'<tr><td>'+b[0]+'</td><td>'+b[1]+'</td></tr>'}).join("");
 startQ();
}
function deck(){var m=st().cards||{};return CH[cur].cards.map(function(c,i){return{c:c,i:i,m:m[i]||""}}).sort(function(a,b){var r={again:0,"":1,known:2};return r[a.m]-r[b.m]||a.i-b.i})}
function drawCards(){
 var root=$("cards"),known=0;root.innerHTML="";
 deck().forEach(function(o){if(o.m==="known")known++;
  var d=document.createElement("div"),f=false;d.className="flip "+(o.m||"");d.tabIndex=0;d.setAttribute("role","button");d.setAttribute("aria-label","Flip card: "+o.c[0]);
  function face(){d.innerHTML=f?'<span>'+o.c[1]+'</span><span class="pg">'+o.c[2]+'</span><span class="row"><button class="ghost" data-m="known">Know it</button><button class="ghost" data-m="again">Review again</button></span>':'<span class="ft">'+o.c[0]+'</span><span class="pg">Tap to flip</span>'}
  face();
  d.addEventListener("click",function(e){var b=e.target.closest("button");if(b){e.stopPropagation();var S=st();S.cards=S.cards||{};S.cards[o.i]=b.dataset.m;save();drawCards();return}f=!f;face()});
  d.addEventListener("keydown",function(e){if((e.key==="Enter"||e.key===" ")&&e.target===d){e.preventDefault();f=!f;face()}});
  root.appendChild(d)});
 $("cardStat").textContent=known+" of "+CH[cur].cards.length+" known";
 $("cardReset").onclick=function(){st().cards={};save();drawCards()};
}

/* QUIZ */
var qs={};
function startQ(){var Q=CH[cur].q;qs={order:shuffle(Q.map(function(_,i){return i})),i:0,score:0,miss:{}};renderQ()}
function renderQ(){
 var Q=CH[cur].q,root=$("quizRoot");
 if(qs.i>=qs.order.length)return renderEnd();
 var q=Q[qs.order[qs.i]];
 root.innerHTML='<div class="row" style="justify-content:space-between"><span class="eyebrow">Question '+(qs.i+1)+' of '+Q.length+' · Section '+q.sec+'</span><span class="mono small">Score '+qs.score+'</span></div><div class="qbar"><i style="width:'+(qs.i/Q.length*100)+'%"></i></div><h2>'+q.q+'</h2><div id="qb" style="display:grid;gap:8px;min-width:0"></div><div id="fb"></div><div class="row"><button id="qc">Check answer</button></div>';
 var qb=$("qb");
 if(q.t==="s"||q.t==="m"||q.t==="t"){
  var list=q.t==="t"?[["True",0],["False",1]]:shuffle(q.o.map(function(o,i){return[o,i]}));
  list.forEach(function(o,idx){var l=document.createElement("label");l.className="opt";l.innerHTML='<input type="'+(q.t==="m"?"checkbox":"radio")+'" name="qo" id="qo'+idx+'" value="'+o[1]+'"><span>'+o[0]+'</span>';qb.appendChild(l)});
 }else if(q.t==="n"){qb.innerHTML='<label class="f">Your answer'+(q.u?" ("+q.u+")":"")+'<input type="number" step="any" id="qn" inputmode="decimal"></label>'}
 else if(q.t==="x"){var rhs=shuffle(q.pairs.map(function(p){return p[1]}));q.pairs.forEach(function(p,i){var l=document.createElement("label");l.className="f";l.innerHTML='<b style="color:var(--ink)">'+p[0]+'</b><select id="qx'+i+'"><option value="">Choose</option>'+rhs.map(function(r){return"<option>"+r+"</option>"}).join("")+'</select>';qb.appendChild(l)})}
 var checked=false;
 $("qc").onclick=function(){
  if(checked){qs.i++;renderQ();$("quizRoot").scrollIntoView({block:"start"});return}
  var res=grade(q);
  if(res===null){$("fb").innerHTML='<div class="fb"><span>Choose or enter an answer first.</span></div>';return}
  checked=true;
  if(res)qs.score++;else qs.miss[q.sec]=(qs.miss[q.sec]||0)+1;
  markUp(q);
  $("fb").innerHTML='<div class="fb"><b class="'+(res?"good":"bad")+'">'+(res?"Correct":"Not quite")+'</b><span>'+q.w+'</span><span class="pg">'+q.p+'</span></div>';
  this.textContent=qs.i+1<Q.length?"Next question":"See results";
 };
}
function grade(q){
 if(q.t==="n"){var r=$("qn").value;if(r==="")return null;return Math.abs(parseFloat(r)-q.a)<=q.tol+1e-9}
 if(q.t==="x"){var ok=true,any=true;q.pairs.forEach(function(p,i){var v=$("qx"+i).value;if(!v)any=false;if(v!==p[1])ok=false});return any?ok:null}
 var sel=[];document.querySelectorAll('[name="qo"]').forEach(function(i){if(i.checked)sel.push(+i.value)});
 if(!sel.length)return null;
 if(q.t==="t")return (sel[0]===0)===q.a;
 var a=q.a.slice().sort(),b=sel.slice().sort();return a.length===b.length&&a.every(function(v,i){return v===b[i]});
}
function markUp(q){
 if(q.t==="n")$("qn").disabled=true;
 else if(q.t==="x")q.pairs.forEach(function(p,i){$("qx"+i).disabled=true});
 else document.querySelectorAll('[name="qo"]').forEach(function(i){var v=+i.value,right=q.t==="t"?(v===0)===q.a:q.a.indexOf(v)>=0,l=i.closest(".opt");if(right)l.classList.add("right");else if(i.checked)l.classList.add("wrong");i.disabled=true});
}
function renderEnd(){
 var Q=CH[cur].q,pc=Math.round(qs.score/Q.length*100),S=st(),best=Math.max(S.best||0,pc);S.best=best;save();drawRoute();
 var miss=Object.keys(qs.miss).sort(function(a,b){return qs.miss[b]-qs.miss[a]}),W=640;
 var bar='<svg class="c" viewBox="0 0 '+W+' 34" role="img" aria-label="Score '+pc+' percent"><rect width="'+W+'" height="22" rx="3" fill="var(--sunk)"/><rect width="'+pc/100*W+'" height="22" rx="3" fill="var(--accent)"/></svg>';
 $("quizRoot").innerHTML='<p class="eyebrow">Chapter '+cur+' results</p><h2 class="big" style="font-size:3rem">'+qs.score+' of '+Q.length+' · '+pc+' %</h2>'+bar+'<p class="mono small">Best score in this browser: '+best+' %</p>'+(miss.length?'<div class="note"><h4>Revisit these sections</h4><div class="chips">'+miss.map(function(s){return'<a href="#ch'+cur+'/summary" data-s="'+s+'">'+s+' ('+qs.miss[s]+' missed)</a>'}).join("")+'</div></div>':'<div class="note"><h4 class="good">No sections to revisit</h4></div>')+'<div class="row"><button id="qr">Retake with new order</button></div>';
 $("qr").onclick=startQ;
 $("quizRoot").querySelectorAll("[data-s]").forEach(function(a){a.addEventListener("click",function(){var id="s"+a.dataset.s.replace(/\./g,"-");setTimeout(function(){var d=$(id);if(d){d.open=true;d.scrollIntoView({block:"start"})}},30)})});
}

/* ROUTER */
function go(){
 var m=/^#ch(\d+)(?:\/(summary|study|quiz))?$/.exec(location.hash),old=/^#(summary|study|quiz)$/.exec(location.hash);
 var n=m?+m[1]:old?1:(store.last||1);if(n<1||n>17)n=1;
 tab=m&&m[2]||old&&old[1]||"summary";
 var changed=n!==cur;
 if(changed){renderChapter(n);store.last=n;save();window.scrollTo(0,0)}
 drawRoute();nav();
}
function start(){
 $("chSel").innerHTML=TITLES.map(function(t,i){return'<option value="'+(i+1)+'">'+(i+1)+' · '+t+(CH[i+1]?"":" (not built)")+'</option>'}).join("");
 $("chSel").onchange=function(){location.hash="#ch"+this.value+"/"+tab};
 window.addEventListener("hashchange",go);go();
}
return{add:function(c){CH[c.n]=c},start:start,CH:CH,K:K};
})();
