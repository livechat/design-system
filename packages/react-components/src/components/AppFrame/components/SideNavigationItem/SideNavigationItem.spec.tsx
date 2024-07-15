import * as React from 'react';

import { render, userEvent, vi } from 'test-utils';

import { SideNavigationItem } from './SideNavigationItem';
import { ISideNavigationItemProps } from './types';

const defaultProps = {
  label: 'Side navigation item label',
  onClick: vi.fn(),
};

const renderComponent = (props: ISideNavigationItemProps) => {
  return render(<SideNavigationItem {...props} />);
};

describe('<SideNavigationItem> component', () => {
  it('should allow for custom class', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      className: 'custom-class',
    });

    expect(getByRole('listitem')).toHaveClass('custom-class');
  });

  it('should render with label', () => {
    const { getByText } = renderComponent(defaultProps);

    expect(getByText('Side navigation item label')).toBeInTheDocument();
  });

  it('should render with leftNode and righNode if provided', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      leftNode: <div>Left node</div>,
      rightNode: <div>Right node</div>,
    });

    expect(getByText('Left node')).toBeInTheDocument();
    expect(getByText('Right node')).toBeInTheDocument();
  });

  it('should call onClick handler when clicked and onItemHover if user hovers the item', () => {
    const onClick = vi.fn();
    const onItemHover = vi.fn();
    const { getByText } = renderComponent({
      ...defaultProps,
      onClick,
      onItemHover,
    });
    const link = getByText('Side navigation item label');

    userEvent.hover(link);
    expect(onItemHover).toHaveBeenCalledTimes(1);
    userEvent.click(link);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
