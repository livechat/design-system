import * as React from 'react';

import { Search, Close } from '@livechat/design-system-icons';
import cx from 'clsx';

import { KeyCodes } from '../../utils/keyCodes';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Loader } from '../Loader';
import { Text } from '../Typography';

import styles from './Search.module.scss';

const baseClass = 'search-input';
const inputBaseClass = `${baseClass}__input`;

export interface ISearchInputProps {
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
}

export const SearchInput: React.FC<ISearchInputProps> = ({
  isCollapsable,
  isDisabled,
  isLoading,
  placeholder = 'Search ...',
  size = 'medium',
  value,
  className,
  onChange,
}) => {
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(true);
  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const isCloseIconVisible = !!value && !isDisabled && !isLoading;
  const ariaExpandedValue = isCollapsable && !isCollapsed && 'true';

  const mergedClassNames = cx(
    className,
    styles[baseClass],
    styles[`${baseClass}--${size}`],
    isFocused && styles[`${baseClass}--focused`],
    isDisabled && styles[`${baseClass}--disabled`],
    isCollapsable && styles[`${baseClass}--collapsable`],
    !isCollapsed && styles[`${baseClass}--collapsable--open`]
  );

  React.useEffect(() => {
    if (isCollapsable && !!value) {
      setIsCollapsed(false);
    }
  }, [isCollapsable]);

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    onChange(value);
  };

  const handleClear = () => {
    onChange('');
  };

  const handleClick = () => {
    inputRef.current?.focus();
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
        className={styles[`${baseClass}__search-icon`]}
        source={Search}
        disabled={isDisabled}
        kind="primary"
      />
      <Text as="div">
        <input
          role="searchbox"
          ref={inputRef}
          className={styles[inputBaseClass]}
          type="text"
          value={value}
          placeholder={placeholder}
          onChange={handleOnChange}
          onBlur={handleBlur}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          disabled={isDisabled}
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
        <div
          data-testid={`${baseClass}-loader`}
          className={styles[`${baseClass}__loader`]}
        >
          <Loader size="small" />
        </div>
      )}
    </div>
  );
};
