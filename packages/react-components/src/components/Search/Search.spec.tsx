import * as React from 'react';

import { render, userEvent, vi } from 'test-utils';

import noop from '../../utils/noop';

import { ISearchInputProps, SearchInput } from './Search';

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

  it('should render with default value and placeholder', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
    });
    const input = getByRole('searchbox');

    expect(input).toHaveValue('');
    expect(input).toHaveAttribute('placeholder', 'Search ...');
  });

  it('should be disabled if isDisabled is given', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      isDisabled: true,
    });
    const searchbox = getByRole('searchbox');

    expect(searchbox).toBeDisabled();
  });

  it('should render as loading, if that prop is given', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      isLoading: true,
    });

    expect(getByRole('status')).toBeInTheDocument();
  });

  it('should render as disabled loading and input should be disabled, if that props are given', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      isDisabled: true,
      isLoading: true,
    });

    expect(getByRole('status')).toBeInTheDocument();
    expect(getByRole('searchbox')).toBeDisabled();
  });

  it('should render as collapsable, open it after user clicks the icon and focus the input', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      isCollapsable: true,
    });
    const component = getByRole('search');
    const searchbox = getByRole('searchbox');

    expect(component).toHaveAttribute('aria-expanded', 'false');
    userEvent.click(component);
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

    expect(queryByRole('button')).not.toBeInTheDocument();
    userEvent.type(getByRole('searchbox'), text);

    rerender(<SearchInput {...defaultProps} value={text} />);

    expect(queryByRole('button')).toBeInTheDocument();
  });

  it('should call onChange if input value change', () => {
    const onChangeFunction = vi.fn();
    const SearchWrapper = () => {
      const [value, setValue] = React.useState('');

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
    expect(onChangeFunction).toHaveBeenCalledWith('');
  });
});
