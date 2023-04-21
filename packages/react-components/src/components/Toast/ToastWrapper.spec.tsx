import * as React from 'react';
import { render } from 'test-utils';
import { ToastWrapper } from './ToastWrapper';

describe('<ToastWrapper> component', () => {
  it('should allow for custom class', () => {
    const { container } = render(
      <ToastWrapper toasts={[]} className="my-css-class" />
    );

    expect(container.firstChild).toHaveClass('my-css-class');
  });
});
