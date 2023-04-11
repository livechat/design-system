import userEvent from '@testing-library/user-event';
import { render, vi } from 'test-utils';
import { ModalBase } from './ModalBase';

describe('<ModalBase /> component', () => {
  it('should allow for custom class', () => {
    const onClose = vi.fn();
    const { getByRole } = render(
      <ModalBase onClose={onClose} className="my-css-class">
        test
      </ModalBase>
    );
    expect(getByRole('dialog')).toHaveClass('my-css-class');
  });

  it('should call onClose method on overlay click', () => {
    const onClose = vi.fn();
    const { getByTestId } = render(
      <ModalBase onClose={onClose}>test</ModalBase>
    );

    userEvent.click(getByTestId('lc-modal-overlay'));
    expect(onClose).toBeCalledTimes(1);
  });

  it('should call onClose on escape button pressed by default', () => {
    const onClose = vi.fn();
    render(<ModalBase onClose={onClose}>test</ModalBase>);

    userEvent.keyboard('[Escape]');
    expect(onClose).toBeCalledTimes(1);
  });

  it('should not call onClose on escape button pressed when closeOnEscPress is disabled', () => {
    const onClose = vi.fn();
    render(
      <ModalBase onClose={onClose} closeOnEscPress={false}>
        test
      </ModalBase>
    );

    userEvent.keyboard('[Escape]');
    expect(onClose).not.toBeCalled();
  });

  it('should not call onClose on overlay pressed when closeOnOverlayPress is disabled', () => {
    const onClose = vi.fn();
    const { getByTestId } = render(
      <ModalBase onClose={onClose} closeOnOverlayPress={false}>
        test
      </ModalBase>
    );

    userEvent.click(getByTestId('lc-modal-overlay'));
    expect(onClose).not.toBeCalled();
  });
});
