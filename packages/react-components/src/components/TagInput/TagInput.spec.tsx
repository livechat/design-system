import * as React from 'react';
import { render, fireEvent, userEvent, vi } from 'test-utils';
import noop from '../../utils/noop';

import { TagInput } from './TagInput';
import styles from './TagInput.module.scss';

const baseClass = 'tag-input';

describe('<TagInput> component', () => {
  it('should have error class when error occurs', () => {
    const { container } = render(
      <TagInput onChange={noop} error={'test error'} />
    );
    expect(container.firstChild).toHaveClass(styles[`${baseClass}--error`]);
  });

  it('should call onChange method on enter press', () => {
    const onChange = vi.fn();
    const { getByRole } = render(<TagInput onChange={onChange} />);
    const tagText = 'tagText';
    const input = getByRole('textbox');
    userEvent.type(input, `${tagText}{enter}`);
    expect(onChange).toBeCalledWith([tagText]);
  });

  it('should call onChange method on separator provided', () => {
    const onChange = vi.fn();
    const { getByRole } = render(<TagInput onChange={onChange} />);
    const tagText = 'tagText';
    const tagSeparator = ';';
    const input = getByRole('textbox');
    userEvent.type(input, `${tagText}${tagSeparator}`);
    expect(onChange).toBeCalledWith([tagText]);
  });

  it('should not call onChange method on enter press when tag separator is not provided', () => {
    const onChange = vi.fn();
    const { getByRole } = render(<TagInput onChange={onChange} />);
    const tagText = 'tagText';
    const input = getByRole('textbox');
    userEvent.type(input, tagText);
    expect(onChange).not.toBeCalled();
  });

  it('should call onChange method on text paste', () => {
    const onChange = vi.fn();
    const { getByRole } = render(<TagInput onChange={onChange} />);
    const pastedText = 'tag1;tag2,tag3 tag4';
    const input = getByRole('textbox');
    fireEvent.paste(input, {
      clipboardData: {
        getData: () => pastedText,
      },
    });
    expect(onChange).toBeCalledWith(['tag1', 'tag2', 'tag3', 'tag4']);
  });
});
