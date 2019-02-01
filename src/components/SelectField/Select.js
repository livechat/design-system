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
      isOpen: props.openedOnInit || false,
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
    if (this.props.openedOnInit) {
      this.props.onDropdownToggle(true);
      this.onBodyOpen();
    }
  }

  componentDidUpdate(_prevProps, prevState) {
    if (this.state.isOpen && prevState.isOpen !== this.state.isOpen) {
      this.props.onDropdownToggle(true);
      this.onBodyOpen();
    } else if (!this.state.isOpen && prevState.isOpen !== this.state.isOpen) {
      this.props.onDropdownToggle(false);
      this.onBodyClose();
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
    event.preventDefault();
    if (
      this.clearButtonRef.current &&
      this.clearButtonRef.current.contains(event.target)
    ) {
      return;
    }
    if (!this.state.isOpen) {
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

  handleEnterKeyUse = itemKey => {
    this.props.onItemSelect(itemKey);
    this.hideSelectBody();
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
        focusedItemKey: this.props.items[0] ? this.props.items[0].key : null,
        searchPhrase: ''
      },
      () => {
        this.headRef.current.focus();
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
      required,
      disabled,
      searchPlaceholder,
      placeholder,
      selected,
      className,
      id,
      error
    } = this.props;
    const { isOpen, searchPhrase, focusedItemKey, isFocused } = this.state;
    const selectedItemModel = items.find(item => item.key === selected);
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
        <SelectHead
          isFocused={isOpen || isFocused}
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
            listRef={this.listRef}
            getItemBody={getItemBody}
            isOpen={isOpen}
            onListClose={this.hideSelectBody}
            items={filteredItems}
            getSelectedItemBody={getSelectedItemBody}
            selectedItem={selected}
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

Select.propTypes = {
  className: PropTypes.string,
  error: PropTypes.string,
  id: PropTypes.string,
  getItemBody: PropTypes.func.isRequired,
  getSelectedItemBody: PropTypes.func,
  onItemSelect: PropTypes.func.isRequired,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string,
      props: PropTypes.object
    })
  ),
  searchPlaceholder: PropTypes.string,
  searchProperty: PropTypes.string,
  selected: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  search: PropTypes.bool,
  required: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  openedOnInit: PropTypes.bool,
  onDropdownToggle: PropTypes.func
};

Select.defaultProps = {
  items: [],
  selected: null,
  onDropdownToggle: () => {}
};

export default Select;
