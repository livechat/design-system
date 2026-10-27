import { vi } from 'vitest';

import { render, screen, userEvent, waitFor } from 'test-utils';

import { ProductSwitcherProducts } from './constants';
import { ProductSwitcher } from './ProductSwitcher';

const products = ProductSwitcherProducts.filter(({ id }) =>
  ['livechat', 'chatbot', 'helpdesk', 'accounts'].includes(id)
);

describe('ProductSwitcher promo content', () => {
  it('renders interactive content between the products and the footer', async () => {
    const onClick = vi.fn();
    render(
      <ProductSwitcher
        mainProductId="livechat"
        productOptions={products}
        openedOnInit
        promoContent={<button onClick={onClick}>Learn more</button>}
      />
    );
    const promo = await screen.findByRole('button', { name: 'Learn more' });
    const footer = screen.getByRole('link', { name: 'powered by' });
    const lastProduct = screen.getByText('Text Accounts');
    expect(
      lastProduct.compareDocumentPosition(promo) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    expect(
      promo.compareDocumentPosition(footer) & Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    await waitFor(() => expect(promo).toBeVisible());
    userEvent.click(promo);
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('does not render a zero from a count-based promo condition', async () => {
    render(
      <ProductSwitcher
        mainProductId="livechat"
        productOptions={products}
        openedOnInit
        promoContent={0}
      />
    );
    expect(
      await screen.findByRole('link', { name: 'powered by' })
    ).toBeInTheDocument();
    expect(screen.queryByText('0', { exact: true })).not.toBeInTheDocument();
  });

  it('keeps the product list and footer when promo content is omitted', async () => {
    render(
      <ProductSwitcher
        mainProductId="livechat"
        productOptions={products}
        openedOnInit
      />
    );
    expect(
      await screen.findByRole('link', { name: 'powered by' })
    ).toHaveAttribute('href', 'https://www.text.com');
    await waitFor(() =>
      expect(screen.getByText('Text Accounts')).toBeVisible()
    );
    expect(
      screen.queryByRole('button', { name: 'Learn more' })
    ).not.toBeInTheDocument();
  });
});
