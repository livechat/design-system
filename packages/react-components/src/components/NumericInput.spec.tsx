import * as React from 'react';
import { render } from '../test-utils';
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
    ).toBeTruthy();

    expect(
      queryByRole('button', {
        name: /Decrement value/i,
      })
    ).toBeTruthy();
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
});
