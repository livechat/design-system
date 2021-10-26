import * as React from 'react';
import { render } from '../test-utils';
import { ProgressStatus } from './constants';
import { ProgressCircle } from './ProgressCircle';

describe('<ProgressCircle /> component', () => {
  it('should render  ProgressCircle by default', () => {
    const { container } = render(<ProgressCircle percent={10} />);
    expect(container.firstChild).toHaveClass('lc-progress-circle');
    expect(container.firstChild).toHaveClass('lc-progress-circle--normal');
  });

  it('should render success ProgressCircle when success status is passed', () => {
    const { container } = render(
      <ProgressCircle status={ProgressStatus.Success} percent={10} />
    );
    expect(container.firstChild).toHaveClass('lc-progress-circle--success');
  });

  it('should render error ProgressCircle when error status is passed', () => {
    const { container } = render(
      <ProgressCircle status={ProgressStatus.Error} percent={10} />
    );
    expect(container.firstChild).toHaveClass('lc-progress-circle--error');
  });
});
