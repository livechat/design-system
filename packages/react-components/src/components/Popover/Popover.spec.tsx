import * as React from 'react';

import { vi } from 'vitest';

import { render, fireEvent } from 'test-utils';

import { Popover } from './Popover';

vi.mock('@floating-ui/react-dom', () => {
  return {
    useFloating: vi.fn(() => {
      return {
        x: 0,
        y: 0,
        placement: 'bottom',
        refs: {
          floating: 0,
          reference: 0,
        },
      };
    }),
    autoUpdate: vi.fn(),
    flip: vi.fn(),
    offset: vi.fn(),
    x: 0,
  };
});

const Content = () => {
  return <div>Content</div>;
};

const Trigger = () => {
  return <button>Button</button>;
};

describe('<Popover> component', () => {
  it('should show content if isVisible is set', () => {
    const { container } = render(
      <Popover isVisible={true} triggerRenderer={Trigger}>
        <Content></Content>
      </Popover>
    );

    expect(container).toHaveTextContent('Content');
  });

  it('should show content if trigger has been clicked', () => {
    const { container, getByRole } = render(
      <Popover triggerRenderer={Trigger}>
        <Content></Content>
      </Popover>
    );

    fireEvent.click(
      getByRole('button', {
        name: /Button/i,
      })
    );

    expect(container).toHaveTextContent('Content');
  });
});
