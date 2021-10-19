import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Loader } from '../components/Loader';

export default {
  title: 'Components/Loader',
  component: Loader,
} as ComponentMeta<typeof Loader>;

export const sizes = () => (
  <div className="spacer">
    <Loader size="small" />
    <Loader size="medium" />
    <Loader size="large"></Loader>
  </div>
);

export const labeled = (args) => (
  <Loader size="small" label="Loading..." {...args} />
);

export const customColors = (args) => (
  <Loader primaryColor="#d64646" secondaryColor="#eec4c5" {...args} />
);
