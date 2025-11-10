# 🎨 토닥톡 버튼 디자인 시스템

토닥톡 프로젝트의 통일된 버튼 디자인 시스템입니다.

---

## 📦 설치 방법

```tsx
// main.tsx 또는 App.tsx에 추가
import './styles/buttons.css';
```

---

## 🎯 버튼 타입

### 1. Primary Button - 주요 액션
가장 중요한 액션에 사용합니다.

```tsx
<button className="btn-primary">확인</button>
<button className="btn-primary btn-sm">작은 버튼</button>
<button className="btn-primary btn-lg">큰 버튼</button>
<button className="btn-primary btn-full">전체 너비</button>
<button className="btn-primary" disabled>비활성화</button>
```

**사용 예시**:
- 로그인/회원가입 제출
- 저장/확인
- 다음 단계로 이동

---

### 2. Secondary Button - 보조 액션
부가적인 액션이나 취소에 사용합니다.

```tsx
<button className="btn-secondary">취소</button>
<button className="btn-secondary btn-sm">작은 보조</button>
```

**사용 예시**:
- 취소
- 뒤로 가기
- 추가 옵션

---

### 3. Tertiary Button - 최소 스타일
덜 중요한 액션이나 링크 대체용입니다.

```tsx
<button className="btn-tertiary">더 보기</button>
```

**사용 예시**:
- 더 보기
- 건너뛰기
- 도움말

---

### 4. Danger Button - 위험한 액션
삭제나 취소 같은 위험한 액션에 사용합니다.

```tsx
<button className="btn-danger">삭제</button>
```

**사용 예시**:
- 삭제
- 계정 탈퇴
- 취소 확정

---

### 5. Success Button - 긍정적 액션
완료나 성공을 나타내는 액션에 사용합니다.

```tsx
<button className="btn-success">완료</button>
```

**사용 예시**:
- 완료
- 저장 성공
- 제출 완료

---

### 6. Icon Button - 아이콘 전용
아이콘만 표시하는 원형 버튼입니다.

```tsx
<button className="btn-icon">⚙️</button>
<button className="btn-icon btn-icon-lg">➕</button>
<button className="btn-icon btn-icon-sm">✕</button>
```

**사용 예시**:
- 설정 버튼
- 닫기 버튼
- 좋아요 버튼

---

### 7. Pill Button - 태그/필터용
태그나 필터 선택에 사용하는 알약 모양 버튼입니다.

```tsx
<button className="btn-pill">전체</button>
<button className="btn-pill active">진행중</button>
```

**사용 예시**:
- 카테고리 필터
- 상태 필터
- 태그 선택

---

### 8. Soft Button - 부드러운 느낌
부드럽고 편안한 느낌의 버튼입니다.

```tsx
<button className="btn-soft">기본</button>
<button className="btn-soft-purple">보라색</button>
```

**사용 예시**:
- 카드 내 액션
- 부드러운 UI
- 정보성 버튼

---

### 9. Glass Button - 모던한 느낌
유리 같은 투명한 느낌의 모던한 버튼입니다.

```tsx
<button className="btn-glass">Glass</button>
```

**사용 예시**:
- 배경 이미지 위
- 모던한 UI
- 히어로 섹션

---

### 10. Emotion Button - 감정 표현
감정별 색상이 적용된 특별한 버튼입니다.

```tsx
<button className="btn-emotion happy">😊 기쁨</button>
<button className="btn-emotion sad">😢 슬픔</button>
<button className="btn-emotion angry">😠 분노</button>
<button className="btn-emotion calm">😌 평온</button>
```

**사용 예시**:
- 감정 선택
- 기분 기록
- 감정 필터

---

### 11. FAB (Floating Action Button)
화면 하단에 고정되는 플로팅 버튼입니다.

```tsx
<button className="btn-fab">✏️</button>
```

**사용 예시**:
- 새 글 작성
- 빠른 액션
- 메인 액션

---

## 🎨 크기 변형

```tsx
<button className="btn-primary btn-sm">작음</button>
<button className="btn-primary">기본</button>
<button className="btn-primary btn-lg">큼</button>
<button className="btn-primary btn-full">전체 너비</button>
```

---

## 📐 버튼 그룹

### 가로 그룹
```tsx
<div className="btn-group">
  <button className="btn-secondary">취소</button>
  <button className="btn-primary">확인</button>
</div>
```

### 세로 그룹
```tsx
<div className="btn-group-vertical">
  <button className="btn-primary">옵션 1</button>
  <button className="btn-primary">옵션 2</button>
</div>
```

### 전체 너비 그룹
```tsx
<div className="btn-group-full">
  <button className="btn-secondary">취소</button>
  <button className="btn-primary">확인</button>
</div>
```

---

## ⚡ 상태 표시

### 로딩 상태
```tsx
<button className="btn-primary btn-loading">처리 중...</button>
```

### 비활성화 상태
```tsx
<button className="btn-primary" disabled>비활성화</button>
```

---

## 🎯 사용 예시

### 로그인 페이지
```tsx
<form onSubmit={handleLogin}>
  <input type="email" placeholder="이메일" />
  <input type="password" placeholder="비밀번호" />
  
  <button 
    type="submit" 
    className="btn-primary btn-full"
    disabled={loading}
  >
    {loading ? (
      <span className="btn-loading">로그인 중...</span>
    ) : (
      '로그인'
    )}
  </button>
  
  <div className="btn-group" style={{ marginTop: '16px' }}>
    <button type="button" className="btn-secondary">
      회원가입
    </button>
    <button type="button" className="btn-tertiary">
      비밀번호 찾기
    </button>
  </div>
</form>
```

### 프로필 편집
```tsx
<div className="profile-edit">
  <button className="btn-icon">
    ✏️
  </button>
  
  <div className="btn-group-full" style={{ marginTop: '24px' }}>
    <button className="btn-secondary" onClick={handleCancel}>
      취소
    </button>
    <button className="btn-primary" onClick={handleSave}>
      저장
    </button>
  </div>
</div>
```

### 감정 선택
```tsx
<div className="emotion-selector">
  <button 
    className={`btn-emotion happy ${selected === 'happy' ? 'active' : ''}`}
    onClick={() => setSelected('happy')}
  >
    😊 기쁨
  </button>
  <button 
    className={`btn-emotion sad ${selected === 'sad' ? 'active' : ''}`}
    onClick={() => setSelected('sad')}
  >
    😢 슬픔
  </button>
</div>
```

### 목표 필터
```tsx
<div className="goal-filters">
  <button className={`btn-pill ${filter === 'all' ? 'active' : ''}`}>
    전체
  </button>
  <button className={`btn-pill ${filter === 'progress' ? 'active' : ''}`}>
    진행중
  </button>
  <button className={`btn-pill ${filter === 'complete' ? 'active' : ''}`}>
    완료
  </button>
</div>
```

### 삭제 확인 모달
```tsx
<div className="modal">
  <h3>정말 삭제하시겠습니까?</h3>
  <p>이 작업은 되돌릴 수 없습니다.</p>
  
  <div className="btn-group-full">
    <button className="btn-secondary" onClick={handleClose}>
      취소
    </button>
    <button className="btn-danger" onClick={handleDelete}>
      삭제
    </button>
  </div>
</div>
```

---

## 🎨 색상 가이드

| 버튼 타입 | 색상 | 용도 |
|----------|------|------|
| Primary | `#C1E6F1` → `#B5D9E8` | 주요 액션 |
| Secondary | 흰색 + 테두리 | 보조 액션 |
| Danger | `#FF6B6B` → `#EE5A52` | 위험한 액션 |
| Success | `#69F0AE` → `#4CAF50` | 긍정적 액션 |
| Purple | `#D5BCFF` → `#C8A9E8` | 특별한 액션 |

---

## ♿ 접근성

- **키보드 탐색**: 모든 버튼은 Tab 키로 접근 가능
- **포커스 표시**: `focus-visible`로 명확한 포커스 표시
- **고대비 모드**: 자동 테두리 추가
- **모션 감소**: `prefers-reduced-motion` 지원

---

## 📱 반응형

- **모바일 (< 768px)**: 버튼 패딩과 폰트 크기 자동 조정
- **버튼 그룹**: 모바일에서 자동으로 세로 배치

---

## 🎬 데모

`button-showcase.html` 파일을 브라우저로 열어서 모든 버튼 스타일을 확인할 수 있습니다.

```bash
open button-showcase.html
```

---

## 💡 팁

### 1. 일관성 유지
- Primary는 페이지당 1개만 사용
- 중요도에 따라 Primary > Secondary > Tertiary 순서

### 2. 로딩 상태
```tsx
const [loading, setLoading] = useState(false);

<button 
  className={`btn-primary ${loading ? 'btn-loading' : ''}`}
  disabled={loading}
>
  {loading ? '처리 중...' : '확인'}
</button>
```

### 3. 아이콘 + 텍스트
```tsx
<button className="btn-primary">
  <span>✏️</span>
  <span style={{ marginLeft: '8px' }}>글쓰기</span>
</button>
```

### 4. 조건부 스타일
```tsx
<button 
  className={`
    btn-primary 
    ${isLarge ? 'btn-lg' : ''} 
    ${isFullWidth ? 'btn-full' : ''}
  `}
>
  버튼
</button>
```

---

## 🚀 마이그레이션 가이드

### 기존 버튼을 새 디자인으로 교체

**Before:**
```tsx
<button style={{ 
  background: '#C1E6F1', 
  padding: '16px 32px',
  borderRadius: '16px'
}}>
  확인
</button>
```

**After:**
```tsx
<button className="btn-primary">확인</button>
```

---

**작성**: GitHub Copilot  
**버전**: 1.0.0  
**업데이트**: 2025년 11월 9일
