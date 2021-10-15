import * as React from 'react';
import { ComponentMeta } from '@storybook/react';

import { Card as CardComponent, ICardProps } from '../components/Card';

export default {
  title: 'Components/Card',
  component: CardComponent,
} as ComponentMeta<typeof CardComponent>;

type ICardArgs = ICardProps;

export const Card = (args: ICardArgs): React.ReactElement => {
  return (
    <div style={{ width: '300px' }}>
      <CardComponent {...args} />
    </div>
  );
};

Card.args = {
  title: 'Title goes here',
  img: 'https://via.placeholder.com/100',
  children: (
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
      tempor incididunt ut labore
    </p>
  ),
} as ICardArgs;
