import { FC, MouseEvent } from 'react';

import { Popover } from '../Popover';
import { Tooltip } from '../Tooltip';
import { Text } from '../Typography';

import { ProductRow } from './components/ProductRow/ProductRow';
import { ProductTile } from './components/ProductTile/ProductTile';
import { IProductSwitcherProps } from './types';

import styles from './ProductSwitcher.module.scss';

const baseClass = 'product-switcher';

export const ProductSwitcher: FC<IProductSwitcherProps> = ({
  productOptions,
  mainProductId,
}) => {
  const mainProduct = productOptions.find(
    (product) => product.id === mainProductId
  );

  if (!mainProduct) {
    return null;
  }

  const handleClick = (event: MouseEvent) => {
    event.preventDefault();
  };

  const combinedNotificationCount = productOptions.reduce(
    (acc, product) => acc + (product.notificationCount || 0),
    0
  );

  return (
    <Popover
      placement="right-start"
      className={styles[baseClass]}
      offsetSize={5}
      triggerRenderer={
        <Tooltip
          offsetCrossAxis={2}
          arrowOffsetY={2}
          offsetMainAxis={10}
          className={styles[`${baseClass}__tooltip`]}
          placement="right"
          triggerRenderer={
            <ProductTile
              id={mainProduct.id}
              isMainProduct
              icon={mainProduct.icon}
              backgroundColors={mainProduct.backgroundColors}
              notificationCount={combinedNotificationCount}
            />
          }
        >
          Switch product
        </Tooltip>
      }
    >
      <>
        <div className={styles[`${baseClass}__content`]}>
          {productOptions.map((product) => (
            <ProductRow
              isActive={product.id === mainProductId}
              product={product}
              onClick={handleClick}
            />
          ))}
        </div>
        <div className={styles[`${baseClass}__footer`]}>
          <a
            href="https://www.text.com"
            target="_blank"
            className={styles[`${baseClass}__footer-link`]}
          >
            <Text noMargin>powered by</Text>
            <Text noMargin bold customColor="var(--content-locked-white)">
              text|
            </Text>
          </a>
        </div>
      </>
    </Popover>
  );
};
