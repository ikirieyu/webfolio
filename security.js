/**
 * Lightweight client helpers for the public GitHub Pages portfolio.
 * Keeps the floating chatbot and quick navigation reliable.
 */
(function () {
  'use strict';

  document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
  }, false);

  document.addEventListener('dragstart', function (event) {
    if (event.target && event.target.closest && event.target.closest('img')) {
      event.preventDefault();
    }
  }, false);

  const QUICK_NAV_ICONS = {
    hero: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10.8 12 3l9 7.8"/><path d="M5.5 9.8V21h13V9.8"/><path d="M9.5 21v-6h5v6"/></svg>',
    about: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="3.2"/><path d="M5.7 20c.7-4 3-6 6.3-6s5.6 2 6.3 6"/></svg>',
    portfolio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1.2"/><rect x="14" y="4" width="6" height="6" rx="1.2"/><rect x="4" y="14" width="6" height="6" rx="1.2"/><rect x="14" y="14" width="6" height="6" rx="1.2"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="4" width="17" height="16" rx="2.4"/><circle cx="9" cy="9" r="1.7"/><path d="m5.5 17 4.1-4 3.1 3 2.2-2.1 3.6 3.1"/></svg>',
    experience: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8.5 7V5.2A2.2 2.2 0 0 1 10.7 3h2.6a2.2 2.2 0 0 1 2.2 2.2V7"/><path d="M3 12h18"/><path d="M10 12v2h4v-2"/></svg>',
    skills: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 8-4 4 4 4"/><path d="m16 8 4 4-4 4"/><path d="m14 5-4 14"/></svg>',
    contact: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>'
  };

  const TOGGLE_ICON = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2.2"/><path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3"/></svg>';

  function loadFreshFloatingRuntime() {
    if (document.getElementById('chat-fab') && document.getElementById('quick-nav')) return;
    if (document.querySelector('script[data-diki-floating-runtime]')) return;

    if (window.__DIKI_CHATBOT_RUNTIME__ && !document.getElementById('chat-fab')) {
      try { delete window.__DIKI_CHATBOT_RUNTIME__; } catch (_) { window.__DIKI_CHATBOT_RUNTIME__ = false; }
    }

    const script = document.createElement('script');
    script.src = 'chatbot.js?v=20260914-1648';
    script.dataset.dikiFloatingRuntime = 'true';
    script.async = false;
    document.body.appendChild(script);
  }

  function injectQuickNavStyle() {
    if (document.getElementById('quick-nav-polish-style')) return;

    const style = document.createElement('style');
    style.id = 'quick-nav-polish-style';
    style.textContent = `
      body #quick-nav {
        right: 24px !important;
        bottom: 96px !important;
        z-index: 2147482990 !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: flex-end !important;
        gap: 8px !important;
      }

      body #quick-nav .quick-nav-menu {
        position: relative !important;
        isolation: isolate !important;
        display: flex !important;
        flex-direction: column !important;
        gap: 4px !important;
        padding: 5px !important;
        border: 1px solid rgba(27,77,62,.58) !important;
        border-radius: 999px !important;
        background-color: rgba(239,241,236,.34) !important;
        background-image: none !important;
        -webkit-backdrop-filter: blur(15px) saturate(.9) !important;
        backdrop-filter: blur(15px) saturate(.9) !important;
        box-shadow: 0 10px 28px rgba(23,36,30,.09), inset 0 0 0 1px rgba(255,255,255,.18) !important;
        overflow: visible !important;
      }

      body #quick-nav .quick-nav-menu::before {
        content: '' !important;
        position: absolute !important;
        inset: 0 !important;
        z-index: -1 !important;
        border-radius: inherit !important;
        pointer-events: none !important;
        opacity: .14 !important;
        background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='96' height='96' viewBox='0 0 96 96'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.78' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.58'/%3E%3C/svg%3E") !important;
        mix-blend-mode: multiply !important;
      }

      body #quick-nav .quick-nav-link {
        position: relative !important;
        z-index: 1 !important;
        width: 32px !important;
        height: 32px !important;
        min-width: 32px !important;
        min-height: 32px !important;
        border-radius: 50% !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        color: #1b4d3e !important;
        background: transparent !important;
        text-decoration: none !important;
        transition: background .18s ease, color .18s ease, transform .18s ease, box-shadow .18s ease !important;
      }

      body #quick-nav .quick-nav-link svg {
        width: 15px !important;
        height: 15px !important;
        display: block !important;
        pointer-events: none !important;
      }

      body #quick-nav .quick-nav-link:hover {
        background: rgba(27,77,62,.10) !important;
        color: #1b4d3e !important;
        transform: translateY(-1px) !important;
      }

      body #quick-nav .quick-nav-link.active {
        background: #1b4d3e !important;
        color: #fff !important;
        box-shadow: 0 0 0 2px rgba(197,232,74,.48), 0 5px 14px rgba(27,77,62,.18) !important;
      }

      body #quick-nav .quick-nav-link > span {
        right: 42px !important;
        padding: 5px 8px !important;
        border-radius: 6px !important;
        background: rgba(23,24,21,.88) !important;
        -webkit-backdrop-filter: blur(8px) !important;
        backdrop-filter: blur(8px) !important;
        font-size: 10px !important;
        letter-spacing: .02em !important;
      }

      body #quick-nav #quick-nav-toggle {
        width: 46px !important;
        height: 46px !important;
        min-width: 46px !important;
        min-height: 46px !important;
        border: 1px solid rgba(27,77,62,.58) !important;
        border-radius: 50% !important;
        background: rgba(239,241,236,.42) !important;
        color: #1b4d3e !important;
        -webkit-backdrop-filter: blur(15px) saturate(.9) !important;
        backdrop-filter: blur(15px) saturate(.9) !important;
        box-shadow: 0 9px 24px rgba(23,36,30,.10) !important;
        align-items: center !important;
        justify-content: center !important;
        cursor: pointer !important;
      }

      body #quick-nav #quick-nav-toggle svg {
        width: 18px !important;
        height: 18px !important;
        pointer-events: none !important;
      }

      body #quick-nav.open #quick-nav-toggle {
        background: #1b4d3e !important;
        color: #fff !important;
        box-shadow: 0 0 0 2px rgba(197,232,74,.42), 0 9px 24px rgba(27,77,62,.20) !important;
      }

      @media (min-width: 769px) {
        body #quick-nav #quick-nav-toggle { display: none !important; }
        body #quick-nav .quick-nav-menu {
          opacity: 1 !important;
          visibility: visible !important;
          pointer-events: auto !important;
          transform: none !important;
        }
      }

      @media (max-width: 768px) {
        body #quick-nav {
          right: 18px !important;
          bottom: 104px !important;
        }

        body #quick-nav #quick-nav-toggle {
          display: flex !important;
        }

        body #quick-nav .quick-nav-menu {
          position: absolute !important;
          right: 0 !important;
          bottom: 58px !important;
          gap: 4px !important;
          padding: 5px !important;
          opacity: 0 !important;
          visibility: hidden !important;
          pointer-events: none !important;
          transform: translateY(12px) scale(.96) !important;
          transform-origin: bottom right !important;
          transition: opacity .18s ease, visibility .18s ease, transform .18s ease !important;
        }

        body #quick-nav.open .quick-nav-menu {
          opacity: 1 !important;
          visibility: visible !important;
          pointer-events: auto !important;
          transform: none !important;
        }

        body #quick-nav .quick-nav-link {
          width: 34px !important;
          height: 34px !important;
          min-width: 34px !important;
          min-height: 34px !important;
        }

        body #quick-nav .quick-nav-link svg {
          width: 16px !important;
          height: 16px !important;
        }

        body #quick-nav .quick-nav-link > span {
          display: none !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function enhanceQuickNav() {
    const nav = document.getElementById('quick-nav');
    if (!nav) return false;

    injectQuickNavStyle();

    nav.querySelectorAll('.quick-nav-link').forEach(function (link) {
      if (link.dataset.iconified === '1') return;
      const section = link.dataset.quickSection;
      const labelNode = link.querySelector('span');
      const label = labelNode ? labelNode.textContent : link.getAttribute('aria-label') || section;
      link.innerHTML = (QUICK_NAV_ICONS[section] || QUICK_NAV_ICONS.portfolio) + '<span>' + label + '</span>';
      link.dataset.iconified = '1';
    });

    const toggle = document.getElementById('quick-nav-toggle');
    if (toggle && toggle.dataset.iconified !== '1') {
      toggle.innerHTML = TOGGLE_ICON;
      toggle.dataset.iconified = '1';
    }

    return true;
  }

  let navigationFallbackTimer = null;

  function bindReliableQuickNav() {
    const nav = document.getElementById('quick-nav');
    if (!nav) return false;
    if (nav.dataset.reliableControls === '1') return true;
    nav.dataset.reliableControls = '1';

    nav.addEventListener('click', function (event) {
      const clickedToggle = event.target && event.target.closest ? event.target.closest('#quick-nav-toggle') : null;
      if (clickedToggle && nav.contains(clickedToggle)) {
        event.preventDefault();
        event.stopImmediatePropagation();

        const shouldOpen = !nav.classList.contains('open');
        nav.classList.toggle('open', shouldOpen);
        clickedToggle.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
        clickedToggle.setAttribute('aria-label', shouldOpen ? 'Tutup navigasi cepat' : 'Buka navigasi cepat');
        return;
      }

      const link = event.target && event.target.closest ? event.target.closest('.quick-nav-link') : null;
      if (!link || !nav.contains(link)) return;

      const id = link.dataset.quickSection;
      const target = id ? document.getElementById(id) : null;
      if (!target) return;

      event.preventDefault();
      event.stopImmediatePropagation();

      if (navigationFallbackTimer) {
        window.clearTimeout(navigationFallbackTimer);
        navigationFallbackTimer = null;
      }

      nav.querySelectorAll('.quick-nav-link').forEach(function (item) {
        item.classList.toggle('active', item === link);
      });

      const header = document.getElementById('main-nav');
      const headerOffset = (header ? header.getBoundingClientRect().height : 0) + 12;
      const targetTop = Math.max(0, target.getBoundingClientRect().top + window.scrollY - headerOffset);
      const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      window.scrollTo({ top: window.scrollY, behavior: 'auto' });
      window.requestAnimationFrame(function () {
        window.scrollTo({ top: targetTop, behavior: reducedMotion ? 'auto' : 'smooth' });
      });

      nav.classList.remove('open');
      const toggle = document.getElementById('quick-nav-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');

      try {
        window.history.replaceState(null, '', '#' + id);
      } catch (_) {}

      navigationFallbackTimer = window.setTimeout(function () {
        const currentTop = target.getBoundingClientRect().top + window.scrollY - headerOffset;
        if (Math.abs(window.scrollY - currentTop) > 70) {
          window.scrollTo({ top: Math.max(0, currentTop), behavior: 'auto' });
        }
      }, reducedMotion ? 80 : 950);
    }, true);

    document.addEventListener('click', function (event) {
      if (window.innerWidth > 768 || !nav.classList.contains('open')) return;
      if (nav.contains(event.target)) return;
      nav.classList.remove('open');
      const toggle = document.getElementById('quick-nav-toggle');
      if (toggle) toggle.setAttribute('aria-expanded', 'false');
    }, false);

    return true;
  }

  function prepareQuickNav() {
    if (!enhanceQuickNav()) return false;
    bindReliableQuickNav();
    return true;
  }

  function watchQuickNav() {
    if (prepareQuickNav()) return;

    const observer = new MutationObserver(function () {
      if (prepareQuickNav()) observer.disconnect();
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
    window.setTimeout(function () {
      prepareQuickNav();
      observer.disconnect();
    }, 5000);
  }

  function bootRecovery() {
    window.setTimeout(loadFreshFloatingRuntime, 180);
    window.setTimeout(loadFreshFloatingRuntime, 1000);
    window.setTimeout(watchQuickNav, 250);
  }

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    const nav = document.getElementById('quick-nav');
    if (!nav) return;
    nav.classList.remove('open');
    const toggle = document.getElementById('quick-nav-toggle');
    if (toggle) toggle.setAttribute('aria-expanded', 'false');
  });

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootRecovery, { once: true });
  } else {
    bootRecovery();
  }
})();
