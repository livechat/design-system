import * as React from 'react';

import { render, userEvent, vi } from 'test-utils';

import { RadioButton, RadioButtonProps } from './RadioButton';

const renderComponent = (props: RadioButtonProps) =>
  render(<RadioButton {...props} />);

describe('<RadioButton> component', () => {
  it('should allow for custom class', () => {
    const { container } = renderComponent({ className: 'my-css-class' });

    expect(container.firstChild).toHaveClass('my-css-class');
  });

  it('should not be checked by default and change the state on user click on uncontrolled mode', () => {
    const { getByRole } = renderComponent({});
    const radio = getByRole('radio');

    expect(radio).not.toBeChecked();
    userEvent.click(radio);
    expect(radio).toBeChecked();
  });

  it('should be disabled if prop is given and should not call the provided handler on user click', () => {
    const onChange = vi.fn();
    const { getByRole } = renderComponent({
      disabled: true,
      onChange: onChange,
    });
    const radio = getByRole('radio');

    expect(radio).toBeDisabled();
    userEvent.click(radio);
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should call onChange handler on user click if provided and change the state for unconctrolled mode', () => {
    const onChange = vi.fn();
    const { getByRole } = renderComponent({ onChange: onChange });
    const radio = getByRole('radio');

    userEvent.click(radio);
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(radio).toBeChecked();
  });

  it('should not call onChange handler when checked', () => {
    const onChange = vi.fn();
    const { getByRole } = renderComponent({
      checked: true,
      onChange: onChange,
    });

    userEvent.click(getByRole('radio'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should not call onChange method when disabled', () => {
    const onChange = vi.fn();
    const { getByRole } = renderComponent({
      disabled: true,
      onChange: onChange,
    });

    userEvent.click(getByRole('radio'));
    expect(onChange).not.toHaveBeenCalled();
  });

  it('should render children if provided, which should be clickable as checkbox label', () => {
    const onChange = vi.fn();
    const { getByText } = renderComponent({
      children: 'Radio label',
      onChange: onChange,
    });
    const radioLabel = getByText('Radio label');

    expect(radioLabel).toBeInTheDocument();
    userEvent.click(radioLabel);
    expect(onChange).toHaveBeenCalledTimes(1);
  });

  it('should render description if provided', () => {
    const { getByText } = renderComponent({ description: 'Help text' });

    expect(getByText('Help text')).toBeInTheDocument();
  });
});
