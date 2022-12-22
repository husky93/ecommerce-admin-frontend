import React from 'react';
import styles from '../assets/styles/components/Modal.module.css';

interface ModalProps {
  handleClose: React.MouseEventHandler<HTMLDivElement>;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ handleClose, children }) => {
  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

export default Modal;
