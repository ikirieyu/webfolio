# Case Study Asset Naming

Gunakan satu folder per project supaya aset rapi dan urutannya gampang dikontrol.

Contoh folder:

```text
asset/case-studies/nova-desk/
```

## Naming yang direkomendasikan

Jangan pakai `a.png`, `b.png`, `c.png`.

Pakai prefix angka dua digit supaya urutan selalu jelas:

```text
00-cover.webp
01-brand-overview.webp
02-storefront.webp
03-product-detail.webp
04-campaign.webp
05-social-media.webp
06-final-mockup.webp
```

Format `webp` direkomendasikan untuk web karena ukuran file lebih kecil. PNG/JPG tetap bisa dipakai.

## Cover

File dengan nama:

```text
00-cover.webp
```

akan dipakai sebagai visual cover case study jika project memakai sistem `caseStudy.assets`.

## Gambar biasa

Nama seperti:

```text
01-brand-overview.webp
02-storefront.webp
03-product-detail.webp
```

akan tampil satu per satu sesuai urutan angkanya.

## Dua gambar berdampingan

Gunakan prefix block yang sama + `pair`:

```text
04-pair-01.webp
04-pair-02.webp
```

Keduanya otomatis dianggap satu block 2 kolom.

Di mobile otomatis menjadi 1 kolom.

## Slider / carousel

Gunakan prefix block yang sama + `slider`:

```text
05-slider-01.webp
05-slider-02.webp
05-slider-03.webp
05-slider-04.webp
```

Semua file dengan prefix `05-slider-` otomatis dianggap satu slider.

Desktop:
- tombol kiri / kanan
- counter slide

Mobile:
- swipe horizontal
- tombol kiri / kanan tetap tersedia
- scroll snap aktif

## Contoh struktur lengkap

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

Urutan tampil:

1. Cover
2. Brand overview
3. Pair 2 gambar
4. Storefront
5. Slider 3 gambar
6. Campaign
7. Social media
8. Final mockup

## Hubungkan ke project

Di `portfolio-data.js`, isi `caseStudy.assets` seperti ini:

```js
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
  }
}
```

Renderer akan mengurutkan file berdasarkan nomor dan mengelompokkan `pair` / `slider` otomatis.

## Penting

GitHub Pages adalah static hosting. Browser tidak bisa membaca isi folder repository secara otomatis dengan aman tanpa GitHub API. Karena itu daftar `files` tetap perlu ditulis di `portfolio-data.js`.

Keuntungannya: urutan visual tetap deterministic, tidak tergantung API, lebih cepat, dan tidak terkena rate limit GitHub.
