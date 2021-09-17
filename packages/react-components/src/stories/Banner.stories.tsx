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

Banner.args = {
  type: BannerType.Info,
  size: BannerSize.Small,
  onClose: () => {
    alert('onClose click');
  },
};
