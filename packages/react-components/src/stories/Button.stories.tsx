import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Button } from '../components/Button';

export default {
  title: 'Components/Button',
  component: Button,
} as ComponentMeta<typeof Button>;

export const kinds = () => (
  <div>
    <div className="spacer">
      <Button>Basic</Button>
      <Button kind="primary">Primary</Button>
      <Button kind="secondary">Secondary</Button>
      <Button kind="destructive">Destructive</Button>
      <Button kind="text">Text</Button>
    </div>
    <div className="spacer">
      <Button disabled>Basic</Button>
      <Button disabled kind="primary">
        Primary
      </Button>
      <Button disabled kind="secondary">
        Secondary
      </Button>
      <Button disabled kind="destructive">
        Destructive
      </Button>
      <Button disabled kind="text">
        Text
      </Button>
    </div>
    <div className="spacer">
      <Button loading>Basic</Button>
      <Button loading kind="primary">
        Primary
      </Button>
      <Button loading kind="secondary">
        Secondary
      </Button>
      <Button loading kind="destructive">
        Destructive
      </Button>
      <Button loading kind="text">
        Text
      </Button>
    </div>
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

export const loading = () => (
  <div className="spacer">
    <Button loading>Loading Button</Button>
    <Button loading kind="primary">
      Loading Button
    </Button>
    <Button loading kind="secondary">
      Loading Button
    </Button>
    <Button loading kind="destructive">
      Loading Button
    </Button>
    <Button loading loaderLabel="Processing" kind="text">
      Loading Button
    </Button>
  </div>
);
