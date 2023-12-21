import * as React from 'react';

import { vi } from 'vitest';

import { render, fireEvent } from 'test-utils';

import { Popover } from './Popover';

const triggerButtonId = 'popover-trigger-button';

describe('<Popover> component', () => {
  const props = {
    triggerRenderer: <button>Open Popover</button>,
    onClose: vi.fn(),
    onOpen: vi.fn(),
    children: 'Popover Content',
  };

  it('renders the trigger button', () => {
    const { getByTestId } = render(<Popover {...props} />);
    const triggerButton = getByTestId(triggerButtonId);
    expect(triggerButton).toBeInTheDocument();
  });

  it('opens the popover when the trigger button is clicked', () => {
    const { getByTestId, getByText } = render(<Popover {...props} />);
    const triggerButton = getByTestId(triggerButtonId);
    fireEvent.click(triggerButton);
    const popoverContent = getByText('Popover Content');
    expect(popoverContent).toBeInTheDocument();
  });

  it('calls onOpen when the popover is opened', () => {
    const { getByTestId } = render(<Popover {...props} />);
    const triggerButton = getByTestId(triggerButtonId);
    fireEvent.click(triggerButton);
    expect(props.onOpen).toHaveBeenCalled();
  });

  it('calls onClose when the popover is closed', () => {
    const { getByTestId } = render(<Popover {...props} openedOnInit={true} />);
    const triggerButton = getByTestId(triggerButtonId);
    fireEvent.click(triggerButton);
    expect(props.onClose).toHaveBeenCalled();
  });

  it('closes the popover when Escape key is pressed', () => {
    const { queryByText } = render(<Popover {...props} openedOnInit={true} />);
    fireEvent.keyDown(document, { key: 'Escape' });
    const popoverContent = queryByText('Popover Content');
    expect(popoverContent).not.toBeInTheDocument();
  });

  it('does not close the popover when Escape key is pressed if closeOnEsc is false', () => {
    const { getByText } = render(
      <Popover {...props} openedOnInit={true} closeOnEsc={false} />
    );
    fireEvent.keyDown(document, { key: 'Escape' });
    const popoverContent = getByText('Popover Content');
    expect(popoverContent).toBeInTheDocument();
  });

  it('renders the popover as open when isVisible prop is true', () => {
    const { getByText } = render(<Popover {...props} isVisible={true} />);
    const popoverContent = getByText('Popover Content');
    expect(popoverContent).toBeInTheDocument();
  });

  it('renders the popover as closed when isVisible prop is false', () => {
    const { queryByText } = render(<Popover {...props} isVisible={false} />);
    const popoverContent = queryByText('Popover Content');
    expect(popoverContent).not.toBeInTheDocument();
  });
});
