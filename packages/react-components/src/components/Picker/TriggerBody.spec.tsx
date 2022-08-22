import * as React from 'react';
import { render, fireEvent, userEvent, vi } from 'test-utils';
import noop from '../../utils/noop';
import { TriggerBody, ITriggerBodyProps } from './TriggerBody';
import { PickerType } from './Picker';

const baseClass = 'picker-trigger-body';

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
  it('should display placeholder if there is no selected items', () => {
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
    });

    userEvent.type(getByRole('textbox'), 'option');
    expect(onFilter).toBeCalledWith('option');
  });
});
