import * as React from 'react';
import userEvent from '@testing-library/user-event';
import { render, vi } from 'test-utils';
import { InAppMessageFooter } from './InAppMessageFooter';

const defaultProps = {
  primary: {
    children: 'CTA button',
    onClick: vi.fn(),
  },
  secondary: {
    children: 'Remind button',
    onClick: vi.fn(),
  },
};

describe('<InAppMessageFooter> component', () => {
  it('should render with two buttons', () => {
    const { container, getByText } = render(
      <InAppMessageFooter {...defaultProps} />
    );
    expect(container.firstChild).toBeVisible();
    expect(getByText('CTA button')).toBeVisible();
    expect(getByText('Remind button')).toBeVisible();
  });

  it('should render with one button', () => {
    const { container, getByText, queryByText } = render(
      <InAppMessageFooter {...defaultProps} secondary={undefined} />
    );
    expect(container.firstChild).toBeVisible();
    expect(getByText('CTA button')).toBeVisible();
    expect(queryByText('Remind button')).toBeFalsy();
  });

  it('should call onClick for buttons', () => {
    const ctaOnClick = vi.fn();
    const remindOnClick = vi.fn();
    const defaultProps = {
      primary: {
        children: 'CTA button',
        onClick: ctaOnClick,
      },
      secondary: {
        children: 'Remind button',
        onClick: remindOnClick,
      },
    };

    const { getByText } = render(<InAppMessageFooter {...defaultProps} />);
    userEvent.click(getByText('CTA button'));
    expect(ctaOnClick).toBeCalled();
    userEvent.click(getByText('Remind button'));
    expect(remindOnClick).toBeCalled();
  });
});
