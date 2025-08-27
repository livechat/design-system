import * as React from 'react';

import { Meta } from '@storybook/react-vite';
import { action } from 'storybook/actions';

import image from '../../stories/assets/folder.svg';
import { Card, CardProps } from '../Card';

export default {
  title: 'Components/Card',
  component: Card,
  argTypes: {
    buttonsOptions: {
      control: false,
    },
    expandableContent: {
      control: false,
    },
  },
} as Meta<typeof Card>;

export const Default = (args: CardProps): React.ReactElement => (
  <Card {...args} />
);

Default.args = {
  title: 'Card title',
  src: image,
  alt: 'Image description',
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
} as CardProps;
Default.storyName = 'Card';

export const Expandable = (): React.ReactElement => (
  <Card
    title="Expandable card"
    description="Click show more to expand"
    src={image}
    expandableContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore
  </Card>
);

export const WithButtons = (): React.ReactElement => (
  <Card
    title="Expandable card"
    description="Click show more to expand"
    src={image}
    buttonsOptions={[
      {
        kind: 'secondary',
        onClick: action('Secondary action clicked'),
        children: 'Details',
      },
      {
        kind: 'destructive',
        onClick: action('Destructive action clicked'),
        children: 'Delete',
      },
    ]}
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore
  </Card>
);

export const ExpandableWithButtons = (): React.ReactElement => (
  <Card
    title="Expandable card"
    description="Click show more to expand"
    src={image}
    expandableContent="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore"
    buttonsOptions={[
      {
        kind: 'secondary',
        onClick: action('Secondary action clicked'),
        children: 'Details',
      },
      {
        kind: 'destructive',
        onClick: action('Destructive action clicked'),
        children: 'Delete',
      },
    ]}
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
    tempor incididunt ut labore
  </Card>
);
