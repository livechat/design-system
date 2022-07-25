import * as React from 'react';
import { render } from 'test-utils';

import { Badge } from './Badge';
import styles from './Badge.module.scss';

describe('Badge', () => {
  it('should accept custom className', () => {
    const { container } = render(<Badge className="my-custom-class" />);

    expect(container.firstChild).toHaveClass('my-custom-class');
  });

  it('should display content passed as children by default', () => {
    const content = '3 steps left';
    const { container } = render(<Badge>{content}</Badge>);

    expect(container).toHaveTextContent(content);
  });

  it('should display exclamation mark for alert type', () => {
    const { container } = render(<Badge type="alert" />);

    expect(container).toHaveTextContent('!');
  });

  it('should display dot content for dot type', () => {
    const { container } = render(<Badge type="dot" />);

    expect(container.querySelector(`.${styles['badge__dot']}`)).toBeVisible();
  });
});
