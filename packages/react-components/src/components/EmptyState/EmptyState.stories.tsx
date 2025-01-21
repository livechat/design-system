import { ReactElement } from 'react';

import { Info as InfoIcon } from '@livechat/design-system-icons';

import { Button } from '../Button';
import { Icon } from '../Icon';
import { Text } from '../Typography';

import { EmptyState } from './EmptyState';
import { IEmptyStateProps } from './types';

export default {
  title: 'Components/EmptyState',
  component: EmptyState,
};

export const Default = (args: IEmptyStateProps): ReactElement => {
  return <EmptyState {...args} />;
};

export const Inline = (args: IEmptyStateProps): ReactElement => {
  return (
    <div
      style={{
        width: '300px',
        backgroundColor: '#C9C9CD',
        padding: '16px',
      }}
    >
      <EmptyState {...args} />
    </div>
  );
};

export const WithIcon = (args: IEmptyStateProps): ReactElement => {
  return <EmptyState {...args} />;
};

export const WithCustomContentAndNoIllustration = (
  args: IEmptyStateProps
): ReactElement => {
  return <EmptyState {...args} />;
};

export const WithoutActionsOnlyDescription = (
  args: IEmptyStateProps
): ReactElement => {
  return <EmptyState {...args} />;
};

Default.args = {
  image: 'https://placehold.co/600x400',
  title: 'No data',
  description: 'There is no data to display',
  actions: (
    <>
      <Button kind="primary">Primary action</Button>
      <Button kind="secondary">Secondary action</Button>
      <Button icon={<Icon source={InfoIcon} />} kind="secondary">
        Tell me more
      </Button>
      <Button kind="link">Link action</Button>
    </>
  ),
  type: 'full',
};

WithIcon.args = {
  icon: InfoIcon,
  title: 'No data',
  description: 'There is no data to display',
  actions: (
    <>
      <Button kind="primary">Primary action</Button>
      <Button kind="secondary">Secondary action</Button>
    </>
  ),
  type: 'full',
};

Inline.args = {
  icon: InfoIcon,
  title: 'No data',
  type: 'inline',
  actions: (
    <>
      <Button kind="link">Plain action</Button>
    </>
  ),
};

WithCustomContentAndNoIllustration.args = {
  title: 'No data',
  description: 'There is no data to display',
  type: 'full',
  actions: (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', gap: '8px' }}>
        <div
          style={{
            backgroundColor: '#F5F5F5',
            borderRadius: '8px',
            padding: '18px',
          }}
        >
          Custom content
        </div>
        <div
          style={{
            backgroundColor: '#F5F5F5',
            borderRadius: '8px',
            padding: '18px',
          }}
        >
          Custom content
        </div>
      </div>

      <Button kind="link">See more</Button>
    </div>
  ),
};

WithoutActionsOnlyDescription.args = {
  icon: InfoIcon,
  title: 'No data',
  description: (
    <Text style={{ margin: 0 }}>
      There is no data to display{' '}
      <Button kind="link"> start by chatting with yourself</Button>
    </Text>
  ),
  type: 'full',
};
