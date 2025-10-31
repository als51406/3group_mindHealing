// Home.tsx
// 토닥톡 홈페이지에 접속했을 때 첫 화면입니다.
// AI와 대화할 수 있습니다.

import { useState } from 'react';
import type { FormEvent } from 'react';
import Chat from './Chat';

export default function Home() {

    const [showChatModal, setShowChatModal] = useState(false);

    // (단순화) 첫 입력 → /chat 라우팅으로 변경됨

    // firstChat: 처음으로 input에서 Enter를 눌렀을 때
    const firstChat = (event: FormEvent<HTMLFormElement>) => {
        // 새로고침 방지
        event.preventDefault();
        // 모달로 Chat 열기
        setShowChatModal(true);
    }

    // (미사용) 이전 단계 핸들러 제거

    // (단순화) 저장 팝업 제거

    return (
        <>
        <div id="homeWrap" style={{ width: '100%', minHeight: 'calc(100vh - 56px)', display: 'grid', placeItems: 'center', background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)' }}>
            <div className="mainview" style={{ width: 'min(720px, 92%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: '#111827' }}>오늘 하루는 어땠나요?</div>
                    <div style={{ fontSize: 16, color: '#4b5563', marginTop: 6 }}>당신의 이야기를 들려주세요</div>
                </div>
                <form onSubmit={firstChat} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
                    <input
                        placeholder="한 줄로 시작해 보세요…"
                        style={{
                            width: '100%', maxWidth: 540,
                            padding: '12px 16px',
                            borderRadius: 999,
                            border: '1px solid #e5e7eb',
                            background: '#fff',
                            boxShadow: 'inset 0 2px 6px rgba(0,0,0,0.04)',
                            outline: 'none'
                        }}
                    />
                </form>
                {/* Chat modal */}
                {showChatModal && (
                    <div style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 60 }}>
                        <div onClick={() => setShowChatModal(false)} style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.4)' }} />
                        <div style={{ position: 'relative', width: 'min(920px, 96%)', maxHeight: '92vh', background: '#fff', borderRadius: 12, boxShadow: '0 20px 40px rgba(2,6,23,0.25)', overflow: 'auto' }}>
                            <div style={{ display: 'flex', justifyContent: 'flex-end', padding: 8 }}>
                                <button onClick={() => setShowChatModal(false)} style={{ border: 'none', background: 'transparent', fontSize: 18, cursor: 'pointer' }}>✕</button>
                            </div>
                            <div style={{ padding: 8 }}>
                                <Chat />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
        </>
    )
}