# 토닥톡 디자인 시스템 가이드 🎨

## 목차
1. [개요](#개요)
2. [컬러 팔레트](#컬러-팔레트)
3. [타이포그래피](#타이포그래피)
4. [간격 시스템](#간격-시스템)
5. [사용 예제](#사용-예제)
6. [컴포넌트 스타일 가이드](#컴포넌트-스타일-가이드)

---

## 개요

토닥톡의 디자인 시스템은 일관된 사용자 경험과 효율적인 개발을 위해 설계되었습니다.
`src/styles/theme.css`에 정의된 CSS 변수를 사용하여 모든 스타일을 구현합니다.

---

## 컬러 팔레트

### Primary Colors (기본 색상)

```css
/* 배경색 */
--color-background: #FAF7F2;  /* 메인 배경 (베이지/크림색) */
--color-background-sub: #DDDDDD;  /* 서브 배경 (회색) */
--color-white: #FFFFFF;  /* 흰색 */

/* 텍스트 색상 */
--color-text: #1B2023;  /* 메인 텍스트 */
```

**사용 예시:**
```css
.my-container {
  background: var(--color-background);
  color: var(--color-text);
}
```

### Secondary Colors (포인트 색상)

```css
--color-point: #C1E6F1;  /* 포인트 컬러 (연한 청록색) */
--color-point-hover: #A7D8DE;  /* 포인트 컬러 호버 */
--color-secondary-gray: #66747F;  /* 회색 */
--color-secondary-purple: #D5BCFF;  /* 보라색 */
```

**사용 예시:**
```css
.highlight-button {
  background: var(--color-point);
}

.highlight-button:hover {
  background: var(--color-point-hover);
}
```

### Text Colors (텍스트 색상)

```css
--text-primary: #000000;     /* 주요 텍스트 */
--text-secondary: #666666;   /* 부가 텍스트 */
--text-tertiary: #999999;    /* 보조 텍스트 */
--text-disabled: #CCCCCC;    /* 비활성 텍스트 */
```

---

## 타이포그래피

### 폰트 패밀리

```css
--font-main: 'Noto Sans KR';        /* 메인 폰트 (깔끔하고 정돈된) */
--font-point: 'Spoqa Han Sans Neo'; /* 포인트 폰트 (모던하고 부드러운) */
--font-sub: 'IBM Plex Sans KR';     /* 서브 폰트 (이성적이고 분석적) */
--font-english: 'Work Sans';        /* 영어 폰트 (부드럽고 깔끔한) */
--font-number: 'Roboto Mono';       /* 숫자 폰트 (안정감 있는) */
```

### 폰트 크기

| 용도 | 변수명 | 크기 | 사용처 |
|------|--------|------|--------|
| h1 | `--font-size-h1` | 40px | 메인 제목 |
| Title | `--font-size-title` | 28px | 페이지 제목 |
| Subtitle | `--font-size-subtitle` | 20px | 서브 제목 |
| Content | `--font-size-content` | 16px | 본문 텍스트 |
| Subcontent | `--font-size-subcontent` | 14px | 작은 본문 |
| Caption | `--font-size-caption` | 12px | 캡션, 주석 |

### 폰트 굵기

```css
--font-weight-regular: 400;    /* 일반 */
--font-weight-medium: 500;     /* 중간 */
--font-weight-semibold: 600;   /* 세미볼드 */
--font-weight-bold: 700;       /* 볼드 */
--font-weight-extrabold: 800;  /* 엑스트라볼드 */
```

### 타이포그래피 클래스

미리 정의된 클래스를 사용하여 빠르게 스타일링할 수 있습니다:

```html
<h1 class="text-h1">메인 제목</h1>
<h2 class="text-title">페이지 제목</h2>
<h3 class="text-subtitle">서브 제목</h3>
<p class="text-content">본문 내용입니다.</p>
<small class="text-subcontent">작은 텍스트</small>
<span class="text-caption">캡션 텍스트</span>
```

**CSS 예시:**
```css
.my-heading {
  font-family: var(--font-main);
  font-size: var(--font-size-h1);
  font-weight: var(--font-weight-bold);
}
```

---

## 간격 시스템

### Spacing (여백)

```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 12px;
--spacing-lg: 16px;
--spacing-xl: 20px;
--spacing-2xl: 24px;
--spacing-3xl: 32px;
--spacing-4xl: 40px;
--spacing-5xl: 48px;
```

**사용 예시:**
```css
.card {
  padding: var(--spacing-2xl);
  margin-bottom: var(--spacing-lg);
  gap: var(--spacing-md);
}
```

### Border Radius (모서리)

```css
--radius-sm: 4px;     /* 작은 모서리 */
--radius-md: 8px;     /* 중간 모서리 */
--radius-lg: 12px;    /* 큰 모서리 */
--radius-xl: 16px;    /* 더 큰 모서리 */
--radius-2xl: 20px;   /* 매우 큰 모서리 */
--radius-full: 9999px; /* 완전 둥근 (원형) */
```

**사용 예시:**
```css
.button {
  border-radius: var(--radius-md);
}

.avatar {
  border-radius: var(--radius-full);
}
```

### Shadows (그림자)

```css
--shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
--shadow-md: 0 2px 8px rgba(0, 0, 0, 0.08);
--shadow-lg: 0 4px 16px rgba(0, 0, 0, 0.1);
--shadow-xl: 0 8px 24px rgba(0, 0, 0, 0.12);
--shadow-2xl: 0 16px 40px rgba(0, 0, 0, 0.15);
```

**사용 예시:**
```css
.card {
  box-shadow: var(--shadow-md);
}

.modal {
  box-shadow: var(--shadow-2xl);
}
```

### Transitions (애니메이션)

```css
--transition-fast: 150ms ease;   /* 빠른 전환 */
--transition-base: 250ms ease;   /* 기본 전환 */
--transition-slow: 350ms ease;   /* 느린 전환 */
--transition-all: all 0.3s ease; /* 모든 속성 전환 */
```

**사용 예시:**
```css
.button {
  transition: var(--transition-all);
}

.button:hover {
  transform: scale(1.05);
}
```

---

## 사용 예제

### 버튼 스타일

```css
.custom-button {
  /* 기본 스타일 */
  padding: var(--spacing-lg) var(--spacing-xl);
  border-radius: var(--radius-md);
  font-family: var(--font-main);
  font-size: var(--font-size-content);
  font-weight: var(--font-weight-medium);
  
  /* 컬러 */
  background: var(--color-point);
  color: var(--text-primary);
  border: 1px solid var(--color-border);
  
  /* 효과 */
  box-shadow: var(--shadow-sm);
  transition: var(--transition-all);
  cursor: pointer;
}

.custom-button:hover {
  background: var(--color-point-hover);
  box-shadow: var(--shadow-md);
  transform: translateY(-2px);
}
```

### 카드 컴포넌트

```css
.info-card {
  /* 레이아웃 */
  padding: var(--spacing-3xl);
  border-radius: var(--radius-lg);
  
  /* 배경 */
  background: var(--color-white);
  border: 1px solid var(--color-border);
  
  /* 효과 */
  box-shadow: var(--shadow-md);
  transition: var(--transition-all);
}

.info-card:hover {
  box-shadow: var(--shadow-lg);
  transform: translateY(-4px);
}

.info-card-title {
  font-family: var(--font-main);
  font-size: var(--font-size-title);
  font-weight: var(--font-weight-bold);
  color: var(--text-primary);
  margin-bottom: var(--spacing-lg);
}

.info-card-content {
  font-family: var(--font-main);
  font-size: var(--font-size-content);
  color: var(--text-secondary);
  line-height: var(--line-height-relaxed);
}
```

### 입력 필드

```css
.input-field {
  /* 기본 스타일 */
  padding: var(--spacing-lg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  
  /* 타이포그래피 */
  font-family: var(--font-main);
  font-size: var(--font-size-content);
  color: var(--text-primary);
  
  /* 배경 */
  background: var(--color-white);
  
  /* 애니메이션 */
  transition: var(--transition-all);
}

.input-field:focus {
  outline: none;
  border-color: var(--color-point);
  box-shadow: 0 0 0 3px rgba(193, 230, 241, 0.2);
}

.input-field::placeholder {
  color: var(--text-disabled);
}
```

---

## 컴포넌트 스타일 가이드

### 유틸리티 클래스 사용

테마에는 바로 사용할 수 있는 유틸리티 클래스가 포함되어 있습니다:

```html
<!-- 배경색 -->
<div class="bg-primary">주요 배경</div>
<div class="bg-white">흰색 배경</div>
<div class="bg-point">포인트 배경</div>

<!-- 텍스트 색상 -->
<p class="text-primary">주요 텍스트</p>
<p class="text-secondary">부가 텍스트</p>
<p class="text-tertiary">보조 텍스트</p>

<!-- 그림자 -->
<div class="shadow-sm">작은 그림자</div>
<div class="shadow-md">중간 그림자</div>
<div class="shadow-lg">큰 그림자</div>

<!-- 모서리 -->
<div class="rounded-sm">작은 모서리</div>
<div class="rounded-md">중간 모서리</div>
<div class="rounded-lg">큰 모서리</div>
<div class="rounded-full">완전 둥근</div>

<!-- 전환 효과 -->
<div class="transition-all">모든 속성 전환</div>

<!-- 카드 -->
<div class="card">카드 컴포넌트</div>

<!-- 버튼 -->
<button class="btn btn-point">포인트 버튼</button>
<button class="btn btn-outline">아웃라인 버튼</button>
```

---

## 반응형 디자인

### Breakpoints

```css
--breakpoint-sm: 640px;   /* 모바일 */
--breakpoint-md: 768px;   /* 태블릿 */
--breakpoint-lg: 1024px;  /* 데스크탑 */
--breakpoint-xl: 1280px;  /* 큰 데스크탑 */
```

**사용 예시:**
```css
@media (max-width: 768px) {
  .container {
    padding: var(--spacing-lg);
  }
  
  .text-h1 {
    font-size: var(--font-size-title);
  }
}
```

---

## Z-Index 스케일

레이어 순서를 일관되게 유지하기 위한 z-index 값:

```css
--z-base: 1;
--z-dropdown: 100;
--z-sticky: 200;
--z-fixed: 300;
--z-modal-backdrop: 400;
--z-modal: 500;
--z-popover: 600;
--z-tooltip: 700;
```

**사용 예시:**
```css
.modal {
  z-index: var(--z-modal);
}

.tooltip {
  z-index: var(--z-tooltip);
}
```

---

## 베스트 프랙티스

### ✅ 좋은 예

```css
/* CSS 변수 사용 */
.my-component {
  background: var(--color-background);
  padding: var(--spacing-2xl);
  border-radius: var(--radius-lg);
  color: var(--text-primary);
}

/* 미리 정의된 클래스 사용 */
<h1 class="text-h1">제목</h1>
<div class="card shadow-md">내용</div>
```

### ❌ 나쁜 예

```css
/* 하드코딩된 값 사용 (지양) */
.my-component {
  background: #FAF7F2;
  padding: 24px;
  border-radius: 12px;
  color: #000000;
}
```

---

## 추가 리소스

- 폰트 가이드: `FONT_GUIDE.md`
- 컬러 시스템: `COLOR_SYSTEM.md`
- 컴포넌트 라이브러리: `COMPONENTS.md`

---

**마지막 업데이트:** 2025-11-06  
**버전:** 1.0.0

