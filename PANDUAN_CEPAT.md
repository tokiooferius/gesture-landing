# 🚀 GestureFlow - Panduan Cepat & Troubleshooting (Bahasa Indonesia)

## ⚡ Memulai dalam 5 Menit

### 1️⃣ Buka Aplikasi
```
https://tokiooferius.github.io/gesture-landing/
```

### 2️⃣ Klik "Buka Aplikasi"
Button hijau di halaman landing → masuk ke app

### 3️⃣ Berikan Akses Kamera
- Browser akan minta izin kamera
- Klik "Allow" / "Izinkan"
- Tunggu sebentar untuk loading

### 4️⃣ Lakukan Gestur!
- Tunjukkan tangan ke kamera
- Buat gestur apapun
- Lihat hasil di layar
- Enjoy! 🎉

---

## 📱 Mode-Mode Aplikasi

| Mode | Fungsi | Cara Pakai |
|------|--------|-----------|
| **Gesture** | Deteksi gestur real-time | Tunjukkan tangan, lihat hasil |
| **Translator** | Terjemah gestur ↔ teks | Pilih tab, input teks/gestur |
| **Learn** | Pelajari gestur sistematis | Pilih kategori → gestur → detail |
| **Dashboard** | Lihat statistik & achievement | Scroll untuk stats, achievements |

---

## 🆘 Troubleshooting

### ❌ MASALAH: Kamera Tidak Bekerja

**Gejala:**
- Layar hitam
- Kamera tidak terdeteksi
- Error message

**Solusi Cepat:**
```
1. Refresh halaman (F5 atau Ctrl+R)
2. Cek browser permission:
   - Chrome: 3 titik → Settings → Privacy → Camera
   - Firefox: Menu → Preferences → Privacy → Permissions
3. Restart browser
4. Bersihkan lensa kamera
5. Coba browser lain (Chrome recommended)
6. Restart perangkat jika perlu
```

**Jika masih tidak bisa:**
```
• Perangkat tidak punya kamera?
  → Tidak bisa menggunakan mode Gesture
  → Bisa tetap gunakan Translator & Dashboard

• Aplikasi lain menggunakan kamera?
  → Tutup aplikasi lain (Zoom, Skype, etc)
  → Tutup tab lain yang pakai kamera

• Browser belum dapat izin permanent?
  → Clear browser cache (Ctrl+Shift+Delete)
  → Buka ulang aplikasi
```

---

### ❌ MASALAH: Gestur Tidak Terdeteksi

**Gejala:**
- Gestur tidak dikenali
- Hasil selalu salah
- Confidence score rendah

**Solusi Cepat:**
```
✓ Pencahayaan
  1. Perbaiki pencahayaan ruangan
  2. Cahaya ideal dari depan/samping
  3. Hindari cahaya dari belakang
  4. Gunakan lampu jika malam

✓ Posisi Tangan
  1. Letakkan tangan di tengah frame kamera
  2. Jangan terlalu dekat/jauh (0.5-2 meter ideal)
  3. Tunjukkan seluruh tangan (tidak terpotong)
  4. Tetap stabil, jangan terlalu bergerak

✓ Gerakan Gestur
  1. Buat gerakan yang jelas dan tegas
  2. Tidak terlalu cepat atau lambat
  3. Tahan sebentar (0.5-1 detik)
  4. Baca deskripsi gestur dengan teliti

✓ Threshold Setting
  1. Buka Settings (gear icon)
  2. Naikkan/turunkan Threshold
     - Tinggi (0.8-1.0) = lebih ketat
     - Rendah (0.5-0.7) = lebih mudah
  3. Default: 0.7 (recommended)
```

**Diagnosis Lanjutan:**
```
Jika masih bermasalah:
1. Buka DevTools (F12)
2. Lihat Console untuk error messages
3. Cek apakah MediaPipe loading (lihat garis-garis tangan)
4. Scroll up untuk cara membuat gestur dengan benar
```

---

### ❌ MASALAH: Akurasi Deteksi Rendah (30-40%)

**Penyebab:**
- Gestur belum hafal (konsistensi kurang)
- Pencahayaan tidak ideal
- Confidence threshold terlalu tinggi

**Cara Meningkatkan:**
```
JANGKA PENDEK (1-2 hari):
1. Turunkan threshold di Settings (ke 0.6-0.65)
2. Praktik dengan lighting yang lebih baik
3. Pelajari gestur dengan teliti dari Learn mode

JANGKA MENENGAH (1-2 minggu):
1. Naikkan threshold kembali (0.7)
2. Latihan konsisten setiap hari (15-30 menit)
3. Fokus pada gestur sulit terlebih dahulu
4. Gunakan mirror untuk feedback visual

JANGKA PANJANG (1+ bulan):
1. Accuracy akan meningkat otomatis
2. App belajar dari pola Anda
3. Muscle memory terbentuk
4. Raih achievement untuk motivasi
```

---

### ❌ MASALAH: Text-to-Speech Tidak Bekerja

**Gejala:**
- Klik "Ucapkan" tapi tidak ada suara
- Error sound

**Solusi Cepat:**
```
1. Cek Volume
   □ Volume browser tidak muted
   □ Volume perangkat tidak muted
   □ Headphone/speaker terhubung

2. Cek Mode
   □ Tidak dalam airplane mode
   □ Tidak dalam silent mode (phone)
   □ Sound effects ON di Settings

3. Test
   □ Refresh halaman (F5)
   □ Coba di halaman lain
   □ Test speaker dengan YouTube video

4. Browser Setting
   □ Chrome: Settings → Privacy → Site Settings → Sound
   □ Firefox: Preferences → Privacy → Permissions
```

**Jika masih tidak bisa:**
```
• Browser tidak support?
  → Gunakan Chrome (paling support)

• Device tidak support?
  → Beberapa device tidak punya speaker output
  → Gunakan headphone

• Clear browser cache:
  Ctrl+Shift+Delete → Clear All
  → Buka ulang aplikasi
```

---

### ❌ MASALAH: Aplikasi Lambat atau Freeze

**Gejala:**
- Lag/delay
- Aplikasi berhenti merespons
- FPS rendah

**Solusi Cepat:**
```
INSTANT FIX:
1. Refresh halaman (F5)
2. Tutup tab lain
3. Restart browser
4. Restart perangkat

JIKA MASIH LAMBAT:
1. Cek resource (DevTools):
   - Tekan F12
   - Tab Performance
   - Record untuk 10 detik
   - Lihat CPU/Memory usage

2. Kurangi beban:
   □ Tutup aplikasi background lain
   □ Matikan extensi browser
   □ Gunakan browser yang lebih ringan

3. Perangkat lama?
   □ Gunakan setting lebih rendah
   □ Matikan gesture smoothing
   □ Reduce detection frequency
```

---

### ❌ MASALAH: Offline Tidak Bekerja

**Gejala:**
- Aplikasi membutuhkan internet
- Tidak bisa akses offline

**Penyebab & Solusi:**
```
PERTAMA KALI HARUS ONLINE:
✓ Download: app.html, CSS, JavaScript, icons
✓ Service Worker perlu register
✓ Setelah itu: Bisa akses offline

JIKA TIDAK BISA OFFLINE:
1. Service Worker belum ter-cache
   → Buka app sekali saat online
   → Tunggu "ready for offline" message
   → Tunggu 30 detik untuk background sync

2. Cache perlu di-refresh
   → Buka DevTools (F12)
   → Tab Application
   → Cache Storage → Clear All
   → Reload halaman saat online

3. Browser tidak support Service Worker?
   → Gunakan browser modern (Chrome 40+)
   → Firefox 44+, Edge 17+, Safari 11.1+
```

---

### ❌ MASALAH: Data Tidak Tersimpan

**Gejala:**
- Stats hilang setelah refresh
- Achievements tidak disimpan

**Penyebab & Solusi:**
```
PENYEBAB UTAMA:
1. Private/Incognito mode
   → Data tidak disimpan di Private mode
   → Gunakan normal browsing mode

2. Browser setting blocking storage
   → Settings → Privacy → Cookies & Site Data
   → Allow cookies & local storage

3. Storage penuh
   → Clear browser cache
   → Delete unused data

CARA CEK STORAGE:
1. Buka DevTools (F12)
2. Tab: Application
3. Local Storage
4. Cari: gestureflow_*
5. Lihat apa tersimpan

RECOVERY:
1. Jika data terhapus, tidak bisa recover
2. Gunakan backup (export data sebelumnya)
3. Ke Settings (gear) → Export Data
4. Simpan file JSON
5. Di device baru: Import Data
```

---

### ❌ MASALAH: Error Messages di Console

**Umum di-lihat:**
```javascript
❌ Cannot find 'GestureDetectionService'
→ File tidak ter-load dengan benar
→ Refresh halaman
→ Cek Network tab di DevTools

❌ MediaPipe failed to load
→ CDN tidak accessible
→ Check internet connection
→ Try different browser

❌ Speech API not available
→ Browser tidak support Web Speech API
→ Gunakan Chrome/Edge
→ Matikan VPN/Proxy

❌ Storage quota exceeded
→ LocalStorage penuh
→ Export data & clear storage
→ Atau gunakan private browsing
```

---

## 🎯 Tips Performa

### Untuk Deteksi Optimal

```
✓ Pencahayaan
  - Terang alami terbaik
  - Minimal 200 lux
  - Hindari shadow di tangan

✓ Posisi Kamera
  - Eye level atau sedikit di bawah
  - Jarak 0.5-2 meter
  - Stabil (gunakan tripod atau stand)

✓ Gerakan
  - Smooth dan konsisten
  - Tidak terlalu cepat (<1 detik)
  - Tangan di frame center

✓ Browser
  - Use Chrome (best support)
  - Update ke versi terbaru
  - Close other tabs
  - Disable heavy extensions
```

### Monitoring FPS

```javascript
// Buka Console (F12), paste:
let frameCount = 0;
let lastTime = performance.now();

setInterval(() => {
  const now = performance.now();
  const elapsed = now - lastTime;
  const fps = Math.round((frameCount * 1000) / elapsed);
  
  console.log(`FPS: ${fps}`);
  frameCount = 0;
  lastTime = now;
}, 1000);

// Target: 24-30 FPS untuk smooth gesture detection
```

---

## 🔐 Data & Privacy FAQ

### Pertanyaan Umum

**Q: Apakah data saya aman?**
A: ✅ Semua data disimpan lokal, tidak ada server. Anda kontrol penuh.

**Q: Bagaimana cara backup data?**
A: 
```
1. Dashboard → Export Data
2. File JSON akan download
3. Simpan di tempat aman (Google Drive, iCloud, dll)
```

**Q: Bagaimana restore dari backup?**
A:
```
1. Buka aplikasi di device baru
2. Dashboard → Import Data
3. Pilih file JSON yang sudah disimpan
4. Semua data akan di-restore
```

**Q: Bisa share data dengan teman?**
A: ✅ Ya, export data → share file JSON → teman import

**Q: Apa yang disimpan aplikasi?**
A:
```
✓ Statistik pembelajaran (total, akurasi, level)
✓ Riwayat deteksi (gesture, confidence, waktu)
✓ Achievement yang dibuka
✓ Preferensi (bahasa, tema, sound)
✓ TIDAK ada: video, foto, atau data pribadi
```

---

## 🎓 Learning Tips

### Urutan Belajar Ideal

```
MINGGU 1: Dasar
□ Pelajari 6 gestur dasar (OK, Peace, dll)
□ Latihan setiap hari 15 menit
□ Capai "Starter" achievement

MINGGU 2-3: Huruf
□ Belajar A-Z secara bertahap (5 huruf/hari)
□ Latihan 30 menit/hari
□ Capai "Alphabet Master"

MINGGU 4: Angka
□ Pelajari 0-9
□ Latihan 20 menit/hari
□ Capai "Speed Demon" (50 dalam 5 menit)

MINGGU 5+: Kombinasi
□ Mix dasar + huruf + angka
□ Buat kalimat dari gestur
□ Praktik dengan teman
□ Target achievement tertinggi
```

### Daily Routine (30 menit)

```
5 MENIT:  Warm-up (gestur dasar 2x)
15 MENIT: Focus pada gestur baru (3-5 gestur)
5 MENIT:  Review gestur lama
5 MENIT:  Free practice
```

---

## 📞 Contact & Support

### Jika Ada Problem

**Cek Dulu:**
1. Baca panduan ini (troubleshooting section)
2. Lihat browser console (F12 → Console)
3. Clear cache & restart browser
4. Try different device/browser

**Jika Masih Tidak Bisa:**
- 📧 Email: support@gestureflow.com
- 🐛 GitHub Issues: github.com/tokiooferius/gesture-landing/issues
- 💬 Discussion: github.com/tokiooferius/gesture-landing/discussions

**Berikan Info:**
- Apa yang Anda coba
- Error message (if any)
- Browser & device yang digunakan
- Screenshot/video jika membantu

---

## ✅ Checklist Sebelum Memulai

- [ ] Browser sudah update
- [ ] Kamera working & ter-izinkan
- [ ] Pencahayaan cukup terang
- [ ] Speaker/headphone siap
- [ ] Internet connection aktif
- [ ] Ruangan tenang & fokus
- [ ] Sudah baca user guide (PANDUAN_PENGGUNA.md)

---

## 🎉 Quick Reference Cards

### Keyboard Shortcuts

| Shortcut | Fungsi |
|----------|--------|
| F5 | Refresh halaman |
| F12 | Open DevTools |
| Ctrl+C | Copy text |
| Ctrl+V | Paste text |
| Esc | Close modal/menu |
| Spacebar | Record gesture (if available) |

### Touch Gestures (Mobile)

| Gesture | Fungsi |
|---------|--------|
| Tap | Click button |
| Long press | Menu/context |
| Swipe left/right | Change tab/mode |
| Pinch zoom | Zoom in/out (jika supported) |
| Shake | Reset (jika enabled) |

---

## 🚀 Next Steps

**Sudah siap mulai?**
1. ✅ Buka aplikasi
2. ✅ Grant kamera access
3. ✅ Coba gesture detection
4. ✅ Explore semua fitur
5. ✅ Share dengan teman!

**Ingin belajar lebih dalam?**
→ Baca [PANDUAN_PENGGUNA.md](./PANDUAN_PENGGUNA.md) (lengkap)

**Developer yang ingin berkontribusi?**
→ Baca [PANDUAN_DEVELOPER.md](./PANDUAN_DEVELOPER.md)

---

**Selamat menggunakan GestureFlow! 🚀**

Pertanyaan? Lihat FAQ di atas atau hubungi support.

Made with ❤️ for accessibility.  
Version: 1.0  
Language: Bahasa Indonesia  
Updated: May 2026
