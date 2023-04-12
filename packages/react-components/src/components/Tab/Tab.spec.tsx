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

  it("should render disabled Tab if 'disabled' is provided", () => {
    const { getByText } = render(<Tab disabled>Hello</Tab>);
    expect(getByText('Hello')).toHaveClass(styles['tab--disabled']);
  });

  it('should render Tab with medium size by default', () => {
    const { getByText } = render(<Tab>Hello</Tab>);
    expect(getByText('Hello')).toHaveClass(styles['tab--medium']);
  });

  it('should render Tab with compact size', () => {
    const { getByText } = render(<Tab size="compact">Hello</Tab>);
    expect(getByText('Hello')).toHaveClass(styles['tab--compact']);
  });

  it('should render Tab with large size', () => {
    const { getByText } = render(<Tab size="large">Hello</Tab>);
    expect(getByText('Hello')).toHaveClass(styles['tab--large']);
  });

  it('should render properly formatted counter', () => {
    const { getByText } = render(<Tab count={1}>Hello</Tab>);
    expect(getByText('(1)')).toBeVisible();
  });
  it('should render properly formatted counter as a badge', () => {
    const { getByTestId } = render(
      <Tab count={1} asBadge>
        Hello
      </Tab>
    );
    expect(getByTestId('tab-badge')).toBeVisible();
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
