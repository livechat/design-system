import * as React from 'react';
import cx from 'classnames';
import {
  Search as SearchIcon,
  Close,
} from '@livechat/design-system-icons/dist/material';
import Icon from './Icon';
import { Loader } from './Loader';

const baseClass = 'lc-search';

export const enum SearchSize {
  Compact = 'compact',
  Medium = 'medium',
  Large = 'large',
}

export interface ISearchProps {
  isCollapsable?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  placeholder?: string;
  size?: SearchSize;
  onChange: (value: string) => void;
}

export const Search: React.FC<ISearchProps> = ({
  isCollapsable,
  isDisabled,
  isLoading,
  placeholder = 'Search ...',
  size = SearchSize.Compact,
  onChange,
}) => {
  const [searchValue, setSearchValue] = React.useState<string>('');
  const [isfocused, setIsFocused] = React.useState<boolean>(false);
  const [isCollapsed, setIsCollapsed] = React.useState<boolean>(true);

  const mergedClassNames = cx(
    baseClass,
    `${baseClass}--${size}`,
    isfocused && `${baseClass}--focused`,
    (isDisabled || isLoading) && `${baseClass}--disabled`,
    isCollapsable && `${baseClass}--collapsable`,
    !isCollapsed && `${baseClass}--collapsable--open`
  );

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;

    setSearchValue(value);
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

    return setIsCollapsed(false);
  };

  return (
    <div className={mergedClassNames} onClick={handleOnClick}>
      <Icon
        className={`${baseClass}__search-icon`}
        source={SearchIcon}
        disabled={isDisabled || isLoading}
      />
      <input
        className={`${baseClass}__input`}
        type="text"
        value={searchValue}
        placeholder={placeholder}
        onChange={handleOnChange}
        onFocus={handleOnFocus}
        onBlur={handleOnBlur}
        disabled={isDisabled || isLoading}
      />
      {!!searchValue && !isDisabled && !isLoading && (
        <div onClick={handleOnClear}>
          <Icon className={`${baseClass}__clear-icon`} source={Close} />
        </div>
      )}
      {isLoading && <Loader size="small" />}
    </div>
  );
};
