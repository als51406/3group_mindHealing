import React from 'react';
import type { UserProfile } from '../types/api';
import './ProfileCard.css';

interface ProfileCardProps {
  profile: UserProfile;
  compact?: boolean;
  showOnline?: boolean;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ 
  profile, 
  compact = false,
  showOnline = false 
}) => {
  // 감정 색상 설정
  const emotionColor = profile.todayEmotion?.color || '#a78bfa';
  const emotionColorLight = adjustColorBrightness(emotionColor, 20);
  
  // 닉네임의 첫 글자 (아바타 대체용)
  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div 
      className={`profile-card ${compact ? 'compact' : ''}`}
      style={{
        '--emotion-color': emotionColor,
        '--emotion-color-light': emotionColorLight,
      } as React.CSSProperties}
    >
      {/* 배경 그라데이션 */}
      <div className="profile-card-background" />
      
      {/* 장식 패턴 */}
      <div className="profile-card-pattern" />
      
      {/* 카드 내용 */}
      <div className="profile-card-content">
        {/* 상단 섹션: 칭호 */}
        <div className="profile-section-top">
          {profile.title && (
            <div className="profile-title-top">
              {profile.title}
            </div>
          )}
        </div>
        
        {/* 하단 섹션: 이미지 + 정보 */}
        <div className="profile-section-bottom">
          {/* 왼쪽: 프로필 이미지 */}
          <div className="profile-image-wrapper">
            {profile.profileImage ? (
              <img 
                src={profile.profileImage} 
                alt={profile.nickname}
                className="profile-image"
              />
            ) : (
              <div className="profile-avatar-placeholder">
                {getInitial(profile.nickname)}
              </div>
            )}
            {showOnline && <div className="profile-online-indicator" />}
          </div>
          
          {/* 오른쪽: 닉네임 + 감정 TOP3 */}
          <div className="profile-info-right">
            {/* 닉네임 (위) */}
            <h3 className="profile-nickname">{profile.nickname}</h3>
            
            {/* 감정 TOP3 (아래) */}
            {profile.topEmotions && profile.topEmotions.length > 0 && (
              <div className="profile-top-emotions">
                {profile.topEmotions.slice(0, 3).map((item) => (
                  <div key={item.rank} className="emotion-rank-item">
                    <span className="emotion-medal">
                      {item.rank === 1 && '🥇'}
                      {item.rank === 2 && '🥈'}
                      {item.rank === 3 && '🥉'}
                    </span>
                    <span 
                      className="emotion-name"
                      style={{ color: item.color }}
                    >
                      {item.emotion}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// 색상 밝기 조절 유틸리티
function adjustColorBrightness(hex: string, percent: number): string {
  // #을 제거하고 RGB로 변환
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + percent));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0x00FF) + percent));
  const b = Math.min(255, Math.max(0, (num & 0x0000FF) + percent));
  
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

export default ProfileCard;
