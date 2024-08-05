import { prodRedirectData, ProductSwitcherProducts } from '../constants';
import {
  createProductOption,
  getRedirectDataByEnv,
  isVisibleProduct,
} from '../helpers';
import { IProductOption } from '../types';

export interface IProductSwitcherHook {
  env?: 'labs' | 'staging' | 'prod';
  installedProducts: { product: 'LiveChat' | '' }[];
  organizationId: string;
  subscriptions: Record<
    string,
    {
      status: 'trial' | 'active' | 'cancelled' | 'past_due' | 'expired';
      next_charge_at?: string;
    }
  >;
}

export const useProductSwitcher = ({
  env,
  installedProducts,
  subscriptions,
  organizationId,
}: IProductSwitcherHook): { products: IProductOption[] } => {
  if (!installedProducts || !subscriptions || !organizationId) {
    throw new Error('Missing required parameters');
  }
  const redirectData = env ? getRedirectDataByEnv(env) : prodRedirectData;

  return {
    products: ProductSwitcherProducts.reduce((acc, product) => {
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
    }, [] as IProductOption[]),
  };
};
