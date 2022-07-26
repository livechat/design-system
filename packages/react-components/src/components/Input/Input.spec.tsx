import * as React from 'react';
import { render } from 'test-utils';
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

  it('should allow for xsmall size', () => {
    const { container } = render(<Input size="xsmall" />);
    expect(container.firstChild).toHaveClass(styles['input--xsmall']);
  });

  it('should allow for small size', () => {
    const { container } = render(<Input size="small" />);
    expect(container.firstChild).toHaveClass(styles['input--small']);
  });

  it('should allow for medium size', () => {
    const { container } = render(<Input size="medium" />);
    expect(container.firstChild).toHaveClass(styles['input--medium']);
  });

  it('should allow for large size', () => {
    const { container } = render(<Input size="large" />);
    expect(container.firstChild).toHaveClass(styles['input--large']);
  });

  it('should have error class on error', () => {
    const { container } = render(<Input error />);
    expect(container.firstChild).toHaveClass(styles['input--error']);
  });
});
