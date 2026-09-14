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

/* ------------------------------------------------------------
   OPTIONAL FILENAME-DRIVEN MEDIA SYSTEM

   caseStudy.assets = {
     folder: 'asset/case-studies/nova-desk',
     files: [
       '00-cover.webp',
       '01-brand.webp',
       '02-pair-01.webp',
       '02-pair-02.webp',
       '03-slider-01.webp',
       '03-slider-02.webp',
       '04-final.webp'
     ]
   }

   Rules:
   00-cover.*          -> hero cover
   NN-pair-XX.*        -> two-column pair block
   NN-slider-XX.*      -> one swipe/arrow slider block
   everything else    -> normal full-width image block
   ------------------------------------------------------------ */
function buildMediaFromAssets(assets) {
  if (!assets?.folder || !Array.isArray(assets.files) || !assets.files.length) {
    return { cover: null, blocks: [] };
  }

  const folder = assets.folder.replace(/\/$/, '');
  const files = [...assets.files].sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));
  const makeItem = (file) => ({
    src: `${folder}/${file}`,
    alt: file.replace(/\.[^.]+$/, '').replace(/[-_]+/g, ' ')
  });

  const coverFile = files.find(file => /^00-cover\./i.test(file));
  const cover = coverFile ? makeItem(coverFile) : null;
  const rest = files.filter(file => file !== coverFile);
  const blocks = [];

  for (let i = 0; i < rest.length;) {
    const file = rest[i];
    const pairMatch = file.match(/^(\d+)-pair-(\d+)\./i);
    const sliderMatch = file.match(/^(\d+)-slider-(\d+)\./i);

    if (pairMatch) {
      const group = pairMatch[1];
      const groupFiles = rest.filter(candidate => new RegExp(`^${group}-pair-\\d+\\.`, 'i').test(candidate));
      blocks.push({ type: 'pair', items: groupFiles.map(makeItem) });
      i += groupFiles.length;
      continue;
    }

    if (sliderMatch) {
      const group = sliderMatch[1];
      const groupFiles = rest.filter(candidate => new RegExp(`^${group}-slider-\\d+\\.`, 'i').test(candidate));
      blocks.push({
        type: 'slider',
        title: assets.sliderTitles?.[group] || '',
        slides: groupFiles.map(makeItem)
      });
      i += groupFiles.length;
      continue;
    }

    blocks.push({ type: 'image', ...makeItem(file) });
    i += 1;
  }

  return { cover, blocks };
}

function mediaImage(item, className = '') {
  return `
    <figure class="case-media-image ${className}">
      <img src="${escapeHtml(item.src)}" alt="${escapeHtml(tr(item.alt))}" loading="lazy" />
      ${item.caption ? `<figcaption>${escapeHtml(tr(item.caption))}</figcaption>` : ''}
    </figure>`;
}

function renderSlider(block, index) {
  const slides = block.slides || [];
  if (!slides.length) return '';

  const slideHtml = slides.map((slide, slideIndex) => `
    <figure class="case-slide" data-slide-index="${slideIndex}">
      <img src="${escapeHtml(slide.src)}" alt="${escapeHtml(tr(slide.alt) || `${tr(block.title) || 'Slide'} ${slideIndex + 1}`)}" loading="lazy" />
      ${slide.caption ? `<figcaption>${escapeHtml(tr(slide.caption))}</figcaption>` : ''}
    </figure>`).join('');

  return `
    <section class="case-block case-slider-block" data-slider="${index}">
      <div class="case-block-head">
        <div>
          ${block.kicker ? `<span class="case-block-kicker">${escapeHtml(tr(block.kicker))}</span>` : ''}
          ${block.title ? `<h2>${escapeHtml(tr(block.title))}</h2>` : ''}
        </div>
        <div class="case-slider-ui" aria-label="Slider controls">
          <span class="case-slider-count"><strong>01</strong> / ${String(slides.length).padStart(2, '0')}</span>
          <button type="button" class="case-slider-btn prev" aria-label="Previous slide">←</button>
          <button type="button" class="case-slider-btn next" aria-label="Next slide">→</button>
        </div>
      </div>
      <div class="case-slider-viewport" tabindex="0">
        <div class="case-slider-track">${slideHtml}</div>
      </div>
    </section>`;
}

function renderBlock(block, index) {
  if (!block) return '';

  if (block.type === 'slider') return renderSlider(block, index);

  if (block.type === 'pair') {
    const items = (block.items || []).slice(0, 2);
    if (!items.length) return '';
    return `
      <section class="case-block">
        ${block.title ? `<div class="case-block-head simple"><h2>${escapeHtml(tr(block.title))}</h2></div>` : ''}
        <div class="case-media-pair">
          ${items.map(item => mediaImage(item)).join('')}
        </div>
      </section>`;
  }

  if (block.type === 'text') {
    return `
      <section class="case-block case-text-block">
        ${block.kicker ? `<span class="case-block-kicker">${escapeHtml(tr(block.kicker))}</span>` : ''}
        ${block.title ? `<h2>${escapeHtml(tr(block.title))}</h2>` : ''}
        ${block.body ? `<p>${escapeHtml(tr(block.body))}</p>` : ''}
      </section>`;
  }

  if (block.type === 'image' || block.src) {
    return `<section class="case-block">${mediaImage(block, block.size === 'contained' ? 'contained' : '')}</section>`;
  }

  return '';
}

function initSliders() {
  document.querySelectorAll('[data-slider]').forEach(slider => {
    const viewport = slider.querySelector('.case-slider-viewport');
    const slides = [...slider.querySelectorAll('.case-slide')];
    const prev = slider.querySelector('.case-slider-btn.prev');
    const next = slider.querySelector('.case-slider-btn.next');
    const current = slider.querySelector('.case-slider-count strong');
    if (!viewport || slides.length < 1) return;

    let active = 0;

    const goTo = (index) => {
      active = Math.max(0, Math.min(index, slides.length - 1));
      viewport.scrollTo({ left: active * viewport.clientWidth, behavior: 'smooth' });
      if (current) current.textContent = String(active + 1).padStart(2, '0');
      if (prev) prev.disabled = active === 0;
      if (next) next.disabled = active === slides.length - 1;
    };

    prev?.addEventListener('click', () => goTo(active - 1));
    next?.addEventListener('click', () => goTo(active + 1));

    viewport.addEventListener('scroll', () => {
      const width = viewport.clientWidth || 1;
      const index = Math.round(viewport.scrollLeft / width);
      if (index !== active) {
        active = index;
        if (current) current.textContent = String(active + 1).padStart(2, '0');
        if (prev) prev.disabled = active === 0;
        if (next) next.disabled = active === slides.length - 1;
      }
    }, { passive: true });

    viewport.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowRight') goTo(active + 1);
      if (event.key === 'ArrowLeft') goTo(active - 1);
    });

    goTo(0);
  });
}

function renderProject() {
  const project = getProject();
  if (!project) return renderError();

  const cs = project.caseStudy;
  const title = tr(project.title);
  const description = tr(project.description);
  const gallery = cs.gallery || [];
  const generatedMedia = buildMediaFromAssets(cs.assets);

  // Priority: explicit cover -> filename-driven cover -> first legacy gallery item.
  const cover = cs.cover || generatedMedia.cover || gallery[0] || null;

  // Priority: explicit blocks -> filename-driven blocks -> legacy gallery fallback.
  const blocks = (cs.blocks && cs.blocks.length)
    ? cs.blocks
    : generatedMedia.blocks.length
      ? generatedMedia.blocks
      : gallery.slice(cover && !cs.cover ? 1 : 0).map(item => ({ type: 'image', ...item }));

  const metaHtml = (cs.meta || []).map(item => `
    <div class="case-meta-item">
      <span class="case-meta-label">${escapeHtml(tr(item.label))}</span>
      <span class="case-meta-value">${escapeHtml(item.value)}</span>
    </div>`).join('');

  const blocksHtml = blocks.length
    ? blocks.map((block, index) => renderBlock(block, index)).join('')
    : '';

  const external = cs.externalLink
    ? `<a class="case-action secondary" href="${escapeHtml(cs.externalLink)}" target="_blank" rel="noopener noreferrer">${projectLang === 'en' ? 'View on Behance ↗' : 'Lihat di Behance ↗'}</a>`
    : '';

  document.title = `${title} — Diki Permana`;
  projectRoot.innerHTML = `
    <section class="case-hero">
      <div class="container case-hero-inner">
        <div class="case-eyebrow">${escapeHtml(tr(cs.eyebrow))}</div>
        <h1 class="case-title">${escapeHtml(title)}</h1>
        <p class="case-subtitle">${escapeHtml(tr(cs.subtitle) || description)}</p>
        <div class="case-meta-grid">${metaHtml}</div>
      </div>
    </section>

    ${cover ? `
      <section class="case-cover container">
        ${mediaImage(cover, 'cover')}
      </section>` : ''}

    <section class="container case-story">
      <article class="case-story-column case-story-lead">
        <span class="case-story-number">01</span>
        <h2>${escapeHtml(tr(cs.overview?.title) || 'Overview')}</h2>
        <p>${escapeHtml(tr(cs.overview?.body))}</p>
      </article>
      <article class="case-story-column">
        <span class="case-story-number">02</span>
        <h3>${escapeHtml(tr(cs.challenge?.title) || 'Challenge')}</h3>
        <p>${escapeHtml(tr(cs.challenge?.body))}</p>
      </article>
      <article class="case-story-column">
        <span class="case-story-number">03</span>
        <h3>${escapeHtml(tr(cs.approach?.title) || 'Approach')}</h3>
        <p>${escapeHtml(tr(cs.approach?.body))}</p>
      </article>
    </section>

    ${blocksHtml ? `
      <section class="case-content container">
        ${blocksHtml}
      </section>` : ''}

    <section class="case-next">
      <div class="container">
        <div class="case-next-inner">
          <div>
            <span class="case-next-kicker">${projectLang === 'en' ? 'End of case study' : 'Akhir case study'}</span>
            <h2>${projectLang === 'en' ? 'Explore more work.' : 'Lihat project lainnya.'}</h2>
          </div>
          <div class="case-actions">
            <a class="case-action primary" href="./index.html#portfolio">${projectLang === 'en' ? 'Back to portfolio' : 'Kembali ke portfolio'} →</a>
            ${external}
          </div>
        </div>
      </div>
    </section>`;

  initSliders();
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
  projectLang = button.dataset.lang || button.dataset.projectLang;
  localStorage.setItem('webfolio-lang', projectLang);
  syncLanguageButtons();
  renderProject();
});

syncLanguageButtons();
renderProject();
