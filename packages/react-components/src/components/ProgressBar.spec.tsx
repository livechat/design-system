import * as React from 'react';

import { render } from '../test-utils';
import { ProgressStatus } from './constants';
import { ProgressBar } from './ProgressBar';

describe('<ProgressBar /> component', () => {
  it('should render normal ProgressBar by default', () => {
    const { container } = render(<ProgressBar percent={10} />);
    expect(container.firstChild).toHaveClass('lc-progress-bar');
    expect(container.firstChild).toHaveClass('lc-progress-bar--normal');
  });

  it('should render success ProgressBar when success status is passed', () => {
    const { container } = render(
      <ProgressBar status={ProgressStatus.Success} percent={10} />
    );
    expect(container.firstChild).toHaveClass('lc-progress-bar--success');
  });

  it('should render error ProgressBar when error status is passed', () => {
    const { container } = render(
      <ProgressBar status={ProgressStatus.Error} percent={10} />
    );
    expect(container.firstChild).toHaveClass('lc-progress-bar--error');
  });
});
