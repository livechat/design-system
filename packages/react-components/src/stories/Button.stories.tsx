import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Button } from '../components/Button';

export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

export const kinds = () => (
  <div className="spacer">
    <Button>Basic</Button>
    <Button kind="primary">Primary</Button>
    <Button kind="secondary">Secondary</Button>
    <Button kind="destructive">Destructive</Button>
    <Button kind="text">Text</Button>
  </div>
);

export const sizes = () => (
  <div className="spacer">
    <Button size="compact" kind="primary">
      Compact
    </Button>
    <Button size="medium" kind="primary">
      Medium (default)
    </Button>
    <Button size="large" kind="primary">
      Large
    </Button>
  </div>
);
