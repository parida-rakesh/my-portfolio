/* Content is loaded from data/projects.js */
const rkConfig = window.rkPortfolioData?.config || {};
const rkProjects = window.rkPortfolioData?.projects || {};

(function () {
  "use strict";
  var root = document.getElementById('rk-portfolio-site');
  if (!root) return;

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function renderPortfolioCards() {
    var portfolioGrid = document.getElementById('rkPortfolioGrid');
    if (!portfolioGrid) return;

    var projectOrder = rkConfig.projectOrder || Object.keys(rkProjects);
    projectOrder.forEach(function (id, index) {
      var project = rkProjects[id];
      var imageConfig = rkConfig.projects[id];
      var card = document.createElement('article');
      card.className = 'rk-project-card rk-reveal' + (index >= 6 ? ' rk-more-project rk-hide' : '');
      card.setAttribute('data-category', 'wordpress');
      card.innerHTML = '<div class="rk-project-thumb">' +
        '<img data-rk-project-img="' + id + '" src="' + imageConfig.image + '" alt="' + project.title + ' WordPress website" loading="lazy" decoding="async">' +
        '<div class="rk-project-overlay"><button class="rk-view-btn" data-project="' + id + '" aria-label="View ' + project.title + ' project">View Project</button></div>' +
        '</div>';
      portfolioGrid.appendChild(card);
    });
  }

  renderPortfolioCards();

  function applyImageConfig() {
    var profileImg = document.getElementById('rkProfileImg');
    if (profileImg) profileImg.src = rkConfig.profileImage;

    root.querySelectorAll('[data-rk-project-img]').forEach(function (img) {
      var id = img.getAttribute('data-rk-project-img');
      if (rkConfig.projects[id]) img.src = rkConfig.projects[id].image;
    });

    root.querySelectorAll('a[download]').forEach(function (a) {
      a.href = rkConfig.resumeUrl;
    });
  }
  applyImageConfig();

  var typewriter = document.getElementById('rkTypewriter');
  var typewriterWords = ['WordPress Developer', 'Web Developer'];
  var typewriterWordIndex = 0;
  var typewriterCharacterIndex = 0;
  var typewriterIsDeleting = false;

  function runTypewriter() {
    if (!typewriter) return;

    var currentWord = typewriterWords[typewriterWordIndex];
    typewriterCharacterIndex += typewriterIsDeleting ? -1 : 1;
    typewriter.textContent = currentWord.slice(0, typewriterCharacterIndex);

    var delay = typewriterIsDeleting ? 55 : 95;
    if (!typewriterIsDeleting && typewriterCharacterIndex === currentWord.length) {
      typewriterIsDeleting = true;
      delay = 1500;
    } else if (typewriterIsDeleting && typewriterCharacterIndex === 0) {
      typewriterIsDeleting = false;
      typewriterWordIndex = (typewriterWordIndex + 1) % typewriterWords.length;
      delay = 350;
    }

    window.setTimeout(runTypewriter, delay);
  }

  if (typewriter) {
    if (prefersReducedMotion) {
      typewriter.textContent = typewriterWords[0];
    } else {
      runTypewriter();
    }
  }

  var profileTabs = root.querySelectorAll('#profile-tabs .rk-profile-tab');
  var profilePanels = root.querySelectorAll('#profile-tabs .rk-profile-panel');
  profileTabs.forEach(function (tab) {
    tab.addEventListener('click', function () {
      var selectedTab = tab.getAttribute('data-tab');
      profileTabs.forEach(function (item) {
        var isActive = item === tab;
        item.classList.toggle('rk-active', isActive);
        item.setAttribute('aria-selected', String(isActive));
      });
      profilePanels.forEach(function (panel) {
        var isSelected = panel.getAttribute('data-panel') === selectedTab;
        panel.hidden = !isSelected;
        panel.classList.toggle('rk-active', isSelected);
      });
    });
  });

  // =========================
  // Sticky header background on scroll
  // =========================
  var header = document.getElementById('rkHeader');
  function onScrollHeader() {
    if (window.scrollY > 12) header.classList.add('rk-scrolled');
    else header.classList.remove('rk-scrolled');
  }

  // =========================
  // Mobile Navigation
  // =========================
  var burger = document.getElementById('rkBurger');
  var mobileNav = document.getElementById('rkMobileNav');
  var mobileNavClose = document.getElementById('rkMobileNavClose');

  function closeMobileNav() {
    mobileNav.classList.remove('rk-open');
    burger.setAttribute('aria-expanded', 'false');
    burger.setAttribute('aria-label', 'Open menu');
    document.body.style.overflow = '';
  }
  function openMobileNav() {
    mobileNav.classList.add('rk-open');
    burger.setAttribute('aria-expanded', 'true');
    burger.setAttribute('aria-label', 'Close menu');
    document.body.style.overflow = 'hidden';
  }
  burger.addEventListener('click', function () {
    if (mobileNav.classList.contains('rk-open')) closeMobileNav();
    else openMobileNav();
  });
  mobileNavClose.addEventListener('click', closeMobileNav);
  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMobileNav);
  });

  // =========================
  // Smooth Scrolling + active nav link
  // =========================
  var navLinks = root.querySelectorAll('.rk-nav-desktop a, .rk-mobile-nav a[href^="#"]');
  root.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId.length < 2) return;
      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'start' });
      }
    });
  });

  var sections = root.querySelectorAll('main section[id]');
  var desktopLinks = root.querySelectorAll('.rk-nav-desktop a');
  function setActiveNav() {
    var scrollPos = window.scrollY + 140;
    var currentId = '';
    sections.forEach(function (sec) {
      if (scrollPos >= sec.offsetTop) currentId = sec.id;
    });
    desktopLinks.forEach(function (link) {
      link.classList.toggle('rk-active', link.getAttribute('href') === '#' + currentId);
    });
  }

  // =========================
  // Scroll Progress
  // =========================
  var progressBar = document.getElementById('rkProgress');
  function updateProgress() {
    var scrollTop = window.scrollY;
    var docHeight = document.documentElement.scrollHeight - window.innerHeight;
    var pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }

  // =========================
  // Back to Top
  // =========================
  var toTopBtn = document.getElementById('rkToTop');
  function toggleToTop() {
    toTopBtn.classList.toggle('rk-show', window.scrollY > 500);
  }
  toTopBtn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
  });

  var scrollUpdatePending = false;
  function updateScrollState() {
    scrollUpdatePending = false;
    onScrollHeader();
    setActiveNav();
    updateProgress();
    toggleToTop();
  }
  function scheduleScrollUpdate() {
    if (scrollUpdatePending) return;
    scrollUpdatePending = true;
    window.requestAnimationFrame(updateScrollState);
  }
  window.addEventListener('scroll', scheduleScrollUpdate, { passive: true });
  updateScrollState();

  // =========================
  // Scroll Reveal (IntersectionObserver)
  // =========================
  var revealEls = root.querySelectorAll('.rk-reveal');
  if ('IntersectionObserver' in window && !prefersReducedMotion) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('rk-visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('rk-visible'); });
  }

  // =========================
  // Counter Animation
  // =========================
  var statEls = root.querySelectorAll('.rk-stat-num[data-count]');
  function animateCounter(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var suffix = el.getAttribute('data-suffix') || '';
    var isDecimal = String(target).indexOf('.') !== -1;
    var duration = prefersReducedMotion ? 0 : 1400;
    var startTime = null;

    if (duration === 0) {
      el.textContent = target + suffix;
      return;
    }

    function step(ts) {
      if (!startTime) startTime = ts;
      var progress = Math.min((ts - startTime) / duration, 1);
      var current = target * progress;
      el.textContent = (isDecimal ? current.toFixed(1) : Math.floor(current)) + suffix;
      if (progress < 1) requestAnimationFrame(step);
      else el.textContent = target + suffix;
    }
    requestAnimationFrame(step);
  }
  if ('IntersectionObserver' in window) {
    var counterObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          counterObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    statEls.forEach(function (el) { counterObserver.observe(el); });
  } else {
    statEls.forEach(animateCounter);
  }

  // =========================
  // Portfolio Filter
  // =========================
  var filterBtns = root.querySelectorAll('.rk-filter-btn');
  var projectCards = root.querySelectorAll('.rk-project-card');
  var showMoreBtn = document.getElementById('rkShowMore');
  if (showMoreBtn) {
    showMoreBtn.addEventListener('click', function () {
      var isExpanded = showMoreBtn.getAttribute('aria-expanded') === 'true';
      projectCards.forEach(function (card) {
        if (card.classList.contains('rk-more-project')) card.classList.toggle('rk-hide', isExpanded);
      });
      showMoreBtn.setAttribute('aria-expanded', String(!isExpanded));
      showMoreBtn.textContent = isExpanded ? 'Show More Projects' : 'Show Fewer Projects';
    });
  }
  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      filterBtns.forEach(function (b) { b.classList.remove('rk-active'); });
      btn.classList.add('rk-active');
      var filter = btn.getAttribute('data-filter');
      projectCards.forEach(function (card) {
        var match = filter === 'all' || card.getAttribute('data-category') === filter;
        if (match) {
          card.classList.remove('rk-hide');
        } else {
          card.classList.add('rk-hide');
        }
      });
    });
  });

  // =========================
  // Project Modal
  // =========================
  var modalOverlay = document.getElementById('rkModalOverlay');
  var modalImg = document.getElementById('rkModalImg');
  var modalCat = document.getElementById('rkModalCat');
  var modalTitle = document.getElementById('rkModalTitle');
  var modalDesc = document.getElementById('rkModalDesc');
  var modalTech = document.getElementById('rkModalTech');
  var modalLink = document.getElementById('rkModalLink');
  var modalClose = document.getElementById('rkModalClose');
  var lastFocusedEl = null;

  function openModal(id) {
    var data = rkProjects[id];
    var imgConf = rkConfig.projects[id];
    if (!data || !imgConf) return;
    lastFocusedEl = document.activeElement;
    modalImg.src = imgConf.image;
    modalImg.alt = data.title;
    modalCat.textContent = 'WordPress Website';
    modalTitle.textContent = data.title;
    modalDesc.textContent = 'A WordPress website designed and developed with a responsive layout, polished styling and a clear user experience.';
    modalTech.innerHTML = '';
    ['WordPress', 'CSS'].forEach(function (t) {
      var span = document.createElement('span');
      span.textContent = t;
      modalTech.appendChild(span);
    });
    modalLink.href = imgConf.link;
    modalOverlay.classList.add('rk-open');
    document.body.style.overflow = 'hidden';
    modalClose.focus();
  }
  function closeModal() {
    modalOverlay.classList.remove('rk-open');
    document.body.style.overflow = '';
    if (lastFocusedEl) lastFocusedEl.focus();
  }
  root.querySelectorAll('.rk-view-btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      openModal(btn.getAttribute('data-project'));
    });
  });
  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', function (e) {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && modalOverlay.classList.contains('rk-open')) closeModal();
  });

})();
