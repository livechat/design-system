import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  FormGroup as FormGroupComponent,
  IFormGroupProps,
} from '../components/FormGroup';
import { RadioButton } from '../components/RadioButton';
import { FieldGroup } from '../components/FieldGroup';

export default {
  title: 'Components/Form Group',
  component: FormGroupComponent,
} as ComponentMeta<typeof FormGroupComponent>;

export const FormGroup = ({ ...args }: IFormGroupProps): React.ReactElement => (
  <FormGroupComponent {...args}>
    <FieldGroup>
      <RadioButton id="field-group-example-1">Radio button label</RadioButton>
      <RadioButton id="field-group-example-2">Radio button label</RadioButton>
    </FieldGroup>
  </FormGroupComponent>
);

FormGroup.args = {
  labelText: 'Form Group example',
  helperText: 'Form Group helper text',
} as IFormGroupProps;
