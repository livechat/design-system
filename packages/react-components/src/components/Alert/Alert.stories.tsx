import { ComponentMeta, Story } from '@storybook/react';

import { Alert as AlertComponent, AlertProps } from './Alert';

export default {
  title: 'Components/Alert',
  component: AlertComponent,
  parameters: {
    componentSubtitle: `
    Alert banners are used to let users know about important 
    informations that require immediate action or attention.
    `,
  },
  argTypes: { onClose: { defaultValue: null } },
} as ComponentMeta<typeof AlertComponent>;

const StoryTemplate: Story<AlertProps> = (args: AlertProps) => (
  <div>
    <AlertComponent {...args}>
      A description with a <b>maximum of 100 characters</b>. That usually means
      only one or two sentences.
    </AlertComponent>
  </div>
);

export const Alert = StoryTemplate.bind({});
Alert.args = {};

export const InfoAlert = StoryTemplate.bind({});
InfoAlert.args = {
  kind: 'info',
};

export const WarningAlert = StoryTemplate.bind({});
WarningAlert.args = {
  kind: 'warning',
};

export const SuccessAlert = StoryTemplate.bind({});
SuccessAlert.args = {
  kind: 'success',
};

export const ErrorAlert = StoryTemplate.bind({});
ErrorAlert.args = {
  kind: 'error',
};

export const BannerWithClose = StoryTemplate.bind({});
BannerWithClose.args = {
  onClose: () => alert('onClose click'),
};
