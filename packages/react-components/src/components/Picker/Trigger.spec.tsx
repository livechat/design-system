import * as React from 'react';
import { render, fireEvent, vi } from 'test-utils';
import noop from '../../utils/noop';
import { ITriggerProps, Trigger } from './Trigger';
import styles from './Trigger.module.scss';

const baseClass = 'picker-trigger';

const defaultProps = {
  isSearchDisabled: false,
  isItemSelected: false,
  isOpen: false,
  onTrigger: () => noop,
  onClear: () => noop,
};

const renderComponent = (props: ITriggerProps) => {
  return render(<Trigger {...props}>Example text</Trigger>);
};

describe('<Trigger> component', () => {
  it('should render Trigger with given content', () => {
    const { getByText } = renderComponent(defaultProps);

    expect(getByText('Example text')).toBeVisible();
  });

  it('should render Trigger with default size', () => {
    const { container } = renderComponent(defaultProps);

    expect(container.firstChild).toHaveClass(styles[`${baseClass}--medium`]);
  });

  it('should render clear button if isItemSelected', () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      isItemSelected: true,
    });

    expect(getByTestId(`${baseClass}__clear-icon`)).toBeVisible();
  });

  it('should render disabled Trigger if isDisabled', () => {
    const { container } = renderComponent({
      ...defaultProps,
      isDisabled: true,
    });

    expect(container.firstChild).toHaveClass(styles[`${baseClass}--disabled`]);
  });

  it('should render error Trigger if isError', () => {
    const { container } = renderComponent({
      ...defaultProps,
      isError: true,
    });

    expect(container.firstChild).toHaveClass(styles[`${baseClass}--error`]);
  });

  it('should call onClick when Trigger clicked', () => {
    const onTrigger = vi.fn();
    const { getByText } = renderComponent({
      ...defaultProps,
      onTrigger,
    });

    fireEvent.click(getByText('Example text'));
    expect(onTrigger).toHaveBeenCalled();
  });

  it('should call onClearClick when clear button clicked', () => {
    const onClear = vi.fn();
    const { getByTestId } = renderComponent({
      ...defaultProps,
      isItemSelected: true,
      onClear,
    });

    fireEvent.click(getByTestId(`${baseClass}__clear-icon`));
    expect(onClear).toHaveBeenCalled();
  });

  it('shouldnt render clear button if isRequired', () => {
    const { queryByTestId } = renderComponent({
      ...defaultProps,
      isItemSelected: true,
      isRequired: true,
    });

    expect(queryByTestId(`${baseClass}__clear-icon`)).toBeNull();
  });

  it('should render Trigger with proper class in multiselect mode', () => {
    const { container } = renderComponent({
      ...defaultProps,
      isMultiSelect: true,
    });

    expect(container.firstChild).toHaveClass(
      styles[`${baseClass}--multi-select`]
    );
  });

  it('should render Trigger without input if isOpen and isSearchDisabled', () => {
    const { queryByRole } = renderComponent({
      ...defaultProps,
      isOpen: true,
      isSearchDisabled: true,
    });

    expect(queryByRole('textbox')).toBeNull();
  });
});
