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
