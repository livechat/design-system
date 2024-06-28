import { render, userEvent, vi } from 'test-utils';

import noop from '../../../utils/noop';
import { PickerType } from '../types';

import { PickerTriggerBody, ITriggerBodyProps } from './PickerTriggerBody';

const defaultProps = {
  isOpen: false,
  placeholder: 'Select option',
  type: 'single' as PickerType,
  onItemRemove: () => noop,
  onFilter: () => noop,
  onSelect: () => noop,
  onClear: () => noop,
  virtualItemRef: { current: null },
  isTriggerFocused: false,
};

const renderComponent = (props: ITriggerBodyProps) =>
  render(<PickerTriggerBody {...props}>Example text</PickerTriggerBody>);

describe('<PickerTriggerBody> component', () => {
  it('should display placeholder if there is no selected items and not isOpen', () => {
    const { getByText } = renderComponent(defaultProps);

    expect(getByText('Select option')).toBeVisible();
  });

  it('should render Trigger with input if isOpen', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      isOpen: true,
    });

    expect(getByRole('textbox')).toBeVisible();
  });

  it('should call onFilter when input value change', () => {
    const onFilter = vi.fn();
    const { getByRole } = renderComponent({
      ...defaultProps,
      isOpen: true,
      onFilter,
    });

    userEvent.type(getByRole('textbox'), 'option');
    expect(onFilter).toHaveBeenCalledWith('option');
  });

  it('should show only one item in single mode', () => {
    const { queryByText } = renderComponent({
      ...defaultProps,
      selectedItems: [
        { key: 'one', name: 'Option one' },
        { key: 'two', name: 'Option two' },
        { key: 'three', name: 'Option three' },
      ],
    });

    expect(queryByText('Option one')).toBeVisible();
    expect(queryByText('Option two')).not.toBeInTheDocument();
    expect(queryByText('Option three')).not.toBeInTheDocument();
  });

  it('should show all items in multiselect mode', () => {
    const { queryByText } = renderComponent({
      ...defaultProps,
      type: 'multi',
      selectedItems: [
        { key: 'one', name: 'Option one' },
        { key: 'two', name: 'Option two' },
        { key: 'three', name: 'Option three' },
      ],
    });

    expect(queryByText('Option one')).toBeInTheDocument();
    expect(queryByText('Option two')).toBeInTheDocument();
    expect(queryByText('Option three')).toBeInTheDocument();
  });

  it('should call onItemRemove with item selected to remove', () => {
    const onItemRemove = vi.fn();
    const { queryAllByRole } = renderComponent({
      ...defaultProps,
      type: 'multi',
      selectedItems: [
        { key: 'one', name: 'Option one' },
        { key: 'two', name: 'Option two' },
        { key: 'three', name: 'Option three' },
      ],
      onItemRemove,
    });
    const removeButtons = queryAllByRole('button');

    userEvent.click(removeButtons[0]);
    expect(onItemRemove).toHaveBeenCalledWith('one');
    userEvent.click(removeButtons[2]);
    expect(onItemRemove).toHaveBeenCalledWith('three');
  });

  it('should show custom component as selected item in single mode', () => {
    const { queryByText } = renderComponent({
      ...defaultProps,
      selectedItems: [
        {
          key: 'custom-one',
          name: 'Custom one',
          customElement: {
            listItemBody: <div>List custom one</div>,
            selectedItemBody: <div>Selected custom one</div>,
          },
        },
      ],
    });

    expect(queryByText('Selected custom one')).toBeVisible();
  });

  it('should show custom components as selected items in multiselect mode', () => {
    const { queryByText } = renderComponent({
      ...defaultProps,
      type: 'multi',
      selectedItems: [
        {
          key: 'custom-one',
          name: 'Custom one',
          customElement: {
            listItemBody: <div>List custom one</div>,
            selectedItemBody: <div>Selected custom one</div>,
          },
        },
        {
          key: 'custom-two',
          name: 'Custom two',
          customElement: {
            listItemBody: <div>List custom two</div>,
            selectedItemBody: <div>Selected custom two</div>,
          },
        },
      ],
    });

    expect(queryByText('Selected custom one')).toBeVisible();
    expect(queryByText('Selected custom two')).toBeVisible();
  });

  it('should clear search input after item selection if clearSearchAfterSelection is passed', () => {
    const onFilter = vi.fn();
    const { getByRole, rerender } = renderComponent({
      ...defaultProps,
      isOpen: true,
      onFilter,
      clearSearchAfterSelection: true,
    });

    userEvent.type(getByRole('textbox'), 'Option one');
    expect(onFilter).toBeCalledWith('Option one');

    rerender(
      <PickerTriggerBody
        {...defaultProps}
        isOpen
        clearSearchAfterSelection
        selectedItems={[
          {
            key: 'one',
            name: 'Option one',
          },
        ]}
      />
    );

    expect(onFilter).toHaveBeenCalledWith('');
    expect(getByRole('textbox')).toHaveValue('');
  });
});
