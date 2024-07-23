import * as React from 'react';

import { render, userEvent, vi } from 'test-utils';

import { SideNavigationGroup } from './SideNavigationGroup';
import { ISideNavigationGroupProps } from './types';

const defaultProps = {
  children: <div>Side navigation group content</div>,
};

const renderComponent = (props: ISideNavigationGroupProps) => {
  return render(<SideNavigationGroup {...props} />);
};

describe('<SideNavigationGroup> component', () => {
  it('should allow for custom class', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      className: 'custom-class',
    });

    expect(getByRole('list')).toHaveClass('custom-class');
  });

  it('should render children', () => {
    const { getByText } = renderComponent(defaultProps);

    expect(getByText('Side navigation group content')).toBeInTheDocument();
  });

  it('should render label as provided element', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      label: <div>Side navigation label</div>,
    });

    expect(getByText('Side navigation label')).toBeInTheDocument();
  });

  it('should render label as provided function includes state change when isCollapsible is set true', () => {
    const handleLabel = (isOpen: boolean) => (
      <div data-testid="toggle">{isOpen ? 'Opened label' : 'Closed label'}</div>
    );
    const { getByTestId } = renderComponent({
      ...defaultProps,
      isCollapsible: true,
      label: handleLabel,
    });
    const toggle = getByTestId('toggle');

    expect(toggle).toHaveTextContent('Closed label');
    userEvent.click(toggle);
    expect(toggle).toHaveTextContent('Opened label');
  });

  it('should render rightNode as provided element if isCollapsible is set true', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      isCollapsible: true,
      rightNode: <div>Right node</div>,
    });

    expect(getByText('Right node')).toBeInTheDocument();
  });

  it('should render rightNode as provided function includes state change when isCollapsible is set true', () => {
    const handleRightNode = (isOpen: boolean) => (
      <div data-testid="toggle">{isOpen ? 'Opened node' : 'Closed node'}</div>
    );
    const { getByTestId } = renderComponent({
      ...defaultProps,
      isCollapsible: true,
      rightNode: handleRightNode,
    });
    const toggle = getByTestId('toggle');

    expect(toggle).toHaveTextContent('Closed node');
    userEvent.click(toggle);
    expect(toggle).toHaveTextContent('Opened node');
  });

  it('should call onItemHover when provided if user hovers the label', () => {
    const onItemHover = vi.fn();
    const { getByText } = renderComponent({
      ...defaultProps,
      label: <div>Side navigation label</div>,
      onItemHover,
    });

    userEvent.hover(getByText('Side navigation label'));
    expect(onItemHover).toHaveBeenCalledTimes(1);
  });
});
