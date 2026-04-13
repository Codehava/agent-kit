# 📖 Kamus Istilah — Untuk Non-Coder

> Kamu tidak perlu hafal semua istilah ini. Gunakan sebagai referensi kalau ada istilah teknis yang tidak kamu mengerti.

---

## A

**API**
> Cara dua aplikasi "berbicara" satu sama lain. Contoh: tombol "Login dengan Google" di aplikasi kamu menghubungi API Google untuk verifikasi identitas.

**Authentication / Auth**
> Sistem login — memastikan pengguna yang akses adalah benar-benar mereka. Contoh: login dengan email+password, atau login dengan Google.

---

## B

**Backend**
> Bagian "dapur" aplikasi — server, database, logika bisnis yang tidak terlihat user tapi menggerakkan semuanya. Lawannya adalah Frontend.

**Branch (Git)**
> Salinan kode yang dibuat untuk mengerjakan fitur baru tanpa mengganggu kode utama. Seperti "draft dokumen" sebelum dipublish ke versi final.

**BullMQ**
> Sistem antrian tugas untuk server. Bayangkan mesin kasir yang mengantri pesanan — BullMQ memastikan tugas-tugas berat (misal: kirim email massal) tidak bikin server crash, melainkan dikerjakan satu per satu secara teratur.

---

## C

**CLI**
> Command Line Interface — cara berinteraksi dengan komputer menggunakan teks di terminal, bukan klik-klik seperti biasa.

**Component**
> Bagian kecil dari tampilan yang bisa dipakai berulang. Contoh: tombol, card, form input — masing-masing adalah "component" yang bisa dipakai di banyak halaman.

**Coolify**
> Platform deployment self-hosted. Seperti Vercel/Heroku tapi kamu punya kontrolnya sendiri dan diinstall di VPS kamu.

**CSS**
> Bahasa yang mengatur tampilan — warna, ukuran font, jarak antar elemen, dll.

---

## D

**Database**
> Tempat menyimpan data aplikasi secara terstruktur. Seperti spreadsheet Excel tapi jauh lebih canggih dan bisa diakses jutaan user sekaligus.

**Deploy / Deployment**
> Proses memindahkan aplikasi dari komputer developer ke server agar bisa diakses publik melalui internet.

**Docker**
> Teknologi yang "membungkus" aplikasi beserta semua kebutuhannya agar bisa berjalan di komputer manapun dengan hasil yang sama.

---

## E

**Environment Variables (env)**
> Data rahasia aplikasi (API keys, password database, dll.) yang disimpan di luar kode agar tidak bisa dibaca orang lain. Disimpan di file `.env`.

**Error / Bug**
> Kesalahan yang membuat aplikasi tidak berjalan seperti seharusnya.

---

## F

**FCM (Firebase Cloud Messaging)**
> Layanan Google untuk mengirim push notification ke aplikasi mobile (notifikasi yang muncul di HP walau app ditutup).

**Frontend**
> Bagian yang terlihat dan berinteraksi langsung dengan pengguna — tampilan, tombol, form, dll. Lawannya adalah Backend.

**Flutter**
> Framework Google untuk membuat aplikasi mobile (Android + iOS) dengan satu kode yang sama.

---

## G

**Git**
> Sistem untuk melacak perubahan kode. Seperti "history" di Google Docs — kamu bisa lihat siapa yang ubah apa, kapan, dan bisa kembali ke versi sebelumnya.

**GitHub**
> Platform online untuk menyimpan kode dengan Git. Seperti Google Drive tapi khusus untuk kode.

---

## H

**Halusinasi AI**
> Saat AI "mengarang" informasi yang tidak akurat atau membuat kode yang terlihat benar tapi sebenarnya salah. MCP servers (terutama Context7 dan Brave Search) membantu mencegah ini.

---

## J

**JSON**
> Format data berbasis teks yang dibaca oleh mesin. Seperti spreadsheet tapi dalam bentuk teks dengan kurung kurawal `{}`.

---

## M

**MCP (Model Context Protocol)**
> "Plugin" untuk AI yang memberikan kemampuan tambahan — bisa baca database, search internet, akses GitHub, dll.

**Migration (Database)**
> Perubahan struktur database (tambah kolom, hapus tabel, dll.) yang dilakukan secara terstruktur dan aman.

**MVP (Minimum Viable Product)**
> Versi paling sederhana dari produk yang sudah bisa dipakai user nyata. Cukup fitur inti — tidak perlu sempurna dulu.

---

## N

**Next.js**
> Framework JavaScript untuk membangun web app yang cepat dan SEO-friendly.

**Node.js**
> Platform yang memungkinkan JavaScript berjalan di server (bukan hanya di browser).

---

## P

**Package / Dependency**
> Library kode yang dibuat orang lain dan kamu "pinjam" untuk proyekmu. Diinstall via `npm install`.

**PostgreSQL**
> Database yang sangat handal dan populer untuk aplikasi serius.

**Prisma**
> Tool yang memudahkan developer menulis query database menggunakan TypeScript — seperti "penerjemah" antara kode dan database.

**PRD (Product Requirements Document)**
> Dokumen yang menjelaskan apa saja fitur yang harus ada di aplikasi, dari sudut pandang produk/bisnis.

**Production**
> Versi aplikasi yang sudah live dan dipakai user nyata. Lawannya adalah Development/Staging.

**Push Notification**
> Notifikasi yang muncul di HP pengguna dari aplikasimu — baik ketika app sedang dibuka maupun tidak.

---

## R

**Redis**
> Database super cepat yang dipakai untuk menyimpan data sementara (cache) dan antrian tugas (BullMQ butuh Redis).

**Repository / Repo**
> Folder project kode yang disimpan dengan Git, biasanya di GitHub.

**Route / Routing**
> Sistem yang menentukan halaman mana yang muncul saat pengguna mengunjungi URL tertentu. Contoh: `/login` → halaman login, `/dashboard` → halaman dashboard.

---

## S

**Schema**
> Struktur/blueprint database — mendefinisikan tabel apa saja ada, kolom apa saja, dan aturan-aturan datanya.

**Server**
> Komputer yang selalu menyala dan menyajikan aplikasi kamu ke internet. Di project ini, server di-host di VPS Biznet Gio via Coolify.

**Socket.io**
> Library untuk komunikasi realtime antara server dan browser. Dipakai untuk fitur chat, notifikasi live, update data tanpa refresh halaman.

**Sprint**
> Periode kerja singkat (biasanya 1-2 minggu) dengan target fitur yang jelas. Di PAUL loop, satu sprint = satu /apply + /unify cycle.

**SRS (Software Requirements Specification)**
> Dokumen teknis yang menjelaskan bagaimana sistem seharusnya bekerja secara detail — lebih teknis dari PRD.

**Stack**
> Kumpulan teknologi yang dipakai dalam satu aplikasi. Contoh: "Next.js + PostgreSQL + Flutter" adalah satu stack.

---

## T

**Terminal**
> Aplikasi teks di komputer untuk menjalankan perintah. Di Mac: aplikasi "Terminal". Di Windows: "Command Prompt" atau "PowerShell".

**TypeScript**
> Bahasa pemrograman yang merupakan JavaScript versi lebih ketat — membantu AI dan developer menghindari banyak jenis error.

---

## U

**UU PDP**
> Undang-Undang Perlindungan Data Pribadi Indonesia (No. 27 Tahun 2022). Mengatur bagaimana data pribadi user (NIK, rekening, dll.) harus disimpan dan dilindungi.

---

## V

**VPS (Virtual Private Server)**
> Server virtual yang kamu sewa di cloud. Di project ini menggunakan Biznet Gio (Indonesia) agar comply UU PDP.

---

## W

**Webhook**
> Cara layanan eksternal (misalnya Xendit) memberitahu aplikasi kamu saat sesuatu terjadi. Contoh: setelah pembayaran sukses, Xendit "mengetuk pintu" (webhook) aplikasi kamu untuk memberitahu.

---

## X

**Xendit**
> Payment gateway Indonesia yang dipakai untuk memproses pembayaran — transfer bank, QRIS, kartu kredit, OVO, dll.

---

## Z

**Zod**
> Library untuk validasi data. Memastikan data yang masuk ke aplikasi sesuai format yang diharapkan sebelum disimpan ke database.

---

*Tidak ada dalam kamus? Tanya ke AI di Antigravity: "Jelaskan apa itu [istilah] dalam bahasa sederhana"* 😊
