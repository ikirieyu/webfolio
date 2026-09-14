/* ============================================================
   Diki Permana Webfolio — Floating UI Runtime
   Chatbot + quick section navigation
   ============================================================ */
(function () {
  'use strict';

  if (window.__DIKI_CHATBOT_RUNTIME__) return;
  window.__DIKI_CHATBOT_RUNTIME__ = true;

  const PROFILE = {
    name: 'Diki Permana',
    role: 'E-commerce & Marketplace Specialist',
    location: 'Jakarta, Indonesia',
    experience: '4+',
    managedProducts: '100+',
    promoDesigns: '20+',
    contact: {
      email: 'ikirieyu@gmail.com',
      whatsapp: '0822-9738-5614',
      whatsappUrl: 'https://wa.me/6282297385614',
      instagram: '@iki.rieyu',
      instagramUrl: 'https://www.instagram.com/iki.rieyu',
      behance: 'behance.net/ikirieyu',
      behanceUrl: 'https://www.behance.net/ikirieyu',
      github: 'github.com/ikirieyu',
      githubUrl: 'https://github.com/ikirieyu'
    },
    skills: {
      ecommerce: ['Marketplace Operations', 'Product Listing & Catalog', 'Campaign & Voucher', 'Marketplace Ads', 'Store Optimization', 'Order & Customer Flow'],
      visual: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'CorelDraw', 'Product Visual', 'Campaign Design', 'Prepress & Print Production'],
      data: ['Microsoft Excel', 'SKU & Stock Monitoring', 'Reporting', 'Catalog Management'],
      technical: ['HTML / CSS / JavaScript', 'React / TypeScript / Vite', 'Supabase', 'IndexedDB / Local Storage', 'Capacitor', 'Electron']
    },
    jobs: [
      { company: 'Image Print / Printup', title: 'Graphic Designer', period: '2026–sekarang', points: ['Desain kebutuhan digital printing komersial', 'Prepress dan quality control', 'Koordinasi printing dan cutting'] },
      { company: 'DW Group', title: 'E-commerce Specialist', period: '2023–2025', points: ['Mengelola 100+ produk/SKU', 'Memproduksi 20+ desain promosi per minggu', 'Listing, campaign, visual toko, dan optimasi konten marketplace'] },
      { company: 'Ruang Print', title: 'Graphic Designer', period: '2022–2023', points: ['Desain brosur, banner, dan materi promosi', 'Layout buku/majalah dan persiapan prepress'] },
      { company: 'Dstar Digital Printing', title: 'Graphic Designer', period: '2020–2022', points: ['Desain kebutuhan cetak', 'Operasi mesin printing/cutting dan quality control'] },
      { company: 'Abi Kreasindo', title: 'Graphic Designer', period: '2019–2020', points: ['Produksi materi promosi harian', 'Brosur, kartu nama, dan x-banner'] }
    ]
  };

  const CHAT = {
    open: false,
    sending: false,
    history: [],
    lastProjectId: null
  };

  const NAV_ITEMS = [
    ['hero', 'Home', 'H'],
    ['about', 'About', 'A'],
    ['portfolio', 'Portfolio', 'P'],
    ['instagram', 'Activity', 'R'],
    ['experience', 'Experience', 'E'],
    ['skills', 'Skills', 'S'],
    ['contact', 'Contact', 'C']
  ];

  function lang() {
    try {
      return typeof window.getCurrentLanguage === 'function' ? window.getCurrentLanguage() : 'id';
    } catch (_) {
      return 'id';
    }
  }

  function localized(value, language = lang()) {
    if (value == null) return '';
    if (typeof value === 'string') return value;
    return value[language] || value.id || value.en || '';
  }

  function normalize(value = '') {
    return String(value)
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9+#./\-\s]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  function includesAny(text, phrases) {
    const q = normalize(text);
    return phrases.some(phrase => q.includes(normalize(phrase)));
  }

  function escapeHtml(value = '') {
    return String(value)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function renderMarkdown(text) {
    let safe = escapeHtml(text);
    safe = safe.replace(
      /\[([^\]]+)\]\(((?:https?:\/\/|project\.html\?id=|#[a-z0-9_-]+)[^)]+)\)/gi,
      (_, label, href) => `<a href="${href}" ${href.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>${label}</a>`
    );
    safe = safe.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    safe = safe.replace(/\n/g, '<br>');
    return safe;
  }

  async function ensureProjects() {
    try {
      if (Array.isArray(window.MODULAR_PORTFOLIO_DATA) && window.MODULAR_PORTFOLIO_DATA.length) return window.MODULAR_PORTFOLIO_DATA;
      if (window.PORTFOLIO_READY) await window.PORTFOLIO_READY;
      else if (typeof window.loadProjectRegistry === 'function') await window.loadProjectRegistry();
    } catch (_) {}

    if (Array.isArray(window.MODULAR_PORTFOLIO_DATA)) return window.MODULAR_PORTFOLIO_DATA;
    try {
      if (typeof PORTFOLIO_DATA !== 'undefined' && Array.isArray(PORTFOLIO_DATA)) return PORTFOLIO_DATA;
    } catch (_) {}
    return [];
  }

  function projects() {
    let list = [];
    if (Array.isArray(window.MODULAR_PORTFOLIO_DATA) && window.MODULAR_PORTFOLIO_DATA.length) list = window.MODULAR_PORTFOLIO_DATA;
    else {
      try { if (typeof PORTFOLIO_DATA !== 'undefined') list = PORTFOLIO_DATA; } catch (_) {}
    }
    return (list || []).filter(p => p && p.published !== false).sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
  }

  function findProject(query) {
    const q = normalize(query);
    const words = q.split(' ').filter(w => w.length > 2);
    let best = null;
    let score = 0;

    projects().forEach(project => {
      const title = localized(project.title);
      const hay = normalize([
        project.id, project.category, project.label, project.year, project.role,
        title, localized(project.description), localized(project.overview), localized(project.challenge), localized(project.approach),
        ...(project.tags || [])
      ].filter(Boolean).join(' '));
      let current = 0;
      if (project.id && q.includes(normalize(project.id))) current += 12;
      if (title && q.includes(normalize(title))) current += 12;
      words.forEach(word => { if (hay.includes(word)) current += 1; });
      if (current > score) { score = current; best = project; }
    });

    return score >= 3 ? best : null;
  }

  function projectAnswer(project, mode = 'overview') {
    const language = lang();
    const title = localized(project.title, language);
    const description = localized(project.description, language);
    const overview = localized(project.overview, language) || description;
    const challenge = localized(project.challenge, language);
    const approach = localized(project.approach, language);
    const caseUrl = `project.html?id=${encodeURIComponent(project.id)}`;
    const repoUrl = project.repoUrl || (project.category === 'github' ? project.externalLink : '');
    CHAT.lastProjectId = project.id;

    if (mode === 'challenge' && challenge) {
      return language === 'en'
        ? `The main challenge in **${title}** was:\n\n${challenge}\n\n[Open case study](${caseUrl})`
        : `Tantangan utama di **${title}**:\n\n${challenge}\n\n[Buka case study](${caseUrl})`;
    }
    if (mode === 'approach' && approach) {
      return language === 'en'
        ? `The approach used in **${title}**:\n\n${approach}\n\n[Open case study](${caseUrl})`
        : `Pendekatan yang dipakai di **${title}**:\n\n${approach}\n\n[Buka case study](${caseUrl})`;
    }

    const repo = repoUrl ? `\n• [${language === 'en' ? 'Open GitHub repository' : 'Buka repository GitHub'}](${repoUrl})` : '';
    return `**${title}**${project.year ? ` · ${project.year}` : ''}\n\n${overview || description || ''}\n\n• [${language === 'en' ? 'Open case study' : 'Buka case study'}](${caseUrl})${repo}`;
  }

  function projectList(category = null) {
    const language = lang();
    const list = projects().filter(p => !category || p.category === category);
    if (!list.length) return language === 'en' ? 'No published projects in that category yet.' : 'Belum ada project yang dipublikasikan di kategori itu.';
    const rows = list.slice(0, 10).map(p => `• [${localized(p.title, language)}](project.html?id=${encodeURIComponent(p.id)})${p.year ? ` — ${p.year}` : ''}`).join('\n');
    return language === 'en' ? `Published projects:\n\n${rows}` : `Project yang sudah dipublikasikan:\n\n${rows}`;
  }

  function contactAnswer() {
    const c = PROFILE.contact;
    return `• **Email:** ${c.email}\n• **WhatsApp:** [${c.whatsapp}](${c.whatsappUrl})\n• **Instagram:** [${c.instagram}](${c.instagramUrl})\n• **Behance:** [${c.behance}](${c.behanceUrl})\n• **GitHub:** [${c.github}](${c.githubUrl})`;
  }

  function localAnswer(message) {
    const language = lang();
    const q = normalize(message);
    const project = findProject(message);

    if (includesAny(q, ['halo','hai','hello','hi','hey'])) {
      return language === 'en'
        ? `Hello! 👋 I'm Diki's portfolio assistant. Ask about **experience, e-commerce, projects, skills, or contact details**.`
        : `Halo! 👋 Saya asisten portfolio **Diki Permana**. Tanya soal **pengalaman, e-commerce, project, skill, atau kontak**.`;
    }

    if (project) {
      if (includesAny(q, ['tantangan','challenge','masalah'])) return projectAnswer(project, 'challenge');
      if (includesAny(q, ['solusi','pendekatan','approach','arsitektur','architecture'])) return projectAnswer(project, 'approach');
      return projectAnswer(project);
    }

    const last = CHAT.lastProjectId ? projects().find(p => p.id === CHAT.lastProjectId) : null;
    if (last && includesAny(q, ['tantangannya','challenge nya','masalahnya'])) return projectAnswer(last, 'challenge');
    if (last && includesAny(q, ['solusinya','pendekatannya','approach nya','arsitekturnya'])) return projectAnswer(last, 'approach');

    if (includesAny(q, ['siapa diki','tentang diki','profil diki','who is diki','about diki'])) {
      return language === 'en'
        ? `**${PROFILE.name}** is an **${PROFILE.role}** based in ${PROFILE.location}. He combines marketplace operations, visual production, print knowledge, and technical workflow.`
        : `**${PROFILE.name}** adalah **${PROFILE.role}** berbasis di ${PROFILE.location}. Kekuatan utamanya adalah menggabungkan operasional marketplace, visual, pengalaman produksi cetak, dan workflow teknis.`;
    }

    if (includesAny(q, ['pengalaman','experience','riwayat kerja','career','karir','cv','resume'])) {
      return PROFILE.jobs.map(job => `• **${job.title}** di ${job.company} — ${job.period}`).join('\n');
    }

    const job = PROFILE.jobs.find(job => q.includes(normalize(job.company.split('/')[0])) || q.includes(normalize(job.company)));
    if (job) return `**${job.title} — ${job.company}** (${job.period})\n\n${job.points.map(p => `• ${p}`).join('\n')}`;

    if (includesAny(q, ['project github','github project','repo','repository','digital project'])) return projectList('github');
    if (includesAny(q, ['project ecommerce','project e-commerce','marketplace project','case study ecommerce'])) return projectList('ecommerce');
    if (includesAny(q, ['portfolio','karya','case study','project','projects'])) return projectList();

    if (includesAny(q, ['skill','skills','keahlian','kemampuan','bisa apa','tools','software'])) {
      return Object.entries(PROFILE.skills).map(([group, items]) => `**${group.toUpperCase()}**\n${items.map(item => `• ${item}`).join('\n')}`).join('\n\n');
    }

    if (includesAny(q, ['shopee','tokopedia','lazada','tiktok shop','marketplace','ecommerce','e-commerce','katalog','catalog','campaign','voucher','iklan'])) {
      return language === 'en'
        ? `Diki's e-commerce scope includes **marketplace operations, catalog/listing, campaign & voucher, marketplace ads, store optimization, order/customer flow, and e-commerce visual production**. He has handled **${PROFILE.managedProducts} products/SKUs**.`
        : `Scope e-commerce Diki mencakup **marketplace operations, listing/katalog, campaign & voucher, marketplace ads, store optimization, order/customer flow, dan produksi visual e-commerce**. Ia pernah menangani **${PROFILE.managedProducts} produk/SKU**.`;
    }

    if (includesAny(q, ['react','typescript','javascript','vite','supabase','capacitor','electron','indexeddb','local storage','coding','developer','web app'])) {
      return `Stack teknis Diki mencakup **HTML/CSS/JavaScript, React, TypeScript, Vite, Supabase, IndexedDB/local storage, Capacitor, dan Electron**.`;
    }

    if (includesAny(q, ['photoshop','illustrator','indesign','coreldraw','desain grafis','visual','branding','print','prepress'])) {
      return `Diki menggunakan **Photoshop, Illustrator, InDesign, dan CorelDraw**, serta berpengalaman di visual e-commerce, campaign assets, branding, prepress, dan produksi cetak.`;
    }

    if (includesAny(q, ['kontak','contact','whatsapp','wa','email','instagram','behance','hubungi','nomor'])) return contactAnswer();

    if (includesAny(q, ['hire','rekrut','recruit','available','open to work','freelance','full time','full-time','kolaborasi'])) {
      return language === 'en'
        ? `Yes. Diki is open to full-time, freelance, and e-commerce collaborations.\n\n${contactAnswer()}`
        : `Ya. Diki terbuka untuk full-time, freelance, dan kolaborasi e-commerce.\n\n${contactAnswer()}`;
    }

    if (includesAny(q, ['gaji','salary','rate','fee','harga jasa'])) {
      return language === 'en'
        ? `Salary and project rates are discussed based on role and scope. Contact Diki directly via [WhatsApp](${PROFILE.contact.whatsappUrl}).`
        : `Gaji atau rate project dibicarakan berdasarkan role dan scope. Hubungi Diki langsung lewat [WhatsApp](${PROFILE.contact.whatsappUrl}).`;
    }

    return null;
  }

  function buildContext() {
    const language = lang();
    return [
      `Name: ${PROFILE.name}`,
      `Role: ${PROFILE.role}`,
      `Location: ${PROFILE.location}`,
      `Experience: ${PROFILE.experience} years`,
      `Skills: ${Object.values(PROFILE.skills).flat().join(', ')}`,
      `Projects: ${projects().map(p => `${localized(p.title, language)} (${p.category})`).join('; ')}`,
      `Contact: ${PROFILE.contact.email}; ${PROFILE.contact.whatsapp}; ${PROFILE.contact.github}`
    ].join('\n');
  }

  async function remoteAnswer(message) {
    const endpoint = (window.DIKI_CHATBOT_CONFIG && window.DIKI_CHATBOT_CONFIG.endpoint) || window.DIKI_CHATBOT_AI_ENDPOINT || '';
    if (!endpoint) return null;

    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message, language: lang(), history: CHAT.history.slice(-8), portfolioContext: buildContext() }),
        signal: controller.signal
      });
      if (!response.ok) return null;
      const data = await response.json();
      return typeof data.reply === 'string' ? data.reply.trim() : null;
    } catch (_) {
      return null;
    } finally {
      clearTimeout(timer);
    }
  }

  async function answer(message) {
    await ensureProjects();
    const local = localAnswer(message);
    if (local) return local;
    const remote = await remoteAnswer(message);
    if (remote) return remote;
    return lang() === 'en'
      ? `I can answer anything **about Diki and this portfolio** from the live site data. Unrestricted general-AI questions require a secure AI backend. Try asking about projects, experience, marketplace work, skills, or contact details.`
      : `Saya bisa jawab hampir semua hal **tentang Diki dan portfolio ini** dari data website. Untuk pertanyaan umum tanpa batas seperti AI penuh, perlu backend AI yang aman. Coba tanya project, pengalaman marketplace, skill, atau kontak Diki.`;
  }

  function injectStyles() {
    if (document.getElementById('diki-floating-ui-style')) return;
    const style = document.createElement('style');
    style.id = 'diki-floating-ui-style';
    style.textContent = `
      #chat-fab{position:fixed!important;right:24px!important;bottom:24px!important;width:58px!important;height:58px!important;border:0!important;border-radius:999px!important;background:#1b4d3e!important;color:#fff!important;display:flex!important;align-items:center!important;justify-content:center!important;cursor:pointer!important;z-index:2147483000!important;box-shadow:0 10px 30px rgba(27,77,62,.34)!important;visibility:visible!important;opacity:1!important;transform:none!important}
      #chat-fab svg{width:24px;height:24px;pointer-events:none}
      #chat-fab .fab-close{display:none}
      #chat-fab.is-open .fab-chat{display:none}
      #chat-fab.is-open .fab-close{display:block}
      #chat-fab::after{content:'';position:absolute;inset:-4px;border:1px solid rgba(27,77,62,.28);border-radius:inherit;animation:dikiFabPulse 2.4s ease-out infinite;pointer-events:none}
      @keyframes dikiFabPulse{0%{transform:scale(1);opacity:.8}70%,100%{transform:scale(1.35);opacity:0}}
      #chat-panel{position:fixed!important;right:24px!important;bottom:94px!important;width:min(380px,calc(100vw - 32px))!important;height:min(560px,72vh)!important;background:#fff!important;border:1px solid rgba(27,77,62,.15)!important;border-radius:22px!important;box-shadow:0 24px 80px rgba(0,0,0,.18)!important;z-index:2147483001!important;display:flex!important;flex-direction:column!important;overflow:hidden!important;opacity:0!important;visibility:hidden!important;pointer-events:none!important;transform:translateY(14px) scale(.97)!important;transform-origin:bottom right!important;transition:.22s ease!important}
      #chat-panel.open{opacity:1!important;visibility:visible!important;pointer-events:auto!important;transform:none!important}
      .diki-chat-head{background:#1b4d3e;color:#fff;padding:14px 15px;display:flex;align-items:center;gap:10px}
      .diki-chat-avatar{width:38px;height:38px;border-radius:50%;background:#fff;display:flex;align-items:center;justify-content:center;overflow:hidden;border:2px solid #c5e84a;flex:none}
      .diki-chat-avatar img{width:100%;height:100%;object-fit:contain}
      .diki-chat-headcopy{min-width:0;flex:1}.diki-chat-headcopy strong{display:block;font-size:14px}.diki-chat-headcopy span{display:block;font-size:11px;opacity:.7;margin-top:2px}
      #chat-close-btn{width:30px;height:30px;border:0;border-radius:50%;background:rgba(255,255,255,.12);color:#fff;font-size:20px;cursor:pointer}
      #chat-messages{flex:1;overflow:auto;padding:14px;display:flex;flex-direction:column;gap:10px;background:#fbfaf7}
      .chat-msg{max-width:88%;display:flex}.chat-msg-bot{align-self:flex-start}.chat-msg-user{align-self:flex-end}.chat-bubble{padding:10px 13px;border-radius:15px;font-size:13px;line-height:1.55;word-break:break-word}.chat-msg-bot .chat-bubble{background:#fff;border:1px solid #e0ded8;color:#171815}.chat-msg-user .chat-bubble{background:#1b4d3e;color:#fff}.chat-bubble a{color:#1b4d3e;text-decoration:underline;font-weight:700}.chat-msg-user .chat-bubble a{color:#fff}.chat-bubble strong{font-weight:700}
      #chat-suggestions{display:flex;gap:6px;flex-wrap:wrap;padding:0 12px 10px;background:#fbfaf7}.suggestion-chip{border:1px solid rgba(27,77,62,.18);background:#edf4f1;color:#1b4d3e;border-radius:999px;padding:6px 10px;font-size:11px;font-weight:700;cursor:pointer}
      .chat-input-area{display:flex;gap:8px;padding:10px 12px;border-top:1px solid #e2e0da;background:#fff}.chat-input{min-width:0;flex:1;border:1px solid #d8d6d0;background:#f6f5f1;border-radius:999px;padding:10px 14px;font:inherit;font-size:13px;outline:none}.chat-input:focus{border-color:#1b4d3e}.chat-send-btn{width:38px;height:38px;border:0;border-radius:50%;background:#1b4d3e;color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;flex:none}.chat-typing{display:flex;gap:4px}.chat-typing i{width:6px;height:6px;background:#92968f;border-radius:50%;animation:dikiDot 1s infinite}.chat-typing i:nth-child(2){animation-delay:.12s}.chat-typing i:nth-child(3){animation-delay:.24s}@keyframes dikiDot{50%{transform:translateY(-4px);opacity:.45}}
      #quick-nav{position:fixed;right:26px;bottom:100px;z-index:2147482990;display:flex;flex-direction:column;align-items:flex-end;gap:10px;transition:.2s ease}
      #quick-nav.is-chat-open{opacity:0;visibility:hidden;pointer-events:none;transform:translateY(8px)}
      .quick-nav-menu{display:flex;flex-direction:column;gap:6px;padding:8px;border:2px solid #1b4d3e;border-radius:999px;background:rgba(255,255,255,.92);box-shadow:0 12px 28px rgba(0,0,0,.1);backdrop-filter:blur(10px)}
      .quick-nav-link{position:relative;width:42px;height:42px;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#1b4d3e;text-decoration:none;font:700 12px/1 Inter,sans-serif;transition:.18s ease}.quick-nav-link:hover,.quick-nav-link.active{background:#009c4b;color:#fff}.quick-nav-link span{position:absolute;right:52px;white-space:nowrap;background:#171815;color:#fff;border-radius:7px;padding:6px 9px;font-size:11px;opacity:0;transform:translateX(5px);pointer-events:none;transition:.16s ease}.quick-nav-link:hover span{opacity:1;transform:none}
      #quick-nav-toggle{display:none;width:52px;height:52px;border:2px solid #1b4d3e;border-radius:50%;background:#fff;color:#1b4d3e;box-shadow:0 10px 26px rgba(0,0,0,.12);align-items:center;justify-content:center;cursor:pointer}
      #quick-nav-toggle svg{width:22px;height:22px;transition:.2s ease}.quick-nav.open #quick-nav-toggle svg{transform:rotate(45deg)}
      @media(max-width:768px){#chat-fab{right:16px!important;bottom:18px!important;width:54px!important;height:54px!important}#chat-panel{right:12px!important;bottom:82px!important;width:calc(100vw - 24px)!important;height:min(600px,72vh)!important;border-radius:18px!important}#quick-nav{right:17px;bottom:82px}#quick-nav-toggle{display:flex}.quick-nav-menu{position:absolute;right:0;bottom:62px;opacity:0;visibility:hidden;pointer-events:none;transform:translateY(14px) scale(.95);transform-origin:bottom right;transition:.2s ease}.quick-nav.open .quick-nav-menu{opacity:1;visibility:visible;pointer-events:auto;transform:none}.quick-nav-link span{display:none}}
      @media(prefers-reduced-motion:reduce){#chat-fab::after,.chat-typing i{animation:none!important}#chat-panel,.quick-nav-menu{transition:none!important}}
    `;
    document.head.appendChild(style);
  }

  function chatShell() {
    let fab = document.getElementById('chat-fab');
    if (!fab) {
      fab = document.createElement('button');
      fab.id = 'chat-fab';
      fab.type = 'button';
      fab.setAttribute('aria-label', 'Buka chat asisten Diki');
      fab.setAttribute('aria-expanded', 'false');
      fab.innerHTML = `<span class="fab-chat"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg></span><span class="fab-close"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><path d="M6 6l12 12M18 6L6 18"/></svg></span>`;
      document.body.appendChild(fab);
    }

    let panel = document.getElementById('chat-panel');
    if (!panel) {
      panel = document.createElement('section');
      panel.id = 'chat-panel';
      panel.setAttribute('aria-hidden', 'true');
      panel.innerHTML = `
        <div class="diki-chat-head">
          <div class="diki-chat-avatar"><img src="asset/header.png" alt="" /></div>
          <div class="diki-chat-headcopy"><strong>Diki AI Assistant</strong><span>Online · Tanya tentang Diki & portfolio</span></div>
          <button id="chat-close-btn" type="button" aria-label="Tutup chat">×</button>
        </div>
        <div id="chat-messages" aria-live="polite"></div>
        <div id="chat-suggestions"></div>
        <div class="chat-input-area">
          <input id="chat-input" class="chat-input" type="text" maxlength="600" autocomplete="off" placeholder="Tanyakan sesuatu tentang Diki..." />
          <button id="chat-send-btn" class="chat-send-btn" type="button" aria-label="Kirim"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg></button>
        </div>`;
      document.body.appendChild(panel);
    }
    return { fab, panel };
  }

  function quickNavShell() {
    if (document.getElementById('quick-nav')) return document.getElementById('quick-nav');
    const nav = document.createElement('div');
    nav.id = 'quick-nav';
    nav.setAttribute('aria-label', 'Navigasi cepat');
    const links = NAV_ITEMS
      .filter(([id]) => document.getElementById(id))
      .map(([id, label, letter]) => `<a class="quick-nav-link" href="#${id}" data-quick-section="${id}" aria-label="${label}">${letter}<span>${label}</span></a>`)
      .join('');
    nav.innerHTML = `<div class="quick-nav-menu">${links}</div><button id="quick-nav-toggle" type="button" aria-label="Buka navigasi cepat" aria-expanded="false"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3v18M3 12h18"/></svg></button>`;
    document.body.appendChild(nav);
    return nav;
  }

  function appendMessage(role, text) {
    const messages = document.getElementById('chat-messages');
    if (!messages) return;
    const row = document.createElement('div');
    row.className = `chat-msg chat-msg-${role}`;
    const bubble = document.createElement('div');
    bubble.className = 'chat-bubble';
    if (role === 'user') bubble.textContent = text;
    else bubble.innerHTML = renderMarkdown(text);
    row.appendChild(bubble);
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;
  }

  function setTyping(show) {
    const messages = document.getElementById('chat-messages');
    if (!messages) return;
    const existing = document.getElementById('chat-typing');
    if (!show) { if (existing) existing.remove(); return; }
    if (existing) return;
    const row = document.createElement('div');
    row.id = 'chat-typing';
    row.className = 'chat-msg chat-msg-bot';
    row.innerHTML = '<div class="chat-bubble chat-typing"><i></i><i></i><i></i></div>';
    messages.appendChild(row);
    messages.scrollTop = messages.scrollHeight;
  }

  function renderSuggestions() {
    const el = document.getElementById('chat-suggestions');
    if (!el) return;
    const list = lang() === 'en'
      ? ["Diki's latest projects?", 'Marketplace experience?', 'Technical skills?', 'How can I contact Diki?']
      : ['Project terbaru Diki?', 'Pengalaman marketplace?', 'Skill teknis Diki?', 'Cara kontak Diki?'];
    el.innerHTML = '';
    list.forEach(text => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'suggestion-chip';
      btn.textContent = text;
      btn.addEventListener('click', () => sendMessage(text));
      el.appendChild(btn);
    });
  }

  function openChat() {
    CHAT.open = true;
    const panel = document.getElementById('chat-panel');
    const fab = document.getElementById('chat-fab');
    const quick = document.getElementById('quick-nav');
    if (!panel || !fab) return;
    panel.classList.add('open');
    panel.setAttribute('aria-hidden', 'false');
    fab.classList.add('is-open');
    fab.setAttribute('aria-expanded', 'true');
    quick?.classList.add('is-chat-open');
    const messages = document.getElementById('chat-messages');
    if (messages && !messages.children.length) {
      appendMessage('bot', lang() === 'en'
        ? `Hello! 👋 I'm Diki's portfolio assistant. Ask me about **experience, marketplace work, projects, skills, or contact details**.`
        : `Halo! 👋 Saya asisten portfolio **Diki Permana**. Tanya soal **pengalaman, marketplace, project, skill, atau kontak**.`);
      renderSuggestions();
    }
    setTimeout(() => document.getElementById('chat-input')?.focus(), 120);
  }

  function closeChat() {
    CHAT.open = false;
    const panel = document.getElementById('chat-panel');
    const fab = document.getElementById('chat-fab');
    const quick = document.getElementById('quick-nav');
    panel?.classList.remove('open');
    panel?.setAttribute('aria-hidden', 'true');
    fab?.classList.remove('is-open');
    fab?.setAttribute('aria-expanded', 'false');
    quick?.classList.remove('is-chat-open');
  }

  async function sendMessage(forced) {
    if (CHAT.sending) return;
    const input = document.getElementById('chat-input');
    const text = String(forced || input?.value || '').trim();
    if (!text) return;
    if (input) input.value = '';
    document.getElementById('chat-suggestions')?.replaceChildren();
    appendMessage('user', text);
    CHAT.history.push({ role: 'user', content: text });
    CHAT.sending = true;
    setTyping(true);
    try {
      const reply = await answer(text);
      await new Promise(resolve => setTimeout(resolve, 180));
      setTyping(false);
      appendMessage('bot', reply);
      CHAT.history.push({ role: 'assistant', content: reply });
      CHAT.history = CHAT.history.slice(-12);
    } catch (_) {
      setTyping(false);
      appendMessage('bot', lang() === 'en' ? 'Something went wrong. Please try again.' : 'Ada error saat menjawab. Coba kirim lagi.');
    } finally {
      CHAT.sending = false;
    }
  }

  function bindChat() {
    const fab = document.getElementById('chat-fab');
    if (!fab || fab.dataset.bound === '1') return;
    fab.dataset.bound = '1';
    fab.addEventListener('click', () => CHAT.open ? closeChat() : openChat());
    document.getElementById('chat-close-btn')?.addEventListener('click', closeChat);
    document.getElementById('chat-send-btn')?.addEventListener('click', () => sendMessage());
    document.getElementById('chat-input')?.addEventListener('keydown', event => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
      }
    });
  }

  function bindQuickNav() {
    const nav = document.getElementById('quick-nav');
    const toggle = document.getElementById('quick-nav-toggle');
    if (!nav || nav.dataset.bound === '1') return;
    nav.dataset.bound = '1';

    toggle?.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      toggle.setAttribute('aria-label', open ? 'Tutup navigasi cepat' : 'Buka navigasi cepat');
    });

    nav.querySelectorAll('.quick-nav-link').forEach(link => {
      link.addEventListener('click', event => {
        const id = link.dataset.quickSection;
        const target = document.getElementById(id);
        if (!target) return;
        event.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        nav.classList.remove('open');
        toggle?.setAttribute('aria-expanded', 'false');
      });
    });

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(entries => {
        const visible = entries
          .filter(entry => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        nav.querySelectorAll('.quick-nav-link').forEach(link => {
          link.classList.toggle('active', link.dataset.quickSection === visible.target.id);
        });
      }, { rootMargin: '-30% 0px -55% 0px', threshold: [0, .1, .25, .5] });
      NAV_ITEMS.forEach(([id]) => { const section = document.getElementById(id); if (section) observer.observe(section); });
    }
  }

  function boot() {
    if (!document.body) return;
    injectStyles();
    chatShell();
    quickNavShell();
    bindChat();
    bindQuickNav();
    ensureProjects();

    setTimeout(() => {
      const fab = document.getElementById('chat-fab');
      if (!fab) {
        chatShell();
        bindChat();
      } else {
        fab.style.setProperty('display', 'flex', 'important');
        fab.style.setProperty('visibility', 'visible', 'important');
        fab.style.setProperty('opacity', '1', 'important');
      }
    }, 1200);
  }

  window.DikiChat = { open: openChat, close: closeChat, send: sendMessage };

  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape') return;
    if (CHAT.open) closeChat();
    document.getElementById('quick-nav')?.classList.remove('open');
  });

  window.addEventListener('languageChanged', renderSuggestions);

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot, { once: true });
  else boot();
})();
