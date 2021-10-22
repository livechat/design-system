import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  ProgressBar as ProgressBarComponent,
  IProps as IProgressBarProps,
} from '../components/ProgressBar';

export default {
  title: 'Components/ProgressBar',
  component: ProgressBarComponent,
} as ComponentMeta<typeof ProgressBarComponent>;

export const ProgressBar = (args: IProgressBarProps): React.ReactElement => {
  return (
    <div>
      <ProgressBarComponent {...args} />
    </div>
  );
};

ProgressBar.args = {
  percent: 10,
  status: 'normal',
  size: 'medium',
};
