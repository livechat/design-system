import * as React from 'react';
import { render, fireEvent } from '../test-utils';
import { Banner, BannerSize, BannerType } from './Banner';

const customClass = 'my-css-class';
const bannerContent = 'This example content';
const mockedFunction = jest.fn();

describe('<Banner> component', () => {
  it('should allow for custom class', () => {
    const { container } = render(
      <Banner className={customClass}>{bannerContent}</Banner>
    );

    expect(container.firstChild).toHaveClass(customClass);
  });

  it('should render as info by default', () => {
    const { container } = render(<Banner>{bannerContent}</Banner>);

    expect(container.firstChild).toHaveClass('lc-banner--info');
  });

  it('should render as warning', () => {
    const { container } = render(
      <Banner type={BannerType.Warning}>{bannerContent}</Banner>
    );

    expect(container.firstChild).toHaveClass('lc-banner--warning');
  });

  it('should render as success', () => {
    const { container } = render(
      <Banner type={BannerType.Success}>{bannerContent}</Banner>
    );

    expect(container.firstChild).toHaveClass('lc-banner--success');
  });

  it('should render as error', () => {
    const { container } = render(
      <Banner type={BannerType.Error}>{bannerContent}</Banner>
    );

    expect(container.firstChild).toHaveClass('lc-banner--error');
  });

  it('should render as small by default', () => {
    const { container } = render(<Banner>{bannerContent}</Banner>);

    expect(container.firstChild).toHaveClass('lc-banner--small');
  });

  it('should render as medium', () => {
    const { container } = render(
      <Banner size={BannerSize.Medium}>{bannerContent}</Banner>
    );

    expect(container.firstChild).toHaveClass('lc-banner--medium');
  });

  it('should render as large', () => {
    const { container } = render(
      <Banner size={BannerSize.Large}>{bannerContent}</Banner>
    );

    expect(container.firstChild).toHaveClass('lc-banner--large');
  });

  it('should render with close icon', () => {
    const { getByTestId } = render(
      <Banner onClose={mockedFunction}>{bannerContent}</Banner>
    );

    expect(getByTestId('close')).toBeTruthy();
  });

  it('should call onClose function', () => {
    const { getByTestId } = render(
      <Banner onClose={mockedFunction}>{bannerContent}</Banner>
    );

    fireEvent.click(getByTestId('close'));
    expect(mockedFunction).toHaveBeenCalled();
  });
});
