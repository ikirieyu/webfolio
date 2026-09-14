/**
 * Lightweight client helpers for the public GitHub Pages portfolio.
 * Keeps the site usable and guarantees the floating UI runtime is refreshed.
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
    script.src = 'chatbot.js?v=20260914-1614';
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

  function bootRecovery() {
    window.setTimeout(loadFreshFloatingRuntime, 250);
    window.setTimeout(loadFreshFloatingRuntime, 1200);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootRecovery, { once: true });
  } else {
    bootRecovery();
  }
})();
