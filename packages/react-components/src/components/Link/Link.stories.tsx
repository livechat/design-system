import * as React from 'react';

import { Meta } from '@storybook/react';

import { Link as LinkComponent, LinkProps } from './Link';

export default {
  title: 'Components/Link',
  component: LinkComponent,
  tags: ['autodocs'],
} as Meta<typeof LinkComponent>;

export const Link = ({ ...args }: LinkProps): React.ReactElement => (
  <LinkComponent {...args}>This is a link</LinkComponent>
);

Link.args = {
  bold: false,
};
