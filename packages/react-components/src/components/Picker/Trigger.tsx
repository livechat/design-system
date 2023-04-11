import cx from 'clsx';
import {
  ChevronDown,
  ChevronUp,
  Close,
} from '@livechat/design-system-icons/react/material';
import { Icon } from '../Icon';
import styles from './Trigger.module.scss';
import { KeyCodes } from '../../utils/keyCodes';
import { Size } from 'utils';
import { FC, useRef, useEffect, MouseEvent } from 'react';

const baseClass = 'picker-trigger';

export interface ITriggerProps {
  isSearchDisabled: boolean;
  isDisabled?: boolean;
  isError?: boolean;
  isItemSelected: boolean;
  isOpen: boolean;
  isRequired?: boolean;
  isMultiSelect?: boolean;
  size?: Size;
  onTrigger: (e: MouseEvent | KeyboardEvent) => void;
  onClear: () => void;
}

export const Trigger: FC<ITriggerProps> = ({
  children,
  isSearchDisabled,
  isDisabled,
  isError,
  isItemSelected,
  isOpen,
  isRequired,
  isMultiSelect,
  size = 'medium',
  onTrigger,
  onClear,
}) => {
  const triggerRef = useRef<HTMLDivElement>(null);
  const mergedClassNames = cx(
    styles[baseClass],
    styles[`${baseClass}--${size}`],
    isMultiSelect && styles[`${baseClass}--multi-select`],
    isMultiSelect &&
      isItemSelected &&
      styles[`${baseClass}--multi-select--with-items`],
    isDisabled && styles[`${baseClass}--disabled`],
    isOpen && styles[`${baseClass}--focused`],
    isError && styles[`${baseClass}--error`]
  );

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      const isFocused = document.activeElement === triggerRef.current;

      if (isFocused && e.key !== KeyCodes.tab) {
        onTrigger(e);
      }
    };

    if (!isSearchDisabled) {
      document.addEventListener('keydown', onKeyDown);
    }

    return () => {
      if (!isSearchDisabled) {
        document.removeEventListener('keydown', onKeyDown);
      }
    };
  }, [isSearchDisabled]);

  const handleTriggerClick = (e: MouseEvent) => {
    onTrigger(e);
  };

  const handleOnClearClick = (e: MouseEvent) => {
    e.stopPropagation();
    onClear();
  };

  return (
    <div
      ref={triggerRef}
      className={mergedClassNames}
      onClick={handleTriggerClick}
      tabIndex={0}
    >
      <div className={styles[`${baseClass}__content`]}>{children}</div>
      <div
        className={cx(
          styles[`${baseClass}__controls`],
          styles[`${baseClass}__controls--${size}`]
        )}
      >
        {isItemSelected && !isDisabled && !isRequired && (
          <div
            data-testid={`${baseClass}__clear-icon`}
            className={styles[`${baseClass}__clear-icon`]}
            onClick={handleOnClearClick}
          >
            <Icon kind="primary" size="small" source={Close} />
          </div>
        )}
        <Icon
          className={styles[`${baseClass}__chevron-icon`]}
          source={!isOpen ? ChevronDown : ChevronUp}
          size="large"
          disabled={isDisabled}
        />
      </div>
    </div>
  );
};
