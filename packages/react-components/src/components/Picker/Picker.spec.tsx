import { render, vi } from 'test-utils';
import userEvent from '@testing-library/user-event';
import noop from '../../utils/noop';
import { IPickerProps, Picker, PickerType } from './Picker';
import { defaultPickerOptions } from './constants';

// eslint-disable-next-line @typescript-eslint/no-empty-function
window.HTMLElement.prototype.scrollIntoView = () => {};

const defaultProps = {
  options: defaultPickerOptions,
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
    const { getByTestId } = renderComponent({
      ...defaultProps,
      selected: [{ key: 'three', name: 'Option three' }],
      onSelect,
    });

    userEvent.click(getByTestId('picker-trigger__clear-icon'));
    expect(onSelect).toHaveBeenCalledWith(null);
  });

  it('should call onSelect includes the currently selected options in multiselect mode', () => {
    const onSelect = vi.fn();
    const stepOneState = [{ key: 'two', name: 'Option two' }];
    const stepTwoState = [
      { key: 'two', name: 'Option two' },
      { key: 'four', name: 'Option four' },
    ];
    const stepThreeState = [
      { key: 'two', name: 'Option two' },
      { key: 'four', name: 'Option four' },
      { key: 'seven', name: 'Option seven' },
    ];
    const props = {
      ...defaultProps,
      type: 'multi' as PickerType,
      onSelect,
    };
    const { getByText, rerender } = renderComponent(props);

    userEvent.click(getByText('Select option'));
    userEvent.click(getByText('Option two'));
    expect(onSelect).toHaveBeenCalledWith(stepOneState);

    rerender(<Picker {...props} selected={stepOneState} />);

    userEvent.click(getByText('Option four'));
    expect(onSelect).toHaveBeenCalledWith(stepTwoState);

    rerender(<Picker {...props} selected={stepTwoState} />);

    userEvent.click(getByText('Option seven'));
    expect(onSelect).toHaveBeenCalledWith(stepThreeState);
  });

  it('should call onSelect with all correct elements in multiselect mode if "Select all" option is chosen', () => {
    const onSelect = vi.fn();
    const expectedResult = [
      { key: 'one', name: 'Option one' },
      { key: 'three', name: 'Option three' },
      { key: 'five', name: 'Option five' },
    ];
    const { getByText } = renderComponent({
      ...defaultProps,
      options: [
        { key: 'groupA', name: 'Group A title header', groupHeader: true },
        { key: 'one', name: 'Option one' },
        { key: 'two', name: 'Option two', disabled: true },
        { key: 'three', name: 'Option three' },
        { key: 'groupB', name: 'Group B title header', groupHeader: true },
        { key: 'four', name: 'Option four', disabled: true },
        { key: 'five', name: 'Option five' },
      ],
      type: 'multi',
      onSelect,
      selectAllOptionText: 'Select all',
    });

    userEvent.click(getByText('Select option'));
    userEvent.click(getByText('Select all'));
    expect(onSelect).toHaveBeenCalledWith(expectedResult);
  });

  it('should render given placeholder text if no item selected', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      placeholder: 'Example placeholder',
    });

    expect(getByText('Example placeholder')).toBeVisible();
  });

  it('should render selected option if selectedOption is provided', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      selected: [{ key: 'three', name: 'Option three' }],
    });

    expect(getByText('Option three')).toBeVisible();
  });
});
