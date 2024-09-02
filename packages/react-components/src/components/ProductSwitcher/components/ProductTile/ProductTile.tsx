import { FC } from 'react';
import * as React from 'react';

import cx from 'clsx';

import { Badge } from '../../../Badge';
import { Icon } from '../../../Icon';
import { ProductOption } from '../../types';

import styles from './ProductTile.module.scss';

type IProps = Pick<
  ProductOption,
  'icon' | 'notificationCount' | 'backgroundColors' | 'expired' | 'iconColor'
> & {
  isMainProduct?: boolean;
  withBorder?: boolean;
};

const baseClass = 'product-tile';

export const ProductTile: FC<IProps> = ({
  icon,
  iconColor,
  expired,
  backgroundColors,
  notificationCount,
  withBorder = false,
  isMainProduct = false,
}) => {
  return (
    <div className={cx({ [styles['outer-border']]: withBorder })}>
      <div
        tabIndex={isMainProduct ? 0 : -1}
        className={cx(styles['product-tile-wrapper'], {
          [styles['product-tile-wrapper__animated']]: isMainProduct,
        })}
      >
        {isMainProduct && (
          <>
            <div
              className={styles[`${baseClass}__third-layer`]}
              style={{ background: backgroundColors.third }}
            />
            <div
              className={styles[`${baseClass}__second-layer`]}
              style={{ background: backgroundColors.second }}
            />
          </>
        )}
        <div
          className={cx(styles[baseClass], {
            [styles[`${baseClass}__main-product`]]: isMainProduct,
          })}
          style={{
            background: expired
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
              [styles[`${baseClass}__icon--large`]]: isMainProduct,
              [styles[`${baseClass}__icon--expired`]]: expired,
            })}
            customColor={iconColor}
          />
        </div>
      </div>
    </div>
  );
};
