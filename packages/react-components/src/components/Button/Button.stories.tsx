import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import * as MaterialIcons from '@livechat/design-system-icons/react/material';

import { Icon, IconSource } from '../Icon';
import { Button, ButtonProps } from './Button';

const icons = Object.fromEntries(
  Object.entries(MaterialIcons).map(([key, source]) => [
    key,
    <Icon source={source as IconSource} />,
  ])
);

const iterator = Object.keys(icons);

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    icon: {
      options: ['None', ...iterator],
      mapping: Object.assign(icons, { None: null }),
      control: {
        type: 'select',
        labels: iterator,
      },
    },
  },
  parameters: {
    controls: {
      sort: 'alpha',
    },
  },
} as ComponentMeta<typeof Button>;

export const button = (args: ButtonProps): React.ReactElement => (
  <Button {...args} />
);
button.args = {
  loading: false,
  disabled: false,
  size: 'medium',
  kind: 'primary',
  children: 'Button Text',
  fullWidth: false,
  iconPosition: 'left',
  icon: 'None',
};

export const kinds = (): React.ReactElement => (
  <div>
    <div className="story-spacer">
      <Button>Basic button</Button>
      <Button kind="primary">Primary</Button>
      <Button kind="secondary">Secondary</Button>
      <Button kind="destructive">Destructive</Button>
      <Button kind="text">Text</Button>
      <Button kind="plain">Plain</Button>
      <Button kind="plain-light">Plain light</Button>
    </div>
  </div>
);

export const states = (): React.ReactElement => (
  <div>
    <div className="story-spacer">
      <Button disabled>Disabled</Button>
      <Button disabled kind="primary">
        Disabled
      </Button>
      <Button disabled kind="secondary">
        Disabled
      </Button>
      <Button disabled kind="destructive">
        Disabled
      </Button>
      <Button disabled kind="text">
        Disabled
      </Button>
      <Button disabled kind="plain">
        Disabled
      </Button>
      <Button disabled kind="plain-light">
        Disabled
      </Button>
    </div>
    <div className="story-spacer">
      <Button loading>Loading</Button>
      <Button loading kind="primary">
        Loading
      </Button>
      <Button loading kind="secondary">
        Loading
      </Button>
      <Button loading kind="destructive">
        Loading
      </Button>
      <Button loading kind="text">
        Loading
      </Button>
      <Button loading kind="plain">
        Loading
      </Button>
      <Button loading kind="plain-light">
        Loading
      </Button>
    </div>
  </div>
);

export const sizes = (): React.ReactElement => (
  <>
    <div className="story-spacer">
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
    <div className="story-spacer">
      <Button
        icon={<Icon source={MaterialIcons.AddCircle} />}
        size="compact"
        kind="primary"
      />
      <Button
        icon={<Icon source={MaterialIcons.AddCircle} />}
        size="medium"
        kind="primary"
      />
      <Button
        icon={<Icon source={MaterialIcons.AddCircle} />}
        size="large"
        kind="primary"
      />
    </div>
  </>
);

export const buttonAsLink = (args: ButtonProps): React.ReactElement => (
  <Button href="https://livechat.com" target="_blank" kind="primary" {...args}>
    Button as an external link to livechat.com
  </Button>
);

buttonAsLink.args = { ...button.args, href: 'https://livechat.com' };
