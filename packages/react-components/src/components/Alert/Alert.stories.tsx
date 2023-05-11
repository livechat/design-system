import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Alert as AlertComponent, AlertProps } from './Alert';
import noop from '../../utils/noop';
import { StoryDescriptor } from '../../stories/components/StoryDescriptor';

export default {
  title: 'Components/Alert',
  component: AlertComponent,
  parameters: {
    componentSubtitle: `
    Alert banners are used to let users know about important 
    informations that require immediate action or attention.
    `,
  },
  argTypes: {
    onClose: {
      action: 'clicked',
    },
  },
} as ComponentMeta<typeof AlertComponent>;

export const Default = (args: AlertProps): JSX.Element => (
  <div>
    <AlertComponent {...args}>
      A description with a <b>maximum of 100 characters</b>. That usually means
      only one or two sentences.
    </AlertComponent>
  </div>
);

export const Kinds = (): JSX.Element => (
  <div>
    <StoryDescriptor title="Info">
      <AlertComponent>
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </AlertComponent>
    </StoryDescriptor>
    <StoryDescriptor title="Warning">
      <AlertComponent kind="warning">
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </AlertComponent>
    </StoryDescriptor>
    <StoryDescriptor title="Success">
      <AlertComponent kind="success">
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </AlertComponent>
    </StoryDescriptor>
    <StoryDescriptor title="Error">
      <AlertComponent kind="error">
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </AlertComponent>
    </StoryDescriptor>
  </div>
);

export const BannerWithClose = (): JSX.Element => (
  <div>
    <AlertComponent onClose={noop}>
      A description with a <b>maximum of 100 characters</b>. That usually means
      only one or two sentences.
    </AlertComponent>
  </div>
);
