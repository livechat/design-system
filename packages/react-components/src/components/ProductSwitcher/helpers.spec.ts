import {
  alwaysVisibleProducts,
  labsRedirectData,
  prodRedirectData,
  stagingRedirectData,
} from './constants';
import {
  getRedirectURL,
  getTrialDaysLeft,
  isVisibleProduct,
  createProductOption,
  getRedirectDataByEnv,
} from './helpers';
import {
  ProductData,
  ProductId,
  SSOProductIdMap,
  ProductOption,
  ProductSubscription,
} from './types';

describe('helpers', () => {
  describe('getRedirectURL', () => {
    it('should return the correct redirect URL for production environment', () => {
      const url = getRedirectURL(
        'client123',
        'https://redirect.com',
        'org123',
        'prod'
      );
      expect(url).toBe(
        'https://accounts.livechat.com?client_id=client123&redirect_uri=https%3A%2F%2Fredirect.com&response_type=token&organization_id=org123'
      );
    });

    it('should return the correct redirect URL for non-production environment', () => {
      const url = getRedirectURL(
        'client123',
        'https://redirect.com',
        'org123',
        'staging'
      );
      expect(url).toBe(
        'https://accounts.staging.livechat.com?client_id=client123&redirect_uri=https%3A%2F%2Fredirect.com&response_type=token&organization_id=org123'
      );
    });
  });

  describe('getTrialDaysLeft', () => {
    it('should return the correct number of trial days left', () => {
      const trialEnd = new Date();
      trialEnd.setHours(23);
      expect(getTrialDaysLeft(trialEnd.toISOString())).toBe(0);
      trialEnd.setDate(trialEnd.getDate() + 1);
      expect(getTrialDaysLeft(trialEnd.toISOString())).toBe(1);
      trialEnd.setDate(trialEnd.getDate() + 10);
      expect(getTrialDaysLeft(trialEnd.toISOString())).toBe(11);
    });
  });

  describe('isVisibleProduct', () => {
    it('should return true if the product is always visible', () => {
      const productId: ProductId = 'livechat';
      alwaysVisibleProducts.push(productId);
      const isVisible = isVisibleProduct(productId, []);
      expect(isVisible).toBe(true);
    });

    it('should return true if the product is installed', () => {
      const productId: ProductId = 'openwidget';
      const installedProducts = [{ product: SSOProductIdMap[productId] }];
      const isVisible = isVisibleProduct(productId, installedProducts);
      expect(isVisible).toBe(true);
    });

    it('should return false if the product is neither always visible nor installed', () => {
      const productId: ProductId = 'openwidget';
      const isVisible = isVisibleProduct(productId, []);
      expect(isVisible).toBe(false);
    });
  });

  describe('createProductOption', () => {
    it('should create a product option correctly', () => {
      const product: ProductOption = { id: 'livechat' } as ProductOption;
      const redirectData: ProductData[] = [
        {
          product: 'LiveChat',
          clientId: 'client1',
          redirectUri: 'https://redirect1.com',
        },
      ];
      const subscriptions: ProductSubscription = {
        livechat: {
          status: 'trial',
          next_charge_at: new Date(Date.now() + 86400000 * 5).toISOString(),
        },
      };
      const organizationId = 'org1';

      const result = createProductOption(
        product,
        redirectData,
        subscriptions,
        organizationId,
        'staging'
      );
      expect(result.trialDaysLeft).toBe(5);
      expect(result.expired).toBe(false);
      expect(result.url).toBe(
        'https://accounts.staging.livechat.com?client_id=client1&redirect_uri=https%3A%2F%2Fredirect1.com&response_type=token&organization_id=org1'
      );
    });

    it('should throw an error if product data is not found', () => {
      const product = { id: 'unknownProduct' };
      const redirectData: ProductData[] = [];
      const subscriptions: ProductSubscription = {};
      const organizationId = 'org1';

      expect(() => {
        createProductOption(
          product as ProductOption,
          redirectData,
          subscriptions,
          organizationId
        );
      }).toThrowError('Product data for unknownProduct not found');
    });
  });

  describe('getRedirectDataByEnv', () => {
    it('should return prodRedirectData for prod environment', () => {
      const result = getRedirectDataByEnv('prod');
      expect(result).toBe(prodRedirectData);
    });

    it('should return stagingRedirectData for staging environment', () => {
      const result = getRedirectDataByEnv('staging');
      expect(result).toBe(stagingRedirectData);
    });

    it('should return labsRedirectData for labs environment', () => {
      const result = getRedirectDataByEnv('labs');
      expect(result).toBe(labsRedirectData);
    });
  });
});
