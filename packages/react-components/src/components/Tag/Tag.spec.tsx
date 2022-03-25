import * as React from 'react';
import { render, userEvent, vi } from 'test-utils';
import noop from '../../utils/noop';
import { Tag } from './Tag';

import styles from './Tag.module.scss';

const baseClass = 'tag';
const tagIndex = 0;
const props = {
  onRemove: noop,
  index: tagIndex,
};

describe('<Tag> component', () => {
  it('should have error class when error occurs', () => {
    const { container } = render(
      <Tag {...props} kind="error">
        tag1
      </Tag>
    );
    expect(container.firstChild).toHaveClass(styles[`${baseClass}--error`]);
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
    expect(container.firstChild).toHaveClass(styles['tag--text-white']);
  });

  it('should apply specific CSS class for white custom color', () => {
    const { container } = render(
      <Tag {...props} customColor="#FFFFFF">
        tag1
      </Tag>
    );
    expect(container.firstChild).toHaveClass(styles['tag--text-black']);
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
    const onRemove = vi.fn();
    const { getByRole } = render(
      <Tag {...props} onRemove={onRemove} dismissible>
        tag1
      </Tag>
    );
    const removeButton = getByRole('button');
    userEvent.click(removeButton);
    expect(onRemove).toBeCalledTimes(1);
  });
});
