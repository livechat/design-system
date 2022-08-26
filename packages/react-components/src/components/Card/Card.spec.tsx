import * as React from 'react';
import { render, fireEvent, vi } from 'test-utils';
import { Card } from './Card';

describe('<Card> component', () => {
  it('should allow for custom class', () => {
    const { container } = render(
      <Card title="Hello" className="my-css-class">
        test
      </Card>
    );
    expect(container.firstChild).toHaveClass('my-css-class');
  });

  it('should display only title if image is not provided', () => {
    const { getByText, getByRole } = render(<Card title="Hello" />);
    expect(getByText('Hello')).toBeVisible();
    expect(() => getByRole('img')).toThrow();
  });

  it('should display title and image if provided', () => {
    const { getByText, getByRole } = render(
      <Card title="Hello" src="https://via.placeholder.com/100" />
    );
    expect(getByText('Hello')).toBeVisible();
    expect(getByRole('img')).toBeVisible();
  });

  it('should display text children', () => {
    const { getByText } = render(<Card title="Hello">Lorem ipsum</Card>);
    expect(getByText('Lorem ipsum')).toBeVisible();
  });

  it('should display nested elements as children', () => {
    const { getAllByRole } = render(
      <Card title="Hello">
        <div>
          <h3>Lorem ipsum</h3>
        </div>
      </Card>
    );

    const [, nestedHeading] = getAllByRole('heading');
    expect(nestedHeading).toBeVisible();
    expect(nestedHeading).toHaveTextContent('Lorem ipsum');
  });

  it('should display nested elements as children', () => {
    const { getAllByRole } = render(
      <Card title="Hello">
        <div>
          <h3>Lorem ipsum</h3>
        </div>
      </Card>
    );

    const [, nestedHeading] = getAllByRole('heading');
    expect(nestedHeading).toBeVisible();
    expect(nestedHeading).toHaveTextContent('Lorem ipsum');
  });

  it('should allow expanding hidden content', () => {
    const expandableText = 'dolor sit amet';
    const { getByText } = render(
      <Card title="Hello" expandableContent={expandableText}>
        Lorem ipsum
      </Card>
    );

    const expander = getByText('Show more');
    expect(() => getByText(expandableText)).toThrow();
    fireEvent.click(expander);
    expect(getByText(expandableText)).toBeVisible();
    fireEvent.click(expander);
    expect(() => getByText(expandableText)).toThrow();
  });

  it('should display action buttons', () => {
    const secondaryAction = vi.fn();
    const destructiveAction = vi.fn();
    const { getByText } = render(
      <Card
        title="Hello"
        buttonsOptions={[
          {
            kind: 'secondary',
            onClick: secondaryAction,
            children: 'Details',
          },
          {
            kind: 'destructive',
            onClick: destructiveAction,
            children: 'Delete',
          },
        ]}
      >
        Lorem ipsum
      </Card>
    );

    const secondaryButton = getByText('Details');
    fireEvent.click(secondaryButton);
    expect(secondaryAction).toHaveBeenCalled();

    const destructiveButton = getByText('Delete');
    fireEvent.click(destructiveButton);
    expect(destructiveAction).toHaveBeenCalled();
  });
});
