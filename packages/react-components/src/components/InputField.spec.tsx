import * as React from 'react';
import { render } from '../test-utils';
import { IInputFieldProps, InputField } from './InputField';

const renderComponent = (props: IInputFieldProps) => {
  return render(<InputField {...props} className="my-css-class" />);
};

describe('<InputField> component', () => {
  it('should allow for custom class', () => {
    const { container } = renderComponent({
      id: 'input-field-example',
      onChange: jest.fn(),
    });

    expect(container.firstChild).toHaveClass('my-css-class');
  });

  it('should allow for field custom class', () => {
    const { getByPlaceholderText } = renderComponent({
      id: 'input-field-example',
      onChange: jest.fn(),
      placeholder: 'placeholder',
      fieldClassName: 'my-field-css-class',
    });

    expect(getByPlaceholderText('placeholder')).toHaveClass(
      'my-field-css-class'
    );
  });
});
