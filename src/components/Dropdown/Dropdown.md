```js
initialState = {
  isVisible: false,
  selected: []
};

const handleOpen = () => setState({isVisible: true});

const handleClose = () => setState({isVisible: false});

const handleSelect = (id) => {
  if (state.selected.some(itemId => id === itemId)) {
    setState({
      selected: state.selected.filter(itemId => id !== itemId)
    });
  } else {
    setState({
      selected: [...state.selected, id]
    });
  }
}

const listItems = [
  {id: 1, content: 'Item 1', selectable: true},
  {id: 2, content: 'Item 2', selectable: true},
  {id: 3, content: 'Item 3', onClick: () => console.log('item 3')}
];

<Dropdown
  isVisible={state.isVisible}
  placement="bottom-start"
  onOpen={handleOpen}
  onClose={handleClose}
  trigger={
    <Button onClick={() => setState({isVisible: !state.isVisible})}>Toggle dropdown</Button>
  }
>
  <DropdownList items={listItems} onSelect={handleSelect} selected={state.selected} />
</Dropdown>
```
