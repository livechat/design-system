import * as React from 'react';

import { render } from '../../test-utils';
import Icon from '../Icon';

import { Button } from './Button';

describe('<Button> component', () => {
  function renderButton(props = {}) {
    const result = render(<Button {...props} />);

    return {
      ...result,
      btnEl: result.container.firstChild,
    };
  }

  it('should have default set of classNames', () => {
    const { btnEl } = renderButton();

    expect(btnEl).toHaveClass('lc-btn', 'lc-btn--basic', 'lc-btn--medium');
    expect(btnEl).not.toHaveClass(
      'lc-btn--loading',
      'lc-btn--full-width',
      'lc-btn--icon-only'
    );
  });

  it('should allow to pass custom className', () => {
    const { btnEl } = renderButton({ className: 'my-class' });

    expect(btnEl).toHaveClass('my-class');
  });

  it('should not show loader by deafult', () => {
    const { container, btnEl } = renderButton();

    expect(btnEl).not.toHaveClass('lc-btn--loading');
    expect(container.querySelector('.lc-btn__loader')).not.toBeInTheDocument();
  });

  it('should show loader when "loading" prop is true', () => {
    const { container, btnEl } = renderButton({ loading: true });

    expect(btnEl).toHaveClass('lc-btn--loading');
    expect(container.querySelector('.lc-btn__loader')).toBeVisible();
  });

  it('should not show icon by default', () => {
    const { container } = renderButton();

    expect(container.querySelector('.lc-btn__icon')).not.toBeInTheDocument();
  });

  it('should show icon component when "icon" prop has been passed', () => {
    const { container } = renderButton({
      icon: <Icon source="span" />,
    });

    const iconEl = container.querySelector('.lc-btn__icon');

    expect(iconEl).toBeVisible();
    expect(iconEl).toHaveClass('lc-btn__icon--left');
  });

  it('should show icon component on right side', () => {
    const { container } = renderButton({
      icon: <Icon source="span" />,
      iconPosition: 'right',
    });

    const iconEl = container.querySelector('.lc-btn__icon');

    expect(iconEl).toBeVisible();
    expect(iconEl).toHaveClass('lc-btn__icon--right');
  });

  it('should allow to take "fullWidth"', () => {
    const { btnEl } = renderButton({ fullWidth: true });

    expect(btnEl).toHaveClass('lc-btn--full-width');
  });

  it('should allow for "icon-only" content', () => {
    const { btnEl } = renderButton({
      children: null,
      icon: <Icon source="span" />,
    });

    expect(btnEl).toHaveClass('lc-btn--icon-only');
  });
});
