/**
 * Storage Service - GestureFlow
 * Handle all data persistence
 */

import { StorageManager, TimeUtils } from '../utils/helpers.js';

export class StorageService {
    constructor() {
        this.prefix = 'gestureflow_';
        this.initializeDefaults();
    }

    /**
     * Initialize default data structures
     */
    initializeDefaults() {
        if (!this.getStats()) {
            this.setStats({
                totalDetections: 0,
                successfulDetections: 0,
                sessionTime: 0,
                totalSessions: 0,
                accuracy: 0,
                gestureProgress: {},
                achievements: [],
                xp: 0,
                level: 1,
                streak: 0,
                lastSession: null
            });
        }

        if (!this.getGestureLibrary()) {
            this.setGestureLibrary({
                gestures: {},
                totalSamples: 0,
                trained: false
            });
        }

        if (!this.getSettings()) {
            this.setSettings({
                theme: 'dark',
                language: 'id',
                speechRate: 1,
                speechVolume: 1,
                soundEnabled: true,
                vibrationEnabled: true,
                cameraFPS: 30,
                detectionThreshold: 0.7,
                autoSaveEnabled: true,
                darkMode: true
            });
        }
    }

    // ======== STATS ========
    /**
     * Get statistics
     */
    getStats() {
        return StorageManager.get(`${this.prefix}stats`);
    }

    /**
     * Set statistics
     */
    setStats(stats) {
        return StorageManager.set(`${this.prefix}stats`, stats);
    }

    /**
     * Update stats
     */
    updateStats(updates) {
        const stats = this.getStats();
        const updated = { ...stats, ...updates };
        return this.setStats(updated);
    }

    /**
     * Record detection dengan accuracy tracking
     * @param {string} gesture - Nama gesture
     * @param {number} confidence - Skor confidence (0-1)
     * @param {boolean} manual - Manual deteksi atau auto
     */
    recordDetection(gesture, confidence = 0.8, manual = true) {
        const stats = this.getStats();
        stats.totalDetections++;
        
        // Akurat jika confidence >= 80% (0.80)
        const isAccurate = confidence >= 0.80;
        if (isAccurate) {
            stats.successfulDetections++;
        }
        
        // Recalculate accuracy
        stats.accuracy = stats.totalDetections > 0 
            ? (stats.successfulDetections / stats.totalDetections * 100).toFixed(2)
            : 0;

        // Track gesture progress
        if (!stats.gestureProgress[gesture]) {
            stats.gestureProgress[gesture] = 0;
        }
        stats.gestureProgress[gesture]++;

        this.setStats(stats);
        return { stats, isAccurate };
    }

    /**
     * Add achievement
     */
    addAchievement(achievementId) {
        const stats = this.getStats();
        if (!stats.achievements.includes(achievementId)) {
            stats.achievements.push(achievementId);
            stats.xp += 50;
            this.setStats(stats);
            return true;
        }
        return false;
    }

    /**
     * Add XP
     */
    addXP(amount) {
        const stats = this.getStats();
        stats.xp += amount;
        
        // Level up every 1000 XP
        const newLevel = Math.floor(stats.xp / 1000) + 1;
        if (newLevel > stats.level) {
            stats.level = newLevel;
        }

        this.setStats(stats);
        return stats;
    }

    // ======== GESTURE LIBRARY ========
    /**
     * Get gesture library
     */
    getGestureLibrary() {
        return StorageManager.get(`${this.prefix}gesture_library`);
    }

    /**
     * Set gesture library
     */
    setGestureLibrary(library) {
        return StorageManager.set(`${this.prefix}gesture_library`, library);
    }

    /**
     * Add gesture sample
     */
    addGestureSample(gestureName, landmarks) {
        const library = this.getGestureLibrary();
        
        if (!library.gestures[gestureName]) {
            library.gestures[gestureName] = {
                samples: [],
                createdAt: TimeUtils.now(),
                updatedAt: TimeUtils.now()
            };
        }

        library.gestures[gestureName].samples.push({
            landmarks: landmarks,
            timestamp: TimeUtils.now()
        });

        library.totalSamples++;
        library.gestures[gestureName].updatedAt = TimeUtils.now();

        this.setGestureLibrary(library);
        return library;
    }

    /**
     * Get gesture samples
     */
    getGestureSamples(gestureName) {
        const library = this.getGestureLibrary();
        return library.gestures[gestureName]?.samples || [];
    }

    // ======== SETTINGS ========
    /**
     * Get settings
     */
    getSettings() {
        return StorageManager.get(`${this.prefix}settings`);
    }

    /**
     * Set settings
     */
    setSettings(settings) {
        return StorageManager.set(`${this.prefix}settings`, settings);
    }

    /**
     * Update setting
     */
    updateSetting(key, value) {
        const settings = this.getSettings();
        settings[key] = value;
        return this.setSettings(settings);
    }

    // ======== HISTORY ========
    /**
     * Get detection history
     */
    getHistory(limit = 100) {
        const history = StorageManager.get(`${this.prefix}history`, []);
        return history.slice(-limit);
    }

    /**
     * Add to history
     */
    addToHistory(detection) {
        const history = this.getHistory(1000);
        history.push({
            gesture: detection.gesture,
            confidence: detection.confidence,
            timestamp: TimeUtils.now(),
            handedness: detection.handedness
        });
        StorageManager.set(`${this.prefix}history`, history);
        return history;
    }

    /**
     * Clear history
     */
    clearHistory() {
        StorageManager.set(`${this.prefix}history`, []);
    }

    // ======== SESSION ========
    /**
     * Get current session
     */
    getCurrentSession() {
        return StorageManager.get(`${this.prefix}current_session`);
    }

    /**
     * Start new session
     */
    startSession() {
        const session = {
            id: Date.now().toString(),
            startTime: TimeUtils.now(),
            endTime: null,
            detections: 0,
            accuracy: 0
        };
        StorageManager.set(`${this.prefix}current_session`, session);
        return session;
    }

    /**
     * End session
     */
    endSession() {
        const session = this.getCurrentSession();
        if (session) {
            session.endTime = TimeUtils.now();
            session.duration = (session.endTime - session.startTime) / 1000; // in seconds
            
            // Save to sessions history
            const sessions = StorageManager.get(`${this.prefix}sessions`, []);
            sessions.push(session);
            StorageManager.set(`${this.prefix}sessions`, sessions.slice(-50)); // Keep last 50 sessions
            
            // Update stats
            const stats = this.getStats();
            stats.sessionTime += session.duration;
            stats.totalSessions++;
            stats.lastSession = session.startTime;
            this.setStats(stats);

            StorageManager.remove(`${this.prefix}current_session`);
            return session;
        }
        return null;
    }

    /**
     * Get sessions history
     */
    getSessions(limit = 50) {
        const sessions = StorageManager.get(`${this.prefix}sessions`, []);
        return sessions.slice(-limit);
    }

    // ======== TRANSLATION HISTORY ========
    /**
     * Get translation history
     */
    getTranslationHistory(limit = 50) {
        return StorageManager.get(`${this.prefix}translation_history`, []).slice(-limit);
    }

    /**
     * Add translation to history
     */
    addTranslation(source, target, type = 'gesture_to_text') {
        const history = this.getTranslationHistory(1000);
        history.push({
            source,
            target,
            type,
            timestamp: TimeUtils.now()
        });
        StorageManager.set(`${this.prefix}translation_history`, history);
        return history;
    }

    // ======== USER PROGRESS ========
    /**
     * Get progress for specific gesture
     */
    getGestureProgress(gestureName) {
        const stats = this.getStats();
        return stats.gestureProgress[gestureName] || 0;
    }

    /**
     * Get all gesture progress
     */
    getAllGestureProgress() {
        const stats = this.getStats();
        return stats.gestureProgress;
    }

    /**
     * Get achievements
     */
    getAchievements() {
        const stats = this.getStats();
        return stats.achievements;
    }

    /**
     * Get level and XP
     */
    getLevelInfo() {
        const stats = this.getStats();
        const xpToNextLevel = ((stats.level) * 1000) - stats.xp;
        return {
            level: stats.level,
            xp: stats.xp,
            xpToNextLevel: Math.max(0, xpToNextLevel)
        };
    }

    // ======== EXPORT & IMPORT ========
    /**
     * Export all data as JSON
     */
    exportData() {
        return {
            stats: this.getStats(),
            gestureLibrary: this.getGestureLibrary(),
            settings: this.getSettings(),
            history: this.getHistory(),
            sessions: this.getSessions(),
            translationHistory: this.getTranslationHistory(),
            exportDate: TimeUtils.now()
        };
    }

    /**
     * Import data from JSON
     */
    importData(data) {
        try {
            if (data.stats) this.setStats(data.stats);
            if (data.gestureLibrary) this.setGestureLibrary(data.gestureLibrary);
            if (data.settings) this.setSettings(data.settings);
            if (data.history) StorageManager.set(`${this.prefix}history`, data.history);
            if (data.sessions) StorageManager.set(`${this.prefix}sessions`, data.sessions);
            if (data.translationHistory) StorageManager.set(`${this.prefix}translation_history`, data.translationHistory);
            return true;
        } catch (error) {
            console.error('Import error:', error);
            return false;
        }
    }

    /**
     * Reset all data
     */
    resetAll() {
        const keys = Object.keys(localStorage).filter(k => k.startsWith(this.prefix));
        keys.forEach(key => localStorage.removeItem(key));
        this.initializeDefaults();
    }
}

export default StorageService;
