/* ═══════════════════════════════════════════════════
   SOCOPER CONSTRUCCIONES — JavaScript
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── HEADER SCROLL EFFECT ─────────────────────
  const header = document.getElementById('header');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.scrollY;
    if (currentScroll > 60) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScroll = currentScroll;
  }, { passive: true });

  // ─── MOBILE MENU ──────────────────────────────
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');

  // Create backdrop overlay on body (outside header to avoid backdrop-filter issues)
  const navBackdrop = document.createElement('div');
  navBackdrop.id = 'navBackdrop';
  document.body.appendChild(navBackdrop);

  function openMenu() {
    nav.classList.add('open');
    hamburger.classList.add('active');
    document.body.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
    // Small delay so CSS transition can play
    requestAnimationFrame(() => navBackdrop.classList.add('visible'));
  }

  function closeMenu() {
    nav.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
    navBackdrop.classList.remove('visible');
  }

  hamburger.addEventListener('click', () => {
    if (nav.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close menu on link click
  nav.querySelectorAll('.nav__link').forEach(link => {
    link.addEventListener('click', () => closeMenu());
  });

  // Close menu when clicking on backdrop
  navBackdrop.addEventListener('click', () => closeMenu());

  // ─── SCROLL REVEAL ────────────────────────────
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger delay based on sibling index
        const siblings = entry.target.parentElement.querySelectorAll('.reveal');
        let siblingIndex = 0;
        siblings.forEach((el, i) => {
          if (el === entry.target) siblingIndex = i;
        });

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, siblingIndex * 100);

        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // ─── COUNTER ANIMATION ────────────────────────
  const counterElements = document.querySelectorAll('.metric__number[data-target]');

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'));
    const duration = 2000;
    const startTime = performance.now();

    function easeOutExpo(t) {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    }

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const current = Math.floor(target * easedProgress);

      el.textContent = current;

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(update);
  }

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  counterElements.forEach(el => counterObserver.observe(el));

  // ─── SMOOTH SCROLL FOR CTA LINKS ─────────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // ─── FORM HANDLING ────────────────────────────
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      const phone = document.getElementById('phone').value;
      const service = document.getElementById('service').value;
      const message = document.getElementById('message').value;

      // Build WhatsApp message
      let waMsg = `Hola, me gustaría solicitar una evaluación técnica.%0A%0A`;
      waMsg += `*Nombre:* ${name}%0A`;
      waMsg += `*Email:* ${email}%0A`;
      waMsg += `*Teléfono:* ${phone}%0A`;
      waMsg += `*Servicio:* ${service}%0A`;
      if (message) waMsg += `*Mensaje:* ${message}%0A`;

      // Open WhatsApp with pre-filled message
      window.open(`https://wa.me/569XXXXXXXX?text=${waMsg}`, '_blank');

      // Show success state
      const btn = form.querySelector('button[type="submit"]');
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<span class="material-symbols-rounded">check_circle</span> Enviado';
      btn.style.background = '#25D366';

      setTimeout(() => {
        btn.innerHTML = originalHTML;
        btn.style.background = '';
        form.reset();
      }, 3000);
    });
  }

  // ─── ACTIVE NAV LINK ON SCROLL ────────────────
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav__link');

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${entry.target.id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }, {
    threshold: 0.3,
    rootMargin: '-72px 0px -50% 0px'
  });

  sections.forEach(section => navObserver.observe(section));

});
