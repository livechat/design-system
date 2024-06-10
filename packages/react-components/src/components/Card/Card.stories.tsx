import * as React from 'react';

import { action } from '@storybook/addon-actions';
import { Meta } from '@storybook/react';

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
  src: 'https://via.placeholder.com/100',
  alt: 'Image description',
  children:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore',
} as CardProps;
Default.storyName = 'Card';

export const Expandable = (): React.ReactElement => (
  <Card
    title="Expandable card"
    description="Click show more to expand"
    src="https://via.placeholder.com/100"
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
    src="https://via.placeholder.com/100"
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
    src="https://via.placeholder.com/100"
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
