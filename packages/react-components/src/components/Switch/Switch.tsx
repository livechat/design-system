import * as React from 'react';
import cx from 'clsx';
import { LockBlack as LockIcon } from '@livechat/design-system-icons/react/material';

import { Icon, IconSize } from '../../components/Icon';
import noop from '../../utils/noop';

import styles from './Switch.module.scss';
import { Loader } from '../Loader';

export const baseClass = 'switch';

export type SwitchSize = 'compact' | 'medium' | 'large';
export interface SwitchProps {
  className?: string;
  defaultOn?: boolean;
  disabled?: boolean;
  loading?: boolean;
  innerRef?: React.LegacyRef<HTMLInputElement> | undefined;
  name?: string;
  on?: boolean;
  onChange?(e: React.FormEvent, value: boolean): void;
  size?: SwitchSize;
}

export const Switch: React.FC<SwitchProps> = ({
  className = '',
  defaultOn = false,
  disabled = false,
  loading = false,
  name = baseClass,
  on,
  onChange = noop,
  size = 'large',
  innerRef,
  ...props
}) => {
  const [checked, setChecked] = React.useState(() =>
    on !== undefined ? on : defaultOn
  );

  React.useEffect(() => {
    if (on !== undefined) {
      setChecked(on);
    }
  }, [on]);

  const iconSize: IconSize = size === 'large' ? 'small' : 'xsmall';
  const toggleStyles = checked ? 'on' : 'off';
  const shouldBehaveAsDisabled = disabled || loading;
  const availabilityStyles = shouldBehaveAsDisabled ? 'disabled' : 'enabled';
  const mergedClassNames = cx(
    styles[baseClass],
    styles[`${baseClass}--${size}`],
    className
  );
  const shouldShowDisabledIcon = disabled && !loading;

  const handleChange = (e: React.FormEvent) => {
    const hasOnChangePassed = onChange !== noop;
    if (hasOnChangePassed) {
      onChange(e, checked);
      return;
    }
    e.stopPropagation();
    setChecked((prevEnabled) => !prevEnabled);
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
        checked={checked}
        name={name}
        ref={innerRef}
        disabled={shouldBehaveAsDisabled}
        test-id="foo"
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
          {loading && (
            <Loader
              className={cx(
                styles[`${baseClass}__loader`],
                styles[`${baseClass}__loader--${size}`]
              )}
            />
          )}
          {shouldShowDisabledIcon && (
            <Icon
              data-testid="disabled-icon"
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
