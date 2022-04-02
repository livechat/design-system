import * as React from 'react';
import cx from 'clsx';
import {
  ChevronDown,
  ChevronUp,
  Close,
} from '@livechat/design-system-icons/react/material';
import { Icon, IconSizeName, IconTypeName } from '../Icon';
import styles from './Trigger.module.scss';

const baseClass = 'picker-trigger';

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
  isRequired?: boolean;
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
  isRequired,
  size = TriggerSize.Medium,
  onClick,
  onClearClick,
  onFilter,
}) => {
  const mergedClassNames = cx(
    styles[baseClass],
    styles[`${baseClass}--${size}`],
    isDisabled && styles[`${baseClass}--disabled`],
    isOpen && styles[`${baseClass}--focused`],
    isError && styles[`${baseClass}--error`]
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
          className={styles[`${baseClass}__input`]}
          placeholder="Select option"
          onChange={handleOnChange}
          autoFocus
        />
      ) : (
        <div className={styles[`${baseClass}__text`]}>{children}</div>
      )}
      {isItemSelected && !isDisabled && !isRequired && (
        <div
          data-testid={`${baseClass}__clear-icon`}
          className={styles[`${baseClass}__clear-icon`]}
          onClick={handleOnClearClick}
        >
          <Icon iconType={IconTypeName.Link} source={Close} />
        </div>
      )}
      <Icon
        className={styles[`${baseClass}__chevron-icon`]}
        source={!isOpen ? ChevronDown : ChevronUp}
        size={IconSizeName.Large}
        disabled={isDisabled}
      />
    </div>
  );
};
