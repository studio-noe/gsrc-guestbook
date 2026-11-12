/* draws a cloud/scalloped outline behind an element. opts: fill, stroke, b (bump size px) */
(function(){
 function path(w,h,b){
  const iw=w-2*b, ih=h-2*b, nx=Math.max(2,Math.round(iw/(b*2.2))), ny=Math.max(2,Math.round(ih/(b*2.2)));
  const sx=iw/nx, sy=ih/ny; let d=`M${b},${b}`;
  for(let i=1;i<=nx;i++) d+=`A${sx/2},${b} 0 0 1 ${b+sx*i},${b}`;
  for(let i=1;i<=ny;i++) d+=`A${b},${sy/2} 0 0 1 ${w-b},${b+sy*i}`;
  for(let i=1;i<=nx;i++) d+=`A${sx/2},${b} 0 0 1 ${w-b-sx*i},${h-b}`;
  for(let i=1;i<=ny;i++) d+=`A${b},${sy/2} 0 0 1 ${b},${h-b-sy*i}`;
  return d+'Z';
 }
 window.scallop=function(el,o={}){
  o=Object.assign({fill:'#FFD600',stroke:'#0b0b0b',b:12},o);
  el.classList.add('scallop');
  let svg=el.querySelector(':scope>svg.sc');
  if(!svg){svg=document.createElementNS('http://www.w3.org/2000/svg','svg');svg.setAttribute('class','sc');
    svg.innerHTML='<path/>';el.prepend(svg);}
  const p=svg.firstChild; p.setAttribute('fill',o.fill); p.setAttribute('stroke',o.stroke); p.setAttribute('stroke-width','1.5');
  const draw=()=>{const r=el.getBoundingClientRect(); if(!r.width)return; svg.setAttribute('viewBox',`0 0 ${r.width} ${r.height}`); p.setAttribute('d',path(r.width,r.height,o.b));};
  draw(); if(window.ResizeObserver){ if(el._ro)el._ro.disconnect(); el._ro=new ResizeObserver(draw); el._ro.observe(el);} return draw;
 };
})();

/* same scalloped frame as the hero, for post-it boxes. colors come from the note's c-* class. */
window.cloudNote=function(el,o={}){
  const PAL={yellow:['#FFD600','#0f0f02'],black:['#0f0f02','#0f0f02'],white:['#ffffff','#0f0f02'],gray:['#e9e8e0','#0f0f02']};
  const m=(el.className.match(/c-(yellow|black|white|gray)/)||[])[1]||'yellow';
  el.classList.add('cloudy');
  return window.scallop(el,{fill:PAL[m][0],stroke:PAL[m][1],b:o.b||9});
};
