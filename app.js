/* Interações progressivas. O conteúdo permanece acessível sem JavaScript. */
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const animatedElements = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window && !prefersReducedMotion) {
 const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
   if (entry.isIntersecting) {
    entry.target.classList.add('arrived');
    revealObserver.unobserve(entry.target);
   }
  });
 }, { threshold: 0.08 });
 animatedElements.forEach(element => revealObserver.observe(element));
} else {
 animatedElements.forEach(element => element.classList.add('arrived'));
}
const progressBar = document.querySelector('.progress');
if (progressBar) {
 const updateProgress = () => {
  const scrollable = document.documentElement.scrollHeight - innerHeight;
  progressBar.style.width = (scrollable > 0 ? scrollY / scrollable * 100 : 0) + '%';
 };
 addEventListener('scroll', updateProgress, { passive: true });
 updateProgress();
}
const menu = document.querySelector('.service-menu');
if (menu) {
 const hasHover = window.matchMedia('(hover: hover) and (pointer: fine)');
 menu.addEventListener('pointerenter', event => {
  if (hasHover.matches && event.pointerType === 'mouse') menu.open = true;
 });
 menu.addEventListener('pointerleave', event => {
  if (hasHover.matches && event.pointerType === 'mouse' && !menu.contains(document.activeElement)) menu.open = false;
 });
 document.addEventListener('click', event => { if (!menu.contains(event.target)) menu.open = false; });
 document.addEventListener('keydown', event => { if (event.key === 'Escape') menu.open = false; });
}
const logoStage = document.querySelector('.fx-logo-stage');
const hero = document.querySelector('.fx-home-hero');
if (logoStage && hero && !prefersReducedMotion) {
 hero.addEventListener('pointermove', event => {
  const bounds = logoStage.getBoundingClientRect();
  const x = Math.max(0, Math.min(100, 100 * (event.clientX - bounds.left) / bounds.width));
  const y = Math.max(0, Math.min(100, 100 * (event.clientY - bounds.top) / bounds.height));
  logoStage.style.setProperty('--glow-x', x + '%');
  logoStage.style.setProperty('--glow-y', y + '%');
 });
 hero.addEventListener('pointerleave', () => {
  logoStage.style.setProperty('--glow-x', '50%');
  logoStage.style.setProperty('--glow-y', '50%');
 });
}
document.querySelectorAll('.fx-service-card').forEach(card => {
 card.addEventListener('pointermove', event => {
  const bounds = card.getBoundingClientRect();
  card.style.setProperty('--spot-x', 100 * (event.clientX - bounds.left) / bounds.width + '%');
  card.style.setProperty('--spot-y', 100 * (event.clientY - bounds.top) / bounds.height + '%');
 }, { passive: true });
});
const lightbox = document.querySelector('.lightbox');
if (lightbox && typeof lightbox.showModal === 'function') {
 let previousFocus;
 lightbox.querySelector('button').addEventListener('click', () => lightbox.close());
 lightbox.addEventListener('click', event => { if (event.target === lightbox) lightbox.close(); });
 lightbox.addEventListener('close', () => previousFocus?.focus());
 document.querySelectorAll('.zoom').forEach(link => link.addEventListener('click', event => {
  event.preventDefault();
  previousFocus = link;
  const picture = lightbox.querySelector('img');
  picture.src = link.href;
  picture.alt = link.querySelector('img')?.alt || '';
  lightbox.showModal();
 }));
}
document.querySelectorAll('.review-track').forEach(track => {
 const controls = track.parentElement.querySelector('.review-controls');
 if (!controls) return;
 const buttons = [...controls.querySelectorAll('button')];
 const update = () => {
  const maxScroll = track.scrollWidth - track.clientWidth;
  controls.hidden = maxScroll < 5;
  if (buttons[0]) buttons[0].disabled = track.scrollLeft <= 3;
  if (buttons[1]) buttons[1].disabled = track.scrollLeft >= maxScroll - 3;
 };
 buttons.forEach(button => button.addEventListener('click', () => {
  const firstCard = track.querySelector('.review-card');
  if (firstCard) track.scrollBy({
   left: (firstCard.getBoundingClientRect().width + 16) * Number(button.dataset.review),
   behavior: prefersReducedMotion ? 'instant' : 'smooth'
  });
 }));
 track.addEventListener('scroll', update, { passive: true });
 window.addEventListener('resize', update);
 update();
});
