/* ============================================================
   PROJECT.JS — Behance-style case study renderer
   ============================================================ */

const projectRoot = document.getElementById('project-root');
const params = new URLSearchParams(window.location.search);
const projectId = params.get('id');
let projectLang = localStorage.getItem('webfolio-lang') || 'id';

function tr(value) {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  return value[projectLang] || value.id || value.en || '';
}

function escapeHtml(value) {
  return String(value ?? '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function getProject() {
  if (typeof PORTFOLIO_DATA === 'undefined') return null;
  return PORTFOLIO_DATA.find(item => item.id === projectId && item.caseStudy);
}

function renderError() {
  const title = projectLang === 'en' ? 'Case study not found.' : 'Case study tidak ditemukan.';
  const copy = projectLang === 'en'
    ? 'The project may still be in draft or the link is invalid.'
    : 'Project mungkin masih draft atau link yang dibuka tidak valid.';

  projectRoot.innerHTML = `
    <div class="project-error container">
      <div>
        <h1>${title}</h1>
        <p>${copy}</p>
        <a class="case-action primary" href="./index.html#portfolio">← Portfolio</a>
      </div>
    </div>`;
}

function renderProject() {
  const project = getProject();
  if (!project) return renderError();

  const cs = project.caseStudy;
  const title = tr(project.title);
  const description = tr(project.description);
  const metaHtml = (cs.meta || []).map(item => `
    <div class="case-meta-item">
      <span class="case-meta-label">${escapeHtml(tr(item.label))}</span>
      <span class="case-meta-value">${escapeHtml(item.value)}</span>
    </div>`).join('');

  const gallery = cs.gallery || [];
  const galleryHtml = gallery.length
    ? gallery.map(item => `
        <figure class="case-gallery-item ${item.size === 'wide' ? 'wide' : ''}">
          <img src="${escapeHtml(item.src)}" alt="${escapeHtml(tr(item.alt))}" loading="lazy" />
          ${item.caption ? `<figcaption>${escapeHtml(tr(item.caption))}</figcaption>` : ''}
        </figure>`).join('')
    : `<div class="case-empty-gallery">${projectLang === 'en' ? 'Project visuals will appear here when the design assets are ready.' : 'Visual project akan muncul di sini setelah aset desain selesai.'}</div>`;

  const external = cs.externalLink
    ? `<a class="case-action" href="${escapeHtml(cs.externalLink)}" target="_blank" rel="noopener noreferrer">${projectLang === 'en' ? 'View external project ↗' : 'Lihat project eksternal ↗'}</a>`
    : '';

  document.title = `${title} — Diki Permana`;
  projectRoot.innerHTML = `
    <section class="case-hero">
      <div class="container">
        <div class="case-eyebrow">${escapeHtml(tr(cs.eyebrow))}</div>
        <h1 class="case-title">${escapeHtml(title)}</h1>
        <p class="case-subtitle">${escapeHtml(tr(cs.subtitle) || description)}</p>
      </div>
    </section>

    <section class="case-meta">
      <div class="container case-meta-grid">${metaHtml}</div>
    </section>

    <section class="container case-story">
      <div class="case-story-main">
        <h2>${escapeHtml(tr(cs.overview?.title) || 'Overview')}</h2>
        <p>${escapeHtml(tr(cs.overview?.body))}</p>
      </div>
      <div class="case-story-side">
        <article class="case-story-card">
          <h3>${escapeHtml(tr(cs.challenge?.title) || 'Challenge')}</h3>
          <p>${escapeHtml(tr(cs.challenge?.body))}</p>
        </article>
        <article class="case-story-card">
          <h3>${escapeHtml(tr(cs.approach?.title) || 'Approach')}</h3>
          <p>${escapeHtml(tr(cs.approach?.body))}</p>
        </article>
      </div>
    </section>

    <section class="case-gallery">
      <div class="container">
        <h2 class="case-gallery-heading">${projectLang === 'en' ? 'Selected Visuals' : 'Selected Visuals'}</h2>
        <div class="case-gallery-grid">${galleryHtml}</div>
      </div>
    </section>

    <section class="case-next">
      <div class="container">
        <div class="case-next-inner">
          <h2>${projectLang === 'en' ? 'Want to see more work?' : 'Lihat project lainnya.'}</h2>
          <div class="case-actions">
            <a class="case-action primary" href="./index.html#portfolio">${projectLang === 'en' ? 'Back to portfolio' : 'Kembali ke portfolio'} →</a>
            ${external}
          </div>
        </div>
      </div>
    </section>`;
}

function syncLanguageButtons() {
  document.documentElement.lang = projectLang;
  document.querySelectorAll('[data-project-lang]').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.projectLang === projectLang);
  });
}

document.addEventListener('click', (event) => {
  const button = event.target.closest('[data-project-lang]');
  if (!button) return;
  projectLang = button.dataset.projectLang;
  localStorage.setItem('webfolio-lang', projectLang);
  syncLanguageButtons();
  renderProject();
});

syncLanguageButtons();
renderProject();
