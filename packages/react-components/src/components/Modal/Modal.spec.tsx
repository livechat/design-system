import userEvent from '@testing-library/user-event';

import { render, vi } from 'test-utils';

import { Modal } from './Modal';

describe('<Modal /> component', () => {
  it('should allow for custom class', () => {
    const onClose = vi.fn();
    const { getByRole } = render(
      <Modal onClose={onClose} className="my-css-class">
        test
      </Modal>
    );
    expect(getByRole('dialog')).toHaveClass('my-css-class');
  });

  it('should call onClose method on close modal button press', () => {
    const onClose = vi.fn();
    const { getByRole } = render(
      <Modal heading="Header" onClose={onClose}>
        test
      </Modal>
    );

    userEvent.click(getByRole('button'));
    expect(onClose).toBeCalledTimes(1);
  });
});
