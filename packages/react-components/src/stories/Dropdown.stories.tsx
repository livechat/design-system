import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import DropdownExample from './foundations/components/DropdownExample';
import DropdownListExample from './foundations/components/DropdownListExample';

export default {
  title: 'Components/Dropdown examples',
  component: DropdownExample,
} as ComponentMeta<typeof DropdownExample>;

export const Dropdown = (): React.ReactElement => (
  <div
    style={{
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <DropdownExample />
    <DropdownListExample />
  </div>
);
