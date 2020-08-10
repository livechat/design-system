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
    this.onChangeDebounced = debounce(this.props.debounceInMs, value => {
      this.props.onChange(value);
    });

    this.state = {
      searchTerm: '',
      isInCompactMode: this.props.compact
    };
  }

  handleChange = e => {
    this.setState({
      searchTerm: e.target.value
    });

    // If onSubmit wasn't passed then call onChange
    if (!this.props.onSubmit) {
      this.onChangeDebounced(e.target.value);
    }
  };

  handleKeyPress = key => {
    if (this.props.onSubmit) {
      if (key.keyCode === KeyCodes.enter) {
        // TODO: if onSubmit is present is it supposed to be controlled/uncontrolled?
        this.props.onSubmit(this.state.searchTerm);
      }
    }
  };

  handleClear = () => {
    this.setState({
      searchTerm: ''
    });

    this.inputRef.current.focus();
  };

  handleKeyDown = key => {
    if (key.keyCode === KeyCodes.enter) {
      this.handleClear();
    }
  };

  toggleCompactMode = () => {
    this.setState({ isInCompactMode: !this.state.isInCompactMode });
  };

  render() {
    const {
      className,
      placeholder,
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
            value={this.state.searchTerm}
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
              onKeyDown={this.handleKeyDown}
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
  // value: PropTypes.string,
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
  // value: '',
  loading: false,
  compact: false,
  debounceInMs: 300,
  error: null,
  onChange: noop,
  onSubmit: null
};

SearchBar.propTypes = basePropTypes;

SearchBar.defaultProps = baseDefaultProps;

export default SearchBar;
