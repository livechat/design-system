import {
  AccountCircle,
  ChatBotColored,
  HelloColored,
  HelpDeskColored,
  LiveChatColored,
  OpenWidgetColored,
} from '@livechat/design-system-icons';

import { IProductOption } from './types';

export const ProductSwitcherProducts: IProductOption[] = [
  {
    id: 'livechat',
    name: 'Livechat',
    icon: LiveChatColored,
    backgroundColors: {
      primary: '#FFC107',
      secondary: '#FFD54F',
      tertiary: '#FFECB3',
    },
    url: '/livechat',
  },
  {
    id: 'chatbot',
    name: 'Chatbot',
    icon: ChatBotColored,
    backgroundColors: {
      primary: '#2196F3',
      secondary: '#64B5F6',
      tertiary: '#90CAF9',
    },
    url: '/chatbot',
  },
  {
    id: 'helpdesk',
    name: 'Helpdesk',
    icon: HelpDeskColored,
    backgroundColors: {
      primary: '#4CAF50',
      secondary: '#66BB6A',
      tertiary: '#81C784',
    },
    url: '/helpdesk',
  },
  {
    id: 'openwidget',
    name: 'Widget',
    icon: OpenWidgetColored,
    backgroundColors: {
      primary: '#FF5722',
      secondary: '#FF7043',
      tertiary: '#FF8A65',
    },
    url: '/openwidget',
  },
  {
    id: 'hello',
    name: 'TeamChat',
    icon: HelloColored,
    backgroundColors: {
      primary: '#9C27B0',
      secondary: '#AB47BC',
      tertiary: '#BA68C8',
    },
    url: '/hello',
  },
  {
    id: 'accounts',
    name: 'Accounts',
    icon: AccountCircle, // TODO - replace with proper icon
    backgroundColors: {
      primary: '#3F51B5',
      secondary: '#5C6BC0',
      tertiary: '#7986CB',
    },
    withDivider: true,
    url: '/accounts',
  },
];
