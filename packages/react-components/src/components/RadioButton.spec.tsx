import * as React from 'react';
import { render, userEvent } from '../test-utils';
import { RadioButton } from './RadioButton';

const baseClass = 'lc-radio-button';
const onChange = jest.fn();

describe('<RadioButton> component', () => {
  it('should allow for custom class', () => {
    const { container } = render(
      <RadioButton className="my-css-class">test</RadioButton>
    );
    expect(container.firstChild).toHaveClass('my-css-class');
  });

  it('should not have been checked or disabled by default', () => {
    const { container } = render(<RadioButton>test</RadioButton>);
    expect(container.firstChild).not.toHaveClass(`${baseClass}--selected`);
    expect(container.firstChild).not.toHaveClass(`${baseClass}--disabled`);
  });

  it('should have secondary class when used with secondary prop', () => {
    const { container } = render(
      <RadioButton checked disabled>
        test
      </RadioButton>
    );
    expect(container.firstChild).toHaveClass(`${baseClass}--selected`);
    expect(container.firstChild).toHaveClass(`${baseClass}--disabled`);
  });

  it('should call onChange method', () => {
    const { getByRole } = render(
      <RadioButton onChange={onChange}>test</RadioButton>
    );
    userEvent.click(getByRole('radio'));
    expect(onChange).toBeCalledTimes(1);
  });

  it('should not call onChange method when checked', () => {
    const { getByRole } = render(
      <RadioButton checked onChange={onChange}>
        test
      </RadioButton>
    );
    userEvent.click(getByRole('radio'));
    expect(onChange).not.toBeCalled();
  });

  it('should not call onChange method when disabled', () => {
    const { getByRole } = render(
      <RadioButton disabled onChange={onChange}>
        test
      </RadioButton>
    );
    userEvent.click(getByRole('radio'));
    expect(onChange).not.toBeCalled();
  });
});
