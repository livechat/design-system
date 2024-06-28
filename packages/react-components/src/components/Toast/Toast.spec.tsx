import { render, vi, userEvent } from 'test-utils';

import { ToastProps, Toast } from './Toast';

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

  it('should render with action button and call action function on user click', () => {
    const onClick = vi.fn();
    const { getByText } = renderComponent({
      action: {
        label: 'Example action',
        onClick,
      },
    });
    const button = getByText('Example action');

    expect(button).toBeInTheDocument();
    userEvent.click(button);
    expect(onClick).toHaveBeenCalled();
  });

  it('should call action function with onClose function after user clicks the button', () => {
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

    userEvent.click(getByText('Example action'));
    expect(onClick).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it('should render with close button and call onClose function on user click', () => {
    const onClose = vi.fn();
    const { getByLabelText } = renderComponent({
      removable: true,
      onClose,
    });
    const closeButton = getByLabelText('Close toast');

    expect(closeButton).toBeInTheDocument();
    userEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });
});
