import { Meta, StoryObj } from '@storybook/react-vite';

import { customHeightForChromatic } from '../../utils/chromatic-story-helpers';
import { Button } from '../Button';
import { Heading, Text } from '../Typography';

import { useProductSwitcher } from './hooks/useProductSwitcher';
import { ProductSwitcher } from './ProductSwitcher';

const meta: Meta<typeof ProductSwitcher> = {
  title: 'Business Components/ProductSwitcher',
  component: ProductSwitcher,
  parameters: {
    controls: { expanded: true },
  },
  argTypes: {
    isVisible: {
      options: [true, false, undefined],
      control: {
        type: 'select',
        labels: 'Visible',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof ProductSwitcher>;

export const Default: Story = {
  args: {
    mainProductId: 'livechat',
    openedOnInit: true,
  },
  render: (props) => {
    const { products } = useProductSwitcher({
      env: 'labs',
      installedProducts: [
        {
          product: 'ChatBot',
        },
        {
          product: 'HelpDesk',
        },
        {
          product: 'KnowledgeBase',
        },
        {
          product: 'LiveChat',
        },
        {
          product: 'TeamChat',
        },
        {
          product: 'OpenWidget',
        },
      ],
      organizationId: 'organizationId',
      subscriptions: {
        livechat: { status: 'active' },
        chatbot: { status: 'expired' },
        knowledgebase: {
          status: 'trial',
          next_charge_at: '2024-08-25T10:41:37Z',
        },
      },
      mainProductId: 'livechat',
    });

    return (
      <div
        style={{
          display: 'flex',
          width: 400,
          height: customHeightForChromatic('1000px'),
        }}
      >
        <ProductSwitcher {...props} productOptions={products} />
      </div>
    );
  },
};

export const WithPromoContent: Story = {
  ...Default,
  args: {
    ...Default.args,
    promoContent: (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 'var(--spacing-2)',
          padding: 'var(--spacing-4)',
          borderRadius: 'var(--radius-4)',
          background: 'var(--surface-primary-default)',
        }}
      >
        <Heading
          size="xs"
          style={{ margin: 0, color: 'var(--content-basic-primary)' }}
        >
          Upgrade to Text at the same price
        </Heading>
        <Text size="md" noMargin customColor="var(--content-basic-secondary)">
          Chats and tickets in one inbox, plus an AI Agent that supports and
          sells for you. Your setup comes with you.
        </Text>
        <Button
          kind="high-contrast"
          style={{ marginTop: 'var(--spacing-2)' }}
          href="https://www.livechat.com/move-to-text"
          target="_blank"
          rel="noopener noreferrer"
        >
          Discover Text
        </Button>
      </div>
    ),
  },
};
