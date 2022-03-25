import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  CheckboxField as CheckboxFieldComponent,
  ICheckboxFieldProps,
} from './CheckboxField';

export default {
  title: 'Forms (WIP)/Checkbox Field',
  component: CheckboxFieldComponent,
  parameters: {
    componentSubtitle: `
    Use checkboxes when there is a short list of options and the user can select multiple options, all or none.
    `,
  },
} as ComponentMeta<typeof CheckboxFieldComponent>;

export const CheckboxField = (
  args: ICheckboxFieldProps
): React.ReactElement => {
  return <CheckboxFieldComponent {...args} />;
};

CheckboxField.args = {
  checked: false,
  disabled: false,
  description: 'Help text',
  children: 'Checkbox label',
} as ICheckboxFieldProps;
