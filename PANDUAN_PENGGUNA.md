# 📱 GestureFlow - Panduan Pengguna Lengkap

## 🎯 Pendahuluan

Selamat datang di **GestureFlow**, aplikasi pengenalan gestur tangan untuk pembelajaran Bahasa Isyarat Indonesia dan komunikasi untuk tunarungu.

### Apa itu GestureFlow?
GestureFlow adalah aplikasi web modern yang membantu Anda:
- ✅ Belajar gestur/bahasa isyarat Indonesia
- ✅ Menerjemahkan gestur menjadi teks
- ✅ Menggunakan text-to-speech untuk mempelajari pengucapan
- ✅ Melacak kemajuan pembelajaran dengan achievement
- ✅ Menggunakan offline tanpa internet

---

## 🚀 Memulai (Getting Started)

### Langkah 1: Buka Aplikasi
Kunjungi: **https://tokiooferius.github.io/gesture-landing/**

Atau jalankan lokal:
```bash
# Python
python -m http.server 8000

# Node.js
npx http-server

# Kemudian buka: http://localhost:8000
```

### Langkah 2: Klik "Buka Aplikasi"
Di halaman landing, klik tombol hijau "Buka Aplikasi" untuk masuk ke aplikasi utama.

### Langkah 3: Berikan Akses Kamera
Browser akan meminta akses ke kamera Anda. Klik "Izinkan" untuk memulai pengenalan gestur.

---

## 📖 Fitur Utama

### 1️⃣ Mode Pengenalan Gestur (Gesture Mode)

**Untuk apa?**
- Mendeteksi dan mengenali gestur tangan Anda secara real-time
- Melihat tingkat kepercayaan (confidence)
- Membangun kalimat dari gestur

**Cara menggunakan:**

1. **Aktifkan Kamera**
   - Klik tombol "Mulai Kamera" atau "Start Camera"
   - Kamera akan menampilkan video live
   - Tunggu MediaPipe terdeteksi (garis-garis tangan akan muncul)

2. **Lakukan Gestur**
   - Tunjukkan tangan Anda ke kamera
   - Buat gestur yang Anda ingin dikenali
   - Aplikasi akan menampilkan nama gestur dan confidence score

3. **Lihat Hasil**
   - **Gesture**: Nama gestur yang terdeteksi
   - **Confidence**: Tingkat kepercayaan (0-100%)
   - **Recent**: 6 gestur terakhir yang terdeteksi

4. **Buat Kalimat**
   - Setiap gestur otomatis ditambahkan ke "Sentence Builder"
   - Klik "Ucapkan" untuk mendengarkan kalimat dengan text-to-speech
   - Klik "Salin" untuk menyalin teks
   - Klik "Hapus" untuk menghapus kalimat

**Tips Penggunaan:**
- Pastikan pencahayaan cukup untuk hasil optimal
- Letakkan tangan di pusat frame kamera
- Lakukan gerakan jelas dan konsisten
- Jangan terlalu cepat atau terlalu lambat
- Percayai confidence score sebagai acuan akurasi

---

### 2️⃣ Mode Penerjemah (Translator Mode)

**Untuk apa?**
- Menerjemahkan gestur ke teks
- Menerjemahkan teks ke gestur
- Menyimpan riwayat terjemahan
- Menggunakan text-to-speech

**Cara menggunakan:**

#### A. Penerjemah Gestur → Teks
1. Klik tab **"Gestur ke Teks"**
2. Akses kamera akan dimulai
3. Lakukan gestur di depan kamera
4. Aplikasi akan menampilkan:
   - Nama gestur
   - Terjemahan Indonesia
   - Terjemahan Inggris
   - Confidence score

#### B. Penerjemah Teks → Gestur
1. Klik tab **"Teks ke Gestur"**
2. Ketik atau tempel teks di kolom input
3. Tekan Enter atau klik "Terjemahkan"
4. Aplikasi akan menampilkan:
   - Saran gestur yang cocok
   - Deskripsi gestur
   - Emoji gestur
5. Klik salah satu gestur untuk mengetahui cara melakukannya

#### C. Riwayat Terjemahan
- Semua terjemahan otomatis disimpan
- Klik untuk melihat detail
- Klik "Hapus" untuk menghapus dari riwayat

---

### 3️⃣ Mode Pembelajaran (Learning Mode)

**Untuk apa?**
- Mempelajari gestur dengan sistematis
- Melihat cara melakukan gestur
- Melacak kemajuan per gestur
- Berlatih dengan guidance

**Cara menggunakan:**

1. **Pilih Kategori**
   - **Dasar**: 6 gestur dasar (OK, Peace, Pointing, dll)
   - **Huruf**: 26 gestur huruf A-Z
   - **Angka**: 10 gestur angka 0-9

2. **Pilih Gestur**
   - Tekan pada kartu gestur
   - Lihat detail:
     - Emoji & nama
     - Deskripsi lengkap
     - Tingkat kesulitan
     - Berapa kali Anda sudah latihan

3. **Pelajari Detailnya**
   - Baca deskripsi dengan teliti
   - Pahami cara membuat gestur
   - Lihat emoji untuk visualisasi

4. **Praktikkan**
   - Kembali ke Mode Pengenalan Gestur
   - Lakukan gestur yang sama berkali-kali
   - Tingkat accuracy akan meningkat
   - Achievement akan terbuka!

**Tips Belajar:**
- Mulai dari kategori Dasar
- Setiap hari minimal 15 menit latihan
- Ulangi gestur yang salah
- Gunakan feedback dari confidence score
- Raih semua achievement untuk motivasi

---

### 4️⃣ Mode Dashboard (Analytics)

**Untuk apa?**
- Melihat statistik pembelajaran
- Melacak kemajuan
- Melihat achievement yang terbuka
- Menganalisis data

**Cara menggunakan:**

1. **Lihat Statistik Utama**
   - **Total Deteksi**: Berapa kali gestur terdeteksi
   - **Akurasi**: Persentase akurasi deteksi
   - **Level**: Level pembelajaran Anda (1-100)
   - **XP**: Experience points (untuk level up)

2. **Lihat Achievement**
   - Scroll ke bawah untuk melihat semua achievement
   - ✅ = Achievement terbuka (dengan tanggal)
   - 🔒 = Achievement terkunci (lihat syarat)
   - Kumpulkan semua untuk "Achievement Master"!

3. **Lihat Charts**
   - **Deteksi per Hari**: Grafik aktivitas harian
   - **Top Gestur**: Gestur mana yang paling sering
   - **Progress**: Kemajuan keseluruhan

4. **Kelola Data**
   - **Export Data**: Unduh data Anda sebagai JSON
   - **Reset Data**: Hapus semua data (HATI-HATI!)

**Gunakan Dashboard untuk:**
- Monitor kemajuan mingguan
- Identifikasi gestur sulit yang perlu latihan
- Motivasi dari achievement
- Bagikan statistik dengan teman

---

## ⚙️ Pengaturan (Settings)

Klik tombol **Ikon Setelan** (gear icon) di header untuk membuka menu pengaturan.

### Opsi Pengaturan

| Pengaturan | Opsi | Fungsi |
|-----------|------|--------|
| **Bahasa** | ID / EN | Ubah bahasa aplikasi |
| **Tema** | Terang / Gelap | Pilih tema visual |
| **Suara** | ON / OFF | Aktifkan/nonaktifkan sound effects |
| **Getaran** | ON / OFF | Feedback getaran di mobile |
| **Threshold** | 0.5 - 1.0 | Tingkat kepercayaan minimum untuk deteksi |

### Penjelasan Detail

**Bahasa**
- Pilih Bahasa Indonesia atau English
- Mempengaruhi teks di seluruh aplikasi
- Tetap disimpan di localStorage

**Tema**
- **Terang**: Warna cerah, cocok untuk siang
- **Gelap**: Warna gelap (default), lebih nyaman untuk malam
- Otomatis disimpan

**Suara**
- Sound effects untuk klik dan notifikasi
- Nonaktifkan untuk mode silent

**Getaran** (Mobile only)
- Haptic feedback saat deteksi berhasil
- Nonaktifkan jika mengganggu

**Threshold**
- Semakin tinggi = lebih ketat (kurang false positive)
- Semakin rendah = lebih mudah (lebih false positive)
- Default: 0.7 (recommended)
- Sesuaikan dengan preferensi Anda

---

## 📊 Achievement & Gamification

GestureFlow memiliki sistem achievement untuk memotivasi pembelajaran.

### Daftar Achievement

| Icon | Nama | Syarat | XP |
|------|------|--------|-----|
| 🎯 | First Step | 1 deteksi berhasil | 10 |
| 🔟 | Starter | 10 deteksi berhasil | 50 |
| 50️⃣ | Practitioner | 50 deteksi berhasil | 100 |
| 💯 | Master | 100 deteksi berhasil | 200 |
| ⭐ | Perfectionist | 100% akurasi | 150 |
| 5️⃣ | Learning Curve | 5+ jenis gestur berbeda | 75 |
| 🎖️ | Alphabet Master | Semua 26 huruf lancar | 300 |
| ⚡ | Speed Demon | 50 deteksi dalam 5 menit | 100 |
| 🔥 | Streak Warrior | 7 hari latihan berturut-turut | 200 |
| 🏆 | Quiz Champion | 10 kuis berhasil | 150 |
| 🌙 | Night Owl | 1 jam latihan malam | 50 |
| ♿ | Accessibility Hero | Gunakan fitur aksesibilitas | 100 |

### Sistem Level & XP
- Setiap achievement memberikan XP
- Kumpulkan XP untuk level up
- Semakin tinggi level = semakin sulit
- Level max: 100

**Rumus Level:**
```
XP per Level = 100 + (Level × 50)
Contoh:
- Level 1: 100 XP
- Level 2: 150 XP
- Level 3: 200 XP
dst...
```

---

## 🎤 Menggunakan Speech (Text-to-Speech)

### Cara Mendengarkan Teks
1. Ketikkan atau pilih teks
2. Klik tombol "🔊 Ucapkan" atau "Speak"
3. Aplikasi akan membaca teks dengan suara

### Kontrol Suara
- **Pause/Resume**: Jeda atau lanjutkan
- **Stop**: Hentikan sepenuhnya
- **Rate**: Kecepatan berbicara (0.5x - 2x)
- **Pitch**: Intonasi suara
- **Volume**: Keras suara

### Tips
- Gunakan untuk melatih pengucapan
- Atur kecepatan sesuai kemampuan Anda
- Nonaktifkan di pengaturan jika mengganggu

---

## 📱 Menggunakan di Mobile

### Instalasi Sebagai Aplikasi
1. Buka di Chrome/Firefox Mobile
2. Tap menu (3 titik) → "Tambah ke Layar Utama"
3. Aplikasi akan tersedia seperti app native
4. Buka offline tanpa internet!

### Tips Mobile
- Gunakan landscape mode untuk area lebih luas
- Pencahayaan alami sangat penting
- Stabilkan ponsel dengan stand
- Bersihkan lensa kamera
- Gunakan fullscreen untuk fokus

### Performance
- Optimal di: iPhone 11+, Samsung S10+, dll
- Membutuhkan: Kamera, GPS optional
- Battery: ~2-3 jam penggunaan normal
- Data: Semua disimpan lokal (offline first)

---

## 🔐 Privacy & Data

### Data Anda Aman
- ✅ Semua data disimpan lokal di ponsel/komputer
- ✅ TIDAK ada kirim ke server
- ✅ TIDAK ada tracking/analytics
- ✅ TIDAK perlu login/password
- ✅ Anda punya kontrol penuh

### Backup Data
1. Buka Dashboard
2. Klik "📥 Export Data"
3. File JSON akan diunduh
4. Simpan di tempat aman

### Restore Data
1. Buka Dashboard di perangkat baru
2. Klik "📤 Import Data"
3. Pilih file JSON yang sudah diekspor
4. Data akan dikembalikan

### Hapus Data
⚠️ **PERINGATAN**: Aksi ini tidak bisa dibatalkan!
1. Buka Dashboard
2. Klik "🗑️ Reset Data"
3. Konfirmasi penghapusan
4. Semua data akan hilang

---

## 🆘 Troubleshooting (Pemecahan Masalah)

### Kamera Tidak Bekerja

**Masalah**: Kamera tidak terdeteksi atau layar hitam

**Solusi**:
1. Beri akses kamera ke browser (cek izin di Settings)
2. Restart browser
3. Bersihkan lensa kamera
4. Coba browser lain (Chrome recommended)
5. Restart perangkat

### Gestur Tidak Terdeteksi

**Masalah**: Aplikasi tidak mengenali gestur saya

**Solusi**:
1. Atur ulang threshold ke 0.7 di Settings
2. Perbaiki pencahayaan ruangan
3. Posisikan tangan di tengah frame
4. Buat gestur lebih jelas dan tegas
5. Tunggu garis-garis tangan muncul (MediaPipe loading)

### Confidence Score Rendah

**Masalah**: Akurasi deteksi rendah (30-40%)

**Solusi**:
1. Perbaiki posisi tangan
2. Cahaya lebih terang
3. Latihan lebih banyak (app belajar dari Anda)
4. Baca deskripsi gestur dengan teliti
5. Naikkan threshold jika sering false positive

### Text-to-Speech Tidak Bekerja

**Masalah**: Tidak ada suara saat klik "Ucapkan"

**Solusi**:
1. Pastikan speaker/headphone terhubung
2. Cek volume browser/perangkat
3. Nonaktifkan mode senyap (jika ada)
4. Refresh halaman
5. Coba browser lain

### Aplikasi Crash atau Freeze

**Masalah**: Aplikasi lambat atau berhenti merespons

**Solusi**:
1. Refresh halaman (F5)
2. Matikan fitur lain di browser
3. Restart browser
4. Clear cache browser
5. Gunakan browser yang lebih baru

### Tidak Bisa Offline

**Masalah**: Aplikasi membutuhkan internet

**Solusi**:
1. Pertama kali HARUS online untuk loading assets
2. Setelah itu, buka offline untuk akses app
3. Service Worker harus terdaftar (cek di DevTools)
4. Clear browser cache jika bermasalah

---

## 💡 Tips & Trik

### Tips Belajar Efektif
1. **Konsisten**: Latihan 15-30 menit setiap hari
2. **Sistematis**: Mulai dari Basic → Alphabet → Angka
3. **Fokus**: Kuasai 5 gestur baru per hari
4. **Review**: Ulang gestur lama 2-3x per minggu
5. **Real Practice**: Praktikkan dengan teman
6. **Recording**: Rekam diri Anda untuk evaluasi
7. **Mirror**: Gunakan mirror untuk feedback visual

### Tips Deteksi
1. Gunakan kedua tangan untuk gesture dengan dua tangan
2. Buat gerakan yang jelas dan tidak terburu-buru
3. Cahaya dari depan lebih baik dari belakang
4. Jarak ideal: 0.5-2 meter dari kamera
5. Bersihkan lensa kamera secara berkala

### Tips Menggunakan Speech
1. Atur rate sesuai kecepatan Anda belajar
2. Dengarkan berkali-kali hingga hafal
3. Coba mengikuti intonasi (pitch)
4. Gunakan untuk drill pronunciation

### Tips Mencapai Achievement
1. Fokus pada satu achievement dulu
2. Monitor progress di Dashboard
3. Gunakan achievement sebagai milestone
4. Rayakan setiap pencapaian!

---

## 📞 Bantuan & Dukungan

### Pertanyaan Umum
**Q: Bagaimana cara menghubungi developer?**
A: Buat issue di GitHub atau email support@gestureflow.com

**Q: Bisakah saya menggunakan di iPad/Tablet?**
A: Ya! Aplikasi fully responsive untuk semua ukuran layar.

**Q: Apakah ada mode kuis?**
A: Belum ada di versi ini, akan ditambah di fase berikutnya.

**Q: Berapa banyak gestur yang bisa dipelajari?**
A: 42 gestur tersedia, akan terus bertambah.

**Q: Apakah bisa multiplayer?**
A: Belum ada, sedang dalam pengembangan.

### Resource Tambahan
- 📖 [Dokumentasi Lengkap](./README.md)
- 🛠️ [Panduan Setup](./SETUP.md)
- 💻 [Referensi Cepat](./QUICK_REFERENCE.md)
- 🎯 [Ringkasan Teknis](./IMPLEMENTATION_SUMMARY.md)

---

## 🎉 Kesimpulan

Selamat belajar dengan GestureFlow! 

**Ingat:**
- ✅ Konsisten dalam latihan
- ✅ Sabar dengan kemajuan
- ✅ Gunakan semua fitur
- ✅ Bagikan dengan teman
- ✅ Berikan feedback

**Tujuan kami**: Membuat pembelajaran Bahasa Isyarat menjadi mudah, menyenangkan, dan dapat diakses oleh semua orang. ♿💚

---

**Dibuat dengan ❤️ untuk aksesibilitas dan pendidikan**

**Versi**: 1.0  
**Terakhir diperbarui**: Mei 2026  
**Bahasa**: Bahasa Indonesia
