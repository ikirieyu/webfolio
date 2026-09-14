# Case Study System — Tambah Project Cukup dari Data + Aset

Sistem portfolio sekarang dibuat **data-driven**.

Artinya untuk project baru kamu **tidak perlu edit `index.html`, `project.html`, `main.js`, `project.js`, atau CSS**.

Cukup:

1. Buat folder aset project.
2. Masukkan gambar dengan nama yang mengikuti format di bawah.
3. Tambahkan satu object project di `portfolio-data.js`.
4. Set `published: true`.

Project otomatis:

- masuk ke daftar portfolio di homepage,
- masuk ke tab sesuai `category`,
- memakai `00-cover.*` sebagai thumbnail homepage,
- punya URL case study sendiri melalui `project.html?id=PROJECT_ID`,
- menyusun gambar berdasarkan nomor file,
- membuat pair dan slider berdasarkan nama file,
- responsive di desktop dan mobile.

---

## 1. Folder per project

Gunakan satu folder per project:

```text
asset/case-studies/nova-desk/
```

Project lain tinggal buat folder baru:

```text
asset/case-studies/kopi-kita/
asset/case-studies/office-store/
asset/case-studies/campaign-ramadan/
```

---

## 2. Naming aset

Jangan pakai `a.png`, `b.png`, `c.png`.

Pakai prefix angka dua digit:

```text
00-cover.webp
01-brand-overview.webp
02-storefront.webp
03-product-detail.webp
04-campaign.webp
05-social-media.webp
06-final-mockup.webp
```

`webp` direkomendasikan untuk web karena lebih ringan. PNG/JPG tetap didukung.

### Cover otomatis

```text
00-cover.webp
```

File `00-cover.*` otomatis digunakan untuk:

- thumbnail project di homepage,
- cover besar di halaman case study.

Jadi field `image` tidak wajib untuk project internal yang sudah punya `00-cover.*`.

---

## 3. Gambar full-width

File biasa:

```text
01-brand-overview.webp
02-storefront.webp
03-product-detail.webp
```

akan tampil berurutan sebagai block gambar full-width.

---

## 4. Dua gambar berdampingan

Gunakan prefix angka yang sama + `pair`:

```text
04-pair-01.webp
04-pair-02.webp
```

Hasil desktop:

```text
[ image 01 ] [ image 02 ]
```

Di mobile otomatis menjadi satu kolom.

---

## 5. Slider / carousel

Gunakan prefix angka yang sama + `slider`:

```text
05-slider-01.webp
05-slider-02.webp
05-slider-03.webp
05-slider-04.webp
```

Semua file `05-slider-*` otomatis menjadi satu carousel.

Desktop:

- tombol kiri / kanan,
- nomor slide,
- satu slide per viewport.

Mobile:

- swipe horizontal,
- scroll snap,
- tombol kiri / kanan tetap tersedia.

---

## 6. Contoh struktur lengkap

```text
asset/case-studies/nova-desk/
├── 00-cover.webp
├── 01-brand-overview.webp
├── 02-pair-01.webp
├── 02-pair-02.webp
├── 03-storefront.webp
├── 04-slider-01.webp
├── 04-slider-02.webp
├── 04-slider-03.webp
├── 05-campaign.webp
├── 06-social-media.webp
└── 07-final-mockup.webp
```

Urutan otomatis:

1. Cover
2. Brand overview
3. Pair dua gambar
4. Storefront
5. Slider tiga gambar
6. Campaign
7. Social media
8. Final mockup

---

# 7. Template Project Baru

Tambahkan object berikut ke `PORTFOLIO_DATA` di `portfolio-data.js`.

Ini sudah cukup untuk membuat project muncul di homepage **dan** membuat halaman case study internal.

```js
{
  id: "nova-desk",
  category: "ecommerce",
  published: true,
  featured: true,
  order: 1,

  label: "Marketplace Campaign",
  year: "2026",
  role: "E-commerce & Visual Design",

  title: {
    id: "NOVA DESK — Marketplace Launch",
    en: "NOVA DESK — Marketplace Launch"
  },

  description: {
    id: "Sistem visual marketplace untuk brand desk accessories.",
    en: "Marketplace visual system for a desk accessories brand."
  },

  tags: ["Marketplace", "Campaign", "Social Media", "Ads"],

  subtitle: {
    id: "Dari storefront, product visual, campaign sampai advertising dalam satu sistem visual.",
    en: "From storefront and product visuals to campaigns and advertising in one visual system."
  },

  overview: {
    id: "Project konsep untuk menunjukkan workflow e-commerce end-to-end.",
    en: "A concept project demonstrating an end-to-end e-commerce workflow."
  },

  challenge: {
    id: "Membuat banyak format campaign tanpa kehilangan konsistensi brand.",
    en: "Creating multiple campaign formats without losing brand consistency."
  },

  approach: {
    id: "Menggunakan layout modular dan design system yang reusable.",
    en: "Using modular layouts and a reusable design system."
  },

  assets: {
    folder: "asset/case-studies/nova-desk",
    files: [
      "00-cover.webp",
      "01-brand-overview.webp",
      "02-pair-01.webp",
      "02-pair-02.webp",
      "03-storefront.webp",
      "04-slider-01.webp",
      "04-slider-02.webp",
      "04-slider-03.webp",
      "05-campaign.webp",
      "06-social-media.webp",
      "07-final-mockup.webp"
    ],

    sliderTitles: {
      "04": {
        id: "Product Presentation",
        en: "Product Presentation"
      }
    },

    blockTitles: {
      "03": {
        id: "Marketplace Storefront",
        en: "Marketplace Storefront"
      },
      "05": {
        id: "Campaign System",
        en: "Campaign System"
      }
    }
  }
}
```

Tidak perlu membuat object `caseStudy` kalau tidak butuh konfigurasi khusus. Adanya `assets` saja sudah membuat project dianggap sebagai internal case study.

---

# 8. Mengatur urutan project

Gunakan:

```js
featured: true,
order: 1,
```

`featured: true` membuat project diprioritaskan sebagai featured card.

`order` mengatur urutan dalam kategori:

```text
order: 1
order: 2
order: 3
```

Kalau `order` tidak ditulis, urutannya mengikuti posisi object di `portfolio-data.js`.

---

# 9. Draft project

Untuk project yang belum siap tayang:

```js
published: false,
```

Project tetap ada di data tetapi tidak muncul di website.

Setelah selesai:

```js
published: true,
```

langsung muncul otomatis.

---

# 10. External project saja

Kalau project cuma ingin diarahkan ke Behance atau GitHub dan tidak membutuhkan halaman internal:

```js
{
  id: "logo-project",
  category: "branding",
  published: true,
  title: {
    id: "Brand Identity Project",
    en: "Brand Identity Project"
  },
  description: {
    id: "Branding project.",
    en: "Branding project."
  },
  image: "asset/project-cover.webp",
  link: "https://www.behance.net/...",
  tags: ["Branding"]
}
```

Tanpa `assets` / `caseStudy`, card otomatis dianggap external project.

---

# 11. Tambah kategori baru

Kalau suatu saat ingin kategori baru seperti `Social Media`, cukup tambahkan ke `PORTFOLIO_CATEGORIES`:

```js
{
  id: "social",
  name: {
    id: "Social Media",
    en: "Social Media"
  }
}
```

Lalu project cukup memakai:

```js
category: "social"
```

Tab baru otomatis muncul.

---

# Penting

GitHub Pages adalah static hosting. Browser tidak bisa membaca isi folder repository secara otomatis tanpa API tambahan.

Karena itu saat menambah gambar, nama file tetap perlu dimasukkan ke `assets.files` di `portfolio-data.js`.

Itu sengaja dipilih supaya:

- website tidak bergantung pada GitHub API,
- tidak terkena rate limit,
- loading lebih cepat,
- urutan gambar selalu konsisten,
- tidak perlu backend.

Jadi workflow normal ke depannya hanya:

```text
Tambah folder/gambar
        ↓
Tambah/edit satu object di portfolio-data.js
        ↓
Commit
        ↓
Project otomatis muncul di homepage + case study page
```
