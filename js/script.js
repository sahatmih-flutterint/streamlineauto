const header=document.querySelector(".site-header");
const menuBtn=document.querySelector(".menu-btn");
const mobileNav=document.querySelector(".mobile-nav");
const revealEls=document.querySelectorAll(".reveal");
const processTrack=document.querySelector(".process-track");
const faqItems=document.querySelectorAll(".faq-item");
const cursorGlow=document.querySelector(".cursor-glow");

const onScroll=()=>header.classList.toggle("scrolled",window.scrollY>20);
onScroll();
window.addEventListener("scroll",onScroll,{passive:true});

menuBtn?.addEventListener("click",()=>{
  const open=!menuBtn.classList.contains("active");
  menuBtn.classList.toggle("active",open);
  mobileNav.classList.toggle("open",open);
  document.body.classList.toggle("menu-open",open);
  menuBtn.setAttribute("aria-expanded",String(open));
  mobileNav.setAttribute("aria-hidden",String(!open));
});
mobileNav?.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{
  menuBtn.classList.remove("active");mobileNav.classList.remove("open");
  document.body.classList.remove("menu-open");
  menuBtn.setAttribute("aria-expanded","false");
  mobileNav.setAttribute("aria-hidden","true");
}));

const observer=new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      if(entry.target===processTrack) entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.13});
revealEls.forEach(el=>observer.observe(el));
if(processTrack) observer.observe(processTrack);

faqItems.forEach(item=>{
  const button=item.querySelector("button");
  const answer=item.querySelector(".faq-answer");
  button.addEventListener("click",()=>{
    const isOpen=item.classList.contains("active");
    faqItems.forEach(other=>{
      other.classList.remove("active");
      other.querySelector(".faq-answer").style.maxHeight=null;
    });
    if(!isOpen){
      item.classList.add("active");
      answer.style.maxHeight=answer.scrollHeight+"px";
    }
  });
});

if(window.matchMedia("(pointer:fine)").matches && cursorGlow){
  window.addEventListener("pointermove",(e)=>{
    cursorGlow.style.left=e.clientX+"px";
    cursorGlow.style.top=e.clientY+"px";
  },{passive:true});
}

document.querySelectorAll(".magnetic").forEach(el=>{
  el.addEventListener("mousemove",(e)=>{
    const r=el.getBoundingClientRect();
    const x=e.clientX-r.left-r.width/2;
    const y=e.clientY-r.top-r.height/2;
    el.style.transform=`translate(${x*.08}px,${y*.08}px)`;
  });
  el.addEventListener("mouseleave",()=>el.style.transform="");
});

document.querySelectorAll(".market-card").forEach(card=>{
  card.addEventListener("mousemove",(e)=>{
    const r=card.getBoundingClientRect();
    const x=(e.clientX-r.left)/r.width-.5;
    const y=(e.clientY-r.top)/r.height-.5;
    card.style.transform=`perspective(900px) rotateY(${x*3}deg) rotateX(${-y*3}deg) translateY(-6px)`;
  });
  card.addEventListener("mouseleave",()=>card.style.transform="");
});

document.getElementById("year").textContent=new Date().getFullYear();

// Ако съществуващото logo.png липсва при локален preview, показваме текстов fallback.
document.querySelectorAll(".brand-logo").forEach(img=>{
  img.addEventListener("error",()=>{
    img.style.display="none";
    const fallback=img.nextElementSibling;
    if(fallback) fallback.style.display="inline-flex";
  });
});