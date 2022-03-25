import * as React from 'react';
import { render, fireEvent, vi } from 'test-utils';
import noop from '../../utils/noop';
import { ISearchProps, Search, SearchSize } from './Search';
import styles from './Search.module.scss';

const baseClass = 'search';

const defaultProps = {
  onChange: () => noop,
};

const renderComponent = (props: ISearchProps) => {
  return render(<Search {...props} />);
};

describe('<Search> component', () => {
  it('should render with default size', () => {
    const { container } = renderComponent({
      ...defaultProps,
    });

    expect(container.firstChild).toHaveClass(styles[`${baseClass}--compact`]);
  });

  it('should render with given medium size', () => {
    const { container } = renderComponent({
      ...defaultProps,
      size: SearchSize.Medium,
    });

    expect(container.firstChild).toHaveClass(styles[`${baseClass}--medium`]);
  });

  it('should render with given large size', () => {
    const { container } = renderComponent({
      ...defaultProps,
      size: SearchSize.Large,
    });

    expect(container.firstChild).toHaveClass(styles[`${baseClass}--large`]);
  });

  it('should render as disabled', () => {
    const { container } = renderComponent({
      ...defaultProps,
      isDisabled: true,
    });

    expect(container.firstChild).toHaveClass(styles[`${baseClass}--disabled`]);
  });

  it('should render as loading', () => {
    const { container, getByTestId } = renderComponent({
      ...defaultProps,
      isLoading: true,
    });

    expect(container.firstChild).toHaveClass(styles[`${baseClass}--disabled`]);
    expect(getByTestId(`${baseClass}-loader`)).toBeVisible();
  });

  it('should render as collapsable and open it after click', () => {
    const { container, getByTestId } = renderComponent({
      ...defaultProps,
      isCollapsable: true,
    });

    expect(container.firstChild).toHaveClass(
      styles[`${baseClass}--collapsable`]
    );
    fireEvent.click(getByTestId(`${baseClass}-container`));
    expect(container.firstChild).toHaveClass(
      styles[`${baseClass}--collapsable--open`]
    );
  });

  it('should render with given custom placeholder', () => {
    const { queryByPlaceholderText } = renderComponent({
      ...defaultProps,
      placeholder: 'Custom placeholder',
    });

    expect(queryByPlaceholderText(/Custom placeholder/i)).toBeTruthy();
  });

  it('should render clear icon if value is given', () => {
    const { getByRole, queryByTestId } = renderComponent({
      ...defaultProps,
    });

    expect(queryByTestId(`${baseClass}-clear-icon`)).toBeFalsy();
    fireEvent.change(getByRole('textbox'), { target: { value: 'test' } });
    expect(queryByTestId(`${baseClass}-clear-icon`)).toBeVisible();
  });

  it('should call onChange if input value change', () => {
    const onChangeFunction = vi.fn();
    const { getByRole } = renderComponent({
      ...defaultProps,
      onChange: onChangeFunction,
    });

    fireEvent.change(getByRole('textbox'), { target: { value: 'test' } });
    expect(onChangeFunction).toBeCalledWith('test');
  });

  it('should clear input value if clear icon clicked', () => {
    const { getByTestId, getByRole } = renderComponent({
      ...defaultProps,
      value: 'test',
    });

    fireEvent.click(getByTestId(`${baseClass}-clear-icon`));
    expect(getByRole('textbox')).toHaveTextContent('');
  });

  it('should call onChange in controlled submit if enter key is pressed', () => {
    const onChangeFunction = vi.fn();
    const { getByRole } = renderComponent({
      ...defaultProps,
      isControlledSubmit: true,
      onChange: onChangeFunction,
    });
    const input = getByRole('textbox');

    fireEvent.change(input, { target: { value: 'test' } });
    expect(onChangeFunction).not.toBeCalled();
    fireEvent.keyDown(input, { key: 'Enter', charCode: 13 });
    expect(onChangeFunction).toBeCalledWith('test');
  });
});
