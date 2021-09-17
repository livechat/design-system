import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  IToastProps,
  Toast as ToastComponent,
  Variants,
} from '../components/Toast';

export default {
  title: 'Components/Toast',
  component: ToastComponent,
} as ComponentMeta<typeof ToastComponent>;

interface IToastArgs extends IToastProps {
  label: string;
}

export const Toast = (args: IToastArgs): React.ReactElement => (
  <div>
    <ToastComponent {...args}>{args.label}</ToastComponent>
  </div>
);

Toast.args = {
  id: 'lc-toast',
  label: 'Message sent!',
  removable: false,
  variant: Variants.Success,
  action: {
    handler: () => alert('Action click'),
    label: 'Action',
    closeOnClick: false,
  },
  onClose: () => alert('onClose click'),
};
