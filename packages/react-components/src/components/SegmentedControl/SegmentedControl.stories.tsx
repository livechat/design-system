import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  SegmentedControl as SegmentedControlComponent,
  SegmentedControlProps,
} from './SegmentedControl';

export default {
  title: 'Components/Segmented Control',
  component: SegmentedControlComponent,
} as ComponentMeta<typeof SegmentedControlComponent>;

export const controlled = (args: SegmentedControlProps): React.ReactElement => {
  return <SegmentedControlComponent {...args} />;
};

controlled.args = {
  buttons: [
    { id: 'one', label: 'one', state: ['loading', 'disabled'] },
    { id: 'two', label: 'two', state: 'disabled' },
    { id: 'three', label: 'three' },
    { id: 'fourth', label: 'fourth' },
  ],
  initialId: 'fourth',
};

export const uncontrolledWithInitialSelection = (
  args: SegmentedControlProps
): React.ReactElement => {
  return <SegmentedControlComponent {...args} />;
};

uncontrolledWithInitialSelection.args = {
  buttons: [
    { id: 'one', label: 'one' },
    { id: 'two', label: 'two', state: 'disabled' },
    { id: 'three', label: 'three' },
    { id: 'fourth', label: 'fourth' },
  ],
  currentId: 'one',
};
