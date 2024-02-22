import * as React from 'react';

import * as TablerIcons from '@livechat/design-system-icons';
import { ComponentMeta } from '@storybook/react';

import { StoryDescriptor } from '../../stories/components/StoryDescriptor';
import noop from '../../utils/noop';
import { Icon } from '../Icon';

import { Tag, TagProps } from './Tag';
import { TagKind, TagSize } from './types';

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
const kinds: Array<TagKind> = [
  'default',
  'info',
  'warning',
  'success',
  'error',
  'purple',
  'black',
  'gray',
  'gradient01',
  'gradient02',
  'gradient03',
  'gradient04',
  'gradient05',
  'gradient06',
  'gradient07',
  'gradient08',
  'gradient09',
  'gradient10',
  'gradient11',
];
const sizes: Array<TagSize> = ['small', 'medium', 'large', 'xlarge'];
const text = 'Example tag';

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

export const Kinds = (): React.ReactElement => (
  <>
    {kinds.map((kind) => {
      const title = kind.charAt(0).toUpperCase() + kind.slice(1);

      return (
        <>
          <StoryDescriptor title={title}>
            <Tag kind={kind}>{text}</Tag>
            <Tag leftNode={exampleIcon} kind={kind}>
              {text}
            </Tag>
            <Tag leftNode={exampleAvatar} kind={kind}>
              {text}
            </Tag>
            <Tag kind={kind} onRemove={noop}>
              {text}
            </Tag>
          </StoryDescriptor>
          <StoryDescriptor title={`${title} with outline`}>
            <Tag kind={kind} outline>
              {text}
            </Tag>
            <Tag leftNode={exampleIcon} kind={kind} outline>
              {text}
            </Tag>
            <Tag leftNode={exampleAvatar} kind={kind} outline>
              {text}
            </Tag>
            <Tag kind={kind} onRemove={noop} outline>
              {text}
            </Tag>
          </StoryDescriptor>
        </>
      );
    })}
  </>
);

export const Sizes = (): React.ReactElement => (
  <>
    {sizes.map((size) => {
      const title = size.charAt(0).toUpperCase() + size.slice(1);

      return (
        <StoryDescriptor title={title}>
          <Tag size={size}>{text}</Tag>
          <Tag
            leftNode={exampleIcon}
            rightNode={exampleIcon}
            size={size}
            onRemove={noop}
          >
            {text}
          </Tag>
        </StoryDescriptor>
      );
    })}
  </>
);

export const WithIconOnly = (): React.ReactElement => (
  <>
    {sizes.map((size) => {
      const title = size.charAt(0).toUpperCase() + size.slice(1);

      return (
        <StoryDescriptor title={`${title} with icon only`}>
          <Tag size={size}>{<Icon source={TablerIcons.Smiles} />}</Tag>
          <Tag size={size} outline>
            {<Icon source={TablerIcons.Smiles} />}
          </Tag>
        </StoryDescriptor>
      );
    })}
  </>
);

export const WithShowCloseOnHover = (): React.ReactElement => (
  <>
    {sizes.map((size) => {
      const title = size.charAt(0).toUpperCase() + size.slice(1);

      return (
        <StoryDescriptor title={title}>
          <Tag
            size={size}
            leftNode={exampleIcon}
            rightNode={exampleIcon}
            onRemove={noop}
            dismissibleOnHover
          >
            {text}
          </Tag>
          <Tag size={size} onRemove={noop} dismissibleOnHover>
            {text}
          </Tag>
        </StoryDescriptor>
      );
    })}
  </>
);
