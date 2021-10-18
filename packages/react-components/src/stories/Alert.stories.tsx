import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import {
  Alert as AlertComponent,
  AlertSize,
  AlertType,
  IAlertProps,
} from '../components/Alert';

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

const StoryTemplate: Story<IAlertProps> = (args: IAlertProps) => (
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
  type: AlertType.Info,
};

export const WarningAlert = StoryTemplate.bind({});
WarningAlert.args = {
  type: AlertType.Warning,
};

export const SuccessAlert = StoryTemplate.bind({});
SuccessAlert.args = {
  type: AlertType.Success,
};

export const ErrorAlert = StoryTemplate.bind({});
ErrorAlert.args = {
  type: AlertType.Error,
};

export const BannerWithClose = StoryTemplate.bind({});
BannerWithClose.args = {
  onClose: () => alert('onClose click'),
};

export const SmallAlert = StoryTemplate.bind({});
SmallAlert.args = {
  size: AlertSize.Small,
};

export const MediumBanner = StoryTemplate.bind({});
MediumBanner.args = {
  size: AlertSize.Medium,
};

export const LargeAlert = StoryTemplate.bind({});
LargeAlert.args = {
  size: AlertSize.Large,
};
