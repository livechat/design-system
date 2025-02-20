import {
  Info as InfoIcon,
  FacebookColored as FacebookIcon,
  GoogleLightModeColored as GoogleIcon,
  MoreHoriz,
} from '@livechat/design-system-icons';
import { Meta, StoryObj } from '@storybook/react';

import { ActionMenu } from '../ActionMenu';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { ListItem } from '../ListItem';
import { Text } from '../Typography';

import { EmptyState } from './EmptyState';

import styles from './EmptyState.stories.module.scss';

export default {
  title: 'Components/EmptyState',
  component: EmptyState,
} as Meta<typeof EmptyState>;

type Story = StoryObj<typeof EmptyState>;

export const Default: Story = {
  args: {
    image: 'https://placehold.co/600x300',
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
  },
};

export const Inline: Story = {
  decorators: [
    (Story) => (
      <div className={styles['empty-state-story__action-menu']}>
        <ActionMenu
          options={[
            {
              key: '1',
              element: (
                <div className={styles['empty-state-story__action-menu__item']}>
                  <ListItem>
                    <Story />
                  </ListItem>
                </div>
              ),
            },
          ]}
          triggerRenderer={
            <Button icon={<Icon source={MoreHoriz} kind="primary" />} />
          }
          openedOnInit
        ></ActionMenu>
      </div>
    ),
  ],
  args: {
    icon: <Icon source={InfoIcon} />,
    title: 'No data',
    type: 'inline',
    actions: <Button kind="link">Plain action</Button>,
  },
  parameters: {
    chromatic: { delay: 300 },
    controls: {
      exclude: ['description', 'image'],
    },
  },
};

export const WithIcon: Story = {
  args: {
    icon: (
      <Icon className={styles['empty-state-story__icon']} source={InfoIcon} />
    ),
    title: 'No data',
    description: 'There is no data to display',
    actions: (
      <>
        <Button kind="primary">Primary action</Button>
        <Button kind="secondary">Secondary action</Button>
      </>
    ),
  },
};

export const Centered: Story = {
  args: {
    centered: true,
    icon: (
      <Icon className={styles['empty-state-story__icon']} source={InfoIcon} />
    ),
    title: 'No data',
    description: 'There is no data to display',
    actions: (
      <>
        <Button kind="primary">Primary action</Button>
        <Button kind="secondary">Secondary action</Button>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <div className={styles['empty-state-story--centered']}>
        <Story />
      </div>
    ),
  ],
};

export const SmallImage: Story = {
  args: {
    image: 'https://placehold.co/250x200',
    title: 'All tickets solved',
    description: 'Follow the instruction to start working with tickets',
  },
};

export const VeryBigImage: Story = {
  args: {
    image: 'https://placehold.co/800x300',
    title: 'All tickets solved',
    description: 'Follow the instruction to start working with tickets',
  },
};

export const WithCustomContentAndNoIllustration: Story = {
  args: {
    title: 'Title up to 50 characters',
    description:
      'A description with a maximum of 100 characters. That usually means only one or two sentences.',
    actions: (
      <div className={styles['empty-state-story__custom-content']}>
        <div className={styles['empty-state-story__custom-content__row']}>
          <div className={styles['empty-state-story__custom-content__box']}>
            <Icon size="xlarge" source={FacebookIcon} />
            <Text bold>Facebook Messenger</Text>
          </div>
          <div className={styles['empty-state-story__custom-content__box']}>
            <Icon size="xlarge" source={GoogleIcon} />
            <Text bold>Google Messages</Text>
          </div>
        </div>
        <Button kind="link">See all channels</Button>
      </div>
    ),
  },
};

export const WithoutActionsOnlyDescription: Story = {
  args: {
    icon: (
      <Icon className={styles['empty-state-story__icon']} source={InfoIcon} />
    ),
    title: 'No data',
    description: (
      <Text style={{ margin: 0 }}>
        There is no data to display{' '}
        <Button kind="link"> start by chatting with yourself</Button>
      </Text>
    ),
  },
};
