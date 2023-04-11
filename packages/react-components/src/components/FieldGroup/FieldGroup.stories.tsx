import { ComponentMeta } from '@storybook/react';

import {
  FieldGroup as FieldGroupComponent,
  FieldGroupProps,
} from './FieldGroup';
import { RadioButton } from '../RadioButton';
import { ReactElement } from 'react';

export default {
  title: 'Forms (WIP)/Field Group',
  component: FieldGroupComponent,
  parameters: {
    componentSubtitle: `
    Use FieldGroup component to group elements and display it in nice layout (inline or stacked).
    `,
  },
} as ComponentMeta<typeof FieldGroupComponent>;

export const FieldGroup = ({ ...args }: FieldGroupProps): ReactElement => (
  <FieldGroupComponent {...args}>
    <RadioButton id="field-group-example-1">Radio button label</RadioButton>
    <RadioButton id="field-group-example-2">Radio button label</RadioButton>
  </FieldGroupComponent>
);

FieldGroup.args = {
  description: 'Field group description',
  error: '',
  stretch: false,
  inline: false,
} as FieldGroupProps;
