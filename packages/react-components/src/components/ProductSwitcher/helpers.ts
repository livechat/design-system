import { differenceInCalendarDays, isPast } from 'date-fns';

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
  if (env && env !== 'production' && env !== 'prod') {
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

  if (isPast(trialEndDate)) return 0;

  return differenceInCalendarDays(trialEndDate, currentDate);
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
      subscriptions[product.id] &&
      subscriptions[product.id]?.status === 'trial' &&
      subscriptions[product.id]?.['next_charge_at']
        ? getTrialDaysLeft(subscriptions[product.id]?.['next_charge_at'] ?? '')
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

export const openOrFocusTab = (url: string, tabName: string): void => {
  const tab = window.open(url, tabName);
  if (tab) {
    tab.focus();
  } else {
    window.open(url, '_blank');
  }
};
