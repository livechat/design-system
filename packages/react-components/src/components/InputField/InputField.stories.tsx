import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import {
  InputFieldProps,
  InputField as InputFieldComponent,
} from './InputField';
import { Text } from '../Typography';

export default {
  title: 'Components/InputField',
  component: InputFieldComponent,
  parameters: {
    componentSubtitle: `
      InputField contains a TextField component, so most of the props are directed to 
      handle TextField elements, e.g. label or description.
      The InputField itself is prepared to accept props dedicated to the <input>, 
      which we can pass by InputField.
    `,
  },
} as ComponentMeta<typeof InputFieldComponent>;

const StoryTemplate: Story<InputFieldProps> = (args: InputFieldProps) => (
  <div>
    <InputFieldComponent
      labelText="Input Field label"
      placeholder="Placeholder..."
      description={
        <div>
          <Text as="span" size="sm">
            Help text
          </Text>
        </div>
      }
      {...args}
    />
  </div>
);

export const InputField = StoryTemplate.bind({});
InputField.args = {};

export const InputFieldWithInline = StoryTemplate.bind({});
InputFieldWithInline.args = {
  inline: true,
  id: 'withInline',
};

export const InputFieldWithDisabled = StoryTemplate.bind({});
InputFieldWithDisabled.args = {
  disabled: true,
};

export const InputFieldWithCustomInputStyles = StoryTemplate.bind({});
InputFieldWithCustomInputStyles.args = {
  style: {
    width: 400,
    height: 50,
    borderColor: 'var(--color-positive-default)',
  },
};

export const InputFieldWithMaxLength = StoryTemplate.bind({});
InputFieldWithMaxLength.args = {
  maxLength: 20,
  id: 'withMaxLength',
};

export const InputFieldWithError = StoryTemplate.bind({});
InputFieldWithError.args = {
  error: 'Error text',
  id: 'withError',
};
