import * as React from 'react';
import debounce from 'lodash.debounce';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import SearchIcon from 'react-material-icon-svg/dist/MagnifyIcon';
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';

import styles from './style.scss';
import { Loader } from '../Loader';
import FieldError from '../FieldError';
import { Input } from '../InputField';
import { KeyCodes } from '../../constants/keyCodes';

const baseClass = 'search-bar';

export class SearchBar extends React.PureComponent {
  constructor(props) {
    super(props);

    this.inputRef = React.createRef();
    if (this.props.debounceTime) {
      this.debouncedOnChange = debounce(value => {
        this.props.onChange(value);
      }, this.props.debounceTime);
    }

    this.state = {
      searchTerm: '',
      isInCompactMode: props.collapsable
    };
  }

  componentWillUnmount() {
    if (this.debouncedOnChange) {
      this.debouncedOnChange.cancel();
    }
  }

  handleChange = event => {
    const { value } = event.target;
    const { debounceTime, onChange } = this.props;

    this.setState({
      searchTerm: value
    });

    if (debounceTime) {
      this.debouncedOnChange(value);
      return;
    }

    if (onChange) {
      onChange(value);
    }
  };

  handleKeyPress = event => {
    const { onSubmit, onKeyDown } = this.props;

    if (onKeyDown) {
      onKeyDown(event);
    }

    if (onSubmit) {
      if (event.keyCode === KeyCodes.enter) {
        onSubmit(this.state.searchTerm);
      }
    }
  };

  handleClear = () => {
    const { onChange, onSubmit, onClear } = this.props;
    const searchFunction = onClear || onSubmit || onChange;

    this.setState({
      searchTerm: ''
    });

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
    this.setState(
      prevState => ({
        isInCompactMode: !!this.props.collapsable && !prevState.isInCompactMode
      }),
      () => {
        if (this.state.isInCompactMode && this.props.onCollapse) {
          this.props.onCollapse();
        }

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
      collapsable,
      error,
      debounceTime,
      onClear,
      onSubmit,
      onChange,
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
  debounceTime: PropTypes.number,
  error: PropTypes.string,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func,
  onClear: PropTypes.func,
  /**
   * Pass onKeyDown function if you want to use event props for example event.preventDefault()
   */
  onKeyDown: PropTypes.func,
  onCollapse: PropTypes.func
};

SearchBar.defaultProps = {
  placeholder: 'Search...',
  value: null,
  loading: false,
  collapsable: false,
  debounceTime: 0,
  error: null,
  onChange: null,
  onSubmit: null,
  onClear: null,
  onKeyDown: null,
  onCollapse: null
};

export default SearchBar;
