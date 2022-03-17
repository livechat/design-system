import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import { TextFieldProps, TextField as TextFieldComponent } from './TextField';

export default {
  title: 'Components/TextField',
  component: TextFieldComponent,
  parameters: {
    componentSubtitle: `
      TextField is useful if you need to develop custom input field, 
      but want to reuse the logic behind labels, descriptions and errors 
      present in other form components like InputField, TextAreaField etc.
    `,
  },
} as ComponentMeta<typeof TextFieldComponent>;

const StoryTemplate: Story<TextFieldProps> = (args: TextFieldProps) => (
  <div>
    <TextFieldComponent {...args}>
      <input style={{ height: 26 }} id="text-field-example" />
    </TextFieldComponent>
  </div>
);

export const TextField = StoryTemplate.bind({});
TextField.args = {};

export const TextFieldWithLabel = StoryTemplate.bind({});
TextFieldWithLabel.args = {
  labelText: 'Example label text',
};

export const TextFieldWithLabelInline = StoryTemplate.bind({});
TextFieldWithLabelInline.args = {
  labelText: 'Example label text',
  inline: true,
};

export const TextFieldWithLabelAndLabelRightNode = StoryTemplate.bind({});
TextFieldWithLabelAndLabelRightNode.args = {
  labelText: 'Example label text',
  labelRightNode: <img src="https://via.placeholder.com/100" />,
};

export const TextFieldWithLabelAdornment = StoryTemplate.bind({});
TextFieldWithLabelAdornment.args = {
  labelText: 'Example label text',
  labelAdornment: <img src="https://via.placeholder.com/100" />,
};

export const TextFieldWithError = StoryTemplate.bind({});
TextFieldWithError.args = {
  error: 'Error text',
};

export const TextFieldWithDescription = StoryTemplate.bind({});
TextFieldWithDescription.args = {
  description: <div>Description text</div>,
};
