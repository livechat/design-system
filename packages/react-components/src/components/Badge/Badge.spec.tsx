import { render } from 'test-utils';

import { Badge } from './Badge';

import styles from './Badge.module.scss';

describe('Badge', () => {
  it('should accept custom className', () => {
    const { container } = render(<Badge className="my-custom-class" />);

    expect(container.firstChild).toHaveClass('my-custom-class');
  });

  it('should display number passed as count', () => {
    const count = 1;
    const { container } = render(<Badge count={count} />);

    expect(container).toHaveTextContent(`${count}`);
  });

  it('should display number shortened to default max limit', () => {
    const count = 100;
    const { container } = render(<Badge count={count} />);

    expect(container).toHaveTextContent('99+');
  });

  it('should display number shortened to passed max limit', () => {
    const count = 10;
    const max = 9;
    const { container } = render(<Badge count={count} max={max} />);

    expect(container).toHaveTextContent(`${max}+`);
  });

  it('should display exclamation mark for alert type', () => {
    const { container } = render(<Badge type="alert" />);

    expect(container).toHaveTextContent('!');
  });

  it('should display dot content for dot type', () => {
    const { container } = render(<Badge type="dot" />);

    expect(container.querySelector(`.${styles.badge__dot}`)).toBeVisible();
  });
});
