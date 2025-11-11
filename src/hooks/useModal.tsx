// useModal.tsx - 커스텀 모달 훅
import { useState, useCallback } from 'react';
import CustomModal from '../components/CustomModal';
import type { CustomModalProps } from '../components/CustomModal';

type ModalConfig = Omit<CustomModalProps, 'onConfirm' | 'onCancel'>;

export function useModal() {
  const [modalConfig, setModalConfig] = useState<ModalConfig | null>(null);
  const [resolvePromise, setResolvePromise] = useState<((value: boolean) => void) | null>(null);

  // Alert 함수
  const showAlert = useCallback((message: string, title?: string, icon?: string) => {
    return new Promise<void>((resolve) => {
      setModalConfig({
        message,
        title,
        icon: icon || '✓',
        type: 'alert',
        confirmText: '확인'
      });
      setResolvePromise(() => () => {
        setModalConfig(null);
        resolve();
      });
    });
  }, []);

  // Confirm 함수
  const showConfirm = useCallback((message: string, title?: string, icon?: string) => {
    return new Promise<boolean>((resolve) => {
      setModalConfig({
        message,
        title,
        icon: icon || '✓',
        type: 'confirm',
        confirmText: '네',
        cancelText: '아니오'
      });
      setResolvePromise(() => (value: boolean) => {
        setModalConfig(null);
        resolve(value);
      });
    });
  }, []);

  const handleConfirm = useCallback(() => {
    if (resolvePromise) {
      resolvePromise(true);
    }
  }, [resolvePromise]);

  const handleCancel = useCallback(() => {
    if (resolvePromise) {
      resolvePromise(false);
    }
  }, [resolvePromise]);

  const ModalContainer = useCallback(() => {
    if (!modalConfig) return null;

    return (
      <CustomModal
        {...modalConfig}
        onConfirm={handleConfirm}
        onCancel={modalConfig.type === 'confirm' ? handleCancel : undefined}
      />
    );
  }, [modalConfig, handleConfirm, handleCancel]);

  return {
    showAlert,
    showConfirm,
    ModalContainer
  };
}
