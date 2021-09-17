import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  IToastWrapperProps,
  ToastWrapper as ToastWrapperComponent,
} from '../components/ToastWrapper';
import { Variants } from '../components/Toast';

export default {
  title: 'Components/Toast Wrapper',
  component: ToastWrapperComponent,
} as ComponentMeta<typeof ToastWrapperComponent>;

export const ToastWrapper = (args: IToastWrapperProps): React.ReactElement => (
  <div>
    <ToastWrapperComponent {...args} />
  </div>
);

ToastWrapper.args = {
  toasts: [
    {
      id: '1',
      variant: Variants.Success,
      content: <div>First toast with DOM element as content</div>,
    },
    {
      id: '2',
      variant: Variants.Info,
      content: 'Second toast with string as content and with removable prop',
      removable: true,
    },
    {
      id: '3',
      variant: Variants.Warning,
      content: 'Third toast with action',
      action: {
        label: 'Action',
        handler: () => alert('Third toast action click'),
      },
    },
    {
      id: '4',
      variant: Variants.Error,
      content: 'Fourth toast',
    },
  ],
};
