import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { GlobalAlert as GlobalAlertComponent } from './GlobalAlert';

const meta: Meta<typeof GlobalAlertComponent> = {
  title: 'Components/GlobalAlert',
  component: GlobalAlertComponent,
};

export default meta;
type Story = StoryObj<typeof GlobalAlertComponent>;

export const Default: Story = {
  args: {
    kind: 'info',
  },
  render: ({ kind }) => (
    <GlobalAlertComponent kind={kind} label="Info alert">
      Some more text
    </GlobalAlertComponent>
  ),
};
