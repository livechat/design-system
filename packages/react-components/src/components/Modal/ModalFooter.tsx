import React from 'react';
interface ModalFooterProps {
  children: React.ReactNode;
  className?: string;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({
  children,
  className = '',
}) => {
  return <div className={className}>{children}</div>;
};
