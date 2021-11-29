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

export const controlled = (args: ButtonGroupProps): React.ReactElement => {
  return (
    <ButtonGroupComponent {...args}>
      <Button>First option</Button>
      <Button>Second option</Button>
    </ButtonGroupComponent>
  );
};

controlled.args = {
  currentIndex: 1,
};

export const uncontrolledEmptySelection = (
  args: ButtonGroupProps
): React.ReactElement => {
  return (
    <ButtonGroupComponent {...args}>
      <Button>First option</Button>
      <Button>Second option</Button>
    </ButtonGroupComponent>
  );
};

export const uncontrolledWithInitialSelection = (
  args: ButtonGroupProps
): React.ReactElement => {
  return (
    <ButtonGroupComponent {...args}>
      <Button>First option</Button>
      <Button>Second option</Button>
    </ButtonGroupComponent>
  );
};

uncontrolledWithInitialSelection.args = {
  initialIndex: 1,
};
