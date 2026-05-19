# 🛠️ GestureFlow - Panduan Developer (Bahasa Indonesia)

## 📋 Daftar Isi
1. [Pengenalan Arsitektur](#pengenalan-arsitektur)
2. [Setup Lokal](#setup-lokal)
3. [Struktur Proyek](#struktur-proyek)
4. [Panduan Coding](#panduan-coding)
5. [Menambah Fitur](#menambah-fitur)
6. [Testing & Debugging](#testing--debugging)
7. [Deployment](#deployment)

---

## 🏗️ Pengenalan Arsitektur

### Filosofi Desain
- **Vanilla JavaScript**: Tanpa framework, full kontrol
- **Modular**: Setiap fungsi terpisah, mudah diperbaharui
- **Progressive Enhancement**: Bekerja minimal, makin baik dengan enhancement
- **Offline First**: Prioritas data lokal, sync online opsional

### Diagram Arsitektur

```
┌─────────────────────────────────────────┐
│         Lapisan Presentasi              │
│   (HTML UI + CSS Styling)               │
│   landing.html, app.html                │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│    Lapisan Komponen & UI                │
│   components/uiComponents.js            │
│   (8 komponen reusable)                 │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│    Lapisan Logika Aplikasi              │
│   app.html (Mode: Gesture, etc)         │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│    Lapisan Services (Business Logic)    │
│   ├─ gestureService.js (MediaPipe)      │
│   ├─ speechService.js (TTS/Speech)      │
│   └─ storageService.js (Data)           │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│    Lapisan Utilities & Helpers          │
│   ├─ helpers.js (50+ functions)         │
│   └─ Data (gestures, achievements)      │
└────────────┬────────────────────────────┘
             │
┌────────────▼────────────────────────────┐
│    Lapisan Browser APIs                 │
│   ├─ Camera (getUserMedia)              │
│   ├─ Speech API                         │
│   ├─ localStorage                       │
│   └─ ServiceWorker                      │
└─────────────────────────────────────────┘
```

---

## 💻 Setup Lokal

### Persyaratan Sistem
- Browser modern (Chrome 90+, Firefox 88+, Safari 14+)
- Node.js 16+ ATAU Python 3+
- Git (opsional)

### Instalasi Langkah Demi Langkah

**1. Clone atau Download Proyek**
```bash
# Dengan Git
git clone https://github.com/tokiooferius/gesture-landing.git
cd gesture-landing

# Atau manual: Download dari GitHub
# Extract folder ke direktori kerja Anda
```

**2. Buka Folder di VS Code**
```bash
code .
```

**3. Jalankan Local Server**

**Opsi A: Dengan Python**
```bash
python -m http.server 8000
# Python 2
python -m SimpleHTTPServer 8000
```

**Opsi B: Dengan Node.js**
```bash
npx http-server
# Atau install global
npm install -g http-server
http-server
```

**Opsi C: VS Code Live Server**
1. Install extension "Live Server"
2. Klik kanan file HTML
3. Pilih "Open with Live Server"

**4. Buka di Browser**
```
http://localhost:8000
```

Selesai! 🎉

---

## 📂 Struktur Proyek

### Folder Layout
```
gesture-landing/
│
├── 🎯 landing.html              # Landing page (entry point)
├── 📱 app.html                  # Aplikasi utama
│
├── 🌐 manifest.json             # PWA manifest
├── ⚙️ sw.js                      # Service Worker
│
├── 📚 Dokumentasi
│   ├── README.md                # Overview proyek
│   ├── SETUP.md                 # Setup guide (English)
│   ├── PANDUAN_PENGGUNA.md      # User guide (Bahasa Indonesia)
│   ├── PANDUAN_DEVELOPER.md     # Dev guide (Bahasa Indonesia) ← INI FILE
│   ├── QUICK_REFERENCE.md       # Quick reference
│   └── IMPLEMENTATION_SUMMARY.md # Technical details
│
└── src/                          # Source code
    │
    ├── components/
    │   └── uiComponents.js      # 8 UI component factories
    │       ├── createButton()
    │       ├── createCard()
    │       ├── createModal()
    │       ├── showToast()
    │       ├── createStatCard()
    │       ├── createProgressBar()
    │       ├── createBadge()
    │       └── createSkeleton()
    │
    ├── services/
    │   ├── gestureService.js    # Deteksi gestur (MediaPipe)
    │   │   ├── initialize()
    │   │   ├── startDetection()
    │   │   ├── classifyGesture()
    │   │   └── Callbacks: onDetection, onError
    │   │
    │   ├── speechService.js     # Text-to-Speech & Recognition
    │   │   ├── SpeechSynthesisService
    │   │   ├── SpeechRecognitionService
    │   │   ├── speak()
    │   │   └── recognize()
    │   │
    │   └── storageService.js    # Persisten data lokal
    │       ├── recordDetection()
    │       ├── getStats()
    │       ├── exportData()
    │       └── importData()
    │
    ├── utils/
    │   └── helpers.js            # 50+ utility functions
    │       ├── StorageManager
    │       ├── AnimationUtils (debounce, throttle)
    │       ├── GestureUtils (distance, angle)
    │       ├── StringUtils (capitalize, slugify)
    │       ├── DOMUtils
    │       ├── TimeUtils
    │       ├── MathUtils
    │       ├── ValidationUtils (browser support)
    │       └── DeviceUtils (mobile detect, vibrate)
    │
    ├── data/
    │   ├── gestureLibrary.js    # 42 gesture definitions
    │   │   ├── GESTURE_DATA = { A, B, C, ..., ok, peace, ... }
    │   │   ├── getGesture(id)
    │   │   ├── getGesturesByCategory()
    │   │   └── getAllGestures()
    │   │
    │   └── achievements.js      # 12 achievement definitions
    │       ├── ACHIEVEMENTS = { first_step, starter, ... }
    │       ├── getAchievement(id)
    │       └── checkAchievements(stats)
    │
    ├── models/                  # (Ready untuk ML)
    │   └── (TensorFlow.js models akan di sini)
    │
    └── styles/                  # (Ready untuk custom CSS)
        └── (Custom styles jika diperlukan)

└── public/                       # (Ready untuk static assets)
    └── (Icons, images, dll)
```

---

## 📖 Panduan Coding

### Konvensi & Style Guide

#### Naming Convention
```javascript
// Variables & functions: camelCase
let gestureName = "peace";
function detectGesture() { }

// Constants: UPPER_SNAKE_CASE
const MAX_CONFIDENCE = 0.95;
const GESTURE_BUFFER_SIZE = 10;

// Classes: PascalCase
class GestureDetectionService { }

// Private methods: _leading underscore
function _normalizeCoordinates() { }

// Event handlers: handleEventName
function handleCameraClick() { }
function onGestureDetected() { }
```

#### Code Style
```javascript
// ✅ BAIK
class StorageService {
    /**
     * Simpan deteksi gestur ke localStorage
     * @param {string} gestureName - Nama gestur
     * @param {number} confidence - Skor kepercayaan (0-1)
     * @returns {void}
     */
    recordDetection(gestureName, confidence) {
        const stats = this.getStats();
        stats.totalDetections++;
        // ... logic
    }
}

// ❌ BURUK
function record_d(g_n, conf) {
    // Short names, no documentation
}
```

#### Documentation Style
```javascript
/**
 * Menghitung jarak Euclidean antara dua titik
 * 
 * @function distance
 * @param {Object} point1 - Titik pertama {x, y}
 * @param {Object} point2 - Titik kedua {x, y}
 * @returns {number} Jarak antara dua titik
 * 
 * @example
 * const dist = distance({x: 0, y: 0}, {x: 3, y: 4});
 * console.log(dist); // 5
 */
export function distance(point1, point2) {
    const dx = point2.x - point1.x;
    const dy = point2.y - point1.y;
    return Math.sqrt(dx * dx + dy * dy);
}
```

### Import/Export Modules

```javascript
// Mengimport
import { GestureDetectionService } from './services/gestureService.js';
import { createButton, showToast } from './components/uiComponents.js';
import { debounce, distance } from './utils/helpers.js';

// Mengexport (di file service)
export class GestureDetectionService {
    // ...
}

export function helperFunction() {
    // ...
}

export default {
    service: GestureDetectionService,
    helper: helperFunction
};
```

---

## ➕ Menambah Fitur

### Case Study 1: Menambah Gesture Baru

**Langkah 1: Definisikan di gestureLibrary.js**
```javascript
// File: src/data/gestureLibrary.js

const GESTURE_DATA = {
    // ... existing gestures ...
    
    // Gesture baru: Salib (tangan bersalib)
    'salib': {
        name: 'Salib',
        emoji: '✨',
        indonesian: 'Salib',
        translation: 'Cross/X',
        description: 'Tangan kiri dan kanan membentuk huruf X di depan dada',
        category: 'basic',
        difficulty: 2,
        videoUrl: null
    }
};
```

**Langkah 2: Tambah Logic Klasifikasi**
```javascript
// File: src/services/gestureService.js

classifyGesture(landmarks) {
    const features = this.extractFeatures(landmarks);
    
    // Tambah check untuk gesture baru
    if (this._isCrossShape(landmarks)) {
        return { gesture: 'salib', confidence: 0.92 };
    }
    
    // ... existing logic ...
}

// Fungsi helper untuk deteksi gesture baru
_isCrossShape(landmarks) {
    // landmarks adalah array 21 titik tangan (MediaPipe format)
    // Index reference:
    // 9 = wrist, 5 = index mcp, 17 = pinky mcp
    
    const wrist = landmarks[9];
    const indexTip = landmarks[8];
    const pinkyTip = landmarks[20];
    
    // Logic untuk deteksi bentuk salib
    const isOpen = this._isHandOpen(landmarks);
    const angle = this._getHandAngle(landmarks);
    
    return isOpen && Math.abs(angle) < 30;
}
```

**Langkah 3: Test**
```javascript
// Buka browser DevTools (F12)
// Console tab
// Ketik:
const gestureLib = await import('./src/data/gestureLibrary.js');
const gesture = gestureLib.getGesture('salib');
console.log(gesture);

// Kemudian coba gesture di aplikasi
// Mode Gesture → lakukan gestur baru
// Lihat apakah terdeteksi
```

### Case Study 2: Menambah Achievement Baru

**Langkah 1: Definisikan di achievements.js**
```javascript
// File: src/data/achievements.js

const ACHIEVEMENTS = {
    // ... existing achievements ...
    
    'gesture_master': {
        id: 'gesture_master',
        name: 'Master Gestur',
        description: 'Kuasai 30+ jenis gestur berbeda',
        requirement: '30+ jenis gestur',
        xpReward: 500,
        condition: (stats) => {
            const uniqueGestures = Object.keys(stats.gestureProgress).length;
            return uniqueGestures >= 30;
        }
    }
};
```

**Langkah 2: Update Check Logic**
```javascript
// File: src/services/storageService.js

checkAchievements() {
    const stats = this.getStats();
    const unlocked = [];
    
    for (const achievement of Object.values(ACHIEVEMENTS)) {
        if (achievement.condition(stats)) {
            unlocked.push(achievement.id);
        }
    }
    
    return unlocked;
}
```

**Langkah 3: Display di Dashboard**
Achievement akan otomatis muncul di Dashboard karena logic sudah di sana.

### Case Study 3: Menambah UI Component

**Langkah 1: Buat Component Factory**
```javascript
// File: src/components/uiComponents.js

export function createAvatarCard(userData) {
    const card = document.createElement('div');
    card.className = 'bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg p-6 text-white';
    
    card.innerHTML = `
        <div class="flex items-center justify-between">
            <div>
                <h3 class="text-xl font-bold">${userData.name}</h3>
                <p class="text-blue-200">Level ${userData.level}</p>
            </div>
            <div class="text-5xl">${userData.avatar}</div>
        </div>
    `;
    
    return card;
}
```

**Langkah 2: Gunakan di app.html**
```javascript
// Di app.html
import { createAvatarCard } from './src/components/uiComponents.js';
import StorageService from './src/services/storageService.js';

const storage = new StorageService();
const stats = storage.getStats();

const avatar = createAvatarCard({
    name: 'User',
    level: stats.level,
    avatar: '👤'
});

document.getElementById('profile-container').appendChild(avatar);
```

---

## 🧪 Testing & Debugging

### Browser DevTools

#### 1. Console Tab
```javascript
// Test gesture detection
import { GestureDetectionService } from './src/services/gestureService.js';

const gesture = new GestureDetectionService();
console.log(gesture);

// Test storage
import StorageService from './src/services/storageService.js';
const storage = new StorageService();
console.log(storage.getStats());

// Test utilities
import { distance, debounce } from './src/utils/helpers.js';
const dist = distance({x:0, y:0}, {x:3, y:4});
console.log(dist); // 5
```

#### 2. Application Tab (LocalStorage)
```
1. Buka DevTools
2. Tab: Application
3. Lihat LocalStorage
4. Key-value pairs:
   - gestureflow_stats
   - gestureflow_settings
   - gestureflow_history
```

#### 3. Network Tab
- Monitor file loading
- Check CDN requests (MediaPipe, Chart.js, dll)
- Lihat response time
- Cari error 404

#### 4. Performance Tab
- Record session
- Lihat FPS gesture detection
- Monitor CPU usage
- Check memory leaks

### Debugging Tips

#### Tambah Console Logs
```javascript
// Sebelum production
console.debug('[GestureService] Deteksi gesture:', gesture);
console.warn('[StorageService] Data tidak lengkap!');
console.error('[SpeechService] Gagal membaca suara');

// Gunakan prefix untuk tracking
const DEBUG = {
    GESTURE: '[GESTURE]',
    SPEECH: '[SPEECH]',
    STORAGE: '[STORAGE]'
};

console.log(DEBUG.GESTURE, 'Gesture detected:', gesture);
```

#### Breakpoints
```javascript
// Di VS Code Debugger atau DevTools
// Klik nomor baris untuk set breakpoint
// F10 = Step over, F11 = Step in, Shift+F11 = Step out

// Atau manual dengan debugger keyword
function detectGesture() {
    debugger; // Execution pause di sini
    // ...
}
```

#### Testing Offline
1. Buka DevTools
2. Tab Network
3. Ubah dropdown "No throttling" ke "Offline"
4. Refresh page
5. Lihat apakah app masih berfungsi (harus bisa, karena cache)

---

## 🚀 Deployment

### Opsi 1: GitHub Pages (Recommended)

**Setup Initial**
```bash
# 1. Buat repository di GitHub
# Nama: tokiooferius.github.io

# 2. Clone
git clone https://github.com/tokiooferius/tokiooferius.github.io.git
cd tokiooferius.github.io

# 3. Copy semua file gesture-landing
cp -r ../gesture-landing/* .

# 4. Push
git add .
git commit -m "Deploy GestureFlow"
git push origin main
```

**Live di**: https://tokiooferius.github.io

### Opsi 2: Vercel

```bash
# 1. Install Vercel CLI
npm install -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod

# Follow prompts dan pilih folder
```

### Opsi 3: Netlify

```bash
# 1. Install Netlify CLI
npm install -g netlify-cli

# 2. Login
netlify login

# 3. Deploy
netlify deploy --prod --dir=.

# Atau drag-drop folder di Netlify UI
```

### Pre-Deployment Checklist
- ✅ Semua file ada di repo
- ✅ landing.html berhasil di-load
- ✅ Service worker terdaftar
- ✅ Tidak ada console errors
- ✅ Test mode offline bekerja
- ✅ Test di mobile device
- ✅ Test di browser berbeda

---

## 🔧 Advanced Topics

### Menambah MediaPipe Model

```javascript
// File: src/services/gestureService.js

// Ganti dari rule-based ke TensorFlow model
async classifyGesture(landmarks) {
    // Method lama (rule-based)
    // return simpleClassify(landmarks);
    
    // Method baru (ML model)
    const features = this.extractFeatures(landmarks);
    const prediction = await this.mlModel.predict(features);
    
    return {
        gesture: prediction.gesture,
        confidence: prediction.confidence
    };
}
```

### Integrasi Backend (Future)

```javascript
// Untuk Phase 2 (belum di-implement)
// src/services/apiService.js

export class APIService {
    async uploadGestureData(data) {
        const response = await fetch('https://api.example.com/gestures', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return response.json();
    }
}
```

### Custom Themes

```javascript
// File: src/styles/themes.js

export const THEMES = {
    dark: {
        primary: '#2563EB',
        secondary: '#10B981',
        bg: '#0f172a'
    },
    light: {
        primary: '#1e40af',
        secondary: '#059669',
        bg: '#f8fafc'
    },
    highContrast: {
        primary: '#000000',
        secondary: '#FFFFFF',
        bg: '#FFFFFF'
    }
};

// Implementasi di CSS
document.documentElement.setAttribute('data-theme', 'dark');
```

---

## 📚 Resources

### Documentation
- [MDN Web Docs](https://developer.mozilla.org)
- [Web APIs](https://developer.mozilla.org/en-US/docs/Web/API)
- [ECMAScript (JavaScript)](https://www.ecma-international.org/ecma-262/)

### Libraries & Tools
- [MediaPipe](https://google.github.io/mediapipe/)
- [TensorFlow.js](https://www.tensorflow.org/js)
- [Chart.js](https://www.chartjs.org)
- [TailwindCSS](https://tailwindcss.com)

### Communities
- [Mozilla Developer Community](https://discourse.mozilla.org)
- [Web Standards Discussions](https://whatwg.org)
- [Stack Overflow](https://stackoverflow.com/tags/javascript/)

---

## 🤝 Berkontribusi

### Workflow Kontribusi

1. **Fork Repository**
   ```bash
   git clone https://github.com/tokiooferius/gesture-landing.git
   cd gesture-landing
   git checkout -b feature/amazing-feature
   ```

2. **Buat Perubahan**
   - Edit files
   - Test secara lokal
   - Commit dengan pesan jelas

3. **Push & Pull Request**
   ```bash
   git push origin feature/amazing-feature
   # Buat PR di GitHub
   ```

### Code Review Guidelines
- Kode harus clean & documented
- Sesuai naming convention
- Tidak break existing functionality
- Test di multiple browsers
- Pesan commit deskriptif

---

## 📞 Support & Questions

**Cara Menghubungi:**
- 📧 Email: dev@gestureflow.com
- 🐛 GitHub Issues
- 💬 GitHub Discussions
- 📱 Social Media

---

## 📋 Checklist Development

### Setup Awal
- [ ] Clone/download repo
- [ ] Buka di VS Code
- [ ] Run local server
- [ ] Test landing page
- [ ] Test app.html
- [ ] Buka DevTools

### Sebelum Commit
- [ ] Test di Chrome
- [ ] Test di Firefox
- [ ] Test di mobile
- [ ] Tidak ada console errors
- [ ] Code sudah formatted
- [ ] Comments sudah ada

### Sebelum Deploy
- [ ] All files committed
- [ ] Testing complete
- [ ] No breaking changes
- [ ] README updated
- [ ] Deployment checklist passed

---

**Selamat coding! 🚀**

Dibuat dengan ❤️ untuk developer yang ingin berkontribusi.

Versi: 1.0  
Bahasa: Bahasa Indonesia  
Terakhir: Mei 2026
