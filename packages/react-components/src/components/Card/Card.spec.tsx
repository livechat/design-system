import * as React from 'react';
import { render } from 'test-utils';
import { Card } from './Card';

describe('<Card /> component', () => {
  it('should render only title if image is not provided', () => {
    const { getByText, getByRole } = render(<Card title="Hello" />);
    expect(getByText('Hello')).toBeVisible();
    expect(() => getByRole('img')).toThrow();
  });

  it('should render title and image if provided', () => {
    const { getByText, getByRole } = render(
      <Card title="Hello" img="https://via.placeholder.com/100" />
    );
    expect(getByText('Hello')).toBeVisible();
    expect(getByRole('img')).toBeVisible();
  });

  it('should render text children', () => {
    const { getByText } = render(<Card title="Hello">Lorem ipsum</Card>);
    expect(getByText('Lorem ipsum')).toBeVisible();
  });

  it('should render nested elements as children', () => {
    const { getByRole } = render(
      <Card title="Hello">
        <div>
          <h3>Lorem ipsum</h3>
        </div>
      </Card>
    );

    const heading = getByRole('heading');
    expect(heading).toBeVisible();
    expect(heading).toHaveTextContent('Lorem ipsum');
  });
});
