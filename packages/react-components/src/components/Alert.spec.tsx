import * as React from 'react';
import { render, fireEvent } from '../test-utils';
import { Alert, AlertSize, AlertType } from './Alert';

const customClass = 'my-css-class';
const bannerContent = 'This example content';
const mockedFunction = jest.fn();

describe('<Banner> component', () => {
  it('should allow for custom class', () => {
    const { container } = render(
      <Alert className={customClass}>{bannerContent}</Alert>
    );

    expect(container.firstChild).toHaveClass(customClass);
  });

  it('should render as info by default', () => {
    const { container } = render(<Alert>{bannerContent}</Alert>);

    expect(container.firstChild).toHaveClass('lc-alert--info');
  });

  it('should render as warning', () => {
    const { container } = render(
      <Alert type={AlertType.Warning}>{bannerContent}</Alert>
    );

    expect(container.firstChild).toHaveClass('lc-alert--warning');
  });

  it('should render as success', () => {
    const { container } = render(
      <Alert type={AlertType.Success}>{bannerContent}</Alert>
    );

    expect(container.firstChild).toHaveClass('lc-alert--success');
  });

  it('should render as error', () => {
    const { container } = render(
      <Alert type={AlertType.Error}>{bannerContent}</Alert>
    );

    expect(container.firstChild).toHaveClass('lc-alert--error');
  });

  it('should render as small by default', () => {
    const { container } = render(<Alert>{bannerContent}</Alert>);

    expect(container.firstChild).toHaveClass('lc-alert--small');
  });

  it('should render as medium', () => {
    const { container } = render(
      <Alert size={AlertSize.Medium}>{bannerContent}</Alert>
    );

    expect(container.firstChild).toHaveClass('lc-alert--medium');
  });

  it('should render as large', () => {
    const { container } = render(
      <Alert size={AlertSize.Large}>{bannerContent}</Alert>
    );

    expect(container.firstChild).toHaveClass('lc-alert--large');
  });

  it('should render with close icon', () => {
    const { getByTestId } = render(
      <Alert onClose={mockedFunction}>{bannerContent}</Alert>
    );

    expect(getByTestId('close')).toBeTruthy();
  });

  it('should call onClose function', () => {
    const { getByTestId } = render(
      <Alert onClose={mockedFunction}>{bannerContent}</Alert>
    );

    fireEvent.click(getByTestId('close'));
    expect(mockedFunction).toHaveBeenCalled();
  });
});
