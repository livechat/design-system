import * as React from 'react';

import {
  ChevronDown,
  ChevronUp,
  Close,
} from '@livechat/design-system-icons/react/tabler';
import cx from 'clsx';

import { Size } from 'utils';

import { KeyCodes } from '../../utils/keyCodes';
import { Icon } from '../Icon';

import styles from './Trigger.module.scss';

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
  hideClearButton?: boolean;
  onTrigger: (e: React.MouseEvent | KeyboardEvent) => void;
  onClear: () => void;
  testId?: string;
}

export const Trigger: React.FC<React.PropsWithChildren<ITriggerProps>> = ({
  children,
  isSearchDisabled,
  isDisabled,
  isError,
  isItemSelected,
  isOpen,
  isRequired,
  isMultiSelect,
  size = 'medium',
  hideClearButton,
  onTrigger,
  onClear,
  testId,
}) => {
  const triggerRef = React.useRef<HTMLDivElement>(null);
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

  React.useEffect(() => {
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

  const handleTriggerClick = (e: React.MouseEvent) => {
    onTrigger(e);
  };

  const handleOnClearClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClear();
  };

  const shouldShowClearButton =
    !hideClearButton && isItemSelected && !isDisabled && !isRequired;

  return (
    <div
      ref={triggerRef}
      className={mergedClassNames}
      onClick={handleTriggerClick}
      tabIndex={0}
      data-testid={testId}
    >
      <div
        className={cx(
          styles[`${baseClass}__content`],
          styles[`${baseClass}__content--${size}`],
          isMultiSelect &&
            isItemSelected &&
            styles[`${baseClass}__content--with-items`]
        )}
      >
        {children}
      </div>
      <div
        className={cx(
          styles[`${baseClass}__controls`],
          styles[`${baseClass}__controls--${size}`]
        )}
      >
        {shouldShowClearButton && (
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
