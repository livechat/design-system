import * as React from 'react';
import userEvent from '@testing-library/user-event';
import { render } from '../../test-utils';
import { TagInput } from './TagInput';
import { fireEvent } from '@testing-library/dom';

const baseClass = 'lc-tag-input';
const onChange = jest.fn();

describe('<TagInput> component', () => {
  it('should have error class when error occurs', () => {
    const { container } = render(
      <TagInput onChange={onChange} error={'test error'} />
    );
    expect(container.firstChild).toHaveClass(`${baseClass}--error`);
  });

  it('should call onChange method on enter press', () => {
    const { getByRole } = render(<TagInput onChange={onChange} />);
    const tagText = 'tagText';
    const input = getByRole('textbox');
    userEvent.type(input, `${tagText}{enter}`);
    expect(onChange).toBeCalledWith([tagText]);
  });

  it('should call onChange method on separator provided', () => {
    const { getByRole } = render(<TagInput onChange={onChange} />);
    const tagText = 'tagText';
    const tagSeparator = ';';
    const input = getByRole('textbox');
    userEvent.type(input, `${tagText}${tagSeparator}`);
    expect(onChange).toBeCalledWith([tagText]);
  });

  it('should not call onChange method on enter press when tag separator is not provided', () => {
    const { getByRole } = render(<TagInput onChange={onChange} />);
    const tagText = 'tagText';
    const input = getByRole('textbox');
    userEvent.type(input, tagText);
    expect(onChange).not.toBeCalled();
  });

  it('should call onChange method on text paste', () => {
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
