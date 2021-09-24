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
    <ToastComponent {...args}>Example text</ToastComponent>
  </div>
);

Toast.args = {
  id: 'lc-toast',
};

export const SuccessToast = (args: IToastArgs): React.ReactElement => (
  <div>
    <ToastComponent {...args}>Example text</ToastComponent>
  </div>
);

SuccessToast.args = {
  id: 'lc-toast',
  variant: Variants.Success,
};

export const WarningToast = (args: IToastArgs): React.ReactElement => (
  <div>
    <ToastComponent {...args}>Example text</ToastComponent>
  </div>
);

WarningToast.args = {
  id: 'lc-toast',
  variant: Variants.Warning,
};

export const ErrorToast = (args: IToastArgs): React.ReactElement => (
  <div>
    <ToastComponent {...args}>Example text</ToastComponent>
  </div>
);

ErrorToast.args = {
  id: 'lc-toast',
  variant: Variants.Error,
};

export const InfoToast = (args: IToastArgs): React.ReactElement => (
  <div>
    <ToastComponent {...args}>Example text</ToastComponent>
  </div>
);

InfoToast.args = {
  id: 'lc-toast',
  variant: Variants.Info,
};

export const NotificationToast = (args: IToastArgs): React.ReactElement => (
  <div>
    <ToastComponent {...args}>Example text</ToastComponent>
  </div>
);

NotificationToast.args = {
  id: 'lc-toast',
  variant: Variants.Notification,
};

export const ToastWithActionAndRemovable = (
  args: IToastArgs
): React.ReactElement => (
  <div>
    <ToastComponent {...args}>Example text</ToastComponent>
  </div>
);

ToastWithActionAndRemovable.args = {
  action: {
    label: 'Action',
    handler: () => alert('onAction click'),
  },
  removable: true,
  onClose: () => alert('onClose click'),
};
