import {
  alwaysVisibleProducts,
  labsRedirectData,
  prodRedirectData,
  stagingRedirectData,
} from './constants';
import {
  ProductName,
  ProductData,
  ProductId,
  SSOProductIdMap,
  ProductOption,
  ProductSubscription,
} from './types';

export const getRedirectURL = (
  productClientId: string,
  productRedirectUri: string,
  organizationId: string,
  env: 'production' | 'prod' | string | undefined
): string => {
  let domain = '';
  if (env && domain !== 'production' && domain !== 'prod') {
    domain += `https://accounts.${env}.livechat.com`;
  } else {
    domain += 'https://accounts.livechat.com';
  }

  return `${domain}?client_id=${productClientId}&redirect_uri=${encodeURIComponent(
    productRedirectUri
  )}&response_type=token&organization_id=${organizationId}`;
};
export const getTrialDaysLeft = (trialEnd: string): number => {
  const trialEndDate = new Date(trialEnd);
  const currentDate = new Date();
  const diffTime = trialEndDate.getTime() - currentDate.getTime();

  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const isVisibleProduct = (
  productId: ProductId,
  installedProducts: { product: ProductName }[]
): boolean =>
  alwaysVisibleProducts.includes(productId) ||
  installedProducts.some(
    (installedProduct) =>
      installedProduct.product === SSOProductIdMap[productId]
  );

export const createProductOption = (
  product: ProductOption,
  redirectData: ProductData[],
  subscriptions: ProductSubscription,
  organizationId: string,
  env?: string
): ProductOption => {
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

export const getRedirectDataByEnv = (
  env: 'labs' | 'staging' | 'prod'
): ProductData[] => {
  switch (env) {
    case 'prod':
      return prodRedirectData;
    case 'staging':
      return stagingRedirectData;
    case 'labs':
      return labsRedirectData;
    default:
      return [];
  }
};
