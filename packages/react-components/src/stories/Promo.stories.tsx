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
  buttonText: null,
  header: 'This example headline has 40 characters',
  img: 'https://via.placeholder.com/100',
  light: false,
  linkText: false,
  size: PromoSize.Small,
  onClose: () => {
    alert('onClose click');
  },
};
