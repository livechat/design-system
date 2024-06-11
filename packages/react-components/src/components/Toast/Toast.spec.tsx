import { render, fireEvent, vi } from 'test-utils';

import { ToastProps, Toast } from './Toast';

import styles from './Toast.module.scss';

const renderComponent = (props: ToastProps) => {
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

    expect(container.firstChild).toHaveClass(styles['toast--info']);
  });

  it('should render as success', () => {
    const { container } = renderComponent({ kind: 'success' });

    expect(container.firstChild).toHaveClass(styles['toast--success']);
  });

  it('should render as warning', () => {
    const { container } = renderComponent({ kind: 'warning' });

    expect(container.firstChild).toHaveClass(styles['toast--warning']);
  });

  it('should render as error', () => {
    const { container } = renderComponent({ kind: 'error' });

    expect(container.firstChild).toHaveClass(styles['toast--error']);
  });

  it('should render with action button and call action function', () => {
    const onClick = vi.fn();
    const { getByText } = renderComponent({
      action: {
        label: 'Example action',
        onClick,
      },
    });

    expect(getByText('Example action')).toBeVisible();
    fireEvent.click(getByText('Example action'));
    expect(onClick).toHaveBeenCalled();
  });

  it('should call action function with onClose function', () => {
    const onClick = vi.fn();
    const onClose = vi.fn();
    const { getByText } = renderComponent({
      action: {
        label: 'Example action',
        onClick,
        closesOnClick: true,
      },
      onClose,
    });

    fireEvent.click(getByText('Example action'));
    expect(onClick).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('should render with close button and call onClose function', () => {
    const onClose = vi.fn();
    const { getByLabelText } = renderComponent({
      removable: true,
      onClose,
    });

    expect(getByLabelText('Close toast')).toBeVisible();
    fireEvent.click(getByLabelText('Close toast'));
    expect(onClose).toHaveBeenCalled();
  });
});
