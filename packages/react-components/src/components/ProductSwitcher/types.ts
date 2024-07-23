import { IconSource } from '../Icon';
import { ITooltipProps } from '../Tooltip';

export type ProductId =
  | 'livechat'
  | 'helpdesk'
  | 'chatbot'
  | 'openwidget'
  | 'knowledgebase'
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
  icon: IconSource;
  notificationCount?: number;
  backgroundColors: {
    main: string;
    second: string;
    third: string;
  };
  withDivider?: boolean;
  url: string;
}
