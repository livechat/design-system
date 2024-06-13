import * as React from 'react';

import { vi } from 'vitest';

import { render, userEvent } from 'test-utils';

import noop from '../../utils/noop';

import { Textarea, TextareaProps } from './Textarea';

const renderComponent = (props: Partial<TextareaProps>) => {
  const finalProps = Object.assign(
    {},
    { onChange: noop },
    props
  ) as TextareaProps;

  return render(<Textarea {...finalProps} />);
};

describe('<Textarea> component', () => {
  it('should allow for custom class', () => {
    const { container } = renderComponent({ className: 'my-css-class' });

    expect(container.firstChild).toHaveClass('my-css-class');
  });

  it('should be disabled if prop is given', () => {
    const { getByRole } = renderComponent({ disabled: true });

    expect(getByRole('textbox')).toBeDisabled();
  });

  it('should call custom onFocus and onBlur', () => {
    const customOnFocus = vi.fn();
    const customOnBlur = vi.fn();
    const { getByRole } = renderComponent({
      onFocus: customOnFocus,
      onBlur: customOnBlur,
    });

    userEvent.click(getByRole('textbox'));
    expect(customOnFocus).toHaveBeenCalled();

    userEvent.click(document.body);
    expect(customOnBlur).toHaveBeenCalled();
  });
});
