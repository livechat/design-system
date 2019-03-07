<h3>Dropdown list</h3>

Dropdown list is a compact way of displaying a list of options. It appears when a user clicks a button, icon or keyboard shortcut.

- Behavior

The drop menu grows to the width of the longest list item. Long list item names will truncate (…) at max width of the drop menu - padding.
The drop menu can be dismissed by clicking outside, clicking on the trigger, or with the ESC key.

- Keyboard navigation: 
  - Arrows cycle focus through menu items.
  - Esc key closes the drop menu and moves focus back to the menu trigger.
  - Tab key closes the drop menu and moves focus to the next focusable element on the page.

Examples:
- with selectable items:

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
      onItemSelect: () => this.handleSelectAll(),
      isSelected: this.isAllSelected(),
      divider: true
    }
    return this.itemsConfig.reduce((acc, {id, isDisabled}) => {
      acc.push({
        itemId: id,
        content: `Item ${id}`,
        icon: <AlertCircleIcon height={16} width={16} fill="#4384f5" />,
        onItemSelect: () => this.handleSelect(id),
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
        <DropdownList items={this.getListItems()} selected={this.state.selected} />
      </Dropdown>
    )
  }
}

<SelectableDropdownListExample />
```

- non-selectable items

```js
const generateItemsConfig = (length = 10) => Array.from(new Array(length), (value, index)=> ({
  id: index + 1,
  divider: index === 2
}));


class NonSelectableDropdownListExample extends React.PureComponent {
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
        onItemSelect: () => this.handleClose(),
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
        <DropdownList items={this.getListItems()} selected={this.state.selected} />
      </Dropdown>
    )
  }
}

<NonSelectableDropdownListExample />
```


- items rendered by getItemBody prop

```js
const generateItemsConfig = (length = 10) => Array.from(new Array(length), (value, index)=> ({
  id: index + 1
}));


class CustomItemsDropdownListExample extends React.PureComponent {
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
        itemId: id
      });
      return acc;
    }, []);
  }

  getItemBody(itemProps) {
    return (
      <DropdownListItem {...itemProps} key={itemProps.itemId} onItemSelect={() => console.log(`Custom item selected: ${itemProps.itemId}`)}>
        Custom Item - {itemProps.itemId}
      </DropdownListItem>
    )
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
        <DropdownList items={this.getListItems()} selected={this.state.selected} getItemBody={this.getItemBody}/>
      </Dropdown>
    )
  }
}

<CustomItemsDropdownListExample />
```
