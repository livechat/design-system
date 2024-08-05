import { ProductSwitcherProducts, SSOProductIdMap } from '../constants';
import { getRedirectURL, getTrialDaysLeft } from '../helpers';
import { IProductOption, ProductId, ProductData } from '../types';

const alwaysVisibleProducts: ProductId[] = [
  'livechat',
  'chatbot',
  'helpdesk',
  'accounts',
];

export interface IProductSwitcherHook {
  env?: string;
  redirectData: ProductData[];
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

const isVisibleProduct = (
  productId: ProductId,
  installedProducts: { product: 'LiveChat' | '' }[]
): boolean =>
  alwaysVisibleProducts.includes(productId) ||
  installedProducts.some(
    (installedProduct) =>
      installedProduct.product === SSOProductIdMap[productId]
  );

const createProductOption = (
  product: IProductOption,
  redirectData: ProductData[],
  subscriptions: Record<string, any>,
  organizationId: string,
  env?: string
): IProductOption => {
  const productData = redirectData.find(
    (data) => data.product === SSOProductIdMap[product.id]
  );

  if (!productData) {
    throw new Error(`Product data for ${product.id} not found`);
  }

  return {
    ...product,
    trialDaysLeft:
      subscriptions[product.id] && subscriptions[product.id]?.status === 'trial'
        ? getTrialDaysLeft(subscriptions[product.id]['next_charge_at'] ?? '')
        : undefined,
    expired: subscriptions[product.id]?.status === 'expired',
    url: getRedirectURL(
      productData.clientId,
      productData.redirectUri,
      organizationId,
      env
    ),
  };
};

export const useProductSwitcher = ({
  env,
  redirectData,
  installedProducts,
  subscriptions,
  organizationId,
}: IProductSwitcherHook): { products: IProductOption[] } => {
  if (
    !redirectData ||
    !installedProducts ||
    !subscriptions ||
    !organizationId
  ) {
    throw new Error('Missing required parameters');
  }
  if (redirectData.length === 0) {
    return {
      products: [],
    };
  }

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
