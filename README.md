# Admin Dashboard - Oprec FOSTI

Repositori ini berisi kode sumber untuk Dasbor Admin Pendaftaran Terbuka (Oprec) FOSTI. Dasbor ini dibuat untuk mengelola data pendaftar, dengan fitur untuk melihat, menambah, mengedit, dan menghapus data. Proyek ini dibangun menggunakan **React**, **Vite**, **TypeScript**, dan **Tailwind CSS**.

*Demo Login dengan username* **adminadmin** *password* **admin123**

![Logo FOSTI](src/logo_putih.png)

## ✨ Fitur Utama

* **Autentikasi Pengguna**: Halaman login yang aman untuk admin.
* **Dasbor Utama**: Menampilkan statistik penting seperti jumlah total pendaftar dan fakultas, serta grafik pendaftar harian.
* **Manajemen Pendaftar**:
    * Menampilkan seluruh pendaftar dalam format tabel dengan paginasi.
    * Fitur **pencarian** untuk menyaring pendaftar berdasarkan nama, NIM, email, atau fakultas.
    * **Menambah** data pendaftar baru melalui dialog modal.
    * **Mengedit** informasi pendaftar yang sudah ada.
    * **Menghapus** data pendaftar.
    * **Melihat detail** informasi setiap pendaftar.
    * **Menerima** pendaftar, yang akan memicu pengiriman email notifikasi.
* **Ekspor ke Excel**: Kemampuan untuk mengunduh semua data pendaftar dalam format `.xlsx`.
* **Desain Responsif**: Antarmuka yang dapat beradaptasi dengan berbagai ukuran layar, dari desktop hingga seluler, berkat bilah sisi yang dapat diciutkan dan komponen yang responsif.
* **Mode Terang & Gelap**: Opsi untuk beralih antara tema terang dan gelap untuk kenyamanan visual.

## 🛠️ Tumpukan Teknologi

* **Kerangka Kerja**: [React](https://reactjs.org/)
* **Bundler**: [Vite](https://vitejs.dev/)
* **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
* **Styling**: [Tailwind CSS](https://tailwindcss.com/)
* **Manajemen Status Asinkron**: [Tanstack Query](https://tanstack.com/query)
* **Manajemen Formulir**: [React Hook Form](https://react-hook-form.com/)
* **Validasi Skema**: [Zod](https://zod.dev/)
* **Permintaan HTTP**: [Axios](https://axios-http.com/)
* **Routing**: [React Router](https://reactrouter.com/)
* **Pustaka Ikon**: [Lucide React](https://lucide.dev/)

## 🚀 Memulai

Ikuti langkah-langkah ini untuk menjalankan proyek secara lokal di mesin Anda.

### Prasyarat

Pastikan Anda telah menginstal [Node.js](https://nodejs.org/) (disarankan versi 18 atau lebih baru).

### Instalasi

1.  **Kloning repositori:**
    ```bash
    git clone [https://github.com/airlanggapradana/oprec-fosti-admin.git](https://github.com/airlanggapradana/oprec-fosti-admin.git)
    cd oprec-fosti-admin
    ```

2.  **Instal dependensi:**
    ```bash
    npm install
    ```

3.  **Siapkan Variabel Lingkungan:**
    Buat file `.env` baru di direktori root proyek Anda dan salin kontennya. Sesuaikan nilainya jika perlu.
    ```env
    VITE_BASE_API_URL=[https://api-oprec-fosti.vercel.app](https://api-oprec-fosti.vercel.app)
    VITE_SERVICE_ID=service_xxxxxxxx
    VITE_TEMPLATE_ID=template_xxxxxxxx
    VITE_PUBLIC_KEY=xxxxxxxxxxxxxxxx
    ```

4.  **Jalankan Server Pengembangan:**
    ```bash
    npm run dev
    ```

    Aplikasi sekarang akan berjalan di `http://localhost:5173` (atau port lain yang tersedia).
