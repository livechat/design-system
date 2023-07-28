import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';
import { DISABLED_CONTROLS } from '../../utils/story-parameters';

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
  argTypes: {
    onClose: { action: 'closed' },
    action: { control: false },
  },
} as ComponentMeta<typeof Toast>;

export const Default: Story<ToastProps> = (args: ToastProps) => (
  <Toast {...args}>All systems running</Toast>
);
Default.storyName = 'Toast';
Default.args = {};

export const Kinds: Story = (): React.ReactElement => (
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
Kinds.parameters = DISABLED_CONTROLS;

export const WithCloseIcon: Story = (): React.ReactElement => (
  <Toast removable={true} onClose={action('closed')}>
    All systems running
  </Toast>
);
WithCloseIcon.parameters = DISABLED_CONTROLS;

export const WithCustomAction = (): React.ReactElement => (
  <>
    <StoryDescriptor title="Without close icon">
      <Toast
        action={{
          label: 'Show details',
          onClick: action('closed'),
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
          onClick: action('action-clicked'),
        }}
        onClose={action('closed')}
      >
        All systems running
      </Toast>
    </StoryDescriptor>
    <StoryDescriptor title="Closing on action click">
      <Toast
        removable={true}
        action={{
          label: 'Show details',
          onClick: action('action-clicked'),
          closesOnClick: true,
        }}
        onClose={action('closed')}
      >
        All systems running
      </Toast>
    </StoryDescriptor>
  </>
);
WithCustomAction.parameters = DISABLED_CONTROLS;
