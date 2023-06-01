import React from 'react';
import { Heading } from '../Typography';
import { ModalCloseButton } from './ModalCloseButton';
import styles from './Modal.module.scss';

const baseClass = 'modal';

interface ModalHeaderProps {
  headerType?: 'labelHeading' | 'heading';
  title?: React.ReactNode;
  icon?: React.ReactNode;
  children?: React.ReactNode;
  onClose: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  headerType,
  title,
  icon,
  children,
  onClose,
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
          {title}
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
        <div className="heading-wrapper">
          {icon && <div className="heading-icon">{icon}</div>}
          <div className="heading">
            <div>{title}</div>
            {children && <div className="heading-description">{children}</div>}
          </div>
        </div>
        <ModalCloseButton onClick={onCloseButtonClick} />
      </div>
    );
  }

  return <ModalCloseButton onClick={onCloseButtonClick} />;
};
