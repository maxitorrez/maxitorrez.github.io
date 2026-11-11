// Aparición al hacer scroll y barra de progreso de lectura, con Motion (vendor/motion.js).
// Mejora progresiva: sin JS, sin Motion o con "reducir movimiento", todo se ve igual y sin animación.
(() => {
  const M = window.Motion;
  if (!M || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const { animate, inView, scroll, stagger } = M;

  document.documentElement.classList.add('js-reveal');

  // Los elementos que entran juntos en pantalla aparecen escalonados, en orden de lectura.
  let batch = [];
  const flush = () => {
    animate(batch, { opacity: [0, 1], y: [16, 0] }, { duration: 0.45, ease: 'easeOut', delay: stagger(0.07) });
    batch = [];
  };
  inView('.card, .section-title', (el) => {
    if (!batch.length) requestAnimationFrame(flush);
    batch.push(el);
  }, { margin: '0px 0px -8% 0px' });

  const bar = document.querySelector('.progress');
  if (bar) scroll(animate(bar, { scaleX: [0, 1] }, { ease: 'linear' }));
})();
