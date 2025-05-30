import * as React from 'react';

import { ChevronDown, ChevronUp, Close } from '@livechat/design-system-icons';
import cx from 'clsx';

import { Size } from '../../../utils';
import { Icon } from '../../Icon';
import { Text } from '../../Typography';

import styles from './PickerTrigger.module.scss';

export interface PickerTriggerProps {
  setReference: (element: HTMLElement | null) => void;
  getReferenceProps: (
    userProps?: React.HTMLProps<HTMLElement> | undefined
  ) => Record<string, unknown>;
  testId?: string;
  size?: Size;
  isMultiSelect?: boolean;
  isItemSelected: boolean;
  hideClearButton?: boolean;
  isDisabled?: boolean;
  isRequired?: boolean;
  isError?: boolean;
  isOpen: boolean;
  onClear: () => void;
  setTriggerFocus: (v: boolean) => void;
  onToggle: () => void;
}

const baseClass = 'picker-trigger';

export const PickerTrigger: React.FC<
  React.PropsWithChildren<PickerTriggerProps>
> = ({
  setReference,
  getReferenceProps,
  testId,
  size = 'medium',
  isMultiSelect,
  isItemSelected,
  hideClearButton,
  isDisabled,
  isRequired,
  isOpen,
  isError,
  onClear,
  children,
  setTriggerFocus,
  onToggle,
}) => {
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

  const shouldShowClearButton =
    !hideClearButton && isItemSelected && !isDisabled && !isRequired;

  const handleOnClearClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClear();
  };

  const handleClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (
      !isDisabled &&
      !(isOpen && (e.target as HTMLElement).tagName === 'BUTTON')
    ) {
      onToggle();
    }
  };

  React.useEffect(() => {
    if (!isOpen) setTriggerFocus(false);
  }, [isOpen]);

  return (
    <button
      tabIndex={isDisabled ? -1 : 0}
      aria-disabled={isDisabled}
      disabled={isDisabled}
      className={mergedClassNames}
      data-testid={testId}
      ref={setReference}
      type="button"
      {...getReferenceProps()}
      onFocus={() => setTriggerFocus(true)}
      onBlur={() => setTriggerFocus(false)}
      onClick={handleClick}
    >
      <Text
        as="div"
        className={cx(
          styles[`${baseClass}__content`],
          styles[`${baseClass}__content--${size}`],
          isMultiSelect &&
            isItemSelected &&
            styles[`${baseClass}__content--with-items`]
        )}
      >
        {children}
      </Text>
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
          data-testid={`${baseClass}__chevron-icon`}
          className={styles[`${baseClass}__chevron-icon`]}
          source={!isOpen ? ChevronDown : ChevronUp}
          size="medium"
          disabled={isDisabled}
        />
      </div>
    </button>
  );
};
