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

export const RadioButton = (args: IRadioButtonProps): React.ReactElement => (
  <div>
    <RadioButtonComponent {...args}>Radio button label</RadioButtonComponent>
  </div>
);

RadioButton.args = {
  checked: false,
  disabled: false,
  description: 'Lorem ipsum',
};
