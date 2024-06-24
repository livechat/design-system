import userEvent from '@testing-library/user-event';
import { VirtuosoProps } from 'react-virtuoso';
import { vitest } from 'vitest';

import { render, vi } from 'test-utils';

import noop from '../../utils/noop';

import { DEFAULT_PICKER_OPTIONS } from './constants';
import { Picker } from './Picker';
import { PickerType, IPickerProps } from './types';

window.HTMLElement.prototype.scrollIntoView = () => {};

const defaultProps = {
  options: DEFAULT_PICKER_OPTIONS,
  onSelect: noop,
};

vitest.mock('react-virtuoso', () => {
  function Virtuoso(props: VirtuosoProps<unknown, unknown>) {
    return (
      <>
        {props.data?.map(
          (value, index) => props.itemContent?.(index, value, undefined)
        )}
      </>
    );
  }

  // eslint-disable-next-line @typescript-eslint/no-misused-promises
  return { ...vitest.importActual('react-virtuoso'), Virtuoso };
});

const renderComponent = (props: IPickerProps) => render(<Picker {...props} />);

describe('<Picker> component', () => {
  it('should allow for custom class', () => {
    const { container } = renderComponent({
      ...defaultProps,
      className: 'my-css-class',
    });

    expect(container.firstChild).toHaveClass('my-css-class');
  });

  it('should allow for custom class for picker list', () => {
    const { getByText, getByTestId } = renderComponent({
      ...defaultProps,
      listClassName: 'my-css-class',
    });

    userEvent.click(getByText('Select option'));
    expect(getByTestId('picker-list')).toHaveClass('my-css-class');
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

  it('should be disabled if provided', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      disabled: true,
    });

    expect(getByRole('combobox')).toBeDisabled();
  });

  it('should render given text for search empty state if no search result found', () => {
    const { getByText, getByRole } = renderComponent({
      ...defaultProps,
      noSearchResultText: 'No results found',
    });

    userEvent.click(getByText('Select option'));
    userEvent.type(getByRole('textbox'), 'not existing option');
    expect(getByText('No results found')).toBeVisible();
  });

  it('should open list if openedOnInit is provided', () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      openedOnInit: true,
    });

    expect(getByTestId('picker-list')).toBeInTheDocument();
  });

  it('should not open list if isVisible is set to false (controlled mode) after user click', () => {
    const { queryByTestId, getByRole } = renderComponent({
      ...defaultProps,
      isVisible: false,
    });

    expect(queryByTestId('picker-list')).not.toBeInTheDocument();
    userEvent.click(getByRole('combobox'));
    expect(queryByTestId('picker-list')).not.toBeInTheDocument();
  });

  it('should not close list if isVisible is set to true (controlled mode) after user click', () => {
    const { queryByTestId } = renderComponent({
      ...defaultProps,
      isVisible: true,
    });

    expect(queryByTestId('picker-list')).toBeInTheDocument();
    userEvent.click(document.body);
    expect(queryByTestId('picker-list')).toBeInTheDocument();
  });

  it('should call onOpen and onClose handlers on list open and close', () => {
    const onOpen = vi.fn();
    const onClose = vi.fn();
    const { getByRole } = renderComponent({
      ...defaultProps,
      onOpen,
      onClose,
    });

    userEvent.click(getByRole('combobox'));
    expect(onOpen).toHaveBeenCalled();
    userEvent.click(document.body);
    expect(onClose).toHaveBeenCalled();
  });

  it('should clear search input after selection if clearSearchAfterSelection is provided (multi-select mode)', () => {
    const { getByRole, getByText, rerender } = renderComponent({
      ...defaultProps,
      type: 'multi',
      clearSearchAfterSelection: true,
      isVisible: true,
    });

    userEvent.type(getByRole('textbox'), 'Option one');
    userEvent.click(getByText('Option one'));

    rerender(
      <Picker
        {...defaultProps}
        type="multi"
        isVisible
        clearSearchAfterSelection
        selected={[
          {
            key: 'one',
            name: 'Option one',
          },
        ]}
      />
    );

    expect(getByRole('textbox')).toHaveValue('');
  });
});
