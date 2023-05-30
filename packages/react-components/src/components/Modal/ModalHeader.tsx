import React from 'react';
import cx from 'clsx';
import { Heading } from '../Typography';
import { ModalCloseButton } from './ModalCloseButton';
import styles from './Modal.module.scss';

const baseClass = 'modal';

interface ModalHeaderProps {
  labelHeading?: React.ReactNode;
  heading?: React.ReactNode;
  onClose: () => void;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({
  labelHeading,
  heading,
  onClose,
}) => {
  const onCloseButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onClose();
  };

  if (labelHeading) {
    return (
      <div className={styles[`${baseClass}__label-header`]}>
        <Heading
          size="xs"
          as="div"
          className={styles[`${baseClass}__label-heading`]}
        >
          {labelHeading}
        </Heading>
        <ModalCloseButton
          labelType={!!labelHeading}
          customColor={`var(--color-white)`}
          onClick={onCloseButtonClick}
        />
      </div>
    );
  }

  if (heading) {
    return (
      <div className={styles[`${baseClass}__header`]}>
        <Heading size="sm" as="div" className={styles[`${baseClass}__heading`]}>
          {heading}
        </Heading>
        <ModalCloseButton onClick={onCloseButtonClick} />
      </div>
    );
  }

  return <ModalCloseButton onClick={onCloseButtonClick} />;
};
