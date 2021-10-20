import * as React from 'react';
import cx from 'classnames';
import { Check } from '@livechat/design-system-icons/dist/material';
import Icon, { IconSizeName, IconTypeName } from './Icon';

export interface ICheckboxProps extends React.HTMLAttributes<HTMLInputElement> {
  className?: string;
  checked?: boolean;
  disabled?: boolean;
}

const baseClass = 'lc-checkbox';

export const Checkbox: React.FC<ICheckboxProps> = ({
  className = '',
  ...props
}) => {
  const mergedClassNames = cx(`${baseClass}__square`, className);

  return (
    <div>
      <input {...props} className={`${baseClass}__input`} type="checkbox" />
      <div className={mergedClassNames}>
        <Icon
          source={Check}
          iconType={IconTypeName.Inverted}
          size={IconSizeName.XSmall}
          className={`${baseClass}__checkmark`}
        />
      </div>
    </div>
  );
};
