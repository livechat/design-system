import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  ProgressCircle as ProgressCircleComponent,
  ProgressCircleProps,
} from './ProgressCircle';

export default {
  title: 'Components/Progress',
  component: ProgressCircleComponent,
} as ComponentMeta<typeof ProgressCircleComponent>;

export const ProgressCircle = (
  args: ProgressCircleProps
): React.ReactElement => {
  return (
    <div>
      <ProgressCircleComponent {...args} />
    </div>
  );
};

ProgressCircle.args = {
  percent: 10,
  status: 'normal',
  size: 'medium',
};
