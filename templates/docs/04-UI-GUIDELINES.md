# 04 — UI Guidelines & Design System
> Panduan visual untuk konsistensi tampilan di Web (shadcn/ui) dan Mobile (Flutter).
>
> 🤖 **AI Reading Guide:** Cek dokumen ini sebelum membuat komponen UI baru. Gunakan komponen shadcn yang sudah terdaftar di sini, jangan buat komponen kustom jika sudah tersedia. Ikuti token warna dan spacing yang sudah ditentukan.

---

## 1. Prinsip Desain

1. **Mobile-First** — semua dimulai dari mobile, dikembangkan ke desktop
2. **Consistency** — komponen sama terlihat sama di seluruh aplikasi
3. **Clarity** — user selalu tahu apa yang bisa diklik dan apa hasilnya
4. **Performance** — tidak ada animasi berat, gambar selalu dioptimasi sebelum upload

---

## 2. Color System

### Brand Colors (ganti dengan warna brand proyek)
```css
/* Tailwind custom colors di tailwind.config.ts */
colors: {
  brand: {
    50:  '#[hex]',
    100: '#[hex]',
    500: '#[hex]',   /* main */
    600: '#[hex]',   /* hover */
    900: '#[hex]',
  }
}
```

### Semantic Colors (pakai Tailwind defaults)
```
Success : green-500  (#22C55E)
Warning : amber-500  (#F59E0B)
Error   : red-500    (#EF4444)
Info    : blue-500   (#3B82F6)
```

### Neutral (Text & Background)
```
Text primary   : slate-900
Text secondary : slate-500
Text muted     : slate-400
Border         : slate-200
Background     : slate-50
Surface        : white
```

---

## 3. Typography

| Element | Tailwind Class | Size |
|---------|----------------|------|
| Page title (H1) | `text-3xl font-bold` | 30px |
| Section title (H2) | `text-2xl font-semibold` | 24px |
| Card title (H3) | `text-lg font-semibold` | 18px |
| Body | `text-base` | 16px |
| Small / caption | `text-sm text-slate-500` | 14px |
| Label form | `text-sm font-medium` | 14px |
| Micro | `text-xs` | 12px |

**Font:** Inter (Google Fonts) — `font-family: 'Inter', system-ui, sans-serif`

---

## 4. Spacing

Gunakan kelipatan 4px (Tailwind default):

| Token | Value | Tailwind |
|-------|-------|---------|
| xs | 4px | `p-1` / `gap-1` |
| sm | 8px | `p-2` / `gap-2` |
| md | 16px | `p-4` / `gap-4` |
| lg | 24px | `p-6` / `gap-6` |
| xl | 32px | `p-8` / `gap-8` |
| 2xl | 48px | `p-12` / `gap-12` |

---

## 5. shadcn/ui Components — Pola Standar

### Button
```tsx
import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"

// Primary
<Button>Simpan</Button>

// Outline
<Button variant="outline">Batal</Button>

// Destructive
<Button variant="destructive">Hapus</Button>

// Loading state — WAJIB ada
<Button disabled={isLoading}>
  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
  {isLoading ? "Memproses..." : "Bayar Sekarang"}
</Button>
```

### Form Input
```tsx
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

// Selalu pakai label + error message
<div className="space-y-2">
  <Label htmlFor="email">Email</Label>
  <Input
    id="email"
    type="email"
    placeholder="nama@email.com"
    {...register('email')}
    className={errors.email ? 'border-red-500' : ''}
  />
  {errors.email && (
    <p className="text-sm text-red-500">{errors.email.message}</p>
  )}
</div>
```

### Card
```tsx
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"

<Card>
  <CardHeader>
    <CardTitle>Judul Card</CardTitle>
  </CardHeader>
  <CardContent>
    {/* konten */}
  </CardContent>
  <CardFooter className="flex gap-2">
    <Button>Aksi Utama</Button>
    <Button variant="outline">Batal</Button>
  </CardFooter>
</Card>
```

### Empty State — WAJIB di setiap list
```tsx
import { Inbox } from "lucide-react"

<div className="flex flex-col items-center justify-center py-16 text-center">
  <Inbox className="h-12 w-12 text-slate-300 mb-4" />
  <h3 className="text-slate-600 font-medium">Belum ada data</h3>
  <p className="text-slate-400 text-sm mt-1">
    Mulai dengan menambahkan [item] pertama
  </p>
  <Button className="mt-4">Tambah [Item]</Button>
</div>
```

### Loading Skeleton
```tsx
import { Skeleton } from "@/components/ui/skeleton"

// Card skeleton
<div className="space-y-3">
  <Skeleton className="h-4 w-3/4" />
  <Skeleton className="h-4 w-1/2" />
  <Skeleton className="h-32 w-full rounded-lg" />
</div>
```

### Toast Notification
```tsx
import { toast } from "sonner"

toast.success("Data berhasil disimpan")
toast.error("Gagal. Coba lagi beberapa saat.")
toast.loading("Memproses pembayaran...")
toast.promise(createPayment(), {
  loading: "Membuat tagihan...",
  success: "Tagihan berhasil dibuat",
  error: "Gagal membuat tagihan",
})
```

### Badge Status
```tsx
import { Badge } from "@/components/ui/badge"

// Status pembayaran Xendit
const statusVariant = {
  PAID:    'default',    // hijau
  PENDING: 'secondary',  // abu
  FAILED:  'destructive', // merah
  EXPIRED: 'outline',    // outline
}

<Badge variant={statusVariant[status]}>{status}</Badge>
```

---

## 6. Layout Patterns

### Responsive Grid
```tsx
// 1 kolom di mobile, 2-3 kolom di desktop
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

### Page Container
```tsx
<div className="container mx-auto px-4 py-6 max-w-6xl">
  {/* konten halaman */}
</div>
```

### Dashboard Sidebar Layout
```tsx
<div className="flex min-h-screen">
  <aside className="w-64 border-r hidden md:block">
    {/* sidebar */}
  </aside>
  <main className="flex-1 p-6">
    {/* konten */}
  </main>
</div>
```

---

## 7. Icons

Gunakan **Lucide React** (sudah include di shadcn):
```tsx
import { Plus, Trash2, Edit, ChevronRight, Loader2, CreditCard, CheckCircle } from "lucide-react"

// Ukuran standar
<Plus className="h-4 w-4" />          // inline dengan teks
<Edit className="h-5 w-5" />          // button icon
<Loader2 className="h-4 w-4 animate-spin" />  // loading
```

---

## 8. Responsive Breakpoints

```css
sm:  640px   /* Tablet portrait */
md:  768px   /* Tablet landscape */
lg:  1024px  /* Desktop */
xl:  1280px  /* Large desktop */
2xl: 1536px  /* Wide screen */
```

---

## 9. Flutter Design System

```dart
// lib/core/theme/app_theme.dart
ThemeData appTheme = ThemeData(
  colorScheme: ColorScheme.fromSeed(
    seedColor: const Color(0xFF[brandHex]),
    brightness: Brightness.light,
  ),
  useMaterial3: true,
  fontFamily: 'Inter',
  cardTheme: CardTheme(
    elevation: 0,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(12),
      side: BorderSide(color: Colors.grey.shade200),
    ),
  ),
);

// lib/core/constants/app_spacing.dart
class AppSpacing {
  static const double xs  = 4;
  static const double sm  = 8;
  static const double md  = 16;
  static const double lg  = 24;
  static const double xl  = 32;
  static const double xxl = 48;
}

// lib/core/constants/app_radius.dart
class AppRadius {
  static const double sm   = 8;
  static const double md   = 12;
  static const double lg   = 16;
  static const double full = 999;
}
```

### Flutter Color Tokens
```dart
// Akses via Theme
Theme.of(context).colorScheme.primary    // brand color
Theme.of(context).colorScheme.surface    // card background
Theme.of(context).colorScheme.onSurface  // text di atas surface
```
