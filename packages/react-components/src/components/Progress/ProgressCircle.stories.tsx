import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  ProgressCircle as ProgressCircleComponent,
  ProgressCircleProps,
} from './ProgressCircle';

export default {
  title: 'Components/Progress/ProgressCircle',
  component: ProgressCircleComponent,
} as ComponentMeta<typeof ProgressCircleComponent>;

export const ProgressCircle = (
  args: ProgressCircleProps
): React.ReactElement => {
  return <ProgressCircleComponent {...args} />;
};

ProgressCircle.args = {
  progressValue: 30,
  status: 'normal',
  size: 'medium',
};
