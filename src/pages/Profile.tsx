import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../hooks/useAuth';
import ProfileCard from '../components/ProfileCard';
import type { UserProfile } from '../types/api';
import './Profile.css';

const Profile: React.FC = () => {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [profile, setProfile] = useState<UserProfile>({
    id: user?.id || '',
    nickname: user?.nickname || user?.email?.split('@')[0] || 'User',
    title: user?.title || '',
    profileImage: user?.profileImage || '',
    todayEmotion: undefined,
  });
  
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [uploadingImage, setUploadingImage] = useState(false);

  // 오늘의 감정 가져오기
  useEffect(() => {
    if (!user?.id) return;
    
    const fetchTodayEmotion = async () => {
      try {
        setIsLoading(true);
        const res = await fetch('/api/diary/today-emotion', {
          credentials: 'include',
        });
        
        if (res.ok) {
          const data = await res.json();
          if (data.emotion) {
            setProfile(prev => ({
              ...prev,
              todayEmotion: {
                emotion: data.emotion.emotion,
                color: data.emotion.color,
                score: data.emotion.score,
              }
            }));
          }
        }
      } catch (error) {
        console.error('Failed to fetch today emotion:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchTodayEmotion();
  }, [user?.id]);

  // 프로필 저장
  const handleSave = async () => {
    if (!user?.id) return;
    
    try {
      setIsSaving(true);
      const res = await fetch('/api/profile/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({
          nickname: profile.nickname,
          title: profile.title,
          profileImage: profile.profileImage,
        }),
      });
      
      if (!res.ok) throw new Error('Failed to save profile');
      
      alert('프로필이 저장되었습니다!');
    } catch (error) {
      console.error('Save profile error:', error);
      alert('프로필 저장에 실패했습니다.');
    } finally {
      setIsSaving(false);
    }
  };

  // 이미지 업로드
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    // 파일 크기 체크 (5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('파일 크기는 5MB 이하여야 합니다.');
      return;
    }
    
    // 이미지 타입 체크
    if (!file.type.startsWith('image/')) {
      alert('이미지 파일만 업로드 가능합니다.');
      return;
    }
    
    try {
      setUploadingImage(true);
      const formData = new FormData();
      formData.append('image', file);
      
      const res = await fetch('/api/profile/upload-image', {
        method: 'POST',
        credentials: 'include',
        body: formData,
      });
      
      if (!res.ok) throw new Error('Failed to upload image');
      
      const data = await res.json();
      setProfile(prev => ({
        ...prev,
        profileImage: data.imageUrl,
      }));
    } catch (error) {
      console.error('Upload image error:', error);
      alert('이미지 업로드에 실패했습니다.');
    } finally {
      setUploadingImage(false);
    }
  };

  const getInitial = (name: string) => {
    return name.charAt(0).toUpperCase();
  };

  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <h1>프로필 설정</h1>
          <p>다른 사용자에게 보여질 프로필을 설정하세요</p>
        </div>
        
        <div className="profile-content">
          {/* 프리뷰 */}
          <div className="profile-preview-section">
            <div className="preview-label">프로필 미리보기</div>
            <ProfileCard profile={profile} showOnline={true} />
          </div>
          
          {/* 편집 폼 */}
          <div className="profile-edit-form">
            {/* 프로필 이미지 */}
            <div className="form-group">
              <label className="form-label">프로필 이미지</label>
              <div className="image-upload-section">
                {profile.profileImage ? (
                  <img 
                    src={profile.profileImage} 
                    alt="Profile" 
                    className="current-image-preview"
                  />
                ) : (
                  <div className="avatar-preview-placeholder">
                    {getInitial(profile.nickname)}
                  </div>
                )}
                <button 
                  type="button"
                  className="upload-button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={uploadingImage}
                >
                  {uploadingImage ? '업로드 중...' : '이미지 변경'}
                </button>
                <input 
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  className="file-input-hidden"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
            
            {/* 닉네임 */}
            <div className="form-group">
              <label className="form-label">닉네임 *</label>
              <input 
                type="text"
                className="form-input"
                value={profile.nickname}
                onChange={(e) => setProfile(prev => ({ ...prev, nickname: e.target.value }))}
                placeholder="닉네임을 입력하세요"
                maxLength={20}
                required
              />
            </div>
            
            {/* 칭호 */}
            <div className="form-group">
              <label className="form-label">칭호</label>
              <input 
                type="text"
                className="form-input"
                value={profile.title || ''}
                onChange={(e) => setProfile(prev => ({ ...prev, title: e.target.value }))}
                placeholder="예: 감정 탐험가, 마음의 정원사"
                maxLength={30}
              />
            </div>
            
            {/* 오늘의 감정 */}
            <div className="form-group">
              <label className="form-label">오늘의 감정</label>
              {isLoading ? (
                <div className="today-emotion-display">
                  <p style={{ margin: 0, color: '#6b7280' }}>감정 데이터 불러오는 중...</p>
                </div>
              ) : profile.todayEmotion ? (
                <div className="today-emotion-display">
                  <div className="emotion-info">
                    <div 
                      className="emotion-color-preview"
                      style={{ backgroundColor: profile.todayEmotion.color }}
                    />
                    <div className="emotion-details">
                      <p className="emotion-name">{profile.todayEmotion.emotion}</p>
                      <p className="emotion-description">
                        오늘 일기를 작성하면 자동으로 감정이 분석됩니다
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="today-emotion-display">
                  <p style={{ margin: 0, color: '#6b7280' }}>
                    아직 오늘의 감정이 없습니다. 일기를 작성해보세요!
                  </p>
                </div>
              )}
            </div>
            
            {/* 저장 버튼 */}
            <button 
              type="button"
              className="save-button"
              onClick={handleSave}
              disabled={isSaving || !profile.nickname.trim()}
            >
              {isSaving ? '저장 중...' : '프로필 저장'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
