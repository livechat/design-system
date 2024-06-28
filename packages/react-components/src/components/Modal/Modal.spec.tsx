import { ComponentProps } from 'react';

import userEvent from '@testing-library/user-event';

import { render, vi } from 'test-utils';

import { Modal } from './Modal';

const renderComponent = (props: ComponentProps<typeof Modal>) =>
  render(<Modal {...props}>Modal content</Modal>);

describe('<Modal> component', () => {
  it('should allow for custom class', () => {
    const onClose = vi.fn();
    const { getByRole } = renderComponent({
      className: 'my-css-class',
      onClose,
    });

    expect(getByRole('dialog')).toHaveClass('my-css-class');
  });

  it('should display content', () => {
    const onClose = vi.fn();
    const { getByText } = renderComponent({ onClose });

    expect(getByText('Modal content')).toBeInTheDocument();
  });

  it('should display header if provided', () => {
    const onClose = vi.fn();
    const { getByText } = renderComponent({ heading: 'Header', onClose });

    expect(getByText('Header')).toBeInTheDocument();
  });

  it('should display label heading if provided', () => {
    const onClose = vi.fn();
    const { getByText } = renderComponent({ labelHeading: 'Header', onClose });

    expect(getByText('Header')).toBeInTheDocument();
  });

  it('should display modal close button if heading is provided and call onClose method on close button press', () => {
    const onClose = vi.fn();
    const { getByRole } = renderComponent({ heading: 'Header', onClose });
    const closeButton = getByRole('button');

    expect(closeButton).toBeInTheDocument();
    userEvent.click(closeButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose method after modal overlay click', () => {
    const onClose = vi.fn();
    const { getByTestId } = renderComponent({ onClose });

    userEvent.click(getByTestId('lc-modal-overlay'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose method after modal overlay click', () => {
    const onClose = vi.fn();
    const { getByText } = renderComponent({ footer: 'Footer', onClose });

    expect(getByText('Footer')).toBeInTheDocument();
  });

  it('should pass the custom class name for modal body if provided', () => {
    const onClose = vi.fn();
    const { getByTestId } = renderComponent({
      contentClassName: 'content-class-name',
      onClose,
    });

    expect(getByTestId('modal-body')).toHaveClass('content-class-name');
  });
});
