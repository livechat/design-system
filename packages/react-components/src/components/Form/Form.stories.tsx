import * as React from 'react';

import { ComponentMeta, Story } from '@storybook/react';

import { Button } from '../Button';
import { Form as FormComponenet, FormProps } from '../Form';
import { RadioButton } from '../RadioButton';

export default {
  title: 'Forms/Form',
  component: FormComponenet,
} as ComponentMeta<typeof FormComponenet>;

export const Form: Story<FormProps> = (args) => {
  return <FormComponenet {...args} />;
};

Form.args = {
  labelText: 'Settings',
  helperText:
    'Use form layout to arrange fields within a form using standard spacing. We recomme stacking fields vertically for easier scanning and faster completion, but you can also arrange them vertically.',
  formFooter: (
    <Button kind="primary" type="button">
      Save changes
    </Button>
  ),
  children: (
    //   TODO: Expand the example with FormGroup, FieldGroup and InputField components
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        marginBottom: '32px',
        gap: '16px',
      }}
    >
      <RadioButton checked id="gender-radio">
        Male
      </RadioButton>
      <RadioButton id="gender-radio">Female</RadioButton>
    </div>
  ),
} as FormProps;
