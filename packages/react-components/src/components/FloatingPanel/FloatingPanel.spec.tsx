import { render } from 'test-utils';

import { FloatingPanel } from './FloatingPanel';
import { IFloatingPanelProps } from './types';

const renderComponent = (props: IFloatingPanelProps) => {
  return render(<FloatingPanel {...props} />);
};

describe('<FloatingPanel> component', () => {
  it('should not be visible by default', () => {
    const { container } = renderComponent({});

    expect(container.firstChild).not.toBeInTheDocument();
  });

  it('should be visible if isVisible is true', () => {
    const { container } = renderComponent({
      isVisible: true,
    });

    expect(container.firstChild).toBeInTheDocument();
    expect(container.firstChild).toHaveAttribute('aria-visible', 'true');
  });

  it('should render children', () => {
    const { container } = renderComponent({
      isVisible: true,
      children: <div>Test</div>,
    });

    expect(container.firstChild).toHaveTextContent('Test');
  });
});
