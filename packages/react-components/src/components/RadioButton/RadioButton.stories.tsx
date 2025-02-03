import * as React from 'react';

import { Meta } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';

import {
  RadioButton as RadioButtonComponent,
  RadioButtonProps,
} from './RadioButton';

export default {
  title: 'Forms/Radio Button',
  component: RadioButtonComponent,
  argTypes: { onChange: { action: 'changed' } },
  parameters: {
    componentSubtitle: `
    Use radio buttons where there’s a list of two or more mutually exclusive items, and the users must select exactly one option.
    `,
  },
} as Meta<typeof RadioButtonComponent>;

export const RadioButton = ({
  children,
  ...args
}: RadioButtonProps): React.ReactElement => (
  <div>
    <RadioButtonComponent {...args}>{children}</RadioButtonComponent>
  </div>
);

RadioButton.args = {
  checked: false,
  disabled: false,
  description: 'Help text',
  children: 'Radio label',
};

export const RadioButtonReadOnly = ({
  children,
  ...args
}: RadioButtonProps): React.ReactElement => (
  <>
    <StoryDescriptor title="Checked">
      <RadioButtonComponent {...args} checked>
        {children}
      </RadioButtonComponent>
    </StoryDescriptor>
    <StoryDescriptor title="UnChecked">
      <RadioButtonComponent {...args}>{children}</RadioButtonComponent>
    </StoryDescriptor>
  </>
);

RadioButtonReadOnly.args = {
  ...RadioButton.args,
  readOnly: true,
};
