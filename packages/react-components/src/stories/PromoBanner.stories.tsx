import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  IPromoBannerProps,
  PromoBanner as PromoBannerComponent,
  PromoBannerSize,
} from '../components/PromoBanner';

export default {
  title: 'Components/PromoBanner',
  component: PromoBannerComponent,
  parameters: {
    componentSubtitle: `
      Promo banner component is used to let users know about upgrade options, new features, 
      or any other information that doesn't require immediate action. This component should be 
      used wisely so don't overuse it too often. Remember to always specify the action that you 
      want to promote.
    `,
  },
  argTypes: { onClose: { defaultValue: null } },
} as ComponentMeta<typeof PromoBannerComponent>;

type IPromoBannerArgs = IPromoBannerProps;

export const PromoBanner = (args: IPromoBannerArgs): React.ReactElement => (
  <div>
    <PromoBannerComponent {...args}>
      <>
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </>
    </PromoBannerComponent>
  </div>
);

PromoBanner.args = {
  header: 'This example headline has 40 characters',
};

export const PromoBannerWithButtons = (
  args: IPromoBannerArgs
): React.ReactElement => (
  <div>
    <PromoBannerComponent {...args}>
      <>
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </>
    </PromoBannerComponent>
  </div>
);

PromoBannerWithButtons.args = {
  header: 'This example headline has 40 characters',
  buttonText: 'Example',
  linkText: 'Example',
  onButtonClick: () => {
    alert('onButtonClick click');
  },
  onLinkClick: () => {
    alert('onLinkClick click');
  },
};

export const PromoBannerWithImage = (
  args: IPromoBannerArgs
): React.ReactElement => (
  <div>
    <PromoBannerComponent {...args}>
      <>
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </>
    </PromoBannerComponent>
  </div>
);

PromoBannerWithImage.args = {
  header: 'This example headline has 40 characters',
  img: 'https://via.placeholder.com/100',
};

export const PromoBannerLight = (
  args: IPromoBannerArgs
): React.ReactElement => (
  <div>
    <PromoBannerComponent {...args}>
      <>
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </>
    </PromoBannerComponent>
  </div>
);

PromoBannerLight.args = {
  header: 'This example headline has 40 characters',
  light: true,
};

export const PromoBannerWithClose = (
  args: IPromoBannerArgs
): React.ReactElement => (
  <div>
    <PromoBannerComponent {...args}>
      <>
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </>
    </PromoBannerComponent>
  </div>
);

PromoBannerWithClose.args = {
  header: 'This example headline has 40 characters',
  onClose: () => {
    alert('onClose click');
  },
};

export const PromoBannerSmall = (
  args: IPromoBannerArgs
): React.ReactElement => (
  <div>
    <PromoBannerComponent {...args}>
      <>
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </>
    </PromoBannerComponent>
  </div>
);

PromoBannerSmall.args = {
  header: 'This example headline has 40 characters',
  img: 'https://via.placeholder.com/100',
  size: PromoBannerSize.Small,
  buttonText: 'Example button',
  linkText: 'Example link',
  onClose: () => {
    alert('onClose click');
  },
  onButtonClick: () => {
    alert('onButtonClick click');
  },
  onLinkClick: () => {
    alert('onLinkClick click');
  },
};

export const PromoBannerMedium = (
  args: IPromoBannerArgs
): React.ReactElement => (
  <div>
    <PromoBannerComponent {...args}>
      <>
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </>
    </PromoBannerComponent>
  </div>
);

PromoBannerMedium.args = {
  header: 'This example headline has 40 characters',
  img: 'https://via.placeholder.com/100',
  size: PromoBannerSize.Medium,
  buttonText: 'Example button',
  linkText: 'Example link',
  onClose: () => {
    alert('onClose click');
  },
  onButtonClick: () => {
    alert('onButtonClick click');
  },
  onLinkClick: () => {
    alert('onLinkClick click');
  },
};

export const PromoBannerLarge = (
  args: IPromoBannerArgs
): React.ReactElement => (
  <div>
    <PromoBannerComponent {...args}>
      <>
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </>
    </PromoBannerComponent>
  </div>
);

PromoBannerLarge.args = {
  header: 'This example headline has 40 characters',
  img: 'https://via.placeholder.com/100',
  size: PromoBannerSize.Large,
  buttonText: 'Example button',
  linkText: 'Example link',
  onClose: () => {
    alert('onClose click');
  },
  onButtonClick: () => {
    alert('onButtonClick click');
  },
  onLinkClick: () => {
    alert('onLinkClick click');
  },
};
