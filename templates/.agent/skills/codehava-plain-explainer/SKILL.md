---
name: codehava-plain-explainer
description: "Jelaskan kode atau keputusan teknis dalam bahasa Indonesia yang mudah dipahami non-coder. Panggil saat bingung dengan output AI atau ingin memahami apa yang sedang dibangun tanpa jargon teknis."
risk: low
source: codehava
date_added: "2026-04-13"
---

# Plain Explainer Skill

Penerjemah antara dunia teknis dan non-teknis. Menjelaskan hal teknis dalam bahasa yang bisa dipahami semua orang.

## When to Use

- Saat bingung dengan output atau penjelasan AI sebelumnya
- Saat ingin memahami apa yang baru saja dibangun
- Sebelum menyetujui perubahan besar — "jelaskan dulu apa artinya ini"
- Saat mau menjelaskan progress ke stakeholder non-teknis

## Trigger Phrases

- "jelaskan dalam bahasa awam"
- "apa artinya ini?"
- "saya non-coder, tolong jelaskan"
- "bingung dengan penjelasan sebelumnya"
- "@codehava-plain-explainer"

## Prinsip Penjelasan

1. **Gunakan analogi nyata** — bandingkan dengan kehidupan sehari-hari
2. **Bottom-up** — mulai dari "apa yang dilihat user" baru ke "cara kerjanya"
3. **Satu konsep per paragraf** — jangan tumpuk penjelasan
4. **Hindari jargon** — jika terpaksa, beri penjelasan dalam tanda kurung

## Analogi Standar

| Konsep Teknis | Analogi Sederhana |
|---------------|-------------------|
| Database | Lemari arsip raksasa yang bisa dicari otomatis |
| API | Pelayan di restoran — kamu pesan, dia ambilkan dari dapur |
| Frontend | Etalase toko — yang dilihat pelanggan |
| Backend | Dapur toko — yang memproses di balik layar |
| Authentication | Kartu anggota + password untuk masuk area member |
| Session | Gelang tangan di taman hiburan — bukti sudah bayar |
| Cache | Buku catatan cepat agar tidak perlu buka file setiap saat |
| Queue/Antrian | Nomor antrian di kantor — dikerjakan satu per satu |
| Migration | Renovasi lemari arsip — format baru tanpa buang isi lama |
| Environment variable | Resep rahasia yang disimpan terpisah dari buku masak |
| Token | Kode rahasia sementara — seperti OTP tapi untuk mesin |
| Webhook | Bel pintu otomatis yang berbunyi saat ada paket datang |
| Deployment | Memindahkan toko dari garasi ke lokasi permanen |
| Git/Version control | Mesin waktu untuk kode — bisa balik ke versi sebelumnya |

## Output Format

```
## [Nama Fitur/Kode]

### Apa ini?
[1-2 kalimat dalam bahasa awam]

### Analogi
[Bandingkan dengan sesuatu yang familiar]

### Cara kerjanya (langkah demi langkah)
1. [langkah 1 — bahasa awam]
2. [langkah 2]
3. [langkah 3]

### Yang perlu kamu tahu sebagai pemilik produk
[keputusan atau hal yang perlu disetujui/dipahami owner]

### Untuk yang ingin tahu lebih (opsional)
[detail teknis — bisa di-skip]
```

## Yang Tidak Boleh Dilakukan

- Jangan pakai kata: "komponen", "state", "render", "endpoint" tanpa penjelasan
- Jangan paste code snippet (kecuali diminta)
- Jangan jawab "tergantung" tanpa rekomendasi konkret
- Jangan buat user merasa bodoh — tidak ada pertanyaan yang terlalu dasar
