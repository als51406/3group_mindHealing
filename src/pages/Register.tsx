// Register.tsx
// 회원가입 페이지입니다.

import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Register() {

    // navigate: 페이지를 이동할 때 사용
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // back: 뒤로가기 버튼
    const back = () => {

        // 페이지 이동("경로");
        navigate("/");
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        if (!email || !password) {
            setError("이메일과 비밀번호를 입력하세요.");
            return;
        }
        try {
            setLoading(true);
            const res = await fetch("/api/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ email, password })
            });
            if (!res.ok) {
                const msg = (await res.json().catch(() => ({})))?.message || "회원가입에 실패했습니다.";
                throw new Error(msg);
            }
            navigate("/login");
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : "네트워크 오류가 발생했습니다.";
            setError(errorMessage);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ width: '100%', minHeight: 'calc(100vh - 56px)', display: 'grid', placeItems: 'center', background: 'linear-gradient(180deg, #f9fafb 0%, #eef2ff 100%)' }}>
            <div style={{ width: 'min(420px, 92%)', background: '#fff', border: '1px solid #e5e7eb', borderRadius: 12, padding: 20, boxShadow: '0 10px 30px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: 18, fontWeight: 800, marginBottom: 12 }}>회원가입</div>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <label style={{ fontSize: 12, color: '#374151' }}>이메일</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        required
                        style={{ padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 8 }}
                    />
                    <label style={{ fontSize: 12, color: '#374151' }}>비밀번호</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="••••••••"
                        required
                        style={{ padding: '10px 12px', border: '1px solid #e5e7eb', borderRadius: 8 }}
                    />
                    {error && <div style={{ color: '#b91c1c', fontSize: 13 }}>{error}</div>}
                    <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                        <button type="submit" disabled={loading} style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #2563eb', background: loading ? '#93c5fd' : '#2563eb', color: '#fff', cursor: loading ? 'not-allowed' : 'pointer', flex: 1 }}>{loading ? '가입 중...' : '가입하기'}</button>
                        <button type="button" onClick={back} style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid #d1d5db', background: '#f9fafb', flex: 1 }}>뒤로</button>
                    </div>
                </form>
            </div>
        </div>
    )
}