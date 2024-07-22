import { Meta, StoryObj } from '@storybook/react';

import { ProductSwitcherProducts } from './constants';
import { ProductSwitcher as ProductSwitcherComponent } from './ProductSwitcher';

const meta: Meta<typeof ProductSwitcherComponent> = {
  title: 'Business Components/ProductSwitcher',
  component: ProductSwitcherComponent,
};

export default meta;
type Story = StoryObj<typeof ProductSwitcherComponent>;

export const Default: Story = {
  args: {
    productOptions: ProductSwitcherProducts,
    mainProductId: 'livechat',
  },
};
