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

  it('should show remove button when dismissible props is enabled', () => {
    const { getByRole } = render(
      <Tag {...props} dismissible>
        tag1
      </Tag>
    );
    expect(getByRole('button')).toBeTruthy();
  });

  it('should apply specific CSS class for black custom color', () => {
    const { container } = render(
      <Tag {...props} customColor="#000000">
        tag1
      </Tag>
    );
    expect(container.firstChild).toHaveClass('lc-tag--text-white');
  });

  it('should apply specific CSS class for white custom color', () => {
    const { container } = render(
      <Tag {...props} customColor="#FFFFFF">
        tag1
      </Tag>
    );
    expect(container.firstChild).toHaveClass('lc-tag--text-black');
  });

  it('should have proper background color for red custom color', () => {
    const { container } = render(
      <Tag {...props} customColor="#ff0000">
        tag1
      </Tag>
    );
    expect(container.firstChild).toHaveStyle(`background-color: #ff0000`);
  });

  it('should apply specific CSS styling for red custom color with outline', () => {
    const { container } = render(
      <Tag {...props} outline customColor="#ff0000">
        tag1
      </Tag>
    );
    expect(container.firstChild).toHaveStyle(`background-color: transparent`);
    expect(container.firstChild).toHaveStyle(`color: #ff0000`);
    expect(container.firstChild).toHaveStyle(`border-color: #ff0000`);
  });

  it('should show avatar when both avatar and icon are provided', () => {
    const { getByTestId, queryByTestId } = render(
      <Tag {...props} avatar="http://test.img" icon="arrow-left">
        tag1
      </Tag>
    );
    expect(getByTestId('lc-tag-avatar')).toBeDefined();
    expect(queryByTestId('lc-tag-icon')).not.toBeInTheDocument();
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
