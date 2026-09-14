/* ============================================================
   PROJECT.JS — Behance-style case study renderer
   ============================================================ */

const projectRoot = document.getElementById('project-root');
const params = new URLSearchParams(window.location.search);
const projectId = params.get('id');
let projectLang = localStorage.getItem('webfolio-lang') || 'id';

let projectRegistryPromise = null;

function loadProjectRegistry() {
  if (window.PORTFOLIO_READY) return window.PORTFOLIO_READY;
  if (projectRegistryPromise) return projectRegistryPromise;

  projectRegistryPromise = new Promise((resolve) => {
    const existing = document.querySelector('script[data-project-registry]');
    if (existing) {
      const wait = () => Promise.resolve(window.PORTFOLIO_READY || []).then(resolve).catch(() => resolve([]));
      if (existing.dataset.loaded === 'true') wait();
      else existing.addEventListener('load', wait, { once: true });
      return;
    }

    const script = document.createElement('script');
    script.src = 'projects/registry.js';
    script.dataset.projectRegistry = 'true';
    script.onload = () => {
      script.dataset.loaded = 'true';
      Promise.resolve(window.PORTFOLIO_READY || []).then(resolve).catch(() => resolve([]));
    };
    script.onerror = () => resolve([]);
    document.head.appendChild(script);
  });

  return projectRegistryPromise;
}

function getPortfolioItems() {
  if (Array.isArray(window.MODULAR_PORTFOLIO_DATA) && window.MODULAR_PORTFOLIO_DATA.length) {
    return window.MODULAR_PORTFOLIO_DATA;
  }
  return typeof PORTFOLIO_DATA !== 'undefined' ? PORTFOLIO_DATA : [];
}

function getPortfolioCategories() {
  if (Array.isArray(window.MODULAR_PORTFOLIO_CATEGORIES) && window.MODULAR_PORTFOLIO_CATEGORIES.length) {
    return window.MODULAR_PORTFOLIO_CATEGORIES;
  }
  return typeof PORTFOLIO_CATEGORIES !== 'undefined' ? PORTFOLIO_CATEGORIES : [];
}

function tr(value) {
  if (value == null) return '';
  if (typeof value === 'string' || typeof value === 'number') return String(value);
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

function getProjectAssets(project) {
  return project?.assets || project?.caseStudy?.assets || null;
}

function getProject() {
  return getPortfolioItems().find(item =>
    item.id === projectId &&
    item.published !== false &&
    (item.caseStudy || getProjectAssets(item))
  ) || null;
}

function getCategoryName(project) {
  const categories = getPortfolioCategories();
  const category = categories.find(item => item.id === project?.category);
  return category ? tr(category.name) : (project?.category || 'Case Study');
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
   FILENAME-DRIVEN MEDIA SYSTEM

   assets: {
     folder: 'projects/nova-desk/assets',
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
   00-cover.*          -> hero cover + homepage thumbnail
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
      blocks.push({
        type: 'pair',
        title: assets.blockTitles?.[group] || '',
        items: groupFiles.map(makeItem)
      });
      i += groupFiles.length;
      continue;
    }

    if (sliderMatch) {
      const group = sliderMatch[1];
      const groupFiles = rest.filter(candidate => new RegExp(`^${group}-slider-\\d+\\.`, 'i').test(candidate));
      blocks.push({
        type: 'slider',
        title: assets.sliderTitles?.[group] || assets.blockTitles?.[group] || '',
        slides: groupFiles.map(makeItem)
      });
      i += groupFiles.length;
      continue;
    }

    const group = file.match(/^(\d+)-/)?.[1];
    blocks.push({
      type: 'image',
      title: group ? (assets.blockTitles?.[group] || '') : '',
      ...makeItem(file)
    });
    i += 1;
  }

  return { cover, blocks };
}

function normalizeMediaItem(value) {
  if (!value) return null;
  if (typeof value === 'string') return { src: value, alt: '' };
  return value;
}

function mediaImage(item, className = '') {
  const media = normalizeMediaItem(item);
  if (!media?.src) return '';

  return `
    <figure class="case-media-image ${className}">
      <img src="${escapeHtml(media.src)}" alt="${escapeHtml(tr(media.alt))}" loading="lazy" />
      ${media.caption ? `<figcaption>${escapeHtml(tr(media.caption))}</figcaption>` : ''}
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
    return `
      <section class="case-block">
        ${block.title ? `<div class="case-block-head simple"><h2>${escapeHtml(tr(block.title))}</h2></div>` : ''}
        ${mediaImage(block, block.size === 'contained' ? 'contained' : '')}
      </section>`;
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

function renderStory(project, cs) {
  const stories = [];
  const overviewBody = tr(cs.overview?.body || project.overview || project.description);
  const challengeBody = tr(cs.challenge?.body || project.challenge);
  const approachBody = tr(cs.approach?.body || project.approach);

  if (overviewBody) {
    stories.push({
      title: tr(cs.overview?.title) || 'Overview',
      body: overviewBody,
      lead: true
    });
  }

  if (challengeBody) {
    stories.push({
      title: tr(cs.challenge?.title) || 'Challenge',
      body: challengeBody
    });
  }

  if (approachBody) {
    stories.push({
      title: tr(cs.approach?.title) || 'Approach',
      body: approachBody
    });
  }

  if (!stories.length) return '';

  return `
    <section class="container case-story case-story-count-${stories.length}">
      ${stories.map((story, index) => `
        <article class="case-story-column ${story.lead ? 'case-story-lead' : ''}">
          <span class="case-story-number">${String(index + 1).padStart(2, '0')}</span>
          <${story.lead ? 'h2' : 'h3'}>${escapeHtml(story.title)}</${story.lead ? 'h2' : 'h3'}>
          <p>${escapeHtml(story.body)}</p>
        </article>`).join('')}
    </section>`;
}

function renderProject() {
  const project = getProject();
  if (!project) return renderError();

  const cs = project.caseStudy || {};
  const assets = getProjectAssets(project);
  const title = tr(project.title) || project.id;
  const description = tr(project.description);
  const gallery = cs.gallery || project.gallery || [];
  const generatedMedia = buildMediaFromAssets(assets);

  const explicitCover = normalizeMediaItem(cs.cover || project.cover);
  const projectImageCover = project.image ? { src: project.image, alt: title } : null;
  const cover = explicitCover || generatedMedia.cover || gallery[0] || projectImageCover || null;

  const explicitBlocks = cs.blocks || project.blocks || [];
  const blocks = explicitBlocks.length
    ? explicitBlocks
    : generatedMedia.blocks.length
      ? generatedMedia.blocks
      : gallery.slice(cover && !explicitCover ? 1 : 0).map(item => ({ type: 'image', ...item }));

  const meta = cs.meta || project.meta || [
    project.label ? { label: { id: 'Fokus', en: 'Focus' }, value: project.label } : null,
    project.year ? { label: { id: 'Tahun', en: 'Year' }, value: project.year } : null,
    project.role ? { label: { id: 'Role', en: 'Role' }, value: project.role } : null
  ].filter(Boolean);

  const metaHtml = meta.map(item => `
    <div class="case-meta-item">
      <span class="case-meta-label">${escapeHtml(tr(item.label))}</span>
      <span class="case-meta-value">${escapeHtml(tr(item.value))}</span>
    </div>`).join('');

  const blocksHtml = blocks.length
    ? blocks.map((block, index) => renderBlock(block, index)).join('')
    : '';

  const externalLink = cs.externalLink || project.externalLink || (project.link && /^https?:\/\//i.test(project.link) ? project.link : '');
  const external = externalLink
    ? `<a class="case-action secondary" href="${escapeHtml(externalLink)}" target="_blank" rel="noopener noreferrer">${projectLang === 'en' ? 'View external project ↗' : 'Lihat project eksternal ↗'}</a>`
    : '';

  const eyebrow = tr(cs.eyebrow || project.eyebrow) || `${getCategoryName(project)} Case Study`;
  const subtitle = tr(cs.subtitle || project.subtitle) || description;
  const storyHtml = renderStory(project, cs);

  document.title = `${title} — Diki Permana`;
  projectRoot.innerHTML = `
    <section class="case-hero">
      <div class="container case-hero-inner">
        <div class="case-eyebrow">${escapeHtml(eyebrow)}</div>
        <h1 class="case-title">${escapeHtml(title)}</h1>
        ${subtitle ? `<p class="case-subtitle">${escapeHtml(subtitle)}</p>` : ''}
        ${metaHtml ? `<div class="case-meta-grid">${metaHtml}</div>` : ''}
      </div>
    </section>

    ${cover ? `
      <section class="case-cover container">
        ${mediaImage(cover, 'cover')}
      </section>` : ''}

    ${storyHtml}

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

async function bootProject() {
  syncLanguageButtons();
  await loadProjectRegistry();
  renderProject();
}

bootProject();