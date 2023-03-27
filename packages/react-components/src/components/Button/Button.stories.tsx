import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import * as MaterialIcons from '@livechat/design-system-icons/react/material';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';

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
    onClick: { action: 'clicked' },
  },
  parameters: {
    controls: {
      sort: 'alpha',
    },
  },
} as ComponentMeta<typeof Button>;

export const button = (args: ButtonProps): React.ReactElement => (
  <Button {...args} {...args} />
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

export const kindsAndStates = (args: ButtonProps): React.ReactElement => (
  <div>
    <StoryDescriptor title="Basic">
      <Button {...args}>Basic</Button>
      <Button {...args} disabled>
        Disabled
      </Button>
      <Button {...args} loading>
        Loading
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Primary">
      <Button {...args} kind="primary">
        Primary
      </Button>
      <Button {...args} disabled kind="primary">
        Disabled
      </Button>
      <Button {...args} loading kind="primary">
        Loading
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Secondary">
      <Button {...args} kind="secondary">
        Secondary
      </Button>
      <Button {...args} disabled kind="secondary">
        Disabled
      </Button>
      <Button {...args} loading kind="secondary">
        Disabled
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Destructive">
      <Button {...args} kind="destructive">
        Destructive
      </Button>
      <Button {...args} disabled kind="destructive">
        Disabled
      </Button>
      <Button {...args} loading kind="destructive">
        Disabled
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Text">
      <Button {...args} kind="text">
        Text
      </Button>
      <Button {...args} disabled kind="text">
        Disabled
      </Button>
      <Button {...args} loading kind="text">
        Disabled
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Plain">
      <Button {...args} kind="plain">
        Plain
      </Button>
      <Button {...args} disabled kind="plain">
        Disabled
      </Button>
      <Button {...args} loading kind="plain">
        Disabled
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Plain light">
      <Button {...args} kind="plain-light">
        Plain light
      </Button>
      <Button {...args} disabled kind="plain-light">
        Disabled
      </Button>
      <Button {...args} loading kind="plain-light">
        Disabled
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Plain with icon only">
      <Button
        {...args}
        icon={<Icon source={MaterialIcons.AddCircle} />}
        kind="plain"
      />
      <Button
        {...args}
        icon={<Icon source={MaterialIcons.AddCircle} />}
        disabled
        kind="plain"
      />
      <Button
        {...args}
        icon={<Icon source={MaterialIcons.AddCircle} />}
        loading
        kind="plain"
      />
    </StoryDescriptor>
  </div>
);
kindsAndStates.args = {};

export const sizes = (args: ButtonProps): React.ReactElement => (
  <>
    <div className="story-spacer">
      <Button {...args} size="compact" kind="primary">
        Compact
      </Button>
      <Button {...args} size="medium" kind="primary">
        Medium (default)
      </Button>
      <Button {...args} size="large" kind="primary">
        Large
      </Button>
    </div>
    <div className="story-spacer">
      <Button
        {...args}
        icon={<Icon source={MaterialIcons.AddCircle} />}
        size="compact"
        kind="primary"
      />
      <Button
        {...args}
        icon={<Icon source={MaterialIcons.AddCircle} />}
        size="medium"
        kind="primary"
      />
      <Button
        {...args}
        icon={<Icon source={MaterialIcons.AddCircle} />}
        size="large"
        kind="primary"
      />
    </div>
  </>
);
sizes.args = {};

export const buttonAsLink = (args: ButtonProps): React.ReactElement => (
  <Button
    {...args}
    href="https://livechat.com"
    target="_blank"
    kind="primary"
    {...args}
  >
    Button as an external link to livechat.com
  </Button>
);
buttonAsLink.args = { ...button.args, href: 'https://livechat.com' };
