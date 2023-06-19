import React from 'react';
import cx from 'clsx';
import styles from './Modal.module.scss';

const baseClass = 'modal-footer';

interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  className = '',
}) => {
  const mergedClassNames = cx(styles[baseClass], className);
  return <div className={mergedClassNames}>{children}</div>;
};
