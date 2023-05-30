import React from 'react';
import styles from './Modal.module.scss';
import { Button, ButtonProps } from '../Button';

export type ModalButtonOptions = Pick<
  ButtonProps,
  'children' | 'kind' | 'onClick' | 'size'
>;

export interface IModalFooterProps {
  buttons?: ModalButtonOptions[];
  children?: React.ReactNode;
}

const baseClass = 'modal';

export const NewModalFooter: React.FC<IModalFooterProps> = ({
  children,
  buttons = [],
}) => {
  return (
    <div className={styles[`${baseClass}__footer`]}>
      {children && (
        <div className={styles[`${baseClass}__label-footer`]}>{children}</div>
      )}
      {buttons && (
        <div className={styles[`${baseClass}__buttons`]}>
          {buttons.map((buttonProps, index) => (
            <Button key={index} {...buttonProps} />
          ))}
        </div>
      )}
    </div>
  );
};

export default NewModalFooter;
