import { vi } from 'vitest';

import { render, userEvent } from 'test-utils';

import { Popover } from './Popover';
import { IPopoverProps } from './types';

const triggerButtonId = 'popover-trigger-button';

const defaultProps = {
  triggerRenderer: <button>Open Popover</button>,
  children: 'Popover Content',
};

const renderComponent = (props: IPopoverProps) =>
  render(<Popover {...props} />);

describe('<Popover> component', () => {
  it('should allow for custom class', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      isVisible: true,
      className: 'custom-class',
    });

    expect(getByRole('dialog')).toHaveClass('custom-class');
  });

  it('should allow for custom class for trigger button', () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      triggerClassName: 'custom-trigger-class',
    });

    expect(getByTestId(triggerButtonId)).toHaveClass('custom-trigger-class');
  });

  it('renders the given element as trigger button', () => {
    const { getByRole } = renderComponent(defaultProps);

    expect(getByRole('button')).toBeInTheDocument();
  });

  it('should open the popover when user click the trigger button', () => {
    const { getByTestId, getByRole } = renderComponent(defaultProps);

    userEvent.click(getByTestId(triggerButtonId));
    expect(getByRole('dialog')).toBeInTheDocument();
    expect(getByRole('dialog')).toHaveTextContent('Popover Content');
  });

  it('should call onOpen when the popover is opened and onClose when popover is closed', () => {
    const onOpen = vi.fn();
    const onClose = vi.fn();
    const { getByTestId } = renderComponent({
      ...defaultProps,
      onOpen,
      onClose,
    });
    const triggerButton = getByTestId(triggerButtonId);

    userEvent.click(triggerButton);
    expect(onOpen).toHaveBeenCalledTimes(1);
    userEvent.click(triggerButton);
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it('closes the popover when Escape key is pressed', () => {
    const { queryByRole } = renderComponent({
      ...defaultProps,
      openedOnInit: true,
    });

    userEvent.keyboard('[Escape]');
    expect(queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should not close the popover when Escape key is pressed if closeOnEsc is set false', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      openedOnInit: true,
      closeOnEsc: false,
    });
    const popover = getByRole('dialog');

    expect(popover).toBeInTheDocument();
    userEvent.keyboard('[Escape]');
    expect(popover).toBeInTheDocument();
  });

  it('should keep open when isVisible is set true (controlled mode)', () => {
    const { getByRole } = renderComponent({ ...defaultProps, isVisible: true });
    const popover = getByRole('dialog');

    expect(popover).toBeInTheDocument();
    userEvent.keyboard('[Escape]');
    expect(popover).toBeInTheDocument();
  });

  it('should keep close when isVisible is set false (controlled mode)', () => {
    const { queryByRole, getByTestId } = renderComponent({
      ...defaultProps,
      isVisible: false,
    });
    const popover = queryByRole('dialog');

    expect(popover).not.toBeInTheDocument();
    userEvent.click(getByTestId(triggerButtonId));
    expect(popover).not.toBeInTheDocument();
  });
});
