/* ===================================================================
   RetainTech — site.js
   =================================================================== */

/* ---- Shared Chrome ---- */

const siteHeader = `
<header class="site-header">
  <div class="header-inner">
    <a class="brand" href="index.html" aria-label="RetainTech home">
      <span class="brand-mark" aria-hidden="true"></span>
      <span class="brand-text">
        <strong>RetainTech</strong>
        <span>Premium walls & landscapes</span>
      </span>
    </a>

    <nav class="site-nav" aria-label="Primary navigation" data-nav>
      <ul class="nav-list">
        <li><a href="index.html">Home</a></li>
        <li><a href="about.html">About</a></li>
        <li><a href="services.html">Services</a></li>
        <li><a href="our-work.html">Our Work</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
      <div class="nav-cta-row">
        <a class="btn btn--primary btn--sm" href="contact.html">Get a Free Quote</a>
      </div>
    </nav>

    <button class="nav-toggle" type="button" aria-label="Open menu" aria-expanded="false" data-nav-toggle>
      <span class="nav-toggle-bar" aria-hidden="true"></span>
    </button>
  </div>
</header>`;

const siteFooter = `
<footer class="site-footer">
  <div class="footer-inner">
    <div class="footer-brand">
      <a class="brand" href="index.html">
        <span class="brand-mark" aria-hidden="true"></span>
        <span class="brand-text">
          <strong>RetainTech</strong>
          <span>Built for strength, designed to last</span>
        </span>
      </a>
      <p>High-end retaining walls, landscaping and site works across the Mornington Peninsula, Melbourne, Geelong and Greater Melbourne.</p>
    </div>

    <div class="footer-col">
      <h4>Services</h4>
      <ul class="footer-links">
        <li><a href="services.html#concrete">Concrete Retaining Walls</a></li>
        <li><a href="services.html#sleeper">Concrete Sleeper Walls</a></li>
        <li><a href="services.html#timber">Timber Retaining Walls</a></li>
        <li><a href="services.html#landscaping">Landscaping & Excavation</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h4>Company</h4>
      <ul class="footer-links">
        <li><a href="about.html">About Us</a></li>
        <li><a href="services.html#areas">Service Areas</a></li>
        <li><a href="contact.html">Free Quote</a></li>
        <li><a href="contact.html">Contact</a></li>
      </ul>
    </div>

    <div class="footer-col">
      <h4>Contact</h4>
      <ul class="footer-links">
        <li><a href="tel:+61401023389">0401 023 389</a></li>
        <li><a href="mailto:quotes@retaintech.com.au">quotes@retaintech.com.au</a></li>
        <li>Mon – Fri, 7am – 5pm</li>
        <li>Free site inspections available</li>
      </ul>
    </div>
  </div>
  <div class="footer-bottom">
    <span>Licensed, insured and built for long-term performance.</span>
    <span>&copy; <span data-year></span> RetainTech. All rights reserved.</span>
  </div>
</footer>`;

/* ---- Image placeholder markup helper ---- */
function imgPlaceholderHTML(label, aspect = 'landscape') {
  return `
  <div class="img-placeholder img-placeholder--${aspect}">
    <div class="img-placeholder-icon">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="3"/>
        <circle cx="8.5" cy="8.5" r="1.5"/>
        <polyline points="21 15 16 10 5 21"/>
      </svg>
    </div>
    <span class="img-placeholder-label">${label}</span>
  </div>`;
}

/* ---- Mount shared header/footer ---- */
function mountChrome() {
  const h = document.querySelector('[data-site-header]');
  const f = document.querySelector('[data-site-footer]');
  if (h) h.outerHTML = siteHeader;
  if (f) f.outerHTML = siteFooter;

  /* Mobile CTA bar — injected once, hidden via CSS until ≤820px */
  if (!document.querySelector('.mobile-cta-bar')) {
    const bar = document.createElement('div');
    bar.className = 'mobile-cta-bar';
    bar.setAttribute('aria-hidden', 'true');
    bar.innerHTML = `
      <a href="tel:+61401023389" class="mobile-cta-call">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.07 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3 1.18h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 21 16z"/></svg>
        0401 023 389
      </a>
      <a href="contact.html" class="mobile-cta-quote btn btn--primary btn--sm">Free Quote</a>`;
    document.body.appendChild(bar);
  }
}

/* ---- Active nav link ---- */
function setActiveNav() {
  const page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('.nav-list a').forEach(a => {
    const href = (a.getAttribute('href') || '').toLowerCase();
    a.removeAttribute('aria-current');
    if (href === page || (page === '' && href === 'index.html')) {
      a.setAttribute('aria-current', 'page');
    }
  });
}

/* ---- Mobile nav ---- */
function initMobileNav() {
  const nav    = document.querySelector('[data-nav]');
  const toggle = document.querySelector('[data-nav-toggle]');
  if (!nav || !toggle) return;

  const close = () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
  };
  const open = () => {
    nav.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
  };

  toggle.addEventListener('click', () => nav.classList.contains('is-open') ? close() : open());
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    if (window.matchMedia('(max-width: 820px)').matches) close();
  }));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  document.addEventListener('click', e => {
    if (!nav.contains(e.target) && !toggle.contains(e.target)) close();
  });
}

/* ---- Reveal on scroll ---- */
function initReveal() {
  const items = document.querySelectorAll('[data-reveal]');
  if (!items.length) return;

  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('is-visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.14 });

  items.forEach(el => io.observe(el));
}

/* ---- Counters ---- */
function animateCounter(el) {
  const target   = Number(el.dataset.counter || 0);
  const suffix   = el.dataset.suffix || '';
  const duration = 1400;
  const t0       = performance.now();

  const frame = now => {
    const p     = Math.min((now - t0) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(target * eased) + suffix;
    if (p < 1) requestAnimationFrame(frame);
  };
  requestAnimationFrame(frame);
}

function initCounters() {
  const counters = document.querySelectorAll('[data-counter]');
  if (!counters.length) return;

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateCounter);
    return;
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { animateCounter(e.target); io.unobserve(e.target); } });
  }, { threshold: 0.5 });

  counters.forEach(el => io.observe(el));
}

/* ---- Copyright year ---- */
function initYear() {
  document.querySelectorAll('[data-year]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });
}

/* ---- Schema.org ---- */
function injectSchema() {
  if (!document.body.dataset.schema) return;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'RetainTech',
    url: location.href,
    telephone: '+61 7 5300 4821',
    email: 'quotes@retaintech.com.au',
    areaServed: ['Mornington Peninsula', 'Melbourne', 'Geelong', 'Greater Melbourne'],
    description: 'Premium retaining walls, landscaping and excavation services across Greater Melbourne.'
  };
  const el = document.createElement('script');
  el.type = 'application/ld+json';
  el.textContent = JSON.stringify(schema);
  document.head.appendChild(el);
}

/* ===================================================================
   CONTACT FORM — EmailJS
   -------------------------------------------------------------------
   WHY EmailJS: Browsers block raw SMTP (TCP) for security.
   EmailJS works exactly like Flask-Mail but from the browser —
   you store your Gmail credentials in their dashboard, their server
   does the SMTP relay, your JS calls their API. Same result, no backend.

   5-MINUTE SETUP:
   ① Go to https://emailjs.com → Sign Up (free, 200 emails/month)
   ② "Email Services" → Add Service → Gmail →
        connect account: Hadi.ishfaque@gmail.com → Copy the Service ID
   ③ "Email Templates" → Create Template →
        - Set "To Email" to: Hadi.ishfaque@gmail.com
        - Paste the HTML template from the comment at the bottom of this file
        - Create one template named "Specified", one named "General"
        - Copy each Template ID
   ④ "Account" → "API Keys" → Copy Public Key
   ⑤ Paste the three values below — done. No server needed.
   =================================================================== */

const EMAILJS_PUBLIC_KEY    = 'YOUR_PUBLIC_KEY';      // Account → API Keys
const EMAILJS_SERVICE_ID    = 'YOUR_SERVICE_ID';      // Email Services tab
const EMAILJS_TPL_SPECIFIED = 'template_specified';   // Template ID for wall quote
const EMAILJS_TPL_GENERAL   = 'template_general';     // Template ID for enquiry

/* Called once on page load to authenticate the EmailJS session */
function initEmailJS() {
  if (typeof emailjs === 'undefined') return;
  emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
}

function initContactTabs() {
  const tabBtns  = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');
  if (!tabBtns.length) return;

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const target = btn.dataset.tab;
      tabBtns.forEach(b  => b.setAttribute('aria-selected', 'false'));
      tabPanes.forEach(p => p.classList.remove('is-active'));
      btn.setAttribute('aria-selected', 'true');
      document.getElementById(target)?.classList.add('is-active');
    });
  });
}

function showFormStatus(form, type, message) {
  const status = form.querySelector('.form-status');
  if (!status) return;
  status.className = `form-status ${type}`;
  status.textContent = message;
  status.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

function setFormLoading(form, loading) {
  const btn = form.querySelector('[type="submit"]');
  if (!btn) return;
  btn.disabled = loading;
  btn.textContent = loading ? 'Sending…' : btn.dataset.originalText || 'Send';
}

async function sendEmail(templateId, params) {
  if (typeof emailjs === 'undefined') {
    throw new Error('EmailJS SDK not found. Check that the <script> tag is above site.js in the HTML.');
  }
  return emailjs.send(EMAILJS_SERVICE_ID, templateId, params);
}

function initSpecifiedForm() {
  const form = document.getElementById('form-specified');
  if (!form) return;

  const btn = form.querySelector('[type="submit"]');
  if (btn) btn.dataset.originalText = btn.textContent;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));

    setFormLoading(form, true);
    try {
      await sendEmail(EMAILJS_TPL_SPECIFIED, {
        to_email: 'Hadi.ishfaque@gmail.com',
        from_name:    data.name,
        from_email:   data.email,
        phone:         data.phone,
        wall_type:     data.wall_type,
        wall_length:   data.wall_length,
        wall_height:   data.wall_height,
        wall_purpose:  data.wall_purpose,
        access:        data.access,
        notes:         data.notes,
        subject:       `Specified Quote Request – ${data.name}`,
      });
      showFormStatus(form, 'success', '✓ Sent! We\'ll be in touch within one business day.');
      form.reset();
    } catch (err) {
      console.error(err);
      showFormStatus(form, 'error', 'Something went wrong. Please call us on 0401 023 389.');
    } finally {
      setFormLoading(form, false);
    }
  });
}

function initGeneralForm() {
  const form = document.getElementById('form-general');
  if (!form) return;

  const btn = form.querySelector('[type="submit"]');
  if (btn) btn.dataset.originalText = btn.textContent;

  form.addEventListener('submit', async e => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(form));

    setFormLoading(form, true);
    try {
      await sendEmail(EMAILJS_TPL_GENERAL, {
        to_email: 'Hadi.ishfaque@gmail.com',
        from_name:  data.name,
        from_email: data.email,
        phone:       data.phone,
        enquiry:     data.enquiry,
        subject:     `General Enquiry – ${data.name}`,
      });
      showFormStatus(form, 'success', '✓ Message received! We\'ll respond shortly.');
      form.reset();
    } catch (err) {
      console.error(err);
      showFormStatus(form, 'error', 'Something went wrong. Please call us on 0401 023 389.');
    } finally {
      setFormLoading(form, false);
    }
  });
}

/* ===================================================================
   GALLERY — localStorage CRUD
   Storage key: ace_gallery_v1
   Schema: [{ id, title, description, images: [{id, url, caption, type}] }]
   =================================================================== */

const GALLERY_KEY = 'ace_gallery_v1';

function getGalleryData() {
  try { return JSON.parse(localStorage.getItem(GALLERY_KEY)) || []; }
  catch { return []; }
}

function saveGalleryData(data) {
  localStorage.setItem(GALLERY_KEY, JSON.stringify(data));
}

function genId() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 6);
}

/* ---- Gallery public page renderer ----
   our-work.html handles its own render inline (avoids timing issues
   with dynamic section reveal). This function is a no-op for that page
   but kept so other pages that might include gallery-output work too. */
function renderPublicGallery() {
  const container = document.getElementById('gallery-output');
  // our-work.html has its own inline renderer; skip double-render
  if (!container || document.querySelector('[data-gallery-inline]')) return;

  const data = getGalleryData();

  if (!data.length) {
    container.innerHTML = `
      <div class="gallery-empty">
        <svg viewBox="0 0 24 24" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="3"/>
          <circle cx="8.5" cy="8.5" r="1.5"/>
          <polyline points="21 15 16 10 5 21"/>
        </svg>
        <p>Gallery coming soon — check back for project photos and completed works.</p>
      </div>`;
    return;
  }

  container.innerHTML = data.map(section => `
    <div class="gallery-section" data-reveal>
      <div class="gallery-section-head">
        <span class="kicker">${escHtml(section.title)}</span>
        ${section.description ? `<p>${escHtml(section.description)}</p>` : ''}
      </div>
      ${section.images && section.images.length ? `
        <div class="gallery-grid">
          ${section.images.map(img => `
            <article class="gallery-item">
              <div class="gallery-item-img">
                ${img.url ? `<img src="${escHtml(img.url)}" alt="${escHtml(img.caption || 'Project photo')}" loading="lazy">` : ''}
                ${img.type ? `<span class="gallery-badge gallery-badge--${img.type}">${img.type === 'before' ? 'Before' : 'After'}</span>` : ''}
              </div>
              <div class="gallery-item-body">
                ${img.caption ? `<h4>${escHtml(img.caption)}</h4>` : ''}
                ${img.description ? `<p>${escHtml(img.description)}</p>` : ''}
              </div>
            </article>`).join('')}
        </div>` : '<p style="color:var(--text-dim);font-size:var(--t-sm);">No images in this section yet.</p>'}
    </div>`).join('');

  // Re-trigger reveal for dynamically rendered items
  document.querySelectorAll('[data-reveal]').forEach(el => {
    if (!el.classList.contains('is-visible')) initRevealSingle(el);
  });
}

function initRevealSingle(el) {
  if (!('IntersectionObserver' in window)) { el.classList.add('is-visible'); return; }
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-visible'); io.unobserve(e.target); } });
  }, { threshold: 0.12 });
  io.observe(el);
}

/* ---- Gallery admin page ---- */
function initGalleryAdmin() {
  if (!document.getElementById('admin-app')) return;

  // Simple password gate
  const PASSWORD = 'ace-retaining-2024';
  let unlocked   = sessionStorage.getItem('ace_admin_auth') === '1';

  const loginBox  = document.getElementById('admin-login');
  const app       = document.getElementById('admin-app');
  const pwInput   = document.getElementById('admin-pw');
  const pwBtn     = document.getElementById('admin-pw-btn');
  const pwError   = document.getElementById('admin-pw-error');

  if (!unlocked) {
    if (app) app.style.display = 'none';
  } else {
    if (loginBox) loginBox.style.display = 'none';
  }

  if (pwBtn) {
    pwBtn.addEventListener('click', () => {
      if (pwInput.value === PASSWORD) {
        sessionStorage.setItem('ace_admin_auth', '1');
        if (loginBox) loginBox.style.display = 'none';
        if (app) app.style.display = '';
        renderAdmin();
      } else {
        if (pwError) { pwError.textContent = 'Incorrect password.'; pwError.style.display = 'block'; }
      }
    });
    pwInput?.addEventListener('keydown', e => { if (e.key === 'Enter') pwBtn.click(); });
  }

  if (unlocked) renderAdmin();
}

function renderAdmin() {
  renderSectionList();
  initAddSectionForm();
  initAddImageForm();
}

function renderSectionList() {
  const list = document.getElementById('section-list');
  if (!list) return;
  const data = getGalleryData();

  if (!data.length) {
    list.innerHTML = '<p style="color:rgba(255,255,255,0.4);font-size:var(--t-sm);">No sections yet. Add one below.</p>';
    updateSectionSelect();
    return;
  }

  list.innerHTML = data.map(s => `
    <div class="section-list-item" data-section-id="${s.id}">
      <div>
        <h4>${escHtml(s.title)}</h4>
        <p>${s.images ? s.images.length : 0} image${(s.images?.length || 0) !== 1 ? 's' : ''} ${s.description ? '— ' + escHtml(s.description.slice(0, 60)) + (s.description.length > 60 ? '…' : '') : ''}</p>
      </div>
      <div class="section-actions">
        <button class="btn btn--sm btn--secondary" onclick="deleteSection('${s.id}')">Delete</button>
      </div>
    </div>`).join('');

  updateSectionSelect();
  renderImageList();
}

function updateSectionSelect() {
  const sel = document.getElementById('img-section-select');
  if (!sel) return;
  const data = getGalleryData();
  sel.innerHTML = data.length
    ? data.map(s => `<option value="${s.id}">${escHtml(s.title)}</option>`).join('')
    : '<option value="">— Add a section first —</option>';
}

function renderImageList() {
  const list = document.getElementById('image-list');
  if (!list) return;
  const sel  = document.getElementById('img-section-select');
  if (!sel || !sel.value) { list.innerHTML = ''; return; }

  const data    = getGalleryData();
  const section = data.find(s => s.id === sel.value);
  if (!section) { list.innerHTML = ''; return; }

  const imgs = section.images || [];
  if (!imgs.length) {
    list.innerHTML = '<p style="color:rgba(255,255,255,0.4);font-size:var(--t-sm);">No images in this section.</p>';
    return;
  }

  list.innerHTML = `<div class="img-list">${imgs.map(img => `
    <div class="img-list-item" data-img-id="${img.id}">
      <div class="img-info">
        <strong style="color:var(--text);font-size:var(--t-sm);">${escHtml(img.caption || 'Untitled')}</strong>
        <small>${img.type ? img.type.toUpperCase() : ''} ${img.url ? '— ' + escHtml(img.url.slice(0, 50)) + (img.url.length > 50 ? '…' : '') : ''}</small>
        ${img.description ? `<small style="display:block;margin-top:0.15rem;">${escHtml(img.description)}</small>` : ''}
      </div>
      <div class="section-actions">
        <button class="btn btn--sm btn--secondary" onclick="deleteImage('${section.id}','${img.id}')">Remove</button>
      </div>
    </div>`).join('')}</div>`;
}

function initAddSectionForm() {
  const form = document.getElementById('add-section-form');
  if (!form) return;
  form.addEventListener('submit', e => {
    e.preventDefault();
    const fd = new FormData(form);
    const data = getGalleryData();
    data.push({ id: genId(), title: fd.get('title'), description: fd.get('desc') || '', images: [] });
    saveGalleryData(data);
    form.reset();
    showAdminAlert('section-alert', 'success', 'Section added.');
    renderSectionList();
  });
}

function initAddImageForm() {
  const form = document.getElementById('add-image-form');
  const sel  = document.getElementById('img-section-select');
  if (!form) return;

  if (sel) sel.addEventListener('change', renderImageList);

  form.addEventListener('submit', e => {
    e.preventDefault();
    const fd      = new FormData(form);
    const sectionId = sel?.value;
    if (!sectionId) { showAdminAlert('img-alert', 'error', 'Select a section first.'); return; }

    const data    = getGalleryData();
    const section = data.find(s => s.id === sectionId);
    if (!section) return;

    if (!section.images) section.images = [];
    section.images.push({
      id:          genId(),
      url:         fd.get('url') || '',
      caption:     fd.get('caption') || '',
      description: fd.get('img-desc') || '',
      type:        fd.get('type') || '',
    });

    saveGalleryData(data);
    form.reset();
    showAdminAlert('img-alert', 'success', 'Image added.');
    renderImageList();
  });
}

function showAdminAlert(id, type, msg) {
  const el = document.getElementById(id);
  if (!el) return;
  el.className = `admin-alert admin-alert--${type} show`;
  el.textContent = msg;
  setTimeout(() => el.classList.remove('show'), 3500);
}

window.deleteSection = function(id) {
  if (!confirm('Delete this section and all its images?')) return;
  const data = getGalleryData().filter(s => s.id !== id);
  saveGalleryData(data);
  renderSectionList();
};

window.deleteImage = function(sectionId, imgId) {
  if (!confirm('Remove this image?')) return;
  const data = getGalleryData();
  const s = data.find(s => s.id === sectionId);
  if (s) s.images = (s.images || []).filter(i => i.id !== imgId);
  saveGalleryData(data);
  renderImageList();
};

/* ---- Utility ---- */
function escHtml(str) {
  return String(str ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}

/* ===================================================================
   INIT
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  mountChrome();
  setActiveNav();
  initMobileNav();
  initReveal();
  initCounters();
  initYear();
  injectSchema();
  initEmailJS();        // authenticate EmailJS session
  initContactTabs();
  initSpecifiedForm();
  initGeneralForm();
  renderPublicGallery();
  initGalleryAdmin();
});

/*
  =====================================================================
  EMAIL TEMPLATE HTML — paste into EmailJS template editor
  Use "HTML" content type. Available variables shown as {{var}}.
  =====================================================================

  SPECIFIED TEMPLATE (template_specified):
  ----------------------------------------
  Subject: {{subject}}

  <!DOCTYPE html>
  <html>
  <head><meta charset="UTF-8"></head>
  <body style="margin:0;padding:0;background:#0b0d11;font-family:Inter,Helvetica,Arial,sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="padding:40px 20px;">
      <tr><td>
        <table width="600" align="center" cellpadding="0" cellspacing="0"
               style="background:#13161e;border-radius:16px;overflow:hidden;border:1px solid rgba(201,170,111,0.2);max-width:600px;width:100%;">
          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1a1f28,#0c0f14);padding:32px;border-bottom:2px solid #c9aa6f;">
              <p style="margin:0 0 4px;color:#c9aa6f;font-size:11px;letter-spacing:3px;text-transform:uppercase;font-weight:700;">RetainTech</p>
              <h1 style="margin:0;color:#ffffff;font-size:22px;letter-spacing:-0.5px;">New Specified Quote Request</h1>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:32px;">
              <!-- Contact block -->
              <table width="100%" style="margin-bottom:24px;">
                <tr><td style="padding:4px 0;color:#8ba4bc;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:600;">Contact Details</td></tr>
                <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);">
                  <table width="100%">
                    <tr>
                      <td width="50%" style="color:rgba(240,237,232,0.5);font-size:13px;">Name</td>
                      <td width="50%" style="color:#f0ede8;font-size:14px;font-weight:600;">{{from_name}}</td>
                    </tr>
                  </table>
                </td></tr>
                <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);">
                  <table width="100%">
                    <tr>
                      <td width="50%" style="color:rgba(240,237,232,0.5);font-size:13px;">Email</td>
                      <td width="50%" style="color:#f0ede8;font-size:14px;font-weight:600;">{{from_email}}</td>
                    </tr>
                  </table>
                </td></tr>
                <tr><td style="padding:10px 0;">
                  <table width="100%">
                    <tr>
                      <td width="50%" style="color:rgba(240,237,232,0.5);font-size:13px;">Phone</td>
                      <td width="50%" style="color:#f0ede8;font-size:14px;font-weight:600;">{{phone}}</td>
                    </tr>
                  </table>
                </td></tr>
              </table>
              <!-- Project block -->
              <table width="100%" style="margin-bottom:24px;">
                <tr><td style="padding:4px 0;color:#8ba4bc;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:600;">Project Details</td></tr>
                <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);">
                  <table width="100%">
                    <tr>
                      <td width="50%" style="color:rgba(240,237,232,0.5);font-size:13px;">Wall Type</td>
                      <td width="50%" style="color:#f0ede8;font-size:14px;font-weight:600;">{{wall_type}}</td>
                    </tr>
                  </table>
                </td></tr>
                <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);">
                  <table width="100%">
                    <tr>
                      <td width="50%" style="color:rgba(240,237,232,0.5);font-size:13px;">Length (m)</td>
                      <td width="50%" style="color:#f0ede8;font-size:14px;font-weight:600;">{{wall_length}} m</td>
                    </tr>
                  </table>
                </td></tr>
                <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);">
                  <table width="100%">
                    <tr>
                      <td width="50%" style="color:rgba(240,237,232,0.5);font-size:13px;">Height (m)</td>
                      <td width="50%" style="color:#f0ede8;font-size:14px;font-weight:600;">{{wall_height}} m</td>
                    </tr>
                  </table>
                </td></tr>
                <tr><td style="padding:10px 0;border-bottom:1px solid rgba(255,255,255,0.07);">
                  <table width="100%">
                    <tr>
                      <td width="50%" style="color:rgba(240,237,232,0.5);font-size:13px;">Purpose</td>
                      <td width="50%" style="color:#f0ede8;font-size:14px;font-weight:600;">{{wall_purpose}}</td>
                    </tr>
                  </table>
                </td></tr>
                <tr><td style="padding:10px 0;">
                  <table width="100%">
                    <tr>
                      <td width="50%" style="color:rgba(240,237,232,0.5);font-size:13px;">Site Access</td>
                      <td width="50%" style="color:#f0ede8;font-size:14px;font-weight:600;">{{access}}</td>
                    </tr>
                  </table>
                </td></tr>
              </table>
              <!-- Notes block -->
              <table width="100%">
                <tr><td style="padding:4px 0;color:#8ba4bc;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:600;">Additional Notes</td></tr>
                <tr><td style="padding:14px;background:rgba(255,255,255,0.04);border-radius:10px;border:1px solid rgba(255,255,255,0.07);color:#f0ede8;font-size:14px;line-height:1.7;margin-top:8px;">{{notes}}</td></tr>
              </table>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:20px 32px;border-top:1px solid rgba(255,255,255,0.07);color:rgba(240,237,232,0.4);font-size:12px;text-align:center;">
              RetainTech &nbsp;|&nbsp; quotes@retaintech.com.au &nbsp;|&nbsp; 0401 023 389
            </td>
          </tr>
        </table>
      </td></tr>
    </table>
  </body>
  </html>

  GENERAL TEMPLATE (template_general):
  --------------------------------------
  Subject: {{subject}}
  (Same header/footer structure, body replaces project details with:)
  Name / Email / Phone / then Enquiry block)
  Replace project section with:
    <tr><td style="padding:4px 0;color:#8ba4bc;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:600;">Enquiry</td></tr>
    <tr><td style="padding:14px;background:rgba(255,255,255,0.04);border-radius:10px;border:1px solid rgba(255,255,255,0.07);color:#f0ede8;font-size:14px;line-height:1.7;">{{enquiry}}</td></tr>
  =====================================================================
*/
