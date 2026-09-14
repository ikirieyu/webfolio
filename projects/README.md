# Modular Portfolio Projects

Semua project portfolio sekarang dipisah per folder.

## Struktur

```text
projects/
├── registry.js
├── _template/
│   ├── project.js
│   └── assets/
├── bungakebaya/
│   ├── project.js
│   └── assets/
├── nova-desk/
│   ├── project.js
│   └── assets/
├── ziqi-pos/
│   ├── project.js
│   └── assets/
└── webfolio/
    └── project.js
```

## Tambah project baru

1. Copy folder `projects/_template/`.
2. Rename folder, contoh `projects/skincare-store/`.
3. Edit `projects/skincare-store/project.js`.
4. Masukkan semua gambar ke `projects/skincare-store/assets/`.
5. Tambahkan satu baris `skincare-store/project.js` ke `PROJECT_MODULES` di `projects/registry.js`.
6. Set `published: true` ketika siap tayang.

Homepage dan halaman case study otomatis membaca data project tersebut.

## Kenapa tetap ada registry.js?

GitHub Pages adalah static hosting dan tidak bisa scan folder repository secara langsung di browser tanpa API. `registry.js` menjadi manifest kecil yang menentukan file project mana yang dimuat. Jadi untuk menambah project, satu-satunya file global yang disentuh hanyalah `projects/registry.js`.

## Naming asset

```text
00-cover.webp
01-overview.webp
02-pair-01.webp
02-pair-02.webp
03-slider-01.webp
03-slider-02.webp
04-final.webp
```

Prefix angka menentukan urutan. `pair` otomatis dibuat 2 kolom. `slider` otomatis menjadi carousel/swipe.
