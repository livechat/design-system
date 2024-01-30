import * as React from 'react';

import * as Icons from '@livechat/design-system-icons';
import { ComponentMeta } from '@storybook/react';

import { StoryDescriptor } from '../../docs/components/StoryDescriptor';
import { Icon, IconSource } from '../Icon';

import { Button, ButtonProps } from './Button';
import { ButtonKind, ButtonSize } from './types';

const icons = Object.fromEntries(
  Object.entries(Icons).map(([key, source]) => [
    key,
    <Icon source={source as IconSource} />,
  ])
);

const iterator = Object.keys(icons);

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
const sizes: ButtonSize[] = ['xcompact', 'compact', 'medium', 'large'];

const ExampleIcon = <Icon source={Icons.AddCircle} />;

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
    {kinds.map((kind) => {
      const title = kind.charAt(0).toUpperCase() + kind.slice(1);
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
            <Button kind={kind} icon={ExampleIcon}>
              {title}
            </Button>
            <Button kind={kind} icon={ExampleIcon} disabled>
              Disabled
            </Button>
            <Button kind={kind} icon={ExampleIcon} loading>
              Loading
            </Button>
          </StoryDescriptor>
          <StoryDescriptor
            title={`${title} with icon only`}
            inverted={isInverted}
          >
            <Button kind={kind} icon={ExampleIcon} />
            <Button kind={kind} icon={ExampleIcon} disabled />
            <Button kind={kind} icon={ExampleIcon} loading />
          </StoryDescriptor>
        </>
      );
    })}
  </div>
);

export const Sizes = (): React.ReactElement => {
  return (
    <>
      {kinds.map((kind) => {
        const kindName = kind.charAt(0).toUpperCase() + kind.slice(1);
        const isInverted = kind === 'link-inverted';

        return (
          <>
            <StoryDescriptor title={`${kindName} kind`} inverted={isInverted}>
              <div className="story-spacer">
                {sizes.map((size) => {
                  const sizeName = size.charAt(0).toUpperCase() + size.slice(1);

                  return (
                    <Button size={size} kind={kind} icon={ExampleIcon}>
                      {sizeName}
                    </Button>
                  );
                })}
              </div>
              <div className="story-spacer" style={{ marginLeft: '20px' }}>
                {sizes.map((size) => (
                  <Button icon={ExampleIcon} size={size} kind={kind} />
                ))}
              </div>
            </StoryDescriptor>
          </>
        );
      })}
    </>
  );
};

export const ButtonAsLink = (): React.ReactElement => (
  <Button href="https://livechat.com" target="_blank" kind="primary">
    Button as an external link to livechat.com
  </Button>
);
