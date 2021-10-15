import * as React from 'react';
import cx from 'classnames';
import classNames from 'classnames/bind';

import { noop } from './constants';

const baseClass = 'switch';

enum SwitchSize {
  Basic = 'basic',
  Compact = 'compact',
}

enum SwitchStyles {
  Enabled = 'enabled',
  Disabled = 'disabled',
}

export interface IProps {
  className?: string;
  defaultOn?: boolean;
  disabled?: boolean;
  name?: string;
  on?: boolean;
  onChange?(e: React.FormEvent, value: boolean): void;
  size?: SwitchSize;
  innerRef?: React.LegacyRef<HTMLInputElement> | undefined;
}

export const Switch: React.FC<IProps> = ({
  className = '',
  defaultOn = false,
  disabled = false,
  name = baseClass,
  on,
  onChange = noop,
  size = SwitchSize.Basic,
  innerRef,
  ...props
}) => {
  const getEnabledValue = () => (on !== undefined ? on : defaultOn);
  const [enabled, setEnabled] = React.useState(getEnabledValue());
  const valueStyles = enabled ? SwitchStyles.Enabled : SwitchStyles.Disabled;

  const mergedClassNames = cx(baseClass, [`${baseClass}--${size}`], className);

  const handleChange = (e: React.FormEvent) => {
    const hasOnChangePassed = onChange !== noop;
    if (hasOnChangePassed) {
      onChange(e, enabled);
      return;
    }
    e.stopPropagation();
    setEnabled(!enabled);
  };

  return (
    <span className={mergedClassNames}>
      <input
        type="checkbox"
        className={`${baseClass}__input`}
        onChange={handleChange}
        checked={enabled}
        name={name}
        ref={innerRef}
        disabled={disabled}
        {...props}
      />
      <span className={`${baseClass}__container`}>
        <span
          className={classNames(
            `${baseClass}__track`,
            `${baseClass}__track--${valueStyles}`
          )}
        />
        <span
          className={classNames(
            `${baseClass}__slider`,
            `${baseClass}__slider--${size}`,
            `${baseClass}__slider--${size}--${valueStyles}`
          )}
        />
      </span>
    </span>
  );
};
