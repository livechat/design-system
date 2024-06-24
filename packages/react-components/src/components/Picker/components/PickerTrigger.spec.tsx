import { render, vi, userEvent } from 'test-utils';

import noop from '../../../utils/noop';

import { PickerTriggerProps, PickerTrigger } from './PickerTrigger';

const defaultProps: PickerTriggerProps = {
  getReferenceProps: vi.fn(),
  setReference: vi.fn(),
  isItemSelected: false,
  isOpen: false,
  onClear: () => noop,
  setTriggerFocus: () => noop,
};

const renderComponent = (props: PickerTriggerProps) =>
  render(<PickerTrigger {...props}>Example text</PickerTrigger>);

describe('<PickerTrigger> component', () => {
  it('should render Trigger with given content', () => {
    const { getByText } = renderComponent(defaultProps);

    expect(getByText('Example text')).toBeVisible();
  });

  it('should render clear button if isItemSelected', () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      isItemSelected: true,
    });

    expect(getByTestId(`picker-trigger__clear-icon`)).toBeVisible();
  });

  it('should render disabled Trigger if isDisabled', () => {
    const { container } = renderComponent({
      ...defaultProps,
      isDisabled: true,
    });

    expect(container.firstChild).toBeDisabled();
  });

  it('should call onClearClick when clear button clicked', () => {
    const onClear = vi.fn();
    const { getByTestId } = renderComponent({
      ...defaultProps,
      isItemSelected: true,
      onClear,
    });

    userEvent.click(getByTestId(`picker-trigger__clear-icon`));
    expect(onClear).toHaveBeenCalled();
  });

  it('shouldnt render clear button if isRequired', () => {
    const { queryByTestId } = renderComponent({
      ...defaultProps,
      isItemSelected: true,
      isRequired: true,
    });

    expect(queryByTestId(`picker-trigger__clear-icon`)).not.toBeInTheDocument();
  });

  it('should render Trigger without input if isOpen and isSearchDisabled', () => {
    const { queryByRole } = renderComponent({
      ...defaultProps,
      isOpen: true,
    });

    expect(queryByRole('textbox')).not.toBeInTheDocument();
  });
});
