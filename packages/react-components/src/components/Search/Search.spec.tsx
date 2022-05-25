import * as React from 'react';
import { render, fireEvent, vi } from 'test-utils';
import noop from '../../utils/noop';
import { ISearchInputProps, SearchInput, SearchSize } from './Search';
import styles from './Search.module.scss';

const baseClass = 'search-input';
const inputBaseClass = `${baseClass}__input`;

const defaultProps = {
  onChange: () => noop,
};

const renderComponent = (props: ISearchInputProps) => {
  return render(<SearchInput {...props} />);
};

describe('<Search> component', () => {
  it('should render with default size', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
    });

    expect(getByRole('textbox')).toHaveClass(
      styles[`${inputBaseClass}--medium`]
    );
  });

  it('should render with given medium size', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      size: SearchSize.Medium,
    });

    expect(getByRole('textbox')).toHaveClass(
      styles[`${inputBaseClass}--medium`]
    );
  });

  it('should render with given large size', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      size: SearchSize.Large,
    });

    expect(getByRole('textbox')).toHaveClass(
      styles[`${inputBaseClass}--large`]
    );
  });

  it('should render as disabled', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      isDisabled: true,
    });
    const textbox = getByRole('textbox');

    expect(textbox).toHaveClass(styles[`${inputBaseClass}--disabled`]);
    expect(textbox).toBeDisabled();
  });

  it('should render as loading', () => {
    const { getByRole, getByTestId } = renderComponent({
      ...defaultProps,
      isLoading: true,
    });

    expect(getByRole('textbox')).toHaveClass(
      styles[`${inputBaseClass}--disabled`]
    );
    expect(getByTestId(`${baseClass}-loader`)).toBeVisible();
  });

  it('should render as collapsable and open it after click', () => {
    const { getByRole, getByTestId } = renderComponent({
      ...defaultProps,
      isCollapsable: true,
    });

    expect(getByRole('textbox')).toHaveClass(
      styles[`${inputBaseClass}--collapsable`]
    );
    fireEvent.click(getByTestId(`${baseClass}-container`));
    expect(getByRole('textbox')).toHaveClass(
      styles[`${inputBaseClass}--collapsable--open`]
    );
  });

  it('should render with given custom placeholder', () => {
    const { queryByPlaceholderText } = renderComponent({
      ...defaultProps,
      placeholder: 'Custom placeholder',
    });

    expect(queryByPlaceholderText(/Custom placeholder/i)).toBeVisible();
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
});
