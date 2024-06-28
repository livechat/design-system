import { render } from 'test-utils';

import { FormFieldProps, FormField } from './FormField';

const label = 'Example label text';
const error = 'Error text';
const description = <div>Description text</div>;
const adornment = <div>Decoration element</div>;
const labelRight = <div>Label right</div>;

const renderComponent = (props: FormFieldProps) => {
  return render(
    <FormField {...props} className="my-css-class">
      <input id="input-field-example" />
    </FormField>
  );
};

describe('<FormField> component', () => {
  it('should allow for custom class', () => {
    const { container } = renderComponent({});

    expect(container.firstChild).toHaveClass('my-css-class');
  });

  it('should render field elements', () => {
    const { getByText } = renderComponent({
      labelText: label,
      description: description,
      labelAdornment: adornment,
      labelRightNode: labelRight,
    });

    expect(getByText(label)).toBeVisible();
    expect(getByText('Description text')).toBeVisible();
    expect(getByText('Decoration element')).toBeVisible();
    expect(getByText('Label right')).toBeVisible();
  });

  it('should not render description if error is given', () => {
    const { getByText, queryByText } = renderComponent({
      labelText: label,
      error: error,
      description: description,
      labelAdornment: adornment,
      labelRightNode: labelRight,
    });

    expect(getByText(label)).toBeVisible();
    expect(getByText(error)).toBeVisible();
    expect(queryByText('Description text')).toBeFalsy();
    expect(getByText('Decoration element')).toBeVisible();
    expect(getByText('Label right')).toBeVisible();
  });
});
