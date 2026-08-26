/* ============================================================
   CHATBOT — Diki Permana Webfolio
   AI knowledge base + natural language matching
   ============================================================ */

const DIKI = {
  name: 'Diki Permana',
  role: 'Graphic Designer',
  location: 'Jakarta Barat, Indonesia',
  experience_years: '6+',
  specialties: ['E-commerce Design', 'Print & Branding', 'Prepress', 'Layout Editorial'],
  contact: {
    whatsapp: '0822-9738-5614',
    instagram: '@iki.rieyu',
    behance: 'behance.net/ikirieyu',
    github: 'github.com/ikirieyu',
  },
  jobs: [
    {
      title: 'Graphic Designer',
      company: 'Image Print / Printup',
      period: '2025–sekarang',
      highlights: [
        'Desain materi cetak harian: banner, spanduk, stiker, brosur, neon box',
        'Produksi desain untuk kebutuhan digital printing skala komersial',
        'Persiapan file prepress dan quality control sebelum naik cetak',
        'Operasi dan koordinasi dengan mesin printing & cutting',
      ],
    },
    {
      title: 'E-commerce Specialist',
      company: 'DW Group',
      period: '2023–2025',
      highlights: [
        'Mengelola 100+ produk Shopee end-to-end',
        'Memproduksi 20+ desain promosi per minggu',
        'Develop visual toko online dari konsep sampai produksi',
      ],
    },
    {
      title: 'Graphic Designer',
      company: 'Ruang Print',
      period: '2022–2023',
      highlights: [
        'Desain brosur, banner, dan materi cetak',
        'Layout buku dan majalah (InDesign)',
        'Persiapan file prepress',
      ],
    },
    {
      title: 'Graphic Designer',
      company: 'Dstar Digital Printing',
      period: '2020–2022',
      highlights: [
        'Desain cetak: stiker, spanduk, neon box',
        'Operasi langsung mesin printing & cutting',
        'Quality control & finishing',
      ],
    },
    {
      title: 'Graphic Designer',
      company: 'Abi Kreasindo',
      period: '2019–2020',
      highlights: [
        'Produksi materi promosi harian',
        'Desain brosur, kartu nama, x-banner',
      ],
    },
  ],
  skills: {
    design: ['Adobe Photoshop', 'Adobe Illustrator', 'Adobe InDesign', 'CorelDraw'],
    office: ['Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint'],
    web: ['HTML/CSS', 'Next.js', 'Vite', 'Capacitor', 'Electron'],
    it: ['Servis & Rakit PC', 'Instalasi OS', 'Jaringan LAN', 'Troubleshooting Hardware'],
  },
};

/* ============================================================
   KNOWLEDGE BASE — pasangan kata kunci → respons (Bilingual ID/EN)
   ============================================================ */
const KB = [
  // ---- GREETING ----
  {
    keys: ['halo', 'hai', 'hello', 'hi', 'hey', 'selamat', 'pagi', 'siang', 'sore', 'malam', 'apa kabar', 'greetings'],
    reply: (lang) => lang === 'en'
      ? `Hello! 👋 I'm Diki Permana's virtual assistant.\n\nFeel free to ask anything about Diki — work experience, skills, contact info, or portfolio. How can I help you today?`
      : `Halo! 👋 Saya asisten virtual Diki Permana.\n\nKamu bisa tanya apa saja tentang Diki — pengalaman kerja, skill, cara kontak, atau karya-karyanya. Ada yang bisa saya bantu?`,
  },

  // ---- WHO / SIAPA ----
  {
    keys: ['siapa', 'who', 'profil', 'profile', 'tentang diki', 'about', 'kenalan', 'perkenalan'],
    reply: (lang) => lang === 'en'
      ? `Diki Permana is a **Graphic Designer** with **${DIKI.experience_years} years of experience** in printing & e-commerce, based in **West Jakarta, Indonesia**.\n\nSpecialties:\n• E-commerce & Shopee Campaigns\n• Print & Branding (brochures, banners, editorial layouts)\n• Prepress & print production\n\nWhat sets him apart: He also has an **IT & app development** background, understanding end-to-end digital & print workflows.`
      : `Diki Permana adalah **Graphic Designer** dengan **${DIKI.experience_years} tahun pengalaman** di industri printing dan e-commerce, berbasis di **${DIKI.location}**.\n\nSpesialisasinya:\n• E-commerce & Shopee Campaign\n• Print & Branding (brosur, banner, layout buku)\n• Prepress & produksi cetak\n\nYang bikin dia beda: punya background **IT & app development** juga, jadi ngerti alur digital dari ujung ke ujung.`,
  },

  // ---- EXPERIENCE ----
  {
    keys: ['pengalaman', 'experience', 'kerja', 'karir', 'career', 'riwayat', 'cv', 'resume', 'berapa lama', 'tahun', 'years', 'work history'],
    reply: (lang) => {
      const list = DIKI.jobs.map(j => `• **${j.title}** ${lang === 'en' ? 'at' : 'di'} ${j.company} (${j.period})`).join('\n');
      return lang === 'en'
        ? `Diki has **${DIKI.experience_years} years** of professional experience:\n\n${list}\n\nWant details on any company? Just mention its name!`
        : `Diki punya **${DIKI.experience_years} tahun** pengalaman profesional:\n\n${list}\n\nMau detail salah satu? Cukup sebutkan nama perusahaannya!`;
    },
  },

  // ---- IMAGE PRINT / PRINTUP ----
  {
    keys: ['image print', 'printup', 'print up', 'sekarang', 'terbaru', 'terakhir', 'saat ini', 'latest', 'current'],
    reply: (lang) => {
      const job = DIKI.jobs[0];
      const pts = job.highlights.map(h => `• ${h}`).join('\n');
      return lang === 'en'
        ? `Currently Diki works at **${job.company}** (${job.period}) as ${job.title}.\n\nHighlights:\n${pts}\n\nContinuing his strong print production background since 2019.`
        : `Saat ini Diki bekerja di **${job.company}** (${job.period}) sebagai ${job.title}:\n\n${pts}\n\nPekerjaan ini melanjutkan keahlian print production yang sudah Diki bangun sejak 2019.`;
    },
  },

  // ---- DW GROUP ----
  {
    keys: ['dw group', 'dw', 'shopee', 'e-commerce', 'ecommerce', 'marketplace'],
    reply: (lang) => {
      const job = DIKI.jobs[1];
      const pts = job.highlights.map(h => `• ${h}`).join('\n');
      return lang === 'en'
        ? `At **${job.company}** (${job.period}) as ${job.title}:\n\n${pts}\n\nThis was Diki's longest & most intensive experience managing high-volume marketplace assets.`
        : `Di **${job.company}** (${job.period}) sebagai ${job.title}:\n\n${pts}\n\nIni pengalaman paling panjang dan intensif Diki — terbiasa kerja cepat dengan volume tinggi di dunia marketplace.`;
    },
  },

  // ---- RUANG PRINT ----
  {
    keys: ['ruang print', 'brosur', 'majalah', 'buku', 'layout', 'editorial', 'indesign', 'brochure', 'magazine', 'book'],
    reply: (lang) => {
      const job = DIKI.jobs[2];
      const pts = job.highlights.map(h => `• ${h}`).join('\n');
      return lang === 'en'
        ? `At **${job.company}** (${job.period}):\n\n${pts}\n\nMastered editorial layout and typesetting for books & magazines.`
        : `Di **${job.company}** (${job.period}):\n\n${pts}\n\nDi sini Diki menguasai layout editorial dan typesetting untuk buku/majalah yang dicetak dalam skala besar.`;
    },
  },

  // ---- DSTAR ----
  {
    keys: ['dstar', 'digital printing', 'mesin', 'cutting', 'stiker', 'spanduk', 'neon', 'sticker', 'banner'],
    reply: (lang) => {
      const job = DIKI.jobs[3];
      const pts = job.highlights.map(h => `• ${h}`).join('\n');
      return lang === 'en'
        ? `At **${job.company}** (${job.period}):\n\n${pts}\n\nHands-on experience operating print & cutting machines gave Diki deep prepress expertise.`
        : `Di **${job.company}** (${job.period}):\n\n${pts}\n\nPengalaman langsung di lapangan ini yang bikin Diki paham betul soal prepress — bukan hanya desain di layar, tapi tahu cara kerjanya di mesin cetak fisik.`;
    },
  },

  // ---- SKILL / SOFTWARE ----
  {
    keys: ['skill', 'keahlian', 'bisa apa', 'kemampuan', 'software', 'tools', 'aplikasi', 'program', 'capabilities'],
    reply: (lang) => lang === 'en'
      ? `Diki's skills span 4 core categories:\n\n**🎨 Graphic Design**\n${DIKI.skills.design.join(' · ')}\n\n**💻 Web & Dev**\n${DIKI.skills.web.join(' · ')}\n\n**🖥️ IT Support**\n${DIKI.skills.it.join(' · ')}\n\n**📄 Office**\n${DIKI.skills.office.join(' · ')}\n\nThis design + dev + IT combo makes Diki exceptionally versatile!`
      : `Skill Diki terbagi dalam 4 kategori:\n\n**🎨 Desain**\n${DIKI.skills.design.join(' · ')}\n\n**💻 Web & Dev**\n${DIKI.skills.web.join(' · ')}\n\n**🖥️ IT Support**\n${DIKI.skills.it.join(' · ')}\n\n**📄 Office**\n${DIKI.skills.office.join(' · ')}\n\nKombinasi desain + dev + IT ini yang bikin Diki versatile banget!`,
  },

  // ---- PHOTOSHOP / ILLUSTRATOR / dll ----
  {
    keys: ['photoshop', 'illustrator', 'coreldraw', 'indesign', 'adobe'],
    reply: (lang) => lang === 'en'
      ? `Diki is fluent across major design suites:\n\n• **Adobe Photoshop** — photo editing, compositing, mockups\n• **Adobe Illustrator** — logos, vectors, illustrations\n• **Adobe InDesign** — editorial layouts, books, magazines\n• **CorelDraw** — print production & prepress files`
      : `Diki fasih di seluruh suite desain utama:\n\n• **Adobe Photoshop** — compositing, foto editing, mockup\n• **Adobe Illustrator** — logo, vector, ilustrasi\n• **Adobe InDesign** — layout buku, majalah, editorial\n• **CorelDraw** — desain cetak, file prepress\n\nSemua dipakai aktif di pengalaman kerjanya sehari-hari.`,
  },

  // ---- WEB / CODING ----
  {
    keys: ['coding', 'code', 'web', 'html', 'css', 'javascript', 'nextjs', 'next.js', 'vite', 'electron', 'capacitor', 'app', 'aplikasi'],
    reply: (lang) => lang === 'en'
      ? `Beyond design, Diki also writes code! 🚀\n\n• **HTML/CSS** — modern responsive styling\n• **Next.js / Vite** — web applications\n• **Capacitor** — web-to-mobile app conversion\n• **Electron** — cross-platform desktop apps\n\nA rare combination for graphic designers!`
      : `Selain desain, Diki juga bisa coding! 🚀\n\n• **HTML/CSS** — frontend basic\n• **Next.js / Vite** — web apps\n• **Capacitor** — convert web jadi mobile app\n• **Electron** — desktop app\n\nIni nilai tambah yang jarang dimiliki graphic designer lain — Diki bisa komunikasi dengan developer dan bahkan build tools sendiri.`,
  },

  // ---- IT SUPPORT ----
  {
    keys: ['it', 'it support', 'komputer', 'pc', 'hardware', 'lan', 'jaringan', 'instalasi', 'servis', 'rakit', 'network'],
    reply: (lang) => lang === 'en'
      ? `Diki has a solid **IT Support** background:\n\n• Custom PC building & repair\n• OS installation (Windows/Linux)\n• LAN network setup\n• Hardware troubleshooting`
      : `Diki juga punya background **IT Support**:\n\n• Servis & rakit PC dari nol\n• Instalasi OS (Windows, dll)\n• Setup jaringan LAN\n• Troubleshooting hardware\n\nJadi kalau kantor butuh orang yang bisa desain sekaligus beresin masalah komputer, Diki bisa dua-duanya! 😄`,
  },

  // ---- PREPRESS ----
  {
    keys: ['prepress', 'cetak', 'offset', 'cmyk', 'bleed', 'separasi', 'laminasi', 'uv', 'finishing', 'print ready'],
    reply: (lang) => lang === 'en'
      ? `Prepress is one of Diki's strong highlights:\n\n• Print file preparation (Digital & Offset)\n• Color management & CMYK separation\n• Bleed, crop marks, trapping\n• Machinery operation & finishing (UV, lamination, emboss)`
      : `Prepress adalah salah satu keunggulan Diki yang jarang dimiliki desainer pure digital:\n\n• File setup untuk cetak digital & offset\n• Color profile & CMYK separation\n• Bleed, crop mark, trapping\n• Operasi mesin printing & cutting\n• Finishing: laminasi, UV coating, emboss`,
  },

  // ---- PORTFOLIO / BEHANCE ----
  {
    keys: ['portfolio', 'karya', 'project', 'behance', 'lihat karya', 'contoh', 'work', 'projects'],
    reply: (lang) => lang === 'en'
      ? `You can view Diki's design portfolio on **Behance**:\n👉 behance.net/ikirieyu\n\nOr browse the Portfolio section above on this page!`
      : `Karya-karya Diki bisa dilihat di **Behance**:\n👉 behance.net/ikirieyu\n\nDi webfolio ini juga ada section Portfolio dengan 3 kategori:\n• **E-commerce & Promo** — banner Shopee, campaign\n• **Print & Branding** — brosur, layout buku/majalah\n• **Prepress & Produksi** — file prepress, die cut\n\nCek section Portfolio di atas! ⬆️`,
  },

  // ---- INSTAGRAM ----
  {
    keys: ['instagram', 'ig', 'iki.rieyu', 'sosmed', 'social media'],
    reply: (lang) => lang === 'en'
      ? `Diki is active on Instagram **@iki.rieyu**:\n📸 instagram.com/iki.rieyu`
      : `Diki aktif di Instagram **@iki.rieyu** — bisa lihat aktivitas desain terbarunya di sana.\n\n📸 instagram.com/iki.rieyu\n\nSection Instagram di webfolio ini juga nunjukin feed Reels terbaru dari akun tersebut!`,
  },

  // ---- GITHUB ----
  {
    keys: ['github', 'git', 'repo', 'repository', 'kode', 'source code', 'project dev', 'coding project'],
    reply: (lang) => lang === 'en'
      ? `Check out Diki's GitHub profile:\n🐙 github.com/ikirieyu`
      : `Diki punya akun GitHub di **github.com/ikirieyu** 🐙\n\nDi sana kamu bisa lihat project-project dev-nya — dari web app (Next.js/Vite), mobile (Capacitor), sampai desktop (Electron).\n\nLink langsung: https://github.com/ikirieyu`,
  },

  // ---- KONTAK / HIRE ----
  {
    keys: ['kontak', 'contact', 'hubungi', 'hire', 'rekrut', 'freelance', 'kolaborasi', 'harga', 'rate', 'bayaran', 'available', 'tersedia', 'whatsapp', 'wa', 'email'],
    reply: (lang) => lang === 'en'
      ? `Diki is available for:\n✅ Freelance projects\n✅ Full-time / part-time positions\n✅ Creative collaborations\n\nDirect channels:\n📱 **WhatsApp**: ${DIKI.contact.whatsapp}\n📸 **Instagram**: ${DIKI.contact.instagram}\n🎨 **Behance**: ${DIKI.contact.behance}\n🐙 **GitHub**: ${DIKI.contact.github}`
      : `Diki terbuka untuk:\n\u2705 Freelance project\n\u2705 Full-time / part-time\n\u2705 Kolaborasi kreatif\n\nCara kontak langsung:\n\ud83d\udcf1 **WhatsApp**: ${DIKI.contact.whatsapp}\n\ud83d\udcf8 **Instagram**: ${DIKI.contact.instagram}\n\ud83c\udfa8 **Behance**: ${DIKI.contact.behance}\n\ud83d\udc19 **GitHub**: ${DIKI.contact.github}\n\nBiasanya response dalam 24 jam. Scroll ke bawah ke section Contact untuk link langsung! \u2b07\ufe0f`,
  },

  // ---- LOKASI ----
  {
    keys: ['lokasi', 'location', 'domisili', 'tinggal', 'where', 'dimana', 'jakarta', 'remote', 'wfo', 'wfh'],
    reply: (lang) => lang === 'en'
      ? `Diki is based in **West Jakarta, Indonesia**.\n\nWork arrangements:\n• On-site / WFO in Jakarta area\n• Remote work globally\n• Freelance contracts`
      : `Diki berdomisili di **${DIKI.location}**.\n\nUntuk urusan kerja, dia fleksibel:\n• WFO di area Jakarta & sekitarnya\n• Remote work untuk klien mana saja\n• Freelance project juga bisa dari luar kota/luar negeri`,
  },

  // ---- STRENGTH / KEUNGGULAN ----
  {
    keys: ['keunggulan', 'kelebihan', 'beda', 'unik', 'strengths', 'kenapa harus pilih', 'why hire'],
    reply: (lang) => lang === 'en'
      ? `Why hire Diki?\n\n**⚡ High Volume & Consistency**: Experienced producing 20+ promo designs/week.\n**🖨️ Prepress Master**: Direct experience operating print machinery.\n**💻 Designer Who Codes**: HTML/CSS, Next.js, Capacitor, Electron.\n**🔧 IT Savvy**: Strong hardware & troubleshooting knowledge.`
      : `Kenapa pilih Diki? Beberapa hal yang bikin dia stand out:\n\n**⚡ Volume tinggi, kualitas terjaga**\n Terbiasa produksi 20+ desain/minggu di DW Group\n\n**🖨️ Tahu cetak dari dalam**\n Pernah operasikan mesin printing sendiri — file desainnya selalu production-ready\n\n**💻 Designer yang bisa coding**\n HTML/CSS, Next.js, Capacitor, Electron — nilai tambah langka\n\n**🔧 IT Savvy**\nPaham hardware & jaringan — komunikasi lebih mudah dengan tim teknis`,
  },

  // ---- TERIMA KASIH ----
  {
    keys: ['makasih', 'thanks', 'terima kasih', 'thank you', 'mantap', 'keren', 'oke', 'ok', 'siap', 'noted'],
    reply: (lang) => lang === 'en'
      ? `You're welcome! 😊 Feel free to ask if you have more questions about Diki, or connect with him via WhatsApp **${DIKI.contact.whatsapp}**!`
      : `Sama-sama! 😊 Kalau ada pertanyaan lain tentang Diki, tanya aja — saya siap bantu.\n\nAtau langsung hubungi Diki via WhatsApp **${DIKI.contact.whatsapp}** ya!`,
  },

  // ---- FALLBACK ----
  {
    keys: [],
    reply: (lang, q) => lang === 'en'
      ? `Hmm, I don't have information on "${q.slice(0, 40)}${q.length > 40 ? '…' : ''}" yet.\n\nTry asking about:\n• Work experience\n• Design & technical skills\n• Contact & hiring info\n• Portfolio & projects`
      : `Hmm, saya belum bisa jawab tentang "${q.slice(0, 40)}${q.length > 40 ? '…' : ''}".\n\nCoba tanya soal:\n• Pengalaman kerja Diki\n• Skill & software yang digunakan\n• Cara kontak atau hire Diki\n• Portfolio & karya`,
    isFallback: true,
  },
];

/* ============================================================
   MATCH ENGINE
   ============================================================ */
function getReply(userInput) {
  const q = userInput.toLowerCase().trim();
  const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'id';

  for (const item of KB) {
    if (item.isFallback) continue;
    if (item.keys.some(k => q.includes(k))) {
      return item.reply(lang, q);
    }
  }

  // Fallback
  return KB[KB.length - 1].reply(lang, userInput);
}

/* ============================================================
   SUGGESTED QUESTIONS
   ============================================================ */
const SUGGESTIONS_DICT = {
  id: [
    'Di mana Diki pernah kerja?',
    'Bisa lihat portfolio-nya?',
    'Cara kontak Diki?',
    'Apa yang bikin Diki beda?',
  ],
  en: [
    'Where has Diki worked?',
    'Can I see his portfolio?',
    'How to contact Diki?',
    'What sets Diki apart?',
  ],
};

/* ============================================================
   RENDER MARKDOWN SIMPLE
   ============================================================ */
function renderMarkdown(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')  // **bold**
    .replace(/\*(.+?)\*/g, '<em>$1</em>')              // *italic*
    .replace(/\n/g, '<br>');                            // newline
}

/* ============================================================
   BUILD DOM
   ============================================================ */
function buildChatbot() {
  /* ---- FAB Button ---- */
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

  /* ---- Chat Panel ---- */
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
        <span class="chat-status"><span class="status-dot"></span> <span data-i18n="chatbot.sub">Online</span></span>
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
        maxlength="200"
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
  const wrap = document.createElement('div');
  wrap.className = `chat-msg chat-msg-${role}${animate ? ' chat-msg-in' : ''}`;

  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble';
  bubble.innerHTML = renderMarkdown(text);

  wrap.appendChild(bubble);
  container.appendChild(wrap);
  container.scrollTop = container.scrollHeight;
}

function appendTyping() {
  const container = document.getElementById('chat-messages');
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
  const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'id';
  const list = SUGGESTIONS_DICT[lang] || SUGGESTIONS_DICT.id;

  list.forEach(q => {
    const btn = document.createElement('button');
    btn.className = 'suggestion-chip';
    btn.textContent = q;
    btn.addEventListener('click', () => {
      sendMessage(q);
      hideSuggestions();
    });
    container.appendChild(btn);
  });
}

function hideSuggestions() {
  const c = document.getElementById('chat-suggestions');
  if (c) c.style.display = 'none';
}

window.addEventListener('languageChanged', () => {
  renderSuggestions();
});

/* ============================================================
   SEND MESSAGE
   ============================================================ */
function sendMessage(text) {
  const input = document.getElementById('chat-input');
  const msg = (text || (input && input.value.trim()));
  if (!msg) return;
  if (input) input.value = '';

  hideSuggestions();
  appendMessage('user', msg);

  // Typing delay
  appendTyping();
  const delay = 600 + Math.random() * 600;
  setTimeout(() => {
    removeTyping();
    const reply = getReply(msg);
    appendMessage('bot', reply);
  }, delay);
}

/* ============================================================
   TOGGLE PANEL
   ============================================================ */
let chatOpen = false;

function openChat() {
  chatOpen = true;
  const panel = document.getElementById('chat-panel');
  const fab   = document.getElementById('chat-fab');
  panel.classList.add('open');
  panel.setAttribute('aria-hidden', 'false');
  fab.setAttribute('aria-expanded', 'true');
  fab.querySelector('.fab-icon-chat').style.display = 'none';
  fab.querySelector('.fab-icon-close').style.display = 'flex';

  // Render initial history once
  const msgs = document.getElementById('chat-messages');
  if (msgs && msgs.children.length === 0) {
    const lang = typeof getCurrentLanguage === 'function' ? getCurrentLanguage() : 'id';
    const initGreeting = lang === 'en'
      ? `Hello! 👋 I'm Diki Permana's AI assistant.\n\nAsk me anything about Diki — experience, skills, portfolio, or contact details!`
      : `Halo! 👋 Saya asisten virtual **Diki Permana**.\n\nTanya apa saja tentang Diki — pengalaman, skill, portfolio, atau cara menghubunginya!`;
    appendMessage('bot', initGreeting, false);
    renderSuggestions();
  }

  setTimeout(() => {
    const inp = document.getElementById('chat-input');
    if (inp) inp.focus();
  }, 320);
}

function closeChat() {
  chatOpen = false;
  const panel = document.getElementById('chat-panel');
  const fab   = document.getElementById('chat-fab');
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

  document.getElementById('chat-fab').addEventListener('click', () => {
    chatOpen ? closeChat() : openChat();
  });

  document.getElementById('chat-close-btn').addEventListener('click', closeChat);

  document.getElementById('chat-send-btn').addEventListener('click', () => sendMessage());

  document.getElementById('chat-input').addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && chatOpen) closeChat();
  });
});
