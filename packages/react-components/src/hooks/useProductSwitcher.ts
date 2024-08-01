import { IProductOption, ProductId } from '../components/ProductSwitcher';
import { ProductSwitcherProducts } from '../components/ProductSwitcher/constants';

const getRedirectURL = (
  productClientId: string,
  productRedirectUri: string,
  organizationId: string,
  env = 'labs'
) => {
  return `https://accounts.${env}.livechat.com/signin?client_id=${productClientId}&redirect_uri=${productRedirectUri}&response_type=token&organization_id=${organizationId}`;
};

export type RedirectData = {
  productClientId: string;
  productRedirectUri: string;
  organizationId: string;
};

export const labsRedirectData: Record<ProductId, RedirectData> = {
  livechat: {
    productClientId: '58737b5829e65621a45d598aa6f2ed8e',
    productRedirectUri: 'https%3A%2F%2Fmy.labs.livechatinc.com',
    organizationId: '',
  },
  helpdesk: {
    productClientId: 'ee078090-b721-4e2b-9cf2-65e95904634c&',
    productRedirectUri: 'https%3A%2F%2Fapp.labs.helpdesk.com',
    organizationId: '',
  },
  chatbot: {
    productClientId: '9638698004690917c9b787a2e16fc007',
    productRedirectUri: 'https%3A%2F%2Fapp.staging.chatbot.com%2Fstories',
    organizationId: '',
  },
  openwidget: {
    productClientId: '40f0baca4e364c84c2d89bf3403caa31',
    productRedirectUri: 'https%3A%2F%2Fapp.labs.openwidget.com%2F',
    organizationId: '',
  },
  knowledgebase: {
    productClientId: 'de5fce27f8c77fa41e9fa621beeed111',
    productRedirectUri: 'https%253A%252F%252Fapp.staging.knowledgebase.ai%252F',
    organizationId: '',
  },
  hello: {
    productClientId: '',
    productRedirectUri: '',
    organizationId: '',
  },
  platform: {
    productClientId: '',
    productRedirectUri: '',
    organizationId: '',
  },
  accounts: {
    productClientId: '0ab5cf9b99447db22109ff70003d4507',
    productRedirectUri:
      'https%253A%252F%252Faccounts.labs.livechat.com%252Fpanel',
    organizationId: '',
  },
};

export const useProductSwitcher = (
  redirectData: Record<ProductId, RedirectData>,
  env: string
): { products: IProductOption[] } => {
  return {
    products: ProductSwitcherProducts.map((product) => {
      return {
        ...product,
        trialDaysLeft: product.trialDaysLeft,
        expired: product.expired,
        url: getRedirectURL(
          redirectData[product.id].productClientId,
          redirectData[product.id].productRedirectUri,
          redirectData[product.id].organizationId,
          env
        ),
      };
    }),
  };
};
