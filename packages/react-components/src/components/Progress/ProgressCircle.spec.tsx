import { render } from 'test-utils';

import { ProgressCircle } from './ProgressCircle';

describe('<ProgressCircle> component', () => {
  it('should allow for custom class ', () => {
    const { getByRole } = render(
      <ProgressCircle className="custom-class" progressValue={10} />
    );

    expect(getByRole('progressbar')).toHaveClass('custom-class');
  });
});
