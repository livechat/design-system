import * as React from 'react';
import cx from 'clsx';
import { Search, Close } from '@livechat/design-system-icons/react/material';
import { Icon } from '../Icon';
import { Loader } from '../Loader';

import styles from './Search.module.scss';
import { KeyCodes } from '../../utils/keyCodes';

const baseClass = 'search-input';
const inputBaseClass = `${baseClass}__input`;

export interface ISearchInputProps {
  isCollapsable?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  placeholder?: string;
  size?: 'compact' | 'medium' | 'large';
  value: string;
  className?: string;
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
      {isCloseIconVisible && (
        <button
          aria-label="Clear search"
          title="Clear search"
          className={styles[`${baseClass}__clear-icon`]}
          onClick={handleClear}
        >
          <Icon source={Close} kind="primary" />
        </button>
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
