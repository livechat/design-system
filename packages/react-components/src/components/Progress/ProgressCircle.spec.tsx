import * as React from 'react';
import { render } from 'test-utils';
import { ProgressStatus } from './constants';
import { ProgressCircle } from './ProgressCircle';

import styles from './ProgressCircle.module.scss';

describe('<ProgressCircle /> component', () => {
  it('should render  ProgressCircle by default', () => {
    const { getByRole } = render(<ProgressCircle percent={10} />);
    expect(getByRole('progressbar')).toHaveClass(styles['progress-circle']);
    expect(getByRole('progressbar')).toHaveClass(
      styles['progress-circle--normal']
    );
  });

  it('should render success ProgressCircle when success status is passed', () => {
    const { getByRole } = render(
      <ProgressCircle status={ProgressStatus.Success} percent={10} />
    );
    expect(getByRole('progressbar')).toHaveClass(
      styles['progress-circle--success']
    );
  });

  it('should render error ProgressCircle when error status is passed', () => {
    const { getByRole } = render(
      <ProgressCircle status={ProgressStatus.Error} percent={10} />
    );
    expect(getByRole('progressbar')).toHaveClass(
      styles['progress-circle--error']
    );
  });
});
