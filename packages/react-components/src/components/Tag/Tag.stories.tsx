import * as React from 'react';

import * as TablerIcons from '@livechat/design-system-icons/react/tabler';
import { ComponentMeta } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';

import { Tag, TagProps } from './Tag';

const iterator = Object.keys(TablerIcons);

const iconOptions = {
  options: iterator,
  mapping: TablerIcons,
  control: {
    type: 'select',
    labels: iterator,
  },
};

export default {
  title: 'Components/Tag',
  component: Tag,
  argTypes: {
    icon: iconOptions,
    leftIcon: iconOptions,
    rightIcon: iconOptions,
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
        <Tag leftIcon={args.leftIcon} kind="default">
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
        <Tag leftIcon={args.leftIcon} kind="default" outline>
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
        <Tag leftIcon={args.leftIcon} kind="info">
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
        <Tag leftIcon={args.leftIcon} kind="info" outline>
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
        <Tag leftIcon={args.leftIcon} kind="warning">
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
        <Tag leftIcon={args.leftIcon} kind="warning" outline>
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
        <Tag leftIcon={args.leftIcon} kind="success">
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
        <Tag leftIcon={args.leftIcon} kind="success" outline>
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
        <Tag leftIcon={args.leftIcon} kind="error">
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
        <Tag leftIcon={args.leftIcon} kind="error" outline>
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
        <Tag leftIcon={args.leftIcon} kind="purple">
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
        <Tag leftIcon={args.leftIcon} kind="purple" outline>
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
        <Tag leftIcon={args.leftIcon} kind="black">
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
        <Tag leftIcon={args.leftIcon} kind="black" outline>
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
  leftIcon: TablerIcons.Smiles,
};

export const Sizes = ({ children, ...args }: TagProps): React.ReactElement => {
  return (
    <div>
      <StoryDescriptor title="Small">
        <Tag size="small">{children}</Tag>
        <Tag icon={args.icon} size="small" dismissible>
          {children}
        </Tag>
      </StoryDescriptor>
      <StoryDescriptor title="Medium">
        <Tag>{children}</Tag>
        <Tag leftIcon={args.leftIcon} rightIcon={args.rightIcon} dismissible>
          {children}
        </Tag>
      </StoryDescriptor>
      <StoryDescriptor title="Large">
        <Tag size="large">{children}</Tag>
        <Tag
          leftIcon={args.leftIcon}
          rightIcon={args.rightIcon}
          size="large"
          dismissible
        >
          {children}
        </Tag>
      </StoryDescriptor>
    </div>
  );
};
Sizes.args = {
  children: 'Example tag',
  leftIcon: TablerIcons.Smiles,
  rightIcon: TablerIcons.Smiles,
};
