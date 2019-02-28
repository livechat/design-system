```js
initialState = {
  isVisible: false,
  selected: []
};

const handleOpen = () => {
  console.log('open');
  setState({isVisible: true});
}

const handleClose = () => {
  console.log('close');
  setState({isVisible: false});
}

const handleTriggerClick = () => {
  console.log('trigger');
  setState({isVisible: !state.isVisible})
}

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
  {id: 1, content: <div style={{display: 'flex', alignItems: 'center'}}><AlertCircleIcon height={12} width={12} fill="#424d57" />Item 1</div>, selectable: true},
  {id: 2, content: 'Item 2', selectable: true},
  {id: 3, content: 'Item 3', onSelect: handleClose},
  {id: 4, content: 'Item 4', selectable: true},
  {id: 5, content: 'Item 5', selectable: true},
  {id: 6, content: 'Item 6', onSelect: () => console.log('item 3')},
  {id: 7, content: 'Item 7', selectable: true},
  {id: 8, content: 'Item 8', selectable: true},
  {id: 9, content: 'Item 9', onSelect: handleClose}
];

<Dropdown
  isVisible={state.isVisible}
  placement="bottom-start"
  onOpen={handleOpen}
  onClose={handleClose}
  triggerRenderer={({ ref }) => <Button onFocus={() => {console.log('focus')}} onClick={handleTriggerClick} ref={ref}>Toggle dropdown</Button>}
>
  <DropdownList items={listItems} onItemSelect={handleSelect} selected={state.selected} />
</Dropdown>
```
