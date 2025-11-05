import { useEffect, useState } from 'react';
import './StreakWidget.css';

interface StreakData {
  currentStreak: number;
  longestStreak: number;
  todayCompleted: boolean;
  totalDays: number;
}

export default function StreakWidget() {
  const [streakData, setStreakData] = useState<StreakData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStreak();
  }, []);

  const fetchStreak = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch('http://localhost:7780/api/user/streak', {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (res.ok) {
        const data = await res.json();
        if (data.ok) {
          setStreakData({
            currentStreak: data.currentStreak,
            longestStreak: data.longestStreak,
            todayCompleted: data.todayCompleted,
            totalDays: data.totalDays
          });
        }
      }
    } catch (e) {
      console.error('스트릭 조회 오류:', e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="streak-widget skeleton">
        <div className="streak-icon">🔥</div>
        <div className="streak-info">
          <div className="streak-current">로딩 중...</div>
        </div>
      </div>
    );
  }

  if (!streakData) return null;

  const { currentStreak, longestStreak, todayCompleted } = streakData;

  // 마일스톤 배지
  const milestones = [
    { days: 7, emoji: '🎯', label: '일주일' },
    { days: 30, emoji: '🏆', label: '한 달' },
    { days: 100, emoji: '👑', label: '백일' },
    { days: 365, emoji: '💎', label: '일 년' }
  ];

  const achievedMilestones = milestones.filter(m => currentStreak >= m.days);

  return (
    <div className="streak-widget">
      <div className="streak-header">
        <div className="streak-icon">🔥</div>
        <div className="streak-info">
          <div className="streak-current">
            {currentStreak}일 연속 기록 중!
          </div>
          <div className="streak-status">
            {todayCompleted ? (
              <span className="status-done">✓ 오늘 완료</span>
            ) : (
              <span className="status-pending">오늘 아직 안 함</span>
            )}
          </div>
        </div>
      </div>

      {longestStreak > 0 && (
        <div className="streak-longest">
          <span className="label">최장 기록:</span>
          <span className="value">{longestStreak}일</span>
        </div>
      )}

      {achievedMilestones.length > 0 && (
        <div className="streak-milestones">
          {achievedMilestones.map(m => (
            <div key={m.days} className="milestone-badge" title={`${m.label} 달성!`}>
              {m.emoji}
            </div>
          ))}
        </div>
      )}

      {!todayCompleted && (
        <div className="streak-reminder">
          오늘도 대화를 나눠보세요!
        </div>
      )}
    </div>
  );
}
