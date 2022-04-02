import * as React from 'react';
import { render, fireEvent, vi } from 'test-utils';
import { PromoBannerProps, PromoBanner, PromoBannerSize } from './PromoBanner';

import styles from './PromoBanner.module.scss';

const promoHeader = 'This example headline has 40 characters';

const renderComponent = (props: PromoBannerProps) => {
  return render(<PromoBanner {...props}>This example content</PromoBanner>);
};

describe('<PromoBanner> component', () => {
  it('should allow for custom class', () => {
    const { container } = renderComponent({
      header: promoHeader,
      className: 'my-css-class',
    });

    expect(container.firstChild).toHaveClass('my-css-class');
  });

  it('should display button', () => {
    const { getByText } = renderComponent({
      header: promoHeader,
      buttonText: 'Example text',
    });

    expect(getByText('Example text')).toBeVisible();
  });

  it('should display link', () => {
    const { getByText } = renderComponent({
      header: promoHeader,
      linkText: 'Example text',
    });

    expect(getByText('Example text')).toBeVisible();
  });

  it('should display image', () => {
    const { getByRole } = renderComponent({
      header: promoHeader,
      img: 'https://via.placeholder.com/100',
    });

    expect(getByRole('img')).toBeVisible();
  });

  it('should display with light mode', () => {
    const { container } = renderComponent({
      header: promoHeader,
      light: true,
    });

    expect(container.firstChild).toHaveClass(styles['promo-banner--light']);
  });

  it('should display with small size by default', () => {
    const { container } = renderComponent({
      header: promoHeader,
    });

    expect(container.firstChild).toHaveClass(styles['promo-banner--small']);
  });

  it('should display with medium size', () => {
    const { container } = renderComponent({
      header: promoHeader,
      size: PromoBannerSize.Medium,
    });

    expect(container.firstChild).toHaveClass(styles['promo-banner--medium']);
  });

  it('should display with large size', () => {
    const { container } = renderComponent({
      header: promoHeader,
      size: PromoBannerSize.Large,
    });

    expect(container.firstChild).toHaveClass(styles['promo-banner--large']);
  });

  it('should call onClose function', () => {
    const onClose = vi.fn();
    const { getByRole } = renderComponent({
      header: promoHeader,
      onClose,
    });

    fireEvent.click(getByRole('button'));
    expect(onClose).toHaveBeenCalled();
  });

  it('should call onButtonClick function', () => {
    const onButtonClick = vi.fn();
    const { getByText } = renderComponent({
      header: promoHeader,
      buttonText: 'Example text',
      onButtonClick,
    });

    fireEvent.click(getByText('Example text'));
    expect(onButtonClick).toHaveBeenCalled();
  });

  it('should call onLinkClick function', () => {
    const onLinkClick = vi.fn();
    const { getByText } = renderComponent({
      header: promoHeader,
      linkText: 'Example text',
      onLinkClick,
    });

    fireEvent.click(getByText('Example text'));
    expect(onLinkClick).toHaveBeenCalled();
  });
});
