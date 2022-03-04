import * as React from 'react';
import { render } from '../test-utils';
import { ITextFieldProps, TextField } from './TextField';

const renderComponent = (props: ITextFieldProps) => {
  return render(
    <TextField {...props} className="my-css-class">
      <input id="input-field-example" />
    </TextField>
  );
};

describe('<TextField> component', () => {
  it('should allow for custom class', () => {
    const { container } = renderComponent({});

    expect(container.firstChild).toHaveClass('my-css-class');
  });

  it('should render field elements', () => {
    const label = 'Example label text';
    const error = 'Error text';
    const description = <div>Description text</div>;
    const adornment = <div>Decoration element</div>;
    const labelRight = <div>Label right</div>;
    const { getByText } = renderComponent({
      labelText: label,
      error: error,
      description: description,
      labelAdornment: adornment,
      labelRightNode: labelRight,
    });

    expect(getByText(label)).toBeVisible();
    expect(getByText(error)).toBeVisible();
    expect(getByText('Description text')).toBeVisible();
    expect(getByText('Decoration element')).toBeVisible();
    expect(getByText('Label right')).toBeVisible();
  });
});
