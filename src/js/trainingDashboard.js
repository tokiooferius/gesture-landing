/**
 * Training Dashboard UI Component
 * Display lessons, progress, achievements, and statistics
 */

export function createTrainingDashboard(trainingMode) {
    const stats = trainingMode.getStats();
    const achievements = trainingMode.getAchievements();
    const recommendation = trainingMode.getRecommendation();

    return `
        <!-- Training Dashboard -->
        <div class="training-dashboard" style="background: linear-gradient(135deg, #E0E7FF 0%, #F0F9FF 100%); padding: 25px; border-radius: 14px; margin-bottom: 20px;">
            
            <!-- Header with streak -->
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <div>
                    <h2 style="color: #1E40AF; margin: 0 0 5px;">📚 Duolingo Mode - Training</h2>
                    <p style="color: #64748B; margin: 0;">${recommendation}</p>
                </div>
                <div style="text-align: right;">
                    <div style="font-size: 2.5rem;">🔥</div>
                    <div style="font-size: 1.8rem; font-weight: 700; color: #EF4444;">${stats.currentStreak}</div>
                    <div style="font-size: 0.85rem; color: #64748B;">Streak</div>
                </div>
            </div>

            <!-- Stats Grid -->
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px; margin-bottom: 20px;">
                <div style="background: white; padding: 15px; border-radius: 10px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                    <div style="font-size: 0.75rem; color: #64748B; text-transform: uppercase; font-weight: 600; margin-bottom: 5px;">Score</div>
                    <div style="font-size: 1.8rem; font-weight: 700; color: #2563EB;">${stats.totalScore}</div>
                </div>
                <div style="background: white; padding: 15px; border-radius: 10px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                    <div style="font-size: 0.75rem; color: #64748B; text-transform: uppercase; font-weight: 600; margin-bottom: 5px;">Accuracy</div>
                    <div style="font-size: 1.8rem; font-weight: 700; color: #10B981;">${stats.accuracy}%</div>
                </div>
                <div style="background: white; padding: 15px; border-radius: 10px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                    <div style="font-size: 0.75rem; color: #64748B; text-transform: uppercase; font-weight: 600; margin-bottom: 5px;">Lessons</div>
                    <div style="font-size: 1.8rem; font-weight: 700; color: #D97706;">${stats.lessonsCompleted}/${stats.totalLessons}</div>
                </div>
                <div style="background: white; padding: 15px; border-radius: 10px; text-align: center; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                    <div style="font-size: 0.75rem; color: #64748B; text-transform: uppercase; font-weight: 600; margin-bottom: 5px;">Next</div>
                    <div style="font-size: 1.8rem; font-weight: 700; color: #EC4899;">${stats.nextMilestone}</div>
                </div>
            </div>

            <!-- Progress Bar -->
            <div style="margin-bottom: 20px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                    <span style="font-weight: 600; color: #1E293B;">Lesson Progress</span>
                    <span style="font-weight: 600; color: #2563EB;">${stats.lessonsCompleted}/${stats.totalLessons}</span>
                </div>
                <div style="width: 100%; height: 10px; background: #E2E8F0; border-radius: 5px; overflow: hidden;">
                    <div style="height: 100%; background: linear-gradient(90deg, #2563EB 0%, #10B981 100%); width: ${(stats.lessonsCompleted / stats.totalLessons * 100)}%; transition: width 0.3s ease;"></div>
                </div>
            </div>

            <!-- Achievements -->
            ${achievements.length > 0 ? `
                <div style="margin-top: 15px;">
                    <h3 style="color: #1E293B; margin: 0 0 12px; font-size: 0.95rem; text-transform: uppercase; letter-spacing: 0.5px;">🏆 Achievements (${achievements.length})</h3>
                    <div style="display: flex; gap: 8px; flex-wrap: wrap;">
                        ${achievements.map(a => `
                            <div style="background: white; padding: 10px 14px; border-radius: 8px; display: flex; align-items: center; gap: 6px; box-shadow: 0 2px 8px rgba(0,0,0,0.08);">
                                <span style="font-size: 1.2rem;">${a.icon}</span>
                                <span style="font-weight: 600; font-size: 0.85rem; color: #1E293B;">${a.name}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
}

/**
 * Create lesson cards
 */
export function createLessonCards(trainingMode, onSelectLesson) {
    const lessons = trainingMode.getLessons();

    return `
        <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 15px; margin-top: 20px;">
            ${lessons.map((lesson, idx) => {
                const isCompleted = trainingMode.isLessonCompleted(lesson.id);
                const isLocked = idx > 0 && !trainingMode.isLessonCompleted(lessons[idx - 1].id);
                
                return `
                    <div class="lesson-card" style="
                        background: ${isCompleted ? 'linear-gradient(135deg, #DCFCE7 0%, #E8F5E9 100%)' : 'linear-gradient(135deg, #F0F9FF 0%, #E0E7FF 100%)'};
                        border: 2px solid ${isCompleted ? '#059669' : '#2563EB'};
                        padding: 18px;
                        border-radius: 12px;
                        cursor: ${isLocked ? 'not-allowed' : 'pointer'};
                        transition: all 0.3s;
                        opacity: ${isLocked ? 0.6 : 1};
                        pointer-events: ${isLocked ? 'none' : 'auto'};
                    "
                    ${!isLocked ? `onclick="this.dispatchEvent(new CustomEvent('selectLesson', {detail: ${lesson.id}}))"` : ''}>
                        
                        <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 10px;">
                            <h3 style="color: #1E293B; margin: 0; font-size: 1rem;">${lesson.name}</h3>
                            ${isCompleted ? '<span style="font-size: 1.3rem;">✅</span>' : isLocked ? '<span style="font-size: 1.3rem;">🔒</span>' : '<span style="font-size: 1.3rem;">📖</span>'}
                        </div>
                        
                        <p style="color: #64748B; font-size: 0.9rem; margin: 8px 0;">${lesson.description}</p>
                        
                        <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 12px; padding-top: 10px; border-top: 1px solid rgba(0,0,0,0.1);">
                            <div>
                                <span style="font-size: 0.85rem; color: #64748B;">
                                    ${lesson.gestures.length} gestures • ${lesson.duration} min
                                </span>
                            </div>
                            <span style="
                                padding: 4px 8px;
                                border-radius: 4px;
                                font-size: 0.75rem;
                                font-weight: 600;
                                ${lesson.difficulty === 'easy' ? 'background: #DCFCE7; color: #059669;' : 
                                  lesson.difficulty === 'medium' ? 'background: #FEF3C7; color: #D97706;' : 
                                  'background: #FEE2E2; color: #DC2626;'}
                            ">${lesson.difficulty.toUpperCase()}</span>
                        </div>
                    </div>
                `;
            }).join('')}
        </div>
    `;
}

export default { createTrainingDashboard, createLessonCards };
