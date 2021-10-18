import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Button } from '../components/Button';

export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

export const allKinds = () => (
  <div className="spacer">
    <Button>Basic</Button>
    <Button kind="primary">Primary</Button>
    <Button kind="secondary">Secondary</Button>
    <Button kind="destructive">Destructive</Button>
    <Button kind="text">Text</Button>
  </div>
);
