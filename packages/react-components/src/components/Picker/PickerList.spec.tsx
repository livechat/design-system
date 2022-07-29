import * as React from 'react';
import { render, vi } from 'test-utils';
import userEvent from '@testing-library/user-event';
import noop from '../../utils/noop';
import { IPickerListProps, PickerList } from './PickerList';
import { defaultOptions } from './constants';

// eslint-disable-next-line @typescript-eslint/no-empty-function
window.HTMLElement.prototype.scrollIntoView = () => {};

const defaultProps = {
  isOpen: false,
  items: defaultOptions,
  selectedItemsKeys: null,
  onClose: () => noop,
  onSelect: () => noop,
  onSelectAll: () => noop,
};

const renderComponent = (props: IPickerListProps) => {
  return render(<PickerList {...props} />);
};

describe('<PickerList> component', () => {
  it('should not render PickerList if not isOpen', () => {
    const { container } = renderComponent(defaultProps);

    expect(container.firstChild).toBeNull();
  });

  it('should render PickerList if isOpen', () => {
    const { container } = renderComponent({
      ...defaultProps,
      isOpen: true,
    });

    expect(container.firstChild).toBeVisible();
  });

  it('should call onSelect when list item clicked', () => {
    const onSelect = vi.fn();
    const { getByText } = renderComponent({
      ...defaultProps,
      isOpen: true,
      onSelect,
    });

    userEvent.click(getByText('Option three'));
    expect(onSelect).toHaveBeenCalledWith({
      key: 'three',
      name: 'Option three',
    });
  });

  it('should mark selected list item as selected', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      isOpen: true,
      selectedItemsKeys: ['three'],
    });

    expect(getByText('Option three')).toHaveAttribute('aria-selected', 'true');
  });

  it('should mark selected list item as disabled', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      isOpen: true,
      items: [{ key: 'three', name: 'Option three', disabled: true }],
    });

    expect(getByText('Option three')).toHaveAttribute('aria-disabled', 'true');
  });

  it('should display default empty state if no filter result', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      isOpen: true,
      items: [],
    });

    expect(getByText('No results found')).toBeVisible();
  });

  it('should display custom empty state if no filter result', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      isOpen: true,
      items: [],
      emptyStateText: 'Custom empty state',
    });

    expect(getByText('Custom empty state')).toBeVisible();
  });
});
