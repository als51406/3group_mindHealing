# 감정 색상 시스템 가이드

## 📋 개요

감정에 따른 색상과 텍스트 대비 색상을 체계적으로 관리하는 시스템입니다.

## 🎨 감정 색상 매핑

### 밝은 색상 (어두운 텍스트 #2C2C2C)

가독성을 위해 밝은 배경에는 어두운 텍스트를 사용합니다.

| 감정 | 배경색 | 색상명 | 텍스트 색상 |
|------|--------|--------|-------------|
| 기쁨 | #FFD93D | 노란색 | #2C2C2C |
| 평온 | #A8E6CF | 연두색 | #2C2C2C |
| 만족 | #B4E7CE | 민트색 | #2C2C2C |
| 감사 | #FFB6C1 | 연분홍색 | #2C2C2C |
| 희망 | #87CEEB | 하늘색 | #2C2C2C |

### 중간 색상 (흰색 텍스트 #FFFFFF)

중간 명도의 배경에는 흰색 텍스트를 사용합니다.

| 감정 | 배경색 | 색상명 | 텍스트 색상 |
|------|--------|--------|-------------|
| 설렘 | #FF6B9D | 분홍색 | #FFFFFF |
| 불안 | #9B59B6 | 보라색 | #FFFFFF |
| 슬픔 | #5DADE2 | 파란색 | #FFFFFF |
| 외로움 | #34495E | 회색 | #FFFFFF |
| 좌절 | #95A5A6 | 진회색 | #FFFFFF |
| 피곤 | #7F8C8D | 어두운 회색 | #FFFFFF |

### 어두운/강렬한 색상 (흰색 텍스트 #FFFFFF)

어두운 배경이나 채도가 높은 배경에는 흰색 텍스트를 사용합니다.

| 감정 | 배경색 | 색상명 | 텍스트 색상 |
|------|--------|--------|-------------|
| 분노 | #E74C3C | 빨간색 | #FFFFFF |
| 짜증 | #E67E22 | 주황색 | #FFFFFF |
| 질투 | #16A085 | 청록색 | #FFFFFF |
| 후회 | #8E44AD | 자주색 | #FFFFFF |
| 두려움 | #2C3E50 | 남색 | #FFFFFF |

## 🔧 사용 방법

### 1. emotionColorUtils.ts 임포트

```typescript
import { getEmotionColorConfig } from '../utils/emotionColorUtils';
```

### 2. 감정에 따른 색상 설정 가져오기

```typescript
const colorConfig = getEmotionColorConfig(emotion);
// colorConfig.background: 배경색
// colorConfig.text: 텍스트 색상
// colorConfig.colorName: 색상 이름 (한글)
```

### 3. 컴포넌트에서 사용 예시

```tsx
<div 
  className="emotion-badge"
  style={{ 
    backgroundColor: colorConfig.background,
    color: colorConfig.text
  }}
>
  {colorConfig.colorName}
</div>
```

## 📂 파일 구조

```
src/
  utils/
    emotionColorUtils.ts         # 감정 색상 유틸리티
  components/
    MatchingSuggestionModal.tsx  # 매칭 권유 모달 (색상 배지 사용)
    MatchingSuggestionModal.css  # 모달 스타일
```

## 🎯 주요 함수

### getEmotionColorConfig(emotion: string)

감정명을 입력받아 해당 감정의 색상 설정을 반환합니다.

**Parameters:**
- `emotion` (string): 감정명 (예: "기쁨", "슬픔", "불안")

**Returns:**
```typescript
{
  background: string;  // 배경색 (hex)
  text: string;        // 텍스트 색상 (hex)
  colorName: string;   // 색상명 (한글)
}
```

**Example:**
```typescript
const config = getEmotionColorConfig("기쁨");
// { background: "#FFD93D", text: "#2C2C2C", colorName: "노란색" }
```

### getContrastTextColor(backgroundColor: string)

배경색을 기반으로 자동으로 대비되는 텍스트 색상을 계산합니다.
(Luminance 기반 알고리즘 사용)

**Parameters:**
- `backgroundColor` (string): 배경색 (hex)

**Returns:**
- `string`: "#2C2C2C" (어두운) 또는 "#FFFFFF" (밝은)

**Example:**
```typescript
const textColor = getContrastTextColor("#FFD93D");
// "#2C2C2C" (밝은 배경이므로 어두운 텍스트)
```

### getAllEmotionColors()

등록된 모든 감정 색상 목록을 반환합니다. (디버깅/테스트용)

**Returns:**
- `string[]`: 감정명 배열

## 🎨 디자인 가이드라인

### 1. 배지 디자인

```css
.matching-modal-color-badge {
  display: inline-block;
  padding: 12px 32px;
  border-radius: 12px;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.5px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
```

### 2. 애니메이션

```css
@keyframes matching-badge-slide-down {
  0% {
    opacity: 0;
    transform: translateY(-20px) scale(0.8);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
```

### 3. 호버 효과

```css
.matching-modal-color-badge:hover {
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
}
```

## 📱 반응형 디자인

- **모바일**: 패딩 조정, 폰트 크기 축소
- **태블릿**: 기본 디자인 유지
- **데스크톱**: 호버 효과 활성화

## 🔄 업데이트 이력

### v2.0 (2025-11-10)
- **변경**: 원형 아이콘 → 직사각형 색상 배지로 변경
- **추가**: 감정별 색상 이름 텍스트 표시
- **개선**: 배경색과 대비되는 텍스트 색상 자동 적용
- **추가**: emotionColorUtils.ts 유틸리티 파일 생성

### v1.0 (초기 버전)
- 원형 아이콘 기반 디자인
- 메시지 이모지(💬) 표시

## 🎯 향후 개선 사항

1. **다크 모드 지원**
   - 다크 모드에서의 색상 대비 최적화
   - 별도의 색상 팔레트 추가

2. **접근성 강화**
   - WCAG 2.1 AA 레벨 대비 비율 보장
   - 색맹 모드 지원

3. **커스터마이징**
   - 사용자 정의 색상 설정 기능
   - 테마별 색상 프리셋

4. **다국어 지원**
   - 색상명 다국어 번역
   - 지역별 색상 문화 고려

## 📚 참고 자료

- [WCAG 색상 대비 가이드라인](https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum.html)
- [Color Contrast Checker](https://webaim.org/resources/contrastchecker/)
- [Emotion Color Psychology](https://www.verywellmind.com/color-psychology-2795824)

## 💡 팁

1. **새로운 감정 추가 시**:
   - `emotionColorMap`에 색상 설정 추가
   - 대비 비율 4.5:1 이상 유지
   - 색상명은 직관적이고 간단하게

2. **색상 테스트**:
   - 다양한 조명 환경에서 확인
   - 색맹 시뮬레이터로 검증
   - 모바일/데스크톱 모두 확인

3. **성능 최적화**:
   - 색상 설정은 객체로 캐싱됨
   - 런타임 계산 최소화
   - CSS 변수 활용 고려
