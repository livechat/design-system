import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { Button } from '../Button';
import { Text } from '../Typography';

import { GlobalAlert as GlobalAlertComponent } from './GlobalAlert';
import { TopBarAlertKind } from './types';

const meta: Meta<typeof GlobalAlertComponent> = {
  title: 'Components/GlobalAlert',
  component: GlobalAlertComponent,
  decorators: [
    (Story) => (
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof GlobalAlertComponent>;
const types: Array<TopBarAlertKind> = ['info', 'warning', 'error', 'success'];

export const Default: Story = {
  args: {
    kind: 'info',
    label: 'Info alert',
    children: (
      <Text>Some really important information with very long description</Text>
    ),
  },
};

export const LongContent: Story = {
  args: {
    kind: 'error',
    label: 'Info alert with really really really really long label ',
    children: (
      <>
        <Text>
          Some really important information with very long description
        </Text>
        <Button>Start accepting chats</Button>
      </>
    ),
  },
};

export const ControlledWithCloseButton: Story = {
  args: {
    kind: 'warning',
    label: 'Warning alert',
    children: (
      <Text>Some really important information with very long description</Text>
    ),
  },
  render: ({ children, ...args }) => {
    const [isVisible, setIsVisible] = React.useState<boolean>(false);

    return (
      <GlobalAlertComponent
        isVisible={isVisible}
        onVisibilityChange={(isOpened) => setIsVisible(isOpened)}
        onClose={() => setIsVisible(false)}
        {...args}
      >
        {children}
      </GlobalAlertComponent>
    );
  },
};

export const Kinds: Story = {
  args: {
    onClose: () => ({}),
  },
  render: ({ ...args }) => (
    <div
      style={{
        display: 'flex',
        justifyContent: 'flex-start',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      {types.map((kind) => (
        <GlobalAlertComponent
          {...args}
          kind={kind}
          label={`Alert with kind: ${kind}`}
        >
          <Text>Some description</Text>
        </GlobalAlertComponent>
      ))}
    </div>
  ),
};
