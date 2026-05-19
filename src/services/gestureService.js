/**
 * Gesture Detection Service - GestureFlow
 * Handle MediaPipe gesture detection & classification
 */

import { GestureUtils, MathUtils } from '../utils/helpers.js';

export class GestureDetectionService {
    constructor() {
        this.hands = null;
        this.camera = null;
        this.canvasElement = null;
        this.canvasCtx = null;
        this.isInitialized = false;
        this.isDetecting = false;
        this.detectionCallback = null;
        this.landmarkCallback = null;
        
        this.gestureBuffer = [];
        this.bufferSize = 10;
        this.detectionThreshold = 0.7;
    }

    /**
     * Initialize MediaPipe
     */
    async initialize(videoElement, canvasElement) {
        try {
            const results = await Promise.all([
                fetch('/models/gesture-model.json'),
                fetch('/models/gesture-landmarks.json')
            ]);
            
            this.hands = new Hands({
                locateFile: (file) => {
                    return `/models/mediapipe/${file}`;
                }
            });

            this.hands.setOptions({
                maxNumHands: 2,
                modelComplexity: 1,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5
            });

            this.hands.onResults(this.onResults.bind(this));

            this.canvasElement = canvasElement;
            this.canvasCtx = canvasElement.getContext('2d');

            const camera = new Camera(videoElement, {
                onFrame: async () => {
                    if (this.isDetecting) {
                        await this.hands.send({image: videoElement});
                    }
                },
                width: 1280,
                height: 720
            });

            this.camera = camera;
            this.isInitialized = true;
            return true;
        } catch (error) {
            console.error('Failed to initialize MediaPipe:', error);
            return false;
        }
    }

    /**
     * Handle MediaPipe results
     */
    onResults(results) {
        this.drawCanvas(results);
        
        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            results.multiHandLandmarks.forEach((landmarks, index) => {
                const gesture = this.classifyGesture(landmarks);
                const confidence = gesture.confidence || 0;

                // Add to buffer
                this.gestureBuffer.push({
                    gesture: gesture.name,
                    confidence: confidence,
                    landmarks: landmarks,
                    handedness: results.multiHandedness[index].label
                });

                if (this.gestureBuffer.length > this.bufferSize) {
                    this.gestureBuffer.shift();
                }

                // Get most common gesture from buffer
                const smoothedGesture = this.getSmoothGesture();
                
                if (this.landmarkCallback) {
                    this.landmarkCallback({
                        landmarks: landmarks,
                        gesture: smoothedGesture,
                        handedness: results.multiHandedness[index].label,
                        rawGesture: gesture
                    });
                }

                if (this.detectionCallback && smoothedGesture.confidence > this.detectionThreshold) {
                    this.detectionCallback({
                        gesture: smoothedGesture.name,
                        confidence: smoothedGesture.confidence,
                        handedness: results.multiHandedness[index].label,
                        timestamp: Date.now()
                    });
                }
            });
        } else {
            // No hand detected
            if (this.landmarkCallback) {
                this.landmarkCallback(null);
            }
        }
    }

    /**
     * Draw landmarks on canvas
     */
    drawCanvas(results) {
        if (!this.canvasCtx) return;

        this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

        if (results.multiHandLandmarks) {
            results.multiHandLandmarks.forEach((landmarks) => {
                // Draw connections
                this.drawConnectors(landmarks);
                // Draw landmarks
                this.drawLandmarks(landmarks);
            });
        }
    }

    /**
     * Draw hand connections dengan neon effect futuristik
     */
    drawConnectors(landmarks) {
        const connections = [
            [0, 1], [1, 2], [2, 3], [3, 4], // Thumb
            [0, 5], [5, 6], [6, 7], [7, 8], // Index
            [0, 9], [9, 10], [10, 11], [11, 12], // Middle
            [0, 13], [13, 14], [14, 15], [15, 16], // Ring
            [0, 17], [17, 18], [18, 19], [19, 20] // Pinky
        ];

        // Warna neon cyan dengan glow effect
        this.canvasCtx.strokeStyle = '#00F0FF';
        this.canvasCtx.lineWidth = 3;
        this.canvasCtx.lineCap = 'round';
        this.canvasCtx.lineJoin = 'round';
        
        // Glow shadow effect
        this.canvasCtx.shadowColor = 'rgba(0, 240, 255, 0.8)';
        this.canvasCtx.shadowBlur = 10;

        connections.forEach(([start, end]) => {
            const startPoint = landmarks[start];
            const endPoint = landmarks[end];
            
            this.canvasCtx.beginPath();
            this.canvasCtx.moveTo(
                startPoint.x * this.canvasElement.width,
                startPoint.y * this.canvasElement.height
            );
            this.canvasCtx.lineTo(
                endPoint.x * this.canvasElement.width,
                endPoint.y * this.canvasElement.height
            );
            this.canvasCtx.stroke();
        });
        
        // Reset shadow
        this.canvasCtx.shadowColor = 'transparent';
        this.canvasCtx.shadowBlur = 0;
    }

    /**
     * Draw landmarks dengan warna neon dinamis
     */
    drawLandmarks(landmarks) {
        landmarks.forEach((point, index) => {
            // Warna neon berbeda untuk wrist, finger tips, dan joints
            const isFingerTip = [4, 8, 12, 16, 20].includes(index);
            const isWrist = index === 0;
            
            if (isWrist) {
                this.canvasCtx.fillStyle = '#FF00FF'; // Magenta untuk wrist
                this.canvasCtx.shadowColor = 'rgba(255, 0, 255, 0.8)';
            } else if (isFingerTip) {
                this.canvasCtx.fillStyle = '#FF6B00'; // Oranye untuk finger tips
                this.canvasCtx.shadowColor = 'rgba(255, 107, 0, 0.8)';
            } else {
                this.canvasCtx.fillStyle = '#ADFF2F'; // Lime untuk joints
                this.canvasCtx.shadowColor = 'rgba(173, 255, 47, 0.6)';
            }
            
            this.canvasCtx.shadowBlur = 8;
            
            const radius = isWrist ? 5 : 4;
            
            this.canvasCtx.beginPath();
            this.canvasCtx.arc(
                point.x * this.canvasElement.width,
                point.y * this.canvasElement.height,
                radius,
                0,
                2 * Math.PI
            );
            this.canvasCtx.fill();
            
            // Outer ring effect
            this.canvasCtx.strokeStyle = this.canvasCtx.fillStyle;
            this.canvasCtx.lineWidth = 1.5;
            this.canvasCtx.stroke();
        });
        
        this.canvasCtx.shadowColor = 'transparent';
        this.canvasCtx.shadowBlur = 0;
    }

    /**
     * Classify gesture from landmarks
     */
    classifyGesture(landmarks) {
        if (!landmarks || landmarks.length < 21) {
            return { name: 'Unknown', confidence: 0 };
        }

        // Normalize landmarks
        const normalized = GestureUtils.normalizeLandmarks(landmarks);

        // Get feature vector
        const features = this.extractFeatures(normalized);

        // Simple classification logic
        return this.simpleClassify(features, normalized);
    }

    /**
     * Extract features from landmarks
     */
    extractFeatures(landmarks) {
        return {
            thumbOpen: landmarks[4].y < landmarks[2].y,
            indexOpen: landmarks[8].y < landmarks[6].y,
            middleOpen: landmarks[12].y < landmarks[10].y,
            ringOpen: landmarks[16].y < landmarks[14].y,
            pinkyOpen: landmarks[20].y < landmarks[18].y,
            
            thumbIndex: GestureUtils.distance(landmarks[4], landmarks[8]),
            indexMiddle: GestureUtils.distance(landmarks[8], landmarks[12]),
            
            palmSize: GestureUtils.distance(landmarks[0], landmarks[9]),
            handOpenness: GestureUtils.isHandOpen(landmarks) ? 1 : 0
        };
    }

    /**
     * Simple gesture classification
     */
    simpleClassify(features, landmarks) {
        const openCount = [
            features.thumbOpen,
            features.indexOpen,
            features.middleOpen,
            features.ringOpen,
            features.pinkyOpen
        ].filter(Boolean).length;

        if (openCount === 5) {
            return { name: 'All Open', confidence: 0.95 };
        } else if (openCount === 0) {
            return { name: 'Fist', confidence: 0.95 };
        } else if (features.indexOpen && features.middleOpen && !features.ringOpen && !features.pinkyOpen) {
            return { name: 'Peace', confidence: 0.9 };
        } else if (features.indexOpen && !features.middleOpen && features.thumbOpen) {
            return { name: 'OK', confidence: 0.85 };
        } else if (features.indexOpen && !features.middleOpen && !features.ringOpen && !features.pinkyOpen) {
            return { name: 'Pointing Index', confidence: 0.9 };
        } else if (features.pinkyOpen && !features.indexOpen && !features.middleOpen && !features.ringOpen) {
            return { name: 'Pointing Pinky', confidence: 0.9 };
        }

        return { name: 'Unknown', confidence: 0.5 };
    }

    /**
     * Get smoothed gesture from buffer
     */
    getSmoothGesture() {
        if (this.gestureBuffer.length === 0) {
            return { name: 'Unknown', confidence: 0 };
        }

        // Count occurrences
        const gestures = {};
        this.gestureBuffer.forEach(item => {
            if (!gestures[item.gesture]) {
                gestures[item.gesture] = { count: 0, confidence: 0 };
            }
            gestures[item.gesture].count++;
            gestures[item.gesture].confidence += item.confidence;
        });

        // Get most common
        let mostCommon = null;
        let maxCount = 0;

        Object.entries(gestures).forEach(([name, data]) => {
            if (data.count > maxCount) {
                maxCount = data.count;
                mostCommon = {
                    name: name,
                    confidence: data.confidence / data.count
                };
            }
        });

        return mostCommon || { name: 'Unknown', confidence: 0 };
    }

    /**
     * Start detection
     */
    async startDetection() {
        if (!this.isInitialized) return false;
        
        this.isDetecting = true;
        try {
            await this.camera.start();
            return true;
        } catch (error) {
            console.error('Failed to start detection:', error);
            return false;
        }
    }

    /**
     * Stop detection
     */
    async stopDetection() {
        this.isDetecting = false;
        if (this.camera) {
            await this.camera.stop();
        }
    }

    /**
     * Set detection callback
     */
    onDetection(callback) {
        this.detectionCallback = callback;
    }

    /**
     * Set landmark callback
     */
    onLandmark(callback) {
        this.landmarkCallback = callback;
    }

    /**
     * Set detection threshold
     */
    setDetectionThreshold(threshold) {
        this.detectionThreshold = MathUtils.clamp(threshold, 0, 1);
    }

    /**
     * Get gesture history
     */
    getGestureHistory() {
        return this.gestureBuffer.map(item => ({
            gesture: item.gesture,
            confidence: item.confidence,
            handedness: item.handedness
        }));
    }
}

export default GestureDetectionService;
