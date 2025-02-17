import * as React from 'react';

import { Meta, StoryFn } from '@storybook/react';

import {
  NumericInputProps,
  NumericInput as NumericInputComponent,
} from './NumericInput';

export default {
  title: 'Forms/NumericInput',
  component: NumericInputComponent,
  argTypes: {
    value: {
      control: {
        disable: true,
      },
    },
  },
} as Meta<typeof NumericInputComponent>;

const StoryTemplate: StoryFn<NumericInputProps> = (args: NumericInputProps) => {
  const [value, setValue] = React.useState('0');

  return (
    <div>
      <NumericInputComponent
        {...args}
        value={value}
        onChange={(v) => setValue(v as string)}
      />
    </div>
  );
};

export const NumericInput = StoryTemplate.bind({});
NumericInput.args = {};

export const NumericInputWithMinAndMaxValues = StoryTemplate.bind({});
NumericInputWithMinAndMaxValues.args = {
  min: -10,
  max: 10,
};

export const NumericInputWithNoControls = StoryTemplate.bind({});
NumericInputWithNoControls.args = {
  noControls: true,
};

export const NumericInputWithDisabled = StoryTemplate.bind({});
NumericInputWithDisabled.args = {
  disabled: true,
};

export const NumericInputWithReadOnly = StoryTemplate.bind({});
NumericInputWithReadOnly.args = {
  readOnly: true,
};

export const NumericInputWithError = StoryTemplate.bind({});
NumericInputWithError.args = {
  error: 'Error',
};
