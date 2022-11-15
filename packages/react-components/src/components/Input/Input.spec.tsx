import * as React from 'react';
import { fireEvent, render } from 'test-utils';
import { Input } from './Input';

import styles from './Input.module.scss';

describe('<Input> component', () => {
  it('should allow for custom class', () => {
    const { container } = render(<Input className="my-css-class" />);
    expect(container.firstChild).toHaveClass('my-css-class');
  });

  it('should have default medium size', () => {
    const { container } = render(<Input className="my-css-class" />);
    expect(container.firstChild).toHaveClass(styles['input--medium']);
  });

  it('should allow for compact size', () => {
    const { container } = render(<Input inputSize="compact" />);
    expect(container.firstChild).toHaveClass(styles['input--compact']);
  });

  it('should allow for medium size', () => {
    const { container } = render(<Input inputSize="medium" />);
    expect(container.firstChild).toHaveClass(styles['input--medium']);
  });

  it('should allow for large size', () => {
    const { container } = render(<Input inputSize="large" />);
    expect(container.firstChild).toHaveClass(styles['input--large']);
  });

  it('should have error class on error', () => {
    const { container } = render(<Input error />);
    expect(container.firstChild).toHaveClass(styles['input--error']);
  });

  it('should have disabled class and input should be disabled if "disabled" prop is set', () => {
    const { container, getByTestId } = render(<Input disabled />);
    expect(container.firstChild).toHaveClass(styles['input--disabled']);
    expect(container.firstChild).toHaveAttribute('aria-disabled', 'true');
    expect(getByTestId('input')).toHaveAttribute('disabled');
  });

  it('should have custom placeholder text if it is set', () => {
    const { getByTestId } = render(<Input placeholder="Custom placeholder" />);
    expect(getByTestId('input')).toHaveAttribute(
      'placeholder',
      'Custom placeholder'
    );
  });

  it('should have text type input as default', () => {
    const { getByTestId } = render(<Input />);
    expect(getByTestId('input')).toHaveAttribute('type', 'text');
  });

  it('should have password type input if kind "password" is set', () => {
    const { getByTestId } = render(<Input type="password" />);
    expect(getByTestId('input')).toHaveAttribute('type', 'password');
  });

  it('should change the input type if show password icon is clicked', () => {
    const { getByTestId, getByRole } = render(<Input type="password" />);
    const input = getByTestId('input');
    const button = getByRole('button');

    expect(input).toHaveAttribute('type', 'password');
    fireEvent.click(button);
    expect(input).toHaveAttribute('type', 'text');
    fireEvent.click(button);
    expect(input).toHaveAttribute('type', 'password');
  });
});
