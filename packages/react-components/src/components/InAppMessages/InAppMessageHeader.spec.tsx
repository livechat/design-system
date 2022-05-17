import * as React from 'react';
import { render, vi } from 'test-utils';
import { InAppMessageHeader } from './InAppMessageHeader';

describe('<InAppMessageHeader> component', () => {
  it('should render with button only', () => {
    const { container, getByRole } = render(
      <InAppMessageHeader onCloseButtonClick={vi.fn()} />
    );
    expect(container.firstChild).toBeVisible();
    expect(getByRole('button')).toBeVisible();
  });

  it('should render with text', () => {
    const { getByText } = render(
      <InAppMessageHeader
        onCloseButtonClick={vi.fn()}
        text={<React.Fragment>Example text</React.Fragment>}
      />
    );
    expect(getByText('Example text')).toBeVisible();
  });

  it('should render with avatar', () => {
    const { getByRole } = render(
      <InAppMessageHeader
        onCloseButtonClick={vi.fn()}
        avatar={{
          src: 'https://avatars2.githubusercontent.com/u/29309941?s=88&v=4',
          alt: 'Agent',
        }}
      />
    );
    expect(getByRole('img')).toBeVisible();
  });
});
