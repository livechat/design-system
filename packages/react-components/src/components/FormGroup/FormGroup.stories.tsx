import * as React from 'react';

import { Meta } from '@storybook/react';

import { FieldGroup } from '../FieldGroup';
import { RadioButton } from '../RadioButton';

import { FormGroup as FormGroupComponent, FormGroupProps } from './FormGroup';

export default {
  title: 'Forms/Form Group',
  component: FormGroupComponent,
  tags: ['autodocs'],
  parameters: {
    componentSubtitle: `
    Use FormGroup component to group related fieldsets. Component provides label for group of fields which improves accessibility of your form.
    `,
  },
} as Meta<typeof FormGroupComponent>;

export const FormGroup = ({ ...args }: FormGroupProps): React.ReactElement => (
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
} as FormGroupProps;
