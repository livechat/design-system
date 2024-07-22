import { ReactNode } from 'react';

import { ITooltipProps } from '../Tooltip';

export type ProductId =
  | 'livechat'
  | 'helpdesk'
  | 'chatbot'
  | 'openwidget'
  | 'hello'
  | 'accounts';

export interface IProductSwitcherProps {
  mainProductId: ProductId;
  productOptions: IProductOption[];
}

export interface IProductOption {
  id: ProductId;
  name: string;
  tooltipProps?: Omit<ITooltipProps, 'triggerRenderer'>;
  icon: ReactNode;
  notificationCount?: number;
  backgroundColors: {
    main: string;
    second: string;
    third: string;
  };
  withDivider?: boolean;
  url: string;
}
