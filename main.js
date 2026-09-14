/* ============================================================
   MAIN.JS — Diki Permana Webfolio
   ============================================================ */

/* ---- PORTFOLIO GALLERY STYLES ---- */
(function loadPortfolioGalleryStyles() {
  if (document.querySelector('link[data-portfolio-gallery]')) return;
  const link = document.createElement('link');
  link.rel = 'stylesheet';
  link.href = 'portfolio-gallery.css';
  link.dataset.portfolioGallery = 'true';
  document.head.appendChild(link);
})();

/* ---- MODULAR PROJECT REGISTRY ---- */
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

/* ---- SNAPWIDGET: Deteksi apakah Widget ID sudah diisi ---- */
(function () {
  const iframe   = document.getElementById('snapwidget-iframe');
  const fallback = document.getElementById('ig-fallback');
  if (!iframe || !fallback) return;

  if (iframe.src.includes('WIDGET_ID_KAMU')) {
    iframe.style.display  = 'none';
    fallback.style.display = 'flex';
  }
})();

/* ---- NAV: Scroll shadow + mobile menu ---- */
const nav         = document.getElementById('main-nav');
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobile-menu');

window.addEventListener('scroll', () => {
  if (!nav) return;
  if (window.scrollY > 20) nav.classList.add('scrolled');
  else nav.classList.remove('scrolled');
}, { passive: true });

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('open', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('open');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ---- PORTFOLIO DYNAMIC SYSTEM (TABS + CASE STUDY GALLERY) ---- */
let activeCategory = 'ecommerce';

function getProjectAssets(item) {
  return item?.assets || item?.caseStudy?.assets || null;
}

function getProjectCover(item) {
  if (item?.image) return item.image;

  const explicitCover = item?.cover || item?.caseStudy?.cover;
  if (typeof explicitCover === 'string') return explicitCover;
  if (explicitCover?.src) return explicitCover.src;

  const assets = getProjectAssets(item);
  if (assets?.folder && Array.isArray(assets.files)) {
    const coverFile = assets.files.find(file => /^00-cover\./i.test(file));
    if (coverFile) return `${assets.folder.replace(/\/$/, '')}/${coverFile}`;
  }

  const firstGallery = item?.caseStudy?.gallery?.[0];
  return firstGallery?.src || '';
}

function isInternalProject(item) {
  return Boolean(item?.caseStudy || getProjectAssets(item));
}

function updatePortfolioIntro() {
  const section = document.getElementById('portfolio');
  if (!section) return;

  const currentLang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'id';
  const title = section.querySelector('.section-title');
  const header = section.querySelector('.section-header');
  if (!header) return;

  if (title) {
    title.textContent = currentLang === 'en' ? 'Selected Case Studies' : 'Case Study Pilihan';
  }

  let intro = section.querySelector('.portfolio-intro');
  if (!intro) {
    intro = document.createElement('p');
    intro.className = 'portfolio-intro';
    header.insertAdjacentElement('afterend', intro);
  }

  intro.innerHTML = currentLang === 'en'
    ? 'A visual-first selection of <strong>e-commerce, marketplace, campaign, branding, and digital work</strong>. Open a project to see the full process in a long-form case study.'
    : 'Pilihan project yang fokus ke <strong>e-commerce, marketplace, campaign, branding, dan digital</strong>. Klik project untuk melihat proses lengkapnya dalam format case study panjang.';
}

function renderPortfolioTabs() {
  const tabsContainer = document.getElementById('portfolio-tabs-container');
  const categories = getPortfolioCategories();
  if (!tabsContainer || !categories.length) return;

  const currentLang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'id';

  tabsContainer.innerHTML = categories.map(cat => {
    const isActive = cat.id === activeCategory;
    const catName  = cat.name[currentLang] || cat.name.id;
    const iconHtml = cat.icon ? `${cat.icon} ` : '';
    const isGh     = cat.id === 'github' ? 'tab-btn-github' : '';

    return `
      <button
        class="tab-btn ${isActive ? 'active' : ''} ${isGh}"
        role="tab"
        aria-selected="${isActive ? 'true' : 'false'}"
        data-tab="${cat.id}"
        id="tab-${cat.id}">
        ${iconHtml}<span>${catName}</span>
      </button>
    `;
  }).join('');

  tabsContainer.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      activeCategory = btn.dataset.tab;

      tabsContainer.querySelectorAll('.tab-btn').forEach(b => {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });

      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');
      renderPortfolioCards(activeCategory);
    });
  });
}

function renderPortfolioCards(category = activeCategory) {
  activeCategory = category;
  const container = document.getElementById('portfolio-cards-grid');
  const portfolioItems = getPortfolioItems();
  if (!container || !portfolioItems.length) return;

  const currentLang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'id';

  const filtered = portfolioItems
    .filter(item => {
      if (item.category !== category || item.published === false) return false;
      if (category === 'ecommerce' && !getProjectCover(item) && !isInternalProject(item)) return false;
      return true;
    })
    .map((item, sourceIndex) => ({ item, sourceIndex }))
    .sort((a, b) => {
      const aFeatured = a.item.featured === true ? 0 : 1;
      const bFeatured = b.item.featured === true ? 0 : 1;
      if (aFeatured !== bFeatured) return aFeatured - bFeatured;

      const aOrder = Number.isFinite(a.item.order) ? a.item.order : Number.MAX_SAFE_INTEGER;
      const bOrder = Number.isFinite(b.item.order) ? b.item.order : Number.MAX_SAFE_INTEGER;
      if (aOrder !== bOrder) return aOrder - bOrder;

      return a.sourceIndex - b.sourceIndex;
    })
    .map(entry => entry.item);

  if (!filtered.length) {
    container.innerHTML = `
      <div class="portfolio-empty">
        <strong>${currentLang === 'en' ? 'Case studies are being prepared.' : 'Case study sedang disiapkan.'}</strong>
        <span>${currentLang === 'en' ? 'Only finished projects with real visuals will be published here.' : 'Hanya project yang sudah punya visual nyata dan siap presentasi yang akan ditampilkan di sini.'}</span>
      </div>
    `;
    return;
  }

  container.innerHTML = filtered.map((item, index) => {
    const titleText = item.title?.[currentLang] || item.title?.id || item.title || item.id;
    const descText  = item.description?.[currentLang] || item.description?.id || item.description || '';
    const hasCaseStudy = isInternalProject(item);
    const targetLink = hasCaseStudy
      ? `project.html?id=${encodeURIComponent(item.id)}`
      : item.link;
    const externalAttrs = hasCaseStudy ? '' : 'target="_blank" rel="noopener noreferrer"';
    const delay = (index % 3) * 80;
    const featuredClass = item.featured === false ? '' : (item.featured === true || index === 0 ? 'is-featured' : '');
    const coverImage = getProjectCover(item);

    const isCustomBg = item.theme && (item.theme.includes('#') || item.theme.includes('gradient') || item.theme.includes('rgb'));
    const styleAttr  = isCustomBg ? `style="background: ${item.theme};"` : '';
    const themeClass = (!coverImage && !isCustomBg) ? (item.theme || 'ec-1') : '';

    const thumbContent = coverImage
      ? `<img src="${coverImage}" alt="${titleText}" class="card-thumb-img" loading="lazy" />`
      : `<div class="card-thumb-inner">
           <span class="thumb-label">${item.label || ''}</span>
           <span class="thumb-year">${item.year || ''}</span>
         </div>`;

    const tagsHtml = (item.tags || []).map(tag => `<span>${tag}</span>`).join('');
    const badgeText = hasCaseStudy
      ? (currentLang === 'en' ? 'Case Study' : 'Case Study')
      : category === 'github'
        ? 'GitHub'
        : (item.label || 'Project');

    return `
      <article class="portfolio-card ${featuredClass} aos-animate" data-aos="fade-up" data-aos-delay="${delay}">
        <a href="${targetLink || '#'}" ${externalAttrs} class="portfolio-card-link" aria-label="${titleText}">
          <div class="card-thumb ${coverImage ? 'has-img' : themeClass}" ${styleAttr}>
            ${thumbContent}
            <span class="case-badge">${badgeText}</span>
            <span class="case-open" aria-hidden="true">↗</span>
          </div>
          <div class="card-info">
            <div class="card-meta-row">
              <span>${item.label || badgeText}</span>
              <span>${item.year || ''}</span>
            </div>
            <h3>${titleText}</h3>
            <p>${descText}</p>
            <div class="card-tags">${tagsHtml}</div>
          </div>
        </a>
      </article>
    `;
  }).join('');
}

async function initPortfolio() {
  await loadProjectRegistry();
  updatePortfolioIntro();
  renderPortfolioTabs();
  renderPortfolioCards(activeCategory);
}

document.addEventListener('DOMContentLoaded', initPortfolio);

window.addEventListener('languageChanged', () => {
  updatePortfolioIntro();
  renderPortfolioTabs();
  renderPortfolioCards(activeCategory);
});

/* ---- SCROLL ANIMATIONS (custom AOS-lite) ---- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-aos]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -48px 0px'
  });

  elements.forEach(el => observer.observe(el));
}

window.addEventListener('load', () => {
  initScrollAnimations();
  document.querySelectorAll('.portfolio-panel.active [data-aos]').forEach(el => {
    el.classList.add('aos-animate');
  });
});

/* ---- SMOOTH active nav link highlight ---- */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle(
          'nav-active',
          link.getAttribute('href') === `#${entry.target.id}`
        );
      });
    }
  });
}, { rootMargin: '-40% 0px -55% 0px' });

sections.forEach(s => sectionObserver.observe(s));

/* ---- HERO typing effect on role ---- */
let typingInterval = null;
function heroTypeEffect() {
  const roleEl = document.querySelector('.hero-role');
  if (!roleEl) return;

  const currentLang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'id';
  const text = currentLang === 'en'
    ? 'E-commerce & Marketplace Specialist'
    : 'E-commerce & Marketplace Specialist';

  if (typingInterval) clearInterval(typingInterval);
  roleEl.textContent = '';

  let i = 0;
  typingInterval = setInterval(() => {
    roleEl.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(typingInterval);
  }, 45);
}

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(heroTypeEffect, 400);
});

/* ---- LANGUAGE SWITCHER LISTENERS ---- */
document.addEventListener('click', (e) => {
  const btn = e.target.closest('.lang-btn');
  if (btn && btn.dataset.lang && typeof setLanguage === 'function') {
    setLanguage(btn.dataset.lang);
  }
});

window.addEventListener('languageChanged', () => {
  heroTypeEffect();
});

/* ---- MARQUEE: pause on hover ---- */
const marqueeTrack = document.querySelector('.marquee-track');
if (marqueeTrack) {
  marqueeTrack.addEventListener('mouseenter', () => {
    marqueeTrack.style.animationPlayState = 'paused';
  });
  marqueeTrack.addEventListener('mouseleave', () => {
    marqueeTrack.style.animationPlayState = 'running';
  });
}

/* ---- ADD nav-active style inline ---- */
const style = document.createElement('style');
style.textContent = `.nav-active { color: var(--green) !important; background: var(--green-muted) !important; }`;
document.head.appendChild(style);