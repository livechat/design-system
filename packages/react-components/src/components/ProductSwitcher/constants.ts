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
import { IProductOption } from './types';

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
    url: '/livechat',
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
    url: '/chatbot',
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
    url: '/helpdesk',
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
    url: '/helpdesk',
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
    url: '/openwidget',
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
    url: '/hello',
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
    url: '/platform',
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
    url: '/accounts',
  },
];
