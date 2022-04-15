import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  ToastWrapperProps,
  ToastWrapper as ToastWrapperComponent,
} from './ToastWrapper';

export default {
  title: 'Components/Toast Wrapper',
  component: ToastWrapperComponent,
  parameters: {
    componentSubtitle: `
    You can use ToastWrapper component to position your toasts.
    `,
  },
} as ComponentMeta<typeof ToastWrapperComponent>;

export const ToastWrapper = (args: ToastWrapperProps): React.ReactElement => (
  <div style={{ width: '100%', height: 700, position: 'relative' }}>
    <ToastWrapperComponent {...args} />
  </div>
);

ToastWrapper.args = {
  fixed: false,
  toasts: [
    {
      id: '1',
      kind: 'success',
      content: <div>First toast with DOM element as content</div>,
    },
    {
      id: '2',
      kind: 'info',
      content: 'Second toast with string as content and with removable prop',
      removable: true,
    },
    {
      id: '3',
      kind: 'waringn',
      content: 'Third toast with action',
      action: {
        label: 'Action',
        handler: () => alert('Third toast action click'),
      },
    },
    {
      id: '4',
      kind: 'error',
      content: 'Fourth toast',
    },
  ],
};
