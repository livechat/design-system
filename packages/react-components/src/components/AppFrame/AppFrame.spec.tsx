import * as React from 'react';

import { render, vi } from 'test-utils';

import { AppFrame } from './AppFrame';
import {
  Navigation,
  NavigationItem,
  SideNavigation,
  SideNavigationItem,
} from './components';
import { IAppFrameProps } from './types';

const sideNavigation = (
  <SideNavigation data-testid="side-navigation">
    <SideNavigationItem label="Side navigation element" onClick={vi.fn()} />
  </SideNavigation>
);

const defaultProps = {
  children: <div>App content</div>,
  navigation: (
    <Navigation data-testid="navigation">
      <NavigationItem
        id="item-1"
        label="Item 1"
        icon={<div>Icon</div>}
        url="#"
        onClick={vi.fn()}
      />
    </Navigation>
  ),
};

const renderComponent = (props: IAppFrameProps) => {
  return render(<AppFrame {...props} />);
};

describe('<AppFrame> component', () => {
  it('should allow for custom class', () => {
    const { container } = renderComponent({
      ...defaultProps,
      className: 'custom-class',
    });

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should render with given navigation', () => {
    const { getByTestId } = renderComponent(defaultProps);

    expect(getByTestId('navigation')).toBeInTheDocument();
  });

  it('should render with top bar if provided', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      topBar: <div>Top bar</div>,
    });

    expect(getByText('Top bar')).toBeInTheDocument();
  });

  it('should allow for custom class for top bar container', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      topBar: <div>Top bar</div>,
      topBarClassName: 'custom-class',
    });

    expect(getByText('Top bar').parentElement).toHaveClass('custom-class');
  });

  it('should render with side navigation if provided', () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      sideNavigation: sideNavigation,
    });

    expect(getByTestId('side-navigation')).toBeInTheDocument();
  });

  it('should allow for custom class for side navigation container', () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      sideNavigation: sideNavigation,
      sideNavigationContainerClassName: 'custom-class',
    });

    expect(getByTestId('side-navigation').parentElement).toHaveClass(
      'custom-class'
    );
  });

  it('should allow for custom class for content container', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      contentClassName: 'custom-class',
    });

    expect(getByText('App content').parentElement).toHaveClass('custom-class');
  });
});
