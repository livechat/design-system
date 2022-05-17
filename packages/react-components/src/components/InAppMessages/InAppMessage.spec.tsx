import * as React from 'react';
import userEvent from '@testing-library/user-event';
import { render, vi } from 'test-utils';
import { InAppMessage } from './InAppMessage';

const baseClass = 'in-app-message';

describe('<InAppMessage> component', () => {
  it('should render as default and trigger onClose click', () => {
    const onClose = vi.fn();
    const { container, getByText, getByRole } = render(
      <InAppMessage onClose={onClose}>Example text</InAppMessage>
    );
    expect(container.firstChild).toBeVisible();
    expect(getByText('Example text')).toBeVisible();
    userEvent.click(getByRole('button'));
    expect(onClose).toBeCalled();
  });

  it('should call onClose when esc key is pressed', () => {
    const onClose = vi.fn();
    render(<InAppMessage onClose={onClose}>Example text</InAppMessage>);
    userEvent.keyboard('[Escape]');
    expect(onClose).toBeCalled();
  });

  it('should not call onClose when esc key is pressed when closeOnEscPress is disabled', () => {
    const onClose = vi.fn();
    render(
      <InAppMessage closeOnEscPress={false} onClose={onClose}>
        Example text
      </InAppMessage>
    );
    userEvent.keyboard('[Escape]');
    expect(onClose).not.toBeCalled();
  });

  it('should call onClose on overlay click', () => {
    const onClose = vi.fn();
    const { queryByTestId } = render(
      <InAppMessage closeOnEscPress={false} onClose={onClose}>
        Example text
      </InAppMessage>
    );
    const overlay = queryByTestId(`${baseClass}-overlay`);
    if (overlay) {
      userEvent.click(overlay);
    }
    expect(onClose).toBeCalled();
  });
});
