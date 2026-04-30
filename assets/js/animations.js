/**
 * VAAV — animations.js
 * IntersectionObserver para .animate-on-scroll y countUp para stats
 */
(function () {
  'use strict';

  /* ── Scroll Animations ── */
  const scrollObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          scrollObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  document.querySelectorAll('.animate-on-scroll').forEach(function (el) {
    scrollObserver.observe(el);
  });

  /* ── CountUp ── */
  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function countUp(element, target, duration) {
    const suffix = element.dataset.suffix || '';
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.round(easeOutCubic(progress) * target);
      element.textContent = value + suffix;
      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        element.textContent = target + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  const statsObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseInt(el.dataset.target, 10);
          if (!isNaN(target)) {
            countUp(el, target, 2000);
          }
          statsObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.3 }
  );

  document.querySelectorAll('.stat-number[data-target]').forEach(function (el) {
    statsObserver.observe(el);
  });

  /* ── Slider autoplay ── */
  function initSlider(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    const slides = container.querySelectorAll('.slide');
    const dots = container.querySelectorAll('.dot');
    if (!slides.length) return;

    let current = 0;

    function goTo(index) {
      slides[current].classList.remove('active');
      dots[current] && dots[current].classList.remove('active');
      current = (index + slides.length) % slides.length;
      slides[current].classList.add('active');
      dots[current] && dots[current].classList.add('active');
    }

    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () { goTo(i); });
    });

    setInterval(function () { goTo(current + 1); }, 4000);
  }

  initSlider('.slider-container');

})();
