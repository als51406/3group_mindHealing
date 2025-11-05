# 🌈 감정 분석 고도화 기능 가이드

## 📌 개요

토닥톡의 감정 분석 시스템이 **단일 감정**에서 **복합 감정 분석**으로 업그레이드되었습니다.

### ✨ 주요 개선 사항

| 항목 | 이전 (Basic) | 현재 (Enhanced) |
|------|-------------|-----------------|
| **감정 개수** | 1개 (주 감정만) | 최대 3개 (주 감정 + 부 감정 2개) |
| **강도 표시** | 0-100 점수 | 각 감정별 intensity (0-100) |
| **추세 분석** | ❌ 없음 | ✅ improving / stable / declining |
| **키워드 추출** | ❌ 없음 | ✅ 감정 유발 단어 최대 5개 |
| **시간 정보** | ❌ 없음 | ✅ ISO 8601 타임스탬프 |

---

## 🚀 사용 방법

### 1. 프론트엔드 (Chat.tsx)

#### 기본 사용법
```typescript
// 복합 감정 분석 API 호출
const res = await fetch('/api/ai/analyze-emotion', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ 
        text: allText, 
        enhanced: true  // ✅ 복합 감정 활성화
    })
});

const data = await res.json();
const { mood, enhancedMood } = data;

// mood: 기존 형식 (하위 호환)
// enhancedMood: 복합 감정 데이터
```

#### State 관리
```typescript
const [mood, setMood] = useState<{ emotion: string; score: number; color: string } | null>(null);
const [enhancedMood, setEnhancedMood] = useState<any>(null);

// 분석 결과 저장
setMood(analyzedMood);
setEnhancedMood(analyzedEnhancedMood);
```

---

### 2. 백엔드 (server/index.ts)

#### API 엔드포인트

**POST /api/ai/analyze-emotion**

**Request Body:**
```json
{
  "text": "오늘 회사에서 칭찬받았어요. 근데 너무 피곤해서 기쁘면서도 힘들었어요.",
  "enhanced": true
}
```

**Response:**
```json
{
  "ok": true,
  "mood": {
    "emotion": "기쁨",
    "score": 0.75,
    "color": "#FFD93D"
  },
  "enhancedMood": {
    "primary": {
      "emotion": "기쁨",
      "score": 75,
      "color": "#FFD93D",
      "intensity": 70
    },
    "secondary": [
      {
        "emotion": "피로",
        "score": 60,
        "color": "#A8DADC",
        "intensity": 65
      }
    ],
    "trend": "stable",
    "triggerWords": ["회사", "칭찬", "피곤", "기쁘다", "힘들다"],
    "timestamp": "2025-11-05T10:30:00.000Z"
  }
}
```

---

## 📊 데이터 구조

### EnhancedMoodResult

```typescript
interface EmotionDetail {
  emotion: string;      // 감정 이름
  score: number;        // 강도 (0-100)
  color: string;        // 색상 코드
  intensity: number;    // 강도 레벨 (0-100)
}

interface EnhancedMoodResult {
  primary: EmotionDetail;           // 주 감정
  secondary: EmotionDetail[];       // 부 감정들 (최대 2개)
  trend?: 'improving' | 'stable' | 'declining'; // 추세
  triggerWords: string[];           // 감정 유발 키워드 (최대 5개)
  timestamp: string;                // 분석 시간 (ISO 8601)
}
```

---

## 🎯 감정 추세 계산 알고리즘

### 추세 분류 기준

```typescript
function calculateEmotionTrend(
  currentEmotion: string,
  currentIntensity: number,
  previousMoods: any[]
): 'improving' | 'stable' | 'declining'
```

| 추세 | 조건 | 설명 |
|------|------|------|
| **improving** 📈 | 이전 부정 → 현재 긍정 | 감정 상태 개선 |
| **declining** 📉 | 이전 긍정 → 현재 부정 | 주의 필요 |
| **stable** ➡️ | 일관된 패턴 | 안정적 유지 |

### 긍정/부정 감정 분류

**긍정 감정:**
```typescript
['기쁨', '행복', '평온/안도', '만족', '감사', '설렘', '희망']
```

**부정 감정:**
```typescript
['슬픔', '우울', '화남', '짜증', '불안', '스트레스', '외로움', '후회']
```

---

## 🖥️ UI 표시 예시

### Toast 메시지
```
✨ 감정 분석 완료! 기쁨 (75%)
+ 피로
📈 개선 중
```

### 상세 패널
```
🌈 감정 분석 상세

함께 느껴지는 감정: [피로]
감정 추세: 📈 개선 중
주요 키워드: #회사 #칭찬 #피곤 #기쁘다 #힘들다
```

---

## 🧪 테스트 방법

### 1. 개발 환경 실행

```bash
# 백엔드 서버 실행
npm run server

# 프론트엔드 실행 (다른 터미널)
npm run dev
```

### 2. 테스트 시나리오

**시나리오 1: 복합 감정 (기쁨 + 불안)**
```
입력: "오늘 프로젝트 발표했어요. 잘됐지만 떨렸어요."
기대 결과:
- Primary: 기쁨
- Secondary: 불안
- Trigger Words: [프로젝트, 발표, 잘됐다, 떨렸다]
```

**시나리오 2: 감정 추세 (개선)**
```
이전 대화: 슬픔, 우울
현재 대화: 희망, 평온
기대 결과: trend = "improving" 📈
```

**시나리오 3: 감정 추세 (주의)**
```
이전 대화: 기쁨, 만족
현재 대화: 스트레스, 화남
기대 결과: trend = "declining" 📉
```

---

## 🔧 커스터마이징

### OpenAI 프롬프트 조정

`server/index.ts`의 `detectEnhancedEmotion` 함수 수정:

```typescript
const prompt = `다음 한국어 텍스트에서 사용자의 감정을 **복합적으로** 분석하세요.

감정 목록: ${emotionList}

출력 형식 (반드시 JSON):
{
  "primary": {"emotion":"<주 감정>","score":0-100,"intensity":0-100},
  "secondary": [
    {"emotion":"<부 감정1>","score":0-100,"intensity":0-100},
    {"emotion":"<부 감정2>","score":0-100,"intensity":0-100}
  ],
  "triggerWords": ["키워드1", "키워드2", "키워드3"]
}

규칙:
1. primary: 가장 강한 감정 1개
2. secondary: 함께 느껴지는 감정 최대 2개 (없으면 빈 배열)
3. intensity: 감정의 강도 (0=매우 약함, 100=매우 강함)
4. triggerWords: 감정을 유발한 핵심 단어/구절 (최대 5개)

텍스트: ${text}`;
```

### Temperature 조정

```typescript
const resp = await openai.chat.completions.create({
  model: OPENAI_MODEL,
  messages: [...],
  temperature: 0.2, // 0.0-1.0 (낮을수록 일관성, 높을수록 창의성)
});
```

---

## 📈 성능 최적화

### 1. 캐싱 전략
```typescript
// 같은 텍스트의 중복 분석 방지
const analysisCache = new Map<string, EnhancedMoodResult>();
const cacheKey = hashText(text);

if (analysisCache.has(cacheKey)) {
  return analysisCache.get(cacheKey)!;
}
```

### 2. 비용 절감
- 최근 5개 메시지만 분석 (토큰 절약)
- 이전 감정 데이터 10개만 조회 (DB 쿼리 최적화)
- Temperature 0.2로 고정 (일관성 향상)

---

## 🐛 트러블슈팅

### 문제 1: OpenAI API 에러
```
❌ 복합 감정 분석 오류: Error: Request failed with status code 429
```

**해결:** API 요청 제한 확인, 백오프 재시도 추가

```typescript
async function retryWithBackoff(fn: () => Promise<any>, maxRetries = 3) {
  for (let i = 0; i < maxRetries; i++) {
    try {
      return await fn();
    } catch (e) {
      if (i === maxRetries - 1) throw e;
      await new Promise(resolve => setTimeout(resolve, 1000 * (i + 1)));
    }
  }
}
```

### 문제 2: JSON 파싱 실패
```
❌ 복합 감정 분석 오류: SyntaxError: Unexpected token
```

**해결:** Fallback 메커니즘 활용

```typescript
try { 
  parsed = JSON.parse(raw); 
} catch { 
  // Fallback to default emotion
  parsed = {
    primary: { emotion: defaultEmotion, score: 50, intensity: 50 },
    secondary: [],
    triggerWords: []
  };
}
```

---

## 📚 참고 자료

- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
- [Emotion Detection in NLP](https://arxiv.org/abs/2005.11882)
- [Multi-label Emotion Classification](https://aclanthology.org/2021.emnlp-main.406/)

---

## 🎉 다음 단계

- [ ] 감정 히스토리 차트 시각화
- [ ] 주간/월간 감정 리포트 자동 생성
- [ ] 감정 패턴 기반 인사이트 제공
- [ ] 음성 톤 분석 통합 (STT)
- [ ] 실시간 감정 변화 감지

---

## 📝 라이선스

MIT License - TodakTalk © 2025
