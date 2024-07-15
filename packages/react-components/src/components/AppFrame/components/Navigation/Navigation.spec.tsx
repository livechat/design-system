import * as React from 'react';

import { render } from 'test-utils';

import { Navigation } from './Navigation';
import { INavigationProps } from './types';

const defaultProps: INavigationProps = {
  children: <div>Navigation content</div>,
};

const renderComponent = (props: INavigationProps) => {
  return render(<Navigation {...props} />);
};

describe('<Navigation> component', () => {
  it('should allow for custom class', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      className: 'custom-class',
    });

    expect(getByRole('navigation')).toHaveClass('custom-class');
  });

  it('should render children', () => {
    const { getByText } = renderComponent(defaultProps);

    expect(getByText('Navigation content')).toBeInTheDocument();
  });

  it('should pass additional props', () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      'data-testid': 'navigation-test',
    });

    expect(getByTestId('navigation-test')).toBeInTheDocument();
  });
});
