(function () {
  const body = document.body;
  const menuToggle = document.querySelector('[data-menu-toggle]');
  const nav = document.querySelector('[data-nav]');
  const track = function (name, metadata) {
    if (typeof window.veloraTrack === 'function') window.veloraTrack(name, metadata || {});
  };
  if (menuToggle && nav) {
    menuToggle.addEventListener('click', function () {
      const open = nav.classList.toggle('is-open');
      body.classList.toggle('menu-open', open);
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute('aria-label', open ? 'Tutup menu' : 'Buka menu');
      track('menu_toggle', { open: open });
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        nav.classList.remove('is-open'); body.classList.remove('menu-open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.setAttribute('aria-label', 'Buka menu');
      });
    });
  }
  document.querySelectorAll('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  const reveal = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) { if (entry.isIntersecting) { entry.target.classList.add('is-visible'); observer.unobserve(entry.target); } });
    }, { threshold: .12 });
    reveal.forEach(function (el) { observer.observe(el); });
  } else { reveal.forEach(function (el) { el.classList.add('is-visible'); }); }

  document.querySelectorAll('[data-filter]').forEach(function (button) {
    button.addEventListener('click', function () {
      const value = button.dataset.filter;
      document.querySelectorAll('[data-filter]').forEach(function (other) { other.setAttribute('aria-pressed', String(other === button)); });
      document.querySelectorAll('[data-work-item]').forEach(function (item) { item.classList.toggle('is-hidden', value !== 'all' && item.dataset.workItem !== value); });
      track('portfolio_filter', { category: value });
    });
  });

  const packageSelect = document.querySelector('[name="selectedPackage"]');
  const packageNote = document.querySelector('[data-selected-package]');
  const packageNames = { 'website-bisnis': 'Website Bisnis', 'aplikasi-web': 'Aplikasi Web', 'sistem-bisnis': 'Sistem Bisnis' };
  const params = new URLSearchParams(window.location.search);
  const requestedPackage = params.get('paket') || params.get('package');
  if (packageSelect && requestedPackage && packageNames[requestedPackage]) {
    packageSelect.value = requestedPackage;
    if (packageNote) {
      packageNote.hidden = false;
      packageNote.innerHTML = '<b>Paket yang dipilih</b>' + packageNames[requestedPackage] + '. Anda tetap dapat mengubah pilihan di form.';
    }
    track('package_prefill', { package: requestedPackage });
  }
  if (packageSelect) packageSelect.addEventListener('change', function () { track('package_select', { package: packageSelect.value || 'none' }); });

  const form = document.querySelector('[data-inquiry-form]');
  if (form) {
    const status = form.querySelector('[data-form-status]');
    const requiredFields = Array.from(form.querySelectorAll('[required]'));
    function showError(field, message) {
      const error = form.querySelector('[data-error-for="' + field.name + '"]');
      field.setAttribute('aria-invalid', 'true');
      if (error) error.textContent = message;
    }
    function clearError(field) {
      const error = form.querySelector('[data-error-for="' + field.name + '"]');
      field.removeAttribute('aria-invalid');
      if (error) error.textContent = '';
    }
    form.addEventListener('submit', async function (event) {
      event.preventDefault();
      if (form.querySelector('[name="website"]').value) return;
      let valid = true;
      requiredFields.forEach(function (field) {
        clearError(field);
        if (!field.value.trim() || (field.type === 'checkbox' && !field.checked)) {
          showError(field, field.type === 'checkbox' ? 'Persetujuan diperlukan untuk melanjutkan.' : 'Mohon isi bagian ini.'); valid = false;
        }
      });
      const email = form.querySelector('[name="email"]');
      if (email.value && !/^\S+@\S+\.\S+$/.test(email.value)) { showError(email, 'Gunakan alamat email yang valid.'); valid = false; }
      const referenceUrl = form.querySelector('[name="referenceUrl"]');
      if (referenceUrl.value && !/^https?:\/\//i.test(referenceUrl.value)) { showError(referenceUrl, 'Gunakan URL yang diawali http:// atau https://.'); valid = false; }
      if (!valid) { status.textContent = 'Periksa kembali bagian yang ditandai.'; status.dataset.state = 'error'; track('inquiry_validation_error'); return; }
      status.textContent = 'Mengirim…'; status.dataset.state = 'loading';
      form.querySelector('button[type="submit"]').disabled = true;
      const payload = Object.fromEntries(new FormData(form).entries());
      try {
        const response = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
        if (!response.ok) throw new Error('endpoint-unavailable');
        const result = await response.json();
        status.textContent = result.referenceId ? 'Brief tersimpan. Referensi: ' + result.referenceId : 'Brief tersimpan. Kami akan menghubungi Anda setelah meninjaunya.';
        status.dataset.state = 'success'; form.reset(); track('inquiry_submitted', { service: payload.serviceType, package: payload.selectedPackage || 'none' });
      } catch (error) {
        status.textContent = 'Form belum terhubung ke penyimpanan proyek. Tidak ada data yang dianggap terkirim. Silakan hubungkan endpoint /api/leads sebelum peluncuran publik.';
        status.dataset.state = 'error'; track('inquiry_submission_failed');
      } finally { form.querySelector('button[type="submit"]').disabled = false; }
    });
  }
})();

/* ============================================================
   MAHAKARYA MODAL — fully self-contained
   ============================================================ */
(function () {
  var backdrop = document.querySelector('.maha-modal-backdrop');
  if (!backdrop) return;

  var modal        = backdrop.querySelector('.maha-modal');
  var closeBtn     = backdrop.querySelector('.maha-modal-close');
  var labelEl      = backdrop.querySelector('.maha-modal-label');
  var titleEl      = backdrop.querySelector('.maha-modal-title');
  var liveLink     = backdrop.querySelector('.maha-modal-livelink');
  var viewToggle   = backdrop.querySelectorAll('.maha-view-btn');
  var urlBar       = backdrop.querySelector('.maha-url-bar');
  var browserBar   = backdrop.querySelector('.maha-browser-bar');
  var carouselSec  = backdrop.querySelector('.maha-carousel-section');
  var iframeSec    = backdrop.querySelector('.maha-iframe-section');
  var track        = backdrop.querySelector('.maha-track');
  var ctrlBar      = backdrop.querySelector('.maha-ctrl-bar');
  var dotsWrap     = backdrop.querySelector('.maha-dots');
  var prevBtn      = backdrop.querySelector('.maha-nav-btn[data-dir="-1"]');
  var nextBtn      = backdrop.querySelector('.maha-nav-btn[data-dir="1"]');
  var progFill     = backdrop.querySelector('.maha-prog-fill');
  var iframeBody   = backdrop.querySelector('.maha-iframe-body');
  var footerEl     = backdrop.querySelector('.maha-modal-footer');

  var currentProject = null;
  var currentSlide   = 0;
  var autoTimer      = null;
  var currentView    = 'desktop'; // 'desktop' | 'mobile'
  var currentTab     = 'screenshots'; // 'screenshots' | 'live'

  // Build dots
  function buildDots(n) {
    dotsWrap.innerHTML = '';
    for (var i = 0; i < n; i++) {
      var d = document.createElement('button');
      d.className = 'maha-dot' + (i === 0 ? ' is-active' : '');
      d.setAttribute('aria-label', 'Slide ' + (i + 1));
      d.dataset.idx = i;
      d.addEventListener('click', function (e) { goTo(+e.currentTarget.dataset.idx); });
      dotsWrap.appendChild(d);
    }
  }

  function updateDots(idx) {
    dotsWrap.querySelectorAll('.maha-dot').forEach(function (d, i) {
      d.classList.toggle('is-active', i === idx);
    });
  }

  function goTo(idx) {
    if (!currentProject) return;
    var slides = currentProject.slides || [];
    if (!slides.length) return;
    currentSlide = (idx + slides.length) % slides.length;
    if (currentView === 'mobile') {
      track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
    }
    updateDots(currentSlide);
    restartAuto();
  }

  function restartAuto() {
    clearTimeout(autoTimer);
    if (!progFill) return;
    progFill.classList.remove('is-run');
    void progFill.offsetWidth; // reflow
    if (currentView === 'mobile' && currentTab === 'screenshots') {
      progFill.classList.add('is-run');
      autoTimer = setTimeout(function () { goTo(currentSlide + 1); }, 4000);
    }
  }

  function applyView(view) {
    currentView = view;
    viewToggle.forEach(function (btn) {
      btn.setAttribute('aria-pressed', btn.dataset.view === view ? 'true' : 'false');
    });
    carouselSec.setAttribute('data-mode', view);
    iframeSec.setAttribute('data-mode', view);
    if (browserBar) browserBar.style.display = view === 'desktop' ? '' : 'none';
    if (ctrlBar) ctrlBar.style.display = view === 'mobile' ? '' : 'none';

    // Reset track position for mobile
    if (view === 'mobile') {
      track.style.transform = 'translateX(-' + (currentSlide * 100) + '%)';
    } else {
      track.style.transform = '';
    }
    restartAuto();
  }

  function applyTab(tab) {
    currentTab = tab;
    if (tab === 'live') {
      carouselSec.style.display = 'none';
      if (ctrlBar) ctrlBar.style.display = 'none';
      iframeSec.classList.add('is-active');
      clearTimeout(autoTimer);
      if (progFill) { progFill.classList.remove('is-run'); }
    } else {
      carouselSec.style.display = '';
      iframeSec.classList.remove('is-active');
      applyView(currentView);
    }
  }

  function loadProject(project) {
    currentProject = project;
    currentSlide = 0;

    // Header
    if (labelEl) labelEl.textContent = project.category || '';
    if (titleEl) titleEl.textContent = project.title || '';
    if (urlBar) urlBar.textContent = project.liveUrl ? project.liveUrl.replace('https://', '') : '';

    // Live link
    if (liveLink) {
      liveLink.href = project.liveUrl || '#';
      liveLink.target = '_blank';
      liveLink.rel = 'noopener';
      liveLink.querySelector('span').textContent = 'Live ↗';
      // Switch to iframe tab when clicking
      liveLink.onclick = function (e) {
        e.preventDefault();
        applyTab('live');
        // Load iframe lazily
        var existingIframe = iframeBody.querySelector('iframe');
        if (!existingIframe) {
          var iframe = document.createElement('iframe');
          iframe.src = project.liveUrl;
          iframe.title = project.title + ' live preview';
          iframe.loading = 'lazy';
          iframe.sandbox = 'allow-scripts allow-same-origin allow-forms allow-popups';
          var phoneWrap = iframeBody.querySelector('.maha-iframe-phone');
          if (currentView === 'mobile' && phoneWrap) {
            phoneWrap.innerHTML = '';
            phoneWrap.appendChild(iframe);
          } else {
            iframeBody.appendChild(iframe);
          }
        }
      };
    }

    // Build slides
    var slides = project.slides || [];
    track.innerHTML = slides.map(function (src) {
      return '<div class="maha-slide"><img src="' + src + '" alt="" loading="lazy"></div>';
    }).join('');
    buildDots(slides.length);

    // Footer details
    if (footerEl) {
      footerEl.innerHTML =
        '<div class="maha-detail-item"><span class="maha-detail-label">Client</span><span class="maha-detail-value">' + (project.client || '—') + '</span></div>' +
        '<div class="maha-detail-item"><span class="maha-detail-label">Stack</span><div class="maha-detail-tags">' +
        (project.tags || []).map(function (t) { return '<span class="maha-tag">' + t + '</span>'; }).join('') +
        '</div></div>' +
        '<div class="maha-detail-item maha-detail-workflow"><span class="maha-detail-label">Workflow</span>' + (project.workflow || '') + '</div>';
    }

    // Reset iframe
    if (iframeBody) iframeBody.innerHTML = '';
    iframeSec.classList.remove('is-active');
    carouselSec.style.display = '';

    applyView('desktop'); // always start in desktop mode
    applyTab('screenshots');
  }

  // Open / close
  function openModal(project) {
    loadProject(project);
    backdrop.style.display = 'flex';
    // Force reflow so transition plays
    void backdrop.offsetWidth;
    backdrop.classList.add('is-open');
    document.body.style.overflow = 'hidden';
    if (closeBtn) closeBtn.focus();
  }
  function closeModal() {
    backdrop.classList.remove('is-open');
    document.body.style.overflow = '';
    clearTimeout(autoTimer);
    if (progFill) progFill.classList.remove('is-run');
    // Hide after transition ends
    backdrop.addEventListener('transitionend', function hide() {
      if (!backdrop.classList.contains('is-open')) backdrop.style.display = 'none';
      backdrop.removeEventListener('transitionend', hide);
    });
    // Destroy iframe to stop playback
    if (iframeBody) iframeBody.innerHTML = '';
  }

  if (closeBtn) closeBtn.addEventListener('click', closeModal);
  backdrop.addEventListener('click', function (e) { if (e.target === backdrop) closeModal(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && backdrop.classList.contains('is-open')) closeModal(); });

  // View toggle
  viewToggle.forEach(function (btn) {
    btn.addEventListener('click', function () {
      applyView(btn.dataset.view);
      if (currentTab === 'live') {
        iframeSec.setAttribute('data-mode', btn.dataset.view);
        // re-place iframe
        var existingIframe = iframeBody.querySelector('iframe');
        if (existingIframe) {
          var phoneWrap = iframeBody.querySelector('.maha-iframe-phone');
          if (btn.dataset.view === 'mobile' && phoneWrap) {
            phoneWrap.innerHTML = '';
            phoneWrap.appendChild(existingIframe);
          } else if (btn.dataset.view === 'desktop') {
            iframeBody.appendChild(existingIframe);
          }
        }
      }
    });
  });

  // Prev / Next
  if (prevBtn) prevBtn.addEventListener('click', function () { goTo(currentSlide - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { goTo(currentSlide + 1); });

  // Touch swipe (mobile mode)
  var touchStartX = 0;
  var trackWrap = backdrop.querySelector('.maha-track-wrap');
  if (trackWrap) {
    trackWrap.addEventListener('touchstart', function (e) { touchStartX = e.touches[0].clientX; }, { passive: true });
    trackWrap.addEventListener('touchend', function (e) {
      var dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 40) { goTo(currentSlide + (dx < 0 ? 1 : -1)); }
    }, { passive: true });
  }

  // Wire up cards
  document.querySelectorAll('[data-maha-open]').forEach(function (card) {
    card.addEventListener('click', function () {
      var key = card.dataset.mahaOpen;
      var project = window.mahaProjects && window.mahaProjects[key];
      if (project) openModal(project);
    });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); card.click(); }
    });
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
  });
})();
