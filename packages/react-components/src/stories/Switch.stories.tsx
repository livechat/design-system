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

interface ISwitchArgs extends ISwitchProps {
  label: string;
}

export const Switch = (args: ISwitchArgs): React.ReactElement => {
  const containerStyles = {
    width: '150px',
    height: '50px',
    display: 'flex',
    'align-items': 'center',
    'justify-content': 'space-between',
  };
  return (
    <div style={containerStyles}>
      <SwitchComponent {...args} /> {args.label}
    </div>
  );
};

Switch.args = {
  label: 'Toggle me!',
  onChange: noop,
};
