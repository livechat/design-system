import * as React from 'react';

import { vi } from 'vitest';

import { render, userEvent } from 'test-utils';

import { NavigationItem } from './NavigationItem';
import { INavigationItemProps } from './types';

const defaultProps: INavigationItemProps = {
  id: 'nav-item',
  label: 'Navigation label',
  icon: <div>Icon</div>,
  url: '/navigation',
  onClick: vi.fn(),
};

const renderComponent = (props: INavigationItemProps) => {
  return render(<NavigationItem {...props} />);
};

describe('<NavigationItem> component', () => {
  it('should allow for custom class', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      className: 'custom-class',
    });

    expect(getByRole('listitem')).toHaveClass('custom-class');
  });

  it('should render element with required props', () => {
    const { getByRole, getByText } = renderComponent(defaultProps);
    const link = getByRole('link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('aria-label', 'Navigation label');
    expect(link).toHaveAttribute('href', '/navigation');
    expect(getByText('Icon')).toBeInTheDocument();
  });

  it('should pass additional props', () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      'data-testid': 'navigation-test',
    });

    expect(getByTestId('navigation-test')).toBeInTheDocument();
  });

  it('should trigger onClick callback', () => {
    const { getByRole } = renderComponent(defaultProps);
    const link = getByRole('link');

    userEvent.click(link);
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
    expect(defaultProps.onClick).toHaveBeenCalledWith(
      expect.anything(),
      'nav-item'
    );
  });

  it('should render badge with number', () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      badge: 5,
    });
    const badge = getByTestId('nav-item-badge-count');

    expect(badge).toBeInTheDocument();
    expect(badge).toHaveTextContent('5');
  });

  it('should render badge with given type', () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      badge: 'alert',
    });
    const badge = getByTestId('nav-item-badge');

    expect(badge).toBeInTheDocument();
  });
});
