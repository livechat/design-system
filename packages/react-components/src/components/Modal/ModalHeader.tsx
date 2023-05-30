import React from 'react';
import { Icon, IconSource } from '../Icon';
import { Heading } from '../Typography';
import { ModalCloseButton } from './ModalCloseButton';
import styles from './Modal.module.scss';

interface ModalHeaderProps {
  headerTitle?: string;
  headerDescription?: string;
  icon?: IconSource;
  className?: string;
  headingType?: 'labelHeading' | 'heading' | 'closeButton';
  onClose: () => void;
}
const baseClass = 'modal';

export const NewModalHeader: React.FC<ModalHeaderProps> = ({
  headingType,
  headerTitle,
  headerDescription,
  icon,
  onClose,
}) => {
  const onCloseButtonClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    event.stopPropagation();
    onClose();
  };

  return (
    <>
      {headingType === 'labelHeading' && (
        <div className={styles[`${baseClass}__label-header`]}>
          {icon && <Icon source={icon} size="large" className="heading-icon" />}
          <Heading
            size="xs"
            as="div"
            className={styles[`${baseClass}__label-heading`]}
          >
            {headerTitle}
          </Heading>
          <div className="heading-description">{headerDescription}</div>
          <ModalCloseButton
            labelType={!!'labelHeading'}
            customColor={`var(--color-white)`}
            onClick={onCloseButtonClick}
          />
        </div>
      )}

      {headingType === 'heading' && (
        <div className={styles[`${baseClass}__header`]}>
          <Heading
            size="sm"
            as="div"
            className={styles[`${baseClass}__heading`]}
          >
            {headerTitle}
          </Heading>
          <div className="heading-description">{headerDescription}</div>
        </div>
      )}
    </>
  );
};

// {labelHeading && (
//   <div className={styles[`${baseClass}__label-header`]}>
//     <Heading
//       size="xs"
//       as="div"
//       className={styles[`${baseClass}__label-heading`]}
//     >
//       {labelHeading}
//     </Heading>
//     <ModalCloseButton
//       labelType={!!labelHeading}
//       customColor={`var(--color-white)`}
//       onClick={onCloseButtonClick}
//     />
//   </div>
// )}
// {!labelHeading && heading && (
//   <div className={styles[`${baseClass}__header`]}>
//     <Heading
//       size="sm"
//       as="div"
//       className={styles[`${baseClass}__heading`]}
//     >
//       {heading}
//     </Heading>
//   </div>
// )}
// {!labelHeading && <ModalCloseButton onClick={onCloseButtonClick} />}
