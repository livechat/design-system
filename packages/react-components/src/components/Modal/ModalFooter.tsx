import React from 'react';
import cx from 'clsx';
import styles from './Modal.module.scss';

const baseClass = 'modal';

interface ModalFooterProps {
  children: React.ReactNode;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({ children }) => {
  return <div className={styles[`${baseClass}__footer`]}>{children}</div>;
};
