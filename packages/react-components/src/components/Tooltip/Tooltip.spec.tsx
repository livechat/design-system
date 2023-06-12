import * as React from 'react';
import { render, fireEvent, cleanup, act, waitFor } from 'test-utils';
import { vi } from 'vitest';

import { Tooltip } from './Tooltip';

vi.mock('@floating-ui/react-dom', () => {
  return {
    useFloating: vi.fn(() => {
      return {
        x: 0,
        y: 0,
        placement: 'bottom',
        middlewareData: {
          arrow: {
            x: 0,
            y: 0,
          },
        },
        refs: {
          floating: 0,
          reference: 0,
        },
      };
    }),
    arrow: vi.fn(),
    autoUpdate: vi.fn(),
    flip: vi.fn(),
    offset: vi.fn(),
    x: 0,
  };
});

describe('<Tooltip> component', () => {
  it('should show content on mouse over', () => {
    const { container, getByRole } = render(
      <Tooltip triggerRenderer={() => <button>Open</button>}>
        <div style={{ width: '100px' }}> Test </div>
      </Tooltip>
    );

    act(() => {
      fireEvent.mouseOver(getByRole('button', { name: 'Open' }));
    });

    expect(container).toHaveTextContent('Test');

    cleanup();
  });

  it(`should hide the content if we doesn't hover the button`, async () => {
    const { container, getByRole, queryByText } = render(
      <Tooltip
        hoverOutDelayTimeout={0}
        withFadeAnimation={false}
        triggerRenderer={() => <button>Open</button>}
      >
        <div style={{ width: '100px' }}> Test </div>
      </Tooltip>
    );

    act(() => {
      fireEvent.mouseOver(getByRole('button', { name: 'Open' }));
    });

    expect(container).toHaveTextContent('Test');

    act(() => {
      fireEvent.mouseOut(getByRole('button', { name: 'Open' }));
    });

    await waitFor(
      () => {
        expect(queryByText('Test')).not.toBeInTheDocument();
      },
      { timeout: 1000 }
    );

    cleanup();
  });

  it(`shouldn't show content on mouse over when we set isVisible=false`, () => {
    const { container, getByRole } = render(
      <Tooltip isVisible={false} triggerRenderer={() => <button>Open</button>}>
        <div style={{ width: '100px' }}> Test </div>
      </Tooltip>
    );

    act(() => {
      fireEvent.mouseOver(getByRole('button', { name: 'Open' }));
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

  it(`should show content after click and disappear after second click`, () => {
    const buttonClick = () =>
      act(() => {
        fireEvent.click(getByRole('button', { name: 'Open' }));
      });

    const { container, getByRole, getByText } = render(
      <Tooltip
        triggerOnClick={true}
        triggerRenderer={() => <button>Open</button>}
      >
        <div style={{ width: '100px' }}> Test </div>
      </Tooltip>
    );

    act(() => {
      fireEvent.mouseOver(getByRole('button', { name: 'Open' }));
    });
    expect(container).not.toHaveTextContent('Test');

    buttonClick();
    expect(container).toHaveTextContent('Test');

    buttonClick();
    expect(getByText('Test')).not.toBeVisible();

    buttonClick();
    act(() => {
      fireEvent.keyDown(getByText('Test'), { key: 'Escape', code: 'Escape' });
    });
    expect(getByText('Test')).not.toBeVisible();

    cleanup();
  });

  it('should have proper theme atribute for important theme', () => {
    const { getByTestId } = render(
      <Tooltip
        isVisible={true}
        theme="important"
        triggerRenderer={() => <button>Open</button>}
      >
        <div data-testid="import-tooltip" style={{ width: '100px' }}>
          Color Test
        </div>
      </Tooltip>
    );

    expect(getByTestId('import-tooltip')).toHaveAttribute('theme', 'important');

    cleanup();
  });

  it('should call onOpen and onClose callbacks when visibility changes on hover action', async () => {
    const onOpen = vi.fn();
    const onClose = vi.fn();
    const { getByRole, queryByText } = render(
      <Tooltip
        triggerRenderer={() => <button>Open</button>}
        triggerOnClick={false}
        withFadeAnimation={false}
        hoverOutDelayTimeout={0}
        transitionDuration={0}
        onOpen={onOpen}
        onClose={onClose}
      >
        <div style={{ width: '100px' }}>Test</div>
      </Tooltip>
    );

    const button = getByRole('button', { name: 'Open' });

    act(() => {
      fireEvent.mouseEnter(button);
    });

    expect(queryByText('Test')).toBeInTheDocument();
    expect(onOpen).toBeCalledTimes(1);
    expect(onClose).not.toBeCalled();

    act(() => {
      fireEvent.mouseOut(button);
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
});
