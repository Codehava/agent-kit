# 🔌 Panduan Setup MCP Servers
> Tanpa MCP, AI kamu seperti kerja tanpa internet dan buku referensi.
> Dengan MCP, AI kamu punya akses realtime ke dokumentasi, database, dan berbagai tools.

---

## Apa Itu MCP?

MCP (Model Context Protocol) adalah **"plugin"** untuk AI. Analoginya:

- **Tanpa MCP:** AI seperti konsultan yang hanya ingat pengetahuan dari 2024
- **Dengan MCP:** AI bisa buka internet, baca database kamu, cek error production, dll. — **saat ini, realtime**

---

## Tingkatan MCP

| Tingkat | MCP | Fungsi | Perlu API Key? |
|---------|-----|--------|----------------|
| 🔴 **WAJIB** | Context7 | Docs library terbaru (Next.js, Prisma, dll.) | Tidak (opsional untuk quota lebih) |
| 🔴 **WAJIB** | Brave Search | AI bisa search Google untuk hindari halusinasi | Ya — gratis |
| 🔴 **WAJIB** | Sequential Thinking | AI berpikir lebih terstruktur saat debugging | Tidak |
| 🔴 **WAJIB** | GitHub | Buat issue, baca PR langsung dari IDE | Ya — gratis |
| 🟡 **Berguna** | PostgreSQL | AI bisa baca database langsung | Tidak (gunakan local DB) |
| 🟡 **Berguna** | Playwright | AI bisa test UI di browser otomatis | Tidak |
| 🟡 **Berguna** | Sentry | AI lihat error production langsung | Ya — ada free tier |
| 🟡 **Berguna** | Docker | AI bisa manage container langsung | Tidak |
| 🟡 **Berguna** | Zapier | AI jalankan 8.000+ aplikasi (email, Sheets, Notion, dll.) | Ya — ada free tier |
| 🟢 **Opsional** | Figma | AI baca desain Figma → jadi kode | Ya |
| 🟢 **Opsional** | Firecrawl | AI scrape website untuk riset | Ya — ada free tier |
| 🟢 **Opsional** | Google Stitch | AI baca design system dari Stitch | Ya |
| 🟢 **Opsional** | Remotion | AI buat & render video programatik | **Tidak — langsung aktif** |

---

## Cara Install MCP di Antigravity

### Langkah 1 — Buka MCP Manager

Di Antigravity:
1. Klik ikon **...** (tiga titik) di bagian kiri atas
2. Pilih **MCP Servers**
3. Pilih **Manage MCP Servers**
4. Klik **View raw config**

Kamu akan melihat file JSON kosong atau yang sudah ada. Salin isi dari `.agent/mcp_config.json` ke sini.

---

### Langkah 2 — Dapatkan API Keys

Berikut panduan singkat per MCP yang memerlukan API key:

---

#### 🔑 Brave Search API Key (WAJIB)
**Gratis — 2000 pencarian/bulan**

1. Buka: [https://brave.com/search/api](https://brave.com/search/api)
2. Klik **"Get Started for Free"**
3. Daftar dengan email
4. Setelah login, buka **API Keys** di dashboard
5. Klik **"Create Key"** → beri nama "Antigravity"
6. Copy API key yang muncul

Di `mcp_config.json`, ganti:
```json
"BRAVE_API_KEY": "[BRAVE_API_KEY — signup di brave.com/search/api]"
```
Jadi:
```json
"BRAVE_API_KEY": "BSA-xxxxxxxxxxxxxxxxxxxx"
```

---

#### 🔑 GitHub Personal Access Token (WAJIB)
**Gratis — dari akun GitHub kamu**

1. Buka: [https://github.com/settings/tokens](https://github.com/settings/tokens)
2. Klik **"Generate new token"** → pilih **"Generate new token (classic)"**
3. Beri nama: `Antigravity MCP`
4. Pilih expiration: **No expiration** (atau sesukamu)
5. Centang scope: ✅ **repo**, ✅ **read:org**, ✅ **read:user**
6. Klik **"Generate token"**
7. ⚠️ **PENTING:** Copy token sekarang — tidak akan bisa dilihat lagi!

Di `mcp_config.json`, ganti:
```json
"GITHUB_PERSONAL_ACCESS_TOKEN": "[GITHUB_PAT — github.com/settings/tokens]"
```
Jadi:
```json
"GITHUB_PERSONAL_ACCESS_TOKEN": "ghp_xxxxxxxxxxxxxxxxxxxxxx"
```

---

#### 🔑 Context7 API Key (OPSIONAL — lebih bagus kalau diisi)
**Gratis — untuk rate limit lebih tinggi**

1. Buka: [https://context7.com/dashboard](https://context7.com/dashboard)
2. Login dengan GitHub
3. Buka tab **API Keys**
4. Klik **"Create API Key"**
5. Copy key yang muncul

Di `mcp_config.json`, ganti:
```json
"CONTEXT7_API_KEY": "[OPTIONAL — daftar gratis di context7.com/dashboard]"
```
Jadi:
```json
"CONTEXT7_API_KEY": "ctx7-xxxxxxxxxxxxxxxxxxxx"
```

---

#### 🔑 Sentry Auth Token (Opsional — untuk production monitoring)
**Ada free tier — 5000 errors/bulan**

1. Buka: [https://sentry.io](https://sentry.io) → Daftar akun
2. Buat project baru (pilih platform: Next.js)
3. Buka: **Settings → Auth Tokens**
4. Klik **"Create New Token"**
5. Centang: ✅ **project:read**, ✅ **event:read**
6. Copy token

Di `mcp_config.json`, isi:
```json
"SENTRY_AUTH_TOKEN": "sntrys_xxxxxxxxxxxxxxxxxxxx",
"SENTRY_ORG": "nama-organisasi-kamu-di-sentry",
"SENTRY_PROJECT": "nama-project-kamu-di-sentry"
```

---

#### 🔑 Zapier MCP — Hubungkan AI ke 8.000+ Aplikasi (Berguna)
**Ada free tier — aksi terbatas di paket gratis**

Zapier MCP memungkinkan AI kamu menjalankan otomasi di ribuan aplikasi — seperti mengirim email, update Google Sheets, buat task di Notion, posting ke Slack, dan banyak lagi — **tanpa menulis kode integrasi sama sekali**.

Cocok untuk:
- Kirim notifikasi otomatis saat ada order baru
- Isi spreadsheet bisnis dari data aplikasi
- Buat task di Trello/Notion/Asana dari AI
- Posting ke media sosial otomatis
- Kirim email/WhatsApp terpicu oleh event aplikasi

Cara setup:
1. Buka: [https://zapier.com/mcp](https://zapier.com/mcp)
2. Login atau daftar akun Zapier
3. Klik **"Get started"** → pilih aksi yang ingin diaktifkan
4. Zapier akan generate **MCP URL** unik milikmu
5. Copy URL tersebut

Di `mcp_config.json`, tambahkan:
```json
"zapier": {
  "command": "npx",
  "args": ["-y", "@zapier/mcp-server@latest"],
  "env": {
    "ZAPIER_MCP_URL": "https://actions.zapier.com/mcp/[API-KEY-KAMU]/sse"
  }
}
```
Ganti `[API-KEY-KAMU]` dengan URL yang didapat dari dashboard Zapier.

**Contoh prompt setelah aktif:**
> *"Kirim email ke tim saya bahwa fitur login sudah selesai"*
> *"Tambahkan task 'Review PRD' ke board Trello Development"*
> *"Update Google Sheets laporan progress dengan status sprint ini"*

> ⚠️ Zapier gratis punya batas 100 aksi/bulan. Untuk kebutuhan lebih, upgrade ke plan Starter.

---

#### 🔑 Figma Personal Access Token (Opsional — hanya jika pakai Figma)
**Gratis — dari akun Figma kamu**

1. Buka: [https://www.figma.com/settings](https://www.figma.com/settings)
2. Scroll ke bawah ke bagian **Personal Access Tokens**
3. Klik **"Generate new token"**
4. Beri nama: `Antigravity`
5. Copy token

Di `mcp_config.json`, ganti:
```json
"FIGMA_PERSONAL_ACCESS_TOKEN": "[FIGMA_PAT — figma.com/settings]"
```

---

#### 🎬 Remotion (Opsional — untuk video/animasi programatik)
**Tidak perlu API key — langsung aktif!**

Remotion memungkinkan AI membuat **video dan animasi** dari kode React. Cocok untuk:
- Laporan bisnis otomatis dalam format video
- Animasi intro/outro untuk konten sosial media
- Slideshow otomatis dari data (produk, portfolio, dll.)
- Onboarding video yang dipersonalisasi

Cara setup di `mcp_config.json` — cukup tambahkan:
```json
"remotion": {
  "command": "npx",
  "args": ["@remotion/mcp@latest"],
  "env": {}
}
```

> ✅ **Tidak ada yang perlu diisi** — langsung aktif setelah Antigravity di-restart!
>
> Prasyarat: Node.js versi 18 ke atas harus terinstall. Cek dengan menjalankan `node --version` di terminal.

**Contoh prompt setelah aktif:**
> *"Buatkan animasi logo perusahaanku yang muncul dengan efek fade-in menggunakan Remotion"*
> *"Generate video ringkasan laporan penjualan bulan ini dari data JSON ini"*

**Dokumentasi resmi:** [remotion.dev/docs/ai/mcp](https://www.remotion.dev/docs/ai/mcp)

---

### Langkah 3 — Isi PostgreSQL URL (Untuk Developer)
> **Lewati ini jika belum punya database lokal.**

Ini adalah URL koneksi ke database development kamu. Formatnya:
```
postgresql://USERNAME:PASSWORD@localhost:5432/NAMA_DATABASE
```

Contoh jika pakai default PostgreSQL lokal:
```json
"DATABASE_URL": "postgresql://postgres:password@localhost:5432/myapp_dev"
```

> ⚠️ **JANGAN** gunakan database production untuk MCP!

---

### Langkah 4 — Hapus MCP yang Tidak Dipakai

Lebih sedikit MCP = AI lebih cepat. Hapus section MCP yang tidak dipakai dari config.

Minimal yang wajib ada:
```json
{
  "mcpServers": {
    "context7": { ... },
    "brave-search": { ... },
    "sequential-thinking": { ... },
    "github": { ... }
  }
}
```

---

### Langkah 5 — Restart Antigravity

Setelah semua API key diisi:
1. Simpan file config
2. **Tutup dan buka ulang Antigravity**
3. Test dengan mengetik ke AI: "Is MCP working? Tell me what tools you have."

AI yang berfungsi akan menjawab dengan daftar tools yang aktif.

---

## ⚠️ Penting: Keamanan API Keys

API keys adalah seperti **password** — jangan dibagikan ke siapa pun.

**Yang WAJIB dilakukan:**
- ✅ Tambahkan `mcp_config.json` ke file `.gitignore`
- ✅ Jangan screenshot file yang berisi API key
- ✅ Jangan paste API key ke chat AI (pastekan hanya ke file config)

**Cara tambah ke `.gitignore`:**
```
# Di file .gitignore
.agent/mcp_config.json
```

---

## 🆘 Troubleshooting

**Q: MCP tidak muncul di Antigravity setelah restart?**
> Cek apakah JSON kamu valid — tidak ada koma ekstra, kurung yang kurang, dll. Gunakan [jsonlint.com](https://jsonlint.com) untuk validasi.

**Q: Brave Search API error "unauthorized"?**
> Pastikan kamu copy API key yang benar, bukan Client ID. Key harus dimulai dengan `BSA-`.

**Q: GitHub MCP error "rate limit"?**
> Token kamu mungkin tidak punya scope yang benar. Buat token baru dengan scope `repo` dan `read:org`.

**Q: Context7 tidak merespons?**
> Context7 gratis bisa lambat saat traffic tinggi. Coba tambahkan API key untuk akses yang lebih stabil.

**Q: Remotion MCP tidak muncul/aktif?**
> Pastikan Node.js versi 18+ terinstall — cek dengan `node --version` di terminal. Jika versi di bawah 18, update Node.js di [nodejs.org](https://nodejs.org). Lalu restart Antigravity.

**Q: Remotion MCP aktif tapi AI tidak bisa render video?**
> Rendering video butuh Remotion CLI terinstall di project kamu: `npm install remotion @remotion/cli`. Untuk render video final, jalankan `npx remotion render` di terminal.

---

*Setelah semua MCP aktif, AI kamu akan jauh lebih cerdas dan jarang berhalusinasi! 🧠*
