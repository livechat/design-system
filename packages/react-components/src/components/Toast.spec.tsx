import * as React from 'react';
import { render, fireEvent } from '../test-utils';
import { Toast, Variants } from './Toast';

const customClass = 'my-css-class';
const toastContent = 'This example content';
const mockedFunction = jest.fn();
const mockedFunctionOnClose = jest.fn();
const toastAction = {
  label: 'Example action',
  handler: mockedFunction,
};

describe('<Banner> component', () => {
  it('should allow for custom class', () => {
    const { container } = render(
      <Toast className={customClass}>{toastContent}</Toast>
    );

    expect(container.firstChild).toHaveClass(customClass);
  });

  it('should render as info by default', () => {
    const { container } = render(<Toast>{toastContent}</Toast>);

    expect(container.firstChild).toHaveClass('lc-toast--info');
  });

  it('should render as success', () => {
    const { container } = render(
      <Toast variant={Variants.Success}>{toastContent}</Toast>
    );

    expect(container.firstChild).toHaveClass('lc-toast--success');
  });

  it('should render as warning', () => {
    const { container } = render(
      <Toast variant={Variants.Warning}>{toastContent}</Toast>
    );

    expect(container.firstChild).toHaveClass('lc-toast--warning');
  });

  it('should render as error', () => {
    const { container } = render(
      <Toast variant={Variants.Error}>{toastContent}</Toast>
    );

    expect(container.firstChild).toHaveClass('lc-toast--error');
  });

  it('should render as notification', () => {
    const { container } = render(
      <Toast variant={Variants.Notification}>{toastContent}</Toast>
    );

    expect(container.firstChild).toHaveClass('lc-toast--notification');
  });

  it('should render with action button', () => {
    const { getByTestId } = render(
      <Toast action={toastAction}>{toastContent}</Toast>
    );

    expect(getByTestId('actionButton')).toBeTruthy();
  });

  it('should call action function', () => {
    const { getByTestId } = render(
      <Toast action={toastAction}>{toastContent}</Toast>
    );

    fireEvent.click(getByTestId('actionButton'));
    expect(mockedFunction).toHaveBeenCalled();
  });

  it('should call action function with onClose function', () => {
    const { getByTestId } = render(
      <Toast
        action={{ ...toastAction, closeOnClick: true }}
        onClose={mockedFunctionOnClose}
      >
        {toastContent}
      </Toast>
    );

    fireEvent.click(getByTestId('actionButton'));
    expect(mockedFunction).toHaveBeenCalled();
    expect(mockedFunctionOnClose).toHaveBeenCalled();
  });

  it('should render with close button', () => {
    const { getByTestId } = render(
      <Toast removable={true} onClose={mockedFunctionOnClose}>
        {toastContent}
      </Toast>
    );

    expect(getByTestId('closeButton')).toBeTruthy();
  });

  it('should call onClose function', () => {
    const { getByTestId } = render(
      <Toast removable={true} onClose={mockedFunctionOnClose}>
        {toastContent}
      </Toast>
    );

    fireEvent.click(getByTestId('closeButton'));
    expect(mockedFunctionOnClose).toHaveBeenCalled();
  });
});
