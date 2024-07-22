import {
  AccountCircle,
  ChatBotMono,
  HelloMono,
  HelpDeskMono,
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
      main: 'var(--product-livechat)',
      second: '#FFD54F',
      third: '#FFECB3',
    },
    url: '/livechat',
  },
  {
    id: 'chatbot',
    name: 'Chatbot',
    icon: ChatBotMono,
    backgroundColors: {
      main: '#2196F3',
      second: '#64B5F6',
      third: '#90CAF9',
    },
    url: '/chatbot',
  },
  {
    id: 'helpdesk',
    name: 'Helpdesk',
    icon: HelpDeskMono,
    backgroundColors: {
      main: '#4CAF50',
      second: '#66BB6A',
      third: '#81C784',
    },
    url: '/helpdesk',
  },
  {
    id: 'openwidget',
    name: 'Widget',
    icon: OpenWidgetMono,
    backgroundColors: {
      main: '#FF5722',
      second: '#FF7043',
      third: '#FF8A65',
    },
    url: '/openwidget',
  },
  {
    id: 'hello',
    name: 'TeamChat',
    icon: HelloMono,
    backgroundColors: {
      main: '#9C27B0',
      second: '#AB47BC',
      third: '#BA68C8',
    },
    url: '/hello',
  },
  {
    id: 'accounts',
    name: 'Accounts',
    icon: AccountCircle, // TODO - replace with proper icon
    backgroundColors: {
      main: '#3F51B5',
      second: '#5C6BC0',
      third: '#7986CB',
    },
    withDivider: true,
    url: '/accounts',
  },
];
