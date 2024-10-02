import { render } from 'test-utils';

import { Tab, TabProps } from './Tab';

const renderComponent = (props: TabProps) =>
  render(<Tab {...props}>Hello</Tab>);

describe('<Tab> component', () => {
  it('should allow for custom class', () => {
    const { getByRole } = renderComponent({ className: 'custom-class' });

    expect(getByRole('button')).toHaveClass('custom-class');
  });

  it('should render unselected Tab by default', () => {
    const { getByRole } = renderComponent({});

    expect(getByRole('button')).not.toHaveAttribute('aria-selected');
  });

  it('should render selected Tab if isSelected is provided', () => {
    const { getByRole } = renderComponent({ isSelected: true });

    expect(getByRole('button')).toHaveAttribute('aria-selected', 'true');
  });

  it('should render disabled Tab if disabled is provided', () => {
    const { getByRole } = renderComponent({ disabled: true });

    expect(getByRole('button')).toBeDisabled();
  });

  it('should render properly formatted counter', () => {
    const { getByRole } = renderComponent({ count: 1 });

    expect(getByRole('button')).toHaveTextContent('(1)');
  });

  it('should render properly formatted counter as a badge', () => {
    const { getByTestId } = renderComponent({ count: 1, asBadge: true });

    expect(getByTestId('tab-badge')).toBeInTheDocument();
  });

  it('should render with anchor element if href is provided', () => {
    const { getByRole } = renderComponent({ href: 'http://example.com' });
    const link = getByRole('link');

    expect(link).toHaveTextContent('Hello');
    expect(link).toHaveAttribute('href', 'http://example.com');
  });

  it('should render icon if provided', () => {
    const { getByTestId } = renderComponent({ icon: <div>Icon</div> });

    expect(getByTestId('icon')).toBeInTheDocument();
  });
});
