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
import { ProductOption, ProductData, ProductId } from './types';

export const ProductSwitcherProducts: ProductOption[] = [
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
  {
    clientId: 'fc4e19548af17e72ce41e065a8d4b4b1',
    redirectUri: 'https://platform.labs.text.com/console',
    product: 'Platform',
  },
  {
    clientId: '0ab5cf9b99447db22109ff70003d4507',
    redirectUri: 'https://accounts.labs.livechat.com/panel',
    product: 'Accounts',
  },
];

export const stagingRedirectData: ProductData[] = [
  {
    clientId: 'bb9e5b2f1ab480e4a715977b7b1b4279',
    redirectUri: 'https://my.staging.livechatinc.com',
    product: 'LiveChat',
  },
  {
    clientId: '82837eac-ff5e-45ca-bce1-00011acf925c',
    redirectUri: 'https://app.helpdesk.com',
    product: 'HelpDesk',
  },
  {
    clientId: '92418ea187dd3c572383cbf56f015b6c',
    redirectUri: 'https://app.chatbot.com/auth',
    product: 'ChatBot',
  },
  {
    clientId: '8c7275c9fa6f4853e8442df1387f7fe6',
    redirectUri: 'https://app.openwidget.com',
    product: 'OpenWidget',
  },
  {
    clientId: '0671f59cf1c3015a511619de69373e47',
    redirectUri: 'https://app.knowledgebase.ai',
    product: 'KnowledgeBase',
  },
  { clientId: '', redirectUri: '', product: 'Hello' },
  {
    clientId: '49aba739e5310548611ec9a209f7ac03',
    redirectUri: 'https://platform.text.com/console',
    product: 'Platform',
  },
  {
    clientId: '2fd9f1923f2233763b8637f7d10a6fe6',
    redirectUri: 'https://accounts.staging.livechat.com/panel',
    product: 'Accounts',
  },
];

export const prodRedirectData: ProductData[] = [
  {
    clientId: 'bb9e5b2f1ab480e4a715977b7b1b4279',
    redirectUri: 'https://my.livechatinc.com',
    product: 'LiveChat',
  },
  {
    clientId: '82837eac-ff5e-45ca-bce1-00011acf925c',
    redirectUri: 'https://app.helpdesk.com',
    product: 'HelpDesk',
  },
  {
    clientId: '92418ea187dd3c572383cbf56f015b6c',
    redirectUri: 'https://app.chatbot.com/auth',
    product: 'ChatBot',
  },
  {
    clientId: '8c7275c9fa6f4853e8442df1387f7fe6',
    redirectUri: 'https://app.openwidget.com',
    product: 'OpenWidget',
  },
  {
    clientId: '0671f59cf1c3015a511619de69373e47',
    redirectUri: 'https://app.knowledgebase.ai',
    product: 'KnowledgeBase',
  },
  { clientId: '', redirectUri: '', product: 'Hello' },
  {
    clientId: '49aba739e5310548611ec9a209f7ac03',
    redirectUri: 'https://platform.text.com/console',
    product: 'Platform',
  },

  {
    clientId: '2fd9f1923f2233763b8637f7d10a6fe6',
    redirectUri: 'https://accounts.livechat.com/panel',
    product: 'Accounts',
  },
];

export const alwaysVisibleProducts: ProductId[] = [
  'livechat',
  'chatbot',
  'helpdesk',
  'accounts',
];
