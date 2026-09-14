/* ============================================================
   CHATBOT — Diki Permana Webfolio
   Context-aware portfolio assistant + optional remote AI fallback
   ============================================================ */

const DIKI = {
  name: 'Diki Permana',
  role: 'E-commerce & Marketplace Specialist',
  secondaryRole: 'Graphic Designer / Digital Product Builder',
  location: 'Jakarta, Indonesia',
  experienceYears: '4+',
  stats: {
    promoDesignsPerWeek: '20+',
    managedProducts: '100+',
  },
  contact: {
    email: 'ikirieyu@gmail.com',
    whatsapp: '0822-9738-5614',
    whatsappUrl: 'https://wa.me/6282297385614',
    instagram: '@iki.rieyu',
    instagramUrl: 'https://www.instagram.com/iki.rieyu',
    behance: 'behance.net/ikirieyu',
    behanceUrl: 'https://www.behance.net/ikirieyu',
    github: 'github.com/ikirieyu',
    githubUrl: 'https://github.com/ikirieyu',
  },
  jobs: [
    {
      title: 'Graphic Designer',
      company: 'Image Print / Printup',
      period: '2026–sekarang',
      highlights: [
        'Desain materi cetak harian: banner, spanduk, stiker, brosur, dan neon box',
        'Produksi desain untuk kebutuhan digital printing skala komersial',
        'Persiapan file prepress dan quality control sebelum naik cetak',
        'Koordinasi dengan proses printing dan cutting',
      ],
    },
    {
      title: 'E-commerce Specialist',
      company: 'DW Group',
      period: '2023–2025',
      highlights: [
        'Mengelola 100+ produk di marketplace',
        'Memproduksi 20+ desain promosi per minggu',
        'Mengelola listing, campaign, materi promosi, dan visual toko online',
        'Optimasi konten dan materi kampanye untuk mendukung konversi',
      ],
    },
    {
      title: 'Graphic Designer',
      company: 'Ruang Print',
      period: '2022–2023',
      highlights: [
        'Desain brosur, banner, dan materi promosi cetak',
        'Layout buku dan majalah dengan InDesign',
        'Persiapan file prepress siap cetak',
      ],
    },
    {
      title: 'Graphic Designer',
      company: 'Dstar Digital Printing',
      period: '2020–2022',
      highlights: [
        'Desain stiker, spanduk, kemasan, dan neon box',
        'Operasi langsung mesin printing dan cutting',
        'Quality control hasil cetak dan finishing',
      ],
    },
    {
      title: 'Graphic Designer',
      company: 'Abi Kreasindo',
      period: '2019–2020',
      highlights: [
        'Produksi materi promosi harian untuk klien retail',
        'Desain brosur, kartu nama, dan x-banner',
      ],
    },
  ],
  skills: {
    ecommerce: [
      'Marketplace Operations',
      'Product Listing & Catalog',
      'Campaign & Voucher',
      'Marketplace Ads',
      'Store Optimization',
      'Order & Customer Flow',
    ],
    visual: [
      'Adobe Photoshop',
      'Adobe Illustrator',
      'Adobe InDesign',
      'CorelDraw',
      'Product Visual',
      'Campaign Design',
      'Prepress & Print Production',
    ],
    data: [
      'Microsoft Excel',
      'SKU & Stock Monitoring',
      'Reporting',
      'Catalog Management',
    ],
    technical: [
      'HTML / CSS / JavaScript',
      'React / TypeScript / Vite',
      'Supabase',
      'IndexedDB / Local Storage',
      'Capacitor',
      'Electron',
    ],
  },
};

const CHATBOT_CONFIG = {
  endpoint:
    (window.DIKI_CHATBOT_CONFIG && window.DIKI_CHATBOT_CONFIG.endpoint) ||
    window.DIKI_CHATBOT_AI_ENDPOINT ||
    '',
  timeoutMs: 15000,
};

const CHAT_STATE = {
  history: [],
  lastProjectId: null,
  sending: false,
};

const STOPWORDS = new Set([
  'yang','dan','di','ke','dari','untuk','itu','ini','ada','apa','apakah','gimana','bagaimana',
  'dengan','atau','bisa','kah','nya','tentang','dong','nih','ya','gue','saya','aku','kamu','diki',
  'the','a','an','is','are','of','to','for','and','or','about','can','could','please','tell','me',
  'his','him','he','what','how','does',
]);

function currentLang() {
  return typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'id';
}

function localize(value, lang = currentLang()) {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  return value[lang] || value.id || value.en || '';
}

function normalizeText(value = '') {
  return String(value)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9+#./\-\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokens(value = '') {
  return normalizeText(value)
    .split(' ')
    .filter(token => token.length > 1 && !STOPWORDS.has(token));
}

function includesAny(text, phrases) {
  const q = normalizeText(text);
  return phrases.some(phrase => q.includes(normalizeText(phrase)));
}

async function ensureProjectsLoaded() {
  try {
    if (Array.isArray(window.MODULAR_PORTFOLIO_DATA) && window.MODULAR_PORTFOLIO_DATA.length) {
      return window.MODULAR_PORTFOLIO_DATA;
    }
    if (window.PORTFOLIO_READY) await window.PORTFOLIO_READY;
    else if (typeof loadProjectRegistry === 'function') await loadProjectRegistry();
  } catch (_) {}

  return Array.isArray(window.MODULAR_PORTFOLIO_DATA) ? window.MODULAR_PORTFOLIO_DATA : [];
}

function publishedProjects() {
  return (window.MODULAR_PORTFOLIO_DATA || [])
    .filter(project => project && project.published !== false)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

function projectSearchText(project, lang) {
  const blocks = (project.blocks || []).map(block => [
    localize(block.kicker, lang),
    localize(block.title, lang),
    localize(block.body, lang),
  ].join(' ')).join(' ');

  return [
    project.id,
    project.category,
    project.label,
    project.year,
    project.role,
    localize(project.title, lang),
    localize(project.description, lang),
    localize(project.subtitle, lang),
    localize(project.overview, lang),
    localize(project.challenge, lang),
    localize(project.apach, lang),
    ...(project.tags || []),
    blocks,
  ].filter(Boolean).join(' ');
}

function findBestProject(query, lang) {
  const qNorm = normalizeText(query);
  const qTokens = new Set(tokens(query));
  let best = null;
  let bestScore = 0;

  publishedProjects().forEach(project => {
    const title = localize(project.title, lang);
    const haystack = normalizeText(projectSearchText(project, lang));
    let score = 0;

    if (project.id && qNorm.includes(normalizeText(project.id))) score += 12;
    if (title && qNorm.includes(normalizeText(title))) score += 12;

    tokens(title).forEach(token => {
      if (qTokens.has(token)) score += 3;
    });

    qTokens.forEach(token => {
      if (token.length >= 3 && haystack.includes(token)) score += 1;
    });

    (project.tags || []).forEach(tag => {
      if (qNorm.includes(normalizeText(tag))) score += 2;
    });

    if (score > bestScore) {
      best = project;
      bestScore = score;
    }
  });

  return bestScore >= 4 ? best : null;
}

function projectAnswer(project, lang, mode = 'overview') {
  const title = localize(project.title, lang);
  const overview = localize(project.overview, lang) || localize(project.description, lang);
  const challenge = localize(project.challenge, lang);
  const approach = localize(project.approach, lang);
  const tags = (project.tags || []).join(' · ');
  const internalUrl = `project.html?id=${encodeURIComponent(project.id)}`;
  const repoUrl = project.repoUrl || (project.category === 'github' ? project.externalLink : '');

  CHAT_STATE.lastProjectId = project.id;

  if (mode === 'challenge' && challenge) {
    return lang === 'en'
      ? `The main challenge in **${title}** was:\n\n${challenge}\n\n[Open the full case study](${internalUrl})`
      : `Tantangan utama di **${title}**:\n\n${challenge}\n\n[Buka case study lengkap](${internalUrl})`;
  }

  if (mode === 'approach' && approach) {
    return lang === 'en'
      ? `The approach used in **${title}**:\n\n${approach}\n\n[Open the full case study](${internalUrl})`
      : `Pendekatan yang dipakai di **${title}**:\n\n${approach}\n\n[Buka case study lengkap](${internalUrl})`;
  }

  const repoLine = repoUrl
    ? `\n• [${lang === 'en' ? 'Open GitHub repository' : 'Buka repository GitHub'}](${repoUrl})`
    : '';

  return lang === 'en'
    ? `**${title}**${project.year ? ` · ${project.year}` : ''}\n\n${overview || 'Project details are available in the case study.'}${tags ? `\n\n**Stack / tags:** ${tags}` : ''}\n\n• [Open case study](${internalUrl})${repoLine}`
    : `**${title}**${project.year ? ` · ${project.year}` : ''}\n\n${overview || 'Detail project tersedia di halaman case study.'}${tags ? `\n\n**Stack / tags:** ${tags}` : ''}\n\n• [Buka case study](${internalUrl})${repoLine}`;
}

function projectList(lang, category = null) {
  const list = publishedProjects().filter(project => !category || project.category === category);
  if (!list.length) {
    return lang === 'en' ? 'No published projects in that category yet.' : 'Belum ada project yang dipublikasikan di kategori itu.';
  }

  const rows = list.slice(0, 8).map(project => {
    const title = localize(project.title, lang);
    return `• [${title}](project.html?id=${encodeURIComponent(project.id)})${project.year ? ` — ${project.year}` : ''}`;
  }).join('\n');

  return lang === 'en'
    ? `Here are Diki's published projects:\n\n${rows}\n\nAsk about any project by name.`
    : `Ini project Diki yang sudah dipublikasikan:\n\n${rows}\n\nKalau mau detail, sebut nama project-nya.`;
}

function experienceAnswer(lang) {
  const rows = DIKI.jobs.map(job => `• **${job.title}** ${lang === 'en' ? 'at' : 'di'} ${job.company} — ${job.period}`).join('\n');
  return lang === 'en'
    ? `Diki has **${DIKI.experienceYears} years of work experience** across e-commerce, design, and print production:\n\n${rows}`
    : `Diki punya **${DIKI.experienceYears} tahun pengalaman kerja** di e-commerce, desain, dan print production:\n\n${rows}`;
}

function jobAnswer(job, lang) {
  const points = job.highlights.map(item => `• ${item}`).join('\n');
  return lang === 'en'
    ? `At **${job.company}** (${job.period}), Diki worked as **${job.title}**.\n\n${points}`
    : `Di **${job.company}** (${job.period}), Diki bekerja sebagai **${job.title}**.\n\n${points}`;
}

function skillsAnswer(lang) {
  const groups = [
    ['E-commerce & Marketplace', DIKI.skills.ecommerce],
    ['Visual & Campaign', DIKI.skills.visual],
    ['Data & Operations', DIKI.skills.data],
    ['Web & Technical', DIKI.skills.technical],
  ];

  return groups.map(([name, items]) => `**${name}**\n${items.map(item => `• ${item}`).join('\n')}`).join('\n\n');
}

function contactAnswer(lang) {
  return lang === 'en'
    ? `You can contact Diki through:\n\n• **Email:** ${DIKI.contact.email}\n• **WhatsApp:** [${DIKI.contact.whatsapp}](${DIKI.contact.whatsappUrl})\n• **Instagram:** [${DIKI.contact.instagram}](${DIKI.contact.instagramUrl})\n• **Behance:** [${DIKI.contact.behance}](${DIKI.contact.behanceUrl})\n• **GitHub:** [${DIKI.contact.github}](${DIKI.contact.githubUrl})`
    : `Diki bisa dihubungi lewat:\n\n• **Email:** ${DIKI.contact.email}\n• **WhatsApp:** [${DIKI.contact.whatsapp}](${DIKI.contact.whatsappUrl})\n• **Instagram:** [${DIKI.contact.instagram}](${DIKI.contact.instagramUrl})\n• **Behance:** [${DIKI.contact.behance}](${DIKI.contact.behanceUrl})\n• **GitHub:** [${DIKI.contact.github}](${DIKI.contact.githubUrl})`;
}

function profileAnswer(lang) {
  return lang === 'en'
    ? `**${DIKI.name}** is an **${DIKI.role}** based in ${DIKI.location}. His background also covers graphic design, print production, and web/app development.\n\nHe has managed **${DIKI.stats.managedProducts} products/SKUs** and produced **${DIKI.stats.promoDesignsPerWeek} promotional designs per week** in previous e-commerce work.`
    : `**${DIKI.name}** adalah **${DIKI.role}** berbasis di ${DIKI.location}. Background-nya juga mencakup graphic design, print production, dan web/app development.\n\nDi pengalaman e-commerce sebelumnya ia pernah menangani **${DIKI.stats.managedProducts} produk/SKU** dan memproduksi **${DIKI.stats.promoDesignsPerWeek} desain promosi per minggu**.`;
}

function whyHireAnswer(lang) {
  return lang === 'en'
    ? `For an e-commerce / marketplace role, Diki's strongest points are:\n\n• Understands operations, catalog, campaigns, and visuals as one system\n• Has handled ${DIKI.stats.managedProducts} products/SKUs\n• Can produce promotional assets at high volume\n• Understands print production and practical production constraints\n• Has technical skills in React, TypeScript, Supabase, local storage, Capacitor, and Electron`
    : `Untuk role e-commerce / marketplace, kekuatan Diki ada di sini:\n\n• Paham operasional, katalog, campaign, dan visual sebagai satu sistem\n• Pernah menangani ${DIKI.stats.managedProducts} produk/SKU\n• Terbiasa produksi materi promosi dalam volume tinggi\n• Paham print production dan batasan produksi nyata\n• Punya skill React, TypeScript, Supabase, local storage, Capacitor, dan Electron`;
}

function findJob(query) {
  const q = normalizeText(query);
  return DIKI.jobs.find(job => {
    const aliases = [job.company, ...job.company.split('/'), job.company.includes('DW Group') ? 'dw' : '', job.company.includes('Dstar') ? 'dstar' : ''];
    return aliases.some(alias => alias && q.includes(normalizeText(alias)));
  });
}

function getLastProject() {
  return publishedProjects().find(project => project.id === CHAT_STATE.lastProjectId) || null;
}

function localReply(query, lang) {
  const q = normalizeText(query);
  const project = findBestProject(query, lang);
  const job = findJob(query);

  if (includesAny(q, ['halo','hai','hello','hi','hey','selamat pagi','selamat siang','selamat sore','selamat malam'])) {
    return lang === 'en'
      ? `Hello! 👋 I'm Diki's portfolio assistant. Ask me about experience, marketplace skills, projects, GitHub work, portfolio, or contact details.`
      : `Halo! 👋 Saya asisten portfolio Diki. Tanya soal pengalaman kerja, skill marketplace, project, GitHub, portfolio, atau cara menghubungi Diki.`;
  }

  if (includesAny(q, ['makasih','terima kasih','thanks','thank you','mantap','sip'])) {
    return lang === 'en' ? `You're welcome! Ask anything else whenever you want.` : 'Sama-sama! Kalau masih ada yang mau ditanya, lanjut aja.';
  }

  if (includesAny(q, ['siapa diki','tentang diki','profil diki','who is diki','about diki'])) return profileAnswer(lang);
  if (includesAny(q, ['kontak','contact','whatsapp','email','instagram','behance','hubungi','nomor'])) return contactAnswer(lang);
  if (includesAny(q, ['kenapa pilih','kenapa hire','why hire','kelebihan diki','cocok gak','cocok tidak'])) return whyHireAnswer(lang);

  if (job) return jobAnswer(job, lang);
  if (includesAny(q, ['kerja sekarang','sekarang kerja','current job','currently work','pekerjaan sekarang'])) return jobAnswer(DIKI.jobs[0], lang);
  if (includesAny(q, ['pengalaman','experience','riwayat kerja','work history','career','karir','cv','resume'])) return experienceAnswer(lang);

  if (project) {
    if (includesAny(q, ['challenge','tantangan','masalah'])) return projectAnswer(project, lang, 'challenge');
    if (includesAny(q, ['approach','pendekatan','solusi','arsitektur','architecture'])) return projectAnswer(project, lang, 'approach');
    return projectAnswer(project, lang);
  }

  const lastProject = getLastProject();
  if (lastProject && includesAny(q, ['tantangannya','challenge nya','challenge-nya','masalahnya'])) return projectAnswer(lastProject, lang, 'challenge');
  if (lastProject && includesAny(q, ['pendekatannya','solusinya','approach nya','arsitekturnya'])) return projectAnswer(lastProject, lang, 'approach');

  if (includesAny(q, ['github project','project github','digital project','repo','repository','coding project'])) return projectList(lang, 'github');
  if (includesAny(q, ['project ecommerce','project e-commerce','marketplace project','case study ecommerce','case study e-commerce'])) return projectList(lang, 'ecommerce');
  if (includesAny(q, ['portfolio','karya','case study','project','projects','lihat karya'])) return projectList(lang);
  if (includesAny(q, ['skill','skills','keahlian','kemampuan','bisa apa','tools','software'])) return skillsAnswer(lang);

  if (includesAny(q, ['shopee','tokopedia','lazada','tiktok shop','marketplace','ecommerce','e-commerce','catalog','katalog','campaign','voucher','iklan'])) {
    return lang === 'en'
      ? `Diki's e-commerce strengths include **marketplace operations, product listing/catalog, campaigns & vouchers, marketplace ads, store optimization, customer/order flow, and e-commerce visual production**.`
      : `Kekuatan e-commerce Diki mencakup **marketplace operations, listing/katalog produk, campaign & voucher, marketplace ads, store optimization, customer/order flow, dan produksi visual e-commerce**.`;
  }

  if (includesAny(q, ['photoshop','illustrator','indesign','coreldraw','desain grafis','graphic design','visual','branding','print','prepress'])) {
    return lang === 'en'
      ? `Yes. Diki works with **Photoshop, Illustrator, InDesign, and CorelDraw**, with hands-on experience in e-commerce visuals, campaign assets, branding, prepress, and print production.`
      : `Ya. Diki menggunakan **Photoshop, Illustrator, InDesign, dan CorelDraw**, dengan pengalaman langsung di visual e-commerce, campaign assets, branding, prepress, dan produksi cetak.`;
  }

  if (includesAny(q, ['react','typescript','javascript','vite','supabase','capacitor','electron','indexeddb','local storage','coding','developer','web app','aplikasi'])) {
    return lang === 'en'
      ? `Diki also builds digital products using **HTML/CSS/JavaScript, React, TypeScript, Vite, Supabase, IndexedDB/local storage, Capacitor, and Electron**.`
      : `Diki juga membangun digital product dengan **HTML/CSS/JavaScript, React, TypeScript, Vite, Supabase, IndexedDB/local storage, Capacitor, dan Electron**.`;
  }

  if (includesAny(q, ['hire','rekrut','recruit','available for work','open to work','freelance','full time','full-time','kerja sama','kolaborasi'])) {
    return lang === 'en'
      ? `Yes. Diki is open to **full-time roles, freelance work, and e-commerce collaborations**.\n\n${contactAnswer(lang)}`
      : `Ya. Diki terbuka untuk **full-time, freelance, dan kolaborasi e-commerce**.\n\n${contactAnswer(lang)}`;
  }

  if (includesAny(q, ['gaji','salary','expected salary','rate','harga jasa','fee'])) {
    return lang === 'en'
      ? `Salary or project rates are not published here. Please discuss the role and scope directly with Diki via [WhatsApp](${DIKI.contact.whatsappUrl}) or email.`
      : `Ekspektasi gaji atau rate project tidak dipublikasikan di portfolio ini. Diskusikan role dan scope langsung lewat [WhatsApp](${DIKI.contact.whatsappUrl}) atau email.`;
  }

  if (includesAny(q, ['alamat','lokasi','tinggal dimana','berbasis dimana','location','where is diki'])) {
    return lang === 'en' ? `Diki is based in **${DIKI.location}**.` : `Diki berbasis di **${DIKI.location}**.`;
  }

  return null;
}

function buildPortfolioContext(lang) {
  const projectLines = publishedProjects().slice(0, 12).map(project =>
    `- ${localize(project.title, lang)} | ${project.category} | ${project.year || '-'} | ${localize(project.description, lang)} | tags: ${(project.tags || []).join(', ')}`
  );

  return [
    `Name: ${DIKI.name}`,
    `Role: ${DIKI.role}`,
    `Location: ${DIKI.location}`,
    `Experience: ${DIKI.experienceYears} years`,
    `Skills: ${Object.values(DIKI.skills).flat().join(', ')}`,
    `Work history: ${DIKI.jobs.map(job => `${job.title} at ${job.company} (${job.period})`).join('; ')}`,
    `Projects:\n${projectLines.join('\n')}`,
    `Contact: ${DIKI.contact.email}; ${DIKI.contact.whatsapp}; ${DIKI.contact.behance}; ${DIKI.contact.github}`,
  ].join('\n');
}

async function askRemoteAI(message, lang) {
  if (!CHATBOT_CONFIG.endpoint) return null;

  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), CHATBOT_CONFIG.timeoutMs);

  try {
    const response = await fetch(CHATBOT_CONFIG.endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        message,
        language: lang,
        history: CHAT_STATE.history.slice(-8),
        portfolioContext: buildPortfolioContext(lang),
      }),
      signal: controller.signal,
    });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return typeof data.reply === 'string' && data.reply.trim() ? data.reply.trim() : null;
  } catch (_) {
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function getReply(message) {
  const lang = currentLang();
  await ensureProjectsLoaded();

  const local = localReply(message, lang);
  if (local) return local;

  const remote = await askRemoteAI(message, lang);
  if (remote) return remote;

  return lang === 'en'
    ? `I can answer almost anything **about Diki and this portfolio**. For unrestricted general-AI questions, this site needs a secure AI backend.\n\nTry asking about projects, marketplace experience, skills, work history, availability, or contact details.`
    : `Saya bisa jawab hampir semua hal **tentang Diki dan portfolio ini**. Untuk pertanyaan umum tanpa batas seperti AI penuh, website ini perlu backend AI yang aman.\n\nCoba tanya project, pengalaman marketplace, skill, riwayat kerja, availability, atau cara kontak Diki.`;
}

const SUGGESTIONS = {
  id: ['Project terbaru Diki apa?', 'Pengalaman marketplace Diki?', 'Skill teknis Diki apa saja?', 'Kenapa cocok untuk role e-commerce?'],
  en: ["What are Diki's latest projects?", 'What marketplace experience does Diki have?', "What are Diki's technical skills?", 'Why is he a fit for e-commerce roles?'],
};

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
    /\[([^\]]+)\]\(((?:https?:\/\/|project\.html\?id=)[^)]+)\)/g,
    (_, label, href) => `<a href="${href}" ${href.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>${label}</a>`
  );
  safe = safe.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
  safe = safe.replace(/\*(.+?)\*/g, '<em>$1</em>');
  safe = safe.replace(/\n/g, '<br>');
  return safe;
}

function buildChatbot() {
  if (document.getElementById('chat-fab')) return;

  const fab = document.createElement('button');
  fab.id = 'chat-fab';
  fab.type = 'button';
  fab.setAttribute('aria-label', 'Chat dengan asisten Diki');
  fab.setAttribute('aria-expanded', 'false');
  fab.style.zIndex = '9999';
  fab.innerHTML = `
    <span class="fab-icon fab-icon-chat">
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    </span>
    <span class="fab-icon fab-icon-close" style="display:none;">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
        <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
      </svg>
    </span>
    <span class="fab-pulse" aria-hidden="true"></span>
  `;

  const panel = document.createElement('div');
  panel.id = 'chat-panel';
  panel.setAttribute('role', 'dialog');
  panel.setAttribute('aria-label', 'Chat asisten Diki Permana');
  panel.setAttribute('aria-hidden', 'true');
  panel.innerHTML = `
    <div class="chat-header">
      <div class="chat-avatar" aria-hidden="true"><img src="asset/header.png" alt="DP Logo" class="chat-avatar-img" /></div>
      <div class="chat-header-info">
        <span class="chat-name" data-i18n="chatbot.title">Diki AI Assistant</span>
        <span class="chat-status"><span class="status-dot"></span> <span data-i18n="chatbot.sub">Online • Tanya apa saja tentang Diki</span></span>
      </div>
      <button class="chat-close-btn" id="chat-close-btn" type="button" aria-label="Tutup chat">×</button>
    </div>
    <div class="chat-messages" id="chat-messages" role="log" aria-live="polite"></div>
    <div class="chat-suggestions" id="chat-suggestions"></div>
    <div class="chat-input-area">
      <input type="text" id="chat-input" class="chat-input" data-i18n="chatbot.placeholder" placeholder="Tanyakan sesuatu tentang Diki..." autocomplete="off" maxlength="600" aria-label="Tulis pertanyaan" />
      <button class="chat-send-btn" id="chat-send-btn" type="button" aria-label="Kirim pesan">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
      </button>
    </div>
  `;

  document.body.appendChild(fab);
  document.body.appendChild(panel);
}

function appendMessage(role, text, animate = true) {
  const container = document.getElementById('chat-messages');
  if (!container) return;

  const wrap = document.createElement('div');
  wrap.className = `chat-msg chat-msg-${role}${animate ? ' chat-msg-in' : ''}`;
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble';
  if (role === 'user') bubble.textContent = text;
  else bubble.innerHTML = renderMarkdown(text);
  wrap.appendChild(bubble);
  container.appendChild(wrap);
  container.scrollTop = container.scrollHeight;
}

function renderSuggestions() {
  const container = document.getElementById('chat-suggestions');
  if (!container) return;
  container.innerHTML = '';
  container.style.display = 'flex';
  (SUGGESTIONS[currentLang()] || SUGGESTIONS.id).forEach(question => {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'suggestion-chip';
    button.textContent = question;
    button.addEventListener('click', () => sendMessage(question));
    container.appendChild(button);
  });
}

function setTyping(show) {
  let indicator = document.getElementById('chat-typing-indicator');
  if (!show) {
    if (indicator) indicator.remove();
    return;
  }
  if (indicator) return;
  const container = document.getElementById('chat-messages');
  if (!container) return;
  indicator = document.createElement('div');
  indicator.id = 'chat-typing-indicator';
  indicator.className = 'chat-msg chat-msg-bot chat-msg-in';
  indicator.innerHTML = '<div class="chat-bubble chat-typing"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>';
  container.appendChild(indicator);
  container.scrollTop = container.scrollHeight;
}

async function sendMessage(forcedText) {
  if (CHAT_STATE.sending) return;
  const input = document.getElementById('chat-input');
  const message = String(forcedText || (input && input.value) || '').trim();
  if (!message) return;

  if (input) input.value = '';
  const suggestions = document.getElementById('chat-suggestions');
  if (suggestions) suggestions.style.display = 'none';
  appendMessage('user', message);
  CHAT_STATE.history.push({ role: 'user', content: message });
  CHAT_STATE.sending = true;
  setTyping(true);

  try {
    const reply = await getReply(message);
    await new Promise(resolve => setTimeout(resolve, 220));
    setTyping(false);
    appendMessage('bot', reply);
    CHAT_STATE.history.push({ role: 'assistant', content: reply });
    CHAT_STATE.history = CHAT_STATE.history.slice(-12);
  } catch (_) {
    setTyping(false);
    appendMessage('bot', currentLang() === 'en' ? 'Something went wrong. Please try again.' : 'Ada error. Coba kirim lagi ya.');
  } finally {
    CHAT_STATE.sending = false;
  }
}

let chatOpen = false;

function openChat() {
  const panel = document.getElementById('chat-panel');
  const fab = document.getElementById('chat-fab');
  if (!panel || !fab) return;
  chatOpen = true;
  panel.classList.add('open');
  panel.setAttribute('aria-hidden', 'false');
  fab.setAttribute('aria-expanded', 'true');
  const chatIcon = fab.querySelector('.fab-icon-chat');
  const closeIcon = fab.querySelector('.fab-icon-close');
  if (chatIcon) chatIcon.style.display = 'none';
  if (closeIcon) closeIcon.style.display = 'flex';

  const messages = document.getElementById('chat-messages');
  if (messages && messages.children.length === 0) {
    appendMessage('bot', currentLang() === 'en'
      ? `Hello! 👋 I'm Diki's portfolio assistant. Ask about experience, marketplace skills, projects, GitHub work, availability, or contact details.`
      : `Halo! 👋 Saya asisten portfolio **Diki Permana**. Tanya soal pengalaman, skill marketplace, project, GitHub, availability, atau cara kontak Diki.`, false);
    renderSuggestions();
  }
  ensureProjectsLoaded();
  setTimeout(() => document.getElementById('chat-input')?.focus(), 100);
}

function closeChat() {
  const panel = document.getElementById('chat-panel');
  const fab = document.getElementById('chat-fab');
  if (!panel || !fab) return;
  chatOpen = false;
  panel.classList.remove('open');
  panel.setAttribute('aria-hidden', 'true');
  fab.setAttribute('aria-expanded', 'false');
  const chatIcon = fab.querySelector('.fab-icon-chat');
  const closeIcon = fab.querySelector('.fab-icon-close');
  if (chatIcon) chatIcon.style.display = 'flex';
  if (closeIcon) closeIcon.style.display = 'none';
}

function initChatbot() {
  try {
    buildChatbot();
    ensureProjectsLoaded();

    document.getElementById('chat-fab')?.addEventListener('click', () => chatOpen ? closeChat() : openChat());
    document.getElementById('chat-close-btn')?.addEventListener('click', closeChat);
    document.getElementById('chat-send-btn')?.addEventListener('click', () => sendMessage());
    document.getElementById('chat-input')?.addEventListener('keydown', event => {
      if (event.key === 'Enter' && !event.shiftKey) {
        event.preventDefault();
        sendMessage();
      }
    });
    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && chatOpen) closeChat();
    });
  } catch (error) {
    if (!document.getElementById('chat-fab') && document.body) {
      const fallback = document.createElement('button');
      fallback.id = 'chat-fab';
      fallback.type = 'button';
      fallback.textContent = 'Chat';
      fallback.setAttribute('aria-label', 'Chat');
      document.body.appendChild(fallback);
    }
  }
}

window.addEventListener('languageChanged', renderSuggestions);

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initChatbot, { once: true });
} else {
  initChatbot();
}
