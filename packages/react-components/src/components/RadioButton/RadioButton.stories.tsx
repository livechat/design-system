import * as React from 'react';

import { Meta } from '@storybook/react';

import {
  RadioButton as RadioButtonComponent,
  RadioButtonProps,
} from './RadioButton';

export default {
  title: 'Forms/Radio Button',
  component: RadioButtonComponent,
  argTypes: { onChange: { action: 'changed' } },
  parameters: {
    componentSubtitle: `
    Use radio buttons where there’s a list of two or more mutually exclusive items, and the users must select exactly one option.
    `,
  },
} as Meta<typeof RadioButtonComponent>;

export const RadioButton = ({
  children,
  ...args
}: RadioButtonProps): React.ReactElement => (
  <div>
    <RadioButtonComponent {...args}>{children}</RadioButtonComponent>
  </div>
);

RadioButton.args = {
  checked: false,
  disabled: false,
  description: 'Help text',
  children: 'Radio label',
};
