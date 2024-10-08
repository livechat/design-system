import { ReactNode } from 'react';

import { IconSource } from '../Icon';

export type ProductId =
  | 'livechat'
  | 'helpdesk'
  | 'chatbot'
  | 'openwidget'
  | 'knowledgebase'
  | 'teamchat'
  | 'accounts';

export type ProductName =
  | 'LiveChat'
  | 'HelpDesk'
  | 'ChatBot'
  | 'OpenWidget'
  | 'KnowledgeBase'
  | 'TeamChat'
  | 'Accounts';

export type Env = 'labs' | 'staging' | 'prod';

export interface ProductSwitcherProps {
  mainProductId: ProductId;
  productOptions: ProductOption[];
  textURL?: string;
  openedOnInit?: boolean;
  isVisible?: boolean;
  isDarkMode?: boolean;
  onOpen?: (event?: Event) => void;
  onClose?: (event?: Event) => void;
  onSelect?: (id: ProductId) => void;
}

export const SSOProductIdMap: Record<ProductId, ProductName> = {
  livechat: 'LiveChat',
  helpdesk: 'HelpDesk',
  accounts: 'Accounts',
  knowledgebase: 'KnowledgeBase',
  chatbot: 'ChatBot',
  openwidget: 'OpenWidget',
  teamchat: 'TeamChat',
};

export type ProductSubscription = Partial<
  Record<
    ProductId,
    {
      status: 'trial' | 'active' | 'cancelled' | 'past_due' | 'expired';
      next_charge_at?: string;
    }
  >
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
  borderColor?: string;
}

export type ProductData = {
  clientId: string;
  product: ProductName;
  redirectUri: string;
};
