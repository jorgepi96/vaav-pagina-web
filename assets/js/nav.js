/**
 * VAAV — nav.js
 * Scroll effect, active link, mobile menu toggle
 */
(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {

    const nav = document.getElementById('main-nav');
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    /* ── Scroll → .scrolled class ── */
    function updateNav() {
      if (window.scrollY > 40) {
        nav && nav.classList.add('scrolled');
      } else {
        nav && nav.classList.remove('scrolled');
      }
    }
    updateNav();
    window.addEventListener('scroll', updateNav, { passive: true });

    /* ── Active link por página ── */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a, .mobile-menu a').forEach(function (link) {
      const href = link.getAttribute('href');
      if (href && (href === currentPage || href.endsWith('/' + currentPage))) {
        link.classList.add('active');
      }
    });

    /* ── Mobile menu toggle ── */
    function openMenu() {
      if (!hamburger || !mobileMenu) return;
      hamburger.classList.add('open');
      hamburger.setAttribute('aria-expanded', 'true');
      mobileMenu.classList.add('open');
      if (overlay) {
        overlay.style.display = 'block';
        requestAnimationFrame(function () {
          overlay.classList.add('open');
        });
      }
      document.body.style.overflow = 'hidden';
    }

    function closeMenu() {
      if (!hamburger || !mobileMenu) return;
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
      mobileMenu.classList.remove('open');
      if (overlay) {
        overlay.classList.remove('open');
        setTimeout(function () {
          overlay.style.display = 'none';
        }, 300);
      }
      document.body.style.overflow = '';
    }

    if (hamburger) {
      hamburger.addEventListener('click', function () {
        if (mobileMenu && mobileMenu.classList.contains('open')) {
          closeMenu();
        } else {
          openMenu();
        }
      });
    }

    if (overlay) {
      overlay.addEventListener('click', closeMenu);
    }

    mobileLinks.forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });

    /* ── ESC key close ── */
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') closeMenu();
    });

  });
})();
