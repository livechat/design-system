import * as React from 'react';
import { render, fireEvent } from '../test-utils';
import { INumericInputProps, NumericInput } from './NumericInput';

const renderComponent = (props: INumericInputProps) => {
  return render(<NumericInput {...props} className="my-css-class" />);
};

describe('<NumericInput> component', () => {
  it('should allow for custom class', () => {
    const { container } = renderComponent({
      value: '0',
      onChange: jest.fn(),
    });

    expect(container.firstChild).toHaveClass('my-css-class');
  });

  it('should display buttons by default', () => {
    const { queryByRole } = renderComponent({
      value: '0',
      onChange: jest.fn(),
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
      onChange: jest.fn(),
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
      onChange: jest.fn(),
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
    const mockedFunction = jest.fn();
    const { getByRole } = renderComponent({
      value: '0',
      onChange: mockedFunction,
    });

    fireEvent.click(
      getByRole('button', {
        name: /Increment value/i,
      })
    );
    expect(mockedFunction).toHaveBeenCalled();

    mockedFunction.mockClear();

    fireEvent.click(
      getByRole('button', {
        name: /Decrement value/i,
      })
    );
    expect(mockedFunction).toHaveBeenCalled();
  });

  it('should disable Increment button when limit reached', () => {
    const { getByRole } = renderComponent({
      value: '10',
      onChange: jest.fn(),
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
      onChange: jest.fn(),
      min: -10,
    });

    expect(
      getByRole('button', {
        name: /Decrement value/i,
      })
    ).toBeDisabled();
  });
});
