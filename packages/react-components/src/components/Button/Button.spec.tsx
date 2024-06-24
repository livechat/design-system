import * as React from 'react';

import * as Icons from '@livechat/design-system-icons';

import { render, vi, userEvent } from 'test-utils';

import { Icon } from '../Icon';

import { Button } from './Button';

describe('<Button> component', () => {
  function renderButton(props = {}) {
    const result = render(<Button {...props} />);

    return {
      ...result,
      btnEl: result.container.firstChild,
    };
  }

  it('should allow to pass custom className', () => {
    const { btnEl } = renderButton({ className: 'my-class' });

    expect(btnEl).toHaveClass('my-class');
  });

  it('should show loader when "loading" prop is true', () => {
    const { getByTestId } = renderButton({ loading: true });

    expect(getByTestId('button-loader')).toBeVisible();
  });

  it('should show icon component when "icon" prop has been passed', () => {
    const { getByTestId } = renderButton({
      icon: <Icon source={Icons.AddCircle} data-testid="button-icon" />,
    });

    expect(getByTestId('button-icon')).toBeVisible();
  });

  it('should render as an anchor element if href is passed', () => {
    const { btnEl: linkEl } = renderButton({ href: 'https://example.com' });
    const { btnEl } = renderButton({ href: '' });

    expect((btnEl as HTMLElement).tagName).toBe('BUTTON');
    expect((linkEl as HTMLElement).tagName).toBe('A');
  });

  it('should set aria-disabled if we pass disabled prop and should not fire onClick callback if disabled is true', () => {
    const onClick = vi.fn();
    const { btnEl } = renderButton({ disabled: true, onClick });

    expect(btnEl).toHaveAttribute('aria-disabled', 'true');

    userEvent.click(btnEl as Element);

    expect(onClick).not.toHaveBeenCalled();
  });

  it('should call onClick callback when button is clicked', () => {
    const onClick = vi.fn();
    const { btnEl } = renderButton({ onClick });

    userEvent.click(btnEl as Element);

    expect(onClick).toHaveBeenCalled();
  });
});
