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
  Env,
} from './types';

export const getRedirectURL = (
  productClientId: string,
  productRedirectUri: string,
  organizationId: string,
  mainProductId: ProductId,
  env: Env
): string => {
  let domain = '';
  if (env && env !== 'prod') {
    domain += `https://accounts.${env}.livechat.com`;
  } else {
    domain += 'https://accounts.livechat.com';
  }

  const utmSource = getUtmSource(env, mainProductId);
  const url = `${domain}?client_id=${productClientId}&redirect_uri=${encodeURIComponent(
    productRedirectUri
  )}&response_type=token&organization_id=${organizationId}`;

  if (!utmSource) {
    return url;
  }

  return `${url}&utm_source=${utmSource}&utm_medium=referral&utm_campaign=productswitcher`;
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
  mainProductId: ProductId,
  env: Env
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
      mainProductId,
      env
    ),
  };
};

export const getRedirectDataByEnv = (env: Env): ProductData[] => {
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

export const getUtmSource = (env: Env, mainProductId: ProductId) => {
  const redirectData = getRedirectDataByEnv(env);
  const productData = redirectData.find(
    (data) => data.product === SSOProductIdMap[mainProductId]
  );

  return productData?.redirectUri.replace('https://', '');
};
