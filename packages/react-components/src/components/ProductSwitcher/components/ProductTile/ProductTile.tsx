import { FC } from 'react';

import cx from 'clsx';

import { Badge } from '../../../Badge';
import { Icon } from '../../../Icon';
import { IProductOption } from '../../types';

import styles from './ProductTile.module.scss';

type IProps = Pick<
  IProductOption,
  'id' | 'icon' | 'notificationCount' | 'backgroundColors' | 'expired'
> & {
  isMainProduct?: boolean;
  withBorder?: boolean;
};

const baseClass = 'product-tile';

export const ProductTile: FC<IProps> = ({
  id,
  icon,
  expired,
  backgroundColors,
  notificationCount,
  withBorder = false,
  isMainProduct = false,
}) => {
  return (
    <div className={cx({ [styles['outer-border']]: withBorder })}>
      <div
        className={cx(styles['product-tile-wrapper'], {
          [styles['product-tile-wrapper__animated']]: isMainProduct,
        })}
      >
        <div
          className={cx(styles[baseClass], {
            [styles[`${baseClass}__main-product`]]: isMainProduct,
          })}
          style={{
            backgroundColor: expired
              ? 'var(--surface-moderate-default)'
              : backgroundColors.main,
          }}
        >
          {notificationCount && !expired ? (
            <Badge
              size="compact"
              count={notificationCount}
              className={cx(styles[`${baseClass}__badge`], {
                [styles[`${baseClass}__badge--bordered`]]: isMainProduct,
              })}
            />
          ) : null}
          <Icon
            source={icon}
            className={cx(styles[`${baseClass}__icon`], {
              [styles[`${baseClass}__icon--black`]]: id === 'accounts',
              [styles[`${baseClass}__icon--large`]]: isMainProduct,
              [styles[`${baseClass}__icon--expired`]]: expired,
            })}
          />
        </div>
        {isMainProduct && (
          <>
            <div
              className={styles[`${baseClass}__second-layer`]}
              style={{ background: backgroundColors.second }}
            />
            <div
              className={styles[`${baseClass}__third-layer`]}
              style={{ background: backgroundColors.third }}
            />
          </>
        )}
      </div>
    </div>
  );
};
