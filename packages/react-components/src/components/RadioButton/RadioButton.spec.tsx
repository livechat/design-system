import { render, userEvent, vi } from 'test-utils';
import { RadioButton } from './RadioButton';

import styles from './RadioButton.module.scss';

const baseClass = 'radio-button';

describe('<RadioButton> component', () => {
  it('should allow for custom class', () => {
    const { container } = render(
      <RadioButton className="my-css-class">test</RadioButton>
    );
    expect(container.firstChild).toHaveClass('my-css-class');
  });

  it('should not have been checked or disabled by default', () => {
    const { container } = render(<RadioButton>test</RadioButton>);
    expect(container.firstChild).not.toHaveClass(
      styles[`${baseClass}--selected`]
    );
    expect(container.firstChild).not.toHaveClass(
      styles[`${baseClass}--disabled`]
    );
  });

  it('should have secondary class when used with secondary prop', () => {
    const { container } = render(
      <RadioButton checked disabled>
        test
      </RadioButton>
    );
    expect(container.firstChild).toHaveClass(styles[`${baseClass}--selected`]);
    expect(container.firstChild).toHaveClass(styles[`${baseClass}--disabled`]);
  });

  it('should call onChange method', () => {
    const onChange = vi.fn();

    const { getByRole } = render(
      <RadioButton onChange={onChange}>test</RadioButton>
    );
    userEvent.click(getByRole('radio'));
    expect(onChange).toBeCalledTimes(1);
  });

  it('should not call onChange method when checked', () => {
    const onChange = vi.fn();

    const { getByRole } = render(
      <RadioButton checked onChange={onChange}>
        test
      </RadioButton>
    );
    userEvent.click(getByRole('radio'));
    expect(onChange).not.toBeCalled();
  });

  it('should not call onChange method when disabled', () => {
    const onChange = vi.fn();

    const { getByRole } = render(
      <RadioButton disabled onChange={onChange}>
        test
      </RadioButton>
    );
    userEvent.click(getByRole('radio'));
    expect(onChange).not.toBeCalled();
  });
});
