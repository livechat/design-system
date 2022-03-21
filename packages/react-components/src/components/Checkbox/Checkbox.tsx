import * as React from 'react';
import cx from 'clsx';
import { Check } from '@livechat/design-system-icons/react/material';
import { Icon, IconSizeName, IconTypeName } from '../Icon';

import styles from './Checkbox.module.scss';

export interface CheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
  className?: string;
  checked?: boolean;
  disabled?: boolean;
}

const baseClass = 'checkbox';

export const Checkbox: React.FC<CheckboxProps> = ({
  className = '',
  ...props
}) => {
  const mergedClassNames = cx(styles[`${baseClass}__square`], className);

  return (
    <div>
      <input
        {...props}
        className={styles[`${baseClass}__input`]}
        type="checkbox"
      />
      <div className={mergedClassNames}>
        <Icon
          source={Check}
          iconType={IconTypeName.Inverted}
          size={IconSizeName.XSmall}
          className={styles[`${baseClass}__checkmark`]}
        />
      </div>
    </div>
  );
};
