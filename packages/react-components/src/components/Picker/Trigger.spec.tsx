import * as React from 'react';
import { render, fireEvent, vi } from 'test-utils';
import noop from '../../utils/noop';
import { ITriggerProps, Trigger } from './Trigger';
import styles from './Trigger.module.scss';

const baseClass = 'picker-trigger';

const defaultProps = {
  isItemSelected: false,
  isOpen: false,
  onClick: () => noop,
  onClearClick: () => noop,
  onFilter: () => noop,
};

const renderComponent = (props: ITriggerProps) => {
  return render(<Trigger {...props}>Example text</Trigger>);
};

describe('<Trigger> component', () => {
  it('should render Trigger with placeholder text', () => {
    const { getByText } = renderComponent(defaultProps);

    expect(getByText('Example text')).toBeVisible();
  });

  it('should render Trigger with default size', () => {
    const { container } = renderComponent(defaultProps);

    expect(container.firstChild).toHaveClass(styles[`${baseClass}--medium`]);
  });

  it('should render Trigger with input if isOpen', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      isOpen: true,
    });

    expect(getByRole('textbox')).toBeVisible();
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
    const onClick = vi.fn();
    const { getByText } = renderComponent({
      ...defaultProps,
      onClick,
    });

    fireEvent.click(getByText('Example text'));
    expect(onClick).toHaveBeenCalled();
  });

  it('should call onClearClick when clear button clicked', () => {
    const onClearClick = vi.fn();
    const { getByTestId } = renderComponent({
      ...defaultProps,
      isItemSelected: true,
      onClearClick,
    });

    fireEvent.click(getByTestId(`${baseClass}__clear-icon`));
    expect(onClearClick).toHaveBeenCalled();
  });

  it('should call onFilter when input value change', () => {
    const onFilter = vi.fn();
    const { getByRole } = renderComponent({
      ...defaultProps,
      isOpen: true,
      onFilter,
    });

    fireEvent.change(getByRole('textbox'), { target: { value: 'option' } });
    expect(onFilter).toHaveBeenCalledWith('option');
  });

  it('shouldnt render clear button if isRequired', () => {
    const { queryByTestId } = renderComponent({
      ...defaultProps,
      isItemSelected: true,
      isRequired: true,
    });

    expect(queryByTestId(`${baseClass}__clear-icon`)).toBeNull();
  });
});
