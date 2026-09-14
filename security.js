/**
 * Webfolio light client-side protection + runtime recovery helpers.
 *
 * Important: this is a public GitHub Pages site, so frontend source can never
 * be truly hidden. Keep protection lightweight so it does not interfere with
 * the portfolio, accessibility, or chatbot runtime.
 */

(function () {
  'use strict';

  // Block context menu.
  document.addEventListener('contextmenu', function (event) {
    event.preventDefault();
  }, false);

  // Block a few common source/devtools shortcuts without running debugger traps.
  document.addEventListener('keydown', function (event) {
    if (event.key === 'F12') {
      event.preventDefault();
      return;
    }

    if (event.ctrlKey || event.metaKey) {
      const key = String(event.key || '').toLowerCase();
      if ((event.shiftKey && ['i', 'j', 'c'].includes(key)) || key === 'u') {
        event.preventDefault();
      }
    }
  }, false);

  // Prevent accidental dragging of portfolio imagery.
  document.addEventListener('dragstart', function (event) {
    if (event.target && event.target.closest && event.target.closest('img')) {
      event.preventDefault();
    }
  }, false);

  /**
   * Chatbot recovery loader
   * ----------------------------------------------------------
   * GitHub Pages/browser caching can leave an older broken chatbot.js in cache.
   * The normal script still loads from index.html. If no FAB exists shortly
   * after the page is ready, fetch chatbot.js again with a unique cache-buster.
   */
  function recoverChatbotIfNeeded() {
    window.setTimeout(function () {
      if (document.getElementById('chat-fab')) return;
      if (document.querySelector('script[data-chatbot-recovery]')) return;

      const script = document.createElement('script');
      script.src = 'chatbot.js?v=' + Date.now();
      script.dataset.chatbotRecovery = 'true';
      script.async = false;
      document.body.appendChild(script);
    }, 700);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', recoverChatbotIfNeeded, { once: true });
  } else {
    recoverChatbotIfNeeded();
  }
})();
