import * as React from 'react';

import { AddCircle as AddCircleIcon } from '@livechat/design-system-icons';
import { Meta, StoryFn } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';
import { Icon } from '../Icon';

import { Input, InputPromo as InputPromoComponent } from './Input';
import { IInputProps } from './types';

const placeholderText = 'Placeholder text';

export default {
  title: 'Forms/Input',
  component: Input,
  argTypes: {
    onChange: {
      description: 'The event handler for onChange',
      action: 'changed',
    },
    icon: {
      control: false,
    },
    readOnly: {
      type: 'boolean',
    },
  },
} as Meta<typeof Input>;

export const Default: StoryFn<IInputProps> = (args: IInputProps) => (
  <Input {...args} />
);

Default.storyName = 'Input';
Default.args = {
  inputSize: 'medium',
  placeholder: 'Placeholder text',
};

export const Sizes = (): React.ReactElement => (
  <>
    <StoryDescriptor title="Xsmall">
      <Input inputSize="xsmall" placeholder={placeholderText} />
    </StoryDescriptor>
    <StoryDescriptor title="Compact">
      <Input inputSize="compact" placeholder={placeholderText} />
    </StoryDescriptor>
    <StoryDescriptor title="Medium">
      <Input inputSize="medium" placeholder={placeholderText} />
    </StoryDescriptor>
    <StoryDescriptor title="Large">
      <Input inputSize="large" placeholder={placeholderText} />
    </StoryDescriptor>
  </>
);

export const States = (): React.ReactElement => (
  <>
    <StoryDescriptor title="With error">
      <Input error={true} placeholder={placeholderText} />
    </StoryDescriptor>
    <StoryDescriptor title="Disabled">
      <Input disabled={true} placeholder={placeholderText} />
    </StoryDescriptor>
    <StoryDescriptor title="ReadOnly">
      <Input readOnly value="My input test value" />
    </StoryDescriptor>
  </>
);

export const Types = (): React.ReactElement => (
  <>
    <StoryDescriptor title="Text">
      <Input type="text" placeholder={placeholderText} />
    </StoryDescriptor>
    <StoryDescriptor title="Password">
      <Input type="password" placeholder={placeholderText} />
    </StoryDescriptor>
  </>
);

export const WithIcons = (): React.ReactElement => (
  <>
    <StoryDescriptor title="Left icon">
      <Input
        icon={{
          source: <Icon source={AddCircleIcon} />,
          place: 'left',
        }}
        placeholder={placeholderText}
      />
    </StoryDescriptor>
    <StoryDescriptor title="Right icon">
      <Input
        icon={{
          source: <Icon source={AddCircleIcon} />,
          place: 'right',
        }}
        placeholder={placeholderText}
      />
    </StoryDescriptor>
    <StoryDescriptor title="Left icon with password type">
      <Input
        icon={{
          source: <Icon source={AddCircleIcon} />,
          place: 'left',
        }}
        placeholder={placeholderText}
        type="password"
      />
    </StoryDescriptor>
    <StoryDescriptor title="Disabled input with icon">
      <Input
        icon={{
          source: <Icon source={AddCircleIcon} />,
          place: 'left',
        }}
        placeholder={placeholderText}
        disabled
      />
    </StoryDescriptor>
    <StoryDescriptor title="Disabled input with password type">
      <Input placeholder={placeholderText} type="password" disabled />
    </StoryDescriptor>
  </>
);

export const InputPromo = (): React.ReactElement => (
  <InputPromoComponent placeholder={placeholderText} />
);

export const InputPromoStates = (): React.ReactElement => (
  <>
    <StoryDescriptor title="With error">
      <InputPromoComponent error={true} placeholder={placeholderText} />
    </StoryDescriptor>
    <StoryDescriptor title="Disabled">
      <InputPromoComponent disabled={true} placeholder={placeholderText} />
    </StoryDescriptor>
    <StoryDescriptor title="ReadOnly">
      <InputPromoComponent
        readOnly
        placeholder={placeholderText}
        value="My test value"
      />
    </StoryDescriptor>
  </>
);

export const InputPromoTypes = (): React.ReactElement => (
  <>
    <StoryDescriptor title="Text">
      <InputPromoComponent type="text" placeholder={placeholderText} />
    </StoryDescriptor>
    <StoryDescriptor title="Password">
      <InputPromoComponent type="password" placeholder={placeholderText} />
    </StoryDescriptor>
  </>
);

export const InputPromoWithIcons = (): React.ReactElement => (
  <>
    <StoryDescriptor title="Left icon">
      <InputPromoComponent
        icon={{
          source: <Icon source={AddCircleIcon} />,
          place: 'left',
        }}
        placeholder={placeholderText}
      />
    </StoryDescriptor>
    <StoryDescriptor title="Right icon">
      <InputPromoComponent
        icon={{
          source: <Icon source={AddCircleIcon} />,
          place: 'right',
        }}
        placeholder={placeholderText}
      />
    </StoryDescriptor>
    <StoryDescriptor title="Left icon with password type">
      <InputPromoComponent
        icon={{
          source: <Icon source={AddCircleIcon} />,
          place: 'left',
        }}
        placeholder={placeholderText}
        type="password"
      />
    </StoryDescriptor>
    <StoryDescriptor title="Disabled input with icon">
      <InputPromoComponent
        icon={{
          source: <Icon source={AddCircleIcon} />,
          place: 'left',
        }}
        placeholder={placeholderText}
        disabled
      />
    </StoryDescriptor>
    <StoryDescriptor title="Disabled input with password type">
      <InputPromoComponent
        placeholder={placeholderText}
        type="password"
        disabled
      />
    </StoryDescriptor>
  </>
);
