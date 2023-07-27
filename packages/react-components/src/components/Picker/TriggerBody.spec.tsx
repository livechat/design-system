import * as React from 'react';

import { render, userEvent, vi } from 'test-utils';

import noop from '../../utils/noop';

import { PickerType } from './constants';
import { TriggerBody, ITriggerBodyProps } from './TriggerBody';

const defaultProps = {
  isOpen: false,
  placeholder: 'Select option',
  type: 'single' as PickerType,
  onItemRemove: () => noop,
  onFilter: () => noop,
};

const renderComponent = (props: ITriggerBodyProps) => {
  return render(<TriggerBody {...props}>Example text</TriggerBody>);
};

describe('<TriggerBody> component', () => {
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
    expect(onFilter).toBeCalledWith('option');
  });

  it('should show only one item in single mode', () => {
    const { queryByText } = renderComponent({
      ...defaultProps,
      items: [
        { key: 'one', name: 'Option one' },
        { key: 'two', name: 'Option two' },
        { key: 'three', name: 'Option three' },
      ],
    });

    expect(queryByText('Option one')).toBeVisible();
    expect(queryByText('Option two')).toBeNull();
    expect(queryByText('Option three')).toBeNull();
  });

  it('should show all items in multiselect mode', () => {
    const { queryByText } = renderComponent({
      ...defaultProps,
      type: 'multi',
      items: [
        { key: 'one', name: 'Option one' },
        { key: 'two', name: 'Option two' },
        { key: 'three', name: 'Option three' },
      ],
    });

    expect(queryByText('Option one')).toBeVisible();
    expect(queryByText('Option two')).toBeVisible();
    expect(queryByText('Option three')).toBeVisible();
  });

  it('should call onItemRemove with item selected to remove', () => {
    const onItemRemove = vi.fn();
    const { queryAllByRole } = renderComponent({
      ...defaultProps,
      type: 'multi',
      items: [
        { key: 'one', name: 'Option one' },
        { key: 'two', name: 'Option two' },
        { key: 'three', name: 'Option three' },
      ],
      onItemRemove,
    });
    const removeButtons = queryAllByRole('button');

    userEvent.click(removeButtons[0]);
    expect(onItemRemove).toHaveBeenCalledWith({
      key: 'one',
      name: 'Option one',
    });
    userEvent.click(removeButtons[2]);
    expect(onItemRemove).toHaveBeenCalledWith({
      key: 'three',
      name: 'Option three',
    });
  });

  it('should show custom component as selected item in single mode', () => {
    const { queryByText } = renderComponent({
      ...defaultProps,
      items: [
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
      items: [
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
      <TriggerBody
        {...defaultProps}
        isOpen
        clearSearchAfterSelection
        items={[
          {
            key: 'one',
            name: 'Option one',
          },
        ]}
      />
    );

    expect(onFilter).toBeCalledWith('');
    expect(getByRole('textbox')).toHaveValue('');
  });
});
