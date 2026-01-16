// Mobile nav toggle
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.site-nav');
if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const open = navMenu.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(open));
  });
}

// Active nav link based on current page
(function markActiveNav(){
  const page = document.body.getAttribute('data-page');
  document.querySelectorAll('.site-nav .nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if ((page === 'home' && href.includes('index.html')) ||
        (page && href.includes(`${page}.html`))) {
      link.classList.add('active');
    }
  });
})();

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window){
  const io = new IntersectionObserver((entries)=> {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  revealEls.forEach(el => io.observe(el));
} else {
  // Fallback
  revealEls.forEach(el => el.classList.add('visible'));
}

// Typed text effect (simple)
(function typedEffect(){
  const el = document.querySelector('.typed-target');
  if (!el) return;
  let words = [];
  try { words = JSON.parse(el.dataset.typed); } catch(e){ words = [el.textContent.trim()]; }
  let i = 0;
  setInterval(() => {
    i = (i+1) % words.length;
    el.classList.remove('visible');
    setTimeout(()=> { el.textContent = words[i]; el.classList.add('visible'); }, 120);
  }, 2000);
})();

// Testimonials slider
(function slider(){
  const slider = document.querySelector('[data-slider]');
  if (!slider) return;
  const slides = slider.querySelector('.slides');
  const dots = slider.querySelectorAll('.dot');
  let i = 0;
  function go(n){
    i = (n + dots.length) % dots.length;
    slides.style.transform = `translateX(-${i*100}%)`;
    dots.forEach((d,idx)=> d.classList.toggle('active', idx===i));
  }
  dots.forEach((d,idx)=> d.addEventListener('click', ()=> go(idx)));
  setInterval(()=> go(i+1), 5200);
})();

// Tabs on Subjects
(function tabs(){
  const tabButtons = document.querySelectorAll('.tablist .tab');
  const panels = document.querySelectorAll('.tabs .tabpanel');
  if (!tabButtons.length) return;
  function activate(idx){
    tabButtons.forEach((b,i) => {
      b.classList.toggle('active', i===idx);
      b.setAttribute('aria-selected', i===idx ? 'true' : 'false');
    });
    panels.forEach((p,i) => p.classList.toggle('active', i===idx));
  }
  tabButtons.forEach((btn, idx) => btn.addEventListener('click', ()=> activate(idx)));
  // Deep links: subjects.html#mathematics or #english
  const hash = location.hash.toLowerCase();
  if (hash.includes('math')) activate(1);
  else activate(0);
})();

// Accordion (FAQ)
document.querySelectorAll('.acc-btn').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    btn.classList.toggle('open');
    const panel = btn.nextElementSibling;
    if (panel) panel.style.display = panel.style.display === 'block' ? 'none' : 'block';
  });
});

// Tutors filter
(function tutorFilter(){
  const chips = document.querySelectorAll('.filter-bar .chip');
  const cards = document.querySelectorAll('.tutor-card');
  if (!chips.length) return;
  chips.forEach(chip=>{
    chip.addEventListener('click', ()=>{
      chips.forEach(c=> c.classList.remove('active'));
      chip.classList.add('active');
      const filter = chip.dataset.filter;
      cards.forEach(card=>{
        const subj = card.dataset.subject;
        const show = filter === 'all' || filter === subj;
        card.style.display = show ? '' : 'none';
      });
    });
  });
})();

// Contact form: compose email via mailto: so it works on GitHub Pages with no backend
(function contactForm(){
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const to = 'INSERT EMAIL HERE'; // REPLACE THIS with your email address
    if (to.includes('INSERT EMAIL HERE')) {
      alert('Please replace INSERT EMAIL HERE in contact.html and script.js with your email address.');
      return;
    }
    const name = encodeURIComponent(form.name.value.trim());
    const email = encodeURIComponent(form.email.value.trim());
    const phone = encodeURIComponent(form.phone.value.trim());
    const year = encodeURIComponent(form.year.value);
    const subject = encodeURIComponent(form.subject.value);
    const message = encodeURIComponent(form.message.value.trim());

    const mailto = `mailto:${to}?subject=Nexus%20Education%20Enquiry%20(${subject})&body=` +
      `Name:%20${name}%0AEmail:%20${email}%0APhone:%20${phone}%0AYear:%20${year}%0ASubject:%20${subject}%0A%0AMessage:%0A${message}`;
    window.location.href = mailto;
  });
})();

// Back to top button
(function toTop(){
  const btn = document.querySelector('.to-top');
  if (!btn) return;
  window.addEventListener('scroll', ()=>{
    btn.classList.toggle('show', window.scrollY > 400);
  });
  btn.addEventListener('click', ()=>{
    window.scrollTo({ top:0, behavior:'smooth' });
  });
})();