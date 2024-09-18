import { render } from 'test-utils';

import { FormGroup, FormGroupProps } from './FormGroup';

const renderComponent = (props: FormGroupProps) =>
  render(
    <FormGroup {...props}>
      <input type="text" />
      <button type="submit">Submit</button>
    </FormGroup>
  );

describe('<FormGroup> component', () => {
  it('should allow for custom class', () => {
    const { container } = renderComponent({ className: 'my-css-class' });

    expect(container.firstChild).toHaveClass('my-css-class');
  });

  it('should render form elements', () => {
    const { getByRole } = renderComponent({});

    expect(getByRole('textbox')).toBeInTheDocument();
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('should render label text if labelText props is provided', () => {
    const text = 'Label text';
    const { getByText } = renderComponent({ labelText: text });

    expect(getByText(text)).toBeInTheDocument();
  });

  it('should render helper text if helperText prop is provided', () => {
    const text = 'Helper text';
    const { getByText } = renderComponent({ helperText: text });

    expect(getByText(text)).toBeInTheDocument();
  });
});
