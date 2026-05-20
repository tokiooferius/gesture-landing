/**
 * Gesture Display Service
 * Handle gesture visualization dengan SVG dan text labels
 */

export class GestureDisplayService {
    constructor() {
        this.gestureEmojis = {
            'allOpen': { emoji: '🖐️', label: 'Hai', svg: 'hand-open.svg' },
            'ok': { emoji: '👌', label: 'Nama saya', svg: 'hand-ok.svg' },
            'pointingIndex': { emoji: '☝️', label: 'Saya', svg: 'hand-point-index.svg' },
            'pointingPinky': { emoji: '🤙', label: 'Halo', svg: 'hand-point-pinky.svg' },
            'peace': { emoji: '✌️', label: 'Terima kasih', svg: 'hand-peace.svg' },
            'metal': { emoji: '🤟', label: 'Senang bertemu denganmu', svg: 'hand-metal.svg' }
        };

        this.alphabetGestures = {};
        this.initAlphabetGestures();

        this.lastDetectedGesture = null;
        this.lastDetectionTime = 0;
        this.debounceMs = 800; // Debounce 800ms untuk menghindari deteksi duplikat
    }

    /**
     * Initialize alphabet gestures dengan SVG paths
     */
    initAlphabetGestures() {
        const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
        const numbers = '0123456789'.split('');

        alphabet.forEach(letter => {
            this.alphabetGestures[letter] = {
                emoji: '✊', // Placeholder
                label: letter,
                svg: `alphabet/${letter.toLowerCase()}.svg` // Path placeholder
            };
        });

        numbers.forEach(num => {
            this.alphabetGestures[num] = {
                emoji: '✋',
                label: num,
                svg: `numbers/${num}.svg`
            };
        });
    }

    /**
     * Get gesture info dengan SVG path
     */
    getGestureInfo(gestureKey) {
        return this.gestureEmojis[gestureKey] || this.alphabetGestures[gestureKey];
    }

    /**
     * Create SVG image element
     */
    createGestureImage(gestureKey, className = '') {
        const gesture = this.getGestureInfo(gestureKey);
        
        if (!gesture) return null;

        const img = document.createElement('img');
        img.src = `/public/gestures/${gesture.svg}`;
        img.alt = gesture.label;
        img.className = `gesture-svg ${className}`;
        img.loading = 'lazy';
        
        return img;
    }

    /**
     * Create gesture card dengan SVG (untuk gesture guide)
     */
    createGestureCard(gestureKey, isActive = false) {
        const gesture = this.getGestureInfo(gestureKey);
        
        if (!gesture) return null;

        const card = document.createElement('div');
        card.className = `gesture-guide-card ${isActive ? 'active' : ''}`;
        card.dataset.gesture = gestureKey;

        // SVG/Image
        const img = this.createGestureImage(gestureKey);
        if (img) {
            img.style.width = '100%';
            img.style.height = 'auto';
            img.style.maxHeight = '80px';
            card.appendChild(img);
        }

        // Label
        const label = document.createElement('div');
        label.className = 'letter';
        label.textContent = gesture.label;
        card.appendChild(label);

        return card;
    }

    /**
     * Check if gesture should be filtered (debounce)
     */
    shouldDetectGesture(gestureKey, currentTime = Date.now()) {
        // Jika gesture berbeda, allow
        if (gestureKey !== this.lastDetectedGesture) {
            this.lastDetectedGesture = gestureKey;
            this.lastDetectionTime = currentTime;
            return true;
        }

        // Jika gesture sama tapi sudah lewat debounce time
        if (currentTime - this.lastDetectionTime > this.debounceMs) {
            this.lastDetectionTime = currentTime;
            return true;
        }

        // Gesture sama dan masih dalam debounce time
        return false;
    }

    /**
     * Reset debounce
     */
    resetDebounce() {
        this.lastDetectedGesture = null;
        this.lastDetectionTime = 0;
    }

    /**
     * Format gesture output untuk display
     */
    formatGestureOutput(gestureKey, customText = null) {
        const gesture = this.getGestureInfo(gestureKey);
        
        if (!gesture) return '-';

        return customText || gesture.label;
    }

    /**
     * Get SVG path untuk gesture
     */
    getGestureSvgPath(gestureKey) {
        const gesture = this.getGestureInfo(gestureKey);
        return gesture ? `/public/gestures/${gesture.svg}` : null;
    }

    /**
     * Create instruction element dengan SVG
     */
    createInstructionPanel(gestureKey) {
        const gesture = this.getGestureInfo(gestureKey);
        
        if (!gesture) return null;

        const panel = document.createElement('div');
        panel.className = 'instruction-panel';

        const title = document.createElement('div');
        title.className = 'instruction-title';
        title.textContent = `Gesture: ${gesture.label}`;
        panel.appendChild(title);

        const svg = this.createGestureImage(gestureKey);
        if (svg) {
            svg.style.maxHeight = '120px';
            svg.style.margin = '15px auto';
            const svgContainer = document.createElement('div');
            svgContainer.style.textAlign = 'center';
            svgContainer.appendChild(svg);
            panel.appendChild(svgContainer);
        }

        const desc = document.createElement('div');
        desc.className = 'instruction-text';
        desc.textContent = 'Tunjukkan gesture ini di depan kamera';
        panel.appendChild(desc);

        return panel;
    }

    /**
     * Set debounce time (ms)
     */
    setDebounceTime(ms) {
        this.debounceMs = Math.max(100, ms);
    }

    /**
     * Get debounce time
     */
    getDebounceTime() {
        return this.debounceMs;
    }
}

export default GestureDisplayService;
