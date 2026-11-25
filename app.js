(()=>{
'use strict';
/* ---------- utils ---------- */
const $=(s,r=document)=>r.querySelector(s), $$=(s,r=document)=>[...r.querySelectorAll(s)];
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
const lerp=(a,b,t)=>a+(b-a)*t;
const ease=t=>1-Math.pow(1-t,3);
const easeIO=t=>t<.5?4*t*t*t:1-Math.pow(-2*t+2,3)/2;
const R=(a,b,t)=>clamp((t-a)/(b-a));
const fine=matchMedia('(hover:hover) and (pointer:fine)').matches;
const reduce=matchMedia('(prefers-reduced-motion: reduce)').matches;
let vw=document.documentElement.clientWidth,vh=innerHeight;
const icon=(n,c='ico')=>`<svg class="${c}" viewBox="0 0 24 24">${(window.ICONS||{})[n]||''}</svg>`;
function fillIcons(root=document){$$('svg[data-i]',root).forEach(s=>{s.setAttribute('viewBox','0 0 24 24');s.innerHTML=(window.ICONS||{})[s.dataset.i]||'';s.removeAttribute('data-i')})}
if('scrollRestoration' in history)history.scrollRestoration='manual';

/* ---------- content ---------- */
const SECTORS=[
 {n:'Container castings',img:'img/shot-11.webp',white:1,d:'ISO container corner castings and related components — our main product, built to ISO 1161-compatible geometry.',
  subs:[['Corner castings','TL · TR · BL · BR positions, shot blasted and machined.'],['Material','SCW480 / SCW490 cast steel.'],['Related components','A broader range of engineered container components in development.']],chips:['ISO 1161 compatible','Heat & batch traceability','In-house inspection']},
 {n:'Pump, motor & valve bodies',img:'img/shot-06.webp',d:'Casings, housings and bodies with complex internal passages.',
  subs:[['Pump bodies','Casings and volutes with complex internal flow passages.'],['Motor bodies','Housings and end covers with fins and mounting features.'],['Valve bodies','Bodies and bonnets with intricate internal cavities.']],chips:['Complex geometries','Repeatable production','Dimensional inspection']},
 {n:'Automotive castings',img:'img/shot-07.webp',d:'Engineered cast components where repeatability from part to part matters as much as the geometry.',
  subs:[['Housings & covers','Enclosures with ribs, bosses and mounting faces.'],['Brackets & mounts','Load-bearing parts with complex profiles.'],['Hubs & carriers','Rotating and carrier parts cast to controlled dimensions.']],chips:['Heat & batch traceability','Hardness testing','Spectro analysis']},
 {n:'Railway castings',img:'img/shot-08.webp',d:'Rolling-stock and track components for demanding service.',
  subs:[['Bogie & suspension','Components for bogie and suspension assemblies.'],['Brake system','Brake system cast components.'],['Coupler & draft gear','Coupler and draft gear parts.'],['Track & fastening','Track and fastening castings.']],chips:['NDT as required','Heat treatment','Traceability']},
 {n:'Engineering castings',img:'img/shot-12.webp',white:1,d:'Rollers, gears and general engineering components.',
  subs:[['Rollers & gears','Cast blanks ready for machining.'],['General engineering','Components to your drawing and specification.']],chips:['Lost Foam','Replica Investment','Machining']},
 {n:'And more…',img:'img/shot-13.webp',white:1,d:'Castings for other industries — send us your drawing and we will recommend the right process.',
  subs:[['Send a drawing','Component requirement & specification.'],['Get a route','Material & process evaluation, tooling and sampling.']],chips:['From drawing to repeat production'],cta:1}
];
const WF=[['pencil-ruler','Drawing','Component requirement & specification'],['cog','Engineering','Material & process evaluation'],['wrench','Tooling','Pattern and tooling development'],['flame','Casting','Controlled melting & production'],['hammer','Finishing','Fettling, blasting, machining & treatment'],['scan-search','Inspection','Chemical, dimensional & quality verification'],['truck','Supply','Documented, repeatable production']];
const QC=[['flask-conical','Spectro analysis','Chemical composition verification'],['ruler','Dimensional inspection','Critical dimensional control'],['gauge','Hardness testing','Material property verification'],['radar','NDT','Non-destructive testing as required'],['thermometer','Heat treatment','Controlled material processing'],['file-check','Traceability','Heat and batch based documentation',1]];
const WHY=[['layers','Advanced process','Lost Foam + Replica Investment Casting'],['factory','Built for scale','40,000 sq ft manufacturing platform'],['sliders-horizontal','Process control','Automation-driven production'],['shield-check','Quality infrastructure','In-house inspection and testing capabilities'],['container','Container focus','Specialised capability for container castings and components'],['handshake','Engineering partnership','From drawing to repeat production']];
const FRAMES=[
 {t:1},
 {s:'Foam pattern',p:'An expanded-polystyrene replica of the part is moulded to its exact geometry — holes, ribs and all. One pattern per casting.',c:'EPS · 1 : 1 pattern'},
 {s:'Cluster assembly',p:'Patterns are joined to a foam gating system — cup, sprue and gates — so one pour fills several castings at once.',c:'Multiple parts per pour'},
 {s:'Refractory coating',p:'The cluster is dipped in a ceramic slurry and dried. The coat holds the sand back while letting foam gases escape.',c:'Ceramic slurry coat'},
 {s:'Flask & compaction',p:'The coated cluster is set in a flask and surrounded with dry, unbonded sand, compacted by vibration. No cores, no binders.',c:'Vibration compaction'},
 {s:'The pour',p:'Molten metal enters the sprue. The foam vaporises just ahead of it, and the metal takes the pattern’s exact shape.',c:'Foam out · metal in'},
 {s:'Shakeout & finish',p:'The sand pours away for reclamation. Castings are cut from the gating, then fettled, shot blasted, machined and inspected.',c:'98% sand reclamation'}
];

/* ---------- sector showcase ---------- */
const SHOW=[
 {id:'pump',code:'05.2',tag:'Flow & power',a:'Pump, motor',b:'& valve bodies',short:'Flow & power',d:'Casings, housings and bodies with complex internal passages.',img:'img/shot-06.webp',theme:'dark',sch:'pump',fig:'Fig. 08 · Pump volute casing — schematic',
  subs:[['Pump bodies','Casings and volutes with complex internal flow passages.'],['Motor bodies','Housings and end covers with fins and mounting features.'],['Valve bodies','Bodies and bonnets with intricate internal cavities.']],chips:['Complex geometries','Repeatable production','Dimensional inspection']},
 {id:'auto',code:'05.3',tag:'Mobility',a:'Automotive',b:'castings',short:'Mobility',d:'Engineered cast components where repeatability from part to part matters as much as the geometry.',img:'img/shot-07.webp',theme:'light',sch:'hub',fig:'Fig. 09 · Hub / disc casting — schematic',
  subs:[['Housings & covers','Enclosures with ribs, bosses and mounting faces.'],['Brackets & mounts','Load-bearing parts with complex profiles.'],['Hubs & carriers','Rotating and carrier parts cast to controlled dimensions.']],chips:['Heat & batch traceability','Hardness testing','Spectro analysis']},
 {id:'rail',code:'05.4',tag:'Rail',a:'Railway',b:'castings',short:'Rail',d:'Rolling-stock and track components for demanding service.',img:'img/shot-08.webp',pos:'28% 50%',theme:'dark',sch:'rail',fig:'Fig. 10 · Wheel on rail / rail profile — schematic',
  subs:[['Bogie & suspension','Cast parts for bogie and suspension assemblies.'],['Brake system','Cast components for braking systems.'],['Coupler & draft gear','Coupler and draft-gear castings.'],['Track & fastening','Castings for track and fastening systems.']],chips:['NDT as required','Heat treatment','Traceability']},
 {id:'eng',code:'05.5',tag:'Engineering',a:'Engineering',b:'castings',short:'Engineering',d:'Rollers, gears and general engineering components.',gears:1,theme:'light',sch:'gear',fig:'Fig. 11 · Gear blank — schematic',
  subs:[['Rollers','Cast roller blanks, ready for machining.'],['Gears','Gear blanks cast to controlled dimensions.'],['General engineering','Components to your drawing and specification.']],chips:['Lost Foam','Replica Investment','Machining']},
 {id:'more',code:'05.6',tag:'Your component',a:'And more…',b:'Your drawing.',short:'Your component',d:'Castings for other industries — send us your drawing and we will recommend the right process, material and route.',theme:'dark',sch:'sheet',fig:'From drawing to repeat production',cta:1,
  subs:[['Send a drawing','Component requirement & specification.'],['Engineering','Material & process evaluation.'],['Tooling','Pattern and tooling development.'],['Repeat production','Documented, repeatable production.']],chips:['Lost Foam','Replica Investment','In-house inspection']}
];
const IDX=[['container','Container castings','#container','04'],['fan','Pump, motor & valve','#sc-pump','05.2'],['car','Automotive','#sc-auto','05.3'],['train-front','Railway','#sc-rail','05.4'],['cog','Engineering','#sc-eng','05.5'],['plus','And more','#sc-more','05.6']];
function sch(kind){
 const f=n=>(+n).toFixed(1),P2=(r,a,cx=200,cy=200)=>[cx+r*Math.cos(a),cy+r*Math.sin(a)];
 const C=(r,cx=200,cy=200)=>`<circle class="dr" pathLength="1" cx="${f(cx)}" cy="${f(cy)}" r="${r}"/>`,Pt=s=>`<path class="dr" pathLength="1" d="${s}"/>`;
 let d=[],cl='<path class="cl" d="M200 8V392M8 200H392"/>',tx='';
 if(kind==='pump'){let s='';for(let i=0;i<=72;i++){const t=i/72,[x,y]=P2(92+64*t,-Math.PI/2+t*2*Math.PI);s+=(i?'L':'M')+f(x)+' '+f(y)}
  d.push(Pt(s),Pt('M200 44H352V108H200'),C(70),C(22),C(8));for(let k=0;k<6;k++){const a=k*Math.PI/3,[x1,y1]=P2(22,a),[cx,cy]=P2(52,a+.45),[x2,y2]=P2(70,a+.95);d.push(Pt(`M${f(x1)} ${f(y1)}Q${f(cx)} ${f(cy)} ${f(x2)} ${f(y2)}`))}
  tx='<text x="300" y="34">OUTLET</text><text x="140" y="384">VOLUTE CASING</text><text x="282" y="262">IMPELLER EYE</text>'}
 if(kind==='hub'){d.push(C(156),C(132),C(70),C(32));for(let k=0;k<5;k++){const [x,y]=P2(100,k*2*Math.PI/5-Math.PI/2);d.push(C(10,x,y))}for(let k=0;k<36;k++){const a=k*Math.PI/18,[x1,y1]=P2(132,a),[x2,y2]=P2(156,a);d.push(Pt(`M${f(x1)} ${f(y1)}L${f(x2)} ${f(y2)}`))}
  tx='<text x="236" y="186">HUB BORE</text><text x="300" y="36">FRICTION RING</text><text x="40" y="382">BOLT PCD</text>'}
 if(kind==='rail'){const cy=165;d.push(C(150,200,cy),C(118,200,cy),C(36,200,cy));for(let k=0;k<6;k++){const [x,y]=P2(77,k*Math.PI/3,200,cy);d.push(C(14,x,y))}d.push(Pt('M150 315H250V334H226V362H270V376H130V362H174V334H150Z'));cl='<path class="cl" d="M200 4V392M20 165H380"/>';
  tx='<text x="300" y="30">WHEEL</text><text x="276" y="330">RAIL HEAD</text><text x="276" y="374">FOOT</text>'}
 if(kind==='gear'){let s='';const N=20;for(let k=0;k<N;k++){const a=k*2*Math.PI/N,w=Math.PI/N;const pts=[P2(136,a-w*.55),P2(158,a-w*.3),P2(158,a+w*.3),P2(136,a+w*.55),P2(136,a+w*1.45)];pts.forEach((p,j)=>s+=(k===0&&j===0?'M':'L')+f(p[0])+' '+f(p[1]))}s+='Z';
  d.push(Pt(s),C(118),C(56),Pt('M190 134H210V146H190Z'));tx='<text x="250" y="40">GEAR BLANK</text><text x="226" y="214">BORE</text>'}
 if(kind==='sheet'){d.push(Pt('M20 40H380V360H20Z'),Pt('M240 310H380M240 310V360M300 310V360'),Pt(cf(110,100,180,150,46,92,8)),Pt('M110 280V292M290 280V292M110 286H290'),Pt('M78 100H90M78 250H90M84 100V250'));cl='<path class="cl" d="M200 70V280M90 175H310"/>';
  tx='<text x="34" y="62">YOUR DRAWING</text><text x="248" y="340">CASTORA</text><text x="306" y="340">1 : 1</text><text x="178" y="306">L</text><text x="62" y="180">H</text>'}
 return `<svg class="sc-schem" viewBox="0 0 400 400" aria-hidden="true">${cl}${d.join('')}${tx}</svg>`}
function gearPath(cx,cy,N,ro,ri,rb){const f=n=>n.toFixed(1);let s='';for(let k=0;k<N;k++){const a=k*2*Math.PI/N,w=Math.PI/N;[[ri,a-w*.62],[ro,a-w*.32],[ro,a+w*.32],[ri,a+w*.62],[ri,a+w*1.38]].forEach(([r,t],j)=>s+=(k===0&&j===0?'M':'L')+f(cx+r*Math.cos(t))+' '+f(cy+r*Math.sin(t)))}
 return s+`Z M${cx+rb} ${cy}A${rb} ${rb} 0 1 0 ${cx-rb} ${cy}A${rb} ${rb} 0 1 0 ${cx+rb} ${cy}Z`}
function gearsArt(){return `<div class="sc-gears"><svg viewBox="0 0 520 520" aria-hidden="true"><defs><linearGradient id="gG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#EEF1F3"/><stop offset=".45" stop-color="#AEB4BA"/><stop offset="1" stop-color="#5F666D"/></linearGradient><linearGradient id="gR" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8E959C"/><stop offset=".35" stop-color="#E8ECEF"/><stop offset=".7" stop-color="#9AA1A8"/><stop offset="1" stop-color="#5B6269"/></linearGradient></defs>
 <ellipse cx="270" cy="486" rx="230" ry="18" fill="rgba(16,24,38,.18)"/>
 <g class="g1"><path d="${gearPath(200,210,22,160,138,40)}" fill="url(#gG)" fill-rule="evenodd" stroke="#4A5259" stroke-width="1.2"/><circle cx="200" cy="210" r="112" fill="none" stroke="#7d848b" stroke-width="2"/>${[0,1,2,3,4,5].map(k=>{const a=k*Math.PI/3;return `<circle cx="${(200+80*Math.cos(a)).toFixed(1)}" cy="${(210+80*Math.sin(a)).toFixed(1)}" r="16" fill="#3e454c"/>`}).join('')}<rect x="192" y="164" width="16" height="10" fill="#2b3036"/></g>
 <g class="g2"><path d="${gearPath(392,348,13,96,75,26)}" fill="url(#gG)" fill-rule="evenodd" stroke="#4A5259" stroke-width="1.2"/><circle cx="392" cy="348" r="52" fill="none" stroke="#7d848b" stroke-width="2"/></g>
 <g class="roller"><rect x="40" y="410" width="270" height="56" rx="10" fill="url(#gR)"/><ellipse cx="40" cy="438" rx="12" ry="28" fill="#6b7279"/><ellipse cx="310" cy="438" rx="12" ry="28" fill="#C9CED2"/><ellipse cx="310" cy="438" rx="5" ry="12" fill="#3e454c"/></g>
 </svg><span class="mono sc-gears-tag">Illustration · rollers &amp; gear blanks</span></div>`}
function buildShowcase(){
 $('#sIndex').innerHTML=IDX.map(x=>`<a href="${x[2]}">${icon(x[0])}<div><span class="mono">${x[3]}</span><b>${x[1]}</b></div></a>`).join('');
 $('#showcase').innerHTML=SHOW.map((s,i)=>`<article class="sc-panel sc-${s.theme}" id="sc-${s.id}">
 <div class="sc-inner"><div class="sc-copy">
  <div class="sc-meta mono"><b>${s.code}</b>${s.tag}<span class="cnt">0${i+1} / 0${SHOW.length}</span></div>
  <h3 class="mega sc-name"><span class="gs">${s.a}</span><br><span class="ga">${s.b}</span></h3>
  <p class="sc-desc">${s.d}</p>
  <div class="sc-subs">${s.subs.map((x,k)=>`<button class="sc-sub" data-k="${k}" data-cursor="View"><span class="mono">0${k+1}</span><b>${x[0]}</b>${icon('arrow-right')}<i></i></button>`).join('')}</div>
  <div class="chips mono">${s.chips.map(c=>`<span>${c}</span>`).join('')}</div>
  ${s.cta?`<div class="sc-big-cta"><a class="btn" href="#contact" data-magnetic>Send your drawing ${icon('arrow-up-right')}</a><a class="btn btn-ghost" href="mailto:info@castorafoamtech.com?subject=Drawing%20for%20quotation">info@castorafoamtech.com</a></div>`:''}
 </div>
 <div class="sc-visual${s.img?'':' noimg'}${s.wide?' has-wide':''}">${sch(s.sch)}
  ${s.gears?gearsArt():''}${s.img?`<figure class="sc-img${s.contain?' contain':''}${s.wide?' wide':''}"><img src="${s.img}" alt="${s.a} ${s.b}" loading="lazy" style="object-position:${s.pos||'50% 50%'}"><div class="brackets"><i></i><i></i><i></i><i></i></div></figure>`:''}
  <div class="sc-callout"><div class="swap"><span class="mono"><span class="cc-n">01</span><span>${s.short}</span></span><b class="cc-t"></b><p class="cc-d"></p></div></div>
  <span class="sc-fig mono">${s.fig}</span>
 </div></div><div class="sc-shade"></div></article>`).join('');
}
const PANELS=[],CYC=3200;
function setSub(o,k,user){o.k=k;o.last=performance.now();o.subs.forEach((b,j)=>{b.classList.remove('on','paused');if(j===k){void b.offsetWidth;b.classList.add('on');if(user)b.classList.add('paused')}});
 const sub=o.S.subs[k];o.call.classList.add('out');clearTimeout(o.to);o.to=setTimeout(()=>{$('.cc-n',o.call).textContent='0'+(k+1)+' / 0'+o.S.subs.length;$('.cc-t',o.call).textContent=sub[0];$('.cc-d',o.call).textContent=sub[1];o.call.classList.remove('out')},o.init?180:0);o.init=1;
 if(o.img){const sh=[[0,0],[-3,2],[3,-2],[-2,-3]][k%4];o.img.style.setProperty('--ix',sh[0]+'%');o.img.style.setProperty('--iy',sh[1]+'%')}}
function showcaseInit(){$$('.sc-panel').forEach((p,i)=>{const o={p,i,S:SHOW[i],inner:$('.sc-inner',p),shade:$('.sc-shade',p),img:$('.sc-img',p),dr:$$('.dr',p),subs:$$('.sc-sub',p),call:$('.sc-callout',p),k:0,last:0,hold:0,active:false};
 o.subs.forEach((b,k)=>{const go=()=>{o.hold=performance.now()+7000;setSub(o,k,true)};b.addEventListener('mouseenter',go);b.addEventListener('click',go)});
 setSub(o,0);PANELS.push(o)});
 PANELS.forEach((o,i)=>view(o.p,(_,r)=>{const desk=vw>=1000;const e=desk?clamp(1-r.top/vh):clamp((vh-r.top)/(vh*.75));let c=0;const nx=PANELS[i+1];
  if(desk&&nx){c=clamp(1-nx.p.getBoundingClientRect().top/vh)}
  if(desk){o.inner.style.transform=c>0?`scale(${(1-c*.08).toFixed(4)}) translateY(${(-c*4).toFixed(2)}vh)`:'';o.shade.style.opacity=(c*.75).toFixed(3)}
  if(o.img)o.img.style.setProperty('--ez',(1.24-ease(e)*.18).toFixed(3));
  const dd=ease(R(.15,1,e));o.dr.forEach((p,j)=>p.style.strokeDashoffset=clamp(1-dd*1.25+j*.012).toFixed(3));
  o.active=r.top<vh*.5&&r.top+r.height>vh*.5&&c<.5}));
}
function showcaseTick(now){for(const o of PANELS){if(o.active&&now>o.hold&&now-o.last>CYC)setSub(o,(o.k+1)%o.subs.length)}}

/* ---------- build DOM ---------- */
function build(){
 // hero split
 $$('[data-split]').forEach(el=>{const t=el.textContent;el.innerHTML=[...t].map((c,i)=>`<span class="ch${c===' '?' sp':''}" style="transition-delay:${.35+i*.045}s">${c===' '?'&nbsp;':c}</span>`).join('')});
 // statement words
 const st=$('#statement');
 const wrapWords=node=>{[...node.childNodes].forEach(n=>{if(n.nodeType===3){const f=document.createDocumentFragment();n.textContent.split(/(\s+)/).forEach(w=>{if(!w.trim())return;const s=document.createElement('span');s.className='w';s.textContent=w;f.appendChild(s)});node.replaceChild(f,n)}else wrapWords(n)})};
 wrapWords(st);
 // segs
 $('#segs').innerHTML='<i></i>'.repeat(40);
 buildShowcase();
 // workflow
 $('#wfList').insertAdjacentHTML('beforeend',WF.map((w,i)=>`<div class="wf-item"><div class="wf-node">${icon(w[0])}</div><span class="mono">0${i+1}</span><h4>${w[1]}</h4><p>${w[2]}</p></div>`).join(''));
 // quality
 $('#qCards').innerHTML=QC.map((q,i)=>`<div class="q-card rv d${i%3+1}${q[3]?' dark':''}"><div class="ring">${icon(q[0])}</div><b>${q[1]}</b><span>${q[2]}</span></div>`).join('');
 // why
 $('#whyGrid').innerHTML=WHY.map((w,i)=>`<div class="why-card rv d${i%3+1}"><span class="n mega ga">0${i+1}</span><div class="ring">${icon(w[0])}</div><div><h4>${w[1]}</h4><p>${w[2]}</p></div></div>`).join('');
 // marquee
 const words=['Precision.','Process.','Consistency.','Scale.'];
 const set=words.map(w=>`<span class="${w==='Consistency.'?'f':''}">${w}</span>`).join('');
 $('#mq').innerHTML=set+set+set+set;
 // film
 $('#filmTrack').innerHTML=FRAMES.map((f,i)=>f.t?`<article class="frame title"><div><span class="mono" style="color:var(--amber)">Process film · 6 steps</span><h2 class="mega" style="margin-top:20px"><span class="gs">Lost Foam</span><br><span class="ga">Casting</span></h2><p>Six moves from foam to finished metal.</p><div class="go mono">Keep scrolling <i></i></div></div></article>`:
  `<article class="frame"><div class="frame-copy"><span class="step mono">Step 0${i} / 06</span><h3 class="mega gs">${f.s}</h3><p>${f.p}</p><span class="chip mono">${f.c}</span></div><div class="frame-art"><svg viewBox="70 -10 350 360" id="sc${i}"></svg></div></article>`).join('');
 $('#filmSteps').innerHTML=FRAMES.slice(1).map((f,i)=>`<li class="mono"><b>0${i+1}</b>${f.s}</li>`).join('');
 $('#process').style.height=(FRAMES.length*100+100)+'vh';
 // chapters
 const chs=$$('[data-chapter]');
 $('#rail').innerHTML=chs.map(c=>`<a href="#${c.id}" class="mono"><span>${c.dataset.chapter}</span></a>`).join('');
 $('#menu ol').innerHTML=chs.map((c,i)=>`<li><a href="#${c.id}"><b>${String(i).padStart(2,'0')}</b><span>${c.dataset.chapter}</span></a></li>`).join('');
 fillIcons();
}

/* ---------- SVG process scenes ---------- */
const NS='http://www.w3.org/2000/svg';
const defs=`<svg width="0" height="0" style="position:absolute" aria-hidden="true"><defs>
<linearGradient id="gMol" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFF4CC"/><stop offset=".3" stop-color="#FFB44D"/><stop offset=".7" stop-color="#E0792B"/><stop offset="1" stop-color="#A33A0E"/></linearGradient>
<linearGradient id="gStl" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#E8ECEF"/><stop offset=".5" stop-color="#A9AEB3"/><stop offset="1" stop-color="#70777E"/></linearGradient>
<linearGradient id="gLad" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#3F4247"/><stop offset=".5" stop-color="#6b7178"/><stop offset="1" stop-color="#2b2e33"/></linearGradient>
<pattern id="pBead" width="7" height="7" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.6" fill="#D9DFE4"/><circle cx="5.5" cy="5.5" r="1.2" fill="#E4E8EB"/></pattern>
<pattern id="pSand" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="#A88B5E"/><circle cx="2" cy="3" r="1.1" fill="#C7AA78"/><circle cx="7" cy="7" r="1" fill="#8E7348"/><circle cx="8" cy="2" r=".8" fill="#D3B988"/><circle cx="4" cy="8" r=".7" fill="#BA9C6A"/></pattern>
<filter id="fGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="7" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
<radialGradient id="gHeat"><stop offset="0" stop-color="#FF9A3C" stop-opacity=".75"/><stop offset="1" stop-color="#FF9A3C" stop-opacity="0"/></radialGradient>
<linearGradient id="gShine" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".5" stop-color="#fff" stop-opacity=".75"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
</defs></svg>`;
document.body.insertAdjacentHTML('afterbegin',defs);
const MAT={foam:{f:'#F3F5F6',t:'#FFFFFF',s:'#C2CBD2',h:'#7F8C97',tex:'url(#pBead)'},cer:{f:'#E6D6B6',t:'#F4E8D0',s:'#B89E72',h:'#6E5A3C'},mol:{f:'url(#gMol)',t:'#FFE3AC',s:'#C2561A',h:'#4a1804'},stl:{f:'url(#gStl)',t:'#E3E7EA',s:'#666D74',h:'#262D34'}};
function cf(x,y,w,h,hw,hh,r=3){const hx=x+w/2-hw/2,hy=y+h/2-hh/2,hr=hw/2;return `M${x+r} ${y}H${x+w-r}Q${x+w} ${y} ${x+w} ${y+r}V${y+h-r}Q${x+w} ${y+h} ${x+w-r} ${y+h}H${x+r}Q${x} ${y+h} ${x} ${y+h-r}V${y+r}Q${x} ${y} ${x+r} ${y}Z M${hx+hr} ${hy}A${hr} ${hr} 0 0 1 ${hx+hw} ${hy+hr}V${hy+hh-hr}A${hr} ${hr} 0 0 1 ${hx} ${hy+hh-hr}V${hy+hr}A${hr} ${hr} 0 0 1 ${hx+hr} ${hy}Z`}
function block(x,y,w,h,hw,hh,d,m){const dx=d,dy=-d*.7,hx=x+w/2-hw/2,hy=y+h/2-hh/2;const p=cf(x,y,w,h,hw,hh);
 return `<path d="M${x} ${y}L${x+dx} ${y+dy}H${x+w+dx}L${x+w} ${y}Z" fill="${m.t}"/><path d="M${x+w} ${y}L${x+w+dx} ${y+dy}V${y+h+dy}L${x+w} ${y+h}Z" fill="${m.s}"/><rect x="${hx}" y="${hy}" width="${hw}" height="${hh}" rx="${hw/2}" fill="${m.h}"/><rect x="${hx+2}" y="${hy+2}" width="${hw-4}" height="${hh*.45}" rx="${hw/2-2}" fill="${m.s}" opacity=".55"/><path d="${p}" fill="${m.f}" fill-rule="evenodd"/>${m.tex?`<path d="${p}" fill="${m.tex}" fill-rule="evenodd" opacity=".75"/>`:''}`}
function blockOutline(x,y,w,h,hw,hh,d,stroke){const dx=d,dy=-d*.7;return `<g fill="none" stroke="${stroke}" stroke-width="1.4" stroke-dasharray="4 4"><path d="${cf(x,y,w,h,hw,hh)}"/><path d="M${x} ${y}L${x+dx} ${y+dy}H${x+w+dx}V${y+h+dy}L${x+w} ${y+h}M${x+w} ${y}L${x+w+dx} ${y+dy}"/></g>`}
const PP=[[128,96],[274,96],[128,200],[274,200]],PW=78,PH=84,PHW=24,PHH=46,PD=12;
const sprue=m=>`<path d="M212 48H268L252 78H228Z" fill="${m.t}"/><path d="M212 48H268L264 56H216Z" fill="${m.s}" opacity=".5"/><rect x="232" y="78" width="16" height="222" fill="${m.f}"/><path d="M248 78l8 -5.6V294.4L248 300Z" fill="${m.s}"/><rect x="220" y="298" width="40" height="10" rx="2" fill="${m.s}"/>`;
const gate=(i,m)=>{const [x,y]=PP[i];const gy=y+PH/2-6;const gx=i%2?248:x+PW;return `<rect x="${gx}" y="${gy}" width="26" height="12" fill="${m.f}"/><path d="M${gx} ${gy}l6 -4.2h26l-6 4.2Z" fill="${m.t}"/>`};
const pat=(i,m)=>block(PP[i][0],PP[i][1],PW,PH,PHW,PHH,PD,m);
const clusterAll=m=>sprue(m)+[0,1,2,3].map(i=>gate(i,m)).join('')+[0,1,2,3].map(i=>pat(i,m)).join('');
const clusterOutline=s=>`<g fill="none" stroke="${s}" stroke-width="1.4" stroke-dasharray="4 4"><path d="M212 48H268L252 78H228Z"/><rect x="232" y="78" width="16" height="222"/>${PP.map((p,i)=>`<rect x="${i%2?248:p[0]+PW}" y="${p[1]+PH/2-6}" width="26" height="12"/>`).join('')}</g>`+PP.map(p=>blockOutline(p[0],p[1],PW,PH,PHW,PHH,PD,s)).join('');
const label=(x,y,tx,anchor='start',id='')=>`<g ${id?`id="${id}"`:''} class="lbl"><circle cx="${x}" cy="${y}" r="3" fill="#E0892B"/><text x="${x+(anchor==='end'?-10:10)}" y="${y+4}" text-anchor="${anchor}" font-family="IBM Plex Mono" font-size="10" letter-spacing="1.5" fill="#A9C0D1">${tx}</text></g>`;
function srand(s){return()=>{s=(s*9301+49297)%233280;return s/233280}}
const flask=`<g id="flask"><rect x="92" y="66" width="296" height="268" rx="4" fill="rgba(127,160,184,.05)" stroke="#7FA0B8" stroke-width="6"/><rect x="80" y="60" width="320" height="10" rx="2" fill="#4A7899"/><rect x="80" y="330" width="320" height="10" rx="2" fill="#4A7899"/></g>`;

const SC={};
function initScenes(){
 // 1 foam pattern
 const r=srand(7);const beads=[];for(let i=0;i<56;i++){let tx,ty;do{tx=172+r()*136;ty=102+r()*146}while(tx>214&&tx<266&&ty>133&&ty<217);beads.push({sx:40+r()*400,sy:20+r()*320,tx,ty,d:r()})}
 $('#sc1').innerHTML=`<ellipse cx="250" cy="282" rx="120" ry="14" fill="rgba(0,0,0,.35)"/>
  <g id="s1solid" opacity="0">${block(170,100,140,150,44,84,22,MAT.foam)}</g>
  <path id="s1line" d="${cf(170,100,140,150,44,84)}" fill="none" stroke="#fff" stroke-width="1.6" pathLength="1" stroke-dasharray="1" stroke-dashoffset="1"/>
  <g id="s1beads">${beads.map(b=>`<circle r="${2+b.d*2.2}" fill="#fff" opacity=".9"/>`).join('')}</g>
  <g id="s1dim" opacity="0" stroke="#7FA0B8" stroke-width="1"><path d="M170 300V310M310 300V310M170 305H310" fill="none"/><path d="M140 100H150M140 250H150M145 100V250" fill="none"/><text x="240" y="326" text-anchor="middle" font-family="IBM Plex Mono" font-size="10" letter-spacing="2" fill="#A9C0D1" stroke="none">1 : 1 GEOMETRY</text></g>
  ${label(346,90,'EPS FOAM','start','s1l')}`;
 SC[1]={beads,els:$$('#s1beads circle'),solid:$('#s1solid'),line:$('#s1line'),dim:$('#s1dim'),lbl:$('#s1l')};
 // 2 cluster assembly
 $('#sc2').innerHTML=`<ellipse cx="246" cy="318" rx="150" ry="14" fill="rgba(0,0,0,.35)"/><g id="s2sprue">${sprue(MAT.foam)}</g><g id="s2gates" opacity="0">${[0,1,2,3].map(i=>gate(i,MAT.foam)).join('')}</g>${[0,1,2,3].map(i=>`<g class="s2p">${pat(i,MAT.foam)}</g>`).join('')}
  <g id="s2l" opacity="0">${label(272,44,'POURING CUP')}${label(256,250,'SPRUE')}${label(110,140,'PATTERN','end')}${label(219,146,'GATE','end')}</g>`;
 SC[2]={sprue:$('#s2sprue'),gates:$('#s2gates'),pats:$$('#sc2 .s2p'),lbl:$('#s2l')};
 // 3 coating
 $('#sc3').innerHTML=`<clipPath id="c3c"><rect id="c3r" x="100" y="300" width="300" height="0"/></clipPath>
  <ellipse cx="240" cy="250" rx="146" ry="16" fill="#C9B489"/>
  <g id="s3cl"><g>${clusterAll(MAT.foam)}</g><g clip-path="url(#c3c)">${clusterAll(MAT.cer)}</g><g id="s3drip"><circle cx="160" cy="300" r="3" fill="#E6D6B6"/><circle cx="318" cy="300" r="3" fill="#E6D6B6"/><circle cx="240" cy="312" r="3.5" fill="#E6D6B6"/></g></g>
  <path d="M94 250A146 16 0 0 0 386 250V340Q386 350 376 350H104Q94 350 94 340Z" fill="#B39A6C" opacity=".96"/><path d="M94 250A146 16 0 0 0 386 250" fill="none" stroke="#E6D6B6" stroke-width="2"/>
  <text x="240" y="312" text-anchor="middle" font-family="IBM Plex Mono" font-size="10" letter-spacing="2" fill="#5a4630">CERAMIC SLURRY</text>`;
 SC[3]={cl:$('#s3cl'),clip:$('#c3r'),drip:$$('#s3drip circle')};
 // 4 flask & sand
 $('#sc4').innerHTML=`<clipPath id="c4c"><rect x="95" y="69" width="290" height="262"/></clipPath><g id="s4all"><g>${clusterAll(MAT.cer)}</g>
  <g clip-path="url(#c4c)"><rect id="s4sand" x="95" y="331" width="290" height="0" fill="url(#pSand)" opacity=".95"/><g id="s4fall">${Array.from({length:24},(_,i)=>`<circle cx="${i%2?150:330}" r="2" fill="#C7AA78"/>`).join('')}</g></g>
  <g id="s4out" opacity="0">${clusterOutline('rgba(255,255,255,.75)')}</g>${flask}</g>
  <g id="s4vib" opacity="0" stroke="#E0892B" stroke-width="2" fill="none" stroke-linecap="round"><path d="M60 170q-10 30 0 60M46 160q-14 40 0 80"/><path d="M420 170q10 30 0 60M434 160q14 40 0 80"/></g>
  <text x="240" y="364" text-anchor="middle" font-family="IBM Plex Mono" font-size="10" letter-spacing="2" fill="#A9C0D1">UNBONDED SAND · NO BINDER</text>`;
 SC[4]={all:$('#s4all'),sand:$('#s4sand'),fall:$$('#s4fall circle'),out:$('#s4out'),vib:$('#s4vib')};
 // 5 pour
 $('#sc5').innerHTML=`<clipPath id="c5c"><rect id="c5r" x="100" y="44" width="300" height="0"/></clipPath>
  <rect x="95" y="69" width="290" height="262" fill="url(#pSand)" opacity=".8"/>
  <g>${clusterOutline('rgba(255,255,255,.7)')}</g>
  <ellipse id="s5heat" cx="246" cy="190" rx="190" ry="150" fill="url(#gHeat)" opacity="0"/>
  <g clip-path="url(#c5c)" filter="url(#fGlow)">${clusterAll(MAT.mol)}</g>
  ${flask}
  <g id="s5smoke">${Array.from({length:7},()=>`<circle r="8" fill="#C9D3DC"/>`).join('')}</g>
  <rect id="s5stream" x="236" y="2" width="8" height="0" rx="4" fill="url(#gMol)" filter="url(#fGlow)"/>
  <g id="s5ladle"><path d="M190 -102H280L272 -34Q270 -24 260 -24H210Q200 -24 198 -34Z" fill="url(#gLad)"/><path d="M192 -98H278" stroke="#FFB44D" stroke-width="6" stroke-linecap="round" filter="url(#fGlow)"/><path d="M280 -80H332" stroke="#3F4247" stroke-width="8" stroke-linecap="round"/></g>
  <g id="s5l" opacity="0">${label(398,150,'MOLTEN METAL')}${label(180,30,'FOAM VAPORISES','end')}</g>`;
 SC[5]={clip:$('#c5r'),heat:$('#s5heat'),smoke:$$('#s5smoke circle'),stream:$('#s5stream'),ladle:$('#s5ladle'),lbl:$('#s5l')};
 // 6 shakeout
 $('#sc6').innerHTML=`<ellipse cx="246" cy="326" rx="160" ry="14" fill="rgba(0,0,0,.35)"/>
  <g id="s6sand"><rect x="95" y="69" width="290" height="262" fill="url(#pSand)"/></g>
  <g id="s6flask">${flask}</g>
  <g id="s6mol">${sprue(MAT.mol)}${[0,1,2,3].map(i=>gate(i,MAT.mol)).join('')}</g>
  <g id="s6stl" opacity="0">${sprue(MAT.stl)}${[0,1,2,3].map(i=>gate(i,MAT.stl)).join('')}</g>
  ${[0,1,2,3].map(i=>`<g class="s6p"><g class="m">${pat(i,MAT.mol)}</g><g class="s" opacity="0">${pat(i,MAT.stl)}</g></g>`).join('')}
  <g id="s6spark">${[[214,92],[362,88],[210,196],[358,192]].map(([x,y])=>`<path d="M${x} ${y-12}L${x+2.5} ${y-2.5}L${x+12} ${y}L${x+2.5} ${y+2.5}L${x} ${y+12}L${x-2.5} ${y+2.5}L${x-12} ${y}L${x-2.5} ${y-2.5}Z" fill="#fff"/>`).join('')}</g>
  <g id="s6l" opacity="0">${label(380,330,'NEAR-NET SHAPE','end')}</g>`;
 SC[6]={sand:$('#s6sand'),flask:$('#s6flask'),mol:$('#s6mol'),stl:$('#s6stl'),pats:$$('#sc6 .s6p'),spark:$$('#s6spark path'),lbl:$('#s6l')};
}
const sa=(el,k,v)=>el.setAttribute(k,v);
const UPD={
 1(a){const S=SC[1];S.els.forEach((c,i)=>{const b=S.beads[i];const t=ease(clamp(a/.42-b.d*.25));sa(c,'cx',lerp(b.sx,b.tx,t));sa(c,'cy',lerp(b.sy,b.ty,t));c.style.opacity=(1-R(.42,.6,a))*.9});
  sa(S.line,'stroke-dashoffset',1-ease(R(.05,.5,a)));S.solid.style.opacity=R(.35,.65,a);S.dim.style.opacity=R(.65,.85,a);S.lbl.style.opacity=R(.7,.9,a)},
 2(a){const S=SC[2];S.sprue.style.transform=`translateY(${(1-ease(R(0,.25,a)))*-260}px)`;S.sprue.style.opacity=R(0,.12,a);
  S.pats.forEach((p,i)=>{const t=ease(R(.12+i*.1,.45+i*.1,a));p.style.transform=`translate(${(1-t)*(i%2?320:-320)}px,${(1-t)*(i<2?-40:40)}px) rotate(${(1-t)*(i%2?25:-25)}deg)`;p.style.transformOrigin='240px 180px';p.style.opacity=t});
  S.gates.style.opacity=R(.7,.82,a);S.lbl.style.opacity=R(.82,.95,a)},
 3(a){const S=SC[3];const down=a<.42?ease(R(0,.42,a)):1-ease(R(.42,.78,a));S.cl.style.transform=`translateY(${down*150}px)`;const c=ease(R(.05,.42,a));sa(S.clip,'y',308-c*262);sa(S.clip,'height',c*262+4);
  S.drip.forEach((d,i)=>{const t=R(.55,1,a);const y=300+((t*220+i*40)%70);sa(d,'cy',y+(i==2?10:0));d.style.opacity=t>0&&t<1?.9*(1-((t*220+i*40)%70)/70):0})},
 4(a,now){const S=SC[4];const s=ease(R(.08,.75,a));sa(S.sand,'y',331-s*262);sa(S.sand,'height',s*262);
  const top=331-s*262;S.fall.forEach((c,i)=>{const k=i>>1;const y=((now/6+k*30)%Math.max(1,top-60))+60;sa(c,'cy',y);c.style.opacity=a>.02&&a<.75?.9:0});
  S.out.style.opacity=R(.15,.5,a);const v=a>.25&&a<.92?1:0;S.vib.style.opacity=v*(.5+.5*Math.sin(now/90));S.all.style.transform=`translateX(${v*Math.sin(now/22)*1.8}px)`},
 5(a,now){const S=SC[5];const tilt=ease(R(0,.25,a))*(1-ease(R(.92,1,a)));S.ladle.style.transform=`rotate(${-36*tilt}deg)`;S.ladle.style.transformOrigin='280px -80px';
  const sOn=R(.18,.28,a)*(1-R(.86,.94,a));sa(S.stream,'height',sOn*58);S.stream.style.opacity=sOn>0?1:0;
  const f=ease(R(.26,.88,a));sa(S.clip,'height',f*270);S.heat.style.opacity=f*.9;
  S.smoke.forEach((c,i)=>{const t=((now/1400+i/7)%1);sa(c,'cx',240+Math.sin(i*2+now/500)*20+(i%2?14:-14)*t);sa(c,'cy',40-t*70);sa(c,'r',6+t*16);c.style.opacity=f>0&&f<1?(1-t)*.35:0});S.lbl.style.opacity=R(.4,.55,a)},
 6(a,now){const S=SC[6];const sd=ease(R(.05,.4,a));S.flask.style.transform=`translateY(${-sd*380}px)`;S.flask.style.opacity=1-sd;S.sand.style.transform=`translateY(${sd*260}px)`;S.sand.style.opacity=1-sd;
  const cool=R(.2,.55,a);S.mol.style.opacity=1-cool;S.stl.style.opacity=cool;const sep=ease(R(.55,.85,a));S.stl.style.transform=S.mol.style.transform=`translateY(${-sep*30}px)`;S.stl.style.opacity=cool*(1-sep*.85);
  S.pats.forEach((p,i)=>{p.style.transform=`translate(${(i%2?1:-1)*sep*34}px,${sep*18}px)`;p.querySelector('.m').style.opacity=1-cool;p.querySelector('.s').style.opacity=cool});
  const sp=R(.82,.95,a);S.spark.forEach((p,i)=>{const tw=.5+.5*Math.sin((now||0)/180+i*1.7);p.style.opacity=sp*tw;p.style.transformBox='fill-box';p.style.transformOrigin='center';p.style.transform=`scale(${.4+sp*tw*.8}) translate(${(i%2?1:-1)*0}px,0)`});S.lbl.style.opacity=R(.85,.95,a)}
};

/* ---------- scroll engine ---------- */
const scenes=[];
const pin=(el,fn)=>scenes.push({el,fn,pin:1});
const view=(el,fn)=>scenes.push({el,fn,pin:0});
function measure(){vw=document.documentElement.clientWidth;vh=innerHeight;frameW=track.firstElementChild?track.firstElementChild.offsetWidth:vw;scenes.forEach(s=>{const r=s.el.getBoundingClientRect();s.top=r.top+scrollY;s.h=s.el.offsetHeight});
 chap=$$('[data-chapter]').map(el=>({el,top:el.getBoundingClientRect().top+scrollY}));docH=document.documentElement.scrollHeight}
let frameW=1,chap=[],docH=1,sy=scrollY,ssy=scrollY,lastSy=scrollY,vel=0,mx=.5,my=.5,smx=.5,smy=.5;

/* hero */
const heroMedia=$('#heroMedia'),heroTitle=$('#heroTitle'),heroFoot=$('#heroFoot'),heroDim=$('#heroDim');
pin($('#top'),p=>{heroMedia.style.transform=`translate3d(${(smx-.5)*-30}px,${(smy-.5)*-20-p*60}px,0) scale(${1.06+p*.28})`;
 heroTitle.style.transform=`translate3d(${(smx-.5)*16}px,${-p*22}vh,0) scale(${1+p*.18})`;heroTitle.style.opacity=1-R(.25,.75,p);
 heroFoot.style.opacity=1-R(0,.35,p);heroDim.style.opacity=R(.35,1,p)*.92;emberBoost=1+p*1.5});
/* statement */
const words=()=>$$('#statement .w');let W=[];
view($('#statement'),(p,r)=>{const q=clamp((vh*.88-r.top)/(vh*.55+r.height*.3));const n=W.length;W.forEach((w,i)=>w.style.opacity=.12+.88*clamp(q*n*1.1-i))});
/* expand */
const ef=$('#expandFrame'),efi=$('#expandFrame img'),ec=$('#expandCopy');
pin($('#expand'),p=>{const k=easeIO(R(0,.62,p));const sm=vw<700;const iy=lerp(sm?18:22,0,k),ix=lerp(sm?8:30,0,k);ef.style.clipPath=`inset(${iy}% ${ix}% ${iy}% ${ix}% round ${lerp(28,0,k)}px)`;efi.style.transform=`scale(${lerp(1.4,1.04,k)+R(.6,1,p)*.06}) translateY(${(p-.5)*-30}px)`;const o=R(.55,.75,p);ec.style.opacity=o;ec.style.transform=`translateY(${(1-o)*40}px)`});
/* scale */
const bigNum=$('#bigNum'),scImg=$('#scaleImg'),stEls=$$('#stats .stat'),segs=()=>$$('#segs i');let SEG=[];
pin($('#scale'),p=>{scImg.style.transform=`scale(${1.32-p*.28}) translateX(${p*-3}%)`;bigNum.textContent=Math.round(ease(R(.02,.4,p))*40000).toLocaleString('en-IN');
 stEls.forEach((s,i)=>{const t=ease(R(.36+i*.08,.56+i*.08,p));s.style.opacity=t;s.style.transform=`translateY(${(1-t)*40}px)`;const sp=s.querySelector('[data-to]');sp.textContent=Math.round(t*+sp.dataset.to);if(i===3){const on=Math.round(t*39.2);SEG.forEach((g,j)=>g.classList.toggle('on',j<on))}})});
/* film */
const track=$('#filmTrack'),fBar=$('#filmBar'),fTc=$('#filmTc');let fSteps=[];
pin($('#process'),(p,r,now)=>{const n=FRAMES.length;const t=p*n;const i=Math.min(n-1,Math.floor(t));const f=t-i;const slide=i<n-1?easeIO(R(.62,1,f)):0;track.style.transform=`translate3d(${-(i+slide)*frameW}px,0,0)`;
 for(let k=Math.max(1,i-1);k<=Math.min(n-1,i+1);k++)UPD[k](k<i?1:k>i?0:R(0,.62,f),now);
 fBar.style.transform=`scaleX(${p})`;const secs=p*42;fTc.textContent=`00:${String(Math.floor(secs)).padStart(2,'0')}:${String(Math.floor((secs%1)*24)).padStart(2,'0')}`;fSteps.forEach((li,k)=>li.classList.toggle('on',k===i-1))});
/* workflow */
const wfFill=$('#wfFill'),wfHead=$('#wfHead'),wfN=$('#wfN'),wfT=$('#wfT'),wfImg=$('#wfImg');let wfItems=[];
view($('#wfList'),(p,r)=>{const q=clamp((vh*.6-r.top)/(r.height-60));wfFill.style.transform=`scaleY(${q})`;wfHead.style.top=(q*100)+'%';let last=0;const H=r.height;wfItems.forEach((it,i)=>{const on=(it.offsetTop+30)/H<=q+.02;it.classList.toggle('lit',on);if(on)last=i});wfN.textContent='0'+(last+1);wfT.textContent=WF[last][1];wfImg.style.transform=`scale(${1.18-q*.14}) translateY(${(q-.5)*-4}%)`});
/* parallax */
$$('[data-par]').forEach(el=>view(el.parentElement,(p,r)=>{el.style.transform=`translate3d(0,${(r.top+r.height/2-vh/2)*+el.dataset.par}px,0)`}));

let emberBoost=1;
function tick(now){
 sy=scrollY;ssy=reduce?sy:lerp(ssy,sy,.14);if(Math.abs(ssy-sy)<.3)ssy=sy;
 vel=lerp(vel,sy-lastSy,.15);lastSy=sy;smx=lerp(smx,mx,.06);smy=lerp(smy,my,.06);
 const d=ssy-sy;
 for(const s of scenes){
  if(s.pin){const top=s.top-ssy;if(top>vh||top+s.h<0)continue;const p=clamp((ssy-s.top)/Math.max(1,s.h-vh));s.fn(p,null,now)}
  else{const r=s.el.getBoundingClientRect();const R2={top:r.top+d,height:r.height};if(R2.top>vh*1.2||R2.top+R2.height<-vh*.2)continue;s.fn(0,R2,now)}
 }
 $('#progress i').style.transform=`scaleX(${clamp(sy/(docH-vh))})`;
 // header
 hdr.classList.toggle('solid',sy>vh*.5);hdr.classList.toggle('hide',sy>vh*1.2&&vel>2&&!document.body.classList.contains('menu-open'));if(vel<-2||sy<vh)hdr.classList.remove('hide');
 // rail
 let cur=0;chap.forEach((c,i)=>{if(c.top<=sy+vh*.45)cur=i});railA.forEach((a,i)=>a.classList.toggle('on',i===cur));
 // marquee
 mqX-=(1.1+Math.min(Math.abs(vel),40)*.25)*(vel<-.5?-1:1);const half=mq.scrollWidth/2;if(mqX<-half)mqX+=half;if(mqX>0)mqX-=half;mq.style.transform=`translate3d(${mqX}px,0,0) skewX(${clamp(-vel*.3,-10,10)}deg)`;
 cursorTick();embersTick(now);showcaseTick(now);c3Tick();pourTick(now);
 requestAnimationFrame(tick);
}
const hdr=$('#hdr');let railA=[];const mq=$('#mq');let mqX=0;

/* ---------- embers ---------- */
const cv=$('#embers'),cx=cv.getContext('2d');let EM=[],cvW=0,cvH=0,dpr=Math.min(2,devicePixelRatio||1),heroVisible=true;
const sprite=document.createElement('canvas');sprite.width=sprite.height=32;{const g=sprite.getContext('2d');const rg=g.createRadialGradient(16,16,0,16,16,16);rg.addColorStop(0,'rgba(255,240,200,1)');rg.addColorStop(.25,'rgba(255,170,70,.9)');rg.addColorStop(1,'rgba(224,100,20,0)');g.fillStyle=rg;g.fillRect(0,0,32,32)}
function sizeEmbers(){cvW=cv.clientWidth;cvH=cv.clientHeight;cv.width=cvW*dpr;cv.height=cvH*dpr;const N=reduce?0:(vw<700?60:150);EM=Array.from({length:N},()=>spawn(true))}
function spawn(init){const fromPour=Math.random()<.45;return{x:fromPour?cvW*(.5+(Math.random()-.5)*.25):Math.random()*cvW,y:init?Math.random()*cvH:(fromPour?cvH*(.3+Math.random()*.25):cvH+10),vx:(Math.random()-.5)*.6,vy:-(.4+Math.random()*1.4),s:.25+Math.random()*.9,l:0,L:200+Math.random()*300,ph:Math.random()*6}}
function embersTick(now){if(!heroVisible||!EM.length)return;cx.setTransform(dpr,0,0,dpr,0,0);cx.clearRect(0,0,cvW,cvH);cx.globalCompositeOperation='lighter';
 const px=mx*cvW,py=my*cvH;
 for(const e of EM){e.l++;e.ph+=.03;e.vx+=Math.sin(e.ph)*.02;const dx=e.x-px,dy=e.y-py,d2=dx*dx+dy*dy;if(fine&&d2<22000){const f=(22000-d2)/22000*.5;e.vx+=dx/Math.sqrt(d2+1)*f;e.vy+=dy/Math.sqrt(d2+1)*f*.5}
  e.vx*=.985;e.x+=e.vx;e.y+=e.vy*emberBoost;const life=e.l/e.L;if(life>1||e.y<-20){Object.assign(e,spawn(false));continue}
  const a=Math.sin(Math.PI*life)*(.7+.3*Math.sin(now/120+e.ph*3));const sz=5+16*e.s;cx.globalAlpha=a;cx.drawImage(sprite,e.x-sz/2,e.y-sz/2,sz,sz)}
 cx.globalAlpha=1}
new IntersectionObserver(es=>{heroVisible=es[0].isIntersecting}).observe($('#top .hero-pin'));

/* ---------- compare ---------- */
const cmp=$('#compare'),cA=$('#cmpA'),cB=$('#cmpB');let cx2=50,cxT=50,dragC=false,hinted=false;
function setCmp(x){cmp.style.setProperty('--x',x+'%')}
let cmpTouched=false,cmpVis=false;
const cmpPos=e=>{const r=cmp.getBoundingClientRect();cxT=clamp((e.clientX-r.left)/r.width*100,4,96)};
cmp.addEventListener('pointerdown',e=>{dragC=true;cmpTouched=true;cmp.setPointerCapture(e.pointerId);cmpPos(e)});
cmp.addEventListener('pointermove',e=>{if(dragC)cmpPos(e)});
['pointerup','pointercancel'].forEach(t=>cmp.addEventListener(t,()=>dragC=false));
new IntersectionObserver(es=>{cmpVis=es[0].isIntersecting},{threshold:.25}).observe(cmp);
(function cmpLoop(){if(!cmpTouched&&cmpVis&&!reduce)cxT=50+Math.sin(performance.now()/1300)*11;cx2=lerp(cx2,cxT,dragC?.35:.08);setCmp(cx2);requestAnimationFrame(cmpLoop)})();

/* ---------- 3D corner casting ---------- */
const c3=$('#c3'),stage=$('#c3Stage');let faces=[],ax=-24,ay=-38,vax=0,vay=0,dragK=false,lastX=0,lastY=0,idle=0,target=null,sx=1,sy3=1,tsx=1,tsy=1;
function buildCube(){const K=Math.min(1.9,Math.max(1,stage.clientWidth*.5/178));const W=178*K,H=118*K,D=162*K;
 const F=[['front',W,H,`translateZ(${D/2}px)`,[0,0,1],[.2,.56]],['back',W,H,`rotateY(180deg) translateZ(${D/2}px)`,[0,0,-1]],['right',D,H,`rotateY(90deg) translateZ(${W/2}px)`,[1,0,0],[.22,.56]],['left',D,H,`rotateY(-90deg) translateZ(${W/2}px)`,[-1,0,0]],['top',W,D,`rotateX(90deg) translateZ(${H/2}px)`,[0,-1,0],[.6,.42,'30%']],['bottom',W,D,`rotateX(-90deg) translateZ(${H/2}px)`,[0,1,0]]];
 c3.innerHTML=F.map(f=>`<div class="f" style="width:${f[1]}px;height:${f[2]}px;margin:${-f[2]/2}px 0 0 ${-f[1]/2}px;transform:${f[3]}">${f[5]?`<div class="hole" style="width:${f[5][0]*100}%;height:${f[5][1]*100}%;border-radius:${f[5][2]||'999px'}"></div>`:''}</div>`).join('');
 faces=$$('.f',c3).map((el,i)=>({el,n:F[i][4]}))}
const L=(()=>{const v=[.3,-.75,.95];const m=Math.hypot(...v);return v.map(x=>x/m)})();
function c3Tick(){if(!faces.length)return;
 if(target){ax=lerp(ax,target[0],.08);ay=lerp(ay,target[1],.08)}
 else if(!dragK){ay+=vay;ax+=vax;vay*=.95;vax*=.95;idle++;if(idle>120&&!reduce)ay+=.22*R(120,200,idle)}
 ax=clamp(ax,-85,85);sx=lerp(sx,tsx,.1);sy3=lerp(sy3,tsy,.1);
 c3.style.transform=`rotateX(${ax}deg) rotateY(${ay}deg) scale3d(${sx},${sy3},1)`;
 const a=ax*Math.PI/180,b=ay*Math.PI/180,ca=Math.cos(a),sa_=Math.sin(a),cb=Math.cos(b),sb=Math.sin(b);
 faces.forEach(f=>{let [x,y,z]=f.n;x*=Math.sign(sx)||1;y*=Math.sign(sy3)||1;const x1=x*cb+z*sb,z1=-x*sb+z*cb;const y2=y*ca-z1*sa_,z2=y*sa_+z1*ca;const d=x1*L[0]+y2*L[1]+z2*L[2];f.el.style.setProperty('--sh',clamp(.48-d*.52,0,.55).toFixed(3));f.el.style.setProperty('--hi',clamp(d*d*.35,0,.35).toFixed(3))})}
stage.addEventListener('pointerdown',e=>{dragK=true;target=null;stage.setPointerCapture(e.pointerId);lastX=e.clientX;lastY=e.clientY;idle=0});
stage.addEventListener('pointermove',e=>{if(!dragK)return;const dx=e.clientX-lastX,dy=e.clientY-lastY;lastX=e.clientX;lastY=e.clientY;ay+=dx*.45;ax-=dy*.35;vay=dx*.45;vax=-dy*.35});
['pointerup','pointercancel'].forEach(t=>stage.addEventListener(t,()=>{dragK=false;idle=0}));
const VIEWS={front:[-8,-14],top:[-72,-20],side:[-12,-76],iso:[-24,-38],iso2:[-30,42]};
$$('.spec-row').forEach(r=>{r.addEventListener('mouseenter',()=>{target=VIEWS[r.dataset.view];idle=0});r.addEventListener('mouseleave',()=>{target=null;idle=0})});
function setVar(v){tsx=v[1]==='R'?-1:1;tsy=v[0]==='B'?-1:1;$('#c3Var').textContent=v;$$('#varBtns button').forEach(b=>b.classList.toggle('on',b.dataset.v===v));$$('#endframe rect.c').forEach(r=>r.setAttribute('fill',r.dataset.v===v?'#E0892B':'#A9C0D1'))}
$$('#varBtns button').forEach(b=>b.addEventListener('click',()=>setVar(b.dataset.v)));$$('#endframe rect.c').forEach(r=>{r.style.cursor='pointer';r.addEventListener('click',()=>setVar(r.dataset.v))});

/* ---------- hold to pour ---------- */
const psvg=$('#pourSvg');
const CAV=cf(110,200,200,200,62,124,14);
psvg.innerHTML=`<clipPath id="pc"><path d="${CAV}" clip-rule="evenodd"/></clipPath>
 <ellipse id="pHeat" cx="210" cy="300" rx="200" ry="170" fill="url(#gHeat)" opacity="0"/>
 <g id="pMould"><rect x="40" y="160" width="340" height="270" rx="6" fill="url(#pSand)" opacity=".55"/><rect x="40" y="160" width="340" height="270" rx="6" fill="none" stroke="#4A7899" stroke-width="3"/>
 <path d="${CAV}" fill="#0a121d" fill-rule="evenodd"/><rect x="198" y="160" width="24" height="42" fill="#0a121d"/><path d="M186 160H234L222 172H198Z" fill="#06101a"/></g>
 <rect id="pSprueM" x="200" y="160" width="20" height="0" fill="url(#gMol)"/>
 <g clip-path="url(#pc)"><g id="pLiq"><path id="pWave" fill="url(#gMol)"/><path id="pWaveS" fill="url(#gStl)" opacity="0"/></g></g>
 <path d="${CAV}" fill="none" stroke="rgba(255,255,255,.18)" stroke-width="1.5" fill-rule="evenodd"/>
 <rect id="pShine" x="0" y="190" width="60" height="220" fill="url(#gShine)" opacity="0" clip-path="url(#pc)"/>
 <rect id="pStream" x="203" y="40" width="14" height="0" rx="7" fill="url(#gMol)" filter="url(#fGlow)"/>
 <g id="pLadle"><path d="M156 -8H266L256 64Q254 76 242 76H182Q170 76 168 64Z" fill="url(#gLad)"/><path d="M160 -2H262" stroke="#FFB44D" stroke-width="7" stroke-linecap="round" filter="url(#fGlow)"/><path d="M266 12H332" stroke="#3F4247" stroke-width="9" stroke-linecap="round"/></g>`;
const P={fill:0,heat:0,state:'idle',hold:false,cool:0,t0:0},pw=$('#pWave'),pws=$('#pWaveS'),pst=$('#pStream'),pl=$('#pLadle'),pring=$('#pourRing'),pbtn=$('#pourBtn'),plbl=$('#pourLbl'),pdone=$('#pourDone'),pHeat=$('#pHeat'),pShine=$('#pShine'),pSprue=$('#pSprueM'),pMould=$('#pMould');
const pT=$('#pTemp'),pF=$('#pFill'),pS=$('#pState');
const spc=$('#pourSparks'),spx=spc.getContext('2d');let SP=[];
function pourTick(now){
 const dt=1/60;
 if(P.state==='idle'||P.state==='pouring'){if(P.hold){P.state='pouring';P.fill=Math.min(1,P.fill+dt*.75);P.heat=Math.min(1,P.heat+dt*4)}else{P.heat=Math.max(0,P.heat-dt*.25);if(P.fill===0)P.state='idle'}
  if(P.fill>=1){P.state='cooling';P.t0=now;P.hold=false;pbtn.classList.remove('hold')}}
 if(P.state==='cooling'){P.cool=clamp((now-P.t0)/1100);P.heat=1-P.cool;if(P.cool>=1){P.state='done';pdone.classList.add('on');plbl.innerHTML='POUR<br>AGAIN'}}
 const pouring=P.hold&&P.state==='pouring';
 // ladle & stream
 const tilt=lerp(+pl.dataset.t||0,pouring?1:0,.12);pl.dataset.t=tilt;pl.style.transform=`rotate(${-30*tilt}deg)`;pl.style.transformOrigin='266px 12px';
 const sh=pouring?Math.min(1,(+pst.dataset.h||0)+.15):Math.max(0,(+pst.dataset.h||0)-.12);pst.dataset.h=sh;sa(pst,'y',100);sa(pst,'height',sh*64);pst.style.opacity=sh>0?1:0;
 sa(pSprue,'height',P.fill>0||sh>0?42:0);pSprue.style.opacity=P.state==='done'?0:1;
 // liquid surface
 const lvl=400-P.fill*202;let d=`M100 ${lvl}`;for(let x=100;x<=320;x+=10){d+=`L${x} ${lvl+Math.sin(x/18+now/(pouring?140:400))*(pouring?4:1.2)*(1-P.cool)}`}d+='L320 410L100 410Z';sa(pw,'d',d);sa(pws,'d',d);
 pws.style.opacity=P.cool;pHeat.style.opacity=P.heat*.9*Math.max(P.fill,.2);pw.style.filter=`saturate(${.5+P.heat*.5})`;
 pMould.style.opacity=P.state==='done'?Math.max(.0,+pMould.style.opacity-.03||0):1;if(P.state!=='done')pMould.style.opacity=1;
 if(P.state==='done'){const t=((now-P.t0-1100)/1000);pShine.style.opacity=t>0&&t<1?1:0;sa(pShine,'x',lerp(60,360,clamp(t)))}else pShine.style.opacity=0;
 sa(pring,'stroke-dashoffset',1-P.fill);
 pT.textContent=Math.round(32+P.heat*1518);pF.textContent=Math.round(P.fill*100);pS.textContent={idle:'Ready',pouring:pouring?'Pouring':'Holding',cooling:'Solidifying',done:'Cast ✓'}[P.state];
 // sparks
 const W=spc.clientWidth,H=spc.clientHeight;if(spc.width!==W*dpr){spc.width=W*dpr;spc.height=H*dpr}
 if(pouring){for(let i=0;i<4;i++)SP.push({x:210*W/420,y:162*H/440,vx:(Math.random()-.5)*5,vy:-Math.random()*4-1,l:1})}
 spx.setTransform(dpr,0,0,dpr,0,0);spx.clearRect(0,0,W,H);spx.globalCompositeOperation='lighter';
 SP=SP.filter(s=>(s.l-=.025)>0);for(const s of SP){s.vy+=.18;s.x+=s.vx;s.y+=s.vy;spx.globalAlpha=s.l;spx.drawImage(sprite,s.x-4,s.y-4,8,8)}spx.globalAlpha=1}
function pDown(e){e.preventDefault();if(P.state==='done'){Object.assign(P,{fill:0,heat:0,state:'idle',cool:0});pdone.classList.remove('on');plbl.innerHTML='HOLD<br>TO POUR';pMould.style.opacity=1;return}if(P.state==='cooling')return;P.hold=true;pbtn.classList.add('hold')}
function pUp(){P.hold=false;pbtn.classList.remove('hold')}
pbtn.addEventListener('pointerdown',pDown);['pointerup','pointerleave','pointercancel'].forEach(t=>pbtn.addEventListener(t,pUp));pbtn.addEventListener('contextmenu',e=>e.preventDefault());
pbtn.addEventListener('keydown',e=>{if((e.key===' '||e.key==='Enter')&&!e.repeat)pDown(e)});pbtn.addEventListener('keyup',e=>{if(e.key===' '||e.key==='Enter')pUp()});

/* ---------- cursor, magnetic, tilt ---------- */
const cur=$('#cursor'),ring=$('.c-ring',cur),dot=$('.c-dot',cur),clbl=$('em',cur);let rx=0,ry=0,px=0,py=0;
function cursorTick(){rx=lerp(rx,px,.18);ry=lerp(ry,py,.18);ring.style.transform=`translate3d(${rx}px,${ry}px,0)`;dot.style.transform=`translate3d(${px}px,${py}px,0)`;}
addEventListener('pointermove',e=>{px=e.clientX;py=e.clientY;mx=px/vw;my=py/vh;if(e.pointerType==='mouse')cur.classList.remove('hide')},{passive:true});
document.addEventListener('mouseleave',()=>cur.classList.add('hide'));
if(fine){document.body.classList.add('has-cursor');
 document.addEventListener('pointerover',e=>{const t=e.target.closest('[data-cursor]');if(t){cur.classList.add('big');clbl.textContent=t.dataset.cursor}else{cur.classList.remove('big')}});
}
function interactions(){
 if(!fine)return;
 $$('[data-magnetic]').forEach(b=>{b.addEventListener('mousemove',e=>{const r=b.getBoundingClientRect();b.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.25}px,${(e.clientY-r.top-r.height/2)*.35}px)`});b.addEventListener('mouseleave',()=>{b.style.transition='transform .6s var(--ease)';b.style.transform='';setTimeout(()=>b.style.transition='',600)})});
 $$('.why-card').forEach(c=>{c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect();const x=(e.clientX-r.left)/r.width,y=(e.clientY-r.top)/r.height;c.style.setProperty('--mx',x*100+'%');c.style.setProperty('--my',y*100+'%');c.style.transform=`rotateX(${(.5-y)*12}deg) rotateY(${(x-.5)*14}deg) translateZ(10px)`});c.addEventListener('mouseleave',()=>c.style.transform='')});
 $$('.q-card').forEach(c=>c.addEventListener('mousemove',e=>{const r=c.getBoundingClientRect();c.style.setProperty('--mx',e.clientX-r.left+'px');c.style.setProperty('--my',e.clientY-r.top+'px')}));
}

/* ---------- menu ---------- */
function menuInit(){const b=$('#menuBtn');b.addEventListener('click',()=>{const o=document.body.classList.toggle('menu-open');b.setAttribute('aria-expanded',o)});
 $$('#menu a').forEach(a=>a.addEventListener('click',()=>{document.body.classList.remove('menu-open');b.setAttribute('aria-expanded','false')}));
 $$('a[href^="#"]').forEach(a=>a.addEventListener('click',e=>{const t=$(a.getAttribute('href'));if(!t)return;e.preventDefault();scrollTo({top:t.getBoundingClientRect().top+scrollY+(a.getAttribute('href')==='#top'?0:2),behavior:'smooth'})}));
 railA=$$('#rail a');addEventListener('keydown',e=>{if(e.key==='Escape')document.body.classList.remove('menu-open')})}

/* ---------- reveal & scan ---------- */
function revealInit(){const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}}),{threshold:.12,rootMargin:'0px 0px -6% 0px'});$$('.rv,.line-mask').forEach(el=>io.observe(el));
 const reads=$$('#scanRead span');let k=0,tm=null;new IntersectionObserver(es=>{if(es[0].isIntersecting&&!tm){tm=setInterval(()=>{k=(k+1)%(reads.length+2);reads.forEach((r,i)=>r.classList.toggle('ok',i<k))},850)}else if(!es[0].isIntersecting&&tm){clearInterval(tm);tm=null}}).observe($('.scanner'))}

/* ---------- loader ---------- */
function loader(){const ld=$('#loader'),T=$('#ldTemp'),B=$('#ldBar');const t0=performance.now();const MIN=reduce?300:2000,MAX=6000;let ready=false;
 const img=new Image();img.src='img/shot-01.webp';Promise.all([img.decode().catch(()=>0),document.fonts?document.fonts.ready:0]).then(()=>ready=true);
 (function step(now){const el=now-t0;let p=clamp(el/MIN);if(!ready)p=Math.min(p,.86+.1*clamp((el-MIN)/(MAX-MIN)));const e=easeIO(p);T.textContent=Math.round(e*1550).toLocaleString('en-IN');B.style.transform=`scaleX(${e})`;ld.style.setProperty('--heat',e);
  if((p>=1&&ready)||el>MAX){setTimeout(()=>{ld.classList.add('done');document.body.classList.remove('is-loading');setTimeout(()=>document.body.classList.add('ready'),150);setTimeout(()=>{ld.style.display='none';measure()},1400)},250)}else requestAnimationFrame(step)})(t0)}

/* ---------- pdf download ---------- */
function pdfInit(){let dl=null;if(!(window.claude&&typeof window.claude.use==='function'))$$('[data-pdf]').forEach(b=>{b.setAttribute('download','Castora_Foam_Tech_Brochure_2026.pdf');b.removeAttribute('target')});
 if(window.claude&&typeof window.claude.use==='function'){window.claude.use('downloads').then(d=>{dl=d}).catch(()=>{})}
 $$('[data-pdf]').forEach(b=>{const l=$('.lbl',b)||b;b.addEventListener('click',async e=>{if(!dl)return;e.preventDefault();const old=l.textContent;try{l.textContent='Preparing…';const blob=await (await fetch(b.getAttribute('href'))).blob();l.textContent='Confirm to save…';await dl.save({filename:'Castora_Foam_Tech_Brochure_2026.pdf',data:blob});l.textContent='Saved ✓'}catch(err){l.textContent=err&&err.code==='declined'?old:'Try again'}setTimeout(()=>l.textContent=old,3000)})})}

/* ---------- init ---------- */
build();initScenes();showcaseInit();menuInit();interactions();revealInit();pdfInit();
W=words();SEG=segs();fSteps=$$('#filmSteps li');wfItems=$$('#wfList .wf-item');
scrollTo(0,0);buildCube();setVar('TL');sizeEmbers();measure();setCmp(50);
for(let k=1;k<=6;k++)UPD[k](0,0);
addEventListener('resize',()=>{measure();buildCube();sizeEmbers()});
addEventListener('load',measure);setTimeout(measure,2500);if(window.ResizeObserver){let rt;new ResizeObserver(()=>{clearTimeout(rt);rt=setTimeout(measure,120)}).observe(document.body)}
loader();requestAnimationFrame(tick);
})();
