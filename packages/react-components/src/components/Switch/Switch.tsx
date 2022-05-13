import * as React from 'react';
import cx from 'clsx';

import noop from '../../utils/noop';

import styles from './Switch.module.scss';

const baseClass = 'switch';

export type SwitchSize = 'basic' | 'compact';
export interface SwitchProps {
  className?: string;
  defaultOn?: boolean;
  disabled?: boolean;
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
  name = baseClass,
  on,
  onChange = noop,
  size = 'basic',
  innerRef,
  ...props
}) => {
  const [enabled, setEnabled] = React.useState(() =>
    on !== undefined ? on : defaultOn
  );

  React.useEffect(() => {
    if (on !== undefined) {
      setEnabled(on);
    }
  }, [on]);

  const valueStyles = enabled ? 'enabled' : 'disabled';
  const mergedClassNames = cx(
    styles[baseClass],
    styles[`${baseClass}--${size}`],
    className
  );

  const handleChange = (e: React.FormEvent) => {
    const hasOnChangePassed = onChange !== noop;
    if (hasOnChangePassed) {
      onChange(e, enabled);
      return;
    }
    e.stopPropagation();
    setEnabled((prevEnabled) => !prevEnabled);
  };

  return (
    <span className={mergedClassNames}>
      <input
        type="checkbox"
        className={styles[`${baseClass}__input`]}
        onChange={handleChange}
        checked={enabled}
        name={name}
        ref={innerRef}
        disabled={disabled}
        test-id="foo"
        {...props}
      />
      <span className={styles[`${baseClass}__container`]}>
        <span
          className={cx(
            styles[`${baseClass}__track`],
            styles[`${baseClass}__track--${valueStyles}`]
          )}
        />
        <span
          className={cx(
            styles[`${baseClass}__slider`],
            styles[`${baseClass}__slider--${size}`],
            styles[`${baseClass}__slider--${size}--${valueStyles}`]
          )}
        />
      </span>
    </span>
  );
};
