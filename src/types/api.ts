// API 응답 타입 정의

export interface DiarySessionResponse {
  _id: string;
  date: string;
  title?: string;
  mood?: { emotion: string; score: number; color: string } | null;
  lastUpdatedAt: string;
  preview?: string;
}

export interface DiaryMessageResponse {
  id?: string;
  role: 'user' | 'assistant';
  content: string;
  createdAt?: string;
}

export interface DiarySessionsApiResponse {
  items: DiarySessionResponse[];
}

export interface DiarySessionDetailApiResponse {
  session: DiarySessionResponse;
  messages: DiaryMessageResponse[];
}

