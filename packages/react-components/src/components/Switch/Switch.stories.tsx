import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Switch as SwitchComponent, SwitchProps, SwitchSize } from './Switch';
import noop from '../../utils/noop';

export default {
  title: 'Components/Switch',
  component: SwitchComponent,
} as ComponentMeta<typeof SwitchComponent>;

export const Switch = (args: SwitchProps): React.ReactElement => {
  return (
    <div>
      <SwitchComponent {...args} />
    </div>
  );
};

Switch.args = {
  size: SwitchSize.Basic,
  onChange: noop,
};
