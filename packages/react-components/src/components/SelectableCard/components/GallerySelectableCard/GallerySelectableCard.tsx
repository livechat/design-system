import { FC } from 'react';

import cx from 'clsx';

import { Text } from '../../../Typography';
import { SelectableCard } from '../../SelectableCard';

import { IGallerySelectableCardProps } from './types';

import styles from './GallerySelectableCard.module.scss';

const baseClass = `gallery-selectable-card`;

export const GallerySelectableCard: FC<IGallerySelectableCardProps> = ({
  label,
  icon,
  customElement,
  contentClassName,
  ...props
}) => {
  return (
    <SelectableCard
      {...props}
      kind="gallery"
      style={
        label
          ? {
              marginBottom: '29px',
            }
          : {}
      }
    >
      <div className={cx(styles[baseClass], contentClassName)}>
        {icon && !customElement && icon}
        {customElement}
        {label && (
          <Text as="span" className={styles[`${baseClass}__label`]}>
            {label}
          </Text>
        )}
      </div>
    </SelectableCard>
  );
};
