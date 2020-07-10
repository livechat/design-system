import * as React from 'react';
import * as PropTypes from 'prop-types';
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

  render() {
    const { className, innerRef, ...restProps } = this.props;

    return (
      <span>
        <input
          type="input"
          placeholder="Search..."
          ref={innerRef}
          value={this.state.searchTerm}
          onInput={this.handleChange}
          className={styles[`${baseClass}`]}
          {...restProps}
        />
      </span>
    );
  }
}

const basePropTypes = {
  className: PropTypes.string,
  onChange: PropTypes.func
};

/* eslint-disable react/default-props-match-prop-types */
const baseDefaultProps = {
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
