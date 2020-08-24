import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import SearchIcon from 'react-material-icon-svg/dist/MagnifyIcon';
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';
import { debounce } from '@livechat/data-utils';

import styles from './style.scss';
import { Loader } from '../Loader';
import { KeyCodes } from '../../constants/keyCodes';

const baseClass = 'search-bar';
const noop = () => {};

class SearchBar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    // this.debouncedOnChange = debounce(this.props.debounceInMs, value => {
    //   this.props.onChange(value);
    // });

    this.state = {
      searchTerm: '',
      isInCompactMode: this.props.compact
    };
  }

  handleChange = e => {
    const { value } = e.target;
    const { debounceInMs, onChange } = this.props;

    this.setState({
      searchTerm: value
    });

    if (debounceInMs) {
      this.debouncedOnChange(value);
    } else {
      onChange(value);
    }
  };

  handleKeyPress = key => {
    const { onSubmit } = this.props;

    if (onSubmit) {
      if (key.keyCode === KeyCodes.enter) {
        onSubmit(this.state.searchTerm);
      }
    }
  };

  handleClear = () => {
    this.setState({
      searchTerm: ''
    });

    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }
  };

  handleCloseIconKeyDown = key => {
    if (key.keyCode === KeyCodes.enter) {
      this.handleClear();
    }
  };

  toggleCompactMode = () => {
    this.setState(
      prevState => ({
        isInCompactMode: !prevState.isInCompactMode
      }),
      () => {
        if (!this.state.isInCompactMode && this.inputRef.current) {
          this.inputRef.current.focus();
        }
      }
    );
  };

  render() {
    const {
      className,
      placeholder,
      value,
      loading,
      compact,
      error,
      onChange,
      onSubmit,
      ...restProps
    } = this.props;

    const { searchTerm, isInCompactMode } = this.state;

    const shouldDisplayCloseButton = searchTerm && !loading && !isInCompactMode;

    return (
      <span className={className}>
        <div className={styles[`${baseClass}__container`]}>
          <SearchIcon
            fill="#424d57"
            width="18px"
            height="18px"
            className={cx(`lc-${baseClass}__icon--search`, {
              [`lc-${baseClass}__icon--search-compact`]: compact
            })}
            onClick={compact ? this.toggleCompactMode : null}
          />
          {loading && (
            <Loader
              size="small"
              className={styles[`${baseClass}__icon--loader`]}
            />
          )}
          <input
            type="input"
            placeholder={placeholder}
            ref={this.inputRef}
            value={value || this.state.searchTerm}
            onInput={this.handleChange}
            onKeyDown={this.handleKeyPress}
            className={cx(`lc-${baseClass}__input`, {
              [`lc-${baseClass}__input-compact`]: isInCompactMode
            })}
            {...restProps}
          />
          {shouldDisplayCloseButton && (
            <CloseIcon
              fill="#424d57"
              width="18px"
              height="18px"
              onClick={this.handleClear}
              onKeyDown={this.handleCloseIconKeyDown}
              className={styles[`${baseClass}__icon--close`]}
              tabIndex="0"
            />
          )}
        </div>
        <span className={styles[`${baseClass}__error`]}>{error}</span>
      </span>
    );
  }
}

const basePropTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  value: PropTypes.string,
  loading: PropTypes.bool,
  compact: PropTypes.bool,
  debounceInMs: PropTypes.number,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

/* eslint-disable react/default-props-match-prop-types */
const baseDefaultProps = {
  placeholder: 'Search...',
  value: null,
  loading: false,
  compact: false,
  debounceInMs: 0,
  error: null,
  onChange: noop,
  onSubmit: null
};

SearchBar.propTypes = basePropTypes;

SearchBar.defaultProps = baseDefaultProps;

export default SearchBar;
