import * as React from 'react';

import { Search, Close } from '@livechat/design-system-icons';
import cx from 'clsx';

import { KeyCodes } from '../../utils/keyCodes';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Loader } from '../Loader';
import { Text } from '../Typography';

import styles from './SearchInput.module.scss';

const baseClass = 'search-input';
const inputWrapperClass = `${baseClass}__input-wrapper`;

export interface ISearchInputProps
  extends Omit<
    React.InputHTMLAttributes<HTMLInputElement>,
    'size' | 'onChange'
  > {
  /**
   * Makes search expandable after focusing the icon
   */
  isCollapsable?: boolean;
  /**
   * Specify whether the search should be disabled
   */
  isDisabled?: boolean;
  /**
   * Specify whether the search should have loader visible
   */
  isLoading?: boolean;
  /**
   * Optional text for placeholder
   */
  placeholder?: string;
  /**
   * Specify the search size
   */
  size?: 'compact' | 'medium' | 'large';
  /**
   * Specify the search value
   */
  value: string;
  /**
   * Specify an optional className to be applied to the container node
   */
  className?: string;
  /**
   * The event handler for onChange
   */
  onChange: (value: string) => void;
  /**
   * Set to enable ellipsis
   */
  cropOnBlur?: boolean;
}

export const SearchInput = React.forwardRef<
  HTMLInputElement,
  ISearchInputProps
>(
  (
    {
      isCollapsable,
      isDisabled,
      isLoading,
      placeholder = 'Search ...',
      size = 'medium',
      value,
      className,
      cropOnBlur = true,
      onChange,
      ...props
    },
    ref
  ) => {
    const internalRef = React.useRef<HTMLInputElement>(null);
    React.useImperativeHandle(ref, () => internalRef.current!, [ref]);

    const [isCollapsed, setIsCollapsed] = React.useState<boolean>(true);
    const [isFocused, setIsFocused] = React.useState<boolean>(false);
    const isCloseIconVisible = !!value && !isDisabled && !isLoading;
    const ariaExpandedValue = isCollapsable && !isCollapsed && 'true';

    const mergedClassNames = cx(
      className,
      styles[baseClass],
      styles[`${baseClass}--${size}`],
      isFocused && styles[`${baseClass}--focused`],
      isDisabled && styles[`${baseClass}--disabled`],
      isCollapsable && styles[`${baseClass}--collapsable`],
      isCollapsable && styles[`${baseClass}--collapsable--${size}`],
      !isCollapsed && styles[`${baseClass}--collapsable--open`]
    );

    React.useEffect(() => {
      if (isCollapsable && !!value) {
        setIsCollapsed(false);
      }
    }, [isCollapsable, value]);

    const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
      const newValue = e.currentTarget.value;
      onChange(newValue);
    };

    const handleClear = () => {
      onChange('');
    };

    const handleClick = () => {
      if (internalRef.current) {
        internalRef.current.focus();
      }
    };

    const handleFocus = () => {
      if (isCollapsable) {
        setIsCollapsed(false);
      }
      setIsFocused(true);
    };

    const handleBlur = () => {
      if (isCollapsable && !value) {
        setIsCollapsed(true);
      }
      setIsFocused(false);
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === KeyCodes.enter) {
        e.preventDefault();
        onChange(value);
      }
    };

    return (
      <div
        aria-expanded={ariaExpandedValue}
        role="search"
        className={mergedClassNames}
        onClick={handleClick}
      >
        <Icon
          className={cx(
            styles[`${baseClass}__search-icon`],
            styles[`${baseClass}__search-icon--${size}`]
          )}
          source={Search}
          disabled={isDisabled}
          kind="primary"
        />
        <Text
          as="div"
          className={cx(
            styles[inputWrapperClass],
            styles[`${inputWrapperClass}--${size}`],
            cropOnBlur && styles[`${inputWrapperClass}--crop`]
          )}
        >
          <input
            role="searchbox"
            ref={internalRef}
            type="text"
            value={value}
            placeholder={placeholder}
            onChange={handleOnChange}
            onBlur={handleBlur}
            onFocus={handleFocus}
            onKeyDown={handleKeyDown}
            disabled={isDisabled}
            {...props}
          />
        </Text>
        {isCloseIconVisible && (
          <Button
            aria-label="Clear search"
            title="Clear search"
            className={styles[`${baseClass}__clear-icon`]}
            onClick={handleClear}
            icon={<Icon source={Close} kind="primary" />}
            kind="text"
            size="compact"
          />
        )}
        {isLoading && (
          <div className={styles[`${baseClass}__loader`]}>
            <Loader size="small" />
          </div>
        )}
      </div>
    );
  }
);

SearchInput.displayName = 'SearchInput';
