/**
 * Webfolio Security & Anti-Inspection Script
 * Protects site content, disables right-click, blocks inspect keyboard shortcuts,
 * traps browser debuggers, and prevents unauthorized source code manipulation.
 */

(function () {
  'use strict';

  // 1. Block Context Menu (Right Click)
  document.addEventListener('contextmenu', function (e) {
    e.preventDefault();
    return false;
  }, false);

  // 2. Block Inspect & DevTools Shortcuts
  document.addEventListener('keydown', function (e) {
    // F12 key
    if (e.keyCode === 123 || e.key === 'F12') {
      e.preventDefault();
      return false;
    }

    // Ctrl+Shift+I / J / C / K / E / M / S / U or Cmd+Option+I / J / C
    if (e.ctrlKey || e.metaKey) {
      const key = (e.key ? e.key : String.fromCharCode(e.keyCode)).toLowerCase();
      if (
        (e.shiftKey && ['i', 'j', 'c', 'k', 'e', 'm'].includes(key)) ||
        key === 'u' ||
        key === 's'
      ) {
        e.preventDefault();
        return false;
      }
    }
  }, false);

  // 3. Block Image & Element Dragging
  document.addEventListener('dragstart', function (e) {
    e.preventDefault();
    return false;
  }, false);

  // 4. Anti-Debugger Loop Trap
  // Automatically triggers breakpoints when DevTools is opened, preventing inspecting code
  function triggerDebuggerTrap() {
    try {
      (function () {
        return false;
      })
      ["constructor"]("debugger")();
    } catch (err) {}
  }

  setInterval(triggerDebuggerTrap, 250);

  // 5. Suppress Browser Console Output
  if (window.console) {
    const noop = function () {};
    window.console.log = noop;
    window.console.warn = noop;
    window.console.error = noop;
    window.console.info = noop;
    window.console.debug = noop;
  }
})();
