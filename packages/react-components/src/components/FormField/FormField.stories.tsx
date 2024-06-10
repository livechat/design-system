import * as React from 'react';

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

export const Examples = (): React.ReactElement => {
  return (
    <div>
      <StoryDescriptor title="With Label">
        <FormFieldComponent labelText={LabelText} description={DescriptionText}>
          <ExampleInput />
        </FormFieldComponent>
      </StoryDescriptor>
      <StoryDescriptor title="With Inline Label">
        <FormFieldComponent
          labelText={LabelText}
          inline
          description={DescriptionText}
        >
          <ExampleInput />
        </FormFieldComponent>
      </StoryDescriptor>
      <StoryDescriptor title="With Label and Right node">
        <FormFieldComponent
          labelText={LabelText}
          labelRightNode={<ExampleIcon />}
          description={DescriptionText}
        >
          <ExampleInput />
        </FormFieldComponent>
      </StoryDescriptor>
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
      <StoryDescriptor title="With Label and Label Adornment">
        <FormFieldComponent
          labelText={LabelText}
          labelAdornment={'(Optional)'}
          description={DescriptionText}
        >
          <ExampleInput />
        </FormFieldComponent>
      </StoryDescriptor>
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
    </div>
  );
};

export const TextFieldWithError = StoryTemplate.bind({});
TextFieldWithError.args = {
  error: 'Error text',
};
