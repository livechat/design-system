import * as React from 'react';

import { render, fireEvent } from 'test-utils';

import { Popover } from './Popover';

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
