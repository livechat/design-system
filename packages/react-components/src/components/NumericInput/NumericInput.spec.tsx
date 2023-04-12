import { render, fireEvent, vi } from 'test-utils';
import noop from '../../utils/noop';
import { NumericInputProps, NumericInput } from './NumericInput';

const renderComponent = (props: Partial<NumericInputProps>) => {
  const finalProps = Object.assign(
    {},
    { onChange: noop },
    props
  ) as NumericInputProps;
  return render(<NumericInput {...finalProps} className="my-css-class" />);
};

describe('<NumericInput> component', () => {
  it('should allow for custom class', () => {
    const { container } = renderComponent({
      value: '0',
    });

    expect(container.firstChild).toHaveClass('my-css-class');
  });

  it('should display buttons by default', () => {
    const { queryByRole } = renderComponent({
      value: '0',
    });

    expect(
      queryByRole('button', {
        name: /Increment value/i,
      })
    ).toBeVisible();

    expect(
      queryByRole('button', {
        name: /Decrement value/i,
      })
    ).toBeVisible();
  });

  it('should not display buttons', () => {
    const { queryByRole } = renderComponent({
      value: '0',
      noControls: true,
    });

    expect(
      queryByRole('button', {
        name: /Increment value/i,
      })
    ).toBeFalsy();

    expect(
      queryByRole('button', {
        name: /Decrement value/i,
      })
    ).toBeFalsy();
  });

  it('all elements should be disabled', () => {
    const { queryByRole } = renderComponent({
      value: '0',
      disabled: true,
    });

    expect(queryByRole('textbox')).toBeDisabled();

    expect(
      queryByRole('button', {
        name: /Increment value/i,
      })
    ).toBeDisabled();

    expect(
      queryByRole('button', {
        name: /Decrement value/i,
      })
    ).toBeDisabled();
  });

  it('should call onChange when button click', () => {
    const onChange = vi.fn();
    const { getByRole } = renderComponent({
      value: '0',
      onChange,
    });

    fireEvent.click(
      getByRole('button', {
        name: /Increment value/i,
      })
    );
    expect(onChange).toHaveBeenCalledTimes(1);

    fireEvent.click(
      getByRole('button', {
        name: /Decrement value/i,
      })
    );
    expect(onChange).toHaveBeenCalledTimes(2);
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
