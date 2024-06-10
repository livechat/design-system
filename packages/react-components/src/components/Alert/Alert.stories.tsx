import * as React from 'react';

import { Meta } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';
import noop from '../../utils/noop';

import { Alert, AlertProps } from './Alert';

export default {
  title: 'Components/Alert',
  component: Alert,
  parameters: {
    componentSubtitle: `
    Alert banners are used to let users know about important 
    informations that require immediate action or attention.
    `,
  },
  argTypes: {
    primaryButton: {
      control: false,
    },
    secondaryButton: {
      control: false,
    },
    onClose: {
      action: 'clicked',
    },
  },
} as Meta<typeof Alert>;

export const Default = (args: AlertProps): React.ReactElement => (
  <Alert {...args}>
    A description with a <b>maximum of 100 characters</b>. That usually means
    only one or two sentences.
  </Alert>
);

export const Kinds = (): React.ReactElement => (
  <div>
    <StoryDescriptor title="Info">
      <Alert>
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </Alert>
    </StoryDescriptor>
    <StoryDescriptor title="Warning">
      <Alert kind="warning">
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </Alert>
    </StoryDescriptor>
    <StoryDescriptor title="Success">
      <Alert kind="success">
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </Alert>
    </StoryDescriptor>
    <StoryDescriptor title="Error">
      <Alert kind="error">
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </Alert>
    </StoryDescriptor>
  </div>
);

export const WithCTA = (): React.ReactElement => (
  <div>
    <StoryDescriptor title="Space to 400px">
      <div style={{ width: 400 }}>
        <Alert
          onClose={noop}
          primaryButton={{
            label: 'Primary button',
            handleClick: noop,
          }}
          secondaryButton={{
            label: 'Link button',
            handleClick: noop,
          }}
        >
          A description with a <b>maximum of 100 characters</b>. That usually
          means only one or two sentences.
        </Alert>
      </div>
    </StoryDescriptor>
    <StoryDescriptor title="Space from 400px to 800px">
      <div style={{ width: 800 }}>
        <Alert
          onClose={noop}
          primaryButton={{
            label: 'Primary button',
            handleClick: noop,
          }}
          secondaryButton={{
            label: 'Link button',
            handleClick: noop,
          }}
        >
          A description with a <b>maximum of 100 characters</b>. That usually
          means only one or two sentences.
        </Alert>
      </div>
    </StoryDescriptor>
    <StoryDescriptor title="Space over 800px">
      <Alert
        onClose={noop}
        primaryButton={{
          label: 'Primary button',
          handleClick: noop,
        }}
        secondaryButton={{
          label: 'Link button',
          handleClick: noop,
        }}
      >
        A description with a <b>maximum of 100 characters</b>. That usually
        means only one or two sentences.
      </Alert>
    </StoryDescriptor>
  </div>
);
