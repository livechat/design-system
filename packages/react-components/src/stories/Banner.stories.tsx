import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  Banner as BannerComponent,
  BannerSize,
  BannerType,
  IBannerProps,
} from '../components/Banner';

export default {
  title: 'Components/Banner',
  component: BannerComponent,
  parameters: {
    componentSubtitle: `
    Alert banners are used to let users know about important 
    informations that require immediate action or attention.
    `,
  },
  argTypes: { onClose: { defaultValue: null } },
} as ComponentMeta<typeof BannerComponent>;

type IBannerArgs = IBannerProps;

export const Banner = (args: IBannerArgs): React.ReactElement => (
  <div>
    <BannerComponent {...args}>
      <>
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </>
    </BannerComponent>
  </div>
);

Banner.args = {};

export const InfoBanner = (args: IBannerArgs): React.ReactElement => (
  <div>
    <BannerComponent {...args}>
      <>
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </>
    </BannerComponent>
  </div>
);

InfoBanner.args = {
  type: BannerType.Info,
};

export const WarningBanner = (args: IBannerArgs): React.ReactElement => (
  <div>
    <BannerComponent {...args}>
      <>
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </>
    </BannerComponent>
  </div>
);

WarningBanner.args = {
  type: BannerType.Warning,
};

export const SuccessBanner = (args: IBannerArgs): React.ReactElement => (
  <div>
    <BannerComponent {...args}>
      <>
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </>
    </BannerComponent>
  </div>
);

SuccessBanner.args = {
  type: BannerType.Success,
};

export const ErrorBanner = (args: IBannerArgs): React.ReactElement => (
  <div>
    <BannerComponent {...args}>
      <>
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </>
    </BannerComponent>
  </div>
);

ErrorBanner.args = {
  type: BannerType.Error,
};

export const BannerWithClose = (args: IBannerArgs): React.ReactElement => (
  <div>
    <BannerComponent {...args}>
      <>
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </>
    </BannerComponent>
  </div>
);

BannerWithClose.args = {
  onClose: () => alert('onClose click'),
};

export const SmallBanner = (args: IBannerArgs): React.ReactElement => (
  <div>
    <BannerComponent {...args}>
      <>
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </>
    </BannerComponent>
  </div>
);

SmallBanner.args = {
  size: BannerSize.Small,
};

export const MediumBanner = (args: IBannerArgs): React.ReactElement => (
  <div>
    <BannerComponent {...args}>
      <>
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </>
    </BannerComponent>
  </div>
);

MediumBanner.args = {
  size: BannerSize.Medium,
};

export const LargeBanner = (args: IBannerArgs): React.ReactElement => (
  <div>
    <BannerComponent {...args}>
      <>
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </>
    </BannerComponent>
  </div>
);

LargeBanner.args = {
  size: BannerSize.Large,
};
