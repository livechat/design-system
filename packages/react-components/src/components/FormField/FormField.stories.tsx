import { Info } from '@livechat/design-system-icons';
import { Meta, StoryFn } from '@storybook/react';

import { Icon } from '../Icon';
import { Input } from '../Input';
import { IInputProps } from '../Input/types';

import { FormField as FormFieldComponent, FormFieldProps } from './FormField';

export default {
  title: 'Forms/FormField',
  component: FormFieldComponent,
  argTypes: {
    children: {
      control: false,
    },
    labelAdornment: {
      control: false,
    },
    labelFor: {
      control: false,
    },
    labelRightNode: {
      control: false,
    },
  },
} as Meta<typeof FormFieldComponent>;

const ExampleIcon = () => <Icon source={Info} />;
const ExampleInput = ({ ...args }: IInputProps) => (
  <Input placeholder="Placeholder text" {...args} />
);
const LabelText = 'Email';
const DescriptionText = 'Enter your email address';
const PlaceholderText = 'e.g., john@example.com';

const StoryTemplate: StoryFn<FormFieldProps> = (args: FormFieldProps) => (
  <div>
    <FormFieldComponent {...args}>
      {args.children || <Input placeholder={PlaceholderText} />}
    </FormFieldComponent>
  </div>
);

export const Default = StoryTemplate.bind({});
Default.args = {};

export const WithLabel: StoryFn<FormFieldProps> = () => (
  <FormFieldComponent labelText={LabelText}>
    <ExampleInput placeholder={PlaceholderText} />
  </FormFieldComponent>
);

export const WithInlineLabel: StoryFn<FormFieldProps> = () => (
  <FormFieldComponent labelText={LabelText} inline>
    <ExampleInput />
  </FormFieldComponent>
);

export const WithLabelDescriptionAndRightNode: StoryFn<FormFieldProps> = () => (
  <FormFieldComponent
    labelText={LabelText}
    labelRightNode={<ExampleIcon />}
    description={DescriptionText}
  >
    <ExampleInput placeholder={PlaceholderText} />
  </FormFieldComponent>
);

export const WithLabelAndLabelAdornment: StoryFn<FormFieldProps> = () => (
  <FormFieldComponent
    labelText="Username"
    labelAdornment={'(Optional)'}
    description="Username must be unique"
  >
    <ExampleInput />
  </FormFieldComponent>
);

export const WithInlineLabelAndLabelAdornment: StoryFn<FormFieldProps> = () => (
  <FormFieldComponent
    labelText="Username"
    labelAdornment={'(Optional)'}
    description="Username must be unique"
    inline
  >
    <ExampleInput />
  </FormFieldComponent>
);

export const TextFieldWithError: StoryFn<FormFieldProps> = () => (
  <FormFieldComponent labelText="Username" error="Username must be unique">
    <ExampleInput error />
  </FormFieldComponent>
);
