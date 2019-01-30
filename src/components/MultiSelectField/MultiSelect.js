import * as React from 'react';
import * as PropTypes from 'prop-types';
import MenuDownIcon from 'react-material-icon-svg/dist/MenuDownIcon';
import classNames from 'classnames/bind';
import styles from './style.scss';
import MultiSelectList from './MultiSelectList';
import MultiSelectHead from './MultiSelectHead';
import MultiSelectHeadItem from './MultiSelectHeadItem';
import Search from './Search';
import { KeyCodes } from '../../constants/keyCodes';
import getMergedClassNames from '../../utils/getMergedClassNames';

const cx = classNames.bind(styles);

const baseClass = 'multiselect';

class MultiSelect extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.openedOnInit || false,
      searchPhrase: '',
      focusedItemKey: null,
      isFocused: false
    };

    this.timeouts = [];
    this.containerRef = React.createRef();
    this.searchInputRef = React.createRef();
    this.headRef = React.createRef();
    this.listRef = React.createRef();
    this.selectedItemsContainerRef = React.createRef();
  }

  componentDidMount() {
    if (this.props.openedOnInit) {
      this.props.onDropdownToggle(true);
      this.onBodyOpen();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.isOpen && prevState.isOpen !== this.state.isOpen) {
      this.props.onDropdownToggle(true);
      this.onBodyOpen();
    } else if (!this.state.isOpen && prevState.isOpen !== this.state.isOpen) {
      this.props.onDropdownToggle(false);
      this.onBodyClose();
    }

    if (this.shouldScrollItemsContainer(prevProps)) {
      this.selectedItemsContainerRef.current.scrollTop = this.selectedItemsContainerRef.current.scrollHeight;
    }
  }

  componentWillUnmount() {
    this.onBodyClose();
    document.removeEventListener('keydown', this.onArrowKeydown);
    document.removeEventListener('keydown', this.onBackspaceKeydown);
    this.timeouts.forEach(timerId => {
      clearTimeout(timerId);
    });
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
        isOpen: true,
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
    document.addEventListener('keydown', this.onBackspaceKeydown);
    this.delayedInputFocus();
  };

  onBodyClose = () => {
    document.removeEventListener('click', this.onDocumentClick);
    if (!this.state.isFocused) {
      document.removeEventListener('keydown', this.onBackspaceKeydown);
    }
  };

  onSelectHeadClick = event => {
    event.preventDefault();
    if (!this.state.isOpen) {
      this.delayedInputFocus();
      this.showSelectBody();
    } else {
      this.hideSelectBody();
    }
  };

  onSelectHeadFocus = () => {
    this.setState({
      isFocused: true
    });
    document.addEventListener('keydown', this.onBackspaceKeydown);
    if (!this.state.isOpen) {
      document.addEventListener('keydown', this.onArrowKeydown);
    }
  };

  onSelectHeadBlur = () => {
    this.setState({
      isFocused: false
    });
    document.removeEventListener('keydown', this.onArrowKeydown);
    if (!this.state.isOpen) {
      document.removeEventListener('keydown', this.onBackspaceKeydown);
    }
  };

  onArrowKeydown = e => {
    if (e.keyCode === KeyCodes.arrowDown || e.keyCode === KeyCodes.arrowUp) {
      e.preventDefault();
      if (!this.state.isOpen) {
        this.showSelectBody();
      }
    }
  };

  onBackspaceKeydown = e => {
    const isCorrectKeyCode = e.keyCode === KeyCodes.backspace;
    const isSearchPhraseEmpty = this.state.searchPhrase === '';
    const isAnyItemsToRemove =
      this.props.selected && this.props.selected.length > 0;
    if (isCorrectKeyCode && isSearchPhraseEmpty && isAnyItemsToRemove) {
      e.preventDefault();
      const lastItemKey = this.props.selected[this.props.selected.length - 1];
      this.delayedItemRemove(lastItemKey);
    }
  };

  getItemSelectedHandler = itemKey => event => {
    event.preventDefault();
    this.handleItemSelect(itemKey);
    this.delayedInputFocus();
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

    return selected.reduce((acc, selectedItemId) => {
      const selectedItemModel = items.find(item => item.key === selectedItemId);
      if (selectedItemModel) {
        return [...acc, selectedItemModel];
      }
      return acc;
    }, []);
  };

  getDefaultInputSize = selectedItems => {
    if (
      (!selectedItems || selectedItems.length === 0) &&
      this.props.placeholder
    )
      return this.props.placeholder.length;
    return 1;
  };

  getInputSize = selectedItems => {
    const defaultInputSize = this.getDefaultInputSize(selectedItems);

    if (this.state.searchPhrase.length > defaultInputSize) {
      return this.state.searchPhrase.length;
    }
    return defaultInputSize;
  };

  getSearchPlaceholder = selectedItems => {
    if (
      (!selectedItems || selectedItems.length === 0) &&
      this.props.placeholder
    ) {
      return this.props.placeholder;
    }
    return '';
  };

  getSelectedItemsPlaceholder = selectedItems => {
    if (
      (!selectedItems || selectedItems.length === 0) &&
      this.props.placeholder
    ) {
      return (
        <div className={styles[`${baseClass}__placeholder`]}>
          {this.props.placeholder}
        </div>
      );
    }
    return null;
  };

  shouldScrollItemsContainer = prevProps => {
    if (
      this.props.selected === null ||
      !this.selectedItemsContainerRef.current
    ) {
      return false;
    }
    return (
      (prevProps.selected === null && this.props.selected) ||
      prevProps.selected.length < this.props.selected.length
    );
  };

  handleItemSelect = itemKey => {
    this.setState({
      searchPhrase: ''
    });
    this.props.onItemSelect(itemKey);
  };

  handleEnterKeyUse = itemKey => this.handleItemSelect(itemKey);

  handleItemRemove = (e, itemKey) => {
    e.preventDefault();
    e.stopPropagation();
    this.delayedItemRemove(itemKey);
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
        searchPhrase: '',
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

  delayedInputFocus = () => {
    if (this.props.search && this.searchInputRef.current) {
      const timerId = setTimeout(() => {
        this.searchInputRef.current.focus();
      }, 0);
      this.timeouts = [...this.timeouts, timerId];
    }
  };

  delayedItemRemove = itemKey => {
    const timerId = setTimeout(() => {
      this.props.onItemRemove(itemKey);
    }, 0);
    this.timeouts = [...this.timeouts, timerId];
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
      id,
      className,
      error,
      items,
      searchProperty,
      getItemBody,
      getSelectedItemBody,
      search,
      disabled,
      toggleAllOptions,
      maxItemsContainerHeight
    } = this.props;
    const selectedItems = this.getSelectedItems();
    const { isOpen, searchPhrase, focusedItemKey, isFocused } = this.state;
    const selectedItemsModels = this.getSelectedItemsModels();
    const filteredItems = items.filter(this.filterItem);

    const mergedClassNames = getMergedClassNames(
      cx({
        [baseClass]: true,
        [`${baseClass}--error`]: error
      }),
      className
    );

    return (
      <div ref={this.containerRef} className={mergedClassNames} id={id}>
        <MultiSelectHead
          isFocused={isOpen || isFocused}
          ref={this.headRef}
          onClick={this.onSelectHeadClick}
          onFocus={this.onSelectHeadFocus}
          onBlur={this.onSelectHeadBlur}
        >
          <div
            className={styles[`${baseClass}-head__items`]}
            style={{ maxHeight: maxItemsContainerHeight }}
            ref={this.selectedItemsContainerRef}
          >
            {selectedItemsModels &&
              selectedItemsModels.map(item => (
                <MultiSelectHeadItem
                  key={item.key}
                  getSelectedItemBody={getSelectedItemBody}
                  item={item}
                  onRemove={this.handleItemRemove}
                />
              ))}
            {search ? (
              <Search
                isDropdownOpen={isOpen}
                inputRef={this.searchInputRef}
                placeholder={this.getSearchPlaceholder(selectedItems)}
                size={this.getInputSize(selectedItems)}
                value={searchPhrase}
                onChange={this.onSearchChange}
                disabled={disabled}
              />
            ) : (
              this.getSelectedItemsPlaceholder(selectedItems)
            )}
          </div>
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
          <MultiSelectList
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

MultiSelect.propTypes = {
  id: PropTypes.string,
  className: PropTypes.string,
  error: PropTypes.string,
  getItemBody: PropTypes.func.isRequired,
  getSelectedItemBody: PropTypes.func.isRequired,
  onItemSelect: PropTypes.func.isRequired,
  onItemRemove: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      props: PropTypes.object
    })
  ),
  placeholder: PropTypes.string,
  searchProperty: PropTypes.string,
  selected: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  search: PropTypes.bool,
  disabled: PropTypes.bool,
  openedOnInit: PropTypes.bool,
  toggleAllOptions: PropTypes.shape({
    onToggleAll: PropTypes.func.isRequired,
    selectLabel: PropTypes.string,
    clearLabel: PropTypes.string
  }),
  maxItemsContainerHeight: PropTypes.number.isRequired,
  onDropdownToggle: PropTypes.func
};

MultiSelect.defaultProps = {
  items: [],
  selected: null,
  onDropdownToggle: () => {}
};

export default MultiSelect;
