import { render } from 'test-utils';

import { MobileNavigation } from './MobileNavigation';
import { IMobileNavigationProps } from './types';

const defaultProps: IMobileNavigationProps = {
  children: <div>Mobile navigation content</div>,
};

const renderComponent = (props: IMobileNavigationProps) => {
  return render(<MobileNavigation {...props} />);
};

describe('<MobileNavigation> component', () => {
  it('should allow for custom class', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      className: 'custom-class',
    });

    expect(getByRole('navigation')).toHaveClass('custom-class');
  });

  it('should render children', () => {
    const { getByText } = renderComponent(defaultProps);

    expect(getByText('Mobile navigation content')).toBeInTheDocument();
  });

  it('should pass additional props', () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      'data-testid': 'mobile-navigation-test',
    });

    expect(getByTestId('mobile-navigation-test')).toBeInTheDocument();
  });
});
