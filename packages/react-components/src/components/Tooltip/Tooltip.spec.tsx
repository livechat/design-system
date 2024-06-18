import * as React from 'react';

import { vi } from 'vitest';

import { render, waitFor, userEvent } from 'test-utils';

import { Tooltip } from './Tooltip';
import { ITooltipProps } from './types';

const defaultProps = {
  triggerRenderer: <button>Open</button>,
};

const renderComponent = (props: ITooltipProps) => {
  return render(<Tooltip {...props}>Test tooltip</Tooltip>);
};

describe('<Tooltip> component', () => {
  it('should allow for custom class', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      className: 'custom-class',
      isVisible: true,
    });

    expect(getByRole('tooltip')).toHaveClass('custom-class');
  });

  it('should allow for custom class for trigger wrapper', () => {
    const { getByTestId } = renderComponent({
      ...defaultProps,
      triggerClassName: 'trigger-custom-class',
    });

    expect(getByTestId('tooltip-trigger')).toHaveClass('trigger-custom-class');
  });

  it('should show tooltip on mouse hover and hide it on mouse leave', async () => {
    const { queryByRole, getByRole } = renderComponent(defaultProps);
    const button = getByRole('button');

    expect(queryByRole('tooltip')).not.toBeInTheDocument();
    userEvent.hover(button);
    expect(queryByRole('tooltip')).toBeInTheDocument();
    userEvent.unhover(button);
    await waitFor(() => {
      expect(queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  it(`shouldn't show tooltip on hover when isVisible prop is set to false`, () => {
    const { queryByRole, getByRole } = renderComponent({
      ...defaultProps,
      isVisible: false,
    });

    userEvent.hover(getByRole('button'));
    expect(queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it(`should show tooltip when isVisible prop is set to true`, () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      isVisible: true,
    });

    expect(getByRole('tooltip')).toBeInTheDocument();
  });

  it(`should show tooltip on trigger click and hide it on second click`, async () => {
    const { queryByRole, getByRole } = renderComponent({
      ...defaultProps,
      triggerOnClick: true,
    });
    const button = getByRole('button');

    userEvent.click(button);
    expect(queryByRole('tooltip')).toBeInTheDocument();
    userEvent.click(button);
    await waitFor(() => {
      expect(queryByRole('tooltip')).not.toBeInTheDocument();
    });
  });

  it('should call onOpen and onClose callbacks when visibility changes on hover action', async () => {
    const onOpen = vi.fn();
    const onClose = vi.fn();
    const { getByRole, queryByRole } = renderComponent({
      ...defaultProps,
      onOpen,
      onClose,
    });
    const button = getByRole('button');

    userEvent.hover(button);
    expect(queryByRole('tooltip')).toBeInTheDocument();
    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
    userEvent.unhover(button);
    await waitFor(() => {
      expect(queryByRole('tooltip')).not.toBeInTheDocument();
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  it('should not call onOpen callback redundantly when hovering from trigger element to tooltip', () => {
    const onOpen = vi.fn();
    const onClose = vi.fn();
    const { getByRole, queryByRole } = renderComponent({
      ...defaultProps,
      onOpen,
      onClose,
    });
    const button = getByRole('button');

    userEvent.hover(button);
    expect(queryByRole('tooltip')).toBeInTheDocument();
    userEvent.hover(queryByRole('tooltip') as HTMLElement);
    userEvent.hover(button);

    expect(onOpen).toHaveBeenCalledTimes(1);
    expect(onClose).not.toHaveBeenCalled();
  });
});
