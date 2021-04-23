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
import { KeyCodes } from '../../constants/keyCodes';
import getMergedClassNames from '../../utils/getMergedClassNames';

const cx = classNames.bind(styles);

const baseClass = 'select';

class Select extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.openedOnInit || props.isOpen || false,
      searchPhrase: '',
      focusedItemKey: this.props.items[0] ? this.props.items[0].key : null,
      isFocused: false
    };

    this.timerId = null;
    this.containerRef = React.createRef();
    this.searchInputRef = React.createRef();
    this.headRef = React.createRef();
    this.clearButtonRef = React.createRef();
    this.listRef = React.createRef();
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
  }

  componentWillUnmount() {
    this.onBodyClose();
    document.removeEventListener('keydown', this.onArrowPress);
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

        if (this.props.onSearchPhraseChange) {
          this.props.onSearchPhraseChange(this.state.searchPhrase);
        }
      }
    );
  };

  onBodyOpen = () => {
    document.addEventListener('click', this.onDocumentClick);
    if (this.props.search && this.searchInputRef.current) {
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
    event.preventDefault();
    if (this.props.disabled) {
      return;
    }
    if (
      this.clearButtonRef.current &&
      this.clearButtonRef.current.contains(event.target)
    ) {
      return;
    }
    if (!this.getIsOpen()) {
      this.showSelectBody();
    } else {
      this.hideSelectBody();
    }
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

    this.props.onItemSelect(itemKey);
    this.hideSelectBody();
  };

  getIsOpen = (props = this.props, state = this.state) => {
    if (props.disabled) {
      return false;
    }
    return this.isIsOpenControlled() ? props.isOpen : state.isOpen;
  };

  handleEnterKeyUse = itemKey => {
    this.props.onItemSelect(itemKey);
    this.hideSelectBody();
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

  shouldShowSelectBody = filteredItems => {
    const { searchEmptyState } = this.props;
    const { searchPhrase } = this.state;
    const isOpen = this.getIsOpen();

    return (
      (isOpen && filteredItems.length > 0) ||
      (searchEmptyState &&
        searchPhrase.length > 0 &&
        filteredItems.length === 0)
    );
  };

  hideSelectBody = () => {
    this.setState(
      {
        isOpen: false,
        focusedItemKey: this.props.items[0] ? this.props.items[0].key : null,
        searchPhrase: ''
      },
      () => {
        this.props.onDropdownToggle(false);
        if (this.headRef.current) {
          this.headRef.current.focus();
        }
      }
    );
  };

  changeFocusedItem = itemKey => {
    if (typeof itemKey === 'undefined' || itemKey === null) {
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
    this.props.onItemSelect(null);
  };

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

  isIsOpenControlled = () => this.props.isOpen !== undefined;

  render() {
    const {
      className,
      disabled,
      error,
      getItemBody,
      getSelectedItemBody,
      id,
      items,
      placeholder,
      required,
      search,
      searchEmptyState,
      searchPlaceholder,
      selected,
      dataTestId,
      selectHeader
    } = this.props;
    const { searchPhrase, focusedItemKey, isFocused } = this.state;
    const selectedItemModel = items.find(item => item.key === selected);
    const filteredItems = items.filter(this.filterItem);
    const mergedClassNames = getMergedClassNames(
      cx({
        [baseClass]: true,
        [`${baseClass}--error`]: error
      }),
      className
    );

    const isOpen = this.getIsOpen();
    const shouldRenderClearButton = !!selectedItemModel && !isOpen && !required;

    return (
      <div ref={this.containerRef} className={mergedClassNames} id={id} data-testid={dataTestId}>
        <SelectHead
          isFocused={isOpen || isFocused}
          disabled={disabled}
          ref={this.headRef}
          onClick={this.onSelectHeadClick}
          onFocus={this.onSelectHeadFocus}
          onBlur={this.onSelectHeadBlur}
        >
          <SelectHeadItem
            getSelectedItemBody={getSelectedItemBody}
            selectedItem={selectedItemModel}
            isVisible={!(isOpen && search)}
            placeholder={placeholder}
          />
          <Search
            isVisible={!search ? false : isOpen}
            inputRef={this.searchInputRef}
            placeholder={searchPlaceholder || 'Search...'}
            value={searchPhrase}
            onChange={this.onSearchChange}
            disabled={disabled}
          />
           <ClearButton
            isVisible={shouldRenderClearButton}
            ref={this.clearButtonRef}
            clearSelectedOption={this.clearSelectedOption}
          />
          <MenuDownIcon width="24px" height="24px" fill="#424d57" data-testid="select-down-icon" />          
        </SelectHead>
        <div
          className={cx({
            [`${baseClass}-body`]: true,
            [`${baseClass}-body--visible`]: this.shouldShowSelectBody(
              filteredItems
            )
          })}
          data-testid="select-body"
        >
          {filteredItems.length === 0 && searchEmptyState}
          <SelectList
            listRef={this.listRef}
            getItemBody={getItemBody}
            isOpen={isOpen}
            onListClose={this.hideSelectBody}
            items={filteredItems}
            getSelectedItemBody={getSelectedItemBody}
            selectedItem={selected}
            getItemSelectedHandler={this.getItemSelectedHandler}
            onEnterKey={this.handleEnterKeyUse}
            onFocusedItemChange={this.changeFocusedItem}
            focusedItemKey={focusedItemKey}
            selectHeader={selectHeader}
          />
        </div>
      </div>
    );
  }
}

Select.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string,
  dataTestId: PropTypes.string,
  /**
   * Use when you need to control multiselect dropdown visibility in its parent component
   * Remember to pass `onDropdownToggle` method as props, thanks to that you will be able to
   * update your state
   */
  isOpen: PropTypes.bool,
  getItemBody: PropTypes.func.isRequired,
  getSelectedItemBody: PropTypes.func,
  onItemSelect: PropTypes.func.isRequired,
  /**
   * Pass a ReactNode to specify SelectList placeholder
   * (visible when items list is empty and typed search phrase is not empty)
   */
  searchEmptyState: PropTypes.node,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      props: PropTypes.object
    })
  ),
  searchPlaceholder: PropTypes.string,
  searchProperty: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string)
  ]),
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  search: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  openedOnInit: PropTypes.bool,
  onDropdownToggle: PropTypes.func,
  /**
   * Searching is controlled by Select component itself. Use this props to get current value of search phrase.
   * It would be useful, for instance, if you need to save searchPhrase as new item.
   * (searchPhrase) => {}
   */
  onSearchPhraseChange: PropTypes.func,
  /**
   * Pass a string to display a tip in items list
   */
  selectHeader: PropTypes.string,
};

Select.defaultProps = {
  items: [],
  selected: null,
  onDropdownToggle: () => {}
};

export default Select;
