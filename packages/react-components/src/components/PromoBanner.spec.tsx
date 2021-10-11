import * as React from 'react';
import { render, fireEvent } from '../test-utils';
import { IPromoBannerProps, PromoBanner, PromoBannerSize } from './PromoBanner';

const promoHeader = 'This example headline has 40 characters';

const renderComponent = (props: IPromoBannerProps) => {
  return render(
    <PromoBanner {...props} className="my-css-class">
      This example content
    </PromoBanner>
  );
};

describe('<PromoBanner> component', () => {
  it('should allow for custom class', () => {
    const { container } = renderComponent({
      header: promoHeader,
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

    expect(container.firstChild).toHaveClass('lc-promo-banner--light');
  });

  it('should display with small size by default', () => {
    const { container } = renderComponent({
      header: promoHeader,
    });

    expect(container.firstChild).toHaveClass('lc-promo-banner--small');
  });

  it('should display with medium size', () => {
    const { container } = renderComponent({
      header: promoHeader,
      size: PromoBannerSize.Medium,
    });

    expect(container.firstChild).toHaveClass('lc-promo-banner--medium');
  });

  it('should display with large size', () => {
    const { container } = renderComponent({
      header: promoHeader,
      size: PromoBannerSize.Large,
    });

    expect(container.firstChild).toHaveClass('lc-promo-banner--large');
  });

  it('should call onClose function', () => {
    const mockedFunction = jest.fn();
    const { getByRole } = renderComponent({
      header: promoHeader,
      onClose: mockedFunction,
    });

    fireEvent.click(getByRole('button'));
    expect(mockedFunction).toHaveBeenCalled();
  });

  it('should call onButtonClick function', () => {
    const mockedFunction = jest.fn();
    const { getByText } = renderComponent({
      header: promoHeader,
      buttonText: 'Example text',
      onButtonClick: mockedFunction,
    });

    fireEvent.click(getByText('Example text'));
    expect(mockedFunction).toHaveBeenCalled();
  });

  it('should call onLinkClick function', () => {
    const mockedFunction = jest.fn();
    const { getByText } = renderComponent({
      header: promoHeader,
      linkText: 'Example text',
      onLinkClick: mockedFunction,
    });

    fireEvent.click(getByText('Example text'));
    expect(mockedFunction).toHaveBeenCalled();
  });
});
