import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';
import { ToastProps, Toast } from './Toast';

export default {
  title: 'Components/Toast',
  component: Toast,
  parameters: {
    componentSubtitle: `
    Toast is a small message that by default shows up in the top middle of the screen. 
    It disappears on its own after a few seconds. It provides a feedback about an operation 
    for user.
    `,
  },
} as ComponentMeta<typeof Toast>;

export const Default: Story<ToastProps> = (args: ToastProps) => (
  <Toast {...args}>All systems running</Toast>
);
Default.storyName = 'Toast';
Default.args = {};

export const Kinds = (): JSX.Element => (
  <>
    <StoryDescriptor title="Success">
      <Toast kind="success">Saved successfully</Toast>
    </StoryDescriptor>
    <StoryDescriptor title="Error">
      <Toast kind="error">System error</Toast>
    </StoryDescriptor>
    <StoryDescriptor title="Warning">
      <Toast kind="warning">Check your system</Toast>
    </StoryDescriptor>
    <StoryDescriptor title="Info">
      <Toast kind="info">All systems running</Toast>
    </StoryDescriptor>
  </>
);

export const WithCloseIcon = (): JSX.Element => (
  <Toast removable={true} onClose={() => alert('Close icon clicked')}>
    All systems running
  </Toast>
);

export const WithCustomAction = (): JSX.Element => (
  <>
    <StoryDescriptor title="Without close icon">
      <Toast
        action={{
          label: 'Show details',
          onClick: () => alert('Custom action button clicked'),
        }}
      >
        All systems running
      </Toast>
    </StoryDescriptor>
    <StoryDescriptor title="With close icon">
      <Toast
        removable={true}
        action={{
          label: 'Show details',
          onClick: () => alert('Custom action button clicked'),
        }}
        onClose={() => alert('Close icon clicked')}
      >
        All systems running
      </Toast>
    </StoryDescriptor>
    <StoryDescriptor title="Closing on action click">
      <Toast
        removable={true}
        action={{
          label: 'Show details',
          onClick: () => alert('Custom action button clicked'),
          closesOnClick: true,
        }}
        onClose={() => alert('Close icon clicked')}
      >
        All systems running
      </Toast>
    </StoryDescriptor>
  </>
);
