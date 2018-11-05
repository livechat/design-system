import * as React from 'react';
import * as PropTypes from 'prop-types';
import MenuDownIcon from 'react-material-icon-svg/dist/MenuDownIcon';
import classNames from 'classnames/bind';
import styles from './style.scss';
import SelectList from './SelectList';
import SelectHead from './SelectHead';
import SelectHeadItem from './SelectHeadItem';
import ClearButton from './ClearButton';
import Search from './Search';

const cx = classNames.bind(styles);

const baseClass = 'select';

class SelectField extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.openedOnInit || false,
      searchPhrase: '',
      focusedItemKey: null
    };

    this.timerId = null;
    this.containerRef = React.createRef();
    this.searchInputRef = React.createRef();
    this.headRef = React.createRef();
    this.clearButtonRef = React.createRef();
  }

  componentDidUpdate(_prevProps, prevState) {
    if (this.state.isOpen && prevState.isOpen !== this.state.isOpen) {
      document.addEventListener('click', this.onDocumentClick);
      this.timerId = setTimeout(() => {
        this.searchInputRef.current.focus();
      }, 150);
    } else if (!this.state.isOpen && prevState.isOpen !== this.state.isOpen) {
      document.removeEventListener('click', this.onDocumentClick);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick);
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  }

  onDocumentClick = event => {
    if (
      this.state.isOpen &&
      !this.containerRef.current.contains(event.target)
    ) {
      this.hideSelectBody();
    }
  };

  onSearchChange = event => {
    this.setState(
      {
        searchPhrase: event.target.value
      },
      () => {
        const filteredItems = this.props.items.filter(
          v => this.filterItem(v) && this.props.selectedItem !== v.key
        );
        const focusedItemKey =
          filteredItems.length > 0 ? filteredItems[0].key : null;

        this.setState({
          focusedItemKey
        });
      }
    );
  };

  onSelectHeadClick = event => {
    if (this.clearButtonRef.current.contains(event.target)) {
      return;
    }
    event.preventDefault();
    this.showSelectBody();
  };

  getItemSelectedHandler = itemKey => event => {
    event.preventDefault();

    this.props.onItemSelected(itemKey);
    this.hideSelectBody();
  };

  handleEnterKeyUse = number => {
    this.props.onItemSelected(number);
    this.hideSelectBody();
  };

  showSelectBody = () => {
    this.setState({
      isOpen: true,
      searchPhrase: ''
    });
  };

  hideSelectBody = () => {
    this.setState({
      isOpen: false
    });
  };

  changeFocusedItem = itemKey => {
    this.setState({
      focusedItemKey: itemKey
    });
  };

  clearSelectedOption = e => {
    e.preventDefault();
    e.stopPropagation();
    this.props.onItemSelected(null);
  };

  filterItem = item => {
    const { searchProperty } = this.props;
    const { searchPhrase } = this.state;

    if (searchPhrase) {
      if (!(searchProperty in item.props)) {
        return false;
      }

      return item.props[searchProperty]
        .toLocaleLowerCase()
        .includes(searchPhrase.toLocaleLowerCase());
    }

    return true;
  };

  render() {
    const {
      items,
      searchProperty,
      selectedItem,
      getItemBody,
      getSelectedItemBody,
      search,
      required,
      disabled,
      selectedItemPlaceholder
    } = this.props;
    const { isOpen, searchPhrase, focusedItemKey } = this.state;
    const selectedItemModel = items.find(item => item.key === selectedItem);
    const filteredItems = items.filter(v => this.filterItem(v));

    return (
      <div ref={this.containerRef} className={styles[baseClass]}>
        <SelectHead
          isFocused={isOpen}
          ref={this.headRef}
          onClick={this.onSelectHeadClick}
          onFocus={this.showSelectBody}
        >
          <SelectHeadItem
            getSelectedItemBody={getSelectedItemBody}
            selectedItem={selectedItemModel}
            isVisible={!(isOpen && search)}
            placeholder={selectedItemPlaceholder}
          />
          <Search
            isVisible={!search ? false : isOpen}
            inputRef={this.searchInputRef}
            placeholder={this.props.placeholder || 'Search...'}
            value={searchPhrase}
            onChange={this.onSearchChange}
            disabled={disabled}
          />
          <ClearButton
            isVisible={!!selectedItemModel && !isOpen && !required}
            ref={this.clearButtonRef}
            clearSelectedOption={this.clearSelectedOption}
          />
          <MenuDownIcon width="24px" height="24px" fill="#424d57" />
        </SelectHead>
        <div
          className={cx({
            [`${baseClass}-body`]: true,
            [`${baseClass}-body--visible`]: isOpen && filteredItems.length > 0
          })}
        >
          <SelectList
            getItemBody={getItemBody}
            isOpen={isOpen}
            onListClose={this.hideSelectBody}
            items={filteredItems}
            getSelectedItemBody={getSelectedItemBody}
            selectedItem={selectedItem}
            getItemSelectedHandler={this.getItemSelectedHandler}
            searchPhrase={searchPhrase}
            searchProperty={searchProperty}
            onEnterKey={this.handleEnterKeyUse}
            onFocusedItemChange={this.changeFocusedItem}
            focusedItemKey={focusedItemKey}
          />
        </div>
      </div>
    );
  }
}

SelectField.propTypes = {
  getItemBody: PropTypes.func.isRequired,
  getSelectedItemBody: PropTypes.func.isRequired,
  onItemSelected: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      props: PropTypes.object
    })
  ),
  selectedItemPlaceholder: PropTypes.string,
  searchProperty: PropTypes.string,
  selectedItem: PropTypes.string,
  search: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  openedOnInit: PropTypes.bool
};

SelectField.defaultProps = {
  items: [],
  selectedItem: null
};

export default SelectField;
