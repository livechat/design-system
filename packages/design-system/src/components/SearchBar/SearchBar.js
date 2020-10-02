import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import SearchIcon from 'react-material-icon-svg/dist/MagnifyIcon';
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';
import { debounce } from '@livechat/data-utils';

import styles from './style.scss';
import { Loader } from '../Loader';
import FieldError from '../FieldError';
import { Input } from '../InputField';
import { KeyCodes } from '../../constants/keyCodes';

const baseClass = 'search-bar';
const noop = () => {};

class SearchBar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    this.debouncedOnChange = debounce(this.props.debounceInMs, value => {
      this.props.onChange(value);
    });

    this.state = {
      searchTerm: '',
      isInCompactMode: props.collapsable
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

  handleKeyPress = event => {
    const { onSubmit } = this.props;

    if (onSubmit) {
      if (event.keyCode === KeyCodes.enter) {
        onSubmit(this.state.searchTerm);
      }
    }
  };

  handleClear = () => {
    const { onChange, onSubmit } = this.props;
    const searchFunction = onSubmit || onChange;

    this.setState({
      searchTerm: ''
    });

    // 1) Cancel debounced search
    // 2) Use onClear instead of onSubmit | onChange function
    searchFunction('');

    if (this.inputRef.current) {
      this.inputRef.current.focus();
    }
  };

  handleClearButtonKeyDown = event => {
    if (event.keyCode === KeyCodes.enter) {
      this.handleClear();
    }
  };

  toggleCompactMode = () => {
    if (this.props.collapsable) {
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
    }
  };

  render() {
    const {
      className,
      placeholder,
      value,
      loading,
      collapsable,
      error,
      ...restProps
    } = this.props;
    const { searchTerm, isInCompactMode } = this.state;

    const shouldDisplayClearButton = searchTerm && !loading && !isInCompactMode;

    const searchIconClassName = cx(`lc-${baseClass}__icon--search`, {
      [`lc-${baseClass}__icon--search-compact`]: collapsable
    });
    const inputClassName = cx(`lc-${baseClass}__input`, {
      [`lc-${baseClass}__input-compact`]: isInCompactMode
    });

    return (
      <div className={className} {...restProps}>
        <div className={styles[`${baseClass}__container`]}>
          <SearchIcon
            width="18px"
            height="18px"
            className={searchIconClassName}
            onClick={this.toggleCompactMode}
          />
          {loading && (
            <Loader
              size="small"
              className={styles[`${baseClass}__icon--loader`]}
            />
          )}
          <Input
            placeholder={placeholder}
            ref={this.inputRef}
            value={value || this.state.searchTerm}
            onChange={this.handleChange}
            onKeyDown={this.handleKeyPress}
            className={inputClassName}
          />
          {shouldDisplayClearButton && (
            <CloseIcon
              width="18px"
              height="18px"
              onClick={this.handleClear}
              onKeyDown={this.handleClearButtonKeyDown}
              className={styles[`${baseClass}__icon--clear`]}
              tabIndex="0"
            />
          )}
        </div>
        {error && <FieldError>{error}</FieldError>}
      </div>
    );
  }
}

SearchBar.propTypes = {
  className: PropTypes.string,
  placeholder: PropTypes.string,
  /**
   * Pass this prop if you want to control searchbar term from parent component
   */
  value: PropTypes.string,
  loading: PropTypes.bool,
  /**
   * Pass collapsable if you want to display extendable searchbar (usually for smaller screens)
   */
  collapsable: PropTypes.bool,
  /**
   * Pass value in `ms` along with `onChange` handler if you want to query by specific number of ms
   */
  debounceInMs: PropTypes.number,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func
};

SearchBar.defaultProps = {
  placeholder: 'Search...',
  value: null,
  loading: false,
  collapsable: false,
  debounceInMs: 0,
  error: null,
  onChange: noop,
  onSubmit: null
};

export default SearchBar;
