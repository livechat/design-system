import * as React from 'react';

import * as TablerIcons from '@livechat/design-system-icons/react/tabler';
import { ComponentMeta } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';

import { Tag, TagProps } from './Tag';

const iterator = Object.keys(TablerIcons);

export default {
  title: 'Components/Tag',
  component: Tag,
  argTypes: {
    icon: {
      options: iterator,
      mapping: TablerIcons,
      control: {
        type: 'select',
        labels: iterator,
      },
    },
  },
} as ComponentMeta<typeof Tag>;

export const Default = ({
  children,
  ...args
}: TagProps): React.ReactElement => {
  return <Tag {...args}>{children}</Tag>;
};

Default.args = {
  kind: 'default',
  outline: false,
  size: 'medium',
  children: 'Example tag',
  dismissible: false,
} as TagProps;

const avatar =
  'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200';

export const Kinds = ({ children, ...args }: TagProps): React.ReactElement => {
  return (
    <div>
      <StoryDescriptor title="Default">
        <Tag kind="default">{children}</Tag>
        <Tag icon={args.icon} kind="default">
          {children}
        </Tag>
        <Tag avatar={avatar} kind="default">
          {children}
        </Tag>
        <Tag kind="default" dismissible>
          {children}
        </Tag>
      </StoryDescriptor>
      <StoryDescriptor title="Default with outline">
        <Tag kind="default" outline>
          {children}
        </Tag>
        <Tag icon={args.icon} kind="default" outline>
          {children}
        </Tag>
        <Tag avatar={avatar} kind="default" outline>
          {children}
        </Tag>
        <Tag kind="default" outline dismissible>
          {children}
        </Tag>
      </StoryDescriptor>
      <StoryDescriptor title="Info">
        <Tag kind="info">{children}</Tag>
        <Tag icon={args.icon} kind="info">
          {children}
        </Tag>
        <Tag avatar={avatar} kind="info">
          {children}
        </Tag>
        <Tag kind="info" dismissible>
          {children}
        </Tag>
      </StoryDescriptor>
      <StoryDescriptor title="Info with outline">
        <Tag kind="info" outline>
          {children}
        </Tag>
        <Tag icon={args.icon} kind="info" outline>
          {children}
        </Tag>
        <Tag avatar={avatar} kind="info" outline>
          {children}
        </Tag>
        <Tag kind="info" outline dismissible>
          {children}
        </Tag>
      </StoryDescriptor>
      <StoryDescriptor title="Warning">
        <Tag kind="warning">{children}</Tag>
        <Tag icon={args.icon} kind="warning">
          {children}
        </Tag>
        <Tag avatar={avatar} kind="warning">
          {children}
        </Tag>
        <Tag kind="warning" dismissible>
          {children}
        </Tag>
      </StoryDescriptor>
      <StoryDescriptor title="Warning with outline">
        <Tag kind="warning" outline>
          {children}
        </Tag>
        <Tag icon={args.icon} kind="warning" outline>
          {children}
        </Tag>
        <Tag avatar={avatar} kind="warning" outline>
          {children}
        </Tag>
        <Tag kind="warning" outline dismissible>
          {children}
        </Tag>
      </StoryDescriptor>
      <StoryDescriptor title="Success">
        <Tag kind="success">{children}</Tag>
        <Tag icon={args.icon} kind="success">
          {children}
        </Tag>
        <Tag avatar={avatar} kind="success">
          {children}
        </Tag>
        <Tag kind="success" dismissible>
          {children}
        </Tag>
      </StoryDescriptor>
      <StoryDescriptor title="Success with outline">
        <Tag kind="success" outline>
          {children}
        </Tag>
        <Tag icon={args.icon} kind="success" outline>
          {children}
        </Tag>
        <Tag avatar={avatar} kind="success" outline>
          {children}
        </Tag>
        <Tag kind="success" outline dismissible>
          {children}
        </Tag>
      </StoryDescriptor>
      <StoryDescriptor title="Error">
        <Tag kind="error">{children}</Tag>
        <Tag icon={args.icon} kind="error">
          {children}
        </Tag>
        <Tag avatar={avatar} kind="error">
          {children}
        </Tag>
        <Tag kind="error" dismissible>
          {children}
        </Tag>
      </StoryDescriptor>
      <StoryDescriptor title="Error with outline">
        <Tag kind="error" outline>
          {children}
        </Tag>
        <Tag icon={args.icon} kind="error" outline>
          {children}
        </Tag>
        <Tag avatar={avatar} kind="error" outline>
          {children}
        </Tag>
        <Tag kind="error" outline dismissible>
          {children}
        </Tag>
      </StoryDescriptor>
      <StoryDescriptor title="Purple">
        <Tag kind="purple">{children}</Tag>
        <Tag icon={args.icon} kind="purple">
          {children}
        </Tag>
        <Tag avatar={avatar} kind="purple">
          {children}
        </Tag>
        <Tag kind="purple" dismissible>
          {children}
        </Tag>
      </StoryDescriptor>
      <StoryDescriptor title="Purple with outline">
        <Tag kind="purple" outline>
          {children}
        </Tag>
        <Tag icon={args.icon} kind="purple" outline>
          {children}
        </Tag>
        <Tag avatar={avatar} kind="purple" outline>
          {children}
        </Tag>
        <Tag kind="purple" outline dismissible>
          {children}
        </Tag>
      </StoryDescriptor>
      <StoryDescriptor title="Black">
        <Tag kind="black">{children}</Tag>
        <Tag icon={args.icon} kind="black">
          {children}
        </Tag>
        <Tag avatar={avatar} kind="black">
          {children}
        </Tag>
        <Tag kind="black" dismissible>
          {children}
        </Tag>
      </StoryDescriptor>
      <StoryDescriptor title="Black with outline">
        <Tag kind="black" outline>
          {children}
        </Tag>
        <Tag icon={args.icon} kind="black" outline>
          {children}
        </Tag>
        <Tag avatar={avatar} kind="black" outline>
          {children}
        </Tag>
        <Tag kind="black" outline dismissible>
          {children}
        </Tag>
      </StoryDescriptor>
    </div>
  );
};
Kinds.args = {
  children: 'Example tag',
  icon: TablerIcons.Smiles,
};

export const Sizes = ({ children, ...args }: TagProps): React.ReactElement => {
  return (
    <div>
      <StoryDescriptor title="Medium">
        <Tag>{children}</Tag>
        <Tag icon={args.icon} dismissible>
          {children}
        </Tag>
      </StoryDescriptor>
      <StoryDescriptor title="Large">
        <Tag size="large">{children}</Tag>
        <Tag icon={args.icon} size="large" dismissible>
          {children}
        </Tag>
      </StoryDescriptor>
    </div>
  );
};
Sizes.args = {
  children: 'Example tag',
  icon: TablerIcons.Smiles,
};
