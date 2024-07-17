import * as React from 'react';

import { render, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { vi } from 'vitest';

import { GlobalAlert, IGlobalAlertProps } from './GlobalAlert';

describe('GlobalAlert', () => {
  const label = 'Test Alert';
  const onClose = vi.fn();
  const onVisibilityChange = vi.fn();

  const renderComponent = (props: IGlobalAlertProps) => {
    return render(<GlobalAlert {...props}>My alert description</GlobalAlert>);
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  test('renders with required props', () => {
    const { getByText, getByLabelText } = renderComponent({ label });

    expect(getByText(label)).toBeInTheDocument();
    expect(getByLabelText('Expand alert')).toBeInTheDocument();
  });

  test('toggles visibility when collapsable', () => {
    const { getByLabelText, getByText, queryByLabelText } = renderComponent({
      label,
      collapsable: true,
    });

    // Initially collapsed
    expect(getByLabelText('Expand alert')).toBeInTheDocument();

    userEvent.click(getByLabelText('Expand alert'));
    expect(getByText('My alert description')).toBeInTheDocument();
    expect(queryByLabelText('Expand alert')).not.toBeInTheDocument();
    expect(getByLabelText('Collapse alert')).toBeInTheDocument();

    userEvent.click(getByLabelText('Collapse alert'));
    expect(queryByLabelText('My alert description')).not.toBeInTheDocument();
  });

  test('handles mouse enter and leave events', async () => {
    vi.useFakeTimers();
    const { getByText, getByLabelText } = renderComponent({
      label,
      hoverDelay: 400,
    });

    const alert = getByText(label).closest('div') as Element;

    userEvent.hover(alert);
    vi.advanceTimersByTime(400);
    await waitFor(() => {
      expect(getByLabelText('Collapse alert')).toBeInTheDocument();
    });

    userEvent.unhover(alert);
    vi.advanceTimersByTime(400);
    await waitFor(() => {
      expect(getByLabelText('Expand alert')).toBeInTheDocument();
    });

    vi.useRealTimers();
  });

  test('triggers onClose callback', () => {
    const { getByTestId } = renderComponent({ label, onClose });

    const closeButton = getByTestId('close-alert');
    userEvent.click(closeButton);

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test('triggers onVisibilityChange callback', () => {
    const { getByLabelText } = renderComponent({
      label,
      collapsable: true,
      onVisibilityChange,
    });

    const toggleButton = getByLabelText('Expand alert');

    userEvent.click(toggleButton);
    expect(onVisibilityChange).toHaveBeenCalledWith(true);

    userEvent.click(getByLabelText('Collapse alert'));
    expect(onVisibilityChange).toHaveBeenCalledWith(false);
  });

  test('works in controlled visibility mode', () => {
    const { rerender, getByLabelText } = renderComponent({
      label,
      isVisible: false,
      onVisibilityChange,
    });

    const toggleButton = getByLabelText('Expand alert');

    userEvent.click(toggleButton);
    expect(onVisibilityChange).toHaveBeenCalledWith(true);
    expect(getByLabelText('Expand alert')).toBeInTheDocument();

    rerender(
      <GlobalAlert
        label={label}
        isVisible={true}
        onVisibilityChange={onVisibilityChange}
      />
    );
    expect(getByLabelText('Collapse alert')).toBeInTheDocument();
  });
});
