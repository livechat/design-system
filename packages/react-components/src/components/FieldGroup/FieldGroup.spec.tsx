import { render } from 'test-utils';
import { FieldGroup } from './FieldGroup';

import styles from './FieldGroup.module.scss';

const baseClass = 'field-group';

describe('<FieldGroup> component', () => {
  it('should allow for custom class', () => {
    const { container } = render(
      <FieldGroup className="my-css-class">test</FieldGroup>
    );
    expect(container.firstChild).toHaveClass('my-css-class');
  });

  it('should have inline class when inline prop is applied', () => {
    const { container } = render(<FieldGroup inline>test</FieldGroup>);
    expect(container.firstChild).toHaveClass(styles[`${baseClass}--inline`]);
  });

  it('should have stretched class when stretched prop is applied', () => {
    const { container } = render(<FieldGroup stretch>test</FieldGroup>);
    expect(container.firstChild).toHaveClass(styles[`${baseClass}--stretched`]);
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
