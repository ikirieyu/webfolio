/* ============================================================
   I18N.JS — Multi-Language Support (Bahasa Indonesia & English)
   Diki Permana Webfolio
   ============================================================ */

const TRANSLATIONS = {
  id: {
    // Navigation
    "nav.about": "About",
    "nav.portfolio": "Portfolio",
    "nav.experience": "Experience",
    "nav.skills": "Skills",
    "nav.contact": "Hubungi Saya",

    // Hero Section
    "hero.badge": "Available for Work",
    "hero.role": "Graphic Designer",
    "hero.tag_ecommerce": "E-commerce Specialist",
    "hero.tag_print": "Print & Branding",
    "hero.tag_prepress": "Prepress & Produksi",
    "hero.location": "Jakarta Barat, Indonesia",
    "hero.btn_behance": "Lihat di Behance",
    "hero.scroll": "Scroll",

    // Marquee — fokus ke target role e-commerce / marketplace
    "marquee.ecommerce": "Marketplace Operations",
    "marquee.print": "Product & Catalog Management",
    "marquee.brand": "Campaign & Promotion",
    "marquee.shopee": "Marketplace Ads",
    "marquee.prepress": "Store Optimization",
    "marquee.layout": "E-commerce Visuals",

    // About Section
    "about.label": "About",
    "about.stat1_desc": "Tahun Pengalaman Kerja",
    "about.stat2_desc": "Desain Promosi / Minggu",
    "about.stat3_desc": "Produk / SKU Dikelola",
    "about.heading": "E-commerce specialist yang paham operasi, visual, dan cara produk dijual.",
    "about.p1": "Saya Diki — punya pengalaman di <strong>e-commerce, marketplace operations, dan graphic design</strong>. Saya terbiasa menangani listing produk, campaign, materi promosi, customer/order flow, serta menjaga tampilan toko tetap konsisten. Dalam pengalaman sebelumnya saya mengelola <strong>100+ produk</strong> dan memproduksi <strong>20+ desain promosi per minggu</strong>.",
    "about.p2": "Buat saya, e-commerce bukan sekadar upload produk atau menyalakan iklan. <strong>Produk, stok, visual, promo, harga, dan operasional harus bekerja sebagai satu sistem.</strong> Kalau salah satu lemah, budget iklan saja tidak akan menyelesaikan masalah.",
    "about.p3": "Background saya di <strong>graphic design dan web/app development</strong> membantu saya menjembatani kebutuhan komersial dan teknis — dari visual campaign dan reporting, sampai memahami workflow digital dan membangun tools internal sederhana.",
    "about.cta": "Mari Berkolaborasi",

    // Portfolio Section
    "portfolio.label": "Portfolio",
    "portfolio.title": "Karya Pilihan",
    "portfolio.all_behance": "Semua Karya di Behance →",
    "portfolio.tab_ecommerce": "E-commerce & Promo",
    "portfolio.tab_print": "Print & Branding",
    "portfolio.tab_github": "GitHub Projects",
    "portfolio.view_project": "Lihat Project →",
    "portfolio.view_repo": "Lihat Repo →",

    // Portfolio Items - E-commerce
    "portfolio.ec1_title": "Flash Sale Banner Series",
    "portfolio.ec1_desc": "Rangkaian banner promosi untuk campaign flash sale Shopee — 15 variasi ukuran, 3 hari pengerjaan.",
    "portfolio.ec2_title": "Product Photography Layout",
    "portfolio.ec2_desc": "Template visual produk untuk 100+ SKU toko DW Group — konsisten di semua platform marketplace.",
    "portfolio.ec3_title": "Shopee Store Visual Identity",
    "portfolio.ec3_desc": "Desain dekorasi toko lengkap: banner utama, kategori, voucher, dan highlight produk.",
    "portfolio.ec4_title": "Social Media Content Pack",
    "portfolio.ec4_desc": "Paket konten Instagram & TikTok untuk promosi produk — feed, story, reels cover, dan highlight.",
    "portfolio.ec5_title": "Voucher & Promo Asset System",
    "portfolio.ec5_desc": "Sistem desain voucher dan aset promosi reusable — adaptable untuk berbagai campaign bulanan.",
    "portfolio.ec6_title": "Packaging & Label Produk",
    "portfolio.ec6_desc": "Desain label dan kemasan produk e-commerce — stiker, box insert, dan hang tag siap cetak.",

    // Portfolio Items - Print
    "portfolio.print1_title": "Company Profile Brosur",
    "portfolio.print1_desc": "Desain brosur perusahaan dengan layout editorial — 24 halaman, ready-to-print dalam CMYK.",
    "portfolio.print2_title": "Layout Buku & Majalah",
    "portfolio.print2_desc": "Tata letak buku dan majalah dengan InDesign — typesetting, grid system, dan master pages.",
    "portfolio.print3_title": "Large Format Banner Series",
    "portfolio.print3_desc": "Desain banner spanduk skala besar untuk event dan promosi outdoor, berbagai ukuran custom.",
    "portfolio.print4_title": "Custom Stiker & Label",
    "portfolio.print4_desc": "Desain stiker dan label custom — cutting path, warna spot, dan material vinyl/glossy/matte.",
    "portfolio.print5_title": "Neon Box & Signage",
    "portfolio.print5_desc": "Desain signage dan neon box untuk toko retail — dimensi akurat, siap ke vendor fabrication.",
    "portfolio.print6_title": "Brand Identity & Logo",
    "portfolio.print6_desc": "Pengembangan identitas visual brand — logo, color palette, tipografi, dan panduan penggunaan.",

    // Portfolio Items - GitHub
    "portfolio.gh1_title": "Next.js Web Application",
    "portfolio.gh1_desc": "Web app modern dengan Next.js — routing, SSR, dan komponen reusable untuk kebutuhan bisnis.",
    "portfolio.gh2_title": "Mobile App with Capacitor",
    "portfolio.gh2_desc": "Konversi web app ke mobile Android/iOS menggunakan Capacitor — satu codebase, multi platform.",
    "portfolio.gh3_title": "Desktop App with Electron",
    "portfolio.gh3_desc": "Aplikasi desktop lintas platform (Windows/Mac/Linux) dengan Electron dan antarmuka web modern.",
    "portfolio.gh4_title": "Vite + Vanilla JS Toolkit",
    "portfolio.gh4_desc": "Starter kit frontend dengan Vite — build cepat, HMR, dan struktur project yang clean dan scalable.",
    "portfolio.gh5_title": "Design-to-Web Automation Tool",
    "portfolio.gh5_desc": "Script otomasi untuk konversi aset desain ke format web-ready — optimasi gambar, renaming, export batch.",
    "portfolio.gh6_title": "Personal Webfolio (This Site)",
    "portfolio.gh6_desc": "Source code webfolio ini — HTML/CSS/JS murni, desain custom, animasi scroll, dan chatbot AI.",

    "portfolio.bottom_cta": "Lihat semua karya desain di Behance & project dev di GitHub",
    "portfolio.btn_behance_bottom": "Behance Portfolio",
    "portfolio.btn_github_bottom": "GitHub Repos",

    // Instagram Section
    "ig.label": "Instagram",
    "ig.title": "Aktivitas Terbaru",
    "ig.follow": "Follow @iki.rieyu →",

    // Experience Section
    "exp.label": "Experience",
    "exp.title": "Perjalanan Karir",
    "exp.present": "2026–sekarang",

    "exp.job1_title": "Graphic Designer",
    "exp.job1_company": "Image Print / Printup",
    "exp.job1_li1": "Desain materi cetak harian: banner, spanduk, stiker, brosur, neon box",
    "exp.job1_li2": "Produksi desain untuk kebutuhan digital printing skala komersial",
    "exp.job1_li3": "Persiapan file prepress dan quality control sebelum naik cetak",
    "exp.job1_li4": "Operasi dan koordinasi dengan mesin printing & cutting",

    "exp.job2_title": "E-commerce Specialist",
    "exp.job2_company": "DW Group",
    "exp.job2_li1": "Mengelola <strong>100+ produk</strong> di platform Shopee end-to-end",
    "exp.job2_li2": "Memproduksi <strong>20+ desain promosi per minggu</strong> secara konsisten",
    "exp.job2_li3": "Mengembangkan visual toko online dari konsep hingga siap produksi",
    "exp.job2_li4": "Optimasi konten dan materi kampanye untuk meningkatkan konversi",

    "exp.job3_title": "Graphic Designer",
    "exp.job3_company": "Ruang Print",
    "exp.job3_li1": "Desain brosur, banner, dan materi promosi cetak",
    "exp.job3_li2": "Layout buku dan majalah dengan InDesign",
    "exp.job3_li3": "Persiapan file prepress siap cetak",

    "exp.job4_title": "Graphic Designer",
    "exp.job4_company": "Dstar Digital Printing",
    "exp.job4_li1": "Desain materi cetak (stiker, spanduk, kemasan, neon box)",
    "exp.job4_li2": "Operasi langsung mesin printing dan cutting",
    "exp.job4_li3": "Quality control hasil cetak dan finishing",

    "exp.job5_title": "Graphic Designer",
    "exp.job5_company": "Abi Kreasindo",
    "exp.job5_li1": "Produksi materi promosi harian untuk klien retail",
    "exp.job5_li2": "Desain cetak: brosur, kartu nama, x-banner",

    // Skills Section
    "skills.label": "Skills",
    "skills.title": "Keahlian Utama",
    "skills.cat1_title": "E-commerce & Marketplace",
    "skills.cat2_title": "Visual & Campaign",
    "skills.cat3_title": "Data & Operations",
    "skills.cat4_title": "Web & Technical",
    "skills.it_pc": "HTML / CSS / JavaScript",
    "skills.it_os": "React / TypeScript / Vite",
    "skills.it_lan": "Supabase / Local Storage",
    "skills.it_hw": "Capacitor / Electron",

    // Contact Section
    "contact.label": "Contact",
    "contact.heading": "Butuh orang yang paham marketplace dan visual? <br/><em>Mari ngobrol.</em>",
    "contact.sub": "Terbuka untuk full-time, freelance, dan kolaborasi e-commerce — marketplace operations, catalog, campaign, visual content, dan digital workflow.",

    // Footer
    "footer.copy": "© 2026 Diki Permana — E-commerce & Marketplace Specialist · Jakarta, Indonesia.",

    // Chatbot UI
    "chatbot.title": "Diki AI Assistant",
    "chatbot.sub": "Online • Tanya apa saja tentang Diki",
    "chatbot.placeholder": "Tanyakan sesuatu tentang Diki...",
    "chatbot.chip1": "Pengalaman kerja Diki?",
    "chatbot.chip2": "Skill & tools utama?",
    "chatbot.chip3": "Cara kontak Diki?",
    "chatbot.chip4": "Proyek terbaru Diki?",
  },

  en: {
    // Navigation
    "nav.about": "About",
    "nav.portfolio": "Portfolio",
    "nav.experience": "Experience",
    "nav.skills": "Skills",
    "nav.contact": "Contact Me",

    // Hero Section
    "hero.badge": "Available for Work",
    "hero.role": "Graphic Designer",
    "hero.tag_ecommerce": "E-commerce Specialist",
    "hero.tag_print": "Print & Branding",
    "hero.tag_prepress": "Prepress & Production",
    "hero.location": "West Jakarta, Indonesia",
    "hero.btn_behance": "View on Behance",
    "hero.scroll": "Scroll",

    // Marquee
    "marquee.ecommerce": "Marketplace Operations",
    "marquee.print": "Product & Catalog Management",
    "marquee.brand": "Campaign & Promotion",
    "marquee.shopee": "Marketplace Ads",
    "marquee.prepress": "Store Optimization",
    "marquee.layout": "E-commerce Visuals",

    // About Section
    "about.label": "About",
    "about.stat1_desc": "Years of Work Experience",
    "about.stat2_desc": "Promo Designs / Week",
    "about.stat3_desc": "Products / SKUs Managed",
    "about.heading": "An e-commerce specialist who understands operations, visuals, and how products sell.",
    "about.p1": "I'm Diki — experienced in <strong>e-commerce, marketplace operations, and graphic design</strong>. I'm used to handling product listings, campaigns, promotional assets, customer/order flow, and keeping storefront visuals consistent. In a previous role, I managed <strong>100+ products</strong> and produced <strong>20+ promotional designs per week</strong>.",
    "about.p2": "To me, e-commerce is more than uploading products or turning on ads. <strong>Product, stock, visuals, promotions, pricing, and operations need to work as one system.</strong> If one part is weak, ad spend alone will not fix it.",
    "about.p3": "My background in <strong>graphic design and web/app development</strong> helps me bridge commercial and technical needs — from campaign visuals and reporting to understanding digital workflows and building simple internal tools.",
    "about.cta": "Let's Collaborate",

    // Portfolio Section
    "portfolio.label": "Portfolio",
    "portfolio.title": "Featured Works",
    "portfolio.all_behance": "All Works on Behance →",
    "portfolio.tab_ecommerce": "E-commerce & Promo",
    "portfolio.tab_print": "Print & Branding",
    "portfolio.tab_github": "GitHub Projects",
    "portfolio.view_project": "View Project →",
    "portfolio.view_repo": "View Repo →",

    // Portfolio Items - E-commerce
    "portfolio.ec1_title": "Flash Sale Banner Series",
    "portfolio.ec1_desc": "Promotional banner series for Shopee flash sale campaign — 15 size variations, 3-day turnaround.",
    "portfolio.ec2_title": "Product Photography Layout",
    "portfolio.ec2_desc": "Product visual templates for 100+ SKUs of DW Group store — consistent across all marketplace platforms.",
    "portfolio.ec3_title": "Shopee Store Visual Identity",
    "portfolio.ec3_desc": "Complete store decoration design: main banners, category banners, vouchers, and product highlights.",
    "portfolio.ec4_title": "Social Media Content Pack",
    "portfolio.ec4_desc": "Instagram & TikTok content pack for product promotion — feeds, stories, reels covers, and highlights.",
    "portfolio.ec5_title": "Voucher & Promo Asset System",
    "portfolio.ec5_desc": "Reusable voucher design system & promo assets — adaptable for various monthly campaigns.",
    "portfolio.ec6_title": "Packaging & Product Labels",
    "portfolio.ec6_desc": "E-commerce product packaging & label design — print-ready stickers, box inserts, and hang tags.",

    // Portfolio Items - Print
    "portfolio.print1_title": "Company Profile Brochure",
    "portfolio.print1_desc": "Corporate brochure design with editorial layout — 24 pages, ready-to-print in CMYK.",
    "portfolio.print2_title": "Book & Magazine Layout",
    "portfolio.print2_desc": "Book and magazine layout using InDesign — typesetting, grid system, and master pages.",
    "portfolio.print3_title": "Large Format Banner Series",
    "portfolio.print3_desc": "Large format banner designs for outdoor events and promotions, various custom dimensions.",
    "portfolio.print4_title": "Custom Stickers & Labels",
    "portfolio.print4_desc": "Custom stickers and label design — cutting paths, spot colors, vinyl/glossy/matte materials.",
    "portfolio.print5_title": "Neon Box & Signage",
    "portfolio.print5_desc": "Retail store signage and neon box design — accurate dimensions, ready for vendor fabrication.",
    "portfolio.print6_title": "Brand Identity & Logo",
    "portfolio.print6_desc": "Brand visual identity development — logo, color palette, typography, and brand guidelines.",

    // Portfolio Items - GitHub
    "portfolio.gh1_title": "Next.js Web Application",
    "portfolio.gh1_desc": "Modern web app built with Next.js — routing, SSR, and reusable components for business needs.",
    "portfolio.gh2_title": "Mobile App with Capacitor",
    "portfolio.gh2_desc": "Converting web app to mobile Android/iOS using Capacitor — single codebase, cross-platform.",
    "portfolio.gh3_title": "Desktop App with Electron",
    "portfolio.gh3_desc": "Cross-platform desktop application (Windows/Mac/Linux) with Electron & modern web interface.",
    "portfolio.gh4_title": "Vite + Vanilla JS Toolkit",
    "portfolio.gh4_desc": "Frontend starter kit with Vite — fast build, HMR, and clean, scalable project structure.",
    "portfolio.gh5_title": "Design-to-Web Automation Tool",
    "portfolio.gh5_desc": "Automation scripts for converting design assets to web-ready format — image optimization, batch renaming, export.",
    "portfolio.gh6_title": "Personal Webfolio (This Site)",
    "portfolio.gh6_desc": "Source code of this webfolio — pure HTML/CSS/JS, custom design, scroll animations, and AI chatbot.",

    "portfolio.bottom_cta": "View all design works on Behance & dev projects on GitHub",
    "portfolio.btn_behance_bottom": "Behance Portfolio",
    "portfolio.btn_github_bottom": "GitHub Repos",

    // Instagram Section
    "ig.label": "Instagram",
    "ig.title": "Recent Activity",
    "ig.follow": "Follow @iki.rieyu →",

    // Experience Section
    "exp.label": "Experience",
    "exp.title": "Career Journey",
    "exp.present": "2026–present",

    "exp.job1_title": "Graphic Designer",
    "exp.job1_company": "Image Print / Printup",
    "exp.job1_li1": "Daily print material design: banners, stickers, brochures, neon boxes",
    "exp.job1_li2": "Design production for commercial digital printing needs",
    "exp.job1_li3": "Prepress file preparation & quality control before print production",
    "exp.job1_li4": "Operation & coordination with printing & cutting machinery",

    "exp.job2_title": "E-commerce Specialist",
    "exp.job2_company": "DW Group",
    "exp.job2_li1": "Managing <strong>100+ products</strong> on Shopee platform end-to-end",
    "exp.job2_li2": "Producing <strong>20+ promotional designs per week</strong> consistently",
    "exp.job2_li3": "Developing online store visuals from concept to production-ready",
    "exp.job2_li4": "Content and campaign material optimization to boost conversion",

    "exp.job3_title": "Graphic Designer",
    "exp.job3_company": "Ruang Print",
    "exp.job3_li1": "Brochure, banner, and promotional print material design",
    "exp.job3_li2": "Book and magazine layout using InDesign",
    "exp.job3_li3": "Print-ready prepress file preparation",

    "exp.job4_title": "Graphic Designer",
    "exp.job4_company": "Dstar Digital Printing",
    "exp.job4_li1": "Print material design (stickers, banners, packaging, neon boxes)",
    "exp.job4_li2": "Direct operation of printing and cutting machines",
    "exp.job4_li3": "Quality control for print results and finishing",

    "exp.job5_title": "Graphic Designer",
    "exp.job5_company": "Abi Kreasindo",
    "exp.job5_li1": "Daily promotional material production for retail clients",
    "exp.job5_li2": "Print design: brochures, business cards, x-banners",

    // Skills Section
    "skills.label": "Skills",
    "skills.title": "Core Skills",
    "skills.cat1_title": "E-commerce & Marketplace",
    "skills.cat2_title": "Visual & Campaign",
    "skills.cat3_title": "Data & Operations",
    "skills.cat4_title": "Web & Technical",
    "skills.it_pc": "HTML / CSS / JavaScript",
    "skills.it_os": "React / TypeScript / Vite",
    "skills.it_lan": "Supabase / Local Storage",
    "skills.it_hw": "Capacitor / Electron",

    // Contact Section
    "contact.label": "Contact",
    "contact.heading": "Need someone who understands marketplaces and visuals? <br/><em>Let's talk.</em>",
    "contact.sub": "Open to full-time, freelance, and e-commerce collaborations across marketplace operations, catalog, campaigns, visual content, and digital workflows.",

    // Footer
    "footer.copy": "© 2026 Diki Permana — E-commerce & Marketplace Specialist · Jakarta, Indonesia.",

    // Chatbot UI
    "chatbot.title": "Diki AI Assistant",
    "chatbot.sub": "Online • Ask anything about Diki",
    "chatbot.placeholder": "Ask something about Diki...",
    "chatbot.chip1": "Diki's work experience?",
    "chatbot.chip2": "Key skills & tools?",
    "chatbot.chip3": "How to contact Diki?",
    "chatbot.chip4": "Diki's latest projects?",
  }
};

const SKILL_ITEMS = {
  id: [
    [
      "Shopee / Tokopedia / Lazada / TikTok Shop",
      "Product Listing & Catalog",
      "Campaign / Voucher / Promotion",
      "Marketplace Ads & Optimization"
    ],
    [
      "Adobe Photoshop / Illustrator",
      "Product & Store Visual",
      "Banner / Social Media Content",
      "Print & Prepress"
    ],
    [
      "Microsoft Excel",
      "Order & Customer Management",
      "SKU / Stock Monitoring",
      "Sales & Campaign Reporting"
    ],
    [
      "HTML / CSS / JavaScript",
      "React / TypeScript / Vite",
      "Supabase / Local Storage",
      "Capacitor / Electron"
    ]
  ],
  en: [
    [
      "Shopee / Tokopedia / Lazada / TikTok Shop",
      "Product Listing & Catalog",
      "Campaign / Voucher / Promotion",
      "Marketplace Ads & Optimization"
    ],
    [
      "Adobe Photoshop / Illustrator",
      "Product & Store Visuals",
      "Banner / Social Media Content",
      "Print & Prepress"
    ],
    [
      "Microsoft Excel",
      "Order & Customer Management",
      "SKU / Stock Monitoring",
      "Sales & Campaign Reporting"
    ],
    [
      "HTML / CSS / JavaScript",
      "React / TypeScript / Vite",
      "Supabase / Local Storage",
      "Capacitor / Electron"
    ]
  ]
};

let currentLang = localStorage.getItem('webfolio_lang') || 'id';

function setLanguage(lang) {
  if (!TRANSLATIONS[lang]) return;
  currentLang = lang;
  localStorage.setItem('webfolio_lang', lang);
  document.documentElement.lang = lang;

  // Update elements with data-i18n
  const elements = document.querySelectorAll('[data-i18n]');
  elements.forEach(el => {
    const key = el.getAttribute('data-i18n');
    const translation = TRANSLATIONS[lang][key];
    if (translation !== undefined) {
      if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') {
        el.placeholder = translation;
      } else {
        el.innerHTML = translation;
      }
    }
  });

  // Skills use structured lists so the four cards stay focused on the target role.
  const skillLists = document.querySelectorAll('.skill-card ul');
  const localizedSkills = SKILL_ITEMS[lang] || SKILL_ITEMS.id;
  skillLists.forEach((list, index) => {
    const items = localizedSkills[index];
    if (!items) return;
    list.innerHTML = items.map(item => `<li>${item}</li>`).join('');
  });

  // Update active state on all toggle buttons (desktop & mobile)
  const toggles = document.querySelectorAll('.lang-toggle');
  toggles.forEach(toggle => {
    const btns = toggle.querySelectorAll('.lang-btn');
    btns.forEach(btn => {
      if (btn.dataset.lang === lang) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });
  });

  // Dispatch custom event for chatbot & typing effect
  window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
}

function getCurrentLanguage() {
  return currentLang;
}

// Auto init on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  setLanguage(currentLang);
});