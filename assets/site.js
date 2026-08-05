(()=>{const q=(s,r=document)=>[...r.querySelectorAll(s)];
// Scroll-triggered reveal-up animation
const revealEls=q('.reveal-up');
if('IntersectionObserver'in window&&revealEls.length){
  const io=new IntersectionObserver((entries)=>{
    entries.forEach(entry=>{
      if(entry.isIntersecting){
        entry.target.classList.add('is-visible');
        io.unobserve(entry.target);
      }
    });
  },{threshold:0.15,rootMargin:'0px 0px -40px 0px'});
  revealEls.forEach(el=>io.observe(el));
}else{
  revealEls.forEach(x=>x.classList.add('is-visible'));
}
// Mobile navigation
const header=document.querySelector('header'),aside=header?.querySelector('aside');if(header&&aside){const controls=q('button',header);const open=controls.find(b=>/menü megnyitása/i.test(b.getAttribute('aria-label')||''));const close=controls.find(b=>/menü bezárása/i.test(b.getAttribute('aria-label')||''));let overlay=null;const show=()=>{aside.classList.add('static-mobile-open');aside.setAttribute('aria-hidden','false');overlay=controls.find(b=>b.classList.contains('fixed')&&b.classList.contains('inset-0'));overlay?.classList.remove('static-hidden')};const hide=()=>{aside.classList.remove('static-mobile-open');aside.setAttribute('aria-hidden','true');overlay?.classList.add('static-hidden')};open?.addEventListener('click',show);close?.addEventListener('click',hide);q('a',aside).forEach(a=>a.addEventListener('click',hide));}
// Copy controls
q('button').forEach(b=>{const label=b.getAttribute('aria-label')||'';if(/másol|copy/i.test(label)){b.addEventListener('click',async()=>{const row=b.closest('div.grid')||b.parentElement;const value=row?.querySelector('code')?.textContent?.trim();if(!value)return;try{await navigator.clipboard.writeText(value)}catch{const t=document.createElement('textarea');t.value=value;document.body.append(t);t.select();document.execCommand('copy');t.remove()}const n=document.createElement('div');n.dataset.staticToast='';n.textContent='Másolva!';document.body.append(n);setTimeout(()=>n.remove(),1500)})}});
// Accordion-like controls
q('button[aria-expanded]').forEach(b=>b.addEventListener('click',()=>{
  const wasOpen=b.getAttribute('aria-expanded')==='true';
  const next=!wasOpen;
  b.setAttribute('aria-expanded',String(next));
  if('state'in b.dataset)b.dataset.state=next?'open':'closed';
  const content=b.id?document.querySelector('[aria-labelledby="'+b.id+'"]'):null;
  if(content){
    content.hidden=!next;
    if('state'in content.dataset)content.dataset.state=next?'open':'closed';
  }
}));
// News search and category filters
const news=document.querySelector('input[placeholder*="Keres"]');if(news){const cards=q('article');const buttons=q('[role="group"] button');let category='all';const apply=()=>{const term=news.value.toLocaleLowerCase('hu-HU');cards.forEach(c=>{const okText=c.textContent.toLocaleLowerCase('hu-HU').includes(term);const okCat=category==='all'||c.textContent.includes(category);c.classList.toggle('static-hidden',!(okText&&okCat))})};news.addEventListener('input',apply);buttons.forEach((b,i)=>b.addEventListener('click',()=>{category=i===0?'all':b.textContent.trim();buttons.forEach(x=>x.setAttribute('aria-pressed','false'));b.setAttribute('aria-pressed','true');apply()}));}
// Generic tabs (helicopter explorer)
q('[role="tablist"]').forEach(list=>{const tabs=q('[role="tab"]',list);tabs.forEach((tab,i)=>tab.addEventListener('click',()=>{tabs.forEach((t,j)=>{t.setAttribute('aria-selected',String(i===j));});const stage=list.nextElementSibling;if(stage){q('img',stage).forEach((im,j)=>{im.style.opacity=i===j?'1':'0';im.style.pointerEvents=i===j?'auto':'none'});}}))});
// Forms are presentation-only in this export
q('form').forEach(f=>f.addEventListener('submit',e=>{e.preventDefault();const n=document.createElement('div');n.dataset.staticToast='';n.textContent='Az űrlap WordPress-integrációra vár.';document.body.append(n);setTimeout(()=>n.remove(),2200)}));
})();