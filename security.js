/**
 * Lightweight client helpers for the public GitHub Pages portfolio.
 * Keeps the site usable, guarantees the floating UI runtime is refreshed,
 * and applies the final compact glass quick-navigation treatment.
 */
(function () {
  'use strict';

  // Public GitHub Pages source cannot be hidden. Keep this lightweight and
  // never run debugger traps or console overrides that can break the UI.
  document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
  }, false);

  document.addEventListener('dragstart', function (event) {
    if (event.target && event.target.closest && event.target.closest('img')) {
      event.preventDefault();
    }
  }, false);

  function loadFreshFloatingRuntime() {
    // If the current chatbot.js already booted correctly, do nothing.
    if (window.__DIKI_CHATBOT_RUNTIME__ && document.getElementById('chat-fab')) return;
    if (document.querySelector('script[data-diki-floating-runtime]')) return;

    const script = document.createElement('script');
    script.src = 'chatbot.js?v=20260914-1628';
    script.dataset.dikiFloatingRuntime = 'true';
    script.async = false;
    script.onload = function () {
      window.setTimeout(function () {
        // A final visible emergency launcher if something external blocks the runtime.
        if (document.getElementById('chat-fab') || !document.body) return;
        const fallback = document.createElement('button');
        fallback.id = 'chat-fab';
        fallback.type = 'button';
        fallback.setAttribute('aria-label', 'Reload chat');
        fallback.title = 'Reload chat';
        fallback.innerHTML = '💬';
        fallback.style.cssText = [
          'position:fixed','right:24px','bottom:24px','width:58px','height:58px',
          'border:0','border-radius:50%','background:#1b4d3e','color:#fff',
          'font-size:22px','cursor:pointer','z-index:2147483000','display:flex',
          'align-items:center','justify-content:center','box-shadow:0 10px 30px rgba(27,77,62,.35)'
        ].join(';');
        fallback.addEventListener('click', function () {
          const retry = document.createElement('script');
          retry.src = 'chatbot.js?v=' + Date.now();
          retry.async = false;
          document.body.appendChild(retry);
        });
        document.body.appendChild(fallback);
      }, 900);
    };
    document.body.appendChild(script);
  }

  const QUICK_NAV_ICONS = {
    hero: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 10.8 12 3l9 7.8"/><path d="M5.5 9.8V21h13V9.8"/><path d="M9.5 21v-6h5v6"/></svg>',
    about: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="3.2"/><path d="M5.7 20c.7-4 3-6 6.3-6s5.6 2 6.3 6"/></svg>',
    portfolio: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="4" y="4" width="6" height="6" rx="1.2"/><rect x="14" y="4" width="6" height="6" rx="1.2"/><rect x="4" y="14" width="6" height="6" rx="1.2"/><rect x="14" y="14" width="6" height="6" rx="1.2"/></svg>',
    instagram: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3.5" y="4" width="17" height="16" rx="2.4"/><circle cx="9" cy="9" r="1.7"/><path d="m5.5 17 4.1-4 3.1 3 2.2-2.1 3.6 3.1"/></svg>',
    experience: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="7" width="18" height="13" rx="2"/><path d="M8.5 7V5.2A2.2 2.2 0 0 1 10.7 3h2.6a2.2 2.2 0 0 1 2.2 2.2V7"/><path d="M3 12h18"/><path d="M10 12v2h4v-2"/></svg>',
    skills: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m8 8-4 4 4 4"/><path d="m16 8 4 4-4 4"/><path d="m14 5-4 14"/></svg>',
    contact: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>'
  };

  function injectQuickNavPolish() {
    if (document.getElementById('quick-nav-polish-style')) return;

    const style = document.createElement('style');
    style.id = 'quick-nav-polish-style';
    style.textContent = `
      body #quick-nav {
        right: 24px !important;
        bottom: 96px !important;
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
        background: rgba(239,241,236,.42) !important;
        color: #1b4d3e !important;
        -webkit-backdrop-filter: blur(15px) saturate(.9) !important;
        backdrop-filter: blur(15px) saturate(.9) !important;
        box-shadow: 0 9px 24px rgba(23,36,30,.10) !important;
      }

      body #quick-nav #quick-nav-toggle svg {
        width: 18px !important;
        height: 18px !important;
      }

      body #quick-nav.open #quick-nav-toggle {
        background: #1b4d3e !important;
        color: #fff !important;
        box-shadow: 0 0 0 2px rgba(197,232,74,.42), 0 9px 24px rgba(27,77,62,.20) !important;
      }

      body #quick-nav.open #quick-nav-toggle svg {
        transform: none !important;
      }

      @media (max-width: 768px) {
        body #quick-nav {
          right: 18px !important;
          bottom: 80px !important;
        }

        body #quick-nav .quick-nav-menu {
          right: 0 !important;
          bottom: 54px !important;
          gap: 4px !important;
          padding: 5px !important;
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

        body #quick-nav #quick-nav-toggle {
          width: 46px !important;
          height: 46px !important;
        }
      }
    `;
    document.head.appendChild(style);
  }

  function enhanceQuickNav() {
    const nav = document.getElementById('quick-nav');
    if (!nav) return false;

    injectQuickNavPolish();

    nav.querySelectorAll('.quick-nav-link').forEach(function (link) {
      if (link.dataset.iconified === '1') return;
      const section = link.dataset.quickSection;
      const labelNode = link.querySelector('span');
      const label = labelNode ? labelNode.textContent : link.getAttribute('aria-label') || section;
      const icon = QUICK_NAV_ICONS[section] || QUICK_NAV_ICONS.portfolio;
      link.innerHTML = icon + '<span>' + label + '</span>';
      link.dataset.iconified = '1';
    });

    const toggle = document.getElementById('quick-nav-toggle');
    if (toggle && toggle.dataset.iconified !== '1') {
      toggle.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="2.2"/><path d="M12 3.5v3M12 17.5v3M3.5 12h3M17.5 12h3"/></svg>';
      toggle.dataset.iconified = '1';
    }

    return true;
  }

  function watchQuickNav() {
    if (enhanceQuickNav()) return;

    const observer = new MutationObserver(function () {
      if (enhanceQuickNav()) observer.disconnect();
    });

    observer.observe(document.documentElement, { childList: true, subtree: true });
    window.setTimeout(function () {
      enhanceQuickNav();
      observer.disconnect();
    }, 5000);
  }

  function bootRecovery() {
    window.setTimeout(loadFreshFloatingRuntime, 250);
    window.setTimeout(loadFreshFloatingRuntime, 1200);
    window.setTimeout(watchQuickNav, 300);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootRecovery, { once: true });
  } else {
    bootRecovery();
  }
})();
