import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  Switch as SwitchComponent,
  IProps as ISwitchProps,
} from '../components/Switch';
import { noop } from '../components/constants';

export default {
  title: 'Components/Switch',
  component: SwitchComponent,
} as ComponentMeta<typeof SwitchComponent>;

export const Switch = (args: ISwitchProps): React.ReactElement => {
  return (
    <div>
      <SwitchComponent {...args} />
    </div>
  );
};

Switch.args = {
  onChange: noop,
};
