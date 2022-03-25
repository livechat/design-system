import * as React from 'react';
import { render } from 'test-utils';
import { Tab } from './Tab';

import styles from './Tab.module.scss';

describe('<Tab /> component', () => {
  it('should render unselected Tab by default', () => {
    const { getByText } = render(<Tab>Hello</Tab>);
    expect(getByText('Hello')).not.toHaveClass(styles['tab--selected']);
  });

  it("should render selected Tab if 'isSelected' is provided", () => {
    const { getByText } = render(<Tab isSelected>Hello</Tab>);
    expect(getByText('Hello')).toHaveClass(styles['tab--selected']);
  });

  it('should render properly formatted description', () => {
    const { getByText } = render(<Tab description="1">Hello</Tab>);
    expect(getByText('(1)')).toBeVisible();
  });

  it('should render with button element by default', () => {
    const { getByRole } = render(<Tab>Hello</Tab>);
    expect(getByRole('button')).toHaveTextContent('Hello');
  });

  it("should render with anchor element if 'href' is provided", () => {
    const { getByRole } = render(<Tab href="http://example.com">Hello</Tab>);
    const link = getByRole('link');
    expect(link).toHaveTextContent('Hello');
    expect(link).toHaveAttribute('href', 'http://example.com');
  });
});
