// Skeleton.tsx — 로딩 상태를 위한 스켈레톤 UI 컴포넌트
import './Skeleton.css';

interface SkeletonProps {
    width?: string | number;
    height?: string | number;
    borderRadius?: string | number;
    style?: React.CSSProperties;
}

export function Skeleton({ width = '100%', height = 20, borderRadius = 8, style = {} }: SkeletonProps) {
    return (
        <div
            className="skeleton"
            style={{
                width: typeof width === 'number' ? `${width}px` : width,
                height: typeof height === 'number' ? `${height}px` : height,
                borderRadius: typeof borderRadius === 'number' ? `${borderRadius}px` : borderRadius,
                ...style,
            }}
        />
    );
}

// 채팅 메시지 스켈레톤
export function ChatMessageSkeleton({ isUser = false }: { isUser?: boolean }) {
    return (
        <div
            style={{
                display: 'flex',
                justifyContent: isUser ? 'flex-end' : 'flex-start',
                marginBottom: 8,
                gap: 8,
            }}
        >
            {!isUser && <Skeleton width={28} height={28} borderRadius="50%" />}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxWidth: '70%' }}>
                <Skeleton width={isUser ? 200 : 240} height={40} borderRadius={16} />
            </div>
            {isUser && <Skeleton width={28} height={28} borderRadius="50%" />}
        </div>
    );
}

// 다이어리 목록 아이템 스켈레톤
export function DiaryListItemSkeleton() {
    return (
        <div
            style={{
                padding: '8px 10px',
                borderRadius: 8,
                border: '1px solid #e5e7eb',
                background: '#fff',
            }}
        >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <Skeleton width={16} height={16} borderRadius="50%" />
                <Skeleton width={120} height={16} />
            </div>
            <Skeleton width="80%" height={12} style={{ marginTop: 8 }} />
        </div>
    );
}

// 여러 개의 채팅 메시지 스켈레톤
export function ChatLoadingSkeleton() {
    return (
        <div style={{ padding: 12 }}>
            <ChatMessageSkeleton isUser={false} />
            <ChatMessageSkeleton isUser={true} />
            <ChatMessageSkeleton isUser={false} />
            <ChatMessageSkeleton isUser={true} />
        </div>
    );
}

// 다이어리 목록 스켈레톤
export function DiaryListSkeleton() {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
            <DiaryListItemSkeleton />
            <DiaryListItemSkeleton />
            <DiaryListItemSkeleton />
            <DiaryListItemSkeleton />
        </div>
    );
}

