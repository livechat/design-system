import * as React from 'react';
import { render, fireEvent } from '../test-utils';
import { PromoBanner, PromoBannerSize } from './PromoBanner';

const customClass = 'my-css-class';
const promoHeader = 'This example headline has 40 characters';
const promoContent = 'This example content';
const text = 'Example text';
const img = 'https://via.placeholder.com/100';
const mockedFunction = jest.fn();

describe('<PromoBanner> component', () => {
  it('should allow for custom class', () => {
    const { container } = render(
      <PromoBanner header={promoHeader} className={customClass}>
        {promoContent}
      </PromoBanner>
    );

    expect(container.firstChild).toHaveClass(customClass);
  });

  it('should display button', () => {
    const { getByTestId } = render(
      <PromoBanner header={promoHeader} buttonText={text}>
        {promoContent}
      </PromoBanner>
    );

    expect(getByTestId('button')).toBeTruthy();
  });

  it('should display link', () => {
    const { getByTestId } = render(
      <PromoBanner header={promoHeader} linkText={text}>
        {promoContent}
      </PromoBanner>
    );

    expect(getByTestId('link')).toBeTruthy();
  });

  it('should display image', () => {
    const { getByTestId } = render(
      <PromoBanner header={promoHeader} img={img}>
        {promoContent}
      </PromoBanner>
    );

    expect(getByTestId('img')).toBeTruthy();
  });

  it('should display with light mode', () => {
    const { container } = render(
      <PromoBanner header={promoHeader} light={true}>
        {promoContent}
      </PromoBanner>
    );

    expect(container.firstChild).toHaveClass('lc-promo-banner--light');
  });

  it('should display with small size by default', () => {
    const { container } = render(
      <PromoBanner header={promoHeader}>{promoContent}</PromoBanner>
    );

    expect(container.firstChild).toHaveClass('lc-promo-banner--small');
  });

  it('should display with medium size', () => {
    const { container } = render(
      <PromoBanner header={promoHeader} size={PromoBannerSize.Medium}>
        {promoContent}
      </PromoBanner>
    );

    expect(container.firstChild).toHaveClass('lc-promo-banner--medium');
  });

  it('should display with large size', () => {
    const { container } = render(
      <PromoBanner header={promoHeader} size={PromoBannerSize.Large}>
        {promoContent}
      </PromoBanner>
    );

    expect(container.firstChild).toHaveClass('lc-promo-banner--large');
  });

  it('should call onClose function', () => {
    const { getByTestId } = render(
      <PromoBanner header={promoHeader} onClose={mockedFunction}>
        {promoContent}
      </PromoBanner>
    );

    fireEvent.click(getByTestId('close'));
    expect(mockedFunction).toHaveBeenCalled();
  });

  it('should call onButtonClick function', () => {
    const { getByTestId } = render(
      <PromoBanner
        header={promoHeader}
        buttonText={text}
        onButtonClick={mockedFunction}
      >
        {promoContent}
      </PromoBanner>
    );

    fireEvent.click(getByTestId('button'));
    expect(mockedFunction).toHaveBeenCalled();
  });

  it('should call onLinkClick function', () => {
    const { getByTestId } = render(
      <PromoBanner
        header={promoHeader}
        linkText={text}
        onLinkClick={mockedFunction}
      >
        {promoContent}
      </PromoBanner>
    );

    fireEvent.click(getByTestId('link'));
    expect(mockedFunction).toHaveBeenCalled();
  });
});
