/* Container rear-door illustration with the HC locking device fitted.
   window.containerDoorSVG({static:true}) -> SVG string. Groups carry data-p="01".."15" (and "cc" for corner castings). */
(function(){
function svg(opt){
  opt=opt||{};const S=!!opt.static;
  const X0=140,X1=500,Y0=60,Y1=640,BARS=[196,270,352,426];
  const g=(p,inner)=>`<g class="pt" data-p="${p}">${inner}</g>`;
  const P='class="pf"';
  let doors='';
  [[174,318],[322,466]].forEach(([a,b])=>{
    doors+=`<rect x="${a}" y="100" width="${b-a}" height="500" fill="url(#cdDoor)" stroke="#4A7899" stroke-width="1.5"/>`;
    for(let x=a+10;x<b-4;x+=12)doors+=`<path d="M${x} 104V596" stroke="rgba(169,192,209,.13)" stroke-width="5"/><path d="M${x+3} 104V596" stroke="rgba(0,0,0,.18)" stroke-width="1"/>`;
  });
  // structure
  const frame=`<rect x="${X0+30}" y="${Y0}" width="${X1-X0-60}" height="38" fill="url(#cdBeam)"/>
   <rect x="${X0+30}" y="${Y1-38}" width="${X1-X0-60}" height="38" fill="url(#cdBeam)"/>
   <rect x="${X0}" y="${Y0+30}" width="30" height="${Y1-Y0-60}" fill="url(#cdPost)"/><rect x="${X1-30}" y="${Y0+30}" width="30" height="${Y1-Y0-60}" fill="url(#cdPost)"/>`;
  const cc=g('cc',[[X0,Y0],[X1-30,Y0],[X0,Y1-30],[X1-30,Y1-30]].map(([x,y])=>`<rect ${P} x="${x}" y="${y}" width="30" height="30" rx="2"/><rect x="${x+9}" y="${y+7}" width="12" height="16" rx="6" fill="#0B1624"/>`).join(''));
  let parts={k1:'',k2:'',c1:'',c2:'',bl:'',bs:'',ar:'',hd:'',hb:'',rv:'',rc:'',rp:'',bar:''};
  BARS.forEach((bx,i)=>{
    parts.bar+=`<rect x="${bx-3.5}" y="88" width="7" height="524" fill="url(#cdBar)"/>`;
    parts.k1+=`<path ${P} d="M${bx-13} 98h26v9h-5v5h-16v-5h-5z"/>`;
    parts.k2+=`<path ${P} d="M${bx-13} 602h-0h26v-9h-5v-5h-16v5h-5z"/>`;
    parts.c1+=`<path ${P} d="M${bx-11} 112h22l-4 5h-4v3h-6v-3h-4z"/>`;
    parts.c2+=`<path ${P} d="M${bx-11} 588h22l-4 -5h-4v-3h-6v3h-4z"/>`;
    [[150,180],[520,550]].forEach(([a,b])=>{parts.bl+=`<rect ${P} x="${bx-12}" y="${a}" width="24" height="${b-a}" rx="2"/><circle cx="${bx-8}" cy="${a+6}" r="1.6" fill="#0B1624"/><circle cx="${bx+8}" cy="${b-6}" r="1.6" fill="#0B1624"/>`;
      parts.ar+=`<rect ${P} x="${bx-7}" y="${a-6}" width="14" height="4" rx="2"/><rect ${P} x="${bx-7}" y="${b+2}" width="14" height="4" rx="2"/>`});
    [250,440].forEach(a=>{parts.bs+=`<rect ${P} x="${bx-10}" y="${a}" width="20" height="13" rx="2"/>`});
    const L=34;
    parts.hb+=`<rect ${P} x="${bx-8}" y="372" width="16" height="18" rx="2"/>`;
    parts.hd+=`<path ${P} d="M${bx+2} 377L${bx+L} 379L${bx+L} 384L${bx+2} 386Z"/>`;
    parts.rv+=`<circle ${P} cx="${bx}" cy="381" r="3"/>`;
    parts.rp+=`<rect ${P} x="${bx+L-2}" y="362" width="11" height="40" rx="3"/>`;
    parts.rc+=`<path ${P} d="M${bx+L-4} 386h14v8h-14z"/>`;
  });
  const body=`${doors}${frame}${parts.bar}
   ${g('03',parts.k1)}${g('04',parts.k2)}${g('01',parts.c1)}${g('02',parts.c2)}
   ${g('10',parts.bl)}${g('11',parts.bs)}${g('15',parts.ar)}${g('12',parts.bl.replace(/class="pf"/g,'class="pf ghost"'))}${g('13',parts.bs.replace(/class="pf"/g,'class="pf ghost"'))}
   ${g('08',parts.rp)}${g('07',parts.rc)}${g('09',parts.rc.replace(/class="pf"/g,'class="pf ghost"'))}${g('05',parts.hd)}${g('06',parts.hb)}${g('14',parts.rv)}${cc}`;
  // callouts (static version)
  const co=[['03',196,104,'L',82],['01',196,116,'L',122],['10',196,165,'L',165],['15',196,147,'L',205],['11',196,256,'L',256],['06',196,381,'L',360],['14',196,381,'L',398],
            ['05',460,381,'R',345],['08',465,382,'R',385],['07',470,390,'R',425],['13',426,446,'R',470],['12',426,535,'R',520],['02',426,584,'R',572],['04',426,598,'R',610],['cc',485,75,'R',70]];
  let calls='';
  if(S){co.forEach(([n,x,y,s,ly])=>{const lx=s==='L'?96:544;const bx=s==='L'?lx-26:lx+26;
    calls+=`<path d="M${x} ${y}L${s==='L'?x-30:x+20} ${ly}H${lx}" fill="none" stroke="#E0892B" stroke-width="1" opacity=".85"/><circle cx="${x}" cy="${y}" r="2.4" fill="#E0892B"/>
    <g transform="translate(${bx},${ly})"><rect x="-17" y="-11" width="34" height="22" rx="11" fill="${n==='cc'?'#fff':'#E0892B'}"/><text y="4" text-anchor="middle" font-family="IBM Plex Mono,monospace" font-size="11" font-weight="600" fill="#0B1624">${n==='cc'?'CC':n}</text></g>`});}
  const W=S?640:640;
  return `<svg class="cdoor${S?' static':''}" viewBox="${S?(opt.tight?'48 52 546 606':'0 30 640 630'):'110 30 420 630'}" xmlns="http://www.w3.org/2000/svg" aria-label="Container rear doors with the locking device fitted">
  <defs>
   <linearGradient id="cdDoor" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2A4766"/><stop offset=".55" stop-color="#1B314C"/><stop offset="1" stop-color="#132439"/></linearGradient>
   <linearGradient id="cdBeam" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4A7899"/><stop offset="1" stop-color="#24405B"/></linearGradient>
   <linearGradient id="cdPost" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#24405B"/><stop offset=".5" stop-color="#4A7899"/><stop offset="1" stop-color="#24405B"/></linearGradient>
   <linearGradient id="cdBar" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#6B7680"/><stop offset=".5" stop-color="#C9D1D8"/><stop offset="1" stop-color="#5B6670"/></linearGradient>
   <linearGradient id="cdSteel" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#F1F4F6"/><stop offset=".5" stop-color="#AEB6BD"/><stop offset="1" stop-color="#77808A"/></linearGradient>
   <linearGradient id="cdAmber" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#FFD9A0"/><stop offset=".5" stop-color="#E0892B"/><stop offset="1" stop-color="#A8590F"/></linearGradient>
   <radialGradient id="cdSpot" cx=".5" cy=".42" r=".6"><stop offset="0" stop-color="rgba(127,160,184,.28)"/><stop offset="1" stop-color="rgba(127,160,184,0)"/></radialGradient>
   <filter id="cdGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="3.2" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
   <filter id="cdShadow" x="-10%" y="-10%" width="130%" height="130%"><feDropShadow dx="0" dy="14" stdDeviation="14" flood-color="#000" flood-opacity=".55"/></filter>
  </defs>
  <style>
   .cdoor .pf{fill:url(#cdSteel);stroke:#3F4247;stroke-width:.8}
   .cdoor .pf.ghost{display:none}
   .cdoor.static .pt:not([data-p="cc"]) .pf{fill:url(#cdAmber);stroke:#6b3a08}
   .cdoor .pt[data-p="cc"] .pf{fill:url(#cdSteel)}
   .cdoor .pt.on .pf{fill:url(#cdAmber);stroke:#FFE2B0;stroke-width:1.2;filter:url(#cdGlow)}
   .cdoor .pt.on .pf.ghost{display:inline;fill:none;stroke:#FFE2B0;stroke-dasharray:3 2;filter:url(#cdGlow)}
   .cdoor .pt{transition:opacity .4s}
   .cdoor.dim .pt:not(.on){opacity:.45}
  </style>
  <ellipse cx="320" cy="352" rx="300" ry="330" fill="url(#cdSpot)"/>
  <ellipse cx="320" cy="652" rx="210" ry="12" fill="rgba(0,0,0,.45)"/>
  <g filter="url(#cdShadow)">${body}</g>
  ${calls}
  </svg>`;
}
window.containerDoorSVG=svg;
})();
