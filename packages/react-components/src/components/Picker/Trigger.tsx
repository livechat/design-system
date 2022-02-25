import * as React from 'react';
import cx from 'classnames';
import {
  ChevronDown,
  ChevronUp,
  Close,
} from '@livechat/design-system-icons/dist/material';
import { Icon, IconSizeName, IconTypeName } from '../Icon';

const baseClass = 'lc-picker-trigger';

export const enum TriggerSize {
  Compact = 'compact',
  Medium = 'medium',
  Large = 'large',
}

interface ITriggerProps {
  isDisabled?: boolean;
  isError?: boolean;
  isItemSelected: boolean;
  isOpen: boolean;
  size?: TriggerSize;
  onClick: () => void;
  onClearClick: () => void;
}

export const Trigger: React.FC<ITriggerProps> = ({
  children,
  isDisabled,
  isError,
  isItemSelected,
  isOpen,
  size = TriggerSize.Medium,
  onClick,
  onClearClick,
}) => {
  const mergedClassNames = cx(
    baseClass,
    `${baseClass}--${size}`,
    isDisabled && `${baseClass}--disabled`,
    isOpen && `${baseClass}--focused`,
    isError && `${baseClass}--error`
  );

  const handleTriggerClick = () => {
    return onClick();
  };

  const handleOnClearClick = () => {
    return onClearClick();
  };

  return (
    <div className={mergedClassNames} onClick={handleTriggerClick}>
      <div className={`${baseClass}__text`}>{children}</div>
      {isItemSelected && (
        <div onClick={handleOnClearClick}>
          <Icon iconType={IconTypeName.Link} source={Close} />
        </div>
      )}
      <Icon
        source={!isOpen ? ChevronDown : ChevronUp}
        size={IconSizeName.Large}
        disabled={isDisabled}
      />
    </div>
  );
};
