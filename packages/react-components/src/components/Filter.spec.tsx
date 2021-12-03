import * as React from 'react';
import { render } from '../test-utils';
import { Filter } from './Filter';
import userEvent from '@testing-library/user-event';

jest.mock('@livechat/design-system-icons/dist/material', () => ({
  Close: () => <div />,
}));

const baseClass = 'lc-filter';
const onRemove = jest.fn();
const tagIndex = 0;
const props = {
  onRemove,
  index: tagIndex,
};

describe('<Filter> component', () => {
  it('should have error class when error occurs', () => {
    const { container } = render(
      <Filter {...props} error>
        tag1
      </Filter>
    );
    expect(container.firstChild).toHaveClass(`${baseClass}--error`);
  });

  it('should call remove method on remove button press', () => {
    const { getByRole } = render(
      <Filter {...props} dismissible>
        tag1
      </Filter>
    );
    const removeButton = getByRole('button');
    userEvent.click(removeButton);
    expect(onRemove).toBeCalledTimes(1);
  });
});
