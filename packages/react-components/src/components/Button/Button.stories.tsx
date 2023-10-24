import * as React from 'react';

import * as Icons from '@livechat/design-system-icons';
import { ComponentMeta } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';
import { Icon, IconSource } from '../Icon';

import { Button, ButtonProps } from './Button';

const icons = Object.fromEntries(
  Object.entries(Icons).map(([key, source]) => [
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
      <Button icon={<Icon source={Icons.AddCircle} />}>Basic</Button>
      <Button icon={<Icon source={Icons.AddCircle} />} disabled>
        Disabled
      </Button>
      <Button icon={<Icon source={Icons.AddCircle} />} loading>
        Loading
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Basic with icon only">
      <Button icon={<Icon source={Icons.AddCircle} />} />
      <Button icon={<Icon source={Icons.AddCircle} />} disabled />
      <Button icon={<Icon source={Icons.AddCircle} />} loading />
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
      <Button kind="primary" icon={<Icon source={Icons.AddCircle} />}>
        Primary
      </Button>
      <Button disabled kind="primary" icon={<Icon source={Icons.AddCircle} />}>
        Disabled
      </Button>
      <Button loading kind="primary" icon={<Icon source={Icons.AddCircle} />}>
        Loading
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Primary with icon only">
      <Button kind="primary" icon={<Icon source={Icons.AddCircle} />} />
      <Button
        disabled
        kind="primary"
        icon={<Icon source={Icons.AddCircle} />}
      />
      <Button loading kind="primary" icon={<Icon source={Icons.AddCircle} />} />
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
      <Button kind="secondary" icon={<Icon source={Icons.AddCircle} />}>
        Secondary
      </Button>
      <Button
        disabled
        kind="secondary"
        icon={<Icon source={Icons.AddCircle} />}
      >
        Disabled
      </Button>
      <Button loading kind="secondary" icon={<Icon source={Icons.AddCircle} />}>
        Disabled
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Secondary with icon only">
      <Button kind="secondary" icon={<Icon source={Icons.AddCircle} />} />
      <Button
        disabled
        kind="secondary"
        icon={<Icon source={Icons.AddCircle} />}
      />
      <Button
        loading
        kind="secondary"
        icon={<Icon source={Icons.AddCircle} />}
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
      <Button kind="destructive" icon={<Icon source={Icons.AddCircle} />}>
        Destructive
      </Button>
      <Button
        disabled
        kind="destructive"
        icon={<Icon source={Icons.AddCircle} />}
      >
        Disabled
      </Button>
      <Button
        loading
        kind="destructive"
        icon={<Icon source={Icons.AddCircle} />}
      >
        Disabled
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Destructive with icon only">
      <Button kind="destructive" icon={<Icon source={Icons.AddCircle} />} />
      <Button
        disabled
        kind="destructive"
        icon={<Icon source={Icons.AddCircle} />}
      />
      <Button
        loading
        kind="destructive"
        icon={<Icon source={Icons.AddCircle} />}
      />
    </StoryDescriptor>
    <StoryDescriptor title="Destructive Outline">
      <Button kind="destructive-outline">Destructive Outline</Button>
      <Button disabled kind="destructive-outline">
        Disabled
      </Button>
      <Button loading kind="destructive-outline">
        Disabled
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Destructive Outline with icon">
      <Button
        kind="destructive-outline"
        icon={<Icon source={Icons.AddCircle} />}
      >
        Destructive Outline
      </Button>
      <Button
        disabled
        kind="destructive-outline"
        icon={<Icon source={Icons.AddCircle} />}
      >
        Disabled
      </Button>
      <Button
        loading
        kind="destructive-outline"
        icon={<Icon source={Icons.AddCircle} />}
      >
        Disabled
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Destructive Outline with icon only">
      <Button
        kind="destructive-outline"
        icon={<Icon source={Icons.AddCircle} />}
      />
      <Button
        disabled
        kind="destructive-outline"
        icon={<Icon source={Icons.AddCircle} />}
      />
      <Button
        loading
        kind="destructive-outline"
        icon={<Icon source={Icons.AddCircle} />}
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
      <Button kind="text" icon={<Icon source={Icons.AddCircle} />}>
        Text
      </Button>
      <Button disabled kind="text" icon={<Icon source={Icons.AddCircle} />}>
        Disabled
      </Button>
      <Button loading kind="text" icon={<Icon source={Icons.AddCircle} />}>
        Disabled
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Text with icon only">
      <Button kind="text" icon={<Icon source={Icons.AddCircle} />} />
      <Button disabled kind="text" icon={<Icon source={Icons.AddCircle} />} />
      <Button loading kind="text" icon={<Icon source={Icons.AddCircle} />} />
    </StoryDescriptor>
    <StoryDescriptor title="Link">
      <Button kind="link">Link</Button>
      <Button disabled kind="link">
        Disabled
      </Button>
      <Button loading kind="link">
        Disabled
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Link with icon">
      <Button kind="link" icon={<Icon source={Icons.AddCircle} />}>
        Link
      </Button>
      <Button disabled kind="link" icon={<Icon source={Icons.AddCircle} />}>
        Disabled
      </Button>
      <Button loading kind="link" icon={<Icon source={Icons.AddCircle} />}>
        Disabled
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Link with icon only">
      <Button kind="link" icon={<Icon source={Icons.AddCircle} />} />
      <Button disabled kind="link" icon={<Icon source={Icons.AddCircle} />} />
      <Button loading kind="link" icon={<Icon source={Icons.AddCircle} />} />
    </StoryDescriptor>
    <StoryDescriptor
      style={{
        background: 'black',
        padding: '10px 10px 10px 0',
      }}
      title="Link inverted"
    >
      <Button kind="link-inverted">Link inverted</Button>
      <Button disabled kind="link-inverted">
        Disabled
      </Button>
      <Button loading kind="link-inverted">
        Disabled
      </Button>
    </StoryDescriptor>
    <StoryDescriptor
      style={{
        background: 'black',
        padding: '10px 10px 10px 0',
      }}
      title="Link inverted with icon"
    >
      <Button kind="link-inverted" icon={<Icon source={Icons.AddCircle} />}>
        Link inverted
      </Button>
      <Button
        disabled
        kind="link-inverted"
        icon={<Icon source={Icons.AddCircle} />}
      >
        Disabled
      </Button>
      <Button
        loading
        kind="link-inverted"
        icon={<Icon source={Icons.AddCircle} />}
      >
        Disabled
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Plain">
      <Button kind="plain">Plain</Button>
      <Button disabled kind="plain">
        Disabled
      </Button>
      <Button loading kind="plain">
        Loading
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Plain with icon">
      <Button kind="plain" icon={<Icon source={Icons.AddCircle} />}>
        Plain
      </Button>
      <Button disabled kind="plain" icon={<Icon source={Icons.AddCircle} />}>
        Disabled
      </Button>
      <Button loading kind="plain" icon={<Icon source={Icons.AddCircle} />}>
        Loading
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Plain with icon only">
      <Button kind="plain" icon={<Icon source={Icons.AddCircle} />} />
      <Button disabled kind="plain" icon={<Icon source={Icons.AddCircle} />} />
      <Button loading kind="plain" icon={<Icon source={Icons.AddCircle} />} />
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
      <Button kind="float" icon={<Icon source={Icons.AddCircle} />}>
        Float
      </Button>
      <Button disabled kind="float" icon={<Icon source={Icons.AddCircle} />}>
        Disabled
      </Button>
      <Button loading kind="float" icon={<Icon source={Icons.AddCircle} />}>
        Loading
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Float with icon only">
      <Button kind="float" icon={<Icon source={Icons.AddCircle} />} />
      <Button disabled kind="float" icon={<Icon source={Icons.AddCircle} />} />
      <Button loading kind="float" icon={<Icon source={Icons.AddCircle} />} />
    </StoryDescriptor>
    <StoryDescriptor title="Dotted">
      <Button kind="dotted">Dotted</Button>
      <Button disabled kind="dotted">
        Disabled
      </Button>
      <Button loading kind="dotted">
        Loading
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Dotted with icon">
      <Button kind="dotted" icon={<Icon source={Icons.AddCircle} />}>
        Dotted
      </Button>
      <Button disabled kind="dotted" icon={<Icon source={Icons.AddCircle} />}>
        Disabled
      </Button>
      <Button loading kind="dotted" icon={<Icon source={Icons.AddCircle} />}>
        Loading
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="Dotted with icon only">
      <Button kind="dotted" icon={<Icon source={Icons.AddCircle} />} />
      <Button disabled kind="dotted" icon={<Icon source={Icons.AddCircle} />} />
      <Button loading kind="dotted" icon={<Icon source={Icons.AddCircle} />} />
    </StoryDescriptor>
    <StoryDescriptor title="High Contrast">
      <Button kind="high-contrast">High Contrast</Button>
      <Button kind="high-contrast" disabled>
        Disabled
      </Button>
      <Button kind="high-contrast" loading>
        Loading
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="High Contrast with icon">
      <Button kind="high-contrast" icon={<Icon source={Icons.AddCircle} />}>
        High Contrast
      </Button>
      <Button
        kind="high-contrast"
        icon={<Icon source={Icons.AddCircle} />}
        disabled
      >
        Disabled
      </Button>
      <Button
        kind="high-contrast"
        icon={<Icon source={Icons.AddCircle} />}
        loading
      >
        Loading
      </Button>
    </StoryDescriptor>
    <StoryDescriptor title="High Contrast with icon only">
      <Button kind="high-contrast" icon={<Icon source={Icons.AddCircle} />} />
      <Button
        kind="high-contrast"
        icon={<Icon source={Icons.AddCircle} />}
        disabled
      />
      <Button
        kind="high-contrast"
        icon={<Icon source={Icons.AddCircle} />}
        loading
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
        icon={<Icon source={Icons.AddCircle} />}
        size="compact"
        kind="primary"
      />
      <Button
        icon={<Icon source={Icons.AddCircle} />}
        size="medium"
        kind="primary"
      />
      <Button
        icon={<Icon source={Icons.AddCircle} />}
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
