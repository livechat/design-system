import * as React from 'react';

import { Meta } from '@storybook/react-vite';

import {
  ProgressBar as ProgressBarComponent,
  ProgressBarProps,
} from './ProgressBar';

export default {
  title: 'Components/Progress/ProgressBar',
  component: ProgressBarComponent,
} as Meta<typeof ProgressBarComponent>;

export const ProgressBar = (args: ProgressBarProps): React.ReactElement => {
  return <ProgressBarComponent {...args} />;
};

ProgressBar.args = {
  percent: 10,
  status: 'normal',
  size: 'medium',
};
