import * as React from 'react';

import { ComponentMeta } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';

import { Loader, LoaderProps } from './Loader';

export default {
  title: 'Components/Loader',
  component: Loader,
} as ComponentMeta<typeof Loader>;

export const Default = (args: LoaderProps): React.ReactElement => (
  <Loader {...args} />
);

export const Sizes = (): React.ReactElement => (
  <div>
    <StoryDescriptor title="Small">
      <Loader size="small" />
    </StoryDescriptor>
    <StoryDescriptor title="Medium">
      <Loader size="medium" />
    </StoryDescriptor>
    <StoryDescriptor title="Large">
      <Loader size="large" />
    </StoryDescriptor>
  </div>
);

export const Labeled = (args: LoaderProps): React.ReactElement => (
  <Loader size="small" label="Loading..." {...args} />
);

export const CustomColors = (args: LoaderProps): React.ReactElement => (
  <Loader primaryColor="#d64646" secondaryColor="#eec4c5" {...args} />
);
