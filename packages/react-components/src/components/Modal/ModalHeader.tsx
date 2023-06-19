import React from 'react';
import cx from 'clsx';
import { Heading } from '../Typography';
import { Icon, IconSource } from '../Icon';

import { ModalCloseButton } from './ModalCloseButton';
import styles from './Modal.module.scss';

const baseClass = 'modal-header';

interface ModalHeaderProps {
  headerType?: 'labelHeading' | 'heading';
  title?: React.ReactNode;
  icon?: IconSource;
  onClose: () => void;
  children?: React.ReactNode;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  headerType = 'heading',
  title,
  icon,
  onClose,
  children,
}) => {
  const onCloseButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onClose();
  };

  if (headerType === 'labelHeading') {
    return (
      <div className={styles[`${baseClass}__label-header`]}>
        <Heading
          size="xs"
          as="div"
          className={styles[`${baseClass}__label-heading`]}
        >
          <div className="heading-wrapper">
            {icon && (
              <Icon
                className={styles[`${baseClass}__heading-icon`]}
                source={icon}
              />
            )}
            <div className={styles[`${baseClass}__heading-header`]}>
              <div>{title}</div>

              {children && (
                <div className={styles[`${baseClass}__heading-description`]}>
                  {children}
                </div>
              )}
            </div>
          </div>
        </Heading>
        <ModalCloseButton
          labelType={!!title}
          customColor={`var(--color-white)`}
          onClick={onCloseButtonClick}
        />
      </div>
    );
  }

  if (headerType === 'heading') {
    return (
      <div className={styles[`${baseClass}__header`]}>
        <Heading size="sm" as="div" className={styles[`${baseClass}__heading`]}>
          <div className="heading-wrapper">
            {icon && (
              <Icon
                className={styles[`${baseClass}__heading-icon`]}
                source={icon}
              />
            )}
            <div className={styles[`${baseClass}__heading-header`]}>
              <div>{title}</div>

              {children && (
                <div className={styles[`${baseClass}__heading-description`]}>
                  {children}
                </div>
              )}
            </div>
          </div>
        </Heading>
        <ModalCloseButton onClick={onCloseButtonClick} />
      </div>
    );
  }

  return null;
};
