import * as React from 'react';

import * as Icons from '@livechat/design-system-icons';
import { ComponentMeta } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';
import { Icon, IconSource } from '../Icon';

import { Button, ButtonProps } from './Button';
import { ButtonKind } from './types';

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

export const KindsAndStates = (): React.ReactElement => {
  const kinds: Array<ButtonKind> = [
    'basic',
    'primary',
    'secondary',
    'destructive',
    'destructive-outline',
    'text',
    'link',
    'link-light',
    'link-inverted',
    'plain',
    'float',
    'dotted',
    'high-contrast',
  ];

  return (
    <div>
      {kinds.map((kind) => {
        const title = kind.charAt(0).toUpperCase() + kind.slice(1);
        const exampleIcon = <Icon source={Icons.AddCircle} />;
        const isInverted = kind === 'link-inverted';

        return (
          <>
            <StoryDescriptor title={title} inverted={isInverted}>
              <Button kind={kind}>{title}</Button>
              <Button kind={kind} disabled>
                Disabled
              </Button>
              <Button kind={kind} loading>
                Loading
              </Button>
            </StoryDescriptor>
            <StoryDescriptor title={`${title} with icon`} inverted={isInverted}>
              <Button kind={kind} icon={exampleIcon}>
                {title}
              </Button>
              <Button kind={kind} icon={exampleIcon} disabled>
                Disabled
              </Button>
              <Button kind={kind} icon={exampleIcon} loading>
                Loading
              </Button>
            </StoryDescriptor>
            <StoryDescriptor
              title={`${title} with icon only`}
              inverted={isInverted}
            >
              <Button kind={kind} icon={exampleIcon} />
              <Button kind={kind} icon={exampleIcon} disabled />
              <Button kind={kind} icon={exampleIcon} loading />
            </StoryDescriptor>
          </>
        );
      })}
    </div>
  );
};

const ExampleIcon = <Icon source={Icons.AddCircle} />;

export const Sizes = (): React.ReactElement => (
  <>
    <div className="story-spacer">
      <Button size="xcompact" kind="primary" icon={ExampleIcon}>
        XCompact
      </Button>
      <Button size="compact" kind="primary" icon={ExampleIcon}>
        Compact
      </Button>
      <Button size="medium" kind="primary" icon={ExampleIcon}>
        Medium (default)
      </Button>
      <Button size="large" kind="primary" icon={ExampleIcon}>
        Large
      </Button>
    </div>
    <div className="story-spacer">
      <Button size="xcompact" kind="secondary" icon={ExampleIcon}>
        XCompact
      </Button>
      <Button size="compact" kind="secondary" icon={ExampleIcon}>
        Compact
      </Button>
      <Button size="medium" kind="secondary" icon={ExampleIcon}>
        Medium (default)
      </Button>
      <Button size="large" kind="secondary" icon={ExampleIcon}>
        Large
      </Button>
    </div>
    <div className="story-spacer">
      <Button size="xcompact" kind="primary">
        XCompact
      </Button>
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
        size="xcompact"
        kind="primary"
      />
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
