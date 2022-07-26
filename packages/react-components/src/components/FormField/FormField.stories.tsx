import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import { FormField as FormFieldComponent, FormFieldProps } from './FormField';
import { Input } from '../Input';
import { NumericInput } from '../NumericInput';

export default {
  title: 'Forms/FormField',
  component: FormFieldComponent,
  parameters: {
    controls: { exclude: ['children'] },
  },
} as ComponentMeta<typeof FormFieldComponent>;

const StoryTemplate: Story<FormFieldProps> = (args: FormFieldProps) => (
  <div>
    <FormFieldComponent {...args}>
      {args.children || (
        <Input error={!!args.error} placeholder="Placeholder text" />
      )}
    </FormFieldComponent>
  </div>
);

export const TextField = StoryTemplate.bind({});
TextField.args = {
  inline: false,
  labelText: '',
  labelRightNode: '',
  labelAdornment: '',
  description: '',
  error: '',
};

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
  labelRightNode: '10/100',
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
  description: 'Description text',
};

export const NumericField = StoryTemplate.bind({});
NumericField.args = {
  labelText: 'Label',
  description: 'Description text',
  children: <NumericInput value="1" onChange={() => 1} />,
};
