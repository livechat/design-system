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

export interface ITriggerProps {
  isDisabled?: boolean;
  isError?: boolean;
  isItemSelected: boolean;
  isOpen: boolean;
  size?: TriggerSize;
  onClick: () => void;
  onClearClick: () => void;
  onFilter: (text: string) => void;
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
  onFilter,
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

  const handleOnClearClick = (e) => {
    e.stopPropagation();
    return onClearClick();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return onFilter(e.target.value);
  };

  return (
    <div className={mergedClassNames} onClick={handleTriggerClick}>
      {isOpen ? (
        <input
          className={`${baseClass}__input`}
          placeholder="Select option"
          onChange={handleOnChange}
          autoFocus
        />
      ) : (
        <div className={`${baseClass}__text`}>{children}</div>
      )}
      {isItemSelected && !isDisabled && (
        <div
          data-testid={`${baseClass}__clear-icon`}
          className={`${baseClass}__clear-icon`}
          onClick={handleOnClearClick}
        >
          <Icon iconType={IconTypeName.Link} source={Close} />
        </div>
      )}
      <Icon
        className={`${baseClass}__chevron-icon`}
        source={!isOpen ? ChevronDown : ChevronUp}
        size={IconSizeName.Large}
        disabled={isDisabled}
      />
    </div>
  );
};
