// History.tsx - 감정 히스토리 전용 페이지
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import EmotionHistoryChart from '../components/EmotionHistoryChart';
import EmotionInsights from '../components/EmotionInsights';
import EmotionTitle from '../components/EmotionTitle';
import EmotionTopFive from '../components/EmotionTopFive';

const CACHE_KEY = 'emotion_title_cache';

export default function History() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [chartDays, setChartDays] = useState(7);
  const [userTitle, setUserTitle] = useState('');

  // 캐시된 칭호 로드
  useEffect(() => {
    const cached = localStorage.getItem(CACHE_KEY);
    if (cached) {
      try {
        const { title } = JSON.parse(cached);
        setUserTitle(title);
      } catch (e) {
        // 캐시 파싱 오류 시 무시
      }
    }
  }, []);

  // 인증 확인
  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        color: '#9ca3af'
      }}>
        로딩 중...
      </div>
    );
  }

  if (!user) {
    return (
      <div style={{ 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center', 
        height: '100vh',
        gap: 16
      }}>
        <div style={{ fontSize: 48 }}>🔒</div>
        <div style={{ fontSize: 18, fontWeight: 600, color: '#374151' }}>
          로그인이 필요합니다
        </div>
        <button
          onClick={() => navigate('/login')}
          style={{
            padding: '12px 24px',
            background: '#6366f1',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            cursor: 'pointer',
            fontSize: 14,
            fontWeight: 600
          }}
        >
          로그인하러 가기
        </button>
      </div>
    );
  }

  return (
    <div style={{ 
      minHeight: 'calc(100vh - 56px)',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '32px 16px',
      boxSizing: 'border-box'
    }}>
      <div style={{ 
        maxWidth: 1200, 
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: 24
      }}>
        {/* 헤더 */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: 16,
          padding: '24px 32px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div>
            <h1 style={{ 
              margin: 0, 
              fontSize: 32, 
              fontWeight: 800,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: 8
            }}>
              📊 감정 히스토리
            </h1>
            <p style={{ 
              margin: 0, 
              fontSize: 16, 
              color: '#6b7280',
              display: 'flex',
              alignItems: 'center',
              gap: 8
            }}>
              {userTitle && (
                <span
                  style={{
                    display: 'inline-block',
                    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                    color: '#fff',
                    padding: '4px 12px',
                    borderRadius: '20px',
                    fontSize: '14px',
                    fontWeight: '600',
                    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
                  }}
                >
                  🏆 {userTitle}
                </span>
              )}
              <span>{user.email}님의 감정 변화를 시각적으로 확인하세요</span>
            </p>
          </div>
          
          <button
            onClick={() => navigate('/diary')}
            style={{
              padding: '10px 20px',
              background: '#fff',
              border: '2px solid #e5e7eb',
              borderRadius: 8,
              cursor: 'pointer',
              fontSize: 14,
              fontWeight: 600,
              color: '#6b7280',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#6366f1';
              e.currentTarget.style.color = '#6366f1';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#e5e7eb';
              e.currentTarget.style.color = '#6b7280';
            }}
          >
            ← 다이어리로 돌아가기
          </button>
        </div>

        {/* 감정 칭호 카드 */}
        <EmotionTitle />

        {/* 감정 TOP 5 */}
        <EmotionTopFive />

        {/* 기간 선택 카드 */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: 16,
          padding: '20px 32px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)',
          display: 'flex',
          alignItems: 'center',
          gap: 16
        }}>
          <span style={{ 
            fontSize: 14, 
            fontWeight: 600, 
            color: '#374151' 
          }}>
            📅 조회 기간:
          </span>
          <div style={{ 
            display: 'flex', 
            gap: 8,
            flex: 1
          }}>
            {[7, 14, 30].map(days => (
              <button
                key={days}
                onClick={() => setChartDays(days)}
                style={{
                  flex: 1,
                  padding: '10px 16px',
                  border: 'none',
                  borderRadius: 8,
                  background: chartDays === days 
                    ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' 
                    : '#f3f4f6',
                  color: chartDays === days ? '#fff' : '#6b7280',
                  cursor: 'pointer',
                  fontSize: 14,
                  fontWeight: 600,
                  transition: 'all 0.3s ease',
                  boxShadow: chartDays === days 
                    ? '0 4px 12px rgba(102, 126, 234, 0.4)' 
                    : 'none'
                }}
                onMouseEnter={(e) => {
                  if (chartDays !== days) {
                    e.currentTarget.style.background = '#e5e7eb';
                  }
                }}
                onMouseLeave={(e) => {
                  if (chartDays !== days) {
                    e.currentTarget.style.background = '#f3f4f6';
                  }
                }}
              >
                최근 {days}일
              </button>
            ))}
          </div>
        </div>

        {/* 차트 영역 */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: 16,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          overflow: 'hidden'
        }}>
          <EmotionHistoryChart days={chartDays} />
        </div>

        {/* 도움말 카드 */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: 16,
          padding: '24px 32px',
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08)'
        }}>
          <h3 style={{ 
            margin: 0, 
            fontSize: 18, 
            fontWeight: 700, 
            color: '#374151',
            marginBottom: 16
          }}>
            💡 차트 사용 팁
          </h3>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: 16
          }}>
            <TipCard
              icon="📈"
              title="추세 차트"
              description="감정 강도의 변화를 부드러운 곡선으로 확인하세요"
            />
            <TipCard
              icon="📉"
              title="선형 차트"
              description="정확한 데이터 포인트를 선명한 선으로 확인하세요"
            />
            <TipCard
              icon="🥧"
              title="분포 차트"
              description="어떤 감정을 가장 많이 느꼈는지 한눈에 파악하세요"
            />
          </div>
        </div>

        {/* 감정 인사이트 영역 - 맨 아래로 이동 */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: 16,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
          overflow: 'hidden'
        }}>
          <EmotionInsights days={30} />
        </div>

        {/* 푸터 안내 */}
        <div style={{
          textAlign: 'center',
          padding: '24px 0',
          color: 'rgba(255, 255, 255, 0.8)',
          fontSize: 14
        }}>
          <p style={{ margin: 0 }}>
            💬 AI와 대화하거나 온라인 채팅을 더 많이 할수록 더 풍부한 데이터를 얻을 수 있어요!
          </p>
        </div>
      </div>
    </div>
  );
}

// 팁 카드 컴포넌트
function TipCard({ 
  icon, 
  title, 
  description 
}: { 
  icon: string; 
  title: string; 
  description: string;
}) {
  return (
    <div style={{
      background: '#f9fafb',
      padding: 16,
      borderRadius: 12,
      border: '1px solid #e5e7eb'
    }}>
      <div style={{ fontSize: 32, marginBottom: 8 }}>{icon}</div>
      <div style={{ 
        fontSize: 14, 
        fontWeight: 700, 
        color: '#374151',
        marginBottom: 4
      }}>
        {title}
      </div>
      <div style={{ 
        fontSize: 13, 
        color: '#6b7280',
        lineHeight: 1.5
      }}>
        {description}
      </div>
    </div>
  );
}
