import * as React from 'react';

import { type Meta, type StoryObj } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';

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

export const CustomSizes = (): React.ReactElement => (
  <>
    <StoryDescriptor title="Small width">
      <div style={{ width: '200px' }}>
        <Stepper steps={4} activeStep={2} />
      </div>
    </StoryDescriptor>
    <StoryDescriptor title="Medium width">
      <div style={{ width: '400px' }}>
        <Stepper steps={4} activeStep={2} />
      </div>
    </StoryDescriptor>
    <StoryDescriptor title="Large width">
      <div style={{ width: '600px' }}>
        <Stepper steps={4} activeStep={2} />
      </div>
    </StoryDescriptor>
  </>
);
