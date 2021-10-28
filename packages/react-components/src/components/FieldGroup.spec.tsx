import * as React from 'react';
import { render } from '../test-utils';
import { FieldGroup } from './FieldGroup';

const baseClass = 'lc-field-group';

describe('<FieldGroup> component', () => {
  it('should allow for custom class', () => {
    const { container } = render(
      <FieldGroup className="my-css-class">test</FieldGroup>
    );
    expect(container.firstChild).toHaveClass('my-css-class');
  });

  it('should have inline class when inline prop is applied', () => {
    const { container } = render(<FieldGroup inline>test</FieldGroup>);
    expect(container.firstChild).toHaveClass(`${baseClass}--inline`);
  });

  it('should have stretched class when stretched prop is applied', () => {
    const { container } = render(<FieldGroup stretch>test</FieldGroup>);
    expect(container.firstChild).toHaveClass(`${baseClass}--stretched`);
  });

  it('should render error text', () => {
    const errorText = 'Error test text';
    const { queryByText } = render(
      <FieldGroup error={errorText}>test</FieldGroup>
    );
    expect(queryByText(errorText)).toBeTruthy();
    expect(queryByText(errorText)).toHaveClass('lc-field-error');
  });

  it('should render description text', () => {
    const descriptionText = 'Description test text';
    const { queryByText } = render(
      <FieldGroup description={descriptionText}>test</FieldGroup>
    );
    expect(queryByText(descriptionText)).toBeTruthy();
    expect(queryByText(descriptionText)).toHaveClass('lc-field-description');
  });
});
