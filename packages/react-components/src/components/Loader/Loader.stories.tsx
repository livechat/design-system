import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Loader, LoaderProps } from './Loader';

export default {
  title: 'Components/Loader',
  component: Loader,
} as ComponentMeta<typeof Loader>;

export const sizes = (): React.ReactElement => (
  <div className="story-spacer">
    <Loader size="small" />
    <Loader size="medium" />
    <Loader size="large" />
  </div>
);

export const labeled = (args: LoaderProps): React.ReactElement => (
  <Loader size="small" label="Loading..." {...args} />
);

export const customColors = (args: LoaderProps): React.ReactElement => (
  <Loader primaryColor="#d64646" secondaryColor="#eec4c5" {...args} />
);
