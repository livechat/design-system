import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import {
  INumericInputFieldProps,
  NumericInputField as NumericInputFieldComponent,
} from '../components/NumericInputField';
import { sumString } from './helpers';

export default {
  title: 'Components/NumericInputField',
  component: NumericInputFieldComponent,
  argTypes: {
    value: {
      control: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof NumericInputFieldComponent>;

const StoryTemplate: Story<INumericInputFieldProps> = (
  args: INumericInputFieldProps
) => {
  const [value, setValue] = React.useState('0');

  return (
    <div>
      <NumericInputFieldComponent
        {...args}
        value={value}
        onChange={(v) =>
          setValue((prevValue) => {
            return sumString(prevValue, v as string);
          })
        }
      />
    </div>
  );
};

export const NumericInputField = StoryTemplate.bind({});
NumericInputField.args = {};

export const NumericInputFieldWithProps = StoryTemplate.bind({});
NumericInputFieldWithProps.args = {
  labelText: 'Number',
  description: 'Value should be within range [-10, 20]',
  min: -10,
  max: 20,
};

export const NumericInputFieldWithDisabled = StoryTemplate.bind({});
NumericInputFieldWithDisabled.args = {
  labelText: 'Number',
  disabled: true,
};

export const NumericInputFieldWithError = StoryTemplate.bind({});
NumericInputFieldWithError.args = {
  labelText: 'Number',
  error: 'Error text',
};
