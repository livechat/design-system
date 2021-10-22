import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  ProgressCircle as ProgressCircleComponent,
  IProps as IProgressCircleProps,
} from '../components/ProgressCircle';

export default {
  title: 'Components/Progress Circle',
  component: ProgressCircleComponent,
} as ComponentMeta<typeof ProgressCircleComponent>;

export const ProgressCircle = (
  args: IProgressCircleProps
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
