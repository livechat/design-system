import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

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

type IAlertArgs = IAlertProps;

export const Alert = (args: IAlertArgs): React.ReactElement => (
  <div>
    <AlertComponent {...args}>
      A description with a <b>maximum of 100 characters</b>. That usually means
      only one or two sentences.
    </AlertComponent>
  </div>
);

Alert.args = {};

export const InfoAlert = (args: IAlertArgs): React.ReactElement => (
  <div>
    <AlertComponent {...args}>
      A description with a <b>maximum of 100 characters</b>. That usually means
      only one or two sentences.
    </AlertComponent>
  </div>
);

InfoAlert.args = {
  type: AlertType.Info,
};

export const WarningAlert = (args: IAlertArgs): React.ReactElement => (
  <div>
    <AlertComponent {...args}>
      A description with a <b>maximum of 100 characters</b>. That usually means
      only one or two sentences.
    </AlertComponent>
  </div>
);

WarningAlert.args = {
  type: AlertType.Warning,
};

export const SuccessAlert = (args: IAlertArgs): React.ReactElement => (
  <div>
    <AlertComponent {...args}>
      A description with a <b>maximum of 100 characters</b>. That usually means
      only one or two sentences.
    </AlertComponent>
  </div>
);

SuccessAlert.args = {
  type: AlertType.Success,
};

export const ErrorAlert = (args: IAlertArgs): React.ReactElement => (
  <div>
    <AlertComponent {...args}>
      A description with a <b>maximum of 100 characters</b>. That usually means
      only one or two sentences.
    </AlertComponent>
  </div>
);

ErrorAlert.args = {
  type: AlertType.Error,
};

export const BannerWithClose = (args: IAlertArgs): React.ReactElement => (
  <div>
    <AlertComponent {...args}>
      A description with a <b>maximum of 100 characters</b>. That usually means
      only one or two sentences.
    </AlertComponent>
  </div>
);

BannerWithClose.args = {
  onClose: () => alert('onClose click'),
};

export const SmallAlert = (args: IAlertArgs): React.ReactElement => (
  <div>
    <AlertComponent {...args}>
      A description with a <b>maximum of 100 characters</b>. That usually means
      only one or two sentences.
    </AlertComponent>
  </div>
);

SmallAlert.args = {
  size: AlertSize.Small,
};

export const MediumBanner = (args: IAlertArgs): React.ReactElement => (
  <div>
    <AlertComponent {...args}>
      A description with a <b>maximum of 100 characters</b>. That usually means
      only one or two sentences.
    </AlertComponent>
  </div>
);

MediumBanner.args = {
  size: AlertSize.Medium,
};

export const LargeAlert = (args: IAlertArgs): React.ReactElement => (
  <div>
    <AlertComponent {...args}>
      A description with a <b>maximum of 100 characters</b>. That usually means
      only one or two sentences.
    </AlertComponent>
  </div>
);

LargeAlert.args = {
  size: AlertSize.Large,
};
