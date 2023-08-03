import * as React from 'react';

import { StoryFn } from '@storybook/react';

import noop from '../../utils/noop';
import { Heading } from '../Typography';

import promoImage from './assets/promo-img.png';
import { IPromoBannerV2Props, PromoBannerV2 } from './PromoBannerV2';

export default {
  title: 'Components/PromoBannerV2',
  component: PromoBannerV2,
  argTypes: {
    primaryButton: {
      control: false,
    },
    secondaryButton: {
      control: false,
    },
    additionalContent: {
      control: false,
    },
    onClose: {
      action: 'click',
    },
  },
};

const StoryTemplate: StoryFn<IPromoBannerV2Props> = (
  args: IPromoBannerV2Props
) => (
  <PromoBannerV2 {...args}>
    <div style={{ marginBottom: 8 }}>
      <Heading as="div" size="sm">
        Title goes here, up 2 lines of text
      </Heading>
    </div>
    A description with a <b>maximum of 100 characters</b>. That usually means
    only one or two sentences.
  </PromoBannerV2>
);

export const Default = StoryTemplate.bind({});
Default.args = {
  primaryButton: {
    label: 'Main CTA',
    handleClick: noop,
  },
  secondaryButton: {
    label: 'Secondary CTA',
    handleClick: noop,
  },
  additionalContent: <img src={promoImage} style={{ alignSelf: 'end' }} />,
};
