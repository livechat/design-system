import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  RadioButton as RadioButtonComponent,
  IRadioButtonProps,
} from '../components/RadioButton';

export default {
  title: 'Components/RadioButton',
  component: RadioButtonComponent,
  argTypes: { onChange: { action: 'changed' } },
} as ComponentMeta<typeof RadioButtonComponent>;

export const RadioButton = ({
  children,
  ...args
}: IRadioButtonProps): React.ReactElement => (
  <div>
    <RadioButtonComponent {...args}>{children}</RadioButtonComponent>
  </div>
);

RadioButton.args = {
  checked: false,
  disabled: false,
  description: 'Lorem ipsum',
  children: 'Radio button label',
} as IRadioButtonProps;
