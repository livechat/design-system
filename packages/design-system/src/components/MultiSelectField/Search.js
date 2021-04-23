import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import { KeyCodes } from '../../constants/keyCodes';

const baseClass = 'multiselect-head';
const cx = classNames.bind(styles);

const Search = props => {
  const {
    inputRef,
    size,
    placeholder,
    value,
    onChange,
    disabled,
    isDropdownOpen
  } = props;
  const onKeyDown = event => {
    if (event.keyCode === KeyCodes.enter) {
      event.preventDefault();
    }
  };

  return (
    <input
      ref={inputRef}
      className={cx({
        [`${baseClass}__search`]: true,
        [`${baseClass}__search--expanded`]:
          placeholder || (isDropdownOpen && value !== '')
      })}
      type="text"
      size={size}
      placeholder={placeholder}
      name="select-box-input"
      data-testid="multiselect-search-input"
      value={value}
      onChange={onChange}
      onKeyDown={onKeyDown}
      autoComplete="off"
      disabled={disabled}
    />
  );
};

Search.propTypes = {
  inputRef: PropTypes.shape({
    current: PropTypes.instanceOf(
      typeof Element === 'undefined' ? () => {} : Element
    )
  }),
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
  isDropdownOpen: PropTypes.bool,
  size: PropTypes.number
};

export default Search;
