import * as React from 'react';

import { render, fireEvent, userEvent, vi } from 'test-utils';

import noop from '../../utils/noop';

import { TagInput } from './TagInput';
import { TagInputProps, TagInputValues } from './types';

const defaultProps = {
  onChange: noop,
};

const renderComponent = <T extends TagInputValues>(props: TagInputProps<T>) =>
  render(<TagInput {...props} />);

describe('<TagInput> component', () => {
  it('should allow for custom class', () => {
    const { container } = renderComponent({
      ...defaultProps,
      className: 'custom-class',
    });

    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('should allow for custom class for input', () => {
    const { getByRole } = renderComponent({
      ...defaultProps,
      inputClassName: 'input-custom-class',
    });

    expect(getByRole('textbox')).toHaveClass('input-custom-class');
  });

  it('should display error if passed', () => {
    const { getByText } = renderComponent({ ...defaultProps, error: 'error' });

    expect(getByText('error')).toBeInTheDocument();
  });

  it('should call onChange method on enter press', () => {
    const onChange = vi.fn();
    const { getByRole } = renderComponent({ onChange });
    const tagText = 'tagText';
    const input = getByRole('textbox');

    userEvent.type(input, `${tagText}{enter}`);
    expect(onChange).toHaveBeenCalledWith([tagText]);
  });

  it('should call onChange method on separator provided', () => {
    const onChange = vi.fn();
    const { getByRole } = renderComponent({ onChange });
    const tagText = 'tagText';
    const tagSeparator = ';';
    const input = getByRole('textbox');

    userEvent.type(input, `${tagText}${tagSeparator}`);
    expect(onChange).toHaveBeenCalledWith([tagText]);
  });

  it('should not call onChange method on enter press when tag separator is not provided', () => {
    const onChange = vi.fn();
    const { getByRole } = render(<TagInput onChange={onChange} />);
    const tagText = 'tagText';
    const input = getByRole('textbox');

    userEvent.type(input, tagText);
    expect(onChange).not.toHaveBeenCalled();
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
    expect(onChange).toHaveBeenCalledWith(['tag1', 'tag2', 'tag3', 'tag4']);
  });

  it('should call onChange method on blur', () => {
    const onChange = vi.fn();
    const { getByRole } = renderComponent({ onChange });
    const tagText = 'tagText';
    const input = getByRole('textbox');

    userEvent.type(input, tagText);
    fireEvent.blur(input);
    expect(onChange).toHaveBeenCalledWith([tagText]);
  });
});
