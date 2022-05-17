import * as React from 'react';
import cx from 'clsx';
import {
  Search as SearchIcon,
  Close,
} from '@livechat/design-system-icons/react/material';
import { Icon, IconTypeName } from '../Icon';
import { Loader } from '../Loader';

import styles from './Search.module.scss';
import { KeyCodes } from '../../utils/keyCodes';

const baseClass = 'search-input';
const inputBaseClass = `${baseClass}__input`;

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
  size = SearchSize.Medium,
  value,
  onChange,
}) => {
  const [searchValue, setSearchValue] = React.useState<string>(value || '');
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(true);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const mergedClassNames = cx(
    styles[`${inputBaseClass}`],
    styles[`${inputBaseClass}--${size}`],
    (isDisabled || isLoading) && styles[`${inputBaseClass}--disabled`],
    isCollapsable && styles[`${inputBaseClass}--collapsable`],
    !isCollapsed && styles[`${inputBaseClass}--collapsable--open`]
  );

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    setSearchValue(value);
    return !isControlledSubmit && onChange(value);
  };

  const handleOnClear = () => {
    setSearchValue('');
    return onChange('');
  };

  const handleOnClick = () => {
    if (!isCollapsable) {
      return;
    }

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
      data-testid={`${baseClass}-container`}
      className={styles[baseClass]}
      onClick={handleOnClick}
    >
      <Icon
        className={styles[`${baseClass}__search-icon`]}
        source={SearchIcon}
        disabled={isDisabled || isLoading}
        iconType={IconTypeName.Primary}
      />
      <input
        ref={inputRef}
        className={mergedClassNames}
        type="text"
        value={searchValue}
        placeholder={placeholder}
        onChange={handleOnChange}
        onKeyDown={handleOnKeyDown}
        disabled={isDisabled || isLoading}
      />
      {!!searchValue && !isDisabled && !isLoading && (
        <div
          className={styles[`${baseClass}__clear-icon`]}
          data-testid={`${baseClass}-clear-icon`}
          onClick={handleOnClear}
        >
          <Icon source={Close} />
        </div>
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
