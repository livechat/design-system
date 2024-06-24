import { render } from 'test-utils';

import { ProgressBar, ProgressBarProps } from './ProgressBar';

const defaultProps = {
  percent: 10,
};

const renderComponent = (props: ProgressBarProps) =>
  render(<ProgressBar {...props} />);

describe('<ProgressBar> component', () => {
  it('should allow for custom class', () => {
    const { container } = renderComponent({
      ...defaultProps,
      className: 'custom-class',
    });

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should apply correct width for progress indicator', () => {
    const { getByTestId, rerender } = renderComponent(defaultProps);

    expect(getByTestId('progress-bar-indicator')).toHaveStyle('width: 10%');
    rerender(<ProgressBar percent={20} />);
    expect(getByTestId('progress-bar-indicator')).toHaveStyle('width: 20%');
  });
});
