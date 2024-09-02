import { prodRedirectData, ProductSwitcherProducts } from '../constants';
import {
  createProductOption,
  getRedirectDataByEnv,
  isVisibleProduct,
} from '../helpers';
import {
  Env,
  ProductId,
  ProductName,
  ProductOption,
  ProductSubscription,
} from '../types';

export interface IProductSwitcherHook {
  env?: Env;
  installedProducts: {
    product: ProductName;
  }[];
  organizationId: string;
  subscriptions: ProductSubscription;
  mainProductId: ProductId;
}

export const useProductSwitcher = ({
  env = 'prod',
  installedProducts,
  subscriptions,
  organizationId,
  mainProductId,
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
              mainProductId,
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
