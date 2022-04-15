import * as React from 'react';

import { render } from 'test-utils';
import { ProgressBar } from './ProgressBar';

import styles from './ProgressBar.module.scss';

describe('<ProgressBar /> component', () => {
  it('should render normal ProgressBar by default', () => {
    const { getByRole } = render(<ProgressBar percent={10} />);
    expect(getByRole('progressbar')).toHaveClass(styles['progress-bar']);
    expect(getByRole('progressbar')).toHaveClass(
      styles['progress-bar--normal']
    );
  });

  it('should render success ProgressBar when success status is passed', () => {
    const { getByRole } = render(<ProgressBar status="success" percent={10} />);
    expect(getByRole('progressbar')).toHaveClass(
      styles['progress-bar--success']
    );
  });

  it('should render error ProgressBar when error status is passed', () => {
    const { getByRole } = render(<ProgressBar status="error" percent={10} />);
    expect(getByRole('progressbar')).toHaveClass(styles['progress-bar--error']);
  });
});
