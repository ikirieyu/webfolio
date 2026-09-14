/* ============================================================
   PROJECT REGISTRY — single place to register portfolio projects
   ============================================================

   CARA TAMBAH PROJECT BARU:
   1. Copy folder: projects/_template/
   2. Rename, contoh: projects/nova-desk/
   3. Edit project.js di dalam folder itu
   4. Taruh semua visual di folder assets/
   5. Tambahkan SATU baris file project di PROJECT_MODULES di bawah

   Setelah itu homepage + halaman case study membaca data otomatis.
   Tidak perlu edit index.html, project.html, main.js, atau project.js renderer.
*/

window.PORTFOLIO_CATEGORIES = [
  { id: 'ecommerce', name: { id: 'E-commerce', en: 'E-commerce' } },
  { id: 'branding', name: { id: 'Branding & Print', en: 'Branding & Print' } },
  {
    id: 'github',
    name: { id: 'Digital Projects', en: 'Digital Projects' },
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`
  }
];

// FILE UTAMA UNTUK MENDAFTARKAN PROJECT.
// Urutan visual di homepage tetap diatur lewat `featured` dan `order` di project.js masing-masing.
const PROJECT_MODULES = [
  'bungakebaya/project.js',
  'nova-desk/project.js',
  'ziqi-pos/project.js',
  'webfolio/project.js'
];

const registryScriptUrl = document.currentScript?.src || new URL('projects/registry.js', document.baseURI).href;
const projectsBaseUrl = new URL('./', registryScriptUrl);

window.PORTFOLIO_DATA = [];
window.PORTFOLIO_READY = (async () => {
  const loaded = await Promise.all(
    PROJECT_MODULES.map(async (relativePath) => {
      try {
        const moduleUrl = new URL(relativePath, projectsBaseUrl).href;
        const module = await import(moduleUrl);
        return module.default || null;
      } catch (error) {
        console.error(`[portfolio] Gagal memuat ${relativePath}`, error);
        return null;
      }
    })
  );

  window.PORTFOLIO_DATA = loaded.filter(Boolean);
  return window.PORTFOLIO_DATA;
})();
