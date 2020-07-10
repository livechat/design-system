import * as React from 'react';
import * as PropTypes from 'prop-types';
import SearchIcon from 'react-material-icon-svg/dist/MagnifyIcon';
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';

import styles from './style.scss';

const baseClass = 'search-bar';
const noop = () => {};

class SearchBarComponent extends React.PureComponent {
  state = {
    searchTerm: ''
  };

  handleChange = e => {
    this.setState({
      searchTerm: e.target.value
    });
  };

  handleClear = () => {
    this.setState({
      searchTerm: ''
    });
    document.getElementById('search-bar-input').focus();
  };

  render() {
    const { className, innerRef, placeholder, ...restProps } = this.props;

    // TODO: Condition to display "x" button
    const shouldDisplayCloseButton = this.state.searchTerm;

    return (
      <span>
        <div className={styles[`${baseClass}__container`]}>
          <SearchIcon
            fill="#424d57"
            width="18px"
            height="18px"
            className={styles[`${baseClass}__icon`]}
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
          <input
            id="search-bar-input"
            type="input"
            placeholder={placeholder}
            ref={innerRef}
            value={this.state.searchTerm}
            onInput={this.handleChange}
            className={styles[`${baseClass}__input`]}
            {...restProps}
          />
        </div>
      </span>
    );
  }
}

const basePropTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func,
  placeholder: PropTypes.string
};

/* eslint-disable react/default-props-match-prop-types */
const baseDefaultProps = {
  placeholder: 'Search...',
  onChange: noop
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
