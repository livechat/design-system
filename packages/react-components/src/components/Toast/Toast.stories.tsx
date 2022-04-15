import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import { ToastProps, Toast as ToastComponent } from './Toast';

export default {
  title: 'Components/Toast',
  component: ToastComponent,
  parameters: {
    componentSubtitle: `
    Toast is a small message that by default shows up in the top middle of the screen. 
    It disappears on its own after a few seconds. It provides a feedback about an operation 
    for user.
    `,
  },
} as ComponentMeta<typeof ToastComponent>;

interface IToastArgs extends ToastProps {
  label: string;
}

const StoryTemplate: Story<IToastArgs> = (args: IToastArgs) => (
  <div>
    <ToastComponent {...args}>Example text</ToastComponent>
  </div>
);

export const Toast = StoryTemplate.bind({});
Toast.args = {};

export const SuccessToast = StoryTemplate.bind({});
SuccessToast.args = {
  kind: 'success',
};

export const WarningToast = StoryTemplate.bind({});
WarningToast.args = {
  kind: 'warning',
};

export const ErrorToast = StoryTemplate.bind({});
ErrorToast.args = {
  kind: 'error',
};

export const InfoToast = StoryTemplate.bind({});
InfoToast.args = {
  kind: 'info',
};

export const NotificationToast = StoryTemplate.bind({});
NotificationToast.args = {
  kind: 'notification',
};

export const ToastWithActionAndRemovable = StoryTemplate.bind({});
ToastWithActionAndRemovable.args = {
  action: {
    label: 'Action',
    handler: () => alert('onAction click'),
  },
  removable: true,
  onClose: () => alert('onClose click'),
};
