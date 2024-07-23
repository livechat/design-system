import { FC, MouseEvent } from 'react';

import cx from 'clsx';

import { Text } from '../../../Typography';
import { useProductSwitcherShortcut } from '../../hooks/useProductSwitcherShortcut';
import { IProductOption, ProductId } from '../../types';
import { ProductTile } from '../ProductTile/ProductTile';

import styles from './ProductRow.module.scss';

type IProps = {
  onClick: (event: MouseEvent, id: ProductId) => void;
  product: IProductOption;
};

const baseClass = 'product-row';

export const ProductRow: FC<IProps> = ({
  product: {
    id,
    icon,
    backgroundColors,
    notificationCount,
    name,
    url,
    withDivider,
    order,
  },
  onClick,
}) => {
  useProductSwitcherShortcut(order, url);

  return (
    <>
      {withDivider && <div className={styles[`${baseClass}__divider`]} />}
      <a
        href={url}
        target="_blank"
        aria-label={`Go to ${name} product`}
        onClick={(event) => onClick(event, id)}
        className={cx(styles[baseClass], {
          [styles[`${baseClass}--with-divider`]]: withDivider,
        })}
      >
        <div className={styles[`${baseClass}__heading`]}>
          <ProductTile
            id={id}
            icon={icon}
            backgroundColors={backgroundColors}
            notificationCount={notificationCount}
          ></ProductTile>
          <Text bold>{name}</Text>
        </div>
        <Text size="sm" className={styles[`${baseClass}__shortcut`]}>
          Ctrl+{order}
        </Text>
      </a>
    </>
  );
};
