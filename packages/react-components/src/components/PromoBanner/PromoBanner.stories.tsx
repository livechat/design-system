import * as React from 'react';

import { ComponentMeta, Story } from '@storybook/react';

import {
  PromoBannerProps,
  PromoBanner as PromoBannerComponent,
} from './PromoBanner';

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

const StoryTemplate: Story<PromoBannerProps> = (args: PromoBannerProps) => (
  <PromoBannerComponent {...args}>
    <>
      A description with a <b>maximum of 100 characters</b>. That usually means
      only one or two sentences.
    </>
  </PromoBannerComponent>
);

export const PromoBanner = StoryTemplate.bind({});
PromoBanner.args = {
  header: 'This example headline has 40 characters',
  img: 'https://via.placeholder.com/100',
  buttonText: 'Example',
  linkText: 'Example',
  onButtonClick: () => {
    alert('onButtonClick click');
  },
  onLinkClick: () => {
    alert('onLinkClick click');
  },
  onClose: () => {
    alert('onClose click');
  },
};

export const WithButtons = StoryTemplate.bind({});
WithButtons.args = {
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

export const WithImage = StoryTemplate.bind({});
WithImage.args = {
  header: 'This example headline has 40 characters',
  img: 'https://via.placeholder.com/100',
};

export const WithClose = StoryTemplate.bind({});
WithClose.args = {
  header: 'This example headline has 40 characters',
  onClose: () => {
    alert('onClose click');
  },
};

export const WithLight = StoryTemplate.bind({});
WithLight.args = {
  header: 'This example headline has 40 characters',
  light: true,
};
