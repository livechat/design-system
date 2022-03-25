import * as React from 'react';
import { render } from 'test-utils';

import { Badge } from './Badge';

describe('Badge', () => {
  it('should accept custom className', () => {
    const { container } = render(<Badge className="my-custom-class" />);

    expect(container.firstChild).toHaveClass('my-custom-class');
  });
});
