import * as React from 'react';

import * as TablerIcons from '@livechat/design-system-icons';
import { Meta } from '@storybook/react';

import image from '../../stories/assets/avatar.jpg';
import { StoryDescriptor } from '../../stories/components/StoryDescriptor';
import noop from '../../utils/noop';
import { Icon } from '../Icon';

import { kinds, sizes } from './constants';
import { Tag } from './Tag';
import { TagProps } from './types';

const exampleIcon = <Icon source={TablerIcons.Smiles} size="small" />;
const exampleAvatar = (
  <img
    style={{ borderRadius: '50%', width: '20px', height: '20px' }}
    src={image}
    alt="tag-avatar"
    data-testid="lc-tag-avatar"
  />
);
const text = 'Example tag';

export default {
  title: 'Components/Tag',
  component: Tag,
} as Meta<typeof Tag>;

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
          <Tag size={size} iconOnly>
            {<Icon source={TablerIcons.Smiles} />}
          </Tag>
          <Tag size={size} iconOnly outline>
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
