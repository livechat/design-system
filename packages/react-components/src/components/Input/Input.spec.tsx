import { useState } from 'react';

import { AddCircle as AddCircleIcon } from '@livechat/design-system-icons';

import { render, userEvent, vi } from 'test-utils';

import { Icon } from '../Icon';

import { Input, InputProps } from './Input';

const renderComponent = (props: InputProps) =>
  render(<Input {...props} data-testid="input" />);

describe('<Input> component', () => {
  it('should allow for custom class', () => {
    const { container } = renderComponent({ className: 'my-css-class' });

    expect(container.firstChild).toHaveClass('my-css-class');
  });

  it('should have disabled class and input should be disabled if "disabled" prop is set', () => {
    const { container, getByRole } = renderComponent({ disabled: true });

    expect(container.firstChild).toHaveAttribute('aria-disabled', 'true');
    expect(getByRole('textbox')).toHaveAttribute('disabled');
  });

  it('should have custom placeholder text if it is set', () => {
    const { getByRole } = renderComponent({
      placeholder: 'Custom placeholder',
    });

    expect(getByRole('textbox')).toHaveAttribute(
      'placeholder',
      'Custom placeholder'
    );
  });

  it('should have text type input as default', () => {
    const { getByRole } = renderComponent({});

    expect(getByRole('textbox')).toHaveAttribute('type', 'text');
  });

  it('should have password type input if type "password" is set', () => {
    const { getByTestId } = renderComponent({ type: 'password' });

    expect(getByTestId('input')).toHaveAttribute('type', 'password');
  });

  it('should change the input type if show password icon is clicked', () => {
    const { getByRole, getByTestId } = renderComponent({ type: 'password' });
    const input = getByTestId('input');
    const button = getByRole('button');

    expect(input).toHaveAttribute('type', 'password');
    userEvent.click(button);
    expect(input).toHaveAttribute('type', 'text');
    userEvent.click(button);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('should render with icon from the left side', () => {
    const { getByTestId } = renderComponent({
      icon: { source: <Icon source={AddCircleIcon} />, place: 'left' },
    });

    expect(getByTestId('input-icon-left')).toBeInTheDocument();
  });

  it('should render with icon from the right side', () => {
    const { getByTestId } = renderComponent({
      icon: { source: <Icon source={AddCircleIcon} />, place: 'right' },
    });

    expect(getByTestId('input-icon-right')).toBeVisible();
  });

  it('should not render with icon from the right side if type "password" is set', () => {
    const { queryByTestId } = renderComponent({
      type: 'password',
      icon: { source: <Icon source={AddCircleIcon} />, place: 'right' },
    });

    expect(queryByTestId('input-icon-right')).not.toBeInTheDocument();
  });

  it('should call onChange if input value change', () => {
    const onChangeFunction = vi.fn();
    const InputWrapper = () => {
      const [value, setValue] = useState('');

      return (
        <Input
          value={value}
          onChange={(v) => {
            setValue(v.currentTarget.value);
            onChangeFunction(v.currentTarget.value);
          }}
        />
      );
    };
    const { getByRole } = render(<InputWrapper />);
    const text = 'test value';

    userEvent.type(getByRole('textbox'), text, { delay: 0 });
    expect(onChangeFunction).toHaveBeenCalledWith(text);
  });
});
