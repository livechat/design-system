import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import * as MaterialIcons from '@livechat/design-system-icons/react/material';

import { Tag as TagComponent, TagProps } from './Tag';

const iterator = Object.keys(MaterialIcons);

export default {
  title: 'Components/Tag',
  component: TagComponent,
  argTypes: {
    icon: {
      options: iterator,
      mapping: MaterialIcons,
      control: {
        type: 'select',
        labels: iterator,
      },
    },
  },
} as ComponentMeta<typeof TagComponent>;

export const Tag = ({ children, ...args }: TagProps): React.ReactElement => {
  return <TagComponent {...args}>{children}</TagComponent>;
};

Tag.args = {
  kind: 'default',
  outline: false,
  size: 'medium',
  children: 'Example tag',
  dismissible: false,
} as TagProps;

const avatar =
  'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200';

export const kinds = ({ children, ...args }: TagProps): React.ReactElement => {
  return (
    <div className="spacer" style={{ display: 'flex' }}>
      <TagComponent {...args} kind="default">
        {children}
      </TagComponent>
      <TagComponent {...args} kind="info">
        {children}
      </TagComponent>
      <TagComponent {...args} kind="warning">
        {children}
      </TagComponent>
      <TagComponent {...args} kind="success">
        {children}
      </TagComponent>
      <TagComponent {...args} kind="error">
        {children}
      </TagComponent>
    </div>
  );
};

kinds.args = {
  children: 'Example tag',
};

export const kindsWithOutline = ({
  children,
  ...args
}: TagProps): React.ReactElement => {
  return (
    <div className="spacer" style={{ display: 'flex' }}>
      <TagComponent {...args} kind="default" outline>
        {children}
      </TagComponent>
      <TagComponent {...args} kind="info" outline>
        {children}
      </TagComponent>
      <TagComponent {...args} kind="warning" outline>
        {children}
      </TagComponent>
      <TagComponent {...args} kind="success" outline>
        {children}
      </TagComponent>
      <TagComponent {...args} kind="error" outline>
        {children}
      </TagComponent>
    </div>
  );
};

kindsWithOutline.args = {
  children: 'Example tag',
};

export const kindsWithIcon = ({
  children,
  ...args
}: TagProps): React.ReactElement => {
  return (
    <div className="spacer" style={{ display: 'flex' }}>
      <TagComponent {...args} kind="default">
        {children}
      </TagComponent>
      <TagComponent {...args} kind="info">
        {children}
      </TagComponent>
      <TagComponent {...args} kind="warning">
        {children}
      </TagComponent>
      <TagComponent {...args} kind="success">
        {children}
      </TagComponent>
      <TagComponent {...args} kind="error">
        {children}
      </TagComponent>
    </div>
  );
};

kindsWithIcon.args = {
  children: 'Example tag',
  icon: MaterialIcons.Smiles,
};

export const kindsWithAvatar = ({
  children,
  ...args
}: TagProps): React.ReactElement => {
  return (
    <div className="spacer" style={{ display: 'flex' }}>
      <TagComponent {...args} kind="default" avatar={avatar}>
        {children}
      </TagComponent>
      <TagComponent {...args} kind="info" avatar={avatar}>
        {children}
      </TagComponent>
      <TagComponent {...args} kind="warning" avatar={avatar}>
        {children}
      </TagComponent>
      <TagComponent {...args} kind="success" avatar={avatar}>
        {children}
      </TagComponent>
      <TagComponent {...args} kind="error" avatar={avatar}>
        {children}
      </TagComponent>
    </div>
  );
};

kindsWithAvatar.args = {
  children: 'Example tag',
};
