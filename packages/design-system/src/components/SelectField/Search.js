import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import { KeyCodes } from '../../constants/keyCodes';

const baseClass = 'select-head';
const cx = classNames.bind(styles);

const Search = props => {
  const { inputRef, isVisible, placeholder, value, onChange, disabled } = props;
  const onKeyDown = event => {
    if (event.keyCode === KeyCodes.enter) {
      event.preventDefault();
    }
  };

  return (
    <div
      className={cx({
        [`${baseClass}__search`]: true,
        [`${baseClass}__search--visible`]: isVisible
      })}
    >
      <input
        ref={inputRef}
        className={styles[`${baseClass}__input`]}
        type="text"
        placeholder={placeholder}
        name="select-box-input"
        data-testid="select-search-input"
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        autoComplete="off"
        disabled={disabled}
      />
    </div>
  );
};

Search.propTypes = {
  inputRef: PropTypes.shape({
    current: PropTypes.instanceOf(
      typeof Element === 'undefined' ? () => {} : Element
    )
  }),
  isVisible: PropTypes.bool,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
};

export default Search;
