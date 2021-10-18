import * as React from 'react';
import { render } from '../../test-utils';
import { Badge } from './Badge';

describe('<Badge> component', () => {
  it('should allow for custom class', () => {
    const { container } = render(<Badge className="my-css-class">1</Badge>);

    expect(container.firstChild).toHaveClass('my-css-class');
  });

  it('should not have secondary class by default', () => {
    const { container } = render(<Badge>1</Badge>);

    expect(container.firstChild).not.toHaveClass('lc-badge--secondary');
  });

  it('should have secondary class when used with secondary prop', () => {
    const { container } = render(<Badge secondary>1</Badge>);

    expect(container.firstChild).toHaveClass('lc-badge--secondary');
  });
});
