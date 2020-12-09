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
      searchTerm: props.value || '',
      isCollapsed: props.collapsable
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

  handleBlur = event => {
    if (this.props.onBlur) {
      this.props.onBlur(event);
    }

    if (this.props.collapseOnBlur) {
      this.setState(
        {
          isCollapsed: true
        },
        () => {
          if (this.props.onCollapse) {
            this.props.onCollapse();
          }
        }
      );
    }
  };

  handleFocus = event => {
    if (this.props.onFocus) {
      this.props.onFocus(event);
    }

    if (this.props.expandOnFocus) {
      this.setState(
        {
          isCollapsed: false
        },
        () => {
          if (this.inputRef.current) {
            this.inputRef.current.focus();
          }

          if (this.props.onExpand) {
            this.props.onExpand();
          }
        }
      );
    }
  };

  toggleSearchBarMode = () => {
    this.setState(
      prevState => ({
        isCollapsed: !!this.props.collapsable && !prevState.isCollapsed
      }),
      () => {
        if (this.state.isCollapsed && this.props.onCollapse) {
          this.props.onCollapse();
        }

        if (!this.state.isCollapsed) {
          if (this.inputRef.current) {
            this.inputRef.current.focus();
          }

          if (this.props.onExpand) {
            this.props.onExpand();
          }
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
      collapseOnBlur,
      expandOnFocus,
      onClear,
      onSubmit,
      onChange,
      onKeyDown,
      onCollapse,
      onExpand,
      onBlur,
      onFocus,
      forwardedRef,
      ...restProps
    } = this.props;
    const { searchTerm, isCollapsed } = this.state;

    const shouldDisplayClearButton = searchTerm && !loading && !isCollapsed;

    const searchIconClassName = cx(
      [`lc-${baseClass}__icon`, `lc-${baseClass}__search-icon`],
      {
        [`lc-${baseClass}__search-icon--interactive`]: collapsable
      }
    );

    const inputClassName = cx(`lc-${baseClass}__input`, {
      [`lc-${baseClass}__input--collapsed`]: isCollapsed
    });

    const closeIconClassName = cx(
      [`lc-${baseClass}__icon`, `lc-${baseClass}__clear-icon`],
      {
        [`lc-${baseClass}__clear-icon--hidden`]: !shouldDisplayClearButton
      }
    );

    return (
      <div className={className} ref={forwardedRef} {...restProps}>
        <div className={styles[`${baseClass}__container`]}>
          <SearchIcon
            width="18px"
            height="18px"
            className={searchIconClassName}
            onClick={this.toggleSearchBarMode}
          />
          {loading && (
            <Loader
              size="small"
              className={cx([
                `lc-${baseClass}__icon`,
                `lc-${baseClass}__loader`
              ])}
            />
          )}
          <Input
            placeholder={placeholder}
            ref={this.inputRef}
            value={value != null ? value : this.state.searchTerm}
            onChange={this.handleChange}
            onFocus={this.handleFocus}
            onBlur={this.handleBlur}
            onKeyDown={this.handleKeyPress}
            className={inputClassName}
            data-testid="search-input"
          />
          <CloseIcon
            width="18px"
            height="18px"
            onClick={shouldDisplayClearButton ? this.handleClear : null}
            onKeyDown={
              shouldDisplayClearButton ? this.handleClearButtonKeyDown : null
            }
            className={closeIconClassName}
            tabIndex="0"
            data-testid="close-button"
          />
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
   * Use if you want to collapse the component on blur
   */
  collapseOnBlur: PropTypes.bool,
  /**
   * Use if you want to expand the component on focus
   */
  expandOnFocus: PropTypes.bool,
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
  onCollapse: PropTypes.func,
  onExpand: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  forwardedRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any })
  ])
};

SearchBar.defaultProps = {
  placeholder: 'Search...',
  debounceTime: 0
};

/* eslint prefer-arrow-callback: ["error", { "allowNamedFunctions": true }] */
export default React.forwardRef(function SearchBarWithRef(props, ref) {
  return <SearchBar {...props} forwardedRef={ref} />;
});
