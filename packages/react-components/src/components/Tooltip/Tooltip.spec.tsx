import * as React from 'react';

import { vi } from 'vitest';

import { render, cleanup, waitFor, userEvent } from 'test-utils';

import { Tooltip } from './Tooltip';
import { ITooltipProps } from './types';

import styles from './Tooltip.module.scss';

const defaultProps = {
  hoverOutDelayTimeout: 0,
  withFadeAnimation: false,
  triggerRenderer: <button>Open</button>,
};

const renderComponent = (props: ITooltipProps) => {
  return render(<Tooltip {...props}>Test tooltip</Tooltip>);
};

describe('<Tooltip> component', () => {
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

    cleanup();
  });

  it(`shouldn't show tooltip on hover when isVisible prop is set to false`, () => {
    const { queryByRole, getByRole } = renderComponent({
      ...defaultProps,
      isVisible: false,
    });

    userEvent.hover(getByRole('button', { name: 'Open' }));
    expect(queryByRole('tooltip')).not.toBeInTheDocument();

    cleanup();
  });

  it(`should show tooltip when isVisible prop is set to true`, () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      isVisible: true,
    });

    expect(getByRole('tooltip')).toBeInTheDocument();

    cleanup();
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

    cleanup();
  });

  it('should have proper theme atribute for important theme', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      isVisible: true,
      kind: 'important',
    });

    const tooltip = getByRole('tooltip');
    expect(tooltip).toHaveClass(styles['tooltip--important']);

    cleanup();
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
    expect(onOpen).toBeCalledTimes(1);
    expect(onClose).not.toBeCalled();
    userEvent.unhover(button);
    await waitFor(() => {
      expect(queryByRole('tooltip')).not.toBeInTheDocument();
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    cleanup();
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
    userEvent.hover(queryByRole('tooltip')!);
    userEvent.hover(button);

    expect(onOpen).toBeCalledTimes(1);
    expect(onClose).not.toBeCalled();

    cleanup();
  });
});
