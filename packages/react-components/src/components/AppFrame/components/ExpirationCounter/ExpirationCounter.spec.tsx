import * as React from 'react';

import { vi } from 'vitest';

import { render, userEvent } from 'test-utils';

import {
  ExpirationCounter,
  IExpirationCounterProps,
} from './ExpirationCounter';

const defaultProps: IExpirationCounterProps = {
  id: 'expiration-counter',
  daysLeft: 7,
  url: '/subscription',
  onClick: vi.fn(),
};

const renderComponent = (props: IExpirationCounterProps) => {
  return render(<ExpirationCounter {...props} />);
};

describe('<ExpirationCounter> component', () => {
  it('should allow for custom class', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      className: 'custom-class',
    });

    expect(getByRole('listitem')).toHaveClass('custom-class');
  });

  it('should pass additional props', () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      'data-testid': 'navigation-test',
    });

    expect(getByTestId('navigation-test')).toBeInTheDocument();
  });

  it('should render element with required props', () => {
    const { getByRole, getByText } = renderComponent(defaultProps);
    const link = getByRole('link');

    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/subscription');
    expect(getByText('days')).toBeInTheDocument();
  });

  it('should include plural word based on daysLeft', () => {
    const { getByText } = renderComponent({
      ...defaultProps,
      daysLeft: 1,
    });

    expect(getByText('day')).toBeInTheDocument();
  });

  it('should trigger onClick callback', () => {
    const { getByRole } = renderComponent(defaultProps);
    const link = getByRole('link');

    userEvent.click(link);
    expect(defaultProps.onClick).toHaveBeenCalledTimes(1);
    expect(defaultProps.onClick).toHaveBeenCalledWith(
      expect.anything(),
      'expiration-counter'
    );
  });

  it('should allow for custom class', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      className: 'custom-class',
    });

    expect(getByRole('listitem')).toHaveClass('custom-class');
  });
});
