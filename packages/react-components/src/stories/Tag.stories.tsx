import * as React from 'react';
import { ComponentMeta } from '@storybook/react';
import { Smiles } from '@livechat/design-system-icons/dist/material';

import { Tag as TagComponent, ITagProps } from '../components/Tag';

export default {
  title: 'Components/Tag',
  component: TagComponent,
} as ComponentMeta<typeof TagComponent>;

export const Tag = ({ children, ...args }: ITagProps): React.ReactElement => {
  return <TagComponent {...args}>{children}</TagComponent>;
};

Tag.args = {
  kind: 'default',
  outline: false,
  size: 'medium',
  children: 'Example tag',
  dismissible: false,
} as ITagProps;

const avatar =
  'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200';

export const kinds = ({ children, ...args }: ITagProps): React.ReactElement => {
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
}: ITagProps): React.ReactElement => {
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
}: ITagProps): React.ReactElement => {
  return (
    <div className="spacer" style={{ display: 'flex' }}>
      <TagComponent {...args} kind="default" icon={Smiles}>
        {children}
      </TagComponent>
      <TagComponent {...args} kind="info" icon={Smiles}>
        {children}
      </TagComponent>
      <TagComponent {...args} kind="warning" icon={Smiles}>
        {children}
      </TagComponent>
      <TagComponent {...args} kind="success" icon={Smiles}>
        {children}
      </TagComponent>
      <TagComponent {...args} kind="error" icon={Smiles}>
        {children}
      </TagComponent>
    </div>
  );
};

kindsWithIcon.args = {
  children: 'Example tag',
};

export const kindsWithAvatar = ({
  children,
  ...args
}: ITagProps): React.ReactElement => {
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
