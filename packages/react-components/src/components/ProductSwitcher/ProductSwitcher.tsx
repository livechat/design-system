import * as React from 'react';
import { FC } from 'react';

import { ProductTile } from './components/ProductTile/ProductTile';
import { IProductSwitcherProps } from './types';

export const ProductSwitcher: FC<IProductSwitcherProps> = ({
  productOptions,
  mainProductId,
}) => {
  const mainProduct = productOptions.find(
    (product) => product.id === mainProductId
  );
  const otherProducts = productOptions.filter(
    (product) => product.id !== mainProductId
  );

  if (!mainProduct) {
    return null;
  }

  return (
    <div>
      <div>
        <ProductTile
          id={mainProduct.id}
          isMainProduct
          icon={mainProduct.icon}
          backgroundColors={mainProduct.backgroundColors}
        />
      </div>
      <div>
        {otherProducts.map((product) => (
          <ProductTile
            key={product.id}
            id={product.id}
            icon={product.icon}
            backgroundColors={product.backgroundColors}
          />
        ))}
      </div>
    </div>
  );
};
