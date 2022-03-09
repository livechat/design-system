import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Link as LinkComponent, LinkProps } from '../components/Link';

export default {
  title: 'Components/Link',
  component: LinkComponent,
} as ComponentMeta<typeof LinkComponent>;

export const Link = ({ ...args }: LinkProps): React.ReactElement => (
  <LinkComponent {...args}>This is a link</LinkComponent>
);

Link.args = {
  bold: false,
};
