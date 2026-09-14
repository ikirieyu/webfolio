export default {
  id: 'personal-webfolio',
  category: 'github',
  published: true,
  featured: false,
  order: 2,

  label: 'Webfolio',
  year: '2026',
  role: 'Design & Frontend Development',

  title: {
    id: 'Personal Webfolio',
    en: 'Personal Webfolio'
  },

  description: {
    id: 'Webfolio personal berbasis HTML, CSS, dan JavaScript dengan sistem portfolio modular dan case study interaktif.',
    en: 'Personal webfolio built with HTML, CSS, and JavaScript with a modular portfolio system and interactive case studies.'
  },

  tags: ['HTML/CSS', 'JavaScript', 'GitHub Pages'],

  eyebrow: {
    id: 'GitHub Web Project',
    en: 'GitHub Web Project'
  },

  subtitle: {
    id: 'Website portfolio personal yang dibuat sebagai rumah utama untuk case study e-commerce, branding, dan project digital.',
    en: 'A personal portfolio website built as the main home for e-commerce, branding, and digital project case studies.'
  },

  overview: {
    id: 'Project webfolio ini dibangun dengan HTML, CSS, dan JavaScript tanpa framework besar. Fokusnya bukan sekadar landing page, tetapi sistem portfolio modular yang memungkinkan setiap project punya data, aset, cover, urutan visual, pair image, slider, dan halaman case study sendiri.',
    en: 'This webfolio is built with HTML, CSS, and JavaScript without a large framework. The goal is not just a landing page, but a modular portfolio system where each project can define its own data, assets, cover, visual order, image pairs, sliders, and case study page.'
  },

  challenge: {
    id: 'Portfolio harus tetap mudah dirawat saat jumlah project bertambah. Jika semua data ditumpuk dalam satu file atau setiap project membutuhkan HTML baru, struktur akan cepat berantakan dan sulit diperbarui.',
    en: 'The portfolio needs to remain maintainable as the number of projects grows. Putting all data into one large file or creating a separate HTML page for every project would quickly become difficult to manage.'
  },

  approach: {
    id: 'Setiap project dipisahkan ke folder sendiri di direktori projects, lengkap dengan project.js dan assets. Registry pusat hanya mendaftarkan file project, sedangkan homepage dan renderer case study membaca data tersebut secara otomatis.',
    en: 'Each project lives in its own folder under the projects directory, with its own project.js and assets. A central registry only lists project modules, while the homepage and case study renderer consume that data automatically.'
  },

  blocks: [
    {
      type: 'text',
      kicker: { id: 'System', en: 'System' },
      title: { id: 'Modular Project Architecture', en: 'Modular Project Architecture' },
      body: {
        id: 'Untuk menambah project baru cukup copy folder template, ubah data project, masukkan aset, lalu daftarkan satu file di registry. Homepage, kategori, urutan project, cover, dan halaman detail akan mengikuti data tanpa perlu membuat ulang layout.',
        en: 'Adding a new project only requires copying the template folder, editing its project data, adding assets, and registering one file in the registry. The homepage, categories, project order, cover, and detail page are then generated from that data without rebuilding the layout.'
      }
    },
    {
      type: 'text',
      kicker: { id: 'Presentation', en: 'Presentation' },
      title: { id: 'Behance-style Case Studies', en: 'Behance-style Case Studies' },
      body: {
        id: 'Halaman detail mendukung cover, narasi project, gambar full-width, dua gambar berdampingan, slider/carousel, versi mobile responsive, serta tombol menuju Behance atau repository GitHub jika project memiliki sumber eksternal.',
        en: 'Detail pages support a cover, project narrative, full-width imagery, paired images, slider/carousel blocks, responsive mobile layouts, and links to Behance or a GitHub repository when an external source is available.'
      }
    }
  ],

  theme: 'linear-gradient(135deg, #1B4D3E 0%, #1d2b26 60%, #0e1512 100%)',
  repoUrl: 'https://github.com/ikirieyu/webfolio',
  externalLink: 'https://github.com/ikirieyu/webfolio',

  // Project GitHub tetap dibuka ke halaman penjelasan internal terlebih dahulu.
  caseStudy: {}
};
