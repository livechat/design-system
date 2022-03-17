import * as React from 'react';
import { render, fireEvent, vi } from 'test-utils';
import { InputFieldProps, InputField } from './InputField';

import styles from './InputField.module.scss';

const renderComponent = (props: InputFieldProps) => {
  return render(<InputField {...props} className="my-css-class" />);
};

describe('<InputField> component', () => {
  it('should allow for custom class', () => {
    const { container } = renderComponent({
      id: 'input-field-example',
      onChange: vi.fn(),
    });

    expect(container.firstChild).toHaveClass('my-css-class');
  });

  it('should allow for field custom class', () => {
    const { getByRole } = renderComponent({
      id: 'input-field-example',
      onChange: vi.fn(),
      placeholder: 'placeholder',
      fieldClassName: 'my-field-css-class',
    });

    expect(getByRole('textbox')).toHaveClass('my-field-css-class');
  });

  it('should have error class', () => {
    const { getByRole } = renderComponent({
      id: 'input-field-example',
      onChange: vi.fn(),
      error: 'Error',
    });

    expect(getByRole('textbox')).toHaveClass(styles['input-field--error']);
  });

  it('should call onChange when value changes', () => {
    const mockedFunction = vi.fn();
    const { getByRole } = renderComponent({
      id: 'input-field-example',
      onChange: mockedFunction,
    });

    fireEvent.change(getByRole('textbox'), { target: { value: 'test' } });
    const event = mockedFunction.mock.calls[0][0];
    expect(event.target.value).toEqual('test');
  });
});
