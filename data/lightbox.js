// Full-screen photo viewer shared by the three model-page samples: lightbox.open(list, i), where list is
// [{src, room}]. Arrows and Escape work; click outside the photo to close.
window.lightbox = (() => {
  const css = `
    .lb { position: fixed; inset: 0; z-index: 100; background: rgba(5,10,16,.94); display: none; align-items: center; justify-content: center; padding: 40px 64px; }
    .lb.open { display: flex; }
    .lb img { max-width: 100%; max-height: 100%; object-fit: contain; }
    .lb p { position: absolute; left: 0; right: 0; bottom: 12px; text-align: center; color: #c9d3de; font: 600 14px/1 "Barlow", sans-serif; letter-spacing: .08em; text-transform: uppercase; }
    .lb button { position: absolute; background: none; border: 0; color: #fff; font-size: 44px; line-height: 1; cursor: pointer; padding: 10px 16px; }
    .lb .x { top: 8px; right: 8px; font-size: 34px; }
    .lb .p { left: 4px; top: 50%; transform: translateY(-50%); }
    .lb .n { right: 4px; top: 50%; transform: translateY(-50%); }
    @media (max-width: 600px) { .lb { padding: 24px 8px; } .lb .p, .lb .n { top: auto; bottom: 30px; transform: none; } }`;
  document.head.insertAdjacentHTML('beforeend', `<style>${css}</style>`);
  const el = document.createElement('div');
  el.className = 'lb';
  el.innerHTML = '<img alt="" /><p></p><button class="x" aria-label="Close">&times;</button><button class="p" aria-label="Previous">&lsaquo;</button><button class="n" aria-label="Next">&rsaquo;</button>';
  document.addEventListener('DOMContentLoaded', () => document.body.appendChild(el));
  let list = [], at = 0;
  const show = () => { el.querySelector('img').src = list[at].src; el.querySelector('p').textContent = list[at].room || ''; };
  const step = d => { at = (at + d + list.length) % list.length; show(); };
  el.onclick = e => { if (e.target === el || e.target.classList.contains('x')) el.classList.remove('open'); };
  el.querySelector('.p').onclick = e => { e.stopPropagation(); step(-1); };
  el.querySelector('.n').onclick = e => { e.stopPropagation(); step(1); };
  document.addEventListener('keydown', e => {
    if (!el.classList.contains('open')) return;
    if (e.key === 'Escape') el.classList.remove('open');
    if (e.key === 'ArrowLeft') step(-1);
    if (e.key === 'ArrowRight') step(1);
  });
  return { open(l, i) { list = l; at = i; show(); el.classList.add('open'); } };
})();
