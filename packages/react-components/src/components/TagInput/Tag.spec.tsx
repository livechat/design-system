import * as React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '../../test-utils';
import { Tag } from './Tag';

jest.mock('@livechat/design-system-icons/dist/material', () => ({
  Close: () => <div />,
}));

const baseClass = 'lc-tag-input__tag';
const update = jest.fn();
const remove = jest.fn();
const inputRef: React.RefObject<HTMLInputElement> = {
  current: null,
};
const tagIndex = 0;
const props = {
  update,
  remove,
  index: tagIndex,
  inputRef,
};

describe('<Tag> component', () => {
  it('should have error class when error occurs', () => {
    const { container } = render(
      <Tag {...props} validator={() => false}>
        tag1
      </Tag>
    );
    expect(container.firstChild).toHaveClass(`${baseClass}--error`);
  });

  it('should call remove method on remove button press', () => {
    const { getByRole } = render(
      <Tag {...props} validator={() => false}>
        tag1
      </Tag>
    );
    const removeButton = getByRole('button');
    userEvent.click(removeButton);
    expect(remove).toBeCalledTimes(1);
    expect(remove).toBeCalledWith(tagIndex);
  });
});
