import * as React from 'react';
import userEvent from '@testing-library/user-event';
import { render, vi } from 'test-utils';
import { ModalBase } from './ModalBase';

describe('<ModalBase /> component', () => {
  it('should allow for custom class', () => {
    const onClose = vi.fn();
    const { container } = render(
      <ModalBase onClose={onClose} className="my-css-class">
        test
      </ModalBase>
    );
    expect(container.firstChild?.firstChild).toHaveClass('my-css-class');
  });

  it('should call onClose method on overlay click', () => {
    const onClose = vi.fn();
    const { queryByTestId } = render(
      <ModalBase onClose={onClose}>test</ModalBase>
    );

    const overlay = queryByTestId('lc-modal-overlay');

    if (overlay) {
      userEvent.click(overlay);
    }
    expect(onClose).toBeCalledTimes(1);
  });

  it('should call onClose method on close modal button press', () => {
    const onClose = vi.fn();
    const { getByRole } = render(<ModalBase onClose={onClose}>test</ModalBase>);

    userEvent.click(getByRole('button'));
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
});
