import { useState } from 'react';
import { render, userEvent, vi } from 'test-utils';
import noop from '../../utils/noop';
import { ISearchInputProps, SearchInput } from './Search';
import styles from './Search.module.scss';

const baseClass = 'search-input';

const defaultProps = {
  value: '',
  onChange: () => noop,
};

const renderComponent = (props: ISearchInputProps) => {
  return render(<SearchInput {...props} />);
};

describe('<Search> component', () => {
  it('should apply className prop', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      className: 'test-class',
    });

    expect(getByRole('search')).toHaveClass('test-class');
  });

  it('should render with default values', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
    });
    const input = getByRole('searchbox');

    expect(getByRole('search')).toHaveClass(styles[`${baseClass}--medium`]);
    expect(input).toHaveValue('');
    expect(input).toHaveAttribute('placeholder', 'Search ...');
  });

  it('should render with compact size, if that prop is given', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      size: 'compact',
    });

    expect(getByRole('search')).toHaveClass(styles[`${baseClass}--compact`]);
  });

  it('should render with medium size, if that prop is given', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      size: 'medium',
    });

    expect(getByRole('search')).toHaveClass(styles[`${baseClass}--medium`]);
  });

  it('should render with large size, if that prop is given', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      size: 'large',
    });

    expect(getByRole('search')).toHaveClass(styles[`${baseClass}--large`]);
  });

  it('should render as disabled and input should be disabled, if that prop is given', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      isDisabled: true,
    });
    const searchbox = getByRole('searchbox');

    expect(getByRole('search')).toHaveClass(styles[`${baseClass}--disabled`]);
    expect(searchbox).toBeDisabled();
  });

  it('should render as loading, if that prop is given', () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      isLoading: true,
    });

    expect(getByTestId(`${baseClass}-loader`)).toBeVisible();
  });

  it('should render as disabled loading and input should be disabled, if that props are given', () => {
    const { getByTestId, getByRole } = renderComponent({
      ...defaultProps,
      isDisabled: true,
      isLoading: true,
    });
    const searchbox = getByRole('searchbox');

    expect(getByRole('search')).toHaveClass(styles[`${baseClass}--disabled`]);
    expect(getByTestId(`${baseClass}-loader`)).toBeVisible();
    expect(searchbox).toBeDisabled();
  });

  it('should render as collapsable, open it after click and focus the input', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      isCollapsable: true,
    });
    const component = getByRole('search');
    const searchbox = getByRole('searchbox');

    expect(component).toHaveClass(styles[`${baseClass}--collapsable`]);
    expect(component).toHaveAttribute('aria-expanded', 'false');
    userEvent.click(component);
    expect(component).toHaveClass(styles[`${baseClass}--collapsable--open`]);
    expect(component).toHaveAttribute('aria-expanded', 'true');
    expect(searchbox).toHaveFocus();
  });

  it('should close collapsable search if user clicks outside and no value is given', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      isCollapsable: true,
    });
    const component = getByRole('search');
    const searchbox = getByRole('searchbox');

    userEvent.click(component);
    expect(component).toHaveAttribute('aria-expanded', 'true');
    expect(searchbox).toHaveFocus();
    userEvent.click(document.body);
    expect(component).toHaveAttribute('aria-expanded', 'false');
    expect(searchbox).not.toHaveFocus();
  });

  it('should not close collapsable search if user clicks outside and value is given', () => {
    const { getByRole, rerender } = renderComponent({
      ...defaultProps,
      isCollapsable: true,
    });
    const component = getByRole('search');
    const searchbox = getByRole('searchbox');
    const text = 'test value';

    userEvent.click(component);
    userEvent.type(searchbox, text);

    rerender(<SearchInput {...defaultProps} value={text} isCollapsable />);

    userEvent.click(document.body);
    expect(searchbox).not.toHaveFocus();
    expect(component).not.toHaveClass(styles[`${baseClass}--focused`]);
    expect(component).toHaveAttribute('aria-expanded', 'true');
  });

  it('should render with given custom placeholder', () => {
    const { queryByPlaceholderText } = renderComponent({
      ...defaultProps,
      placeholder: 'Custom placeholder',
    });

    expect(queryByPlaceholderText(/Custom placeholder/i)).toBeVisible();
  });

  it('should render clear icon if value is given by the user', () => {
    const { getByRole, queryByRole, rerender } = renderComponent({
      ...defaultProps,
    });
    const text = 'test value';

    expect(queryByRole('button')).toBeFalsy();
    userEvent.type(getByRole('searchbox'), text);

    rerender(<SearchInput {...defaultProps} value={text} />);

    expect(queryByRole('button')).toBeVisible();
  });

  it('should call onChange if input value change', () => {
    const onChangeFunction = vi.fn();
    const SearchWrapper = () => {
      const [value, setValue] = useState('');
      return (
        <SearchInput
          value={value}
          onChange={(v) => {
            setValue(v);
            onChangeFunction(v);
          }}
        />
      );
    };

    const { getByRole } = render(<SearchWrapper />);
    const text = 'test value';

    userEvent.type(getByRole('searchbox'), text, { delay: 0 });
    expect(onChangeFunction).toHaveBeenCalledWith(text);
  });

  it('should clear input value if clear icon clicked', () => {
    const onChangeFunction = vi.fn();
    const { getByRole } = renderComponent({
      ...defaultProps,
      value: 'test value',
      onChange: onChangeFunction,
    });

    userEvent.click(getByRole('button'));
    expect(onChangeFunction).toBeCalledWith('');
  });
});
