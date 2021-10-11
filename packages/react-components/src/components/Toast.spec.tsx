import * as React from 'react';
import { render, fireEvent } from '../test-utils';
import { IToastProps, Toast, Variants } from './Toast';

const renderComponent = (props: IToastProps) => {
  return render(
    <Toast {...props} className="my-css-class">
      This example content
    </Toast>
  );
};

describe('<Toast> component', () => {
  it('should allow for custom class', () => {
    const { container } = renderComponent({});

    expect(container.firstChild).toHaveClass('my-css-class');
  });

  it('should render as info by default', () => {
    const { container } = renderComponent({});

    expect(container.firstChild).toHaveClass('lc-toast--info');
  });

  it('should render as success', () => {
    const { container } = renderComponent({ variant: Variants.Success });

    expect(container.firstChild).toHaveClass('lc-toast--success');
  });

  it('should render as warning', () => {
    const { container } = renderComponent({ variant: Variants.Warning });

    expect(container.firstChild).toHaveClass('lc-toast--warning');
  });

  it('should render as error', () => {
    const { container } = renderComponent({ variant: Variants.Error });

    expect(container.firstChild).toHaveClass('lc-toast--error');
  });

  it('should render as notification', () => {
    const { container } = renderComponent({ variant: Variants.Notification });

    expect(container.firstChild).toHaveClass('lc-toast--notification');
  });

  it('should render with action button and call action function', () => {
    const mockedFunction = jest.fn();
    const { getByText } = renderComponent({
      action: {
        label: 'Example action',
        handler: mockedFunction,
      },
    });

    expect(getByText('Example action')).toBeVisible();
    fireEvent.click(getByText('Example action'));
    expect(mockedFunction).toHaveBeenCalled();
  });

  it('should call action function with onClose function', () => {
    const mockedFunction = jest.fn();
    const mockedFunctionOnClose = jest.fn();
    const { getByText } = renderComponent({
      action: {
        label: 'Example action',
        handler: mockedFunction,
        closeOnClick: true,
      },
      onClose: mockedFunctionOnClose,
    });

    fireEvent.click(getByText('Example action'));
    expect(mockedFunction).toHaveBeenCalled();
    expect(mockedFunctionOnClose).toHaveBeenCalled();
  });

  it('should render with close button and call onClose function', () => {
    const mockedFunction = jest.fn();
    const { getByLabelText } = renderComponent({
      removable: true,
      onClose: mockedFunction,
    });

    expect(getByLabelText('Close toast')).toBeVisible();
    fireEvent.click(getByLabelText('Close toast'));
    expect(mockedFunction).toHaveBeenCalled();
  });
});
