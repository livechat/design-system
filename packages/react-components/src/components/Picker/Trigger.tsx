import * as React from 'react';
import cx from 'clsx';
import {
  ChevronDown,
  ChevronUp,
  Close,
} from '@livechat/design-system-icons/react/material';
import { Icon, IconSizeName, IconTypeName } from '../Icon';
import styles from './Trigger.module.scss';
import { KeyCodes } from '../../utils/keyCodes';

const baseClass = 'picker-trigger';

export type TriggerSize = 'compact' | 'medium' | 'large';

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
  size = 'medium',
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

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const el = document.getElementById('picker-trigger');
      const isFocused = document.activeElement === el;

      if (isFocused && e.key !== KeyCodes.tab) {
        return onClick();
      }
    };

    document.addEventListener('keydown', onKeyDown);

    return () => document.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleTriggerClick = () => {
    return onClick();
  };

  const handleOnClearClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    return onClearClick();
  };

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    return onFilter(e.target.value);
  };

  return (
    <div
      id="picker-trigger"
      className={mergedClassNames}
      onClick={handleTriggerClick}
      tabIndex={0}
    >
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
