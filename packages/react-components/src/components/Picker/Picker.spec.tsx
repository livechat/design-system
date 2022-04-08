import * as React from 'react';
import { render, fireEvent, vi } from 'test-utils';
import noop from '../../utils/noop';
import { IPickerProps, Picker } from './Picker';

const defaultProps = {
  options: [
    { key: 'one', name: 'Option one' },
    { key: 'two', name: 'Option two' },
    { key: 'three', name: 'Option three' },
    { key: 'four', name: 'Option four' },
    { key: 'five', name: 'Option five' },
    { key: 'six', name: 'Option six' },
    { key: 'seven', name: 'Option seven' },
  ],
  onSelect: () => noop,
};

const renderComponent = (props: IPickerProps) => {
  return render(<Picker {...props} />);
};

describe('<Picker> component', () => {
  it('should render label if is set', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      label: 'Example label',
    });

    expect(getByText('Example label')).toBeVisible();
  });

  it('should render error if is set', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      error: 'Example error',
    });

    expect(getByText('Example error')).toBeVisible();
  });

  it('should call onSelect with selected item', () => {
    const onSelect = vi.fn();
    const { getByText } = renderComponent({
      ...defaultProps,
      onSelect,
    });

    fireEvent.click(getByText('Select option'));
    fireEvent.click(getByText('Option three'));
    expect(onSelect).toHaveBeenCalledWith({
      key: 'three',
      name: 'Option three',
    });
  });

  it('should call onSelect with null after clearing the selection', () => {
    const onSelect = vi.fn();
    const { getByText, getByTestId } = renderComponent({
      ...defaultProps,
      onSelect,
    });

    fireEvent.click(getByText('Select option'));
    fireEvent.click(getByText('Option three'));
    expect(onSelect).toHaveBeenCalledWith({
      key: 'three',
      name: 'Option three',
    });
    fireEvent.click(getByTestId('picker-trigger__clear-icon'));
    expect(onSelect).toHaveBeenCalledWith(null);
  });
});
