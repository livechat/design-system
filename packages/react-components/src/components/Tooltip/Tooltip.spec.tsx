import * as React from 'react';

import { vi } from 'vitest';

import {
  render,
  fireEvent,
  cleanup,
  act,
  waitFor,
  userEvent,
} from 'test-utils';

import { Tooltip } from './Tooltip';

import styles from './Tooltip.module.scss';

describe('<Tooltip> component', () => {
  it('should show content on mouse over', async () => {
    const { container, getByRole } = render(
      <Tooltip triggerRenderer={<button>Open</button>}>
        <div style={{ width: '100px' }}> Test </div>
      </Tooltip>
    );

    await act(() => {
      userEvent.hover(getByRole('button', { name: 'Open' }));
    });

    expect(container).toHaveTextContent('Test');

    cleanup();
  });

  it(`should hide the content if we doesn't hover the button`, async () => {
    const { container, getByRole, queryByText } = render(
      <Tooltip
        hoverOutDelayTimeout={0}
        withFadeAnimation={false}
        triggerRenderer={<button>Open</button>}
      >
        <div style={{ width: '100px' }}> Test </div>
      </Tooltip>
    );

    await act(() => {
      userEvent.hover(getByRole('button', { name: 'Open' }));
    });

    expect(container).toHaveTextContent('Test');

    await act(() => {
      userEvent.unhover(getByRole('button', { name: 'Open' }));
    });

    await waitFor(
      () => {
        expect(queryByText('Test')).not.toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    cleanup();
  });

  it(`shouldn't show content on mouse over when we set isVisible=false`, async () => {
    const { container, getByRole } = render(
      <Tooltip isVisible={false} triggerRenderer={<button>Open</button>}>
        <div style={{ width: '100px' }}> Test </div>
      </Tooltip>
    );

    await act(() => {
      userEvent.hover(getByRole('button', { name: 'Open' }));
    });

    expect(container).not.toHaveTextContent('Test');
    expect(container).toHaveTextContent('Open');

    cleanup();
  });

  it(`should show content without mouse over`, () => {
    const { container } = render(
      <Tooltip isVisible={true} triggerRenderer={() => <button>Open</button>}>
        <div style={{ width: '100px' }}> Test </div>
      </Tooltip>
    );

    expect(container).toHaveTextContent('Test');
    cleanup();
  });

  it(`should show content after click and disappear after second click`, async () => {
    const buttonClick = () =>
      act(() => {
        fireEvent.click(getByRole('button', { name: 'Open' }));
      });

    const { container, getByRole, getByText } = render(
      <Tooltip triggerOnClick={true} triggerRenderer={<button>Open</button>}>
        <div style={{ width: '100px' }}> Test </div>
      </Tooltip>
    );

    await act(() => {
      userEvent.hover(getByRole('button', { name: 'Open' }));
    });
    expect(container).not.toHaveTextContent('Test');

    buttonClick();
    expect(container).toHaveTextContent('Test');

    await buttonClick();
    expect(getByText('Test')).not.toBeVisible();

    await buttonClick();
    await act(() => {
      fireEvent.keyDown(getByText('Test'), { key: 'Escape', code: 'Escape' });
    });
    expect(getByText('Test')).not.toBeVisible();

    cleanup();
  });

  it('should have proper theme atribute for important theme', () => {
    const { getByRole } = render(
      <Tooltip
        isVisible
        kind="important"
        triggerRenderer={<button>Open</button>}
      >
        <div style={{ width: '100px' }}>Color Test</div>
      </Tooltip>
    );

    const tooltip = getByRole('tooltip');
    expect(tooltip).toHaveClass(styles['tooltip--important']);

    cleanup();
  });

  it('should call onOpen and onClose callbacks when visibility changes on hover action', async () => {
    const onOpen = vi.fn();
    const onClose = vi.fn();
    const { getByRole, queryByText } = render(
      <Tooltip
        triggerRenderer={<button>Open</button>}
        onOpen={onOpen}
        onClose={onClose}
      >
        <div style={{ width: '100px' }}>Test</div>
      </Tooltip>
    );

    const button = getByRole('button', { name: 'Open' });

    await act(() => {
      userEvent.hover(button);
    });

    expect(queryByText('Test')).toBeInTheDocument();
    expect(onOpen).toBeCalledTimes(1);
    expect(onClose).not.toBeCalled();

    await act(() => {
      userEvent.unhover(button);
    });

    await waitFor(
      () => {
        expect(queryByText('Test')).not.toBeInTheDocument();
        expect(onClose).toHaveBeenCalledTimes(1);
      },
      { timeout: 1000 }
    );

    cleanup();
  });

  it('should not call onOpen callback redundantly when hovering from trigger element to tooltip', async () => {
    const onOpen = vi.fn();
    const onClose = vi.fn();
    const { getByRole, queryByText } = render(
      <Tooltip
        triggerRenderer={<button>Open</button>}
        onOpen={onOpen}
        onClose={onClose}
      >
        <div style={{ width: '100px' }}>Test</div>
      </Tooltip>
    );

    const button = getByRole('button', { name: 'Open' });

    await act(() => {
      userEvent.hover(button);
    });

    expect(queryByText('Test')).toBeInTheDocument();

    await act(async () => {
      await userEvent.hover(queryByText('Test') as HTMLElement);
      await userEvent.hover(button);
    });

    expect(onOpen).toBeCalledTimes(1);
    expect(onClose).not.toBeCalled();

    cleanup();
  });
});
