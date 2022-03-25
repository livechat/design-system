import * as React from 'react';
import cx from 'clsx';
import {
  Search as SearchIcon,
  Close,
} from '@livechat/design-system-icons/react/material';
import { KeyCodes } from 'utils/keyCodes';
import { Icon } from 'components/Icon';
import { Loader } from '../Loader';

import styles from './Search.module.scss';

const baseClass = 'search';

export const enum SearchSize {
  Compact = 'compact',
  Medium = 'medium',
  Large = 'large',
}

export interface ISearchProps {
  isControlledSubmit?: boolean;
  isCollapsable?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  placeholder?: string;
  size?: SearchSize;
  value?: string;
  onChange: (value: string) => void;
}

export const Search: React.FC<ISearchProps> = ({
  isControlledSubmit,
  isCollapsable,
  isDisabled,
  isLoading,
  placeholder = 'Search ...',
  size = SearchSize.Compact,
  value,
  onChange,
}) => {
  const [searchValue, setSearchValue] = React.useState<string>(value || '');
  const [isFocused, setIsFocused] = React.useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(true);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const mergedClassNames = cx(
    styles[baseClass],
    styles[`${baseClass}--${size}`],
    isFocused && styles[`${baseClass}--focused`],
    (isDisabled || isLoading) && styles[`${baseClass}--disabled`],
    isCollapsable && styles[`${baseClass}--collapsable`],
    !isCollapsed && styles[`${baseClass}--collapsable--open`]
  );

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    setSearchValue(value);

    if (isControlledSubmit) {
      return;
    }

    return onChange(value);
  };

  const handleOnFocus = () => {
    return setIsFocused(true);
  };

  const handleOnBlur = () => {
    return setIsFocused(false);
  };

  const handleOnClear = () => {
    setSearchValue('');
    return onChange('');
  };

  const handleOnClick = () => {
    if (!isCollapsable) {
      return;
    }

    setIsFocused(true);
    inputRef.current?.focus();
    return setIsCollapsed(false);
  };

  const handleOnKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isControlledSubmit && e.key === KeyCodes.enter) {
      e.preventDefault();
      return onChange(searchValue);
    }
  };

  return (
    <div
      data-testid={styles[`${baseClass}-container`]}
      className={mergedClassNames}
      onClick={handleOnClick}
    >
      <Icon
        className={styles[`${baseClass}__search-icon`]}
        source={SearchIcon}
        disabled={isDisabled || isLoading}
      />
      <input
        ref={inputRef}
        className={styles[`${baseClass}__input`]}
        type="text"
        value={searchValue}
        placeholder={placeholder}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        onKeyDown={handleOnKeyDown}
        disabled={isDisabled || isLoading}
      />
      {!!searchValue && !isDisabled && !isLoading && (
        <div
          data-testid={styles[`${baseClass}-clear-icon`]}
          onClick={handleOnClear}
        >
          <Icon className={styles[`${baseClass}__clear-icon`]} source={Close} />
        </div>
      )}
      {isLoading && (
        <div data-testid={styles[`${baseClass}-loader`]}>
          <Loader size="small" />
        </div>
      )}
    </div>
  );
};
