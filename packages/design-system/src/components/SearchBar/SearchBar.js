import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import SearchIcon from 'react-material-icon-svg/dist/MagnifyIcon';
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';

import styles from './style.scss';
import { Loader } from '../Loader';
import { KeyCodes } from '../../constants/keyCodes';

const baseClass = 'search-bar';
const noop = () => {};

class SearchBarComponent extends React.PureComponent {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();

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
      this.props.onChange(e.target.value);
    }
  };

  handleKeyPress = key => {
    // TODO: should ESC key clear input
    if (key.keyCode === KeyCodes.esc) {
      this.setState({
        searchTerm: ''
      });
    }

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

    // TODO: Condition to display "x" button
    const shouldDisplayCloseButton = searchTerm && !loading;

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
          {shouldDisplayCloseButton && (
            <CloseIcon
              fill="#424d57"
              width="18px"
              height="18px"
              onClick={this.handleClear}
              className={styles[`${baseClass}__icon--close`]}
            />
          )}
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
        </div>
        <span className={styles[`${baseClass}__error`]}>{error}</span>
      </span>
    );
  }
}

const basePropTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  placeholder: PropTypes.string,
  loading: PropTypes.bool,
  compact: PropTypes.bool,
  error: PropTypes.string
};

/* eslint-disable react/default-props-match-prop-types */
const baseDefaultProps = {
  placeholder: 'Search...',
  loading: false,
  compact: false,
  error: null,
  onChange: noop,
  onSubmit: null
};

SearchBarComponent.propTypes = basePropTypes;

SearchBarComponent.defaultProps = baseDefaultProps;

export default SearchBarComponent;
