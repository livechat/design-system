import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  IPromoProps,
  Promo as PromoComponent,
  PromoSize,
} from '../components/Promo';

export default {
  title: 'Components/Promo',
  component: PromoComponent,
  parameters: {
    componentSubtitle: `
      Promo banner component is used to let users know about upgrade options, new features, 
      or any other information that doesn't require immediate action. This component should be 
      used wisely so don't overuse it too often. Remember to always specify the action that you 
      want to promote.
    `,
  },
} as ComponentMeta<typeof PromoComponent>;

type IPromoArgs = IPromoProps;

export const Promo = (args: IPromoArgs): React.ReactElement => (
  <div>
    <PromoComponent {...args}>
      <>
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </>
    </PromoComponent>
  </div>
);

Promo.args = {
  header: 'This example headline has 40 characters',
};

export const PromoWithButton = (args: IPromoArgs): React.ReactElement => (
  <div>
    <PromoComponent {...args}>
      <>
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </>
    </PromoComponent>
  </div>
);

PromoWithButton.args = {
  header: 'This example headline has 40 characters',
  buttonText: 'Example',
  onButtonClick: () => {
    alert('onButtonClick click');
  },
};

export const PromoWithLink = (args: IPromoArgs): React.ReactElement => (
  <div>
    <PromoComponent {...args}>
      <>
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </>
    </PromoComponent>
  </div>
);

PromoWithLink.args = {
  header: 'This example headline has 40 characters',
  linkText: 'Example',
  onLinknClick: () => {
    alert('onLinknClick click');
  },
};

export const PromoWithImage = (args: IPromoArgs): React.ReactElement => (
  <div>
    <PromoComponent {...args}>
      <>
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </>
    </PromoComponent>
  </div>
);

PromoWithImage.args = {
  header: 'This example headline has 40 characters',
  img: 'https://via.placeholder.com/100',
};

export const PromoLight = (args: IPromoArgs): React.ReactElement => (
  <div>
    <PromoComponent {...args}>
      <>
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </>
    </PromoComponent>
  </div>
);

PromoLight.args = {
  header: 'This example headline has 40 characters',
  light: true,
};

export const PromoWithClose = (args: IPromoArgs): React.ReactElement => (
  <div>
    <PromoComponent {...args}>
      <>
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </>
    </PromoComponent>
  </div>
);

PromoWithClose.args = {
  header: 'This example headline has 40 characters',
  showCloseButton: true,
  onClose: () => {
    alert('onClose click');
  },
};

export const PromoSmall = (args: IPromoArgs): React.ReactElement => (
  <div>
    <PromoComponent {...args}>
      <>
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </>
    </PromoComponent>
  </div>
);

PromoSmall.args = {
  header: 'This example headline has 40 characters',
  img: 'https://via.placeholder.com/100',
  size: PromoSize.Small,
  buttonText: 'Example button',
  linkText: 'Example link',
  showCloseButton: true,
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

export const PromoMedium = (args: IPromoArgs): React.ReactElement => (
  <div>
    <PromoComponent {...args}>
      <>
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </>
    </PromoComponent>
  </div>
);

PromoMedium.args = {
  header: 'This example headline has 40 characters',
  img: 'https://via.placeholder.com/100',
  size: PromoSize.Medium,
  buttonText: 'Example button',
  linkText: 'Example link',
  showCloseButton: true,
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

export const PromoLarge = (args: IPromoArgs): React.ReactElement => (
  <div>
    <PromoComponent {...args}>
      <>
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </>
    </PromoComponent>
  </div>
);

PromoLarge.args = {
  header: 'This example headline has 40 characters',
  img: 'https://via.placeholder.com/100',
  size: PromoSize.Large,
  buttonText: 'Example button',
  linkText: 'Example link',
  showCloseButton: true,
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
