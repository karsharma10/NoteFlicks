import React, { useEffect, useRef } from 'react';
import styles from './core.module.css';

interface ModalProps {
  isOpen: boolean;
  children: any;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, children, onClose }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [isOpen, onClose]);

  return isOpen ? (
    <div className={styles.modalBackdrop}>
      <div className={styles.modalContent} ref={modalRef}>
        {children}
      </div>
    </div>
  ) : null;
};

export default Modal;
