import { Meta, StoryObj } from '@storybook/react-vite';

import { customHeightForChromatic } from '../../utils/chromatic-story-helpers';

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
