import { Search } from '@livechat/design-system-icons';
import { Meta, StoryFn } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';
import { Icon } from '../Icon';
import { Input } from '../Input';

import { FormField as FormFieldComponent, FormFieldProps } from './FormField';

export default {
  title: 'Forms/FormField',
  component: FormFieldComponent,
  tags: ['autodocs'],
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

const ExampleIcon = () => <Icon source={Search} />;
const ExampleInput = () => <Input placeholder="Placeholder text" />;
const LabelText = 'Example label text';
const DescriptionText = 'Example description text';

const StoryTemplate: StoryFn<FormFieldProps> = (args: FormFieldProps) => (
  <div>
    <FormFieldComponent {...args}>
      {args.children || (
        <Input error={!!args.error} placeholder="Placeholder text" />
      )}
    </FormFieldComponent>
  </div>
);

export const Default = StoryTemplate.bind({});
Default.args = {};

export const WithLabel: StoryFn<FormFieldProps> = () => (
  <StoryDescriptor title="With Label">
    <FormFieldComponent labelText={LabelText} description={DescriptionText}>
      <ExampleInput />
    </FormFieldComponent>
  </StoryDescriptor>
);

export const WithInlineLabel: StoryFn<FormFieldProps> = () => (
  <StoryDescriptor title="With Inline Label">
    <FormFieldComponent
      labelText={LabelText}
      inline
      description={DescriptionText}
    >
      <ExampleInput />
    </FormFieldComponent>
  </StoryDescriptor>
);

export const WithLabelAndRightNode: StoryFn<FormFieldProps> = () => (
  <StoryDescriptor title="With Label and Right node">
    <FormFieldComponent
      labelText={LabelText}
      labelRightNode={<ExampleIcon />}
      description={DescriptionText}
    >
      <ExampleInput />
    </FormFieldComponent>
  </StoryDescriptor>
);

export const WithInlineLabelAndRightNode: StoryFn<FormFieldProps> = () => (
  <StoryDescriptor title="With Inline Label and Right node">
    <FormFieldComponent
      labelText={LabelText}
      labelRightNode={<ExampleIcon />}
      inline
      description={DescriptionText}
    >
      <ExampleInput />
    </FormFieldComponent>
  </StoryDescriptor>
);

export const WithLabelAndLabelAdornment: StoryFn<FormFieldProps> = () => (
  <StoryDescriptor title="With Label and Label Adornment">
    <FormFieldComponent
      labelText={LabelText}
      labelAdornment={'(Optional)'}
      description={DescriptionText}
    >
      <ExampleInput />
    </FormFieldComponent>
  </StoryDescriptor>
);

export const WithInlineLabelAndLabelAdornment: StoryFn<FormFieldProps> = () => (
  <StoryDescriptor title="With Inline Label and Label Adornment">
    <FormFieldComponent
      labelText={LabelText}
      labelAdornment={'(Optional)'}
      inline
      description={DescriptionText}
    >
      <ExampleInput />
    </FormFieldComponent>
  </StoryDescriptor>
);

export const TextFieldWithError = StoryTemplate.bind({});
TextFieldWithError.args = {
  error: 'Very long error message that should be displayed',
};
