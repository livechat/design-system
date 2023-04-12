import { ComponentMeta } from '@storybook/react';
import { ReactElement } from 'react';

import { Loader, LoaderProps } from './Loader';

export default {
  title: 'Components/Loader',
  component: Loader,
} as ComponentMeta<typeof Loader>;

export const sizes = (): ReactElement => (
  <div className="story-spacer">
    <Loader size="small" />
    <Loader size="medium" />
    <Loader size="large" />
  </div>
);

export const labeled = (args: LoaderProps): ReactElement => (
  <Loader size="small" label="Loading..." {...args} />
);

export const customColors = (args: LoaderProps): ReactElement => (
  <Loader primaryColor="#d64646" secondaryColor="#eec4c5" {...args} />
);
