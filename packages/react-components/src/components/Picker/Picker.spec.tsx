import * as React from 'react';
import { render, vi } from 'test-utils';
import userEvent from '@testing-library/user-event';
import noop from '../../utils/noop';
import { IPickerProps, Picker } from './Picker';

// eslint-disable-next-line @typescript-eslint/no-empty-function
window.HTMLElement.prototype.scrollIntoView = () => {};

const defaultOptions = [
  { key: 'one', name: 'Option one' },
  { key: 'two', name: 'Option two' },
  { key: 'three', name: 'Option three' },
  { key: 'four', name: 'Option four' },
  { key: 'five', name: 'Option five' },
  { key: 'six', name: 'Option six' },
  { key: 'seven', name: 'Option seven' },
];
const defaultProps = {
  options: defaultOptions,
  onSelect: () => noop,
};

const renderComponent = (props: IPickerProps) => {
  return render(<Picker {...props} className="my-css-class" />);
};

describe('<Picker> component', () => {
  it('should allow for custom class', () => {
    const { container } = renderComponent({ ...defaultProps });

    expect(container.firstChild).toHaveClass('my-css-class');
  });

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

    userEvent.click(getByText('Select option'));
    userEvent.click(getByText('Option three'));
    expect(onSelect).toHaveBeenCalledWith([
      {
        key: 'three',
        name: 'Option three',
      },
    ]);
  });

  it('should call onSelect with null after clearing the selection', () => {
    const onSelect = vi.fn();
    const { getByText, getByTestId } = renderComponent({
      ...defaultProps,
      onSelect,
    });

    userEvent.click(getByText('Select option'));
    userEvent.click(getByText('Option three'));
    expect(onSelect).toHaveBeenCalledWith([
      {
        key: 'three',
        name: 'Option three',
      },
    ]);
    userEvent.click(getByTestId('picker-trigger__clear-icon'));
    expect(onSelect).toHaveBeenCalledWith(null);
  });

  it('should call onSelect with all elements in multiselect mode if "Select all" option is chosen', () => {
    const onSelect = vi.fn();
    const { getByText } = renderComponent({
      ...defaultProps,
      multiselect: true,
      onSelect,
    });

    userEvent.click(getByText('Select option'));
    userEvent.click(getByText('Select all'));
    expect(onSelect).toHaveBeenCalledWith(defaultOptions);
  });

  it('should render given placeholder text if no item selected', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      placeholder: 'Example placeholder',
    });

    expect(getByText('Example placeholder')).toBeVisible();
  });
});
