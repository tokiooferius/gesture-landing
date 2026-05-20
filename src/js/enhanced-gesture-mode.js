/**
 * Enhanced Gesture Mode with SVG & Debouncing
 * Menggantikan gesture recognition yang lama dengan fitur-fitur baru
 */

import { GestureDisplayService } from './gestureDisplayService.js';

const displayService = new GestureDisplayService();
displayService.setDebounceTime(800); // 800ms debounce untuk mencegah duplikat

/**
 * Initialize gesture mode dengan SVG dan text labels
 */
export function initEnhancedGestureMode(videoElement, canvasElement, translationTextElement, usernameInput) {
    const canvasCtx = canvasElement.getContext('2d');
    let gestureHands = null;
    let lastConfidence = 0;

    // Gesture translations untuk mode lama (kompatibilitas)
    const gestureTranslations = {
        'allOpen': 'Hai',
        'ok': 'Nama saya',
        'pointingIndex': 'Saya',
        'pointingPinky': 'Halo',
        'peace': 'Terima kasih',
        'metal': 'Senang bertemu denganmu'
    };

    function onResults(results) {
        canvasElement.width = videoElement.videoWidth;
        canvasElement.height = videoElement.videoHeight;

        canvasCtx.save();
        canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);

        let confidence = 0;

        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            for (const landmarks of results.multiHandLandmarks) {
                // Draw landmarks
                drawConnectors(canvasCtx, landmarks, HAND_CONNECTIONS, {
                    color: '#2563EB',
                    lineWidth: 3
                });
                drawLandmarks(canvasCtx, landmarks, {
                    color: '#10B981',
                    fillColor: '#2563EB',
                    lineWidth: 2,
                    radius: 4
                });

                // Detect gesture
                const { gesture, conf } = detectGestureWithConfidence(landmarks);
                confidence = conf;
                lastConfidence = confidence;

                // Check debounce sebelum output
                if (gesture && displayService.shouldDetectGesture(gesture)) {
                    const output = gestureTranslations[gesture] || gesture;
                    const displayText = gesture === 'ok' 
                        ? (usernameInput.value.trim() || 'Teman')
                        : output;

                    // Update text display
                    translationTextElement.innerText = displayText;
                    translationTextElement.title = `Confidence: ${Math.round(confidence)}%`;

                    // Add to history
                    addToHistoryEnhanced('gesture', displayText);

                    // Speak
                    speakText(displayText);

                    // Add stat
                    addDetectionStat(gesture);

                    // Show feedback
                    showDetectionFeedback(displayText, confidence);
                }
            }
        }

        // Update confidence display
        updateConfidenceBarEnhanced(confidence);
        canvasCtx.restore();
    }

    function detectGestureWithConfidence(landmarks) {
        const thumbTip = landmarks[4];
        const indexTip = landmarks[8];
        const middleTip = landmarks[12];
        const ringTip = landmarks[16];
        const pinkyTip = landmarks[20];

        const indexMcp = landmarks[5];
        const middleMcp = landmarks[9];
        const ringMcp = landmarks[13];
        const pinkyMcp = landmarks[17];

        const isIndexOpen = indexTip.y < indexMcp.y;
        const isMiddleOpen = middleTip.y < middleMcp.y;
        const isRingOpen = ringTip.y < ringMcp.y;
        const isPinkyOpen = pinkyTip.y < pinkyMcp.y;

        const distThumbIndex = Math.sqrt(
            Math.pow(thumbTip.x - indexTip.x, 2) + 
            Math.pow(thumbTip.y - indexTip.y, 2)
        );
        const isOkPose = distThumbIndex < 0.05;

        let gesture = null;
        let confidence = 0;

        if (isOkPose && isMiddleOpen && isRingOpen && isPinkyOpen) {
            gesture = 'ok';
            confidence = 95;
        } else if (isIndexOpen && isMiddleOpen && !isRingOpen && !isPinkyOpen) {
            gesture = 'peace';
            confidence = 90;
        } else if (isIndexOpen && isPinkyOpen && !isMiddleOpen && !isRingOpen) {
            gesture = 'metal';
            confidence = 88;
        } else if (isIndexOpen && !isMiddleOpen && !isRingOpen && !isPinkyOpen) {
            gesture = 'pointingIndex';
            confidence = 85;
        } else if (isPinkyOpen && !isIndexOpen && !isMiddleOpen && !isRingOpen) {
            gesture = 'pointingPinky';
            confidence = 82;
        } else if (isIndexOpen && isMiddleOpen && isRingOpen && isPinkyOpen) {
            gesture = 'allOpen';
            confidence = 92;
        } else {
            confidence = 35;
        }

        return { gesture, conf: confidence };
    }

    // Initialize MediaPipe Hands
    gestureHands = new Hands({
        locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`
    });

    gestureHands.setOptions({
        maxNumHands: 1,
        modelComplexity: 0,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5
    });

    gestureHands.onResults(onResults);

    const cameraGesture = new Camera(videoElement, {
        onFrame: async () => {
            await gestureHands.send({image: videoElement});
        },
        width: 640,
        height: 480
    });

    cameraGesture.start().catch(err => {
        console.error(err);
        showToast('✗ Error memulai MediaPipe Hands');
    });

    return cameraGesture;
}

/**
 * Update gesture guide cards dengan SVG
 */
export function updateGestureGuideCards() {
    const container = document.getElementById('alphabet-guide');
    if (!container) return;

    container.innerHTML = '';
    
    const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
    alphabet.forEach(letter => {
        const card = document.createElement('div');
        card.className = 'gesture-guide-card';
        card.innerHTML = `
            <div style="font-size: 2.2rem; margin-bottom: 8px;">
                <img src="/public/gestures/alphabet/${letter.toLowerCase()}.svg" 
                     alt="${letter}" style="width: 100%; height: 60px; object-fit: contain;">
            </div>
            <div class="letter">${letter}</div>
            <div class="instruction">Gestur huruf ${letter}</div>
        `;
        container.appendChild(card);
    });
}

/**
 * Utility functions
 */

function updateConfidenceBarEnhanced(confidence) {
    const fillGesture = document.getElementById('confidence-fill-gesture');
    const percentGesture = document.getElementById('confidence-gesture');
    
    if (fillGesture) {
        fillGesture.style.width = `${confidence}%`;
    }
    if (percentGesture) {
        percentGesture.innerText = `${Math.round(confidence)}%`;
    }
}

function addToHistoryEnhanced(mode, result) {
    // Implementation untuk menambah ke history
    const historyContainer = document.getElementById(`detection-history-${mode}`);
    if (!historyContainer) return;

    const history = historyContainer.querySelectorAll('.output-card');
    
    if (history.length === 0) {
        historyContainer.innerHTML = '';
    }

    const newCard = document.createElement('div');
    newCard.className = 'output-card';
    newCard.innerHTML = `
        <div>
            <div class="output-label">Deteksi</div>
            <div class="output-value">${result}</div>
        </div>
        <div class="output-time">${new Date().toLocaleTimeString()}</div>
    `;

    historyContainer.insertBefore(newCard, historyContainer.firstChild);

    // Keep only last 5
    while (historyContainer.querySelectorAll('.output-card').length > 5) {
        historyContainer.removeChild(historyContainer.lastChild);
    }
}

function speakText(text) {
    if (!text || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'id-ID';
    utterance.rate = 0.9;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    window.speechSynthesis.speak(utterance);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    
    toast.innerText = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 2500);
}

function addDetectionStat(gesture) {
    const stats = loadStatsFromStorage();
    stats.totalDetections = (stats.totalDetections || 0) + 1;
    if (gesture) {
        stats.gestureProgress[gesture] = (stats.gestureProgress[gesture] || 0) + 1;
    }
    saveStatsToStorage(stats);
    updateMiniStats();
}

function loadStatsFromStorage() {
    const stored = localStorage.getItem('gestureStats');
    if (!stored) {
        return {
            totalDetections: 0,
            successfulDetections: 0,
            sessionTime: 0,
            gestureProgress: {}
        };
    }
    return JSON.parse(stored);
}

function saveStatsToStorage(stats) {
    localStorage.setItem('gestureStats', JSON.stringify(stats));
}

function updateMiniStats() {
    const stats = loadStatsFromStorage();
    const miniCount = document.getElementById('mini-count');
    if (miniCount) {
        miniCount.innerText = stats.totalDetections || 0;
    }
}

function showDetectionFeedback(text, confidence) {
    // Optional: show visual feedback untuk successful detection
    const feedbackEl = document.getElementById('detection-feedback');
    if (feedbackEl && confidence > 80) {
        // Show success animation if needed
    }
}

export { displayService };
