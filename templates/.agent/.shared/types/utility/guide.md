# Utility — Conversation Guide

## Section 1: Problem Statement (One Sentence)
**Explore:** Satu kalimat: utility ini melakukan apa? Kalau butuh lebih dari satu kalimat untuk mendeskripsikan — mungkin ini bukan utility.
**Suggest:** Push untuk brevity: "Ini mengambil X dan menghasilkan Y." Kalau deskripsi mulai kompleks → tanya: "Apa ini sebenarnya application?" Utilities resist expansion — itu fitur, bukan keterbatasan.
**Depth:** required

## Section 2: Scope Guard (Pagar Scope)
**Explore:** Satu file atau banyak? Satu fungsi atau sistem? Apa yang TIDAK dilakukan utility ini? Di mana batasnya?
**Suggest:** Aktif resist expansion. Kalau user bilang "dan bisa juga untuk..." → stop: "Itu terdengar seperti tool terpisah. Kita jaga yang ini tetap focused." Utility terbaik melakukan satu hal dengan sempurna.
**Depth:** required

## Section 3: User & Distribution
**Explore:** Siapa yang pakai ini — hanya kamu, tim, atau komunitas? Di mana utility ini hidup — personal tools, shareable, atau MCP server?
**Suggest:** Personal: simpan di tools/personal/. Useful untuk orang lain: tools/shareable/. MCP server: tools/mcp-servers/. Distribution mempengaruhi berapa banyak dokumentasi yang dibutuhkan.
**Depth:** required

## Section 4: Dependencies
**Explore:** Apa yang dibutuhkan utility ini? External API, npm packages, system tools? Bisa minimize dependencies?
**Suggest:** Fewer deps = less maintenance. Kalau dependency berat (misal: puppeteer untuk scrape sederhana) → cari alternatif lebih ringan. Zero-dependency utility adalah gold standard.
**Depth:** required

## Section 5: Interface Contract
**Explore:** Bagaimana utility ini dipanggil? CLI args, stdin, function call, atau MCP tool? Apa format input-nya? Apa format output-nya? Bagaimana error di-handle?
**Suggest:** Define kontrak dulu: "Input: X (format), Output: Y (format), Errors: Z." Kalau tidak bisa define kontrak dengan clean → scope mungkin terlalu luas.
**Depth:** required

## Section 6: Done Criteria
**Explore:** 3-5 test cases yang membuktikan utility ini bekerja? Bisa definisikan sekarang? Kalau tidak bisa → scope mungkin masih terlalu vague.
**Suggest:** Format: "Given X, expect Y." Kalau setiap test case sangat berbeda → utility mungkin terlalu banyak hal. 3 test cases adalah sweet spot untuk utilities.
**Depth:** required
