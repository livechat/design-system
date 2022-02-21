import * as React from 'react';
import { render } from '../test-utils';
import { Popover } from './Popover';

const PopperContent = () => {
  return <div>Content</div>;
};

const PopperTrigger = () => {
  return <div>Button</div>;
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
});
