import * as React from 'react';

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
import { Text } from '../Typography';

import { FormField as FormFieldComponent, FormFieldProps } from './FormField';

const DEFAULT_PICKER_OPTIONS = [
  { key: 'one', name: 'Option one' },
  { key: 'groupA', name: 'Group A title header', groupHeader: true },
  { key: 'two', name: 'Option two' },
  { key: 'three', name: 'Option three' },
  { key: 'groupB', name: 'Group B title header', groupHeader: true },
  { key: 'four', name: 'Option four' },
  { key: 'five', name: 'Option five' },
  { key: 'six', name: 'Option six' },
  { key: 'seven', name: 'Option seven' },
  { key: 'eight', name: 'Option eight' },
  { key: 'nine', name: 'Option nine' },
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
      <StoryDescriptor title="WithPickerWithExampleWidthContstraints">
        <div
          style={{ width: '200px', padding: '10px', border: '1px solid gray' }}
        >
          <FormFieldComponent {...args}>
            <Picker
              onSelect={() => {}}
              options={DEFAULT_PICKER_OPTIONS}
              selected={DEFAULT_PICKER_OPTIONS.slice(0, 9)}
            />
          </FormFieldComponent>
        </div>
      </StoryDescriptor>
      <StoryDescriptor title="WithTagInput">
        <FormFieldComponent {...args}>
          <TagInput
            tags={['tag1', 'tag2', 'tag3', 'tag4']}
            onChange={() => {}}
          />
        </FormFieldComponent>
      </StoryDescriptor>

      <StoryDescriptor title="WithNumericInput">
        <FormFieldComponent {...args}>
          <NumericInput value="456" onChange={() => {}} />
        </FormFieldComponent>
      </StoryDescriptor>
      <StoryDescriptor title="WithTextarea">
        <FormFieldComponent {...args}>
          <Textarea value="Lorem Ipsum is simply dummy text of the printing and typesetting industry." />
        </FormFieldComponent>
      </StoryDescriptor>
      <StoryDescriptor title="WithAutocomplete">
        <FormFieldComponent {...args}>
          <AutoComplete
            options={['option1', 'option2', 'option3']}
            value="option2"
          />
        </FormFieldComponent>
      </StoryDescriptor>
      <StoryDescriptor title="WithCheckbox">
        <FormFieldComponent {...args}>
          <Checkbox checked description="Checkbox description">
            Checkbox label
          </Checkbox>
        </FormFieldComponent>
      </StoryDescriptor>
      <StoryDescriptor title="WithRadioButton">
        <FormFieldComponent {...args}>
          <RadioButton checked description="RadioButton description">
            RadioButton label
          </RadioButton>
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
export const WithCharacterCounter = (): React.ReactElement => {
  const [value1, setValue1] = React.useState('');
  const [value2, setValue2] = React.useState('');

  const maxLength = 5;
  const characterCount1 = value1.length;
  const characterCount2 = value2.length;
  const isExceeded1 = characterCount1 > maxLength;
  const isExceeded2 = characterCount2 > maxLength;

  const handleChange1 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue1(e.target.value);
  };

  const handleChange2 = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue2(e.target.value);
  };

  const CounterComponent1 = () => (
    <Text
      noMargin
      size="sm"
      customColor={
        isExceeded1
          ? 'var(--content-basic-negative)'
          : 'var(--content-basic-secondary)'
      }
    >
      {characterCount1}/{maxLength}
    </Text>
  );

  const CounterComponent2 = () => (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <Text
        noMargin
        size="sm"
        customColor={
          isExceeded2
            ? 'var(--content-basic-negative)'
            : 'var(--content-basic-secondary)'
        }
      >
        {characterCount2}/{maxLength}
      </Text>
    </div>
  );

  return (
    <>
      <StoryDescriptor title="Right aligned counter">
        <FormFieldComponent labelRightNode={<CounterComponent1 />}>
          <Input
            value={value1}
            onChange={handleChange1}
            placeholder="Type something..."
            error={isExceeded1}
          />
        </FormFieldComponent>
      </StoryDescriptor>
      <StoryDescriptor title="Bottom aligned counter">
        <FormFieldComponent description={<CounterComponent2 />}>
          <Input
            value={value2}
            onChange={handleChange2}
            placeholder="Type something..."
            error={isExceeded2}
          />
        </FormFieldComponent>
      </StoryDescriptor>
    </>
  );
};
