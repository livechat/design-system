import * as React from 'react';
import { render, fireEvent } from '../test-utils';
import { Promo, PromoSize } from './Promo';

const customClass = 'my-css-class';
const promoHeader = 'This example headline has 40 characters';
const promoContent = 'This example content';
const text = 'Example text';
const img = 'https://via.placeholder.com/100';
const mockedFunction = jest.fn();

describe('<Promo> component', () => {
  it('should allow for custom class', () => {
    const { container } = render(
      <Promo header={promoHeader} className={customClass}>
        {promoContent}
      </Promo>
    );

    expect(container.firstChild).toHaveClass(customClass);
  });

  it('should display button', () => {
    const { getByTestId } = render(
      <Promo header={promoHeader} buttonText={text}>
        {promoContent}
      </Promo>
    );

    expect(getByTestId('button')).toBeTruthy();
  });

  it('should display link', () => {
    const { getByTestId } = render(
      <Promo header={promoHeader} linkText={text}>
        {promoContent}
      </Promo>
    );

    expect(getByTestId('link')).toBeTruthy();
  });

  it('should display image', () => {
    const { getByTestId } = render(
      <Promo header={promoHeader} img={img}>
        {promoContent}
      </Promo>
    );

    expect(getByTestId('img')).toBeTruthy();
  });

  it('should display with light mode', () => {
    const { container } = render(
      <Promo header={promoHeader} light={true}>
        {promoContent}
      </Promo>
    );

    expect(container.firstChild).toHaveClass('lc-promo--light');
  });

  it('should display with small size by default', () => {
    const { container } = render(
      <Promo header={promoHeader}>{promoContent}</Promo>
    );

    expect(container.firstChild).toHaveClass('lc-promo--small');
  });

  it('should display with medium size', () => {
    const { container } = render(
      <Promo header={promoHeader} size={PromoSize.Medium}>
        {promoContent}
      </Promo>
    );

    expect(container.firstChild).toHaveClass('lc-promo--medium');
  });

  it('should display with large size', () => {
    const { container } = render(
      <Promo header={promoHeader} size={PromoSize.Large}>
        {promoContent}
      </Promo>
    );

    expect(container.firstChild).toHaveClass('lc-promo--large');
  });

  it('should call onClose function', () => {
    const { getByTestId } = render(
      <Promo header={promoHeader} onClose={mockedFunction}>
        {promoContent}
      </Promo>
    );

    fireEvent.click(getByTestId('close'));
    expect(mockedFunction).toHaveBeenCalled();
  });

  it('should call onButtonClick function', () => {
    const { getByTestId } = render(
      <Promo
        header={promoHeader}
        buttonText={text}
        onButtonClick={mockedFunction}
      >
        {promoContent}
      </Promo>
    );

    fireEvent.click(getByTestId('button'));
    expect(mockedFunction).toHaveBeenCalled();
  });

  it('should call onLinkClick function', () => {
    const { getByTestId } = render(
      <Promo header={promoHeader} linkText={text} onLinkClick={mockedFunction}>
        {promoContent}
      </Promo>
    );

    fireEvent.click(getByTestId('link'));
    expect(mockedFunction).toHaveBeenCalled();
  });
});
