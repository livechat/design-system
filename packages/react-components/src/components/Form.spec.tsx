import * as React from 'react';

import { render } from '../test-utils';
import noop from '../utils/noop';
import { Form } from './Form';

describe('<Form /> component', () => {
  it("should render 'labelText' heading", () => {
    const { getByRole } = render(<Form labelText="Hello" />);
    const heading = getByRole('heading');
    expect(heading).toBeVisible();
    expect(heading).toHaveTextContent('Hello');
  });

  it("should render 'helperText'", () => {
    const { getByText } = render(<Form helperText="Hello" />);
    expect(getByText('Hello')).toBeVisible();
  });

  it("should render nested elements as 'formFooter'", () => {
    const { getByRole } = render(<Form formFooter={<button>Submit</button>} />);
    const button = getByRole('button');
    expect(button).toBeVisible();
    expect(button).toHaveTextContent('Submit');
  });

  it("should render nested elements as 'children'", () => {
    const { getByRole } = render(
      <Form>
        <input type="text" value="Hello" onChange={noop} />
      </Form>
    );

    const input = getByRole('textbox');
    expect(input).toBeVisible();
    expect(input).toHaveValue('Hello');
  });
});
