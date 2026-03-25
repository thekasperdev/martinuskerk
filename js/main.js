/**
 * Red de Sint Martinuskerk — Main JavaScript
 * Scroll animations, navigation, and share functionality
 */

(function () {
  'use strict';

  // ─── Scroll-based fade-in animations ───────────────────
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
  );

  document.querySelectorAll('.fade-in').forEach((el) => observer.observe(el));

  // ─── Sticky navigation on scroll ──────────────────────
  const nav = document.getElementById('nav');

  function updateNav() {
    if (window.scrollY > 80) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  // ─── Mobile hamburger menu ────────────────────────────
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');

  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');
    navToggle.classList.toggle('active');
    navToggle.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      navToggle.classList.remove('active');
      navToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  // ─── Smooth scroll for anchor links ───────────────────
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const offset = nav.offsetHeight;
      const top = target.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ─── Share buttons ────────────────────────────────────
  const shareUrl = window.location.href;
  const shareTitle = 'Red de Sint Martinuskerk in Oud-Zevenaar';
  const shareText =
    'Help ons de Sint Martinuskerk in Oud-Zevenaar te redden! Een rijksmonument met bijna 1000 jaar geschiedenis verdient een toekomst als cultureel centrum.';

  function openShareWindow(url) {
    window.open(url, '_blank', 'width=600,height=400,noopener,noreferrer');
  }

  const shareFacebook = document.getElementById('shareFacebook');
  if (shareFacebook) {
    shareFacebook.addEventListener('click', () => {
      openShareWindow(
        'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(shareUrl)
      );
    });
  }

  const shareTwitter = document.getElementById('shareTwitter');
  if (shareTwitter) {
    shareTwitter.addEventListener('click', () => {
      openShareWindow(
        'https://x.com/intent/tweet?text=' +
          encodeURIComponent(shareText) +
          '&url=' +
          encodeURIComponent(shareUrl)
      );
    });
  }

  const shareWhatsApp = document.getElementById('shareWhatsApp');
  if (shareWhatsApp) {
    shareWhatsApp.addEventListener('click', () => {
      openShareWindow(
        'https://wa.me/?text=' + encodeURIComponent(shareText + ' ' + shareUrl)
      );
    });
  }

  const shareEmail = document.getElementById('shareEmail');
  if (shareEmail) {
    shareEmail.addEventListener('click', () => {
      window.location.href =
        'mailto:?subject=' +
        encodeURIComponent(shareTitle) +
        '&body=' +
        encodeURIComponent(shareText + '\n\n' + shareUrl);
    });
  }

  // ─── Active navigation highlight ─────────────────────
  const sections = document.querySelectorAll('section[id]');
  const navAnchors = document.querySelectorAll('.nav__links a[href^="#"]');

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navAnchors.forEach((a) => {
            a.style.color = '';
            if (a.getAttribute('href') === '#' + id) {
              a.style.color = 'var(--color-gold)';
            }
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((section) => sectionObserver.observe(section));
})();
