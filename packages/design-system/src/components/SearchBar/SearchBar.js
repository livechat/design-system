import * as React from 'react';
import * as PropTypes from 'prop-types';
import SearchIcon from 'react-material-icon-svg/dist/MagnifyIcon';
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';

import styles from './style.scss';
import { Loader } from '../Loader';
import { KeyCodes } from '../../constants/keyCodes';

const baseClass = 'search-bar';
const noop = () => {};

class SearchBarComponent extends React.PureComponent {
  state = {
    searchTerm: ''
  };

  // TODO: depends on mode use onChange provided from props or onSubmit
  // better yet - make 2 functions, which will load proper mode or func
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
    if (key.keyCode === KeyCodes.enter) {
      this.props.onSubmit(this.state.searchTerm);
    }
  };

  handleClear = () => {
    this.setState({
      searchTerm: ''
    });
    // TODO: what if we had two searchbars in code? Selecting by ID won't be good
    // it should be done by ref
    document.getElementById('search-bar-input').focus();
  };

  render() {
    const {
      className,
      innerRef,
      placeholder,
      loading,
      compact,
      error,
      onChange,
      onSubmit,
      ...restProps
    } = this.props;

    // TODO: Condition to display "x" button
    const shouldDisplayCloseButton = this.state.searchTerm && !loading;

    return (
      <span className={className}>
        <div className={styles[`${baseClass}__container`]}>
          <SearchIcon
            fill="#424d57"
            width="18px"
            height="18px"
            className={styles[`${baseClass}__icon--search`]}
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
            id="search-bar-input"
            type="input"
            placeholder={placeholder}
            ref={innerRef}
            value={this.state.searchTerm}
            onInput={this.handleChange}
            onKeyDown={this.handleKeyPress}
            className={styles[`${baseClass}__input`]}
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

SearchBarComponent.propTypes = {
  ...basePropTypes,
  innerRef: PropTypes.instanceOf(
    typeof Element === 'undefined' ? () => {} : Element
  )
};

SearchBarComponent.defaultProps = baseDefaultProps;

const SearchBar = React.forwardRef((props, ref) => (
  <SearchBarComponent innerRef={ref} {...props} />
));

SearchBar.propTypes = basePropTypes;

SearchBar.defaultProps = baseDefaultProps;

export default SearchBar;
