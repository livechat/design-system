import * as React from 'react';
import { render, userEvent, fireEvent, vi } from 'test-utils';
import noop from '../../utils/noop';
import { ISearchInputProps, SearchInput } from './Search';
import styles from './Search.module.scss';

const baseClass = 'search-input';
const inputBaseClass = `${baseClass}__input`;
const componentTestId = `${baseClass}-container`;

const defaultProps = {
  value: '',
  onChange: () => noop,
};

const renderComponent = (props: ISearchInputProps) => {
  return render(<SearchInput {...props} />);
};

const rerenderedComponent = (props: ISearchInputProps) => {
  return <SearchInput {...props} />;
};

describe('<Search> component', () => {
  it('should apply className prop', () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      className: 'test-class',
    });

    expect(getByTestId(componentTestId)).toHaveClass('test-class');
  });

  it('should render with default values', () => {
    const { getByTestId, getByRole } = renderComponent({
      ...defaultProps,
    });
    const textbox = getByRole('textbox');

    expect(getByTestId(componentTestId)).toHaveClass(
      styles[`${baseClass}--medium`]
    );
    expect(textbox).toHaveValue('');
    expect(textbox).toHaveAttribute('placeholder', 'Search ...');
  });

  it('should render with compact size, if that prop is given', () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      size: 'compact',
    });

    expect(getByTestId(componentTestId)).toHaveClass(
      styles[`${baseClass}--compact`]
    );
  });

  it('should render with medium size, if that prop is given', () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      size: 'medium',
    });

    expect(getByTestId(componentTestId)).toHaveClass(
      styles[`${baseClass}--medium`]
    );
  });

  it('should render with large size, if that prop is given', () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      size: 'large',
    });

    expect(getByTestId(componentTestId)).toHaveClass(
      styles[`${baseClass}--large`]
    );
  });

  it('should render as disabled and input should be disabled, if that prop is given', () => {
    const { getByTestId, getByRole } = renderComponent({
      ...defaultProps,
      isDisabled: true,
    });
    const textbox = getByRole('textbox');

    expect(getByTestId(componentTestId)).toHaveClass(
      styles[`${baseClass}--disabled`]
    );
    expect(textbox).toHaveClass(styles[`${inputBaseClass}--disabled`]);
    expect(textbox).toBeDisabled();
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
    const textbox = getByRole('textbox');

    expect(getByTestId(componentTestId)).toHaveClass(
      styles[`${baseClass}--disabled`]
    );
    expect(getByTestId(`${baseClass}-loader`)).toBeVisible();
    expect(textbox).toHaveClass(styles[`${inputBaseClass}--disabled`]);
    expect(textbox).toBeDisabled();
  });

  it('should render as collapsable and open it after click, if that prop is given', () => {
    const { getByTestId, getByRole } = renderComponent({
      ...defaultProps,
      isCollapsable: true,
    });
    const component = getByTestId(componentTestId);
    const textbox = getByRole('textbox');

    expect(component).toHaveClass(styles[`${baseClass}--collapsable`]);
    expect(textbox).toHaveClass(styles[`${inputBaseClass}--collapsable`]);
    userEvent.click(component);
    expect(component).toHaveClass(styles[`${baseClass}--collapsable--open`]);
    expect(textbox).toHaveClass(styles[`${inputBaseClass}--collapsable--open`]);
    expect(textbox).toHaveFocus();
  });

  it('should close collapsable search if user clicks outside and no value is given', () => {
    const { getByTestId, getByRole } = renderComponent({
      ...defaultProps,
      isCollapsable: true,
    });
    const component = getByTestId(componentTestId);
    const textbox = getByRole('textbox');

    userEvent.click(component);
    expect(textbox).toHaveFocus();
    userEvent.click(document.body);
    expect(textbox).not.toHaveFocus();
    expect(component).not.toHaveClass(
      styles[`${baseClass}--collapsable--open`]
    );
    expect(textbox).not.toHaveClass(
      styles[`${inputBaseClass}--collapsable--open`]
    );
  });

  it('should not close collapsable search if user clicks outside and value is given', () => {
    const { getByTestId, getByRole, rerender } = renderComponent({
      ...defaultProps,
      isCollapsable: true,
    });
    const component = getByTestId(componentTestId);
    const textbox = getByRole('textbox');
    const text = 'test value';

    userEvent.click(component);
    userEvent.type(textbox, text);

    rerender(
      rerenderedComponent({
        ...defaultProps,
        value: text,
        isCollapsable: true,
      })
    );

    userEvent.click(document.body);
    expect(textbox).not.toHaveFocus();
    expect(component).toHaveClass(styles[`${baseClass}--collapsable--open`]);
    expect(component).not.toHaveClass(styles[`${baseClass}--focused`]);
    expect(textbox).toHaveClass(styles[`${inputBaseClass}--collapsable--open`]);
  });

  it('should render with given custom placeholder', () => {
    const { queryByPlaceholderText } = renderComponent({
      ...defaultProps,
      placeholder: 'Custom placeholder',
    });

    expect(queryByPlaceholderText(/Custom placeholder/i)).toBeVisible();
  });

  it('should render clear icon if value is given by the user', () => {
    const { getByRole, queryByTestId, rerender } = renderComponent({
      ...defaultProps,
    });
    const text = 'test value';

    expect(queryByTestId(`${baseClass}-clear-icon`)).toBeFalsy();
    userEvent.type(getByRole('textbox'), text);

    rerender(
      rerenderedComponent({
        ...defaultProps,
        value: text,
      })
    );

    expect(queryByTestId(`${baseClass}-clear-icon`)).toBeVisible();
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

    userEvent.type(getByRole('textbox'), text, { delay: 0 });
    expect(onChangeFunction).toHaveBeenCalledWith(text);
  });

  it('should clear input value if clear icon clicked', () => {
    const onChangeFunction = vi.fn();
    const { getByTestId } = renderComponent({
      ...defaultProps,
      value: 'test value',
      onChange: onChangeFunction,
    });

    userEvent.click(getByTestId(`${baseClass}-clear-icon`));
    expect(onChangeFunction).toBeCalledWith('');
  });
});
