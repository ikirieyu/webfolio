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
  strengths: [
    'Marketplace operations',
    'Product listing & catalog management',
    'Campaign, voucher, and promotional planning',
    'Marketplace visual design',
    'Store optimization',
    'Graphic design & print production',
    'Web/app development',
  ],
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

/*
 * OPTIONAL FULL-AI MODE
 * ------------------------------------------------------------
 * GitHub Pages is static, so an AI provider key must NOT be stored here.
 * If a secure serverless proxy is connected later, expose either:
 *
 *   window.DIKI_CHATBOT_CONFIG = {
 *     endpoint: 'https://your-domain.example/api/chat'
 *   };
 *
 * or:
 *   window.DIKI_CHATBOT_AI_ENDPOINT = 'https://...';
 *
 * Expected request JSON:
 * { message, language, history, portfolioContext }
 * Expected response JSON:
 * { reply: '...' }
 */
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
  lastTopic: null,
};

const STOPWORDS = new Set([
  'yang', 'dan', 'di', 'ke', 'dari', 'untuk', 'itu', 'ini', 'ada', 'apa', 'apakah', 'gimana',
  'bagaimana', 'dengan', 'atau', 'bisa', 'kah', 'nya', 'tentang', 'dong', 'nih', 'ya', 'gue',
  'saya', 'aku', 'kamu', 'diki', 'the', 'a', 'an', 'is', 'are', 'of', 'to', 'for', 'and', 'or',
  'about', 'can', 'could', 'please', 'tell', 'me', 'his', 'him', 'he', 'what', 'how', 'does',
]);

function currentLang() {
  return typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'id';
}

function pickLocalized(value, lang = currentLang()) {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  return value[lang] || value.id || value.en || '';
}

function normalizeText(text = '') {
  return String(text)
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9+#./\-\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function tokenize(text = '') {
  return normalizeText(text)
    .split(' ')
    .filter(token => token.length > 1 && !STOPWORDS.has(token));
}

function includesAny(text, phrases) {
  const q = normalizeText(text);
  return phrases.some(phrase => q.includes(normalizeText(phrase)));
}

function unique(items) {
  return [...new Set(items.filter(Boolean))];
}

function clampText(text, max = 760) {
  const clean = String(text || '').replace(/\s+/g, ' ').trim();
  if (clean.length <= max) return clean;
  return `${clean.slice(0, max).trimEnd()}…`;
}

async function ensureProjectsLoaded() {
  try {
    if (Array.isArray(window.MODULAR_PORTFOLIO_DATA) && window.MODULAR_PORTFOLIO_DATA.length) {
      return window.MODULAR_PORTFOLIO_DATA;
    }

    if (typeof loadProjectRegistry === 'function') {
      await loadProjectRegistry();
    } else if (window.PORTFOLIO_READY) {
      await window.PORTFOLIO_READY;
    }
  } catch (error) {
    console.warn('[chatbot] Project registry unavailable', error);
  }

  return Array.isArray(window.MODULAR_PORTFOLIO_DATA)
    ? window.MODULAR_PORTFOLIO_DATA
    : [];
}

function publishedProjects() {
  return (window.MODULAR_PORTFOLIO_DATA || [])
    .filter(project => project && project.published !== false)
    .sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
}

function projectSearchText(project, lang) {
  const blockText = (project.blocks || [])
    .map(block => [block.kicker, block.title, block.body].map(v => pickLocalized(v, lang)).join(' '))
    .join(' ');

  return [
    project.id,
    project.category,
    project.label,
    project.year,
    project.role,
    pickLocalized(project.title, lang),
    pickLocalized(project.description, lang),
    pickLocalized(project.subtitle, lang),
    pickLocalized(project.overview, lang),
    pickLocalized(project.challenge, lang),
    pickLocalized(project.approach, lang),
    ...(project.tags || []),
    blockText,
  ].filter(Boolean).join(' ');
}

function findBestProject(query, lang) {
  const projects = publishedProjects();
  if (!projects.length) return null;

  const qNorm = normalizeText(query);
  const qTokens = new Set(tokenize(query));
  let best = null;
  let bestScore = 0;

  projects.forEach(project => {
    const title = pickLocalized(project.title, lang);
    const titleNorm = normalizeText(title);
    const idNorm = normalizeText(project.id || '');
    const haystack = normalizeText(projectSearchText(project, lang));
    const titleTokens = tokenize(title);
    let score = 0;

    if (idNorm && qNorm.includes(idNorm)) score += 12;
    if (titleNorm && qNorm.includes(titleNorm)) score += 12;

    titleTokens.forEach(token => {
      if (qTokens.has(token)) score += 3;
    });

    qTokens.forEach(token => {
      if (token.length >= 3 && haystack.includes(token)) score += 1;
    });

    (project.tags || []).forEach(tag => {
      if (qNorm.includes(normalizeText(tag))) score += 2;
    });

    if (score > bestScore) {
      bestScore = score;
      best = project;
    }
  });

  return bestScore >= 4 ? best : null;
}

function formatProjectAnswer(project, lang, mode = 'overview') {
  const title = pickLocalized(project.title, lang);
  const description = pickLocalized(project.description, lang);
  const overview = pickLocalized(project.overview, lang);
  const challenge = pickLocalized(project.challenge, lang);
  const approach = pickLocalized(project.approach, lang);
  const tags = (project.tags || []).join(' · ');
  const internalUrl = `project.html?id=${encodeURIComponent(project.id)}`;
  const repoUrl = project.repoUrl || (project.category === 'github' ? project.externalLink : '');

  CHAT_STATE.lastProjectId = project.id;
  CHAT_STATE.lastTopic = 'project';

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

  const extraLink = repoUrl
    ? `\n• [${lang === 'en' ? 'Open GitHub repository' : 'Buka repository GitHub'}](${repoUrl})`
    : '';

  return lang === 'en'
    ? `**${title}**${project.year ? ` · ${project.year}` : ''}\n\n${clampText(overview || description, 620)}${tags ? `\n\n**Stack / tags:** ${tags}` : ''}\n\n• [Open case study](${internalUrl})${extraLink}`
    : `**${title}**${project.year ? ` · ${project.year}` : ''}\n\n${clampText(overview || description, 620)}${tags ? `\n\n**Stack / tags:** ${tags}` : ''}\n\n• [Buka case study](${internalUrl})${extraLink}`;
}

function formatProjectList(lang, category = null) {
  let projects = publishedProjects();
  if (category) projects = projects.filter(project => project.category === category);

  if (!projects.length) {
    return lang === 'en'
      ? 'There are no published projects in that category yet.'
      : 'Belum ada project yang dipublikasikan di kategori itu.';
  }

  const rows = projects.slice(0, 8).map(project => {
    const title = pickLocalized(project.title, lang);
    return `• [${title}](project.html?id=${encodeURIComponent(project.id)})${project.year ? ` — ${project.year}` : ''}`;
  }).join('\n');

  CHAT_STATE.lastTopic = 'portfolio';

  return lang === 'en'
    ? `Here are Diki's published projects:\n\n${rows}\n\nYou can ask about any project by name.`
    : `Ini project Diki yang sudah dipublikasikan:\n\n${rows}\n\nKalau mau detail, sebut nama project-nya.`;
}

function formatExperience(lang) {
  const rows = DIKI.jobs
    .map(job => `• **${job.title}** ${lang === 'en' ? 'at' : 'di'} ${job.company} — ${job.period}`)
    .join('\n');
  CHAT_STATE.lastTopic = 'experience';

  return lang === 'en'
    ? `Diki has **${DIKI.experienceYears} years of work experience** across e-commerce, design, and print production:\n\n${rows}\n\nAsk for a company name if you want the details.`
    : `Diki punya **${DIKI.experienceYears} tahun pengalaman kerja** di e-commerce, desain, dan print production:\n\n${rows}\n\nKalau mau detail, sebut nama perusahaannya.`;
}

function formatJob(job, lang) {
  const points = job.highlights.map(item => `• ${item}`).join('\n');
  CHAT_STATE.lastTopic = 'experience';

  return lang === 'en'
    ? `At **${job.company}** (${job.period}), Diki worked as **${job.title}**.\n\n${points}`
    : `Di **${job.company}** (${job.period}), Diki bekerja sebagai **${job.title}**.\n\n${points}`;
}

function formatSkills(lang) {
  CHAT_STATE.lastTopic = 'skills';

  const sections = lang === 'en'
    ? [
        ['E-commerce & Marketplace', DIKI.skills.ecommerce],
        ['Visual & Campaign', DIKI.skills.visual],
        ['Data & Operations', DIKI.skills.data],
        ['Web & Technical', DIKI.skills.technical],
      ]
    : [
        ['E-commerce & Marketplace', DIKI.skills.ecommerce],
        ['Visual & Campaign', DIKI.skills.visual],
        ['Data & Operations', DIKI.skills.data],
        ['Web & Technical', DIKI.skills.technical],
      ];

  return sections
    .map(([title, items]) => `**${title}**\n${items.map(item => `• ${item}`).join('\n')}`)
    .join('\n\n');
}

function formatContact(lang) {
  CHAT_STATE.lastTopic = 'contact';
  return lang === 'en'
    ? `You can contact Diki through:\n\n• **Email:** ${DIKI.contact.email}\n• **WhatsApp:** [${DIKI.contact.whatsapp}](${DIKI.contact.whatsappUrl})\n• **Instagram:** [${DIKI.contact.instagram}](${DIKI.contact.instagramUrl})\n• **Behance:** [${DIKI.contact.behance}](${DIKI.contact.behanceUrl})\n• **GitHub:** [${DIKI.contact.github}](${DIKI.contact.githubUrl})`
    : `Diki bisa dihubungi lewat:\n\n• **Email:** ${DIKI.contact.email}\n• **WhatsApp:** [${DIKI.contact.whatsapp}](${DIKI.contact.whatsappUrl})\n• **Instagram:** [${DIKI.contact.instagram}](${DIKI.contact.instagramUrl})\n• **Behance:** [${DIKI.contact.behance}](${DIKI.contact.behanceUrl})\n• **GitHub:** [${DIKI.contact.github}](${DIKI.contact.githubUrl})`;
}

function formatProfile(lang) {
  CHAT_STATE.lastTopic = 'profile';
  return lang === 'en'
    ? `**${DIKI.name}** is an **${DIKI.role}** based in ${DIKI.location}, with a background in graphic design, print production, and web/app development.\n\nHis strongest value is connecting **operations + visuals + technical workflow** instead of treating them as separate jobs. He has managed **${DIKI.stats.managedProducts} products/SKUs** and produced **${DIKI.stats.promoDesignsPerWeek} promotional designs per week** in previous e-commerce work.`
    : `**${DIKI.name}** adalah **${DIKI.role}** berbasis di ${DIKI.location}, dengan background graphic design, print production, dan web/app development.\n\nNilai utamanya ada di kombinasi **operasional + visual + workflow teknis**, bukan melihat semuanya sebagai pekerjaan terpisah. Di pengalaman e-commerce sebelumnya ia pernah mengelola **${DIKI.stats.managedProducts} produk/SKU** dan memproduksi **${DIKI.stats.promoDesignsPerWeek} desain promosi per minggu**.`;
}

function formatWhyHire(lang) {
  CHAT_STATE.lastTopic = 'hire';
  return lang === 'en'
    ? `For an e-commerce / marketplace role, Diki's strongest points are:\n\n• Understands store operations, catalog, campaigns, and visuals as one system\n• Has hands-on experience managing ${DIKI.stats.managedProducts} products/SKUs\n• Can produce high-volume promotional assets consistently\n• Understands print production, so visual work is practical, not just aesthetic\n• Has technical skills in React, TypeScript, Supabase, local storage, Capacitor, and Electron\n\nThat makes him useful in roles that sit between marketplace operations, creative, and digital workflow.`
    : `Untuk role e-commerce / marketplace, kekuatan Diki ada di sini:\n\n• Paham operasional toko, katalog, campaign, dan visual sebagai satu sistem\n• Pernah menangani ${DIKI.stats.managedProducts} produk/SKU\n• Terbiasa produksi materi promosi dalam volume tinggi\n• Paham print production, jadi desainnya bukan cuma estetis tapi juga praktis\n• Punya skill teknis React, TypeScript, Supabase, local storage, Capacitor, dan Electron\n\nJadi dia cocok untuk posisi yang menjembatani marketplace operations, creative, dan digital workflow.`;
}

function getJobFromQuestion(query) {
  const q = normalizeText(query);
  return DIKI.jobs.find(job => {
    const company = normalizeText(job.company);
    const aliases = unique([
      company,
      ...company.split('/').map(item => item.trim()),
      company.includes('dstar') ? 'dstar' : '',
      company.includes('dw group') ? 'dw' : '',
    ]);
    return aliases.some(alias => alias && q.includes(alias));
  });
}

function getLastProject() {
  if (!CHAT_STATE.lastProjectId) return null;
  return publishedProjects().find(project => project.id === CHAT_STATE.lastProjectId) || null;
}

function localIntentReply(query, lang) {
  const q = normalizeText(query);
  const project = findBestProject(query, lang);
  const job = getJobFromQuestion(query);

  if (includesAny(q, ['halo', 'hai', 'hello', 'hi', 'hey', 'selamat pagi', 'selamat siang', 'selamat sore', 'selamat malam'])) {
    return lang === 'en'
      ? `Hello! 👋 I'm Diki's portfolio assistant. Ask me about his experience, marketplace skills, projects, GitHub work, portfolio, or contact details.`
      : `Halo! 👋 Saya asisten portfolio Diki. Kamu bisa tanya soal pengalaman kerja, skill marketplace, project, GitHub, portfolio, atau cara menghubungi Diki.`;
  }

  if (includesAny(q, ['makasih', 'terima kasih', 'thanks', 'thank you', 'mantap', 'sip'])) {
    return lang === 'en' ? 'You’re welcome! Ask anything else whenever you want.' : 'Sama-sama! Kalau masih ada yang mau ditanya, lanjut aja.';
  }

  if (includesAny(q, ['siapa diki', 'tentang diki', 'profil diki', 'who is diki', 'about diki', 'perkenalkan diki'])) {
    return formatProfile(lang);
  }

  if (includesAny(q, ['alamat', 'lokasi', 'tinggal dimana', 'berbasis dimana', 'location', 'where is diki', 'based'])) {
    return lang === 'en'
      ? `Diki is based in **${DIKI.location}**.`
      : `Diki berbasis di **${DIKI.location}**.`;
  }

  if (includesAny(q, ['kontak', 'contact', 'whatsapp', 'wa ', 'email', 'instagram', 'behance', 'hubungi', 'nomor'])) {
    return formatContact(lang);
  }

  if (includesAny(q, ['hire', 'rekrut', 'recruit', 'available for work', 'open to work', 'freelance', 'full time', 'full-time', 'kerja sama', 'kolaborasi'])) {
    return lang === 'en'
      ? `Yes. Diki is open to **full-time roles, freelance work, and e-commerce collaborations**.\n\n${formatContact(lang)}`
      : `Ya. Diki terbuka untuk **full-time, freelance, dan kolaborasi e-commerce**.\n\n${formatContact(lang)}`;
  }

  if (includesAny(q, ['kenapa pilih', 'kenapa hire', 'why hire', 'kelebihan diki', 'strength', 'unggul', 'cocok gak', 'cocok tidak'])) {
    return formatWhyHire(lang);
  }

  if (job) {
    return formatJob(job, lang);
  }

  if (includesAny(q, ['kerja sekarang', 'sekarang kerja', 'current job', 'currently work', 'pekerjaan sekarang', 'terbaru kerja'])) {
    return formatJob(DIKI.jobs[0], lang);
  }

  if (includesAny(q, ['pengalaman', 'experience', 'riwayat kerja', 'work history', 'career', 'karir', 'cv', 'resume', 'pernah kerja'])) {
    return formatExperience(lang);
  }

  if (project) {
    if (includesAny(q, ['challenge', 'tantangan', 'masalah'])) return formatProjectAnswer(project, lang, 'challenge');
    if (includesAny(q, ['approach', 'pendekatan', 'solusi', 'arsitektur', 'architecture'])) return formatProjectAnswer(project, lang, 'approach');
    return formatProjectAnswer(project, lang);
  }

  const lastProject = getLastProject();
  if (lastProject && includesAny(q, ['tantangannya', 'challenge nya', 'challenge-nya', 'masalahnya'])) {
    return formatProjectAnswer(lastProject, lang, 'challenge');
  }
  if (lastProject && includesAny(q, ['pendekatannya', 'solusinya', 'approach nya', 'arsitekturnya'])) {
    return formatProjectAnswer(lastProject, lang, 'approach');
  }

  if (includesAny(q, ['github project', 'project github', 'digital project', 'repo', 'repository', 'coding project'])) {
    return formatProjectList(lang, 'github');
  }

  if (includesAny(q, ['project ecommerce', 'project e-commerce', 'marketplace project', 'case study ecommerce', 'case study e-commerce'])) {
    return formatProjectList(lang, 'ecommerce');
  }

  if (includesAny(q, ['portfolio', 'karya', 'case study', 'project', 'projects', 'lihat karya'])) {
    return formatProjectList(lang);
  }

  if (includesAny(q, ['skill', 'skills', 'keahlian', 'kemampuan', 'bisa apa', 'tools', 'software'])) {
    return formatSkills(lang);
  }

  if (includesAny(q, ['shopee', 'tokopedia', 'lazada', 'tiktok shop', 'marketplace', 'ecommerce', 'e-commerce', 'catalog', 'katalog', 'campaign', 'voucher', 'iklan'])) {
    CHAT_STATE.lastTopic = 'ecommerce';
    return lang === 'en'
      ? `Diki's e-commerce strengths include **marketplace operations, product listing/catalog, campaigns & vouchers, marketplace ads, store optimization, customer/order flow, and e-commerce visual production**.\n\nIn a previous role he managed **${DIKI.stats.managedProducts} products/SKUs** and produced **${DIKI.stats.promoDesignsPerWeek} promotional designs per week**.`
      : `Kekuatan e-commerce Diki mencakup **marketplace operations, listing/katalog produk, campaign & voucher, marketplace ads, store optimization, customer/order flow, dan produksi visual e-commerce**.\n\nDi pengalaman sebelumnya ia menangani **${DIKI.stats.managedProducts} produk/SKU** dan memproduksi **${DIKI.stats.promoDesignsPerWeek} desain promosi per minggu**.`;
  }

  if (includesAny(q, ['photoshop', 'illustrator', 'indesign', 'coreldraw', 'desain grafis', 'graphic design', 'visual', 'branding', 'print', 'prepress'])) {
    CHAT_STATE.lastTopic = 'visual';
    return lang === 'en'
      ? `Yes. Diki works with **Photoshop, Illustrator, InDesign, and CorelDraw**, and has hands-on experience with e-commerce visuals, campaign assets, branding, prepress, and commercial print production.`
      : `Ya. Diki menggunakan **Photoshop, Illustrator, InDesign, dan CorelDraw**, serta punya pengalaman langsung di visual e-commerce, campaign assets, branding, prepress, dan produksi cetak komersial.`;
  }

  if (includesAny(q, ['react', 'typescript', 'javascript', 'vite', 'supabase', 'capacitor', 'electron', 'indexeddb', 'local storage', 'coding', 'developer', 'web app', 'aplikasi'])) {
    CHAT_STATE.lastTopic = 'technical';
    return lang === 'en'
      ? `Diki also builds digital products. His technical stack includes **HTML/CSS/JavaScript, React, TypeScript, Vite, Supabase, IndexedDB/local storage, Capacitor, and Electron**. Check the Digital Projects tab for working case studies.`
      : `Diki juga membangun digital product. Stack teknisnya mencakup **HTML/CSS/JavaScript, React, TypeScript, Vite, Supabase, IndexedDB/local storage, Capacitor, dan Electron**. Cek tab Digital Projects untuk case study-nya.`;
  }

  if (includesAny(q, ['gaji', 'salary', 'expected salary', 'rate', 'harga jasa', 'fee'])) {
    return lang === 'en'
      ? `Salary or project rates are not published on this portfolio. The best option is to discuss the role, scope, and expectations directly with Diki via [WhatsApp](${DIKI.contact.whatsappUrl}) or email.`
      : `Ekspektasi gaji atau rate project tidak dipublikasikan di portfolio ini. Paling tepat diskusikan role, scope, dan kebutuhannya langsung lewat [WhatsApp](${DIKI.contact.whatsappUrl}) atau email.`;
  }

  if (includesAny(q, ['jam berapa', 'tanggal berapa', 'hari apa', 'what time', 'what date', 'today'])) {
    const now = new Date();
    const locale = lang === 'en' ? 'en-US' : 'id-ID';
    return lang === 'en'
      ? `Your browser reports the current time as **${now.toLocaleString(locale, { dateStyle: 'full', timeStyle: 'short' })}**.`
      : `Waktu dari browser kamu sekarang: **${now.toLocaleString(locale, { dateStyle: 'full', timeStyle: 'short' })}**.`;
  }

  return null;
}

function buildRetrievalDocs(lang) {
  const docs = [];

  docs.push({
    title: 'Profile',
    text: `${DIKI.name} ${DIKI.role} ${DIKI.secondaryRole} ${DIKI.location}. ${DIKI.strengths.join('. ')}. ${DIKI.experienceYears} years experience. ${DIKI.stats.managedProducts} products managed. ${DIKI.stats.promoDesignsPerWeek} promotional designs per week.`,
    keywords: 'profile about specialist ecommerce marketplace graphic design operations visual technical',
  });

  DIKI.jobs.forEach(job => {
    docs.push({
      title: `${job.title} — ${job.company}`,
      text: `${job.period}. ${job.highlights.join('. ')}`,
      keywords: `experience career work ${job.company} ${job.title}`,
    });
  });

  Object.entries(DIKI.skills).forEach(([group, items]) => {
    docs.push({
      title: `Skills — ${group}`,
      text: items.join(', '),
      keywords: `skills tools software ${group}`,
    });
  });

  publishedProjects().forEach(project => {
    docs.push({
      title: pickLocalized(project.title, lang),
      text: projectSearchText(project, lang),
      keywords: `project portfolio case study ${project.category} ${(project.tags || []).join(' ')}`,
      projectId: project.id,
    });
  });

  return docs;
}

function retrieveBestDoc(query, lang) {
  const qNorm = normalizeText(query);
  const qTokens = new Set(tokenize(query));
  let best = null;
  let bestScore = 0;

  buildRetrievalDocs(lang).forEach(doc => {
    const titleNorm = normalizeText(doc.title);
    const haystack = normalizeText(`${doc.title} ${doc.keywords} ${doc.text}`);
    let score = 0;

    if (titleNorm && qNorm.includes(titleNorm)) score += 8;
    tokenize(doc.title).forEach(token => {
      if (qTokens.has(token)) score += 3;
    });
    qTokens.forEach(token => {
      if (token.length >= 3 && haystack.includes(token)) score += 1;
    });

    if (score > bestScore) {
      best = doc;
      bestScore = score;
    }
  });

  return bestScore >= 3 ? { ...best, score: bestScore } : null;
}

function retrievalReply(query, lang) {
  const doc = retrieveBestDoc(query, lang);
  if (!doc) return null;

  if (doc.projectId) {
    const project = publishedProjects().find(item => item.id === doc.projectId);
    if (project) return formatProjectAnswer(project, lang);
  }

  return lang === 'en'
    ? `The most relevant information I have is from **${doc.title}**:\n\n${clampText(doc.text, 650)}`
    : `Informasi yang paling relevan ada di **${doc.title}**:\n\n${clampText(doc.text, 650)}`;
}

function buildPortfolioContext(lang) {
  const projectLines = publishedProjects().slice(0, 12).map(project => {
    return `- ${pickLocalized(project.title, lang)} | ${project.category} | ${project.year || '-'} | ${pickLocalized(project.description, lang)} | tags: ${(project.tags || []).join(', ')}`;
  });

  return [
    `Name: ${DIKI.name}`,
    `Role: ${DIKI.role}`,
    `Location: ${DIKI.location}`,
    `Experience: ${DIKI.experienceYears} years`,
    `Stats: ${DIKI.stats.managedProducts} products/SKUs managed; ${DIKI.stats.promoDesignsPerWeek} promo designs/week`,
    `Strengths: ${DIKI.strengths.join(', ')}`,
    `Skills: ${Object.values(DIKI.skills).flat().join(', ')}`,
    `Work history: ${DIKI.jobs.map(job => `${job.title} at ${job.company} (${job.period})`).join('; ')}`,
    `Published projects:\n${projectLines.join('\n')}`,
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
  } catch (error) {
    console.warn('[chatbot] Remote AI unavailable', error);
    return null;
  } finally {
    clearTimeout(timer);
  }
}

async function getReply(userInput) {
  const lang = currentLang();
  await ensureProjectsLoaded();

  const local = localIntentReply(userInput, lang);
  if (local) return local;

  const retrieved = retrievalReply(userInput, lang);
  if (retrieved) return retrieved;

  const remote = await askRemoteAI(userInput, lang);
  if (remote) return remote;

  return lang === 'en'
    ? `I can answer almost anything **about Diki and this portfolio** from the site's live data, but unrestricted general-AI questions require a secure AI backend.\n\nTry asking about a project, marketplace experience, skills, work history, availability, or contact details.`
    : `Saya bisa jawab hampir semua hal **tentang Diki dan isi portfolio ini** dari data website yang aktif. Untuk pertanyaan umum tanpa batas seperti AI penuh, website perlu backend AI yang aman.\n\nCoba tanya nama project, pengalaman marketplace, skill, riwayat kerja, availability, atau cara kontak Diki.`;
}

/* ============================================================
   SUGGESTED QUESTIONS
   ============================================================ */
const SUGGESTIONS_DICT = {
  id: [
    'Project terbaru Diki apa?',
    'Pengalaman marketplace Diki?',
    'Skill teknis Diki apa saja?',
    'Kenapa cocok untuk role e-commerce?',
  ],
  en: [
    'What are Diki’s latest projects?',
    'What marketplace experience does Diki have?',
    'What are Diki’s technical skills?',
    'Why is he a fit for e-commerce roles?',
  ],
};

/* ============================================================
   SAFE MARKDOWN RENDERER
   ============================================================ */
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

/* ============================================================
   BUILD DOM
   ============================================================ */
function buildChatbot() {
  if (document.getElementById('chat-fab')) return;

  const fab = document.createElement('button');
  fab.id = 'chat-fab';
  fab.setAttribute('aria-label', 'Chat dengan asisten Diki');
  fab.setAttribute('aria-expanded', 'false');
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
      <div class="chat-avatar" aria-hidden="true">
        <img src="asset/header.png" alt="DP Logo" class="chat-avatar-img" />
      </div>
      <div class="chat-header-info">
        <span class="chat-name" data-i18n="chatbot.title">Diki AI Assistant</span>
        <span class="chat-status"><span class="status-dot"></span> <span data-i18n="chatbot.sub">Online • Tanya apa saja tentang Diki</span></span>
      </div>
      <button class="chat-close-btn" id="chat-close-btn" aria-label="Tutup chat">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
          <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>
    <div class="chat-messages" id="chat-messages" role="log" aria-live="polite" aria-label="Riwayat percakapan"></div>
    <div class="chat-suggestions" id="chat-suggestions" role="group" aria-label="Pertanyaan cepat"></div>
    <div class="chat-input-area">
      <input
        type="text"
        id="chat-input"
        class="chat-input"
        data-i18n="chatbot.placeholder"
        placeholder="Tanyakan sesuatu tentang Diki..."
        autocomplete="off"
        maxlength="600"
        aria-label="Tulis pertanyaan"
      />
      <button class="chat-send-btn" id="chat-send-btn" aria-label="Kirim pesan">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true">
          <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
        </svg>
      </button>
    </div>
  `;

  document.body.appendChild(fab);
  document.body.appendChild(panel);
}

/* ============================================================
   MESSAGE RENDERING
   ============================================================ */
function appendMessage(role, text, animate = true) {
  const container = document.getElementById('chat-messages');
  if (!container) return;

  const wrap = document.createElement('div');
  wrap.className = `chat-msg chat-msg-${role}${animate ? ' chat-msg-in' : ''}`;

  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble';

  if (role === 'user') {
    bubble.textContent = text;
  } else {
    bubble.innerHTML = renderMarkdown(text);
  }

  wrap.appendChild(bubble);
  container.appendChild(wrap);
  container.scrollTop = container.scrollHeight;
}

function appendTyping() {
  const container = document.getElementById('chat-messages');
  if (!container || document.getElementById('chat-typing-indicator')) return;

  const wrap = document.createElement('div');
  wrap.className = 'chat-msg chat-msg-bot chat-msg-in';
  wrap.id = 'chat-typing-indicator';
  wrap.innerHTML = `
    <div class="chat-bubble chat-typing">
      <span class="dot"></span><span class="dot"></span><span class="dot"></span>
    </div>
  `;
  container.appendChild(wrap);
  container.scrollTop = container.scrollHeight;
}

function removeTyping() {
  const el = document.getElementById('chat-typing-indicator');
  if (el) el.remove();
}

/* ============================================================
   SUGGESTIONS
   ============================================================ */
function renderSuggestions() {
  const container = document.getElementById('chat-suggestions');
  if (!container) return;

  container.innerHTML = '';
  container.style.display = 'flex';
  const lang = currentLang();
  const list = SUGGESTIONS_DICT[lang] || SUGGESTIONS_DICT.id;

  list.forEach(question => {
    const button = document.createElement('button');
    button.className = 'suggestion-chip';
    button.textContent = question;
    button.addEventListener('click', () => {
      sendMessage(question);
      hideSuggestions();
    });
    container.appendChild(button);
  });
}

function hideSuggestions() {
  const container = document.getElementById('chat-suggestions');
  if (container) container.style.display = 'none';
}

window.addEventListener('languageChanged', renderSuggestions);

/* ============================================================
   SEND MESSAGE
   ============================================================ */
let sendingMessage = false;

async function sendMessage(text) {
  const input = document.getElementById('chat-input');
  const message = String(text || (input && input.value) || '').trim();
  if (!message || sendingMessage) return;

  if (input) input.value = '';
  hideSuggestions();
  appendMessage('user', message);
  CHAT_STATE.history.push({ role: 'user', content: message });

  sendingMessage = true;
  appendTyping();

  try {
    const started = performance.now();
    const reply = await getReply(message);
    const elapsed = performance.now() - started;
    const minimumDelay = CHATBOT_CONFIG.endpoint ? 180 : 320;
    if (elapsed < minimumDelay) {
      await new Promise(resolve => setTimeout(resolve, minimumDelay - elapsed));
    }

    removeTyping();
    appendMessage('bot', reply);
    CHAT_STATE.history.push({ role: 'assistant', content: reply });
    CHAT_STATE.history = CHAT_STATE.history.slice(-12);
  } catch (error) {
    console.error('[chatbot] Failed to answer', error);
    removeTyping();
    appendMessage(
      'bot',
      currentLang() === 'en'
        ? 'Something went wrong while processing that question. Please try again.'
        : 'Ada error saat memproses pertanyaan itu. Coba kirim lagi ya.'
    );
  } finally {
    sendingMessage = false;
    if (input) input.focus();
  }
}

/* ============================================================
   TOGGLE PANEL
   ============================================================ */
let chatOpen = false;

function openChat() {
  chatOpen = true;
  const panel = document.getElementById('chat-panel');
  const fab = document.getElementById('chat-fab');
  if (!panel || !fab) return;

  panel.classList.add('open');
  panel.setAttribute('aria-hidden', 'false');
  fab.setAttribute('aria-expanded', 'true');
  fab.querySelector('.fab-icon-chat').style.display = 'none';
  fab.querySelector('.fab-icon-close').style.display = 'flex';

  const messages = document.getElementById('chat-messages');
  if (messages && messages.children.length === 0) {
    const lang = currentLang();
    const greeting = lang === 'en'
      ? `Hello! 👋 I'm Diki's portfolio assistant.\n\nAsk me about **experience, marketplace skills, projects, GitHub work, availability, or contact details**.`
      : `Halo! 👋 Saya asisten portfolio **Diki Permana**.\n\nTanya soal **pengalaman, skill marketplace, project, GitHub, availability, atau cara kontak Diki**.`;
    appendMessage('bot', greeting, false);
    renderSuggestions();
  }

  ensureProjectsLoaded();

  setTimeout(() => {
    const input = document.getElementById('chat-input');
    if (input) input.focus();
  }, 250);
}

function closeChat() {
  chatOpen = false;
  const panel = document.getElementById('chat-panel');
  const fab = document.getElementById('chat-fab');
  if (!panel || !fab) return;

  panel.classList.remove('open');
  panel.setAttribute('aria-hidden', 'true');
  fab.setAttribute('aria-expanded', 'false');
  fab.querySelector('.fab-icon-chat').style.display = 'flex';
  fab.querySelector('.fab-icon-close').style.display = 'none';
}

/* ============================================================
   INIT
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  buildChatbot();
  ensureProjectsLoaded();

  document.getElementById('chat-fab')?.addEventListener('click', () => {
    chatOpen ? closeChat() : openChat();
  });

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
});
