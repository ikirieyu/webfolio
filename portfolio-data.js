/**
 * ============================================================
 * PORTFOLIO DATA CONFIGURATION — Diki Permana Webfolio
 * ============================================================
 * 💡 KATEGORI PORTFOLIO (TAB MENU):
 * Jika ingin menambah Kategori / Tab baru (misal: "uiux" atau "video"),
 * cukup tambahkan objek baru di PORTFOLIO_CATEGORIES di bawah ini.
 * TANPA PERLU UBAH HTML ATAU CSS KECUALI DATA DI FILE INI!
 */

const PORTFOLIO_CATEGORIES = [
  {
    id: "ecommerce",
    name: { id: "Desain Logo", en: "Logo Design" }
  },
  {
    id: "print",
    name: { id: "Mockup & Branding", en: "Mockup & Branding" }
  },
  {
    id: "github",
    name: { id: "GitHub Projects", en: "GitHub Projects" },
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`
  }
];

/**
 * 💡 DAFTAR KARYA PORTFOLIO:
 * - id: String unik (contoh: "ec-1", "my-work-1")
 * - category: Harus cocok dengan id di PORTFOLIO_CATEGORIES ("ecommerce", "print", "github", dll.)
 * - label: Teks badge kecil di pojok kiri atas
 * - year: Tahun project (contoh: "2025")
 * - theme: Nama class ("ec-1", "print-1") ATAU kode warna/gradien langsung (contoh: "#1B4D3E" atau "linear-gradient(...)")
 * - image: (Opsional) Path/URL gambar karya. Contoh: "asset/portfolio/shopee.png". Kosongkan "" jika mau pakai warna theme.
 * - link: URL target saat tombol diklik (Behance / GitHub)
 * - title: { id: "Judul Bahasa Indonesia", en: "English Title" }
 * - description: { id: "Deskripsi Bahasa Indonesia", en: "English Description" }
 * - tags: Array kata kunci tag (contoh: ["Shopee", "Banner", "Promosi"])
 */
const PORTFOLIO_DATA = [
  // --- CATEGORY: E-COMMERCE & PROMO ---
  {
    id: "ec-1",
    category: "ecommerce",
    label: "Shopee Campaign",
    year: "2024",
    theme: "ec-1",
    image: "", // Contoh jika ada gambar: "asset/portfolio/shopee.jpg"
    link: "https://www.behance.net/ikirieyu",
    title: {
      id: "Flash Sale Banner Series",
      en: "Flash Sale Banner Series"
    },
    description: {
      id: "Promotional banner series untuk campaign flash sale Shopee — 15 variasi ukuran dalam 3 hari.",
      en: "Promotional banner series for Shopee flash sale campaign — 15 size variations, 3-day turnaround."
    },
    tags: ["Shopee", "Banner", "Promosi"]
  },
  {
    id: "ec-2",
    category: "ecommerce",
    label: "Product Visual",
    year: "2024",
    theme: "ec-2",
    image: "",
    link: "https://www.behance.net/ikirieyu",
    title: {
      id: "Product Photography Layout",
      en: "Product Photography Layout"
    },
    description: {
      id: "Template visual produk untuk 100+ SKU toko DW Group — konsisten di semua platform marketplace.",
      en: "Product visual templates for 100+ SKUs of DW Group store — consistent across all marketplace platforms."
    },
    tags: ["E-commerce", "Template", "100+ SKU"]
  },
  {
    id: "ec-3",
    category: "ecommerce",
    label: "Store Decoration",
    year: "2023",
    theme: "ec-3",
    image: "",
    link: "https://www.behance.net/ikirieyu",
    title: {
      id: "Shopee Store Visual Identity",
      en: "Shopee Store Visual Identity"
    },
    description: {
      id: "Desain dekorasi toko lengkap: banner utama, banner kategori, voucher, dan highlight produk.",
      en: "Complete store decoration design: main banners, category banners, vouchers, and product highlights."
    },
    tags: ["Store Design", "Branding"]
  },
  {
    id: "ec-4",
    category: "ecommerce",
    label: "Social Media",
    year: "2024",
    theme: "ec-4",
    image: "",
    link: "https://www.behance.net/ikirieyu",
    title: {
      id: "Social Media Feed & Story Grid",
      en: "Social Media Feed & Story Grid"
    },
    description: {
      id: "Desain feed Instagram & TikTok banner promosi mingguan untuk campaign brand e-commerce.",
      en: "Instagram feed & TikTok promotional banner designs for weekly e-commerce brand campaigns."
    },
    tags: ["Instagram", "Content", "Feed Grid"]
  },
  {
    id: "ec-5",
    category: "ecommerce",
    label: "Voucher Design",
    year: "2023",
    theme: "ec-5",
    image: "",
    link: "https://www.behance.net/ikirieyu",
    title: {
      id: "Voucher & Discount Banner Kit",
      en: "Voucher & Discount Banner Kit"
    },
    description: {
      id: "Sistem desain voucher dan aset promosi reusable — adaptable untuk berbagai campaign bulanan.",
      en: "Voucher design system and reusable promotional assets — adaptable for monthly campaigns."
    },
    tags: ["Voucher", "System", "Campaign"]
  },
  {
    id: "ec-6",
    category: "ecommerce",
    label: "Packaging Label",
    year: "2023",
    theme: "ec-6",
    image: "",
    link: "https://www.behance.net/ikirieyu",
    title: {
      id: "Packaging & Label Produk",
      en: "Product Packaging & Label"
    },
    description: {
      id: "Desain label dan kemasan produk e-commerce — stiker, box insert, dan hang tag siap cetak.",
      en: "E-commerce product packaging and label design — print-ready stickers, box inserts, and hang tags."
    },
    tags: ["Packaging", "Label", "Print-Ready"]
  },

  // --- CATEGORY: PRINT & BRANDING ---
  {
    id: "print-1",
    category: "print",
    label: "Print Design",
    year: "2022",
    theme: "print-1",
    image: "",
    link: "https://www.behance.net/ikirieyu",
    title: {
      id: "Company Profile Brosur",
      en: "Company Profile Brochure"
    },
    description: {
      id: "Desain brosur perusahaan dengan layout editorial — 24 halaman, ready-to-print dalam CMYK.",
      en: "Corporate brochure design with editorial layout — 24 pages, ready-to-print in CMYK."
    },
    tags: ["Brosur", "Editorial", "CMYK"]
  },
  {
    id: "print-2",
    category: "print",
    label: "Book Layout",
    year: "2022",
    theme: "print-2",
    image: "",
    link: "https://www.behance.net/ikirieyu",
    title: {
      id: "Layout Buku & Majalah",
      en: "Book & Magazine Layout"
    },
    description: {
      id: "Tata letak buku dan majalah dengan InDesign — typesetting, grid system, dan master pages.",
      en: "Book and magazine layout with InDesign — typesetting, grid system, and master pages."
    },
    tags: ["InDesign", "Layout", "Majalah"]
  },
  {
    id: "print-3",
    category: "print",
    label: "Branding Kit",
    year: "2023",
    theme: "print-3",
    image: "",
    link: "https://www.behance.net/ikirieyu",
    title: {
      id: "Identitas Visual Brand UMKM",
      en: "SME Visual Brand Identity"
    },
    description: {
      id: "Logo, kartu nama, kop surat, dan brand guidelines lengkap untuk usaha kuliner lokal.",
      en: "Logo, business card, letterhead, and complete brand guidelines for local culinary business."
    },
    tags: ["Logo", "Brand Guidelines", "UMKM"]
  },
  {
    id: "print-4",
    category: "print",
    label: "Banner & Poster",
    year: "2024",
    theme: "print-4",
    image: "",
    link: "https://www.behance.net/ikirieyu",
    title: {
      id: "Spanduk & Banner Digital Print",
      en: "Digital Print Banner & Billboard"
    },
    description: {
      id: "Materi promosi cetak outdoor skala besar — spanduk flexi, roll banner, dan neon box.",
      en: "Large format outdoor print assets — flexi banners, roll-up banners, and lightboxes."
    },
    tags: ["Large Format", "Outdoor", "Printup"]
  },
  {
    id: "print-5",
    category: "print",
    label: "Stationery",
    year: "2023",
    theme: "print-5",
    image: "",
    link: "https://www.behance.net/ikirieyu",
    title: {
      id: "Merchandise & Corporate Gifts",
      en: "Merchandise & Corporate Gifts"
    },
    description: {
      id: "Desain cetak mug, kaos, totebag, dan id card lanyard untuk keperluan event perusahaan.",
      en: "Print design for mugs, t-shirts, totebags, and lanyard id cards for corporate events."
    },
    tags: ["Merchandise", "Sablon", "Souvenir"]
  },
  {
    id: "print-6",
    category: "print",
    label: "Flyer & Menu",
    year: "2023",
    theme: "print-6",
    image: "",
    link: "https://www.behance.net/ikirieyu",
    title: {
      id: "Menu Cafe & Flyer Promosi",
      en: "Cafe Menu & Promotional Flyer"
    },
    description: {
      id: "Desain menu lipat dan flyer promosi produk — cetak laminasi doff dengan spot UV.",
      en: "Folded menu design and promotional flyers — matte laminated with spot UV finish."
    },
    tags: ["Menu", "Flyer", "Spot UV"]
  },

  // --- CATEGORY: GITHUB PROJECTS ---
  {
    id: "gh-1",
    category: "github",
    label: "Mobile Apps",
    year: "2025",
    theme: "gh-1",
    image: "asset/ZiQi.jpg",
    link: "https://github.com/ikirieyu/pos-app-ziqi",
    title: {
      id: "ZiQi Point of Sale (POS)",
      en: "ZiQi Point of Sale (POS)"
    },
    description: {
      id: "Aplikasi Kasir & Pencatatan Hutang Pelanggan Kekinian. Solusi kasir dan pencatatan hutang pelanggan untuk warung, toko, dan UMKM — praktis, rapi, gak pakai buku tulis lagi.",
      en: "Modern Point of Sale & Debt Tracking Application. A state-of-the-art POS & Hutang Tracking solution for small businesses, retail stores, and warungs."
    },
    tags: ["React 18 + TypeScript", "Tailwind CSS + shadcn/ui + Radix UI", "PostgreSQL + RLS + Storage Buckets"]
  },
  {
    id: "gh-2",
    category: "github",
    label: "Web App",
    year: "2024",
    theme: "gh-2",
    image: "",
    link: "https://github.com/ikirieyu",
    title: {
      id: "E-commerce Banner Generator",
      en: "E-commerce Banner Generator"
    },
    description: {
      id: "Web utility sederhana berbasis JS murni untuk meng-generate layout banner promosi e-commerce secara otomatis.",
      en: "Pure JS web utility for automatically generating e-commerce promotional banner layouts."
    },
    tags: ["JavaScript", "Canvas API", "Tool"]
  },
  {
    id: "gh-3",
    category: "github",
    label: "Desktop",
    year: "2024",
    theme: "gh-3",
    image: "",
    link: "https://github.com/ikirieyu",
    title: {
      id: "Desktop App with Electron",
      en: "Desktop App with Electron"
    },
    description: {
      id: "Aplikasi desktop lintas platform (Windows/Mac/Linux) dengan Electron dan antarmuka web modern.",
      en: "Cross-platform desktop application (Windows/Mac/Linux) with Electron and modern web UI."
    },
    tags: ["Electron", "Desktop", "Cross-OS"]
  },
  {
    id: "gh-4",
    category: "github",
    label: "Frontend",
    year: "2024",
    theme: "gh-4",
    image: "",
    link: "https://github.com/ikirieyu",
    title: {
      id: "Vite + Vanilla JS Toolkit",
      en: "Vite + Vanilla JS Toolkit"
    },
    description: {
      id: "Starter kit frontend dengan Vite — build cepat, HMR, dan struktur project yang clean dan scalable.",
      en: "Frontend starter kit with Vite — fast build, HMR, and clean, scalable project structure."
    },
    tags: ["Vite", "JavaScript", "Frontend"]
  },
  {
    id: "gh-5",
    category: "github",
    label: "Tool / Utility",
    year: "2023",
    theme: "gh-5",
    image: "",
    link: "https://github.com/ikirieyu",
    title: {
      id: "Design-to-Web Automation Tool",
      en: "Design-to-Web Automation Tool"
    },
    description: {
      id: "Script otomasi untuk konversi aset desain ke format web-ready — optimasi gambar, renaming, export batch.",
      en: "Automation script for converting design assets to web-ready format — image optimization, batch export."
    },
    tags: ["Automation", "Node.js", "Tools"]
  },
  {
    id: "gh-6",
    category: "github",
    label: "Webfolio",
    year: "2025",
    theme: "gh-6",
    image: "",
    link: "https://github.com/ikirieyu",
    title: {
      id: "Personal Webfolio (This Site)",
      en: "Personal Webfolio (This Site)"
    },
    description: {
      id: "Source code webfolio ini — HTML/CSS/JS murni, desain custom, animasi scroll, dan chatbot AI.",
      en: "Source code of this webfolio — pure HTML/CSS/JS, custom design, scroll animations, and AI chatbot."
    },
    tags: ["HTML/CSS", "JavaScript", "Webfolio"]
  }
];
