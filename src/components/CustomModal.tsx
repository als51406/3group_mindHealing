// CustomModal.tsx - 커스텀 모달 (alert, confirm 대체)
import { useEffect } from 'react';
import './CustomModal.css';

export interface CustomModalProps {
  title?: string;
  message: string;
  type?: 'alert' | 'confirm';
  icon?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel?: () => void;
}

export default function CustomModal({
  title,
  message,
  type = 'alert',
  icon = '✓',
  confirmText = '네',
  cancelText = '아니오',
  onConfirm,
  onCancel
}: CustomModalProps) {
  
  useEffect(() => {
    // ESC 키로 모달 닫기 (취소 동작)
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (type === 'confirm' && onCancel) {
          onCancel();
        } else {
          onConfirm();
        }
      }
    };

    // Enter 키로 확인
    const handleEnter = (e: KeyboardEvent) => {
      if (e.key === 'Enter') {
        onConfirm();
      }
    };

    document.addEventListener('keydown', handleEsc);
    document.addEventListener('keydown', handleEnter);
    
    // 모달 열릴 때 body 스크롤 방지
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.removeEventListener('keydown', handleEnter);
      document.body.style.overflow = '';
    };
  }, [type, onConfirm, onCancel]);

  return (
    <div className="custom-modal-overlay" onClick={type === 'alert' ? onConfirm : onCancel}>
      <div className="custom-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* 아이콘 */}
        <div className="custom-modal-icon">
          {icon}
        </div>

        {/* 제목 (선택적) */}
        {title && (
          <div className="custom-modal-title">
            {title}
          </div>
        )}

        {/* 메시지 */}
        <div className="custom-modal-message">
          {message}
        </div>

        {/* 버튼 영역 */}
        <div className="custom-modal-actions">
          {type === 'confirm' && onCancel && (
            <button
              className="custom-modal-btn btn-cancel"
              onClick={onCancel}
            >
              {cancelText}
            </button>
          )}
          <button
            className="custom-modal-btn btn-confirm"
            onClick={onConfirm}
            autoFocus
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
