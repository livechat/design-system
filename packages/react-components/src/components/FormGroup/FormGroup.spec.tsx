import { render } from 'test-utils';
import { FormGroup } from './FormGroup';

import styles from './FormGroup.module.scss';

const baseClass = 'form-group';

describe('<FormGroup> component', () => {
  it('should allow for custom class', () => {
    const { container } = render(
      <FormGroup className="my-css-class">test</FormGroup>
    );
    expect(container.firstChild).toHaveClass('my-css-class');
  });

  it('should render label text', () => {
    const text = 'Label text';
    const { queryByText } = render(
      <FormGroup labelText={text}>test</FormGroup>
    );
    expect(queryByText(text)).toBeTruthy();
    expect(queryByText(text)).toHaveClass(styles[`${baseClass}__label`]);
  });

  it('should render helper text', () => {
    const text = 'Helper text';
    const { queryByText } = render(
      <FormGroup helperText={text}>test</FormGroup>
    );
    expect(queryByText(text)).toBeTruthy();
    expect(queryByText(text)).toHaveClass(styles[`${baseClass}__helper`]);
  });
});
