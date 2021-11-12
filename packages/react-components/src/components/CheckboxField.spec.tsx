import * as React from 'react';
import { render, userEvent } from '../test-utils';
import { CheckboxField } from './CheckboxField';

const baseClass = 'lc-checkbox';
const onChange = jest.fn();

describe('<CheckboxField> component', () => {
  it('should allow for custom class', () => {
    const { container } = render(
      <CheckboxField className="my-css-class">test</CheckboxField>
    );
    expect(container.firstChild).toHaveClass('my-css-class');
  });

  it('should not have been checked or disabled by default', () => {
    const { container } = render(<CheckboxField>test</CheckboxField>);
    expect(container.firstChild).not.toHaveClass(`${baseClass}--selected`);
    expect(container.firstChild).not.toHaveClass(`${baseClass}--disabled`);
  });

  it('should have checked and disabled classes when mentioned props are applied', () => {
    const { container } = render(
      <CheckboxField checked disabled>
        test
      </CheckboxField>
    );
    expect(container.firstChild).toHaveClass(`${baseClass}--selected`);
    expect(container.firstChild).toHaveClass(`${baseClass}--disabled`);
  });

  it('should call onChange method', () => {
    const { getByRole } = render(
      <CheckboxField onChange={onChange}>test</CheckboxField>
    );
    userEvent.click(getByRole('checkbox'));
    expect(onChange).toBeCalledTimes(1);
  });

  it('should not call onChange method when disabled', () => {
    const { getByRole } = render(
      <CheckboxField disabled onChange={onChange}>
        test
      </CheckboxField>
    );
    userEvent.click(getByRole('checkbox'));
    expect(onChange).not.toBeCalled();
  });
});
