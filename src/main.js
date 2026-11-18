import './style.css';

document.querySelector('#year').textContent = new Date().getFullYear();

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.desktop-nav');
menuButton.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', String(isOpen));
  menuButton.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  nav.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
}));

const glow = document.querySelector('.cursor-glow');
window.addEventListener('pointermove', (event) => {
  glow.style.left = event.clientX + 'px';
  glow.style.top = event.clientY + 'px';
  glow.style.opacity = '1';
}, { passive: true });
window.addEventListener('pointerleave', () => { glow.style.opacity = '0'; });

if (window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
  document.querySelectorAll('[data-tilt]').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `perspective(850px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg) translateY(-4px)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}


// Subtle layered depth on the hero artwork; disabled for touch and reduced-motion users.
const heroArt = document.querySelector('.hero-art');
if (heroArt && window.matchMedia('(hover: hover) and (pointer: fine)').matches &&
    !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  heroArt.addEventListener('pointermove', (event) => {
    const rect = heroArt.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width - .5;
    const py = (event.clientY - rect.top) / rect.height - .5;
    const frame = heroArt.querySelector('.frame-front');
    const back = heroArt.querySelector('.frame-back');
    if (frame) frame.style.transform = `rotateY(${px * 7}deg) rotateX(${-py * 6}deg) rotateZ(-3deg) translateZ(30px)`;
    if (back) back.style.transform = `translate(${32 + px * -12}px,${-10 + py * -10}px) rotate(${7 + px * 3}deg) translateZ(-25px)`;
  });
  heroArt.addEventListener('pointerleave', () => {
    const frame = heroArt.querySelector('.frame-front');
    const back = heroArt.querySelector('.frame-back');
    if (frame) frame.style.transform = '';
    if (back) back.style.transform = '';
  });
}
