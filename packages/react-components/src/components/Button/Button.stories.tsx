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
    <StoryDescriptor title="Basic with icon">
      <Button {...args} icon={<Icon source={MaterialIcons.AddCircle} />}>
        Basic
      </Button>
      <Button
        {...args}
        icon={<Icon source={MaterialIcons.AddCircle} />}
        disabled
      >
        Disabled
      </Button>
      <Button
        {...args}
        icon={<Icon source={MaterialIcons.AddCircle} />}
        loading
      >
        Loading
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Basic with icon only">
      <Button {...args} icon={<Icon source={MaterialIcons.AddCircle} />} />
      <Button
        {...args}
        icon={<Icon source={MaterialIcons.AddCircle} />}
        disabled
      />
      <Button
        {...args}
        icon={<Icon source={MaterialIcons.AddCircle} />}
        loading
      />
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
    <StoryDescriptor title="Primary with icon">
      <Button
        {...args}
        kind="primary"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Primary
      </Button>
      <Button
        {...args}
        disabled
        kind="primary"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Disabled
      </Button>
      <Button
        {...args}
        loading
        kind="primary"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Loading
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Primary with icon only">
      <Button
        {...args}
        kind="primary"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
      <Button
        {...args}
        disabled
        kind="primary"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
      <Button
        {...args}
        loading
        kind="primary"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
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
    <StoryDescriptor title="Secondary with icon">
      <Button
        {...args}
        kind="secondary"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Secondary
      </Button>
      <Button
        {...args}
        disabled
        kind="secondary"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Disabled
      </Button>
      <Button
        {...args}
        loading
        kind="secondary"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Disabled
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Secondary with icon only">
      <Button
        {...args}
        kind="secondary"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
      <Button
        {...args}
        disabled
        kind="secondary"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
      <Button
        {...args}
        loading
        kind="secondary"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
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
    <StoryDescriptor title="Destructive with icon">
      <Button
        {...args}
        kind="destructive"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Destructive
      </Button>
      <Button
        {...args}
        disabled
        kind="destructive"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Disabled
      </Button>
      <Button
        {...args}
        loading
        kind="destructive"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Disabled
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Destructive with icon only">
      <Button
        {...args}
        kind="destructive"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
      <Button
        {...args}
        disabled
        kind="destructive"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
      <Button
        {...args}
        loading
        kind="destructive"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
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
    <StoryDescriptor title="Text with icon">
      <Button
        {...args}
        kind="text"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Text
      </Button>
      <Button
        {...args}
        disabled
        kind="text"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Disabled
      </Button>
      <Button
        {...args}
        loading
        kind="text"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Disabled
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Text with icon only">
      <Button
        {...args}
        kind="text"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
      <Button
        {...args}
        disabled
        kind="text"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
      <Button
        {...args}
        loading
        kind="text"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
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
    <StoryDescriptor title="Plain with icon">
      <Button
        {...args}
        kind="plain"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Plain
      </Button>
      <Button
        {...args}
        disabled
        kind="plain"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Disabled
      </Button>
      <Button
        {...args}
        loading
        kind="plain"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Disabled
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Plain with icon only">
      <Button
        {...args}
        kind="plain"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
      <Button
        {...args}
        disabled
        kind="plain"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
      <Button
        {...args}
        loading
        kind="plain"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
    </StoryDescriptor>
    <StoryDescriptor title="Subtle">
      <Button {...args} kind="subtle">
        Subtle
      </Button>

      <Button {...args} disabled kind="subtle">
        Disabled
      </Button>
      <Button {...args} loading kind="subtle">
        Loading
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Subtle with icon">
      <Button
        {...args}
        kind="subtle"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Subtle
      </Button>
      <Button
        {...args}
        disabled
        kind="subtle"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Disabled
      </Button>
      <Button
        {...args}
        loading
        kind="subtle"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Loading
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Subtle with icon only">
      <Button
        {...args}
        kind="subtle"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
      <Button
        {...args}
        disabled
        kind="subtle"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
      <Button
        {...args}
        loading
        kind="subtle"
        icon={<Icon source={MaterialIcons.AddCircle} />}
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
  <Button {...args} href="https://livechat.com" target="_blank" kind="primary">
    Button as an external link to livechat.com
  </Button>
);
buttonAsLink.args = { ...button.args, href: 'https://livechat.com' };
