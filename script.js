const fallback = { brand:{logo:"",primary:"#071827",accent:"#f4b73f",accent2:"#df7d2d"}, media:{}, contact:{phones:[],emails:[]}, copy:{ar:{},en:{}}, services:[], projects:[] };
let siteData = fallback;
let currentLang = localStorage.getItem("alnogoom-lang") || "ar";

const qs = s => document.querySelector(s);
const qsa = s => [...document.querySelectorAll(s)];
const esc = (v="") => String(v).replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#039;",'"':"&quot;"})[c]);
const safeUrl = (v="") => String(v).replace(/["'()\\]/g, "");

async function loadContent(){
  try{
    const r = await fetch(`content.json?v=${Date.now()}`, {cache:"no-store"});
    if(!r.ok) throw new Error("content.json not found");
    siteData = {...fallback, ...(await r.json())};
  }catch(e){ console.warn(e); siteData = fallback; }
  renderLanguage(currentLang);
}

function getCopy(lang=currentLang){ return siteData.copy?.[lang] || {}; }

function applyTheme(){
  const b = siteData.brand || {};
  document.documentElement.style.setProperty("--bg", b.primary || "#071827");
  document.documentElement.style.setProperty("--accent", b.accent || "#f4b73f");
  document.documentElement.style.setProperty("--accent-2", b.accent2 || "#df7d2d");
}

function applyMedia(){
  const m = siteData.media || {};
  if(m.hero) qs("#heroMedia").style.backgroundImage = `url('${safeUrl(m.hero)}')`;
  if(m.aboutMain) qs("#aboutMain").style.backgroundImage = `url('${safeUrl(m.aboutMain)}')`;
  if(m.aboutSide) qs("#aboutSide").style.backgroundImage = `url('${safeUrl(m.aboutSide)}')`;
}

function applyLogo(){
  const logo = siteData.brand?.logo || "";
  document.body.classList.toggle("has-logo", Boolean(logo));
  qsa("[data-logo]").forEach(img => {
    const fallbackEl = img.nextElementSibling;
    if(logo){
      img.src = logo;
      img.style.display = "block";
      if(fallbackEl) fallbackEl.style.display = "none";
    } else {
      img.removeAttribute("src"); img.style.display = "none";
      if(fallbackEl) fallbackEl.style.display = "grid";
    }
  });
}

const icons = {
  bolt:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M13 2 5 14h6l-1 8 9-13h-6V2Z"/></svg>`,
  boxes:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 8 4-8 4-8-4 8-4Z"/><path d="m4 7 8 4 8-4M4 12l8 4 8-4M4 17l8 4 8-4"/></svg>`,
  build:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 21h18M5 21V8h8v13M13 12h6v9M7 11h2m-2 4h2m6 1h2"/></svg>`,
  tender:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h10v18H7z"/><path d="M9 7h6M9 11h6M9 15h4"/><path d="m15 18 2 2 4-5"/></svg>`,
  trade:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 17h18M5 17V8l7-4 7 4v9M8 11h8M8 14h8"/><path d="m4 20 3-3m13 3-3-3"/></svg>`,
  support:`<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 7h13v10H3zM16 10h3l2 3v4h-5z"/><path d="M7 20a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm10 0a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/></svg>`
};

function renderLanguage(lang){
  currentLang = lang === "en" ? "en" : "ar";
  localStorage.setItem("alnogoom-lang", currentLang);
  const c = getCopy();
  const rtl = currentLang === "ar";
  document.documentElement.lang = currentLang;
  document.documentElement.dir = rtl ? "rtl" : "ltr";
  document.body.classList.toggle("lang-en", !rtl);
  document.title = currentLang === "ar" ? `${c.shortName || "النجوم"} | للتوريدات العمومية والمقاولات` : `${c.shortName || "AL NOGOUM"} | General Supplies & Contracting`;

  qsa("[data-copy]").forEach(el => { const key = el.dataset.copy; el.textContent = c[key] || ""; });
  qsa("[data-nav]").forEach(el => { el.textContent = c.nav?.[el.dataset.nav] || ""; });
  qsa("[data-short-name]").forEach(el => el.textContent = c.shortName || "");
  qs("#langToggleText").textContent = c.languageButton || (rtl ? "English" : "العربية");
  qs("#menuToggle").setAttribute("aria-label", c.menuLabel || "Menu");

  renderServices(); renderProcess(); renderProjects(); renderContact();
  applyTheme(); applyMedia(); applyLogo(); initReveal();
}

function renderServices(){
  const grid = qs("#servicesGrid");
  grid.innerHTML = (siteData.services || []).map((item,i) => {
    const t = item[currentLang] || {};
    return `<article class="service-card reveal">
      <div class="service-top"><span class="service-icon">${icons[item.icon] || icons.boxes}</span><span class="service-number">0${i+1}</span></div>
      <h3>${esc(t.title)}</h3><p>${esc(t.description)}</p><span class="service-line"></span>
    </article>`;
  }).join("");
}

function renderProcess(){
  const process = getCopy().process || [];
  qs("#processSteps").innerHTML = process.map((s,i) => `<article class="process-step reveal" style="--delay:${i*70}ms"><span>${esc(s.n)}</span><div><h3>${esc(s.title)}</h3><p>${esc(s.text)}</p></div></article>`).join("");
}

function renderProjects(){
  qs("#projectsGrid").innerHTML = (siteData.projects || []).map((item,i) => {
    const t = item[currentLang] || {};
    const img = safeUrl(item.image || "");
    return `<article class="project-card reveal project-${i+1}">
      <div class="project-image" style="background-image:url('${img}')"></div>
      <div class="project-overlay"></div>
      <div class="project-content"><span>${esc(t.category)}</span><h3>${esc(t.title)}</h3><p>${esc(t.description)}</p><b>↗</b></div>
    </article>`;
  }).join("");
}

function renderContact(){
  const c = getCopy();
  const phones = siteData.contact?.phones || [];
  qs("#phonesList").innerHTML = phones.map(p => {
    const digits = (p.whatsapp || p.number || "").replace(/\D/g, "");
    const label = currentLang === "ar" ? (p.labelAr || "الهاتف / واتساب") : (p.labelEn || "Phone / WhatsApp");
    const href = digits ? `https://wa.me/${digits}` : `tel:${(p.number||"").replace(/\s/g,"")}`;
    return `<a class="contact-item" href="${href}" target="_blank" rel="noopener noreferrer"><div><small>${esc(label)}</small><strong dir="ltr">${esc(p.number)}</strong></div><span>↗</span></a>`;
  }).join("");
  qs("#emailsList").innerHTML = (siteData.contact?.emails || []).map(email => `<a class="contact-item" href="mailto:${encodeURIComponent(email)}"><div><small>${esc(c.emailLabel || "Email")}</small><strong dir="ltr">${esc(email)}</strong></div><span>↗</span></a>`).join("");
  const first = phones[0];
  const digits = first ? (first.whatsapp || first.number || "").replace(/\D/g, "") : "";
  qsa("[data-primary-whatsapp]").forEach(a => a.href = digits ? `https://wa.me/${digits}` : "#contact");
}

function initReveal(){
  const pending = qsa(".reveal:not(.visible)");
  if(!("IntersectionObserver" in window)){ pending.forEach(el=>el.classList.add("visible")); return; }
  const obs = new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");obs.unobserve(e.target);}}),{threshold:.12});
  pending.forEach(el=>obs.observe(el));
}

function initNavigation(){
  const header=qs("#siteHeader"), progress=qs("#scrollProgress"), nav=qs("#mainNav"), toggle=qs("#menuToggle");
  const links=qsa(".nav-link"), sections=qsa("main section[id]");
  const update=()=>{
    header.classList.toggle("scrolled",scrollY>30);
    const max=document.documentElement.scrollHeight-innerHeight; progress.style.width=max>0?`${(scrollY/max)*100}%`:"0";
    let cur="home"; sections.forEach(s=>{if(scrollY>=s.offsetTop-180) cur=s.id;});
    links.forEach(a=>a.classList.toggle("active",a.getAttribute("href")===`#${cur}`));
  };
  addEventListener("scroll",update,{passive:true}); update();
  toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.classList.toggle("active",open);toggle.setAttribute("aria-expanded",String(open));document.body.classList.toggle("menu-open",open);});
  links.forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");toggle.classList.remove("active");toggle.setAttribute("aria-expanded","false");document.body.classList.remove("menu-open");}));
}

function initMotion(){
  if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const glow=qs("#cursorGlow"), media=qs("#heroMedia");
  addEventListener("pointermove",e=>{glow.style.transform=`translate3d(${e.clientX-240}px,${e.clientY-240}px,0)`; if(innerWidth>900 && media){const x=(e.clientX/innerWidth-.5)*8,y=(e.clientY/innerHeight-.5)*8;media.style.transform=`scale(1.04) translate3d(${x}px,${y}px,0)`;}},{passive:true});
}

qs("#langToggle").addEventListener("click",()=>renderLanguage(currentLang==="ar"?"en":"ar"));
qs("#year").textContent=new Date().getFullYear();
initNavigation(); initMotion(); loadContent();
