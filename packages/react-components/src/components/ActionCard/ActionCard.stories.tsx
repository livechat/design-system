import * as React from 'react';

import { Meta } from '@storybook/react';

import image from '../../stories/assets/chat-window.png';
import { Button } from '../Button';
import { Heading, Text } from '../Typography';

import { ActionCard } from './ActionCard';

export default {
  title: 'Components/ActionCard',
  component: ActionCard,
} as Meta<typeof ActionCard>;

const PrimaryColumnComponent = () => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      textAlign: 'center',
      height: '100%',
      justifyContent: 'center',
      width: '100%',
    }}
  >
    <Heading>Proactively Offer Help to Visitors</Heading>
    <Text>
      Inform visitors about important updates to your services or simple catch
      their attention with something interesting
    </Text>
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        gap: '16px',
        marginTop: '16px',
      }}
    >
      <Button
        kind="primary"
        onClick={(e) => {
          e.stopPropagation();
          alert('Primary button clicked');
        }}
      >
        Primary CTA
      </Button>
      <Button
        kind="secondary"
        onClick={(e) => {
          e.stopPropagation();
          alert('Secondary button clicked');
        }}
      >
        Secondary CTA
      </Button>
    </div>
  </div>
);

export const OneColumn = (): React.ReactElement => {
  return (
    <ActionCard onClick={() => alert('ActionCard clicked')}>
      <PrimaryColumnComponent />
    </ActionCard>
  );
};

export const TwoColumns = (): React.ReactElement => {
  return (
    <ActionCard
      onClick={() => alert('ActionCard clicked')}
      secondColumn={<img style={{ margin: 'auto' }} src={image} />}
    >
      <PrimaryColumnComponent />
    </ActionCard>
  );
};
