import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { useProductSwitcher } from './hooks/useProductSwitcher';
import { ProductSwitcher } from './ProductSwitcher';

const meta: Meta<typeof ProductSwitcher> = {
  title: 'Business Components/ProductSwitcher',
  component: ProductSwitcher,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof ProductSwitcher>;

export const Default: Story = {
  args: {
    mainProductId: 'livechat',
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
          product: 'Hello',
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
    });

    return (
      <div className="lc-dark-theme" style={{ display: 'flex', height: 500 }}>
        <ProductSwitcher {...props} productOptions={products} />
      </div>
    );
  },
};
