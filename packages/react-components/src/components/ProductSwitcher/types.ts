import { ReactNode } from 'react';

import { IconSource } from '../Icon';

export type ProductId =
  | 'livechat'
  | 'helpdesk'
  | 'chatbot'
  | 'openwidget'
  | 'knowledgebase'
  | 'hello'
  | 'platform'
  | 'accounts';

export interface ProductSwitcherProps {
  mainProductId: ProductId;
  productOptions: ProductOption[];
}

export const SSOProductIdMap: Record<ProductId, string> = {
  livechat: 'LiveChat',
  helpdesk: 'HelpDesk',
  accounts: 'Accounts',
  knowledgebase: 'KnowledgeBase',
  chatbot: 'ChatBot',
  openwidget: 'OpenWidget',
  hello: 'Hello',
  platform: 'TextPlatform',
};

export type ProductName =
  (typeof SSOProductIdMap)[keyof typeof SSOProductIdMap];

export type ProductSubscription = Record<
  ProductName,
  {
    status: 'trial' | 'active' | 'cancelled' | 'past_due' | 'expired';
    next_charge_at?: string;
  }
>;

export interface ProductOption {
  id: ProductId;
  shortcutKey?: string;
  name: string;
  expired?: boolean;
  trialDaysLeft?: number;
  nameAdornment?: ReactNode;
  icon: IconSource;
  iconColor?: string;
  notificationCount?: number;
  backgroundColors: {
    main: string;
    second: string;
    third: string;
  };
  withDivider?: boolean;
  url: string;
}

export type ProductData = {
  clientId: string;
  product: string;
  redirectUri: string;
};
