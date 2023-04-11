import { ComponentMeta } from '@storybook/react';
import { ReactElement } from 'react';

import {
  ProgressBar as ProgressBarComponent,
  ProgressBarProps,
} from './ProgressBar';

export default {
  title: 'Components/Progress',
  component: ProgressBarComponent,
} as ComponentMeta<typeof ProgressBarComponent>;

export const ProgressBar = (args: ProgressBarProps): ReactElement => {
  return <ProgressBarComponent {...args} />;
};

ProgressBar.args = {
  percent: 10,
  status: 'normal',
  size: 'medium',
};
