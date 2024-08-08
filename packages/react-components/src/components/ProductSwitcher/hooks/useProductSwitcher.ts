import { prodRedirectData, ProductSwitcherProducts } from '../constants';
import {
  createProductOption,
  getRedirectDataByEnv,
  isVisibleProduct,
} from '../helpers';
import { ProductName, ProductOption, ProductSubscription } from '../types';

export interface IProductSwitcherHook {
  env?: 'labs' | 'staging' | 'prod';
  installedProducts: {
    product: ProductName;
  }[];
  organizationId: string;
  subscriptions: ProductSubscription;
}

export const useProductSwitcher = ({
  env,
  installedProducts,
  subscriptions,
  organizationId,
}: IProductSwitcherHook): { products: ProductOption[] } => {
  if (!installedProducts || !subscriptions || !organizationId) {
    throw new Error('Missing required parameters');
  }
  const redirectData = env ? getRedirectDataByEnv(env) : prodRedirectData;

  return {
    products: ProductSwitcherProducts.reduce<ProductOption[]>(
      (acc, product) => {
        if (isVisibleProduct(product.id, installedProducts)) {
          acc.push(
            createProductOption(
              product,
              redirectData,
              subscriptions,
              organizationId,
              env
            )
          );
        }

        return acc;
      },
      []
    ),
  };
};
