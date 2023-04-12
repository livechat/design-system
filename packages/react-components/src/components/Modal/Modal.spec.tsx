import userEvent from '@testing-library/user-event';
import { render, vi } from 'test-utils';
import { Modal } from './Modal';
import styles from './Modal.module.scss';

const baseClass = 'modal';

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
    const { getByRole } = render(<Modal onClose={onClose}>test</Modal>);

    userEvent.click(getByRole('button'));
    expect(onClose).toBeCalledTimes(1);
  });

  it('should display full space content if prop is given', () => {
    const onClose = vi.fn();
    const { getByTestId } = render(
      <Modal onClose={onClose} fullSpaceContent>
        test
      </Modal>
    );

    expect(getByTestId('modal-body')).toHaveClass(
      styles[`${baseClass}__body--full-space`]
    );
  });
});
