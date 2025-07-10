# 🎮 Aplikasi Top-Up Game Digital

Sebuah aplikasi berbasis Vue.js yang memungkinkan pengguna melakukan pembelian top-up game seperti Mobile Legends, Genshin Impact, PUBG Mobile, Honkai Star Rail, dan Free Fire.

Aplikasi ini dibuat sebagai Tugas Akhir (UAS) untuk mata kuliah Pemrograman Berbasis Komponen.

---

## ✨ Fitur Utama

- ✅ Pemilihan game yang ingin di-topup
- ✅ Pemilihan nominal paket dan metode pembayaran
- ✅ Pengiriman data pesanan ke json-server (mock API)
- ✅ Halaman konfirmasi pembayaran dengan progress bar
- ✅ Halaman admin untuk melihat seluruh pesanan
- ✅ Penyimpanan state menggunakan Pinia
- ✅ Unit testing menggunakan Vitest

---

## 🚀 Cara Menjalankan Proyek

1. Clone repositori ini:
   git clone https://github.com/username/repo-topup-game.git
   cd repo-topup-game

2. Install dependencies:
   npm install

3. Jalankan json-server:
   npx json-server --watch public/db.json --port 3000

4. Jalankan Vue dev server:
   npm run dev

5. Buka di browser:
   http://localhost:5173

📁 Struktur Folder
php
Copy
Edit
├── src
│ ├── components
│ │ ├── TopUpForm.vue # Form input pemesanan
│ │ ├── OrderList.vue # Daftar pesanan
│ ├── views
│ │ ├── OrderPage.vue # Halaman pemesanan per game
│ │ ├── PaymentPage.vue # Konfirmasi dan status pembayaran
│ ├── router
│ │ └── index.js # Routing antar halaman
│ ├── stores
│ │ └── orderStore.js # Store global dengan Pinia
│ ├── App.vue
│ ├── main.js
├── public
│ └── db.json # Mock database untuk pesanan
├── README.md
├── package.json

🛠 Teknologi yang Digunakan
Vue 3 (Composition API)

Vite

Vue Router

Pinia (state management)

Axios (HTTP client)

json-server (mock REST API)

Vitest + @vue/test-utils (unit testing)

✅ Status Proyek
Fitur pemilihan game dan paket

Form pemesanan terhubung ke API

Halaman konfirmasi & progress pembayaran

Store global menggunakan Pinia

Admin view daftar pesanan

Unit Test minimal 1 komponen/store

👨‍💻 Penulis
Nama: Daniel Arkhan

NPM : 233510652

Prodi: Teknik Informatika

Mata Kuliah: Pemrograman Berbasis Komponen
