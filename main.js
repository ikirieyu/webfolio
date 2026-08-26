/* ============================================================
   MAIN.JS — Diki Permana Webfolio
   ============================================================ */

/* ---- SNAPWIDGET: Deteksi apakah Widget ID sudah diisi ---- */
(function () {
  const iframe   = document.getElementById('snapwidget-iframe');
  const fallback = document.getElementById('ig-fallback');
  if (!iframe || !fallback) return;

  if (iframe.src.includes('WIDGET_ID_KAMU')) {
    // Belum diisi → sembunyikan iframe, tampilkan fallback
    iframe.style.display  = 'none';
    fallback.style.display = 'flex';
  }
})();

/* ---- NAV: Scroll shadow + mobile menu ---- */
const nav         = document.getElementById('main-nav');
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobile-menu');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen);
});

// Close mobile menu on link click
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* ---- PORTFOLIO DYNAMIC SYSTEM (TABS + CARDS) ---- */
let activeCategory = 'ecommerce';

function renderPortfolioTabs() {
  const tabsContainer = document.getElementById('portfolio-tabs-container');
  if (!tabsContainer || typeof PORTFOLIO_CATEGORIES === 'undefined') return;

  const currentLang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'id';

  tabsContainer.innerHTML = PORTFOLIO_CATEGORIES.map(cat => {
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
      const target = btn.dataset.tab;
      activeCategory = target;

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
  if (!container || typeof PORTFOLIO_DATA === 'undefined') return;

  const currentLang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'id';
  const filtered = PORTFOLIO_DATA.filter(item => item.category === category);

  container.innerHTML = filtered.map((item, index) => {
    const titleText = item.title[currentLang] || item.title.id;
    const descText  = item.description[currentLang] || item.description.id;
    const btnText   = category === 'github'
      ? (currentLang === 'en' ? 'Lihat Repo →' : 'Lihat Repo →')
      : (currentLang === 'en' ? 'Lihat Project →' : 'Lihat Project →');
    const isGhClass = category === 'github' ? 'card-link-gh' : '';
    const delay = (index % 3) * 80;

    // Check if theme is custom inline color/gradient or preset CSS class
    const isCustomBg = item.theme && (item.theme.includes('#') || item.theme.includes('gradient') || item.theme.includes('rgb'));
    const styleAttr  = isCustomBg ? `style="background: ${item.theme};"` : '';
    const themeClass = (!item.image && !isCustomBg) ? (item.theme || 'ec-1') : '';

    const thumbContent = item.image 
      ? `<img src="${item.image}" alt="${titleText}" class="card-thumb-img" />`
      : `<div class="card-thumb-inner">
           <span class="thumb-label">${item.label || ''}</span>
           <span class="thumb-year">${item.year || ''}</span>
         </div>`;

    const tagsHtml = (item.tags || []).map(tag => `<span>${tag}</span>`).join('');

    return `
      <div class="portfolio-card aos-animate" data-aos="fade-up" data-aos-delay="${delay}">
        <div class="card-thumb ${item.image ? 'has-img' : themeClass}" ${styleAttr}>
          ${thumbContent}
          <div class="card-overlay">
            <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="card-link ${isGhClass}">${btnText}</a>
          </div>
        </div>
        <div class="card-info">
          <h3>${titleText}</h3>
          <p>${descText}</p>
          <div class="card-tags">
            ${tagsHtml}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

document.addEventListener('DOMContentLoaded', () => {
  renderPortfolioTabs();
  renderPortfolioCards(activeCategory);
});

window.addEventListener('languageChanged', () => {
  renderPortfolioTabs();
  renderPortfolioCards(activeCategory);
});

/* ---- SCROLL ANIMATIONS (custom AOS-lite) ---- */
function initScrollAnimations() {
  const elements = document.querySelectorAll('[data-aos]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Respect transition-delay from CSS
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

// Animate elements already in view on load
window.addEventListener('load', () => {
  initScrollAnimations();

  // Also trigger first portfolio panel cards immediately
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
  const text = currentLang === 'en' ? 'Graphic Designer' : 'Graphic Designer';
  
  if (typingInterval) clearInterval(typingInterval);
  roleEl.textContent = '';

  let i = 0;
  typingInterval = setInterval(() => {
    roleEl.textContent += text[i];
    i++;
    if (i >= text.length) clearInterval(typingInterval);
  }, 60);
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
