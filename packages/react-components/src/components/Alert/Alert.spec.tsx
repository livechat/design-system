import * as React from 'react';
import { render, fireEvent, vi, userEvent } from 'test-utils';
import { Alert, AlertProps } from './Alert';

import styles from './Alert.module.scss';

const renderComponent = (props: AlertProps) => {
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

    expect(container.firstChild).toHaveClass(styles['alert--info']);
  });

  it('should render as warning', () => {
    const { container } = renderComponent({ kind: 'warning' });

    expect(container.firstChild).toHaveClass(styles['alert--warning']);
  });

  it('should render as success', () => {
    const { container } = renderComponent({ kind: 'success' });

    expect(container.firstChild).toHaveClass(styles['alert--success']);
  });

  it('should render as error', () => {
    const { container } = renderComponent({ kind: 'error' });

    expect(container.firstChild).toHaveClass(styles['alert--error']);
  });

  it('should render with close icon and call onClose function', () => {
    const mockedFunction = vi.fn();
    const { getByRole } = renderComponent({ onClose: mockedFunction });

    expect(getByRole('button')).toBeVisible();
    fireEvent.click(getByRole('button'));
    expect(mockedFunction).toHaveBeenCalled();
  });

  it('should not render with close icon if no onClose function passed', () => {
    const { queryByRole } = renderComponent({});

    expect(queryByRole('button')).toBeFalsy();
  });

  it('should render with CTA buttons and call handleClick function', () => {
    const mockedFunction = vi.fn();
    const { getByText } = renderComponent({
      primaryButton: {
        label: 'Primary',
        handleClick: () => mockedFunction('primary'),
      },
      secondaryButton: {
        label: 'Secondary',
        handleClick: () => mockedFunction('secondary'),
      },
    });

    const primary = getByText('Primary');
    expect(primary).toBeVisible();
    userEvent.click(primary);
    expect(mockedFunction).toHaveBeenCalledWith('primary');

    const secondary = getByText('Secondary');
    expect(secondary).toBeVisible();
    userEvent.click(secondary);
    expect(mockedFunction).toHaveBeenCalledWith('secondary');
  });
});
