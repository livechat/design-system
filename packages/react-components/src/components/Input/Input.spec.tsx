import * as React from 'react';

import { AddCircle as AddCircleIcon } from '@livechat/design-system-icons/react/material';

import { fireEvent, render } from 'test-utils';

import { Icon } from '../Icon';

import { Input } from './Input';

import styles from './Input.module.scss';

describe('<Input> component', () => {
  it('should allow for custom class', () => {
    const { container } = render(<Input className="my-css-class" />);
    expect(container.firstChild).toHaveClass('my-css-class');
  });

  it('should have default medium size', () => {
    const { container } = render(<Input className="my-css-class" />);
    expect(container.firstChild).toHaveClass(styles['input--medium']);
  });

  it('should allow for compact size', () => {
    const { container } = render(<Input inputSize="compact" />);
    expect(container.firstChild).toHaveClass(styles['input--compact']);
  });

  it('should allow for medium size', () => {
    const { container } = render(<Input inputSize="medium" />);
    expect(container.firstChild).toHaveClass(styles['input--medium']);
  });

  it('should allow for large size', () => {
    const { container } = render(<Input inputSize="large" />);
    expect(container.firstChild).toHaveClass(styles['input--large']);
  });

  it('should have error class on error', () => {
    const { container } = render(<Input error />);
    expect(container.firstChild).toHaveClass(styles['input--error']);
  });

  it('should have disabled class and input should be disabled if "disabled" prop is set', () => {
    const { container, getByRole } = render(<Input disabled />);
    expect(container.firstChild).toHaveClass(styles['input--disabled']);
    expect(container.firstChild).toHaveAttribute('aria-disabled', 'true');
    expect(getByRole('textbox')).toHaveAttribute('disabled');
  });

  it('should have custom placeholder text if it is set', () => {
    const { getByRole } = render(<Input placeholder="Custom placeholder" />);
    expect(getByRole('textbox')).toHaveAttribute(
      'placeholder',
      'Custom placeholder'
    );
  });

  it('should have text type input as default', () => {
    const { getByRole } = render(<Input />);
    expect(getByRole('textbox')).toHaveAttribute('type', 'text');
  });

  it('should have password type input if type "password" is set', () => {
    const { getByTestId } = render(
      <Input type="password" data-testid="password-input" />
    );
    expect(getByTestId('password-input')).toHaveAttribute('type', 'password');
  });

  it('should change the input type if show password icon is clicked', () => {
    const { getByRole, getByTestId } = render(
      <Input type="password" data-testid="password-input" />
    );
    const input = getByTestId('password-input');
    const button = getByRole('button');

    expect(input).toHaveAttribute('type', 'password');
    fireEvent.click(button);
    expect(input).toHaveAttribute('type', 'text');
    fireEvent.click(button);
    expect(input).toHaveAttribute('type', 'password');
  });

  it('should render with icon from the left side', () => {
    const { getByTestId } = render(
      <Input
        icon={{
          source: <Icon source={AddCircleIcon} />,
          place: 'left',
        }}
      />
    );

    expect(getByTestId('input-icon-left')).toBeVisible();
  });

  it('should render with icon from the right side', () => {
    const { getByTestId } = render(
      <Input
        icon={{
          source: <Icon source={AddCircleIcon} />,
          place: 'right',
        }}
      />
    );

    expect(getByTestId('input-icon-right')).toBeVisible();
  });

  it('should not render with icon from the right side if type "password" is set', () => {
    const { queryByTestId } = render(
      <Input
        type="password"
        icon={{
          source: <Icon source={AddCircleIcon} />,
          place: 'right',
        }}
      />
    );

    expect(queryByTestId('input-icon-right')).toBeFalsy();
  });
});
