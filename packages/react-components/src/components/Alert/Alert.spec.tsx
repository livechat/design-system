import * as React from 'react';

import { render, fireEvent, vi, userEvent } from 'test-utils';

import { Alert, AlertProps } from './Alert';

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

  it('should render close button if onClose is defined and call onClose function on click', () => {
    const onClose = vi.fn();
    const { getByRole } = renderComponent({ onClose: onClose });
    const closeButton = getByRole('button', { name: 'Close alert' });

    expect(closeButton).toBeInTheDocument();
    fireEvent.click(closeButton);
    expect(onClose).toHaveBeenCalled();
  });

  it('should not render with close icon if no onClose function passed', () => {
    const { queryByRole } = renderComponent({});

    expect(
      queryByRole('button', { name: 'Close alert' })
    ).not.toBeInTheDocument();
  });

  it('should render with CTA buttons if primaryButton and secondaryButton are defined and call its handlers on click', () => {
    const primaryHandler = vi.fn();
    const secondaryHandler = vi.fn();
    const { getByRole } = renderComponent({
      primaryButton: {
        label: 'Primary',
        handleClick: primaryHandler,
      },
      secondaryButton: {
        label: 'Secondary',
        handleClick: secondaryHandler,
      },
    });

    const primary = getByRole('button', { name: 'Primary' });
    expect(primary).toBeInTheDocument();
    userEvent.click(primary);
    expect(primaryHandler).toHaveBeenCalled();

    const secondary = getByRole('button', { name: 'Secondary' });
    expect(secondary).toBeInTheDocument();
    userEvent.click(secondary);
    expect(secondaryHandler).toHaveBeenCalled();
  });
});
