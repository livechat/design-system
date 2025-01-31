import { type Meta, type StoryObj } from '@storybook/react';

import { Stepper } from './Stepper';

const meta: Meta<typeof Stepper> = {
  title: 'Components/Stepper',
  component: Stepper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Stepper>;

export const Default: Story = {
  args: {
    activeStep: 1,
    steps: 6,
  },
};

export const MiddleProgress: Story = {
  args: {
    activeStep: 3,
    steps: 6,
  },
};

export const Completed: Story = {
  args: {
    activeStep: 6,
    steps: 6,
  },
};
