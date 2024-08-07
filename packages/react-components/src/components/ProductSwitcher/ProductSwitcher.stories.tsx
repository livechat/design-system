import * as React from 'react';

import { Meta, StoryObj } from '@storybook/react';

import { useProductSwitcher } from './hooks/useProductSwitcher';
import { ProductSwitcher as ProductSwitcherComponent } from './ProductSwitcher';

const meta: Meta<typeof ProductSwitcherComponent> = {
  title: 'Business Components/ProductSwitcher',
  component: ProductSwitcherComponent,
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;
type Story = StoryObj<typeof ProductSwitcherComponent>;

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
      <div className="lc-dark-theme" style={{ display: 'flex' }}>
        <ProductSwitcherComponent {...props} productOptions={products} />
      </div>
    );
  },
};
