```js
class Menu extends React.PureComponent {
  constructor(props) {
    super(props);
    this.activeItemsCount = 7;

    this.state = {
      isVisible: false,
      selected: []
    };

    this.listItems = [
      {id: 1, content: <div>{this.isAllSelected() ? 'Deselect all' : 'Select all'}</div>, onSelect: () => this.handleSelectAll(), divider: true},
      {id: 2, content: 'Item 2', onSelect: () => this.handleSelect(2)},
      {id: 3, content: 'Item 3', onSelect: () => this.handleClose()},
      {id: 4, icon: <AlertCircleIcon height={16} width={16} fill="#4384f5" />, content: 'Item 4', onSelect: () => this.handleSelect(4)},
      {id: 5, icon: <AlertCircleIcon height={16} width={16} fill="#4384f5" />, content: <div>Item 5</div>, onSelect: () => this.handleSelect(5), disabled: true},
      {id: 6, content: 'Item 6', onSelect: () => console.log('item 3')},
      {id: 7, content: 'Item 7', onSelect: () => this.handleSelect(7)},
      {id: 8, content: 'Item 8', onSelect: () => this.handleSelect(8)},
      {id: 9, content: 'Item 9', onSelect: () => this.handleClose(), disabled: true}
    ];

    this.handleTriggerClick = this.handleTriggerClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.isAllSelected = this.isAllSelected.bind(this);
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
    console.log(this.isAllSelected())
    if (!this.isAllSelected()) {
      this.setState({
        selected: this.listItems.reduce((acc, item) => {
          if (!item.disabled) {
            acc.push(item.id);
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
    return this.activeItemsCount === this.state.selected.length;
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
        <DropdownList items={[...this.listItems]} selected={this.state.selected} />
      </Dropdown>
    )
  }
}

<Menu />
```
