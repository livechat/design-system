import * as React from 'react';

import { LockBlackFilled as LockIcon } from '@livechat/design-system-icons/react/tabler';
import cx from 'clsx';

import { Icon, IconSize } from '../Icon';
import { Loader } from '../Loader';

import styles from './Switch.module.scss';

export const baseClass = 'switch';

export type SwitchSize = 'compact' | 'medium' | 'large';
export type SwitchState = 'regular' | 'loading' | 'locked';

export interface SwitchProps {
  /**
   * Specify the label for the switch input
   */
  ariaLabel?: string;
  /**
   * The CSS class for switch container
   */
  className?: string;
  /**
   * Will set the switch to "on" on component initialization
   */
  defaultOn?: boolean;
  /**
   * Specify whether the switch should be disabled
   */
  disabled?: boolean;
  /**
   * Ref object
   */
  innerRef?: React.LegacyRef<HTMLInputElement> | undefined;
  /**
   * Specify the switch input name
   */
  name?: string;
  /**
   * Define if switch is "on"
   */
  on?: boolean;
  /**
   * The event handler for onChange
   */
  onChange?(e: React.FormEvent, value: boolean): void;
  /**
   * Specify the switch size
   */
  size?: SwitchSize;
  /**
   * Specify the switch state
   */
  state?: SwitchState;
}

export const Switch: React.FC<SwitchProps> = ({
  className = '',
  defaultOn = false,
  disabled = false,
  name = baseClass,
  on,
  onChange,
  size = 'large',
  state = 'regular',
  innerRef,
  ariaLabel,
  ...props
}) => {
  const isControlled = on !== undefined;
  const [checked, setChecked] = React.useState(() =>
    isControlled ? on : defaultOn
  );
  const controllingValue = isControlled ? on : checked;

  const isLoading = state === 'loading';
  const isLocked = state === 'locked';
  const iconSize: IconSize = size === 'large' ? 'small' : 'xsmall';
  const toggleStyles = controllingValue ? 'on' : 'off';
  const shouldBehaveAsDisabled = disabled || isLoading || isLocked;
  const availabilityStyles = shouldBehaveAsDisabled ? 'disabled' : 'enabled';
  const mergedClassNames = cx(
    styles[baseClass],
    styles[`${baseClass}--${size}`],
    className
  );

  const handleChange = (e: React.FormEvent) => {
    onChange?.(e, !controllingValue);

    if (!isControlled) {
      e.stopPropagation();
      setChecked((prevEnabled) => !prevEnabled);
    }
  };

  return (
    <span className={mergedClassNames}>
      <input
        type="checkbox"
        className={cx(
          styles[`${baseClass}__input`],
          styles[`${baseClass}__input--${availabilityStyles}`]
        )}
        onChange={handleChange}
        checked={controllingValue}
        name={name}
        ref={innerRef}
        disabled={shouldBehaveAsDisabled}
        aria-label={ariaLabel}
        {...props}
      />
      <span className={styles[`${baseClass}__container`]}>
        <span
          className={cx(
            styles[`${baseClass}__track`],
            styles[`${baseClass}__track--${toggleStyles}`],
            styles[`${baseClass}__track--${availabilityStyles}`]
          )}
        />
        <span
          className={cx(
            styles[`${baseClass}__slider`],
            styles[`${baseClass}__slider--${size}`],
            styles[`${baseClass}__slider--${size}--${toggleStyles}`]
          )}
        >
          {isLoading && (
            <Loader
              className={cx(
                styles[`${baseClass}__loader`],
                styles[`${baseClass}__loader--${size}`]
              )}
            />
          )}
          {isLocked && (
            <Icon
              className={styles[`${baseClass}__icon`]}
              data-testid="lock-icon"
              size={iconSize}
              source={LockIcon}
              kind="primary"
            />
          )}
        </span>
      </span>
    </span>
  );
};
