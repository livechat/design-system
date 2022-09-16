import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  SegmentedControl as SegmentedControlComponent,
  SegmentedControlProps,
} from './SegmentedControl';

import { Button } from '../Button';

export default {
  title: 'Components/Segmented Control',
  component: SegmentedControlComponent,
} as ComponentMeta<typeof SegmentedControlComponent>;

export const controlled = (args: SegmentedControlProps): React.ReactElement => {
  return (
    <SegmentedControlComponent {...args}>
      <Button>First option</Button>
      <Button>Second option</Button>
      <Button>Third option</Button>
      <Button>Fourth option</Button>
    </SegmentedControlComponent>
  );
};

controlled.args = {
  currentIndex: 1,
  state: { 0: 'loading', 2: 'enabled', 3: 'disabled' },
};

export const uncontrolledWithInitialSelection = (
  args: SegmentedControlProps
): React.ReactElement => {
  return (
    <SegmentedControlComponent {...args}>
      <Button>First option</Button>
      <Button>Second option</Button>
    </SegmentedControlComponent>
  );
};

uncontrolledWithInitialSelection.args = {
  initialIndex: 1,
};
