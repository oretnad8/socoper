/* ═══════════════════════════════════════════════════
   SOCOPER CONSTRUCCIONES — JavaScript
   ═══════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  // ─── FIX HEADER LAYOUT SHIFT ──────────────────
  // Set data-text attribute for CSS to reserve space for bold font
  document.querySelectorAll('.nav__link').forEach(link => {
    link.setAttribute('data-text', link.textContent);
  });

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
    // Move nav to body so it's outside header's backdrop-filter containing block
    document.body.appendChild(nav);
    nav.classList.add('open');
    hamburger.classList.add('active');
    document.body.classList.add('menu-open');
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => navBackdrop.classList.add('visible'));
  }

  function closeMenu() {
    nav.classList.remove('open');
    hamburger.classList.remove('active');
    document.body.classList.remove('menu-open');
    document.body.style.overflow = '';
    navBackdrop.classList.remove('visible');
    // Move nav back into header
    header.querySelector('.header__inner').appendChild(nav);
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

      // Prepare EmailJS parameters
      const templateParams = {
        name: name,
        email: email,
        phone: phone,
        service: service,
        message: message || 'Sin mensaje adicional',
        date: new Date().toLocaleString('es-CL', { timeZone: 'America/Santiago' })
      };

      // Show loading state
      const btn = form.querySelector('button[type="submit"]');
      const originalHTML = btn.innerHTML;
      btn.innerHTML = '<span class="material-symbols-rounded">sync</span> Enviando...';
      btn.disabled = true;

      // Send via EmailJS
      emailjs.send('service_socoper.web', 'template_v4u4n9p', templateParams)
        .then(() => {
          // Success state
          btn.innerHTML = '<span class="material-symbols-rounded">check_circle</span> Enviado con éxito';
          btn.style.background = '#25D366';

          setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
            btn.disabled = false;
            form.reset();
          }, 3000);
        })
        .catch((error) => {
          console.error('EmailJS Error:', error);
          btn.innerHTML = '<span class="material-symbols-rounded">error</span> Error al enviar';
          btn.style.background = '#dc3545';
          btn.disabled = false;

          setTimeout(() => {
            btn.innerHTML = originalHTML;
            btn.style.background = '';
          }, 4000);
        });
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

  // ─── PROJECT VIDEOS SINGLETON PLAYBACK ────────
  const projectVideoCards = document.querySelectorAll('.project-card--video');
  const allVideos = document.querySelectorAll('.project-card--video video');

  projectVideoCards.forEach(card => {
    const video = card.querySelector('video');

    card.addEventListener('click', () => {
      if (video.paused) {
        // Singleton: pause all other videos
        allVideos.forEach(v => {
          v.pause();
          v.closest('.project-card--video').classList.remove('is-playing');
        });

        video.play();
        card.classList.add('is-playing');
      } else {
        video.pause();
        card.classList.remove('is-playing');
      }
    });

    // Also handle case where video ends
    video.addEventListener('ended', () => {
      card.classList.remove('is-playing');
    });
  });

  // ─── SERVICES SLIDER & FILTERING ─────────────
  const servicesSwiper = new Swiper('.services-swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    grabCursor: true,
    loop: false,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });

  const filterButtons = document.querySelectorAll('.filter-btn');
  const slides = document.querySelectorAll('.services-swiper .swiper-slide');

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-category');

      // Update active button
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // Filter slides
      slides.forEach(slide => {
        const slideCategory = slide.getAttribute('data-category');
        if (category === 'all' || slideCategory === category) {
          slide.classList.remove('swiper-slide-hidden');
          slide.style.display = '';
        } else {
          slide.classList.add('swiper-slide-hidden');
          slide.style.display = 'none';
        }
      });

      // Update Swiper layout
      servicesSwiper.update();

      // Move to first slide only if we are not already there
      if (servicesSwiper.activeIndex !== 0) {
        servicesSwiper.slideTo(0, 400);
      }
    });
  });

});
