import { FC } from 'react';

import { Text } from '../../../Typography';
import { SelectableCard } from '../../SelectableCard';

import { IThumbnailSelectableCardProps } from './types';

import styles from './ThumbnailSelectableCard.module.scss';

const baseClass = `thumbnail-selectable-card`;

export const ThumbnailSelectableCard: FC<IThumbnailSelectableCardProps> = ({
  label,
  description,
  icon,
  customElement,
  ...props
}) => (
  <SelectableCard {...props} kind="thumbnail">
    <div className={styles[baseClass]}>
      {icon && <div className={styles[`${baseClass}__icon`]}>{icon}</div>}
      {!customElement && (
        <div className={styles[`${baseClass}__content`]}>
          <Text as="span" className={styles[`${baseClass}__content__label`]}>
            {label}
          </Text>
          <Text
            size="sm"
            as="span"
            className={styles[`${baseClass}__content__description`]}
          >
            {description}
          </Text>
        </div>
      )}
      {customElement}
    </div>
  </SelectableCard>
);
