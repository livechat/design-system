import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';
import SelectHead from './SelectHead';
import SelectBody from './SelectBody';

const baseClass = 'select';

class SelectField extends React.PureComponent {
  state = {
    searchPhrase: '',
    selectedItem: null,
    isOpen: false,
    focusedItem: null
  };

  componentDidUpdate(_prevProps, prevState) {
    if (this.state.isOpen && prevState.isOpen !== this.state.isOpen) {
      document.addEventListener('click', this.onDocumentClick);
    } else if (!this.state.isOpen && prevState.isOpen !== this.state.isOpen) {
      document.removeEventListener('click', this.onDocumentClick);
    }
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.onDocumentClick);
  }

  onDocumentClick = e => {
    if (this.state.isOpen && !this.containerRef.current.contains(e.target)) {
      this.toggleSelectBody(false);
    }
  };

  onChange = value => {
    this.setState({
      searchPhrase: value
    });
  };

  onClick = () => {
    this.toggleSelectBody(true);
  };

  onItemSelect = itemId => {
    this.setState(({ selectedItem }) => ({
      selectedItem: selectedItem !== itemId ? itemId : null
    }));
  };

  getFocusItemCallback = itemId => {
    if (!this.hoverCallbacks[itemId]) {
      this.hoverCallbacks[itemId] = () => {
        this.setState({ focusedItem: itemId });
      };
    }

    return this.hoverCallbacks[itemId];
  };

  toggleSelectBody = isOpen => this.setState({ isOpen });

  hoverCallbacks = {};
  containerRef = React.createRef();

  render() {
    return (
      <div ref={this.containerRef} className={styles[baseClass]}>
        <SelectHead
          placeholder={this.props.placeholder}
          value={this.state.searchPhrase}
          onChange={this.onChange}
          onClick={this.onClick}
        />
        <SelectBody
          items={this.props.items}
          focusedItem={this.state.focusedItem}
          getFocusItemCallback={this.getFocusItemCallback}
          onItemClick={this.onItemSelect}
          isOpen={this.state.isOpen}
          selectedItem={this.state.selectedItem}
        />
      </div>
    );
  }
}

SelectField.propTypes = {
  placeholder: PropTypes.string,
  items: PropTypes.arrayOf(PropTypes.object).isRequired
};

SelectField.defaultProps = {
  placeholder: ''
};

export default SelectField;
