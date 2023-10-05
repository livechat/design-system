import * as React from 'react';

import * as TablerIcons from '@livechat/design-system-icons/react/tabler';
import { ComponentMeta } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';
import { Icon } from '../Icon';

import { Tag, TagProps } from './Tag';

const exampleIcon = <Icon source={TablerIcons.Smiles} size="small" />;
const exampleAvatar = (
  <img
    style={{ borderRadius: '50%', width: '20px', height: '20px' }}
    src={
      'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
    }
    alt="tag-avatar"
    data-testid="lc-tag-avatar"
  />
);

export default {
  title: 'Components/Tag',
  component: Tag,
} as ComponentMeta<typeof Tag>;

export const Default = ({
  children,
  ...args
}: TagProps): React.ReactElement => {
  return (
    <Tag {...args} leftNode={args.leftNode} rightNode={args.rightNode}>
      {children}
    </Tag>
  );
};

Default.args = {
  kind: 'default',
  outline: false,
  size: 'medium',
  children: 'Example tag',
  dismissible: true,
  leftNode: <Icon source={TablerIcons.Apple} size="small" />,
  rightNode: <Icon source={TablerIcons.Android} size="small" />,
} as TagProps;

export const Kinds = ({ children, ...args }: TagProps): React.ReactElement => {
  return (
    <div>
      <StoryDescriptor title="Default">
        <Tag kind="default">{children}</Tag>
        <Tag leftNode={args.leftNode} kind="default">
          {children}
        </Tag>
        <Tag kind="default">{children}</Tag>
        <Tag kind="default" dismissible style={{ maxWidth: '150px' }}>
          Example tag with long name
        </Tag>
      </StoryDescriptor>
      <StoryDescriptor title="Default with outline">
        <Tag kind="default" outline>
          {children}
        </Tag>
        <Tag leftNode={args.leftNode} kind="default" outline>
          {children}
        </Tag>
        <Tag leftNode={exampleAvatar} kind="default" outline>
          {children}
        </Tag>
        <Tag kind="default" outline dismissible>
          {children}
        </Tag>
      </StoryDescriptor>
      <StoryDescriptor title="Info">
        <Tag kind="info">{children}</Tag>
        <Tag leftNode={args.leftNode} kind="info">
          {children}
        </Tag>
        <Tag leftNode={exampleAvatar} kind="info">
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
        <Tag leftNode={args.leftNode} kind="info" outline>
          {children}
        </Tag>
        <Tag leftNode={exampleAvatar} kind="info" outline>
          {children}
        </Tag>
        <Tag kind="info" outline dismissible>
          {children}
        </Tag>
      </StoryDescriptor>
      <StoryDescriptor title="Warning">
        <Tag kind="warning">{children}</Tag>
        <Tag leftNode={args.leftNode} kind="warning">
          {children}
        </Tag>
        <Tag leftNode={exampleAvatar} kind="warning">
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
        <Tag leftNode={args.leftNode} kind="warning" outline>
          {children}
        </Tag>
        <Tag leftNode={exampleAvatar} kind="warning" outline>
          {children}
        </Tag>
        <Tag kind="warning" outline dismissible>
          {children}
        </Tag>
      </StoryDescriptor>
      <StoryDescriptor title="Success">
        <Tag kind="success">{children}</Tag>
        <Tag leftNode={args.leftNode} kind="success">
          {children}
        </Tag>
        <Tag leftNode={exampleAvatar} kind="success">
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
        <Tag leftNode={args.leftNode} kind="success" outline>
          {children}
        </Tag>
        <Tag leftNode={exampleAvatar} kind="success" outline>
          {children}
        </Tag>
        <Tag kind="success" outline dismissible>
          {children}
        </Tag>
      </StoryDescriptor>
      <StoryDescriptor title="Error">
        <Tag kind="error">{children}</Tag>
        <Tag leftNode={args.leftNode} kind="error">
          {children}
        </Tag>
        <Tag leftNode={exampleAvatar} kind="error">
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
        <Tag leftNode={args.leftNode} kind="error" outline>
          {children}
        </Tag>
        <Tag leftNode={exampleAvatar} kind="error" outline>
          {children}
        </Tag>
        <Tag kind="error" outline dismissible>
          {children}
        </Tag>
      </StoryDescriptor>
      <StoryDescriptor title="Purple">
        <Tag kind="purple">{children}</Tag>
        <Tag leftNode={args.leftNode} kind="purple">
          {children}
        </Tag>
        <Tag leftNode={exampleAvatar} kind="purple">
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
        <Tag leftNode={args.leftNode} kind="purple" outline>
          {children}
        </Tag>
        <Tag leftNode={exampleAvatar} kind="purple" outline>
          {children}
        </Tag>
        <Tag kind="purple" outline dismissible>
          {children}
        </Tag>
      </StoryDescriptor>
      <StoryDescriptor title="Black">
        <Tag kind="black">{children}</Tag>
        <Tag leftNode={args.leftNode} kind="black">
          {children}
        </Tag>
        <Tag leftNode={exampleAvatar} kind="black">
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
        <Tag leftNode={args.leftNode} kind="black" outline>
          {children}
        </Tag>
        <Tag leftNode={exampleAvatar} kind="black" outline>
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
  leftNode: exampleIcon,
  rightNode: exampleIcon,
};

export const Sizes = ({ children, ...args }: TagProps): React.ReactElement => {
  return (
    <div>
      <StoryDescriptor title="Small">
        <Tag size="small">{children}</Tag>
        <Tag leftNode={args.leftNode} size="small" dismissible>
          {children}
        </Tag>
      </StoryDescriptor>
      <StoryDescriptor title="Medium">
        <Tag>{children}</Tag>
        <Tag
          leftNode={<Icon source={TablerIcons.Smiles} />}
          rightNode={<Icon source={TablerIcons.Smiles} />}
          dismissible
        >
          {children}
        </Tag>
      </StoryDescriptor>
      <StoryDescriptor title="Large">
        <Tag size="large">{children}</Tag>
        <Tag
          leftNode={<Icon source={TablerIcons.Smiles} />}
          rightNode={<Icon source={TablerIcons.Smiles} />}
          size="large"
          dismissible
        >
          {children}
        </Tag>
      </StoryDescriptor>
      <StoryDescriptor title="XLarge">
        <Tag size="xlarge">{children}</Tag>
        <Tag
          leftNode={<Icon source={TablerIcons.Smiles} />}
          rightNode={<Icon source={TablerIcons.Smiles} />}
          size="xlarge"
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
  leftNode: exampleIcon,
  rightNode: exampleIcon,
};
