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
      isOpen: props.openedOnInit || props.isOpen || false,
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
    if (this.state.isOpen) {
      this.props.onDropdownToggle(true);
      this.onBodyOpen();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const hasIsOpenChanged =
      this.getIsOpen(prevProps, prevState) !== this.getIsOpen();

    if (this.getIsOpen() && hasIsOpenChanged) {
      this.onBodyOpen();
    } else if (!this.getIsOpen() && hasIsOpenChanged) {
      this.onBodyClose();
    }

    if (
      this.shouldScrollItemsContainer(prevProps) &&
      this.selectedItemsContainerRef.current
    ) {
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
      this.getIsOpen() &&
      this.containerRef.current &&
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
        this.props.onDropdownToggle(true);
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
    if (this.props.disabled) {
      return;
    }
    if (!this.getIsOpen()) {
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

  getIsOpen = (props = this.props, state = this.state) => {
    if (props.disabled) {
      return false;
    }
    return this.isIsOpenControlled() ? props.isOpen : state.isOpen;
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
    if (this.props.shouldCloseOnSelect) {
      this.hideSelectBody();
    }
  };

  handleEnterKeyUse = itemKey => this.handleItemSelect(itemKey);

  handleItemRemove = (e, itemKey) => {
    e.preventDefault();
    e.stopPropagation();
    this.delayedItemRemove(itemKey);
  };

  showSelectBody = () => {
    this.setState(
      {
        isOpen: true,
        searchPhrase: ''
      },
      () => {
        this.props.onDropdownToggle(true);
      }
    );
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
        this.props.onDropdownToggle(false);
        if (this.headRef.current) {
          this.headRef.current.focus();
        }
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

  isIsOpenControlled = () => this.props.isOpen !== undefined;

  filterItem = item => {
    const { searchProperty } = this.props;
    const { searchPhrase } = this.state;

    if (searchPhrase) {
      if (typeof searchProperty === 'string') {
        if (!(searchProperty in item.props)) {
          return false;
        }

        return item.props[searchProperty]
          .toLocaleLowerCase()
          .includes(searchPhrase.toLocaleLowerCase());
      } else if (Array.isArray(searchProperty) && searchProperty.length > 0) {
        const validSearchProperties = searchProperty.filter(p => item.props[p]);

        if (validSearchProperties.length === 0) {
          return false;
        }
        return validSearchProperties.some(p =>
          item.props[p]
            .toLocaleLowerCase()
            .includes(searchPhrase.toLocaleLowerCase())
        );
      }
    }

    return true;
  };

  render() {
    const {
      id,
      className,
      error,
      items,
      getItemBody,
      getSelectedItemBody,
      search,
      disabled,
      toggleAllOptions,
      maxItemsContainerHeight,
      dataTestId
    } = this.props;
    const selectedItems = this.getSelectedItems();
    const { searchPhrase, focusedItemKey, isFocused } = this.state;
    const isOpen = this.getIsOpen();
    const selectedItemsModels = this.getSelectedItemsModels();
    const filteredItems = items.filter(this.filterItem);

    const mergedClassNames = getMergedClassNames(
      cx({
        [baseClass]: true,
        [`${baseClass}--error`]: error
      }),
      className
    );
    const headItemsStyles = selectedItems && selectedItems.length > 0 ? `${baseClass}-head__items` : `${baseClass}-head__items-empty`;
    return (
      <div ref={this.containerRef} className={mergedClassNames} id={id} data-testid={dataTestId}>
        <MultiSelectHead
          isFocused={isOpen || isFocused}
          ref={this.headRef}
          onClick={this.onSelectHeadClick}
          onFocus={this.onSelectHeadFocus}
          onBlur={this.onSelectHeadBlur}
          disabled={disabled}
        >
          <div
            className={styles[headItemsStyles]}
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
            data-testid="multiselect-down-icon"
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
  dataTestId: PropTypes.string,
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
  /**
   * Use when you need to control multiselect dropdown visibility in its parent component
   * Remember to pass `onDropdownToggle` method as props, thanks to that you will be able to
   * update your state
   */
  isOpen: PropTypes.bool,
  placeholder: PropTypes.string,
  searchProperty: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  selected: PropTypes.arrayOf(
    PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  ),
  search: PropTypes.bool,
  /**
   * If `true` multiselect dropdown will be closed after option select/deselect
   */
  shouldCloseOnSelect: PropTypes.bool,
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
  shouldCloseOnSelect: false,
  onDropdownToggle: () => {}
};

export default MultiSelect;
