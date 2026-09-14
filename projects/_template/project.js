/* COPY seluruh folder _template, rename foldernya, lalu edit file ini. */

export default {
  id: 'ganti-id-project',
  category: 'ecommerce', // ecommerce | branding | github
  published: false,
  featured: false,
  order: 99,

  label: 'Project Type',
  year: '2026',
  role: 'Your Role',

  title: {
    id: 'Judul Project',
    en: 'Project Title'
  },

  description: {
    id: 'Deskripsi pendek untuk kartu portfolio.',
    en: 'Short description for the portfolio card.'
  },

  tags: ['Tag 1', 'Tag 2', 'Tag 3'],

  eyebrow: {
    id: 'Case Study',
    en: 'Case Study'
  },

  subtitle: {
    id: 'Kalimat pendek untuk hero halaman case study.',
    en: 'Short sentence for the case study hero.'
  },

  overview: {
    id: 'Jelaskan project dan tujuannya.',
    en: 'Explain the project and its goal.'
  },

  challenge: {
    id: 'Masalah atau tantangan utama project.',
    en: 'Main problem or challenge.'
  },

  approach: {
    id: 'Cara atau strategi yang dipakai.',
    en: 'Approach or strategy used.'
  },

  // Opsional. Isi kalau project juga dipublish di Behance / sumber lain.
  externalLink: '',

  assets: {
    folder: 'projects/GANTI-NAMA-FOLDER/assets',
    files: [
      '00-cover.webp',
      '01-overview.webp',
      '02-pair-01.webp',
      '02-pair-02.webp',
      '03-slider-01.webp',
      '03-slider-02.webp',
      '04-final.webp'
    ],
    sliderTitles: {
      '03': {
        id: 'Gallery',
        en: 'Gallery'
      }
    }
  }
};
