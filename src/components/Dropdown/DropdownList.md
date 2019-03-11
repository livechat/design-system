<h3>Dropdown list</h3>

Dropdown list is a compact way of displaying a list of options. It appears when a user clicks a button, icon or keyboard shortcut.

- Behavior

The drop menu grows to the width of the longest list item. Long list item names will truncate (…) at max width of the drop menu - padding.
The drop menu can be dismissed by clicking outside, clicking on the trigger, or with the ESC key.

- Keyboard navigation: 
  - Arrows cycle focus through menu items.
  - Esc key closes the drop menu and moves focus back to the menu trigger.
  - Tab key closes the drop menu and moves focus to the next focusable element on the page.


<img style="width: 100%;" src="./dropdown_anatomy.png" alt="Dropdown_anatomy" />

Examples:
- with selectable items:

```js
const generateItemsConfig = (length = 10) => Array.from(new Array(length), (value, index)=> ({
  id: index + 1,
  isDisabled: (index + 1)%3 === 1
}));

const itemsConfig = generateItemsConfig(20);

const getListItems = (onItemSelect, onToggleAll) => {
  const batchItem = {
    itemId: TOGGLE_ALL_ITEM_ID,
    content: <div>Select all</div>,
    onItemSelect: onToggleAll,
    isSelected: false,
    divider: true
  }
  return itemsConfig.reduce((acc, {id, isDisabled}) => {
    acc.push({
      itemId: id,
      content: `Item ${id}`,
      icon: <AlertCircleIcon height={16} width={16} fill="#4384f5" />,
      onItemSelect: onItemSelect,
      isSelected: false,
      isDisabled
    });
    return acc;
  }, [batchItem]);
};

const TOGGLE_ALL_ITEM_ID = 0;

class SelectableDropdownListExample extends React.PureComponent {
  constructor(props) {
    super(props);

    this.handleTriggerClick = this.handleTriggerClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleOpen = this.handleOpen.bind(this);
    this.handleToggleAll = this.handleToggleAll.bind(this);
    this.handleItemSelect = this.handleItemSelect.bind(this);
    this.isAllSelected = this.isAllSelected.bind(this);

    this.state = {
      isVisible: false,
      listItems: getListItems(this.handleItemSelect, this.handleToggleAll)
    };
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

  handleItemSelect(id) {
    const listItems = this.state.listItems.map(v => {
      return v.itemId === id ? {...v, ...{
        isSelected: !v.isSelected
      }} : v
    });

    const isAllItemsSelected = this.isAllSelected(listItems);

    listItems[0].content = isAllItemsSelected ? <div>Clear all</div> : <div>Select all</div>;

    this.setState({ listItems })
  }

  handleToggleAll() {
    const isAllItemsSelected = this.isAllSelected(this.state.listItems);
    const listItems = this.state.listItems.map(v => {
      if (v.itemId === TOGGLE_ALL_ITEM_ID) {
        return {
          ...v,
          content: !isAllItemsSelected ? <div>Clear all</div> : <div>Select all</div>,
        };
      }

      return !v.isDisabled ? {...v, ...{
        isSelected: !isAllItemsSelected
      }} : v
    })

    this.setState({ listItems })
  }

  isAllSelected(items) {
    return !items.some(v => {
      return v.itemId !== TOGGLE_ALL_ITEM_ID && !v.isDisabled && !v.isSelected
    });
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
        <DropdownList items={this.state.listItems} />
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
        <DropdownList items={this.getListItems()} />
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
        <DropdownList items={this.getListItems()} getItemBody={this.getItemBody}/>
      </Dropdown>
    )
  }
}

<CustomItemsDropdownListExample />
```

- list component - without positioning and trigger (html & css example)
```js
initialState = {
  isOpen: false
};

const generateItems = (length = 10) => Array.from(new Array(length), (value, index)=> ({
  itemId: index + 1,
  divider: index === 2,
  content: `Item ${index + 1}`,
  icon: <AlertCircleIcon height={16} width={16} fill="#4384f5" />,
  isSelected: index === 2,
  isDisabled: index === 0,
  onItemSelect: () => {}
}));

const items = generateItems(4);

const toggleDropdownList = () => {
  setState({
    isOpen: !state.isOpen
  })
}

<div style={{maxWidth: '340px'}}>
  <Button onClick={toggleDropdownList}>Toggle</Button>
  {state.isOpen && <DropdownList items={items} />}
</div>
```

```js noeditor
const generateItems = (length = 10) => Array.from(new Array(length), (value, index)=> ({
  itemId: index + 1,
  divider: index === 2,
  content: `Item ${index + 1}`,
  icon: <AlertCircleIcon height={16} width={16} fill="#4384f5" />,
  isSelected: index === 2,
  isDisabled: index === 0,
  onItemSelect: () => {}
}));

const items = generateItems(4);

<ComponentHtmlMarkup>
  <DropdownList items={items} />
</ComponentHtmlMarkup>
```