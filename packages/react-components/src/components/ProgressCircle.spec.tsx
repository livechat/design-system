import * as React from 'react';
import { render } from '../test-utils';
import { ProgressStatus } from './constants';
import { ProgressCircle } from './ProgressCircle';

describe('<ProgressCircle /> component', () => {
  it('should render  ProgressCircle by default', () => {
    const { getByRole } = render(<ProgressCircle percent={10} />);
    expect(getByRole('progressbar')).toHaveClass('lc-progress-circle');
    expect(getByRole('progressbar')).toHaveClass('lc-progress-circle--normal');
  });

  it('should render success ProgressCircle when success status is passed', () => {
    const { getByRole } = render(
      <ProgressCircle status={ProgressStatus.Success} percent={10} />
    );
    expect(getByRole('progressbar')).toHaveClass('lc-progress-circle--success');
  });

  it('should render error ProgressCircle when error status is passed', () => {
    const { getByRole } = render(
      <ProgressCircle status={ProgressStatus.Error} percent={10} />
    );
    expect(getByRole('progressbar')).toHaveClass('lc-progress-circle--error');
  });
});
