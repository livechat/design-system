import userEvent from '@testing-library/user-event';

import { render, vi } from 'test-utils';

import { ModalBase, ModalBaseProps } from './ModalBase';

const renderComponent = (props: ModalBaseProps) =>
  render(<ModalBase {...props}>Modal base</ModalBase>);

describe('<ModalBase> component', () => {
  it('should allow for custom class', () => {
    const onClose = vi.fn();
    const { getByRole } = renderComponent({
      onClose,
      className: 'my-css-class',
    });

    expect(getByRole('dialog')).toHaveClass('my-css-class');
  });

  it('should call onClose method on overlay click', () => {
    const onClose = vi.fn();
    const { getByTestId } = renderComponent({ onClose });

    userEvent.click(getByTestId('lc-modal-overlay'));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should call onClose on escape button pressed by default', () => {
    const onClose = vi.fn();
    renderComponent({ onClose });

    userEvent.keyboard('[Escape]');
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('should not call onClose on escape button pressed when closeOnEscPress is disabled', () => {
    const onClose = vi.fn();
    renderComponent({ onClose, closeOnEscPress: false });

    userEvent.keyboard('[Escape]');
    expect(onClose).not.toHaveBeenCalled();
  });

  it('should not call onClose on overlay pressed when closeOnOverlayPress is disabled', () => {
    const onClose = vi.fn();
    const { getByTestId } = renderComponent({
      onClose,
      closeOnOverlayPress: false,
    });

    userEvent.click(getByTestId('lc-modal-overlay'));
    expect(onClose).not.toHaveBeenCalled();
  });
});
