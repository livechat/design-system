import * as React from 'react';
import { render, fireEvent, vi } from 'test-utils';
import noop from '../../utils/noop';
import { IPickerListProps, PickerList } from './PickerList';
import styles from './PickerList.module.scss';

const baseClass = 'picker-list';
const itemClassName = `${baseClass}__item`;

const defaultProps = {
  isOpen: false,
  items: [
    { key: 'one', name: 'Option one' },
    { key: 'two', name: 'Option two' },
    { key: 'three', name: 'Option three' },
    { key: 'four', name: 'Option four' },
    { key: 'five', name: 'Option five' },
    { key: 'six', name: 'Option six' },
    { key: 'seven', name: 'Option seven' },
  ],
  selectedItem: null,
  onClose: () => noop,
  onSelect: () => noop,
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

    fireEvent.click(getByText('Option three'));
    expect(onSelect).toHaveBeenCalledWith({
      key: 'three',
      name: 'Option three',
    });
  });

  it('should mark selected list item as selected', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      isOpen: true,
      selectedItem: { key: 'three', name: 'Option three' },
    });

    expect(getByText('Option three')).toHaveClass(
      styles[`${itemClassName}--selected`]
    );
  });

  it('should mark selected list item as disabled', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      isOpen: true,
      items: [{ key: 'three', name: 'Option three', disabled: true }],
    });

    expect(getByText('Option three')).toHaveClass(
      styles[`${itemClassName}--disabled`]
    );
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
