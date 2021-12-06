import * as React from 'react';
import { render } from '../test-utils';
import { Tag } from './Tag';
import userEvent from '@testing-library/user-event';

jest.mock('@livechat/design-system-icons/dist/material', () => ({
  Close: () => <div />,
}));

const baseClass = 'lc-tag';
const onRemove = jest.fn();
const tagIndex = 0;
const props = {
  onRemove,
  index: tagIndex,
};

describe('<Tag> component', () => {
  it('should have error class when error occurs', () => {
    const { container } = render(
      <Tag {...props} kind="error">
        tag1
      </Tag>
    );
    expect(container.firstChild).toHaveClass(`${baseClass}--error`);
  });

  it('should call remove method on remove button press', () => {
    const { getByRole } = render(
      <Tag {...props} dismissible>
        tag1
      </Tag>
    );
    const removeButton = getByRole('button');
    userEvent.click(removeButton);
    expect(onRemove).toBeCalledTimes(1);
  });
});
