/* ============================================================
   Navigacija + skaliranje prezentacije
   Tipke:  → / Space / PageDown  = sljedeći
           ← / PageUp            = prethodni
           Home / End            = prvi / zadnji
           F                     = cijeli zaslon
   ============================================================ */
(function () {
  const stage   = document.getElementById('stage');
  const slides  = Array.from(document.querySelectorAll('.slide:not([data-skip])'));
  const counter = document.getElementById('counter');

  let i = slides.findIndex(s => s.classList.contains('active'));
  if (i < 0) i = 0;

  function render() {
    slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
    counter.textContent = (i + 1) + ' / ' + slides.length;
    // Brojač se skriva na slajdovima označenima s data-hide-ui (naslovnica, zadnji)
    counter.classList.toggle('ui-hidden', slides[i].hasAttribute('data-hide-ui'));
  }

  function go(n)  { i = Math.max(0, Math.min(slides.length - 1, n)); render(); }
  function next() { go(i + 1); }
  function prev() { go(i - 1); }

  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'ArrowRight':
      case 'PageDown':
      case ' ':        e.preventDefault(); next(); break;
      case 'ArrowLeft':
      case 'PageUp':    prev(); break;
      case 'Home':      go(0); break;
      case 'End':       go(slides.length - 1); break;
      case 'f':
      case 'F':
        if (!document.fullscreenElement) document.documentElement.requestFullscreen();
        else document.exitFullscreen();
        break;
    }
  });

  document.getElementById('next').addEventListener('click', next);
  document.getElementById('prev').addEventListener('click', prev);

  // Skaliranje pozornice tako da 16:9 uvijek stane u prozor
  function scale() {
    const s = Math.min(window.innerWidth / 1280, window.innerHeight / 720);
    stage.style.transform = 'scale(' + s + ')';
  }
  window.addEventListener('resize', scale);

  scale();
  render();
})();
