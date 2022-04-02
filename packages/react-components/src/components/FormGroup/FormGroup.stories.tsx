import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { FormGroup as FormGroupComponent, FormGroupProps } from './FormGroup';
import { RadioButton } from '../RadioButton';
import { FieldGroup } from '../FieldGroup';

export default {
  title: 'Forms (WIP)/Form Group',
  component: FormGroupComponent,
  parameters: {
    componentSubtitle: `
    Use FormGroup component to group related fieldsets. Component provides label for group of fields which improves accessibility of your form.
    `,
  },
} as ComponentMeta<typeof FormGroupComponent>;

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
