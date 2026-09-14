/**
 * ============================================================
 * PORTFOLIO DATA CONFIGURATION — Diki Permana Webfolio
 * ============================================================
 *
 * Portfolio sekarang punya 2 tipe project:
 * 1) External project  -> pakai `link` (Behance / GitHub)
 * 2) Internal case study -> tambahkan object `caseStudy`
 *
 * Jika `caseStudy` tersedia, tombol "Lihat Case Study" otomatis membuka:
 * project.html?id=PROJECT_ID
 *
 * Untuk menyiapkan project yang belum siap tayang, gunakan:
 * published: false
 */

const PORTFOLIO_CATEGORIES = [
  {
    id: "ecommerce",
    name: { id: "E-commerce", en: "E-commerce" }
  },
  {
    id: "branding",
    name: { id: "Branding & Print", en: "Branding & Print" }
  },
  {
    id: "github",
    name: { id: "Digital Projects", en: "Digital Projects" },
    icon: `<svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/></svg>`
  }
];

const PORTFOLIO_DATA = [
  // ============================================================
  // E-COMMERCE
  // ============================================================
  {
    id: "bungakebaya-shopee",
    category: "ecommerce",
    label: "Shopee Store Design",
    year: "2025",
    theme: "print-1",
    image: "asset/bungakebaya.png",
    link: "https://www.behance.net/gallery/255517091/Bungakebaya-Fashion-Shop?platform=direct",
    title: {
      id: "Bungakebaya Fashion Shop — Shopee Template",
      en: "Bungakebaya Fashion Shop — Shopee Template"
    },
    description: {
      id: "Sistem visual e-commerce untuk toko fashion: storefront, campaign banner, dan presentasi produk yang konsisten.",
      en: "E-commerce visual system for a fashion store: storefront, campaign banners, and consistent product presentation."
    },
    tags: ["Shopee", "E-commerce", "Store Design"],
    caseStudy: {
      eyebrow: { id: "E-commerce Case Study", en: "E-commerce Case Study" },
      subtitle: {
        id: "Membangun tampilan toko marketplace yang konsisten, mudah dipindai, dan siap dipakai untuk campaign.",
        en: "Building a consistent marketplace storefront that is easy to scan and ready for campaign use."
      },
      meta: [
        { label: { id: "Project", en: "Project" }, value: "Bungakebaya" },
        { label: { id: "Fokus", en: "Focus" }, value: "Shopee Store Design" },
        { label: { id: "Tahun", en: "Year" }, value: "2025" },
        { label: { id: "Role", en: "Role" }, value: "E-commerce Visual Design" }
      ],
      overview: {
        title: { id: "Overview", en: "Overview" },
        body: {
          id: "Case study ini menampilkan bagaimana satu sistem visual diterapkan ke kebutuhan marketplace, bukan sekadar membuat satu banner terpisah. Fokusnya adalah konsistensi hierarchy, keterbacaan promo, dan modularitas aset agar mudah diadaptasi ke campaign berikutnya.",
          en: "This case study shows how one visual system can be applied across marketplace needs instead of treating each banner as an isolated design. The focus is hierarchy, promotional clarity, and reusable assets for future campaigns."
        }
      },
      challenge: {
        title: { id: "Challenge", en: "Challenge" },
        body: {
          id: "Toko fashion membutuhkan banyak materi visual dengan pesan berbeda, tetapi semuanya tetap harus terasa berasal dari brand yang sama. Tantangannya adalah menjaga identitas visual tanpa membuat halaman toko terasa penuh dan sulit dipindai.",
          en: "A fashion store needs many visual assets with different messages while still feeling like one brand. The challenge is maintaining visual identity without making the storefront feel crowded or difficult to scan."
        }
      },
      approach: {
        title: { id: "Approach", en: "Approach" },
        body: {
          id: "Saya menggunakan layout modular, hierarchy yang jelas, dan elemen visual yang bisa diulang untuk banner utama, kategori, promo, dan product highlight. Struktur ini membuat campaign baru lebih cepat dibuat tanpa kehilangan konsistensi.",
          en: "I used modular layouts, clear hierarchy, and repeatable visual elements across hero banners, categories, promotions, and product highlights. This structure makes new campaigns faster to produce without losing consistency."
        }
      },
      gallery: [
        {
          src: "asset/bungakebaya.png",
          alt: { id: "Presentasi project Bungakebaya Shopee", en: "Bungakebaya Shopee project presentation" },
          caption: { id: "Shopee storefront & campaign visual", en: "Shopee storefront & campaign visual" },
          size: "wide"
        }
      ],
      externalLink: "https://www.behance.net/gallery/255517091/Bungakebaya-Fashion-Shop?platform=direct"
    }
  },

  // Template project berikut sengaja disimpan sebagai draft.
  // Ganti image/gallery setelah desain Nova Desk selesai, lalu ubah published menjadi true.
  {
    id: "nova-desk",
    category: "ecommerce",
    published: false,
    label: "Concept Project",
    year: "2026",
    theme: "linear-gradient(135deg, #202020 0%, #343434 55%, #ff6b35 100%)",
    image: "",
    link: "",
    title: {
      id: "NOVA DESK — Marketplace Launch",
      en: "NOVA DESK — Marketplace Launch"
    },
    description: {
      id: "Concept case study untuk marketplace launch, product presentation, social media, dan advertising.",
      en: "Concept case study covering marketplace launch, product presentation, social media, and advertising."
    },
    tags: ["Marketplace", "Campaign", "Ads"],
    caseStudy: {
      eyebrow: { id: "Concept E-commerce Case Study", en: "Concept E-commerce Case Study" },
      subtitle: {
        id: "Satu brand fiktif untuk menunjukkan workflow e-commerce dari storefront sampai campaign dan ad creative.",
        en: "A fictional brand used to demonstrate an e-commerce workflow from storefront to campaign and ad creative."
      },
      meta: [
        { label: { id: "Brand", en: "Brand" }, value: "NOVA DESK" },
        { label: { id: "Kategori", en: "Category" }, value: "Desk Accessories" },
        { label: { id: "Tahun", en: "Year" }, value: "2026" },
        { label: { id: "Role", en: "Role" }, value: "E-commerce / Visual Design" }
      ],
      overview: {
        title: { id: "Overview", en: "Overview" },
        body: {
          id: "Project ini akan menjadi case study utama untuk menunjukkan kemampuan marketplace, product presentation, campaign design, social media, dan advertising dalam satu sistem brand.",
          en: "This project will become the primary case study for demonstrating marketplace, product presentation, campaign design, social media, and advertising within one brand system."
        }
      },
      challenge: {
        title: { id: "Challenge", en: "Challenge" },
        body: {
          id: "Membangun sistem visual yang cukup fleksibel untuk banyak produk dan campaign tanpa kehilangan identitas brand.",
          en: "Build a visual system flexible enough for multiple products and campaigns without losing brand identity."
        }
      },
      approach: {
        title: { id: "Approach", en: "Approach" },
        body: {
          id: "Gunakan satu design system yang konsisten untuk product image, storefront, campaign, social content, dan iklan.",
          en: "Use one consistent design system across product imagery, storefront, campaigns, social content, and advertising."
        }
      },
      gallery: [],
      externalLink: ""
    }
  },

  {
    id: "ec-1",
    category: "ecommerce",
    label: "Shopee Campaign",
    year: "2024",
    theme: "ec-1",
    image: "",
    link: "https://www.behance.net/ikirieyu",
    title: { id: "Flash Sale Banner Series", en: "Flash Sale Banner Series" },
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
    title: { id: "Product Photography Layout", en: "Product Photography Layout" },
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
    title: { id: "Shopee Store Visual Identity", en: "Shopee Store Visual Identity" },
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
    title: { id: "Social Media Feed & Story Grid", en: "Social Media Feed & Story Grid" },
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
    title: { id: "Voucher & Discount Banner Kit", en: "Voucher & Discount Banner Kit" },
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
    title: { id: "Packaging & Label Produk", en: "Product Packaging & Label" },
    description: {
      id: "Desain label dan kemasan produk e-commerce — stiker, box insert, dan hang tag siap cetak.",
      en: "E-commerce product packaging and label design — print-ready stickers, box inserts, and hang tags."
    },
    tags: ["Packaging", "Label", "Print-Ready"]
  },

  // ============================================================
  // BRANDING & PRINT
  // ============================================================
  {
    id: "print-2",
    category: "branding",
    label: "Book Layout",
    year: "2022",
    theme: "print-2",
    image: "",
    link: "https://www.behance.net/ikirieyu",
    title: { id: "Layout Buku & Majalah", en: "Book & Magazine Layout" },
    description: {
      id: "Tata letak buku dan majalah dengan InDesign — typesetting, grid system, dan master pages.",
      en: "Book and magazine layout with InDesign — typesetting, grid system, and master pages."
    },
    tags: ["InDesign", "Layout", "Majalah"]
  },
  {
    id: "print-3",
    category: "branding",
    label: "Branding Kit",
    year: "2023",
    theme: "print-3",
    image: "",
    link: "https://www.behance.net/ikirieyu",
    title: { id: "Identitas Visual Brand UMKM", en: "SME Visual Brand Identity" },
    description: {
      id: "Logo, kartu nama, kop surat, dan brand guidelines lengkap untuk usaha kuliner lokal.",
      en: "Logo, business card, letterhead, and complete brand guidelines for local culinary business."
    },
    tags: ["Logo", "Brand Guidelines", "UMKM"]
  },
  {
    id: "print-4",
    category: "branding",
    label: "Banner & Poster",
    year: "2024",
    theme: "print-4",
    image: "",
    link: "https://www.behance.net/ikirieyu",
    title: { id: "Spanduk & Banner Digital Print", en: "Digital Print Banner & Billboard" },
    description: {
      id: "Materi promosi cetak outdoor skala besar — spanduk flexi, roll banner, dan neon box.",
      en: "Large format outdoor print assets — flexi banners, roll-up banners, and lightboxes."
    },
    tags: ["Large Format", "Outdoor", "Printup"]
  },
  {
    id: "print-5",
    category: "branding",
    label: "Stationery",
    year: "2023",
    theme: "print-5",
    image: "",
    link: "https://www.behance.net/ikirieyu",
    title: { id: "Merchandise & Corporate Gifts", en: "Merchandise & Corporate Gifts" },
    description: {
      id: "Desain cetak mug, kaos, totebag, dan id card lanyard untuk keperluan event perusahaan.",
      en: "Print design for mugs, t-shirts, totebags, and lanyard id cards for corporate events."
    },
    tags: ["Merchandise", "Sablon", "Souvenir"]
  },
  {
    id: "print-6",
    category: "branding",
    label: "Flyer & Menu",
    year: "2023",
    theme: "print-6",
    image: "",
    link: "https://www.behance.net/ikirieyu",
    title: { id: "Menu Cafe & Flyer Promosi", en: "Cafe Menu & Promotional Flyer" },
    description: {
      id: "Desain menu lipat dan flyer promosi produk — cetak laminasi doff dengan spot UV.",
      en: "Folded menu design and promotional flyers — matte laminated with spot UV finish."
    },
    tags: ["Menu", "Flyer", "Spot UV"]
  },

  // ============================================================
  // DIGITAL / GITHUB PROJECTS
  // ============================================================
  {
    id: "gh-1",
    category: "github",
    label: "Mobile Apps",
    year: "2025",
    theme: "gh-1",
    image: "asset/ZiQi.jpg",
    link: "https://github.com/ikirieyu/pos-app-ziqi",
    title: { id: "ZiQi Point of Sale (POS)", en: "ZiQi Point of Sale (POS)" },
    description: {
      id: "Aplikasi kasir & pencatatan hutang pelanggan untuk warung, toko, dan UMKM.",
      en: "Point of sale and customer debt tracking application for small businesses and retail stores."
    },
    tags: ["React + TypeScript", "Tailwind", "PostgreSQL"]
  },
  {
    id: "gh-2",
    category: "github",
    label: "Web App",
    year: "2024",
    theme: "gh-2",
    image: "",
    link: "https://github.com/ikirieyu",
    title: { id: "E-commerce Banner Generator", en: "E-commerce Banner Generator" },
    description: {
      id: "Web utility sederhana berbasis JS untuk meng-generate layout banner promosi e-commerce.",
      en: "JavaScript web utility for generating e-commerce promotional banner layouts."
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
    title: { id: "Desktop App with Electron", en: "Desktop App with Electron" },
    description: {
      id: "Aplikasi desktop lintas platform dengan Electron dan antarmuka web modern.",
      en: "Cross-platform desktop application built with Electron and a modern web interface."
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
    title: { id: "Vite + Vanilla JS Toolkit", en: "Vite + Vanilla JS Toolkit" },
    description: {
      id: "Starter kit frontend dengan Vite — build cepat, HMR, dan struktur project yang clean.",
      en: "Frontend starter kit with Vite — fast builds, HMR, and a clean project structure."
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
    title: { id: "Design-to-Web Automation Tool", en: "Design-to-Web Automation Tool" },
    description: {
      id: "Script otomasi untuk konversi aset desain ke format web-ready — optimasi, renaming, dan export batch.",
      en: "Automation script for converting design assets to web-ready formats — optimization, renaming, and batch export."
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
    link: "https://github.com/ikirieyu/webfolio",
    title: { id: "Personal Webfolio (This Site)", en: "Personal Webfolio (This Site)" },
    description: {
      id: "Source code webfolio ini — HTML/CSS/JS murni, desain custom, animasi scroll, dan chatbot AI.",
      en: "Source code for this webfolio — pure HTML/CSS/JS, custom design, scroll animations, and AI chatbot."
    },
    tags: ["HTML/CSS", "JavaScript", "Webfolio"]
  }
];
