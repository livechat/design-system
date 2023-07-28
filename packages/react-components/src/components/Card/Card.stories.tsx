import * as React from 'react';
import { ComponentMeta, Story } from '@storybook/react';

import { Card, CardProps } from '../Card';
import { action } from '@storybook/addon-actions';

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
} as ComponentMeta<typeof Card>;

export const Default: Story<CardProps> = (args: CardProps) => (
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

export const Expandable: Story = (): React.ReactElement => (
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

export const WithButtons: Story = (): React.ReactElement => (
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

export const ExpandableWithButtons: Story = (): React.ReactElement => (
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
