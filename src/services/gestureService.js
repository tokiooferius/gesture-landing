/**
 * Gesture Detection Service - GestureFlow
 * Handle MediaPipe gesture detection & classification
 */

import { GestureUtils, MathUtils } from '../utils/helpers.js';
import { getGestureByName } from '../data/gestureLibrary.js';

export class GestureDetectionService {
    constructor() {
        this.hands = null;
        this.videoElement = null;
        this.canvasElement = null;
        this.canvasCtx = null;
        this.isInitialized = false;
        this.isDetecting = false;
        this.detectionCallback = null;
        this.landmarkCallback = null;
        this.modelReady = false;
        this.lastDetection = null;
    }

    /**
     * Initialize MediaPipe Hands v0.4 & Browser Camera
     */
    async initialize(videoElement, canvasElement) {
        try {
            console.log('⏳ Initializing camera & MediaPipe Hands...');
            this.videoElement = videoElement;
            this.canvasElement = canvasElement;
            this.canvasCtx = canvasElement.getContext('2d');

            // Step 1: Initialize browser camera
            console.log('📹 Requesting camera access...');
            const stream = await navigator.mediaDevices.getUserMedia({
                video: { 
                    width: { ideal: 640 },
                    height: { ideal: 480 },
                    facingMode: 'user'
                },
                audio: false
            });

            videoElement.srcObject = stream;
            
            // Wait for video to be ready
            await new Promise(resolve => {
                videoElement.onloadedmetadata = () => {
                    videoElement.play();
                    resolve();
                };
            });

            console.log('✅ Camera initialized');

            // Step 2: Initialize MediaPipe Hands
            console.log('⏳ Loading MediaPipe Hands model...');
            
            // Verify MediaPipe is loaded from CDN
            if (typeof Hands === 'undefined') {
                throw new Error('MediaPipe Hands not loaded from CDN');
            }

            this.hands = new Hands({
                locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.4/${file}`
            });

            this.hands.setOptions({
                maxNumHands: 1,
                modelComplexity: 1,
                minDetectionConfidence: 0.5,
                minTrackingConfidence: 0.5
            });

            // Set results handler
            this.hands.onResults(this.onResults.bind(this));

            this.modelReady = true;
            this.isInitialized = true;
            
            console.log('✅ MediaPipe Hands initialized successfully');
            return true;
            
        } catch (error) {
            console.error('❌ Failed to initialize camera & MediaPipe:', error);
            console.error('Error details:', error.name, error.message);
            return false;
        }
    }

    /**
     * Start detection
     */
    async startDetection() {
        try {
            if (!this.isInitialized) {
                console.error('Service not initialized');
                return false;
            }

            console.log('▶ Starting gesture detection...');
            this.isDetecting = true;
            
            // Start video element
            if (this.videoElement && this.videoElement.paused) {
                await this.videoElement.play();
            }

            // Start detection loop
            this.detectionLoop();
            
            console.log('✅ Gesture detection started');
            return true;
            
        } catch (error) {
            console.error('❌ Failed to start detection:', error);
            return false;
        }
    }

    /**
     * Detection loop - send frames to MediaPipe
     */
    detectionLoop() {
        if (!this.isDetecting) return;

        try {
            // Check if video is ready for processing
            if (this.modelReady && this.hands && 
                this.videoElement && 
                this.videoElement.readyState >= 3 && // HAVE_FUTURE_DATA or better
                this.videoElement.srcObject &&
                typeof this.hands.send === 'function') {
                
                this.hands.send({ image: this.videoElement });
            }
        } catch (err) {
            console.debug('Detection frame error:', err.message);
        }

        requestAnimationFrame(() => this.detectionLoop());
    }

    /**
     * Handle MediaPipe results
     */
    onResults(results) {
        // Draw canvas
        this.drawCanvas(results);

        // Process hand landmarks
        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            const landmarks = results.multiHandLandmarks[0];
            const handedness = results.multiHandedness[0]?.label || 'Right';
            
            // Classify gesture from landmarks
            const gesture = this.classifyGesture(landmarks);
            
            if (gesture && gesture.name !== 'Unknown') {
                this.lastDetection = {
                    gesture: gesture.name,
                    emoji: gesture.emoji,
                    translation: gesture.translation,
                    confidence: gesture.confidence,
                    landmarks: landmarks,
                    handedness: handedness
                };

                // Trigger callback
                if (this.detectionCallback) {
                    this.detectionCallback(this.lastDetection);
                }
            }

            // Trigger landmark callback
            if (this.landmarkCallback) {
                this.landmarkCallback({
                    landmarks: landmarks,
                    gesture: gesture,
                    handedness: handedness
                });
            }
        }
    }

    /**
     * Draw canvas with hand skeleton
     */
    drawCanvas(results) {
        if (!this.canvasElement || !this.canvasCtx) return;

        // Sync canvas size with video
        if (this.videoElement) {
            this.canvasElement.width = this.videoElement.videoWidth || 640;
            this.canvasElement.height = this.videoElement.videoHeight || 480;
        }

        this.canvasCtx.save();
        this.canvasCtx.clearRect(0, 0, this.canvasElement.width, this.canvasElement.height);

        // Draw hand skeleton if landmarks exist
        if (results.multiHandLandmarks && results.multiHandLandmarks.length > 0) {
            for (const landmarks of results.multiHandLandmarks) {
                // Draw connectors (green lines)
                if (typeof drawConnectors === 'function' && typeof HAND_CONNECTIONS !== 'undefined') {
                    drawConnectors(this.canvasCtx, landmarks, HAND_CONNECTIONS, {
                        color: '#00FF00',
                        lineWidth: 3
                    });
                }
                // Draw landmarks (red dots)
                if (typeof drawLandmarks === 'function') {
                    drawLandmarks(this.canvasCtx, landmarks, {
                        color: '#FF0000',
                        lineWidth: 1,
                        radius: 3
                    });
                }
            }
        }

        this.canvasCtx.restore();
    }

    /**
     * Classify gesture from landmarks
     */
    classifyGesture(landmarks) {
        try {
            if (!landmarks || landmarks.length < 21) {
                return { name: 'Unknown', emoji: '❓', translation: 'Unknown', confidence: 0 };
            }

            // Extract key points
            const thumbTip = landmarks[4];
            const indexTip = landmarks[8];
            const middleTip = landmarks[12];
            const ringTip = landmarks[16];
            const pinkyTip = landmarks[20];
            const palmBase = landmarks[0];

            // Calculate distances
            const indexOpen = this.distance(palmBase, indexTip) > 0.3;
            const middleOpen = this.distance(palmBase, middleTip) > 0.3;
            const ringOpen = this.distance(palmBase, ringTip) > 0.3;
            const pinkyOpen = this.distance(palmBase, pinkyTip) > 0.3;
            const thumbOpen = this.distance(landmarks[2], thumbTip) > 0.1;

            // Basic gesture classification
            let gestureName = 'Unknown';
            let confidence = 0.7;

            if (!indexOpen && !middleOpen && !ringOpen && !pinkyOpen) {
                if (thumbOpen) {
                    gestureName = 'Thumb Up';
                } else {
                    gestureName = 'Fist';
                }
            } else if (indexOpen && !middleOpen && !ringOpen && !pinkyOpen) {
                gestureName = 'Index Finger';
            } else if (indexOpen && middleOpen && !ringOpen && !pinkyOpen) {
                gestureName = 'Victory';
            } else if (indexOpen && middleOpen && ringOpen && pinkyOpen) {
                gestureName = 'All Open';
            }

            // Get gesture data from library
            const gestureData = getGestureByName(gestureName) || {
                name: gestureName,
                emoji: '👆',
                translation: gestureName,
                description: 'Custom gesture'
            };

            return {
                name: gestureName,
                emoji: gestureData.emoji,
                translation: gestureData.translation,
                description: gestureData.description,
                confidence: confidence
            };

        } catch (error) {
            console.error('Error classifying gesture:', error);
            return { name: 'Unknown', emoji: '❓', translation: 'Unknown', confidence: 0 };
        }
    }

    /**
     * Calculate distance between two points
     */
    distance(p1, p2) {
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    /**
     * Stop detection
     */
    stopDetection() {
        this.isDetecting = false;
        
        // Stop camera stream
        if (this.videoElement && this.videoElement.srcObject) {
            const stream = this.videoElement.srcObject;
            stream.getTracks().forEach(track => track.stop());
            this.videoElement.srcObject = null;
        }
        
        console.log('⏹ Gesture detection stopped');
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
}

export default GestureDetectionService;
