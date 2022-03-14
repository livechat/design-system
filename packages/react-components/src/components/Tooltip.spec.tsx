import * as React from 'react';
import { render, fireEvent } from '../test-utils';
import { Tooltip } from './Tooltip';

global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}));

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
  });
});
