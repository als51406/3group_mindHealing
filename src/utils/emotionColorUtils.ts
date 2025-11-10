// emotionColorUtils.ts - 감정 색상 및 텍스트 색상 매핑

export interface EmotionColorConfig {
  background: string;
  text: string;
  colorName: string;
}

// 감정 색상별 텍스트 색상 매핑 (가독성 최적화)
export const emotionColorMap: Record<string, EmotionColorConfig> = {
  // 밝은 색상 → 어두운 텍스트
  '기쁨': {
    background: '#FFD93D',
    text: '#2C2C2C',
    colorName: '노란색'
  },
  '설렘': {
    background: '#FF6B9D',
    text: '#FFFFFF',
    colorName: '분홍색'
  },
  '평온': {
    background: '#A8E6CF',
    text: '#2C2C2C',
    colorName: '연두색'
  },
  '만족': {
    background: '#B4E7CE',
    text: '#2C2C2C',
    colorName: '민트색'
  },
  '감사': {
    background: '#FFB6C1',
    text: '#2C2C2C',
    colorName: '연분홍색'
  },
  '희망': {
    background: '#87CEEB',
    text: '#2C2C2C',
    colorName: '하늘색'
  },
  
  // 중간 색상 → 흰색 텍스트
  '불안': {
    background: '#9B59B6',
    text: '#FFFFFF',
    colorName: '보라색'
  },
  '슬픔': {
    background: '#5DADE2',
    text: '#FFFFFF',
    colorName: '파란색'
  },
  '외로움': {
    background: '#34495E',
    text: '#FFFFFF',
    colorName: '회색'
  },
  '좌절': {
    background: '#95A5A6',
    text: '#FFFFFF',
    colorName: '진회색'
  },
  '피곤': {
    background: '#7F8C8D',
    text: '#FFFFFF',
    colorName: '어두운 회색'
  },
  
  // 어두운/강렬한 색상 → 흰색 텍스트
  '분노': {
    background: '#E74C3C',
    text: '#FFFFFF',
    colorName: '빨간색'
  },
  '짜증': {
    background: '#E67E22',
    text: '#FFFFFF',
    colorName: '주황색'
  },
  '질투': {
    background: '#16A085',
    text: '#FFFFFF',
    colorName: '청록색'
  },
  '후회': {
    background: '#8E44AD',
    text: '#FFFFFF',
    colorName: '자주색'
  },
  '두려움': {
    background: '#2C3E50',
    text: '#FFFFFF',
    colorName: '남색'
  },
  
  // 기본값
  'default': {
    background: '#95A5A6',
    text: '#FFFFFF',
    colorName: '회색'
  }
};

/**
 * 감정에 따른 색상 설정 가져오기
 */
export function getEmotionColorConfig(emotion: string): EmotionColorConfig {
  return emotionColorMap[emotion] || emotionColorMap['default'];
}

/**
 * 배경색에 따라 자동으로 텍스트 색상 계산 (Luminance 기반)
 * 사용하지 않는 경우에도 대비를 위해 유지
 */
export function getContrastTextColor(backgroundColor: string): string {
  // hex to RGB
  const hex = backgroundColor.replace('#', '');
  const r = parseInt(hex.substr(0, 2), 16);
  const g = parseInt(hex.substr(2, 2), 16);
  const b = parseInt(hex.substr(4, 2), 16);
  
  // Calculate relative luminance
  const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  
  // Return black for light colors, white for dark colors
  return luminance > 0.5 ? '#2C2C2C' : '#FFFFFF';
}

/**
 * 감정 색상 목록 가져오기 (디버깅/테스트용)
 */
export function getAllEmotionColors(): string[] {
  return Object.keys(emotionColorMap).filter(key => key !== 'default');
}
