import * as React from 'react';

import { render } from 'test-utils';

import { SideNavigation } from './SideNavigation';
import { ISideNavigationProps } from './types';

const defaultProps = {
  children: <div>Side navigation content</div>,
};

const renderComponent = (props: ISideNavigationProps) => {
  return render(<SideNavigation {...props} />);
};

describe('<SideNavigation> component', () => {
  it('should allow for custom class', () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      className: 'custom-class',
    });

    expect(getByTestId('side-navigation')).toHaveClass('custom-class');
  });

  it('should render children', () => {
    const { getByText } = renderComponent(defaultProps);

    expect(getByText('Side navigation content')).toBeInTheDocument();
  });

  it('should render title as string', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      title: 'Side navigation title',
    });

    expect(getByText('Side navigation title')).toBeInTheDocument();
  });

  it('should render custom header', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      customHeader: <div>Custom header</div>,
    });

    expect(getByText('Custom header')).toBeInTheDocument();
  });

  it('should render custom footer', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      customFooter: <div>Custom footer</div>,
    });

    expect(getByText('Custom footer')).toBeInTheDocument();
  });

  it('should render right node if given', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      title: 'Side navigation title',
      rightNode: <div>Right node</div>,
    });

    expect(getByText('Side navigation title')).toBeInTheDocument();
    expect(getByText('Right node')).toBeInTheDocument();
  });
});
