import { render, fireEvent, vi } from 'test-utils';

import noop from '../../utils/noop';

import { NumericInputProps, NumericInput } from './NumericInput';

const defaultProps: NumericInputProps = {
  value: '0',
  onChange: noop,
};

const renderComponent = (props: Partial<NumericInputProps>) => {
  const finalProps = Object.assign(
    {},
    { onChange: noop },
    props
  ) as NumericInputProps;

  return render(<NumericInput {...finalProps} />);
};

describe('<NumericInput> component', () => {
  it('should allow for custom class', () => {
    const { container } = renderComponent({
      ...defaultProps,
      className: 'my-css-class',
    });

    expect(container.firstChild).toHaveClass('my-css-class');
  });

  it('should display buttons by default', () => {
    const { queryByRole } = renderComponent(defaultProps);

    expect(
      queryByRole('button', {
        name: /Increment value/i,
      })
    ).toBeInTheDocument();
    expect(
      queryByRole('button', {
        name: /Decrement value/i,
      })
    ).toBeInTheDocument();
  });

  it('should not display buttons if noControls is set true', () => {
    const { queryByRole } = renderComponent({
      ...defaultProps,
      noControls: true,
    });

    expect(
      queryByRole('button', {
        name: /Increment value/i,
      })
    ).not.toBeInTheDocument();
    expect(
      queryByRole('button', {
        name: /Decrement value/i,
      })
    ).not.toBeInTheDocument();
  });

  it('all elements should be disabled if disabled is set true', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      disabled: true,
    });

    expect(getByRole('textbox')).toBeDisabled();
    expect(
      getByRole('button', {
        name: /Increment value/i,
      })
    ).toBeDisabled();
    expect(
      getByRole('button', {
        name: /Decrement value/i,
      })
    ).toBeDisabled();
  });

  it('should call onChange when button click', () => {
    const onChange = vi.fn();
    const { getByRole } = renderComponent({
      ...defaultProps,
      onChange,
    });

    fireEvent.click(
      getByRole('button', {
        name: /Increment value/i,
      })
    );
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith('1');

    fireEvent.click(
      getByRole('button', {
        name: /Decrement value/i,
      })
    );
    expect(onChange).toHaveBeenCalledTimes(2);
    expect(onChange).toHaveBeenCalledWith('-1');
  });

  it('should disable Increment button when limit reached', () => {
    const { getByRole } = renderComponent({
      value: '10',
      max: 10,
    });

    expect(
      getByRole('button', {
        name: /Increment value/i,
      })
    ).toBeDisabled();
  });

  it('should disable Decrement button when limit reached', () => {
    const { getByRole } = renderComponent({
      value: '-10',
      min: -10,
    });

    expect(
      getByRole('button', {
        name: /Decrement value/i,
      })
    ).toBeDisabled();
  });
});
