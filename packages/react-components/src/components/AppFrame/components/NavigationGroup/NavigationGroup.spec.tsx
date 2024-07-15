import * as React from 'react';

import { render } from 'test-utils';

import { NavigationGroup } from './NavigationGroup';
import { INavigationGroupProps } from './types';

const defaultProps: INavigationGroupProps = {
  children: <div>Navigation element</div>,
};

const renderComponent = (props: INavigationGroupProps) => {
  return render(<NavigationGroup {...props} />);
};

describe('<NavigationGroup> component', () => {
  it('should allow for custom class', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      className: 'custom-class',
    });

    expect(getByRole('list')).toHaveClass('custom-class');
  });

  it('should render children', () => {
    const { getByText } = renderComponent(defaultProps);

    expect(getByText('Navigation element')).toBeInTheDocument();
  });

  it('should pass additional props', () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      'data-testid': 'navigation-test',
    });

    expect(getByTestId('navigation-test')).toBeInTheDocument();
  });
});
