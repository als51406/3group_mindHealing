# 고객센터 문의하기 API 가이드

**작성일**: 2025년 1월 10일  
**작성자**: GitHub Copilot

## 📋 개요

사용자별로 문의 내역을 관리할 수 있는 고객센터 API가 구현되었습니다.

## 🎯 구현된 기능

### 1. 문의하기 (POST)
- 사용자가 1:1 문의를 등록할 수 있습니다
- 자동으로 사용자 정보(닉네임, 이메일)가 입력됩니다
- 문의 카테고리 선택 가능

### 2. 내 문의 내역 조회 (GET)
- 로그인한 사용자의 문의 내역만 조회
- 최신순으로 정렬
- 답변 대기/완료 상태 표시

### 3. 문의 상세 조회 (GET)
- 특정 문의의 상세 내용과 답변 확인
- 본인의 문의만 조회 가능

## 🔌 API 엔드포인트

### 1. POST /api/support/inquiry
**설명**: 새로운 문의 등록

**인증**: 필수 (authMiddleware)

**Request Body**:
```json
{
  "name": "홍길동",
  "email": "user@example.com",
  "category": "일반문의",
  "title": "서비스 이용 문의",
  "content": "문의 내용..."
}
```

**카테고리 옵션**:
- 일반문의
- 서비스이용
- 기술지원
- 계정문의
- 제안/피드백
- 기타

**Response (성공)**:
```json
{
  "ok": true,
  "message": "문의가 성공적으로 접수되었습니다.",
  "inquiryId": "507f1f77bcf86cd799439011"
}
```

**Response (실패)**:
```json
{
  "message": "모든 필드를 입력해주세요."
}
```

### 2. GET /api/support/inquiries
**설명**: 내 문의 내역 조회

**인증**: 필수 (authMiddleware)

**Response**:
```json
{
  "ok": true,
  "inquiries": [
    {
      "id": "507f1f77bcf86cd799439011",
      "category": "일반문의",
      "title": "서비스 이용 문의",
      "content": "문의 내용...",
      "status": "waiting",
      "date": "2025-01-10",
      "answer": null,
      "createdAt": "2025-01-10T12:00:00.000Z",
      "answeredAt": null
    }
  ]
}
```

**status 값**:
- `waiting`: 답변 대기중
- `answered`: 답변 완료

### 3. GET /api/support/inquiry/:id
**설명**: 특정 문의 상세 조회

**인증**: 필수 (authMiddleware)

**Parameters**:
- `id`: 문의 ID (MongoDB ObjectId)

**Response**:
```json
{
  "ok": true,
  "inquiry": {
    "id": "507f1f77bcf86cd799439011",
    "category": "일반문의",
    "title": "서비스 이용 문의",
    "content": "문의 내용...",
    "status": "answered",
    "date": "2025-01-10",
    "answer": "답변 내용...",
    "createdAt": "2025-01-10T12:00:00.000Z",
    "answeredAt": "2025-01-10T14:00:00.000Z"
  }
}
```

## 🗄️ 데이터베이스 구조

### Collection: `support_inquiries`

```typescript
{
  _id: ObjectId,
  userId: string,              // 문의한 사용자 ID
  name: string,                // 사용자 이름/닉네임
  email: string,               // 사용자 이메일
  category: string,            // 문의 카테고리
  title: string,               // 문의 제목
  content: string,             // 문의 내용
  status: 'waiting' | 'answered',  // 답변 상태
  answer: string | null,       // 답변 내용
  createdAt: Date,             // 문의 작성일
  answeredAt: Date | null      // 답변 작성일
}
```

### 인덱스

1. **사용자별 조회 인덱스**:
   ```javascript
   { userId: 1, createdAt: -1 }
   ```
   - 사용자의 문의 내역을 최신순으로 빠르게 조회

2. **관리자용 상태별 조회 인덱스**:
   ```javascript
   { status: 1, createdAt: -1 }
   ```
   - 답변 대기 중인 문의를 빠르게 찾기

## 📱 프론트엔드 사용법

### 문의하기 예시

```tsx
const handleSubmit = async (formData) => {
  try {
    const response = await fetch('/api/support/inquiry', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(formData)
    });

    const data = await response.json();

    if (response.ok) {
      alert('문의가 접수되었습니다!');
    } else {
      alert(data.message);
    }
  } catch (error) {
    console.error('문의 접수 오류:', error);
  }
};
```

### 문의 내역 조회 예시

```tsx
useEffect(() => {
  const fetchInquiries = async () => {
    try {
      const response = await fetch('/api/support/inquiries', {
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        setInquiries(data.inquiries);
      }
    } catch (error) {
      console.error('문의 내역 조회 오류:', error);
    }
  };

  fetchInquiries();
}, []);
```

## 🎨 UI/UX 특징

### 문의하기 폼
- ✅ 사용자 정보 자동 입력 (닉네임, 이메일)
- ✅ 6가지 카테고리 선택
- ✅ 실시간 입력 검증
- ✅ 제출 중 로딩 상태 표시
- ✅ 성공/실패 메시지 표시

### 문의 내역
- ✅ 답변 대기/완료 상태 뱃지
- ✅ 카테고리 태그 표시
- ✅ 아코디언 형태로 상세 내용 토글
- ✅ 답변 있는 경우 하이라이트 표시
- ✅ 빈 상태 안내 메시지

### 반응형 디자인
- 모바일/태블릿/데스크톱 대응
- 터치 친화적 버튼 크기
- 가독성 높은 텍스트 크기

## 🔒 보안 고려사항

### 1. 인증 필수
- 모든 API는 `authMiddleware`를 통해 인증 확인
- 로그인하지 않은 사용자는 접근 불가

### 2. 권한 검증
- 사용자는 본인의 문의만 조회 가능
- userId를 기반으로 필터링

### 3. 입력 검증
- 모든 필수 필드 검증
- ObjectId 유효성 검증

## 📊 통계 및 모니터링

### 관리자용 기능 (추후 구현 가능)

1. **대시보드**:
   ```javascript
   // 답변 대기 중인 문의 수
   await db.collection('support_inquiries')
     .countDocuments({ status: 'waiting' });
   
   // 카테고리별 문의 수
   await db.collection('support_inquiries')
     .aggregate([
       { $group: { _id: '$category', count: { $sum: 1 } } }
     ]);
   ```

2. **답변하기 API** (추가 필요):
   ```typescript
   PATCH /api/admin/support/inquiry/:id
   {
     "answer": "답변 내용...",
     "status": "answered"
   }
   ```

## 🚀 향후 개선 사항

### 1. 실시간 알림
- [ ] 답변 완료 시 이메일 알림
- [ ] 답변 완료 시 푸시 알림
- [ ] 관리자 대시보드에 실시간 알림

### 2. 파일 첨부
- [ ] 이미지 첨부 기능
- [ ] 파일 업로드 (스크린샷 등)
- [ ] 첨부 파일 다운로드

### 3. 관리자 기능
- [ ] 관리자 대시보드
- [ ] 답변 작성 인터페이스
- [ ] 문의 검색 및 필터링
- [ ] 통계 및 리포트

### 4. 추가 기능
- [ ] 문의 수정/삭제
- [ ] 문의 상태 추적 (접수 → 확인 → 처리중 → 완료)
- [ ] FAQ 자동 매칭 (유사 문의 제안)
- [ ] 평점 및 피드백 시스템

## 🧪 테스트

### 수동 테스트 체크리스트

- [ ] 문의하기 폼 제출 성공
- [ ] 필수 필드 미입력 시 에러 메시지
- [ ] 문의 내역 정상 표시
- [ ] 문의 상세 내용 토글 동작
- [ ] 로그인하지 않은 상태에서 접근 차단
- [ ] 다른 사용자의 문의 조회 차단

### API 테스트 (curl)

```bash
# 1. 문의하기
curl -X POST http://localhost:7780/api/support/inquiry \
  -H "Content-Type: application/json" \
  -H "Cookie: token=YOUR_TOKEN" \
  -d '{
    "name": "홍길동",
    "email": "test@example.com",
    "category": "일반문의",
    "title": "테스트 문의",
    "content": "테스트 문의 내용입니다."
  }'

# 2. 문의 내역 조회
curl -X GET http://localhost:7780/api/support/inquiries \
  -H "Cookie: token=YOUR_TOKEN"

# 3. 문의 상세 조회
curl -X GET http://localhost:7780/api/support/inquiry/INQUIRY_ID \
  -H "Cookie: token=YOUR_TOKEN"
```

## 📝 참고 사항

### 환경 변수
- `MONGO_URI`: MongoDB 연결 문자열
- `DB_NAME`: 데이터베이스 이름 (기본: myapp_3g)
- `JWT_SECRET`: JWT 토큰 시크릿 키

### 로깅
서버는 다음 정보를 콘솔에 출력합니다:
```
✉️ 문의 접수: userId=..., email=..., category=..., title=...
```

### 에러 처리
모든 API는 try-catch로 에러를 처리하며, 클라이언트에 적절한 에러 메시지를 반환합니다.

---

**문의**: 추가 기능이나 개선사항이 필요하시면 말씀해주세요!
