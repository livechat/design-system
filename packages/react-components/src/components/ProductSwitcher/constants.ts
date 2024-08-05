import {
  ChatBotMono,
  HelloMono,
  HelpDeskMono,
  KnowledgeBaseMono,
  LiveChatMono,
  OpenWidgetMono,
  TextAccounts,
  TextPlatform,
} from '@livechat/design-system-icons';

import { OpenWidgetLogoUri } from './openwidgetLogoUri';
import { IProductOption, ProductId, ProductData } from './types';

export const ProductSwitcherProducts: IProductOption[] = [
  {
    id: 'livechat',
    name: 'Livechat',
    icon: LiveChatMono,
    backgroundColors: {
      main: 'var(--products-livechat)',
      second: 'var(--products-helpdesk)',
      third: 'var(--products-chatbot)',
    },
    url: '',
  },
  {
    id: 'chatbot',
    name: 'Chatbot',
    icon: ChatBotMono,
    backgroundColors: {
      main: 'var(--products-chatbot)',
      second: 'var(--products-livechat)',
      third: 'var(--products-helpdesk)',
    },
    url: '',
  },
  {
    id: 'helpdesk',
    name: 'Helpdesk',
    icon: HelpDeskMono,
    backgroundColors: {
      main: 'var(--products-helpdesk)',
      second: 'var(--products-livechat)',
      third: 'var(--products-chatbot)',
    },
    url: '',
    expired: true,
  },
  {
    id: 'knowledgebase',
    name: 'KnowledgeBase',
    icon: KnowledgeBaseMono,
    backgroundColors: {
      main: 'var(--products-knowledgebase)',
      second: 'var(--products-helpdesk)',
      third: 'var(--products-chatbot)',
    },
    url: '',
    trialDaysLeft: 2,
  },
  {
    id: 'openwidget',
    name: 'OpenWidget',
    icon: OpenWidgetMono,
    backgroundColors: {
      main: `url('${OpenWidgetLogoUri}')`,
      second: 'var(--products-livechat)',
      third: 'var(--products-chatbot)',
    },
    url: '',
  },
  {
    id: 'hello',
    name: 'TeamChat',
    icon: HelloMono,
    backgroundColors: {
      main: 'var(--products-hello)',
      second: 'var(--products-livechat)',
      third: 'var(--products-chatbot)',
    },
    url: '',
  },
  {
    id: 'platform',
    name: 'Platform',
    icon: TextPlatform,
    iconColor: 'var(--content-locked-black)',
    backgroundColors: {
      main: 'var(--products-platform)',
      second: 'var(--products-livechat)',
      third: 'var(--products-chatbot)',
    },
    url: '',
  },
  {
    id: 'accounts',
    name: 'Accounts',
    icon: TextAccounts,
    backgroundColors: {
      main: 'var(--surface-locked-white)',
      second: 'var(--products-livechat)',
      third: 'var(--products-chatbot)',
    },
    iconColor: 'var(--content-locked-black)',
    withDivider: true,
    url: '',
  },
];

export const labsRedirectData: ProductData[] = [
  {
    clientId: '58737b5829e65621a45d598aa6f2ed8e',
    redirectUri: 'https://my.labs.livechatinc.com',
    product: 'LiveChat',
  },
  {
    clientId: 'ee078090-b721-4e2b-9cf2-65e95904634c',
    redirectUri: 'https://app.labs.helpdesk.com',
    product: 'HelpDesk',
  },
  {
    clientId: '9638698004690917c9b787a2e16fc007',
    redirectUri: 'https://app.staging.chatbot.com/auth',
    product: 'ChatBot',
  },
  {
    clientId: '40f0baca4e364c84c2d89bf3403caa31',
    redirectUri: 'https://app.labs.openwidget.com',
    product: 'OpenWidget',
  },
  {
    clientId: 'de5fce27f8c77fa41e9fa621beeed111',
    redirectUri: 'https://app.staging.knowledgebase.ai',
    product: 'KnowledgeBase',
  },
  { clientId: '', redirectUri: '', product: 'Hello' },
  { clientId: '', redirectUri: '', product: 'Platform' },
  {
    clientId: '0ab5cf9b99447db22109ff70003d4507',
    redirectUri: 'https://accounts.labs.livechat.com/panel',
    product: 'Accounts',
  },
];

export const SSOProductIdMap: Record<ProductId, string> = {
  livechat: 'LiveChat',
  helpdesk: 'HelpDesk',
  accounts: 'Accounts',
  knowledgebase: 'KnowledgeBase',
  chatbot: 'ChatBot',
  openwidget: 'OpenWidget',
  hello: 'hello',
  platform: 'TextPlatform',
};
