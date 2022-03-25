import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import {
  NumericInputProps,
  NumericInput as NumericInputComponent,
} from './NumericInput';
import { sumString } from './helpers';

export default {
  title: 'Forms (WIP)/NumericInput',
  component: NumericInputComponent,
  argTypes: {
    value: {
      control: {
        disable: true,
      },
    },
  },
} as ComponentMeta<typeof NumericInputComponent>;

const StoryTemplate: Story<NumericInputProps> = (args: NumericInputProps) => {
  const [value, setValue] = React.useState(args.value || '0');

  return (
    <div>
      <NumericInputComponent
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

export const NumericInputWithError = StoryTemplate.bind({});
NumericInputWithError.args = {
  error: 'Error',
};
