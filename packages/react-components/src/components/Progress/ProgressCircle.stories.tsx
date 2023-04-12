import { ComponentMeta } from '@storybook/react';
import { ReactElement } from 'react';

import {
  ProgressCircle as ProgressCircleComponent,
  ProgressCircleProps,
} from './ProgressCircle';

export default {
  title: 'Components/Progress',
  component: ProgressCircleComponent,
} as ComponentMeta<typeof ProgressCircleComponent>;

export const ProgressCircle = (args: ProgressCircleProps): ReactElement => {
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
