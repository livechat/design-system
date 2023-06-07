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
    children: {
      description: 'Specify the button content',
    },
    disabled: {
      description: 'Specify whether the button is to be blocked',
    },
    onClick: {
      description: 'The event handler for button click',
      action: 'clicked',
    },
  },
  parameters: {
    controls: {
      sort: 'alpha',
    },
  },
} as ComponentMeta<typeof Button>;

export const Default = (args: ButtonProps): React.ReactElement => (
  <Button {...args} />
);
Default.argTypes = {
  icon: {
    options: ['None', ...iterator],
    mapping: Object.assign(icons, { None: null }),
    control: {
      type: 'select',
      labels: iterator,
    },
  },
};
Default.args = {
  loading: false,
  disabled: false,
  size: 'medium',
  kind: 'primary',
  children: 'Button Text',
  fullWidth: false,
  iconPosition: 'left',
  icon: 'None',
};

export const KindsAndStates = (): React.ReactElement => (
  <div>
    <StoryDescriptor title="Basic">
      <Button>Basic</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </StoryDescriptor>
    <StoryDescriptor title="Basic with icon">
      <Button icon={<Icon source={MaterialIcons.AddCircle} />}>Basic</Button>
      <Button icon={<Icon source={MaterialIcons.AddCircle} />} disabled>
        Disabled
      </Button>
      <Button icon={<Icon source={MaterialIcons.AddCircle} />} loading>
        Loading
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Basic with icon only">
      <Button icon={<Icon source={MaterialIcons.AddCircle} />} />
      <Button icon={<Icon source={MaterialIcons.AddCircle} />} disabled />
      <Button icon={<Icon source={MaterialIcons.AddCircle} />} loading />
    </StoryDescriptor>
    <StoryDescriptor title="Primary">
      <Button kind="primary">Primary</Button>
      <Button disabled kind="primary">
        Disabled
      </Button>
      <Button loading kind="primary">
        Loading
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Primary with icon">
      <Button kind="primary" icon={<Icon source={MaterialIcons.AddCircle} />}>
        Primary
      </Button>
      <Button
        disabled
        kind="primary"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Disabled
      </Button>
      <Button
        loading
        kind="primary"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Loading
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Primary with icon only">
      <Button kind="primary" icon={<Icon source={MaterialIcons.AddCircle} />} />
      <Button
        disabled
        kind="primary"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
      <Button
        loading
        kind="primary"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
    </StoryDescriptor>
    <StoryDescriptor title="Secondary">
      <Button kind="secondary">Secondary</Button>
      <Button disabled kind="secondary">
        Disabled
      </Button>
      <Button loading kind="secondary">
        Disabled
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Secondary with icon">
      <Button kind="secondary" icon={<Icon source={MaterialIcons.AddCircle} />}>
        Secondary
      </Button>
      <Button
        disabled
        kind="secondary"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Disabled
      </Button>
      <Button
        loading
        kind="secondary"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Disabled
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Secondary with icon only">
      <Button
        kind="secondary"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
      <Button
        disabled
        kind="secondary"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
      <Button
        loading
        kind="secondary"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
    </StoryDescriptor>
    <StoryDescriptor title="Destructive">
      <Button kind="destructive">Destructive</Button>
      <Button disabled kind="destructive">
        Disabled
      </Button>
      <Button loading kind="destructive">
        Disabled
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Destructive with icon">
      <Button
        kind="destructive"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Destructive
      </Button>
      <Button
        disabled
        kind="destructive"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Disabled
      </Button>
      <Button
        loading
        kind="destructive"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Disabled
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Destructive with icon only">
      <Button
        kind="destructive"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
      <Button
        disabled
        kind="destructive"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
      <Button
        loading
        kind="destructive"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
    </StoryDescriptor>
    <StoryDescriptor title="Text">
      <Button kind="text">Text</Button>
      <Button disabled kind="text">
        Disabled
      </Button>
      <Button loading kind="text">
        Disabled
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Text with icon">
      <Button kind="text" icon={<Icon source={MaterialIcons.AddCircle} />}>
        Text
      </Button>
      <Button
        disabled
        kind="text"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Disabled
      </Button>
      <Button
        loading
        kind="text"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Disabled
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Text with icon only">
      <Button kind="text" icon={<Icon source={MaterialIcons.AddCircle} />} />
      <Button
        disabled
        kind="text"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
      <Button
        loading
        kind="text"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
    </StoryDescriptor>
    <StoryDescriptor title="Plain">
      <Button kind="plain">Plain</Button>
      <Button disabled kind="plain">
        Disabled
      </Button>
      <Button loading kind="plain">
        Disabled
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Plain with icon">
      <Button kind="plain" icon={<Icon source={MaterialIcons.AddCircle} />}>
        Plain
      </Button>
      <Button
        disabled
        kind="plain"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Disabled
      </Button>
      <Button
        loading
        kind="plain"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Disabled
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Plain with icon only">
      <Button kind="plain" icon={<Icon source={MaterialIcons.AddCircle} />} />
      <Button
        disabled
        kind="plain"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
      <Button
        loading
        kind="plain"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
    </StoryDescriptor>
    <StoryDescriptor title="Subtle">
      <Button kind="subtle">Subtle</Button>
      <Button disabled kind="subtle">
        Disabled
      </Button>
      <Button loading kind="subtle">
        Loading
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Subtle with icon">
      <Button kind="subtle" icon={<Icon source={MaterialIcons.AddCircle} />}>
        Subtle
      </Button>
      <Button
        disabled
        kind="subtle"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Disabled
      </Button>
      <Button
        loading
        kind="subtle"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Loading
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Subtle with icon only">
      <Button kind="subtle" icon={<Icon source={MaterialIcons.AddCircle} />} />
      <Button
        disabled
        kind="subtle"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
      <Button
        loading
        kind="subtle"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
    </StoryDescriptor>
    <StoryDescriptor title="Float">
      <Button kind="float">Float</Button>

      <Button disabled kind="float">
        Disabled
      </Button>
      <Button loading kind="float">
        Loading
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Float with icon">
      <Button kind="float" icon={<Icon source={MaterialIcons.AddCircle} />}>
        Float
      </Button>
      <Button
        disabled
        kind="float"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Disabled
      </Button>
      <Button
        loading
        kind="float"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Loading
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Float with icon only">
      <Button kind="float" icon={<Icon source={MaterialIcons.AddCircle} />} />
      <Button
        disabled
        kind="float"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
      <Button
        loading
        kind="float"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
    </StoryDescriptor>
    <StoryDescriptor title="Dotted">
      <Button kind="dotted">Float</Button>
      <Button disabled kind="dotted">
        Disabled
      </Button>
      <Button loading kind="dotted">
        Loading
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Dotted with icon">
      <Button kind="dotted" icon={<Icon source={MaterialIcons.AddCircle} />}>
        Float
      </Button>
      <Button
        disabled
        kind="dotted"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Disabled
      </Button>
      <Button
        loading
        kind="dotted"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      >
        Loading
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Dotted with icon only">
      <Button kind="dotted" icon={<Icon source={MaterialIcons.AddCircle} />} />
      <Button
        disabled
        kind="dotted"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
      <Button
        loading
        kind="dotted"
        icon={<Icon source={MaterialIcons.AddCircle} />}
      />
    </StoryDescriptor>
  </div>
);

export const Sizes = (): React.ReactElement => (
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

export const ButtonAsLink = (): React.ReactElement => (
  <Button href="https://livechat.com" target="_blank" kind="primary">
    Button as an external link to livechat.com
  </Button>
);
