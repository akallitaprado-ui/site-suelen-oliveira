/* Navegação e interações progressivas para o portfólio. */
const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if ('IntersectionObserver' in window && !reduced) {
 const observer = new IntersectionObserver(entries => entries.forEach(entry => {
  if (entry.isIntersecting) { entry.target.classList.add('arrived'); observer.unobserve(entry.target); }
 }), {threshold:.08});
 document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
} else { document.querySelectorAll('.reveal').forEach(el => el.classList.add('arrived')); }
const progress = document.querySelector('.progress');
if (progress) window.addEventListener('scroll', () => {
 const max = document.documentElement.scrollHeight - window.innerHeight;
 progress.style.width = (max > 0 ? window.scrollY / max * 100 : 0) + '%';
}, {passive:true});
const menu = document.querySelector('.service-menu');
if (menu) {
 const hoverPointer = matchMedia('(hover: hover) and (pointer: fine)');
 menu.addEventListener('pointerenter', event => { if (hoverPointer.matches && event.pointerType === 'mouse') menu.open = true; });
 menu.addEventListener('pointerleave', event => { if (hoverPointer.matches && event.pointerType === 'mouse' && !menu.querySelector('nav').contains(document.activeElement)) menu.open = false; });
 document.addEventListener('click', event => { if (!menu.contains(event.target)) menu.open = false; });
 document.addEventListener('keydown', event => { if (event.key === 'Escape') menu.open = false; });
}
const dialog = document.querySelector('.lightbox');
if (dialog && typeof dialog.showModal === 'function') {
 let opener;
 dialog.querySelector('button').addEventListener('click', () => dialog.close());
 dialog.addEventListener('click', event => { if (event.target === dialog) dialog.close(); });
 dialog.addEventListener('close', () => opener?.focus());
 document.querySelectorAll('.zoom').forEach(link => link.addEventListener('click', event => {
  event.preventDefault(); opener = link; const picture = dialog.querySelector('img');
  picture.src = link.href; picture.alt = link.querySelector('img').alt; dialog.showModal();
 }));
}
document.querySelectorAll('.testimonials').forEach(section => {
 const slides = [...section.querySelectorAll('.quote-slide')], controls = section.querySelector('.quote-controls');
 if (!controls || slides.length < 2) return;
 let current = 0;
 const display = () => {
  slides.forEach((slide,i) => { slide.hidden = i !== current; slide.classList.toggle('is-current', i === current); });
  const count = controls.querySelector('.quote-count');
  if (count) count.textContent = String(current+1).padStart(2,'0') + ' / ' + String(slides.length).padStart(2,'0');
 };
 controls.hidden = false;
 controls.querySelectorAll('button').forEach(button => button.addEventListener('click', () => {
  current = (current+Number(button.dataset.direction)+slides.length) % slides.length; display();
 }));
 display();
});
