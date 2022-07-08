import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Input as InputComponent, InputProps } from './Input';

export default {
  title: 'Forms/Input',
  component: InputComponent,
} as ComponentMeta<typeof InputComponent>;

export const Input = ({ ...args }): React.ReactElement => (
  <InputComponent {...args} />
);

Input.args = {
  size: 'medium',
  placeholder: 'Placeholder text',
  error: false,
  disabled: false,
} as InputProps;

export const WithIcon = () => <div>TODO</div>;
export const WithArrow = () => <div>TODO</div>;
export const WithIconAndArrow = () => <div>TODO</div>;
