import {
  AccountCircle,
  ChatBotMono,
  HelpDeskMono,
  KnowledgeBaseMono,
  LiveChatMono,
  OpenWidgetMono,
} from '@livechat/design-system-icons';

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
  },
  {
    id: 'openwidget',
    name: 'Widget',
    icon: OpenWidgetMono,
    backgroundColors: {
      main: 'var(--products-openwidget)',
      second: 'var(--products-livechat)',
      third: 'var(--products-chatbot)',
    },
    url: '/openwidget',
  },
  {
    id: 'hello',
    name: 'TeamChat',
    icon: AccountCircle,
    backgroundColors: {
      main: 'var(--products-hello)',
      second: 'var(--products-livechat)',
      third: 'var(--products-chatbot)',
    },
    url: '/hello',
  },
  {
    id: 'accounts',
    name: 'Accounts',
    icon: AccountCircle, // TODO - replace with proper icon
    backgroundColors: {
      main: 'var(--surface-locked-white)',
      second: 'var(--products-livechat)',
      third: 'var(--products-chatbot)',
    },
    withDivider: true,
    url: '/accounts',
  },
];
