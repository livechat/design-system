import * as React from 'react';

import * as TablerIcons from '@livechat/design-system-icons';
import { Meta } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';
import { Tag } from '../Tag';

import { Icon, IconProps } from './Icon';

const iterator = Object.keys(TablerIcons);

const SHORTCUT_ITEMS = [
  {
    icon: TablerIcons.AccountCircle,
    text: 'Command',
    unicode: '⌘',
  },
  {
    icon: TablerIcons.Activities,
    text: 'Option',
    unicode: '⌥ ',
  },
  {
    icon: TablerIcons.HandWave,
    text: 'Control',
    unicode: '⌃',
  },
  {
    icon: TablerIcons.HandWave,
    text: 'Shift',
    unicode: '⇧',
  },
  {
    icon: TablerIcons.HandWave,
    text: 'Tab',
    unicode: '⇥',
  },
  {
    icon: TablerIcons.HandWave,
    text: 'Caps Lock',
    unicode: '⇪',
  },
  {
    icon: TablerIcons.HandWave,
    text: 'Escape',
    unicode: '⎋',
  },
  {
    icon: TablerIcons.HandWave,
    text: 'Backspace',
    unicode: '⌫',
  },
  {
    icon: TablerIcons.HandWave,
    text: 'Enter',
    unicode: '↵',
  },
  {
    icon: TablerIcons.HandWave,
    text: 'Arrow up',
    unicode: '↑',
  },
  {
    icon: TablerIcons.HandWave,
    text: 'Arrow down',
    unicode: '↓',
  },
  {
    icon: TablerIcons.HandWave,
    text: 'Arrow left',
    unicode: '←',
  },
  {
    icon: TablerIcons.HandWave,
    text: 'Arrow right',
    unicode: '→',
  },
];

export default {
  title: 'Components/Icon',
  component: Icon,
  argTypes: {
    source: {
      options: iterator,
      mapping: TablerIcons,
      control: {
        type: 'select',
        labels: iterator,
      },
    },
    size: {
      table: {
        defaultValue: {
          summary: 'medium',
        },
      },
    },
    kind: {
      table: {
        defaultValue: {
          summary: 'primary',
        },
      },
    },
  },
} as Meta<typeof Icon>;

export const Default = (args: IconProps): React.ReactElement => (
  <div style={{ width: '300px' }}>
    <Icon {...args} />
  </div>
);

Default.args = {
  source: TablerIcons.EmailLetter,
  size: 'medium',
  kind: 'primary',
  disabled: false,
};

export const Sizes = (): React.ReactElement => (
  <div>
    <StoryDescriptor title="xsmall">
      <Icon source={TablerIcons.EmailLetter} size="xsmall" />
    </StoryDescriptor>
    <StoryDescriptor title="small">
      <Icon source={TablerIcons.EmailLetter} size="small" />
    </StoryDescriptor>
    <StoryDescriptor title="medium">
      <Icon source={TablerIcons.EmailLetter} size="medium" />
    </StoryDescriptor>
    <StoryDescriptor title="large">
      <Icon source={TablerIcons.EmailLetter} size="large" />
    </StoryDescriptor>
    <StoryDescriptor title="xlarge">
      <Icon source={TablerIcons.EmailLetter} size="xlarge" />
    </StoryDescriptor>
    <StoryDescriptor title="xxlarge">
      <Icon source={TablerIcons.EmailLetter} size="xxlarge" />
    </StoryDescriptor>
    <StoryDescriptor title="xxxlarge">
      <Icon source={TablerIcons.EmailLetter} size="xxxlarge" />
    </StoryDescriptor>
  </div>
);

export const ShortcutsExamples = (): React.ReactElement => (
  <div style={{ display: 'flex', gap: '8px' }}>
    <StoryDescriptor title="Shortcuts with icons">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {SHORTCUT_ITEMS.map((item) => (
          <Tag leftNode={<Icon source={item.icon} />} key={item.text}>
            {item.text}
          </Tag>
        ))}
      </div>
    </StoryDescriptor>

    <StoryDescriptor title="Text-only shortcuts">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
        {SHORTCUT_ITEMS.map((item) => (
          <Tag key={item.text}>
            {item.unicode} {item.text}
          </Tag>
        ))}
      </div>
    </StoryDescriptor>
  </div>
);
