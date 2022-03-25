import * as React from 'react';
import { render, fireEvent } from 'test-utils';
import { Popover } from './Popover';

const PopperContent = () => {
  return <div>Content</div>;
};

const PopperTrigger = () => {
  return <button>Button</button>;
};

describe('<Popover> component', () => {
  it('should show content if isVisible is set', () => {
    const { container } = render(
      <Popover isVisible={true} triggerRenderer={PopperTrigger}>
        <PopperContent></PopperContent>
      </Popover>
    );

    expect(container).toHaveTextContent('Content');
  });

  it('should show content if trigger has been clicked', () => {
    const { container, getByRole } = render(
      <Popover triggerRenderer={PopperTrigger}>
        <PopperContent></PopperContent>
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
