import * as React from 'react';
import * as PropTypes from 'prop-types';
import MenuDownIcon from 'react-material-icon-svg/dist/MenuDownIcon';
import classNames from 'classnames/bind';
import styles from './style.scss';
import SelectList from './SelectList';
import MultiSelectHead from './MultiSelectHead';
import MultiSelectHeadItems from './MultiSelectHeadItems';
import Search from './Search';
import { KeyCodes } from '../../constants/keyCodes';

const cx = classNames.bind(styles);

const baseClass = 'multiselect';

class MultiSelectField extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.openedOnInit || false,
      searchPhrase: '',
      focusedItemKey: null,
      isFocused: false
    };

    this.timerId = null;
    this.containerRef = React.createRef();
    this.searchInputRef = React.createRef();
    this.headRef = React.createRef();
    this.clearButtonRef = React.createRef();
    this.listRef = React.createRef();
    this.selectedItemsContainerRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.openedOnInit) {
      this.onBodyOpen();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isOpen && prevState.isOpen !== this.state.isOpen) {
      this.onBodyOpen();
    } else if (!this.state.isOpen && prevState.isOpen !== this.state.isOpen) {
      this.onBodyClose();
    }

    if (
      prevProps.selected !== this.props.selected &&
      this.selectedItemsContainerRef.current
    ) {
      this.selectedItemsContainerRef.current.scrollTop = this.selectedItemsContainerRef.current.scrollHeight;
    }
  }

  componentWillUnmount() {
    this.onBodyClose();
    document.removeEventListener('keydown', this.onArrowPress);
  }

  onDocumentClick = event => {
    if (
      this.state.isOpen &&
      !this.containerRef.current.contains(event.target)
    ) {
      this.listRef.current.scrollTop = 0;
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
          v => this.filterItem(v) && this.props.selected !== v.key
        );
        const focusedItemKey =
          filteredItems.length > 0 ? filteredItems[0].key : null;

        this.setState({
          focusedItemKey
        });
      }
    );
  };

  onBodyOpen = () => {
    document.addEventListener('click', this.onDocumentClick);
    if (this.props.search) {
      this.timerId = setTimeout(() => {
        this.searchInputRef.current.focus();
      }, 150);
    }
  };

  onBodyClose = () => {
    document.removeEventListener('click', this.onDocumentClick);
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
  };

  onSelectHeadClick = event => {
    if (
      this.clearButtonRef.current &&
      this.clearButtonRef.current.contains(event.target)
    ) {
      return;
    }
    event.preventDefault();
    this.showSelectBody();
  };

  onSelectHeadFocus = () => {
    this.setState({
      isFocused: true
    });
    if (!this.state.isOpen) {
      document.addEventListener('keydown', this.onArrowPress);
    }
  };

  onSelectHeadBlur = () => {
    this.setState({
      isFocused: false
    });
    document.removeEventListener('keydown', this.onArrowPress);
  };

  onArrowPress = e => {
    if (e.keyCode === KeyCodes.arrowDown || e.keyCode === KeyCodes.arrowUp) {
      e.preventDefault();
      this.showSelectBody();
    }
  };

  getItemSelectedHandler = itemKey => event => {
    event.preventDefault();
    this.props.onItemSelected(itemKey);
  };

  getSelectedItems = () => {
    const { selected } = this.props;
    if (selected === null) {
      return null;
    }
    return selected;
  };

  getSelectedItemsModels = () => {
    const { selected, items } = this.props;
    if (selected === null) {
      return null;
    }

    return items.filter(item => selected.indexOf(item.key) > -1);
  };

  handleEnterKeyUse = itemKey => {
    this.props.onItemSelected(itemKey);
  };

  showSelectBody = () => {
    this.setState({
      isOpen: true,
      searchPhrase: ''
    });
  };

  hideSelectBody = () => {
    this.setState(
      {
        isOpen: false,
        focusedItemKey:
          this.props.toggleAllOptions || !this.props.items[0]
            ? null
            : this.props.items[0].key
      },
      () => {
        this.headRef.current.focus();
      }
    );
  };

  changeFocusedItem = itemKey => {
    if (this.props.toggleAllOptions && !itemKey) {
      return this.setState({
        focusedItemKey: null
      });
    }
    if (!itemKey) {
      return this.setState({
        focusedItemKey: this.props.items[0] ? this.props.items[0].key : null
      });
    }
    return this.setState({
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
      getItemBody,
      getSelectedItemBody,
      search,
      disabled,
      searchPlaceholder,
      placeholder,
      toggleAllOptions,
      maxSelectedItemsContainerHeight
    } = this.props;
    const selectedItems = this.getSelectedItems();
    const { isOpen, searchPhrase, focusedItemKey, isFocused } = this.state;
    const selectedItemsModels = this.getSelectedItemsModels();
    const filteredItems = items.filter(this.filterItem);

    return (
      <div ref={this.containerRef} className={styles[baseClass]}>
        <MultiSelectHead
          isFocused={isOpen || isFocused}
          ref={this.headRef}
          onClick={this.onSelectHeadClick}
          onFocus={this.onSelectHeadFocus}
          onBlur={this.onSelectHeadBlur}
        >
          <MultiSelectHeadItems
            ref={this.selectedItemsContainerRef}
            getSelectedItemBody={getSelectedItemBody}
            selectedItems={selectedItemsModels}
            isVisible
            maxHeight={maxSelectedItemsContainerHeight}
            placeholder={placeholder}
          />
          <Search
            isVisible={search}
            inputRef={this.searchInputRef}
            placeholder={searchPlaceholder || 'Search...'}
            value={searchPhrase}
            onChange={this.onSearchChange}
            disabled={disabled}
          />
          <MenuDownIcon
            className={styles[`${baseClass}__dropdown-icon`]}
            width="24px"
            height="24px"
            fill="#424d57"
          />
        </MultiSelectHead>
        <div
          className={cx({
            [`${baseClass}-body`]: true,
            [`${baseClass}-body--visible`]: isOpen && filteredItems.length > 0
          })}
        >
          <SelectList
            listRef={this.listRef}
            getItemBody={getItemBody}
            isOpen={isOpen}
            toggleAllOptions={toggleAllOptions}
            onListClose={this.hideSelectBody}
            items={filteredItems}
            getSelectedItemBody={getSelectedItemBody}
            selectedItems={selectedItems}
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

MultiSelectField.propTypes = {
  getItemBody: PropTypes.func.isRequired,
  getSelectedItemBody: PropTypes.func.isRequired,
  onItemSelected: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      props: PropTypes.object
    })
  ),
  searchPlaceholder: PropTypes.string,
  searchProperty: PropTypes.string,
  selected: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  search: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  openedOnInit: PropTypes.bool,
  toggleAllOptions: PropTypes.shape({
    onToggleAll: PropTypes.func.isRequired,
    selectLabel: PropTypes.string,
    clearLabel: PropTypes.string
  }),
  maxSelectedItemsContainerHeight: PropTypes.number.isRequired
};

MultiSelectField.defaultProps = {
  items: [],
  selected: null
};

export default MultiSelectField;
