// colorUtils.ts — 색상 변환 및 팔레트 생성 유틸리티 함수

// 감정 컬러 코드를 한글 색상 이름으로 변환
export function getColorName(hexColor: string): string {
  const colorMap: { [key: string]: string } = {
    // 빨강 계열
    '#FF6B6B': '밝은 빨강',
    '#FF4757': '선명한 빨강',
    '#EE5A6F': '코랄 빨강',
    '#FF7979': '연한 빨강',
    '#FF3838': '진한 빨강',
    
    // 주황 계열
    '#FFA07A': '연어색',
    '#FF8C42': '따뜻한 주황',
    '#FF9F43': '밝은 주황',
    '#FFB142': '골든 오렌지',
    '#FF9966': '복숭아색',
    
    // 노랑 계열
    '#FFD93D': '생동감 있는 노랑',
    '#FFF176': '밝은 레몬',
    '#FFEB3B': '선명한 노랑',
    '#FFF9C3': '창백한 노랑',
    '#FFE66D': '부드러운 노랑',
    '#FFDD59': '따뜻한 노랑',
    
    // 초록 계열
    '#6BCF7F': '밝은 초록',
    '#95E1D3': '민트 초록',
    '#26DE81': '생생한 초록',
    '#7BED9F': '연한 초록',
    '#A8E6CF': '파스텔 초록',
    '#20BF6B': '싱그러운 초록',
    
    // 파랑 계열
    '#48DBF8': '하늘색',
    '#54A0FF': '밝은 파랑',
    '#74B9FF': '연한 하늘색',
    '#0ABDE3': '청록색',
    '#4FC3F7': '맑은 파랑',
    '#5F9DF7': '선명한 파랑',
    
    // 보라 계열
    '#A29BFE': '밝은 보라',
    '#B39DDB': '연한 보라',
    '#8B7FD1': '부드러운 보라',
    '#9B59B6': '진한 보라',
    '#C88EA7': '로즈 퍼플',
    
    // 분홍 계열
    '#FDA7DF': '밝은 분홍',
    '#FFB8D0': '파스텔 핑크',
    '#F48FB1': '로즈 핑크',
    '#FF6B9D': '선명한 분홍',
    '#FFC2D1': '연한 분홍',
    
    // 회색/중성 계열
    '#DFE4EA': '밝은 회색',
    '#C8D6E5': '구름 회색',
    '#B8C6DB': '연한 회색',
    '#A4B0BE': '중간 회색',
    '#E8E8E8': '은은한 회색',
    
    // 갈색 계열
    '#D7A86E': '따뜻한 갈색',
    '#C49C94': '로즈 베이지',
    '#A67C52': '카라멜색',
    
    // 기타
    '#F5F5F5': '거의 흰색',
    '#FFFFFF': '순백색',
    '#000000': '순검정',
  };

  // 대소문자 통일
  const normalizedColor = hexColor.toUpperCase();
  
  // 정확한 매칭
  if (colorMap[normalizedColor]) {
    return colorMap[normalizedColor];
  }
  
  // 근사값 찾기 (유사한 색상)
  const hexToRgbSimple = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  };
  
  const targetRgb = hexToRgbSimple(normalizedColor);
  if (!targetRgb) return hexColor; // 파싱 실패 시 원본 반환
  
  // 가장 가까운 색상 찾기
  let closestColor = hexColor;
  let minDistance = Infinity;
  
  for (const [hex, name] of Object.entries(colorMap)) {
    const rgb = hexToRgbSimple(hex);
    if (!rgb) continue;
    
    // 유클리드 거리 계산
    const distance = Math.sqrt(
      Math.pow(targetRgb.r - rgb.r, 2) +
      Math.pow(targetRgb.g - rgb.g, 2) +
      Math.pow(targetRgb.b - rgb.b, 2)
    );
    
    if (distance < minDistance) {
      minDistance = distance;
      closestColor = name;
    }
  }
  
  // 거리가 너무 멀면 (차이가 큰 경우) 원본 코드 반환
  return minDistance < 100 ? closestColor : hexColor;
}

export function hexToRgb(hex: string) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map((x) => x + x).join('');
  const r = parseInt(c.slice(0, 2), 16) / 255;
  const g = parseInt(c.slice(2, 4), 16) / 255;
  const b = parseInt(c.slice(4, 6), 16) / 255;
  return { r, g, b };
}

export function hexToHsl(hex: string) {
  let c = hex.replace('#', '');
  if (c.length === 3) c = c.split('').map((x) => x + x).join('');
  const r = parseInt(c.slice(0, 2), 16) / 255;
  const g = parseInt(c.slice(2, 4), 16) / 255;
  const b = parseInt(c.slice(4, 6), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  let h = 0, s = 0, l = (max + min) / 2;
  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r: h = (g - b) / d + (g < b ? 6 : 0); break;
      case g: h = (b - r) / d + 2; break;
      case b: h = (r - g) / d + 4; break;
    }
    h /= 6;
  }
  return { h: h * 360, s: s * 100, l: l * 100 };
}

export function hslToHex(h: number, s: number, l: number) {
  s /= 100; l /= 100;
  const c = (1 - Math.abs(2*l - 1)) * s;
  const x = c * (1 - Math.abs(((h/60) % 2) - 1));
  const m = l - c/2;
  let r = 0, g = 0, b = 0;
  if (0 <= h && h < 60) { r = c; g = x; b = 0; }
  else if (60 <= h && h < 120) { r = x; g = c; b = 0; }
  else if (120 <= h && h < 180) { r = 0; g = c; b = x; }
  else if (180 <= h && h < 240) { r = 0; g = x; b = c; }
  else if (240 <= h && h < 300) { r = x; g = 0; b = c; }
  else { r = c; g = 0; b = x; }
  const toHex = (v: number) => Math.round((v + m) * 255).toString(16).padStart(2, '0');
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}

export function paletteFromBase(hex: string) {
  const { h, s, l } = hexToHsl(hex);
  // 채도와 명도 변화를 더 크게 해서 색상 차이를 명확하게
  const c1 = hslToHex(h, Math.min(100, s * 1.15), Math.min(95, l * 1.15)); // 더 밝고 선명
  const c2 = hslToHex((h + 300) % 360, Math.min(100, s * 0.9), Math.max(15, l * 0.75)); // 더 어둡게
  const c3 = hslToHex((h + 60) % 360, Math.min(100, s * 1.1), Math.min(90, l * 1.05)); // 약간 변화
  return { c1, c2, c3 };
}

// 생동감 있는 그라데이션을 위한 유사색 생성
export function generateGradientColors(baseColor: string) {
  const { h, s, l } = hexToHsl(baseColor);
  
  // 기본색
  const color1 = baseColor;
  
  // 밝고 선명한 유사색 (색상 크게 회전)
  const color2 = hslToHex(
    (h + 45) % 360,  // 색상을 크게 회전
    Math.min(100, s * 1.25),  // 채도 크게 증가
    Math.min(85, l * 1.3)    // 밝기 크게 증가
  );
  
  // 반대편 색상 (보색에 가깝게)
  const color3 = hslToHex(
    (h + 315) % 360,  // -45도 회전 (반대 방향)
    Math.min(100, s * 1.15),
    Math.max(25, l * 0.75)   // 더 어둡게
  );
  
  // 중간 톤 (색상 차이 크게)
  const color4 = hslToHex(
    (h + 25) % 360,  // 중간 각도
    Math.min(100, s * 1.2),
    Math.min(80, l * 1.1)
  );
  
  return { color1, color2, color3, color4 };
}

// 랜덤 그라데이션 각도 생성
export function getRandomGradientAngle() {
  const angles = [45, 90, 135, 180, 225, 270, 315];
  return angles[Math.floor(Math.random() * angles.length)];
}

// 그라데이션 CSS 생성
export function createGradientStyle(baseColor: string) {
  const { color1, color2, color3, color4 } = generateGradientColors(baseColor);
  const angle = getRandomGradientAngle();
  
  // 여러 색상을 사용한 복잡한 그라데이션
  return `linear-gradient(${angle}deg, ${color1} 0%, ${color2} 30%, ${color4} 60%, ${color3} 100%)`;
}
