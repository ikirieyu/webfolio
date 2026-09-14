export default {
  id: 'ziqi-pos',
  category: 'github',
  published: true,
  featured: true,
  order: 1,

  label: 'Mobile Apps',
  year: '2025',
  role: 'Product / Frontend Development',

  title: {
    id: 'ZiQi Point of Sale (POS)',
    en: 'ZiQi Point of Sale (POS)'
  },

  description: {
    id: 'Aplikasi kasir offline-first dan pencatatan hutang pelanggan untuk warung, toko, dan UMKM.',
    en: 'An offline-first point of sale and customer debt tracking application for small businesses, retail stores, and warungs.'
  },

  tags: ['React + TypeScript', 'Dexie.js', 'Supabase', 'Capacitor'],

  eyebrow: {
    id: 'GitHub Product Case Study',
    en: 'GitHub Product Case Study'
  },

  subtitle: {
    id: 'POS modern yang tetap bisa bekerja secara lokal, mendukung pencatatan hutang, laporan penjualan, PWA, dan Android.',
    en: 'A modern POS designed to work locally, with debt tracking, sales reporting, PWA support, and Android deployment.'
  },

  overview: {
    id: 'ZiQi POS adalah aplikasi kasir untuk usaha kecil dan retail yang menggabungkan transaksi kasir, katalog dan stok, pelanggan, hutang/bon, riwayat transaksi, serta laporan omzet dan keuntungan dalam satu aplikasi. Project ini menggunakan React 18, TypeScript, Vite, Tailwind CSS, Dexie.js untuk penyimpanan offline berbasis IndexedDB, dan Supabase untuk database/backend.',
    en: 'ZiQi POS is a point-of-sale application for small businesses and retail stores that combines checkout, product and stock management, customers, debt tracking, transaction history, and revenue/profit reporting in one application. The project uses React 18, TypeScript, Vite, Tailwind CSS, Dexie.js for IndexedDB-based offline storage, and Supabase for the database/backend.'
  },

  challenge: {
    id: 'Aplikasi kasir untuk warung dan toko tidak boleh bergantung penuh pada koneksi internet. Transaksi harus tetap cepat, data hutang pelanggan harus mudah dilacak, dan aplikasi perlu nyaman dipakai di desktop maupun Android.',
    en: 'A POS for warungs and retail stores should not depend entirely on an internet connection. Checkout needs to stay fast, customer debt must be easy to track, and the app needs to work comfortably across desktop and Android.'
  },

  approach: {
    id: 'Arsitektur dibuat offline-first dengan Dexie.js/IndexedDB untuk penyimpanan lokal, lalu Supabase dipakai untuk database, storage, dan kebutuhan backend. Antarmuka dibangun dengan React + TypeScript, sementara Capacitor memungkinkan project yang sama dijalankan sebagai aplikasi Android.',
    en: 'The architecture is offline-first using Dexie.js/IndexedDB for local storage, with Supabase handling database, storage, and backend needs. The interface is built with React + TypeScript, while Capacitor allows the same project to run as an Android application.'
  },

  blocks: [
    {
      type: 'text',
      kicker: { id: 'Product', en: 'Product' },
      title: { id: 'Fitur Utama', en: 'Key Features' },
      body: {
        id: 'Kasir cepat dengan cash dan bon/hutang, katalog dan stok real-time, manajemen pelanggan, histori pelunasan hutang, laporan omzet/modal/keuntungan, chart penjualan, struk digital, share WhatsApp, serta PIN lock.',
        en: 'Fast checkout with cash and debt payments, real-time product and stock management, customer management, debt repayment history, revenue/cost/profit reports, sales charts, digital receipts, WhatsApp sharing, and PIN lock.'
      }
    },
    {
      type: 'text',
      kicker: { id: 'Engineering', en: 'Engineering' },
      title: { id: 'Technical Direction', en: 'Technical Direction' },
      body: {
        id: 'Frontend memakai React 18 + TypeScript + Vite. UI menggunakan Tailwind CSS, shadcn/ui, dan Radix UI. TanStack Query menangani data fetching/state server, Recharts untuk analytics, Supabase sebagai PostgreSQL/backend, Dexie.js untuk offline storage, dan Capacitor 6 untuk Android.',
        en: 'The frontend uses React 18 + TypeScript + Vite. UI is built with Tailwind CSS, shadcn/ui, and Radix UI. TanStack Query handles server-state data, Recharts powers analytics, Supabase provides PostgreSQL/backend services, Dexie.js handles offline storage, and Capacitor 6 targets Android.'
      }
    }
  ],

  image: 'projects/ziqi-pos/assets/00-cover.jpg',

  assets: {
    folder: 'projects/ziqi-pos/assets',
    files: ['00-cover.jpg']
  },

  repoUrl: 'https://github.com/ikirieyu/pos-app-ziqi',
  externalLink: 'https://github.com/ikirieyu/pos-app-ziqi',

  // Menandakan project GitHub ini tetap punya halaman penjelasan internal.
  caseStudy: {}
};
