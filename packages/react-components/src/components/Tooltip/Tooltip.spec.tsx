import { render, fireEvent, cleanup } from 'test-utils';
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

    fireEvent.mouseOver(
      getByRole('button', {
        name: /Open/i,
      })
    );

    expect(container).toHaveTextContent('Test');

    cleanup();
  });
});
