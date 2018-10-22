import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';
import SelectList from './SelectList';

const cx = classNames.bind(styles);

const baseClass = 'select';

class SelectField extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpen: props.defaultIsOpen || false,
      searchPhrase: '',
      focusedItemKey: null
    };

    this.timerId = null;
    this.containerRef = React.createRef();
    this.searchInputRef = React.createRef();
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

  onEnterKey = event => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  onSelectHeadClick = event => {
    event.preventDefault();
    this.showSelectBody();
  };

  getPlaceholder = () => this.props.placeholder || 'Search...';

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
      turnOffSearch,
      disabled
    } = this.props;
    const { isOpen, searchPhrase, focusedItemKey } = this.state;
    const selectedItemModel = items.find(item => item.key === selectedItem);
    console.log(selectedItemModel, selectedItem);
    const filteredItems = items.filter(v => this.filterItem(v));

    return (
      <div ref={this.containerRef} className={styles[baseClass]}>
        <div
          className={cx({
            [`${baseClass}__head`]: true
          })}
          onClick={this.onSelectHeadClick}
        >
          <div className={styles[`${baseClass}__selected-item`]}>
            {getSelectedItemBody(
              selectedItemModel ? selectedItemModel.props : null
            )}
          </div>
          <div
            className={cx({
              [`${baseClass}__search`]: true,
              [`${baseClass}__search--visible`]: turnOffSearch ? false : isOpen
            })}
          >
            <input
              ref={this.searchInputRef}
              className={styles[`${baseClass}__input`]}
              type="text"
              placeholder={this.getPlaceholder()}
              name="select-box-input"
              value={searchPhrase}
              onChange={this.onSearchChange}
              onKeyPress={this.onEnterKey}
              autoComplete="off"
              disabled={disabled}
            />
          </div>
        </div>
        <div
          className={cx({
            [`${baseClass}__body`]: true,
            [`${baseClass}__body--visible`]: isOpen
          })}
        >
          <SelectList
            getItemBody={getItemBody}
            isOpen={isOpen}
            items={filteredItems}
            getSelectedItemBody={getSelectedItemBody}
            selectedItems={[selectedItem]}
            getItemSelectedHandler={this.getItemSelectedHandler}
            searchPhrase={searchPhrase}
            selectedDisabled
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
  searchProperty: PropTypes.string.isRequired,
  selectedItem: PropTypes.string,
  turnOffSearch: PropTypes.bool,
  placeholder: PropTypes.string,
  disabled: PropTypes.bool,
  defaultIsOpen: PropTypes.bool
};

SelectField.defaultProps = {
  items: [],
  selectedItem: null
};

export default SelectField;
