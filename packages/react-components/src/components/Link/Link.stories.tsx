import { ComponentMeta } from '@storybook/react';
import { ReactElement } from 'react';

import { Link as LinkComponent, LinkProps } from './Link';

export default {
  title: 'Components/Link',
  component: LinkComponent,
} as ComponentMeta<typeof LinkComponent>;

export const Link = ({ ...args }: LinkProps): ReactElement => (
  <LinkComponent {...args}>This is a link</LinkComponent>
);

Link.args = {
  bold: false,
};
