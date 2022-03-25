import * as React from 'react';

import { render } from 'test-utils';
import { Icon } from '../Icon';

import { Button } from './Button';
import styles from './Button.module.scss';

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

    const expectedClasses = ['btn', 'btn--basic', 'btn--medium'].map(
      (cls) => styles[cls]
    );
    const notExpectedClasses = [
      'btn--loading',
      'btn--full-width',
      'btn--icon-only',
    ].map((cls) => styles[cls]);

    expect(btnEl).toHaveClass(...expectedClasses);
    expect(btnEl).not.toHaveClass(...notExpectedClasses);
  });

  it('should allow to pass custom className', () => {
    const { btnEl } = renderButton({ className: 'my-class' });

    expect(btnEl).toHaveClass('my-class');
  });

  it('should not show loader by deafult', () => {
    const { container, btnEl } = renderButton();

    expect(btnEl).not.toHaveClass(styles['btn--loading']);
    expect(
      container.querySelector(`.${styles['btn__loader']}`)
    ).not.toBeInTheDocument();
  });

  it('should show loader when "loading" prop is true', () => {
    const { container, btnEl } = renderButton({ loading: true });

    expect(btnEl).toHaveClass(styles['btn--loading']);
    expect(container.querySelector(`.${styles['btn__loader']}`)).toBeVisible();
  });

  it('should not show icon by default', () => {
    const { container } = renderButton();

    expect(
      container.querySelector(`.${styles['btn__icon']}`)
    ).not.toBeInTheDocument();
  });

  it('should show icon component when "icon" prop has been passed', () => {
    const { container } = renderButton({
      icon: <Icon source="span" />,
    });

    const iconEl = container.querySelector(`.${styles['btn__icon']}`);

    expect(iconEl).toBeVisible();
    expect(iconEl).toHaveClass(styles['btn__icon--left']);
  });

  it('should show icon component on right side', () => {
    const { container } = renderButton({
      icon: <Icon source="span" />,
      iconPosition: 'right',
    });

    const iconEl = container.querySelector(`.${styles['btn__icon']}`);

    expect(iconEl).toBeVisible();
    expect(iconEl).toHaveClass(styles['btn__icon--right']);
  });

  it('should allow to take "fullWidth"', () => {
    const { btnEl } = renderButton({ fullWidth: true });

    expect(btnEl).toHaveClass(styles['btn--full-width']);
  });

  it('should allow for "icon-only" content', () => {
    const { btnEl } = renderButton({
      children: null,
      icon: <Icon source="span" />,
    });

    expect(btnEl).toHaveClass(styles['btn--icon-only']);
  });

  it('should render as an anchor element if href is passed', () => {
    const { btnEl: linkEl } = renderButton({ href: 'https://example.com' });
    const { btnEl } = renderButton({ href: '' });

    expect((btnEl as HTMLElement).tagName).toBe('BUTTON');
    expect((linkEl as HTMLElement).tagName).toBe('A');
  });
});
