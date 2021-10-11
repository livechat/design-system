import * as React from 'react';
import { render, fireEvent } from '../test-utils';
import { Alert, AlertSize, AlertType, IAlertProps } from './Alert';

const renderComponent = (props: IAlertProps) => {
  return render(
    <Alert {...props} className="my-css-class">
      This example content
    </Alert>
  );
};

describe('<Alert> component', () => {
  it('should allow for custom class', () => {
    const { container } = renderComponent({});

    expect(container.firstChild).toHaveClass('my-css-class');
  });

  it('should render as info by default', () => {
    const { container } = renderComponent({});

    expect(container.firstChild).toHaveClass('lc-alert--info');
  });

  it('should render as warning', () => {
    const { container } = renderComponent({ type: AlertType.Warning });

    expect(container.firstChild).toHaveClass('lc-alert--warning');
  });

  it('should render as success', () => {
    const { container } = renderComponent({ type: AlertType.Success });

    expect(container.firstChild).toHaveClass('lc-alert--success');
  });

  it('should render as error', () => {
    const { container } = renderComponent({ type: AlertType.Error });

    expect(container.firstChild).toHaveClass('lc-alert--error');
  });

  it('should render as small by default', () => {
    const { container } = renderComponent({});

    expect(container.firstChild).toHaveClass('lc-alert--small');
  });

  it('should render as medium', () => {
    const { container } = renderComponent({ size: AlertSize.Medium });

    expect(container.firstChild).toHaveClass('lc-alert--medium');
  });

  it('should render as large', () => {
    const { container } = renderComponent({ size: AlertSize.Large });

    expect(container.firstChild).toHaveClass('lc-alert--large');
  });

  it('should render with close icon and call onClose function', () => {
    const mockedFunction = jest.fn();
    const { getByRole } = renderComponent({ onClose: mockedFunction });

    expect(getByRole('button')).toBeVisible();
    fireEvent.click(getByRole('button'));
    expect(mockedFunction).toHaveBeenCalled();
  });

  it('should not render with close icon if no onClose function passed', () => {
    const { queryByRole } = renderComponent({});

    expect(queryByRole('button')).toBeFalsy();
  });
});
