import * as React from 'react';

import { render, userEvent, vi } from 'test-utils';

import { Checkbox } from './Checkbox';

import styles from './Checkbox.module.scss';

const baseClass = 'checkbox';

describe('<Checkbox> component', () => {
  it('should allow for custom class', () => {
    const { container } = render(
      <Checkbox className="my-css-class">test</Checkbox>
    );
    expect(container.firstChild).toHaveClass('my-css-class');
  });

  it('should not have been checked or disabled by default', () => {
    const { container } = render(<Checkbox>test</Checkbox>);
    expect(container.firstChild).not.toHaveClass(
      styles[`${baseClass}--selected`]
    );
    expect(container.firstChild).not.toHaveClass(
      styles[`${baseClass}--disabled`]
    );
  });

  it('should have checked and disabled classes when mentioned props are applied', () => {
    const { container } = render(
      <Checkbox checked disabled>
        test
      </Checkbox>
    );
    expect(container.firstChild).toHaveClass(styles[`${baseClass}--selected`]);
    expect(container.firstChild).toHaveClass(styles[`${baseClass}--disabled`]);
  });

  it('should call onChange method', () => {
    const onChange = vi.fn();

    const { getByRole } = render(<Checkbox onChange={onChange}>test</Checkbox>);
    userEvent.click(getByRole('checkbox'));
    expect(onChange).toBeCalledTimes(1);
    expect(onChange.mock.calls[0][0].target.checked).toBe(true);
  });

  it('should not call onChange method when disabled', () => {
    const onChange = vi.fn();

    const { getByRole } = render(
      <Checkbox disabled onChange={onChange}>
        test
      </Checkbox>
    );
    userEvent.click(getByRole('checkbox'));
    expect(onChange).not.toBeCalled();
  });
});
