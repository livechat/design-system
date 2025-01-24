import { Info } from '@livechat/design-system-icons';
import { Meta, StoryFn } from '@storybook/react';

import { ReadOnlyFormFieldContextProvider } from '../../providers/ReadOnlyFormFieldProvider';
import { StoryDescriptor } from '../../stories/components/StoryDescriptor';
import { AutoComplete } from '../AutoComplete';
import { Checkbox } from '../Checkbox';
import { Icon } from '../Icon';
import { Input, InputPromo } from '../Input';
import { IInputProps } from '../Input/types';
import { NumericInput } from '../NumericInput';
import { Picker } from '../Picker';
import { RadioButton } from '../RadioButton';
import { TagInput } from '../TagInput';
import { Textarea } from '../Textarea';

import { FormField as FormFieldComponent, FormFieldProps } from './FormField';

const DEFAULT_PICKER_OPTIONS = [
  { key: 'one', name: 'Option one' },
  { key: 'groupA', name: 'Group A title header', groupHeader: true },
  { key: 'two', name: 'Option two' },
  { key: 'three', name: 'Option three' },
  { key: 'groupB', name: 'Group B title header', groupHeader: true },
];

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
    parameters: {
      controls: {
        exclude: ['boldLabel'],
      },
    },
  },
} as Meta<typeof FormFieldComponent>;

const ExampleIcon = () => <Icon source={Info} />;
const ExampleInput = ({ ...args }: IInputProps) => (
  <Input placeholder="Placeholder text" {...args} />
);
const ExampleInputPromo = ({ ...args }: IInputProps) => (
  <InputPromo placeholder="Placeholder text" {...args} />
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

const ReadOnlyTemplate: StoryFn<FormFieldProps> = (args) => (
  <ReadOnlyFormFieldContextProvider readOnly={args.readOnly}>
    <div>
      <StoryDescriptor title="WithNoValue">
        <FormFieldComponent {...args}>
          <ExampleInput />
        </FormFieldComponent>
      </StoryDescriptor>
      <StoryDescriptor title="WithInput">
        <FormFieldComponent {...args}>
          <ExampleInput value="test value" />
        </FormFieldComponent>
      </StoryDescriptor>
      <StoryDescriptor title="WithPromoInput">
        <FormFieldComponent {...args} boldLabel>
          <ExampleInputPromo value="test value" />
        </FormFieldComponent>
      </StoryDescriptor>
      <StoryDescriptor title="WithPicker">
        <FormFieldComponent {...args}>
          <Picker
            onSelect={() => {}}
            options={DEFAULT_PICKER_OPTIONS}
            selected={DEFAULT_PICKER_OPTIONS.slice(0, 3)}
          />
        </FormFieldComponent>
      </StoryDescriptor>
      <StoryDescriptor title="WithTagInput">
        <FormFieldComponent {...args}>
          <TagInput onChange={() => {}} />
        </FormFieldComponent>
      </StoryDescriptor>

      {/* // Those also? */}
      <StoryDescriptor title="WithNumericInput">
        <FormFieldComponent {...args}>
          <NumericInput value="456" onChange={() => {}} />
        </FormFieldComponent>
      </StoryDescriptor>
      <StoryDescriptor title="WithCheckbox">
        <FormFieldComponent {...args}>
          <Checkbox />
        </FormFieldComponent>
      </StoryDescriptor>
      <StoryDescriptor title="WithTextarea">
        <FormFieldComponent {...args}>
          <Textarea />
        </FormFieldComponent>
      </StoryDescriptor>
      <StoryDescriptor title="WithRadio">
        <FormFieldComponent {...args}>
          <RadioButton />
          <RadioButton />
        </FormFieldComponent>
      </StoryDescriptor>
      <StoryDescriptor title="WithAutocomplete">
        <FormFieldComponent {...args}>
          <AutoComplete />
        </FormFieldComponent>
      </StoryDescriptor>
    </div>
  </ReadOnlyFormFieldContextProvider>
);

export const TextFieldReadOnly = ReadOnlyTemplate.bind({});
TextFieldReadOnly.args = {
  labelText: 'My label',
  readOnly: true,
};

export const BoldLabelWithPromoInput: StoryFn<FormFieldProps> = () => (
  <FormFieldComponent labelText="Username" boldLabel>
    <ExampleInputPromo />
  </FormFieldComponent>
);
