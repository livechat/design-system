import { FC } from 'react';

import cx from 'clsx';

import { Badge } from '../../../Badge';
import { Icon } from '../../../Icon';
import { IProductOption } from '../../types';

import styles from './ProductTile.module.scss';

type IProps = Pick<
  IProductOption,
  'id' | 'icon' | 'notificationCount' | 'backgroundColors'
> & {
  isMainProduct?: boolean;
};

const baseClass = 'product-tile';

export const ProductTile: FC<IProps> = ({
  id,
  icon,
  backgroundColors,
  notificationCount,
  isMainProduct = false,
}) => {
  return (
    <div
      className={cx(styles[baseClass], {
        [styles[`${baseClass}--main-product`]]: isMainProduct,
      })}
      style={{
        backgroundColor: backgroundColors.main,
      }}
    >
      {notificationCount && (
        <Badge
          count={notificationCount}
          className={styles[`${baseClass}--badge`]}
        />
      )}
      <Icon
        source={icon}
        className={cx(styles[`${baseClass}--icon`], {
          [styles[`${baseClass}--icon__black`]]: id === 'accounts',
          [styles[`${baseClass}--icon__large`]]: isMainProduct,
        })}
      />
    </div>
  );
};
