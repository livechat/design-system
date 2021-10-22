import * as React from 'react';
import { render } from '../test-utils';
import { ProgressCircle } from './ProgressCircle';

describe('<ProgressCircle /> component', () => {
  it('should render  ProgressCircle by default', () => {
    const { container } = render(<ProgressCircle percent={10} />);
    expect(container.firstChild).toHaveClass('progress-circle');
  });
});
