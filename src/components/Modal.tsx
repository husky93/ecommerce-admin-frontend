import React from 'react';
import styles from '../assets/styles/components/Modal.module.css';

interface ModalProps {
  isShown: boolean;
  children: React.ReactNode;
}

export const Modal: React.FC<ModalProps> = ({ isShown, children }) => {
  return (
    <div className={`${styles.overlay} ${isShown ? styles.visible : ''}`}>
      <div className={styles.modal}>{children}</div>
    </div>
  );
};
