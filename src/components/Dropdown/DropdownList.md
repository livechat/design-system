<h3>Dropdown list with selectable items</h3>

```js
const generateItemsConfig = (length = 10) => Array.from(new Array(length), (value, index)=> ({
  id: index + 1,
  isDisabled: (index + 1)%3 === 1
}));


class SelectableDropdownListExample extends React.PureComponent {
  constructor(props) {
    super(props);
    this.itemsConfig = generateItemsConfig(16);

    this.state = {
      isVisible: false,
      selected: []
    };

    this.handleTriggerClick = this.handleTriggerClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.isAllSelected = this.isAllSelected.bind(this);
  }

  getListItems(shouldIncludeBatchItem = true) {
    const batchItem = {
      itemId: 0,
      content: <div>{this.isAllSelected() ? 'Deselect all' : 'Select all'}</div>,
      onSelect: () => this.handleSelectAll(),
      isSelected: this.isAllSelected(),
      divider: true
    }
    return this.itemsConfig.reduce((acc, {id, isDisabled}) => {
      acc.push({
        itemId: id,
        content: `Item ${id}`,
        icon: <AlertCircleIcon height={16} width={16} fill="#4384f5" />,
        onSelect: () => this.handleSelect(id),
        isSelected: this.isItemSelected(id),
        isDisabled
      });
      return acc;
    }, shouldIncludeBatchItem ? [batchItem] : []);
  }

  handleOpen() {
    this.setState({isVisible: true});
  }

  handleClose() {
    this.setState({isVisible: false});
  }

  handleTriggerClick() {
    this.setState({isVisible: !state.isVisible})
  }

  handleSelect(id) {
    if (this.state.selected.some(itemId => id === itemId)) {
      this.setState({
        selected: this.state.selected.filter(itemId => id !== itemId)
      });
    } else {
      this.setState({
        selected: [...this.state.selected, id]
      });
    }
  }

  handleSelectAll() {
    if (!this.isAllSelected()) {
      this.setState({
        selected: this.getListItems(false).reduce((acc, item) => {
          if (!item.isDisabled) {
            acc.push(item.itemId);
          }
          return acc;
        }, [])
      });
    } else {
      this.setState({
        selected: []
      });
    }
  }

  isAllSelected() {
    return this.itemsConfig.filter(item => !item.isDisabled).length === this.state.selected.length;
  }

  isItemSelected(id) {
    return this.state.selected.includes(id);
  }

  render() {
    return (
      <Dropdown
        isVisible={this.state.isVisible}
        placement="bottom-start"
        onOpen={this.handleOpen}
        onClose={this.handleClose}
        triggerRenderer={({ ref }) => <Button onClick={this.handleTriggerClick} ref={ref}>Toggle dropdown</Button>}
      >
        <DropdownList items={this.getListItems()} selected={this.state.selected} style={{zIndex: 20}} />
      </Dropdown>
    )
  }
}

<SelectableDropdownListExample />
```

<h3>Dropdown list with non-selectable items</h3>

```js
const generateItemsConfig = (length = 10) => Array.from(new Array(length), (value, index)=> ({
  id: index + 1,
  divider: index === 2
}));


class SelectableDropdownListExample extends React.PureComponent {
  constructor(props) {
    super(props);
    this.itemsConfig = generateItemsConfig(4);

    this.state = {
      isVisible: false,
      selected: []
    };

    this.handleTriggerClick = this.handleTriggerClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
  }

  getListItems() {
    return this.itemsConfig.reduce((acc, {id, divider}) => {
      acc.push({
        itemId: id,
        content: `Item ${id}`,
        onSelect: () => this.handleClose(),
        divider
      });
      return acc;
    }, []);
  }

  handleOpen() {
    this.setState({isVisible: true});
  }

  handleClose() {
    this.setState({isVisible: false});
  }

  handleTriggerClick() {
    this.setState({isVisible: !state.isVisible})
  }

  render() {
    return (
      <Dropdown
        isVisible={this.state.isVisible}
        placement="bottom-start"
        onOpen={this.handleOpen}
        onClose={this.handleClose}
        triggerRenderer={({ ref }) => <Button onClick={this.handleTriggerClick} ref={ref}>Menu</Button>}
      >
        <DropdownList items={this.getListItems()} selected={this.state.selected} style={{zIndex: 20}} />
      </Dropdown>
    )
  }
}

<SelectableDropdownListExample />
```
