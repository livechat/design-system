import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import DropdownExample, {
  IDropdownExample,
} from './foundations/components/DropdownExample';

import DropdownListSelectableExample from './foundations/components/DropdownListSelectableExample';
import DropdownListNotSelectableExample from './foundations/components/DropdownListNotSelectableExample';

import * as PopperCore from '@popperjs/core';
import DropdownListBodyPropExample from './foundations/components/DropdownListBodyPropExample';

export default {
  title: 'Components/Dropdown',
  component: DropdownExample,
  argTypes: {
    placement: {
      options: PopperCore.placements,
      control: {
        type: 'select',
        labels: PopperCore.placements,
      },
      table: {
        defaultValue: { summary: PopperCore.placements[3] },
      },
    },
  },
} as ComponentMeta<typeof DropdownExample>;

export const Dropdown = (args: IDropdownExample): React.ReactElement => (
  <div
    style={{
      height: '100vh',
      display: 'flex',
      width: '800px',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <DropdownExample {...args} />
  </div>
);

export const DropdownListSelectable = (
  args: IDropdownExample
): React.ReactElement => (
  <div
    style={{
      height: '100vh',
      display: 'flex',
      width: '800px',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <DropdownListSelectableExample {...args} />
  </div>
);

export const DropdownListNotSelectable = (
  args: IDropdownExample
): React.ReactElement => (
  <div
    style={{
      height: '100vh',
      display: 'flex',
      width: '800px',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <DropdownListNotSelectableExample {...args} />
  </div>
);

export const DropdownListBodyProp = (
  args: IDropdownExample
): React.ReactElement => (
  <div
    style={{
      height: '100vh',
      display: 'flex',
      width: '800px',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <DropdownListBodyPropExample {...args} />
  </div>
);

Dropdown.args = {
  placement: 'bottom',
};
