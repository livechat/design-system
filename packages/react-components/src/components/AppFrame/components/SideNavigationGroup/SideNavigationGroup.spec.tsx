import { render, userEvent, vi, waitFor } from 'test-utils';

import { SideNavigationGroup } from './SideNavigationGroup';
import { ISideNavigationGroupProps } from './types';

const defaultProps = {
  children: (
    <>
      <li>Option 1</li>
      <li>Option 2</li>
    </>
  ),
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

    expect(getByText('Option 1')).toBeInTheDocument();
    expect(getByText('Option 2')).toBeInTheDocument();
  });

  it('should render label as provided element', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      label: <div>Side navigation label</div>,
    });

    expect(getByText('Side navigation label')).toBeInTheDocument();
  });

  it('should render label as provided function includes state change when isCollapsible is set true', async () => {
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

    await waitFor(() => {
      expect(toggle).toHaveTextContent('Opened label');
    });
  });

  it('should render rightNode as provided element if isCollapsible is set true', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      isCollapsible: true,
      rightNode: <div>Right node</div>,
    });

    expect(getByText('Right node')).toBeInTheDocument();
  });

  it('should render rightNode as provided function includes state change when isCollapsible is set true', async () => {
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

    await waitFor(() => {
      expect(toggle).toHaveTextContent('Opened node');
    });
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
