/* Aprimoramentos progressivos: o conteúdo também funciona sem JavaScript. */
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

if ('IntersectionObserver' in window && !reduced) {
  const observer = new IntersectionObserver(items => {
    items.forEach(item => {
      if (item.isIntersecting) {
        item.target.classList.add('arrived');
        observer.unobserve(item.target);
      }
    });
  }, { threshold: .08 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
}

const progress = document.querySelector('.progress');
addEventListener('scroll', () => {
  const max = document.documentElement.scrollHeight - innerHeight;
  if (progress) progress.style.width = (max ? scrollY / max * 100 : 0) + '%';
}, { passive: true });

const menu = document.querySelector('.service-menu');
// Open the submenu on mouse hover without changing native click/touch/keyboard behavior.
if (menu) {
  const hoverPointer = matchMedia('(hover: hover) and (pointer: fine)');
  menu.addEventListener('pointerenter', event => {
    if (hoverPointer.matches && event.pointerType === 'mouse') menu.open = true;
  });
  menu.addEventListener('pointerleave', event => {
    if (hoverPointer.matches && event.pointerType === 'mouse' && !menu.querySelector('nav').contains(document.activeElement)) {
      menu.open = false;
    }
  });
}
document.addEventListener('click', e => { if (menu && !menu.contains(e.target)) menu.open = false; });
document.addEventListener('keydown', e => { if (e.key === 'Escape' && menu) menu.open = false; });

document.querySelectorAll('.testimonials').forEach(section => {
  const slides = [...section.querySelectorAll('.quote-slide')];
  const controls = section.querySelector('.quote-controls');
  if (!controls || slides.length < 2) return;
  let current = 0;
  function display() {
    slides.forEach((slide, i) => {
      slide.hidden = i !== current;
      slide.classList.toggle('is-current', i === current);
    });
    controls.querySelector('.quote-count').textContent = String(current + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
  }
  controls.hidden = false;
  controls.querySelectorAll('button').forEach(b => b.addEventListener('click', () => {
    current = (current + Number(b.dataset.direction) + slides.length) % slides.length;
    display();
  }));
  display();
});

const dialog = document.querySelector('.lightbox');
if (dialog && typeof dialog.showModal === 'function') {
  let opener;
  dialog.querySelector('button').addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', e => { if (e.target === dialog) dialog.close(); });
  dialog.addEventListener('close', () => opener?.focus());
  document.querySelectorAll('.zoom').forEach(link => link.addEventListener('click', e => {
    e.preventDefault();
    opener = link;
    const image = dialog.querySelector('img');
    image.src = link.href;
    image.alt = link.querySelector('img').alt;
    dialog.showModal();
  }));
}

if ('IntersectionObserver' in window) {
  const links = [...document.querySelectorAll('.page-nav a')];
  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => {
          const active = link.hash === '#' + entry.target.id;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      }
    });
  }, { rootMargin: '-20% 0px -55% 0px' });
  links.forEach(link => {
    const el = document.querySelector(link.hash);
    if (el) spy.observe(el);
  });
}

// Galeria de depoimentos: mantém os depoimentos originais no HTML.
document.querySelectorAll('.review-track').forEach(track => {
  const controls = track.parentElement.querySelector('.review-controls');
  if (!controls) return;
  const buttons = [...controls.querySelectorAll('button')];
  function update() {
    const max = track.scrollWidth - track.clientWidth;
    controls.hidden = max < 5;
    buttons[0].disabled = track.scrollLeft <= 3;
    buttons[1].disabled = track.scrollLeft >= max - 3;
  }
  buttons.forEach(b => b.addEventListener('click', () => {
    const card = track.querySelector('.review-card');
    if (card) track.scrollBy({ left: (card.getBoundingClientRect().width + 16) * Number(b.dataset.review), behavior: reduced ? 'instant' : 'smooth' });
  }));
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
});

const aura = document.querySelector('.brand-hero');
if (aura && !reduced) {
  aura.addEventListener('pointermove', event => {
    const r = aura.getBoundingClientRect();
    aura.style.setProperty('--mx', (event.clientX - r.left) / r.width * 100 + '%');
    aura.style.setProperty('--my', (event.clientY - r.top) / r.height * 100 + '%');
  });
}

// Alternância entre os tipos de parto (incluindo links compartilháveis).
const birthChoices = [...document.querySelectorAll('[data-birth-choice]')];
function selectBirthType(kind, updateUrl = true) {
  if (!birthChoices.length || !['normal', 'cesarea'].includes(kind)) return;
  birthChoices.forEach(button => {
    const selected = button.dataset.birthChoice === kind;
    button.classList.toggle('is-selected', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  document.querySelectorAll('[data-birth-content]').forEach(block => {
    block.hidden = block.dataset.birthContent !== kind;
  });
  const current = kind === 'normal' ? 'Parto normal' : 'Cesárea';
  const serviceField = document.querySelector('.birth-journey .date-request [name="service"]');
  if (serviceField) serviceField.value = current;
  const status = document.querySelector('.birth-selection-status');
  if (status) status.textContent = `Você está visualizando os pacotes de ${current.toLowerCase()}.`;
  if (updateUrl) {
    const url = new URL(window.location.href);
    url.searchParams.set('tipo', kind);
    if (url.protocol === 'http:' || url.protocol === 'https:') {
      window.history.replaceState(null, '', url);
    }
  }
  // Os cartões escolhidos podem precisar ser revelados após saírem do estado oculto.
  if (reduced || !('IntersectionObserver' in window)) {
    document.querySelectorAll('[data-birth-content]:not([hidden]) .reveal').forEach(el => el.classList.add('arrived'));
  } else {
    const observer = new IntersectionObserver(items => {
      items.forEach(item => { if (item.isIntersecting) { item.target.classList.add('arrived'); observer.unobserve(item.target); } });
    }, { threshold: .08 });
    document.querySelectorAll('[data-birth-content]:not([hidden]) .reveal:not(.arrived)').forEach(el => observer.observe(el));
  }
}
if (birthChoices.length) {
  birthChoices.forEach(button => button.addEventListener('click', () => selectBirthType(button.dataset.birthChoice)));
  const type = new URLSearchParams(window.location.search).get('tipo');
  selectBirthType(type === 'cesarea' ? 'cesarea' : 'normal', false);
}

// Agenda de 2027 ainda fechada. Sem envio para datas posteriores a 2026.
const localToday = new Date();
const todayDate = [localToday.getFullYear(), String(localToday.getMonth() + 1).padStart(2, '0'), String(localToday.getDate()).padStart(2, '0')].join('-');
document.querySelectorAll('.date-request').forEach(form => {
  const dateField = form.querySelector('input[name="date"]');
  if (dateField) {
    dateField.min = todayDate;
    dateField.max = '2026-12-31';
    if (todayDate > '2026-12-31') {
      dateField.disabled = true;
      const submit = form.querySelector('button[type="submit"]');
      if (submit) submit.disabled = true;
    }
  }
  form.addEventListener('submit', event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const values = new FormData(form);
    const rawDate = String(values.get('date') || '');
    if (!rawDate || rawDate > '2026-12-31') return;
    const date = rawDate.split('-').reverse().join('/');
    const service = String(values.get('service') || 'um serviço');
    const message = `Olá, Suelen! Gostaria de consultar a disponibilidade para ${service} no dia ${date}. Podemos conversar?`;
    window.open('https://wa.me/5519999200399?text=' + encodeURIComponent(message), '_blank', 'noopener,noreferrer');
  });
});


// Lighting that follows the pointer inside selected cards; keyboard and touch are supported.
document.querySelectorAll('.spotlight-card').forEach(card => {
  card.addEventListener('pointermove', event => {
    const bounds = card.getBoundingClientRect();
    card.style.setProperty('--spot-x', `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
    card.style.setProperty('--spot-y', `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
  }, { passive: true });
  card.addEventListener('pointerdown', () => card.classList.add('is-touched'));
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(name =>
    card.addEventListener(name, () => card.classList.remove('is-touched'))
  );
});
