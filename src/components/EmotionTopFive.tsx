// EmotionTopFive.tsx - 감정 TOP 5 컴포넌트
import { useEffect, useState } from 'react';

interface TopEmotionItem {
  rank: number;
  emotion: string;
  color: string;
  count: number;
  percentage: number;
}

export default function EmotionTopFive() {
  const [topEmotions, setTopEmotions] = useState<TopEmotionItem[]>([]);
  const [totalSessions, setTotalSessions] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchEmotionStats();
  }, []);

  const fetchEmotionStats = async () => {
    try {
      const res = await fetch('/api/user/emotion-stats', {
        credentials: 'include'
      });

      if (res.ok) {
        const data = await res.json();
        if (data.ok) {
          setTopEmotions(data.topEmotions || []);
          setTotalSessions(data.totalSessions || 0);
        }
      }
    } catch (e) {
      console.error('감정 통계 조회 오류:', e);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 16,
        padding: 32,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        textAlign: 'center',
        color: '#9ca3af'
      }}>
        로딩 중...
      </div>
    );
  }

  if (topEmotions.length === 0) {
    return (
      <div style={{
        background: 'rgba(255, 255, 255, 0.95)',
        borderRadius: 16,
        padding: 32,
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
        textAlign: 'center'
      }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📊</div>
        <div style={{ fontSize: 16, color: '#6b7280' }}>
          아직 감정 데이터가 충분하지 않습니다.<br />
          AI와 대화를 나눠보세요!
        </div>
      </div>
    );
  }

  const getMedalEmoji = (rank: number) => {
    switch (rank) {
      case 1: return '🥇';
      case 2: return '🥈';
      case 3: return '🥉';
      default: return `${rank}위`;
    }
  };

  return (
    <div style={{
      background: 'rgba(255, 255, 255, 0.95)',
      borderRadius: 16,
      padding: 32,
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)'
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 24
      }}>
        <h2 style={{
          margin: 0,
          fontSize: 24,
          fontWeight: 800,
          color: '#374151',
          display: 'flex',
          alignItems: 'center',
          gap: 12
        }}>
          <span>🏆</span>
          <span>감정 TOP 5</span>
        </h2>
        <div style={{
          fontSize: 14,
          color: '#6b7280',
          background: '#f3f4f6',
          padding: '8px 16px',
          borderRadius: 8,
          fontWeight: 600
        }}>
          총 {totalSessions}개 대화 분석
        </div>
      </div>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 16
      }}>
        {topEmotions.map((item) => (
          <div
            key={item.rank}
            style={{
              background: `linear-gradient(135deg, ${item.color}20 0%, ${item.color}10 100%)`,
              border: `2px solid ${item.color}40`,
              borderRadius: 12,
              padding: '20px 16px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-4px)';
              e.currentTarget.style.boxShadow = `0 8px 24px ${item.color}30`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* 배경 장식 */}
            <div style={{
              position: 'absolute',
              top: -20,
              right: -20,
              width: 80,
              height: 80,
              background: `${item.color}15`,
              borderRadius: '50%',
              filter: 'blur(20px)'
            }} />

            {/* 순위 뱃지 */}
            <div style={{
              fontSize: 32,
              marginBottom: 12,
              textAlign: 'center'
            }}>
              {getMedalEmoji(item.rank)}
            </div>

            {/* 감정명 */}
            <div style={{
              fontSize: 18,
              fontWeight: 700,
              color: '#374151',
              textAlign: 'center',
              marginBottom: 8
            }}>
              {item.emotion}
            </div>

            {/* 횟수 */}
            <div style={{
              fontSize: 24,
              fontWeight: 800,
              color: item.color,
              textAlign: 'center',
              marginBottom: 4
            }}>
              {item.count}회
            </div>

            {/* 비율 */}
            <div style={{
              fontSize: 14,
              color: '#6b7280',
              textAlign: 'center',
              fontWeight: 600
            }}>
              {item.percentage}%
            </div>

            {/* 프로그레스 바 */}
            <div style={{
              marginTop: 12,
              height: 6,
              background: '#e5e7eb',
              borderRadius: 3,
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${item.percentage}%`,
                height: '100%',
                background: `linear-gradient(90deg, ${item.color} 0%, ${item.color}dd 100%)`,
                transition: 'width 0.5s ease',
                borderRadius: 3
              }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
