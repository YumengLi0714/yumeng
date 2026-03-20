// ─── Active nav link on scroll ───────────────────────────────────
const sections  = document.querySelectorAll('section');
const navLinks  = document.querySelectorAll('.sidebar .nav-link');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      const id = entry.target.id;
      const active = document.querySelector(`.sidebar .nav-link[href="#${id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, {
  threshold: 0.25,
  rootMargin: '-10% 0px -65% 0px'
});

sections.forEach(s => sectionObserver.observe(s));

// ─── Hide sidebar + mobile header on scroll down ─────────────────
let lastScroll = 0;
const sidebar      = document.getElementById('sidebar');
const mobileHeader = document.getElementById('mobile-header');

window.addEventListener('scroll', () => {
  const current = window.scrollY;

  if (current > lastScroll && current > 80) {
    // Scrolling down
    sidebar?.classList.add('hidden');
    mobileHeader?.classList.add('hidden');
  } else {
    // Scrolling up
    sidebar?.classList.remove('hidden');
    mobileHeader?.classList.remove('hidden');
  }

  lastScroll = current <= 0 ? 0 : current;
}, { passive: true });

// ─── Mobile hamburger menu ────────────────────────────────────────
const menuToggle = document.getElementById('menu-toggle');
const mobileNav  = document.getElementById('mobile-nav');

menuToggle?.addEventListener('click', () => {
  const isOpen = mobileNav.classList.toggle('open');
  menuToggle.classList.toggle('open', isOpen);
});

// Close mobile nav when a link is clicked
mobileNav?.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    menuToggle?.classList.remove('open');
  });
});

// ─── Smooth scroll for all anchor links ──────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth' });
  });
});
