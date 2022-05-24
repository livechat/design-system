import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  ProgressBar as ProgressBarComponent,
  ProgressBarProps,
} from './ProgressBar';

export default {
  title: 'Components/Progress',
  component: ProgressBarComponent,
} as ComponentMeta<typeof ProgressBarComponent>;

export const ProgressBar = (args: ProgressBarProps): React.ReactElement => {
  return <ProgressBarComponent {...args} />;
};

ProgressBar.args = {
  percent: 10,
  status: 'normal',
  size: 'medium',
};
