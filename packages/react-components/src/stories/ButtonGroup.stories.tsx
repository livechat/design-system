import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import {
  ButtonGroup as ButtonGroupComponent,
  ButtonGroupProps,
} from '../components/ButtonGroup';

import { Button } from '../components/Button';

export default {
  title: 'Components/Button Group',
  component: ButtonGroupComponent,
} as ComponentMeta<typeof ButtonGroupComponent>;

export const ButtonGroup = (args: ButtonGroupProps): React.ReactElement => {
  return (
    <ButtonGroupComponent {...args}>
      <Button>First option</Button>
      <Button>Second option</Button>
    </ButtonGroupComponent>
  );
};

ButtonGroup.args = {
  currentIndex: null,
  size: 'compact',
};
