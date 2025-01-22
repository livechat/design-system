import cx from 'clsx';

import { Display, Heading, Text } from '../Typography';

import { IEmptyStateProps } from './types';

import styles from './EmptyState.module.scss';

const baseClass = 'empty-state';

export const EmptyState = ({
  type = 'full',
  image,
  icon,
  title,
  description,
  actions,
}: IEmptyStateProps) => {
  return (
    <div className={cx(styles[baseClass], styles[`${baseClass}--${type}`])}>
      {image && (
        <img
          className={styles[`${baseClass}__image`]}
          src={image}
          alt={title}
        />
      )}
      {type === 'inline' ? (
        <div className={styles[`${baseClass}__content-inline`]}>
          {icon && <Display data-testid="icon">{icon}</Display>}
          <Text noMargin>{title}</Text>
        </div>
      ) : (
        <>
          {icon && (
            <Display
              className={styles[`${baseClass}__icon--${type}`]}
              data-testid="icon"
            >
              {icon}
            </Display>
          )}
          <Heading className={styles[`${baseClass}__title`]}>{title}</Heading>
        </>
      )}

      <>
        {type === 'full' && description && (
          <Text noMargin className={styles[`${baseClass}__description`]}>
            {description}
          </Text>
        )}
      </>
      {actions && (
        <div
          className={cx(
            styles[`${baseClass}__actions`],
            styles[`${baseClass}__actions--${type}`]
          )}
        >
          {actions}
        </div>
      )}
    </div>
  );
};
