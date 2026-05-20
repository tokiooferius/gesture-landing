/**
 * Duolingo-Style Training Mode
 * Interactive learning with streak tracking, rewards, and progression
 */

export class TrainingMode {
    constructor() {
        this.currentLesson = 0;
        this.streak = 0;
        this.totalScore = 0;
        this.lessonHistory = [];
        this.difficulty = 'easy'; // easy, medium, hard
        
        this.loadProgress();
    }

    /**
     * Lesson structure
     */
    getLessons() {
        return [
            // Lesson 1: Basic gestures
            {
                id: 1,
                name: 'Dasar - 6 Gestur Penting',
                gestures: ['allOpen', 'ok', 'pointingIndex', 'pointingPinky', 'peace', 'metal'],
                difficulty: 'easy',
                description: 'Pelajari 6 gestur dasar bahasa isyarat',
                duration: 5 // menit
            },
            // Lesson 2: Alphabet A-J
            {
                id: 2,
                name: 'Alfabet - Bagian 1 (A-J)',
                gestures: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'],
                difficulty: 'medium',
                description: 'Kuasai huruf A sampai J dalam bahasa isyarat',
                duration: 10
            },
            // Lesson 3: Alphabet K-T
            {
                id: 3,
                name: 'Alfabet - Bagian 2 (K-T)',
                gestures: ['K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T'],
                difficulty: 'medium',
                description: 'Kuasai huruf K sampai T dalam bahasa isyarat',
                duration: 10
            },
            // Lesson 4: Alphabet U-Z
            {
                id: 4,
                name: 'Alfabet - Bagian 3 (U-Z)',
                gestures: ['U', 'V', 'W', 'X', 'Y', 'Z'],
                difficulty: 'medium',
                description: 'Kuasai huruf U sampai Z dalam bahasa isyarat',
                duration: 8
            },
            // Lesson 5: Numbers 0-9
            {
                id: 5,
                name: 'Angka - 0 sampai 9',
                gestures: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
                difficulty: 'hard',
                description: 'Pelajari cara menunjukkan angka 0-9 dalam bahasa isyarat',
                duration: 10
            },
            // Lesson 6: Common phrases
            {
                id: 6,
                name: 'Frasa Umum',
                gestures: ['Halo', 'Terima kasih', 'Maaf', 'Ya', 'Tidak'],
                difficulty: 'hard',
                description: 'Belajar frasa-frasa penting dalam percakapan sehari-hari',
                duration: 8
            }
        ];
    }

    /**
     * Get current lesson
     */
    getCurrentLesson() {
        return this.getLessons()[this.currentLesson] || null;
    }

    /**
     * Start training with a specific lesson
     */
    startLesson(lessonId) {
        const lesson = this.getLessons().find(l => l.id === lessonId);
        if (lesson) {
            this.currentLesson = lessonId - 1;
            this.streak = 0; // Reset streak untuk lesson baru
            return {
                success: true,
                lesson: lesson,
                targetGestures: lesson.gestures,
                message: `Memulai: ${lesson.name}`
            };
        }
        return { success: false, message: 'Lesson tidak ditemukan' };
    }

    /**
     * Record correct gesture detection
     */
    recordCorrectDetection(gesture) {
        this.streak++;
        this.totalScore += (10 * this.getStreakBonus()); // 10 poin base + bonus
        this.lessonHistory.push({
            timestamp: Date.now(),
            gesture: gesture,
            score: 10 * this.getStreakBonus(),
            streak: this.streak
        });
        
        this.saveProgress();
        
        return {
            streak: this.streak,
            score: 10 * this.getStreakBonus(),
            totalScore: this.totalScore,
            bonus: this.getStreakBonus() > 1 ? `${(this.getStreakBonus() - 1) * 100}% Bonus!` : ''
        };
    }

    /**
     * Reset streak on wrong detection
     */
    recordWrongDetection(expected, got) {
        this.lessonHistory.push({
            timestamp: Date.now(),
            expected: expected,
            got: got,
            correct: false,
            streak: this.streak
        });
        
        this.streak = 0; // Reset streak
        this.saveProgress();
        
        return {
            message: `Oops! Expected: ${expected}, Got: ${got}`,
            streak: 0
        };
    }

    /**
     * Get streak bonus multiplier
     */
    getStreakBonus() {
        if (this.streak >= 10) return 3; // 300% = 30 poin
        if (this.streak >= 5) return 2;  // 200% = 20 poin
        return 1; // 100% = 10 poin
    }

    /**
     * Get next milestone (untuk motivation)
     */
    getNextMilestone() {
        const milestones = [5, 10, 25, 50, 100, 250, 500];
        return milestones.find(m => m > this.streak) || 1000;
    }

    /**
     * Check if lesson completed
     */
    isLessonCompleted(lessonId) {
        const lesson = this.getLessons()[lessonId - 1];
        if (!lesson) return false;

        // Lesson completed jika semua gestur terdeteksi minimal 3x dengan benar
        const gesturesCounted = {};
        this.lessonHistory.forEach(entry => {
            if (entry.correct !== false && lesson.gestures.includes(entry.gesture)) {
                gesturesCounted[entry.gesture] = (gesturesCounted[entry.gesture] || 0) + 1;
            }
        });

        return lesson.gestures.every(g => (gesturesCounted[g] || 0) >= 3);
    }

    /**
     * Get progress stats
     */
    getStats() {
        return {
            totalScore: this.totalScore,
            currentStreak: this.streak,
            nextMilestone: this.getNextMilestone(),
            lessonsCompleted: this.getLessons().filter((_, idx) => this.isLessonCompleted(idx + 1)).length,
            totalLessons: this.getLessons().length,
            accuracy: this.calculateAccuracy()
        };
    }

    /**
     * Calculate accuracy percentage
     */
    calculateAccuracy() {
        if (this.lessonHistory.length === 0) return 0;
        
        const correct = this.lessonHistory.filter(e => e.correct !== false).length;
        return Math.round((correct / this.lessonHistory.length) * 100);
    }

    /**
     * Save progress to localStorage
     */
    saveProgress() {
        const data = {
            streak: this.streak,
            totalScore: this.totalScore,
            currentLesson: this.currentLesson,
            lessonHistory: this.lessonHistory,
            lastUpdated: Date.now()
        };
        localStorage.setItem('trainingProgress', JSON.stringify(data));
    }

    /**
     * Load progress from localStorage
     */
    loadProgress() {
        const data = localStorage.getItem('trainingProgress');
        if (data) {
            const progress = JSON.parse(data);
            this.streak = progress.streak || 0;
            this.totalScore = progress.totalScore || 0;
            this.currentLesson = progress.currentLesson || 0;
            this.lessonHistory = progress.lessonHistory || [];
        }
    }

    /**
     * Get achievements/badges
     */
    getAchievements() {
        const achievements = [];
        
        if (this.totalScore >= 100) achievements.push({ id: 'starter', name: 'Starter', icon: '🌱' });
        if (this.totalScore >= 500) achievements.push({ id: 'learning', name: 'Learning', icon: '📚' });
        if (this.totalScore >= 1000) achievements.push({ id: 'expert', name: 'Expert', icon: '🎓' });
        if (this.streak >= 5) achievements.push({ id: 'flame', name: 'On Fire', icon: '🔥' });
        if (this.streak >= 20) achievements.push({ id: 'champion', name: 'Champion', icon: '🏆' });
        if (this.isLessonCompleted(1)) achievements.push({ id: 'basics', name: 'Basics Mastered', icon: '✅' });
        if (this.getLessons().filter((_, i) => this.isLessonCompleted(i + 1)).length >= 3) {
            achievements.push({ id: 'halfway', name: 'Halfway There', icon: '🎯' });
        }
        
        return achievements;
    }

    /**
     * Get recommendation untuk next lesson
     */
    getRecommendation() {
        const stats = this.getStats();
        
        if (stats.lessonsCompleted === 0) {
            return 'Mulai dengan Dasar - 6 Gestur Penting untuk fondasi yang kuat!';
        } else if (stats.lessonsCompleted < stats.totalLessons) {
            return `Sudah menyelesaikan ${stats.lessonsCompleted}/${stats.totalLessons} lessons. Lanjutkan belajar!`;
        } else {
            return '🎉 Excellent! Semua lesson sudah selesai. Latih lebih lanjut untuk meningkatkan akurasi!';
        }
    }

    /**
     * Reset all progress
     */
    resetProgress() {
        this.currentLesson = 0;
        this.streak = 0;
        this.totalScore = 0;
        this.lessonHistory = [];
        localStorage.removeItem('trainingProgress');
    }
}

export default TrainingMode;
