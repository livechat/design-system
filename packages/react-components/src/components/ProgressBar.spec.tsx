import * as React from 'react';
import { render } from '../test-utils';
import { ProgressBar } from './ProgressBar';

describe('<ProgressBar /> component', () => {
  it('should render  ProgressBar by default', () => {
    const { container } = render(<ProgressBar percent={10} />);
    expect(container.firstChild).toHaveClass('progress-bar');
  });
});
