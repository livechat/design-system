import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  FieldGroup as FieldGroupComponent,
  IFieldGroupProps,
} from '../components/FieldGroup';
import { RadioButton } from '../components/RadioButton';

export default {
  title: 'Components/FieldGroup',
  component: FieldGroupComponent,
} as ComponentMeta<typeof FieldGroupComponent>;

export const FieldGroup = ({
  ...args
}: IFieldGroupProps): React.ReactElement => (
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
} as IFieldGroupProps;
