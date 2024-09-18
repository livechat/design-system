import { render } from 'test-utils';

import { FieldGroup } from './FieldGroup';

describe('<FieldGroup> component', () => {
  it('should allow for custom class', () => {
    const { container } = render(
      <FieldGroup className="my-css-class">test</FieldGroup>
    );
    expect(container.firstChild).toHaveClass('my-css-class');
  });

  it('should render error text', () => {
    const errorText = 'Error test text';
    const { queryByText } = render(
      <FieldGroup error={errorText}>test</FieldGroup>
    );
    expect(queryByText(errorText)).toBeVisible();
  });

  it('should render description text', () => {
    const descriptionText = 'Description test text';
    const { queryByText } = render(
      <FieldGroup description={descriptionText}>test</FieldGroup>
    );
    expect(queryByText(descriptionText)).toBeVisible();
  });
});
