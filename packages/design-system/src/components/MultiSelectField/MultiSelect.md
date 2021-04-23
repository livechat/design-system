```js noeditor
<Banner size="large" type="warning">
  This component can be used only in React applications.
</Banner>
```

<h3>MultiSelect</h3>

```js
const items = [
  {key: '1', props: {name: 'option 1', value: '1'}},
  {key: '2', props: {name: 'option 2', value: '2'}},
  {key: '3', props: {name: 'option 3', value: '3'}},
  {key: '4', props: {name: 'option 4', value: '4'}},
  {key: '5', props: {name: 'option 5', value: '5'}},
  {key: '6', props: {name: 'option 6', value: '6'}},
  {key: '7', props: {name: 'option 7', value: '7'}},
  {key: '8', props: {name: 'option 8', value: '8'}},
  {key: '9', props: {name: 'option 9', value: '9'}},
  {key: '10', props: {name: 'option 10', value: '10'}}
];
initialState = {
  selectedItems: null
};

const handleItemSelect = item => {
  if (!state.selectedItems) {
    return setState({selectedItems: [item]})
  }
  if (state.selectedItems.some(selected => item === selected)) {
    const newState = state.selectedItems.filter(selected => item !== selected);
    return setState({selectedItems: newState.length === 0 ? null : newState});
  }
  return setState({selectedItems: [...state.selectedItems, item]});
}

const handleItemRemove = item => {
  const newState = state.selectedItems.filter(selected => selected !== item);
  return setState({selectedItems: newState.length > 0 ? newState : null});
}

const getItemBody = props => {
  if (!props) {
    return null;
  }
  return <div id={props.value}>{props.name}</div>;
};

const getSelectedItemBody = props => {
  return <div id={props.value}>{props.name}</div>;
};

const toggleAll = items => {
  if (!items) {
    return setState({
      selectedItems: null
    })
  }
  return setState({
    selectedItems: items
  })
}

<div style={{width: '340px'}}>
  <MultiSelect
    items={items}
    searchProperty='name'
    onItemSelect={handleItemSelect}
    onItemRemove={handleItemRemove}
    getItemBody={getItemBody}
    toggleAllOptions={{
      onToggleAll: toggleAll
    }}
    search
    maxItemsContainerHeight={72}
    getSelectedItemBody={getSelectedItemBody}
    selected={state.selectedItems}
    placeholder='Search...'
  />
</div>
```

```js noeditor
const items = [
  { key: "1", props: { name: "option 1", value: "1" } },
  { key: "2", props: { name: "option 2", value: "2" } },
  { key: "3", props: { name: "option 3", value: "3" } }
];

const getItemBody = props => {
  if (!props) {
    return null;
  }
  return <div id={props.value}>{props.name}</div>;
};

const getSelectedItemBody = props => {
  return <div id={props.value}>{props.name}</div>;
};

<ComponentHtmlMarkup>
  <MultiSelect
    items={items}
    searchProperty="name"
    onItemSelect={() => {}}
    onItemRemove={() => {}}
    getItemBody={getItemBody}
    toggleAllOptions={{
      onToggleAll: () => {}
    }}
    search
    maxItemsContainerHeight={72}
    getSelectedItemBody={getSelectedItemBody}
    selected={["1"]}
    placeholder="Search..."
  />
</ComponentHtmlMarkup>;
```

<h3>Disabled</h3>

```js
const items = [
  {key: '1', props: {name: 'option 1', value: '1'}},
  {key: '2', props: {name: 'option 2', value: '2'}}
];
initialState = {
  selectedItems: null
};

const handleItemSelect = item => {
  if (!state.selectedItems) {
    return setState({selectedItems: [item]})
  }
  if (state.selectedItems.some(selected => item === selected)) {
    const newState = state.selectedItems.filter(selected => item !== selected);
    return setState({selectedItems: newState.length === 0 ? null : newState});
  }
  return setState({selectedItems: [...state.selectedItems, item]});
}

const handleItemRemove = item => {
  const newState = state.selectedItems.filter(selected => selected !== item);
  return setState({selectedItems: newState.length > 0 ? newState : null});
}

const getItemBody = props => {
  if (!props) {
    return null;
  }
  return <div id={props.value}>{props.name}</div>;
};

const getSelectedItemBody = props => {
  return <div id={props.value}>{props.name}</div>;
};

const toggleAll = items => {
  if (!items) {
    return setState({
      selectedItems: null
    })
  }
  return setState({
    selectedItems: items
  })
}

<div style={{width: '340px'}}>
  <MultiSelect
    items={items}
    searchProperty='name'
    onItemSelect={handleItemSelect}
    onItemRemove={handleItemRemove}
    getItemBody={getItemBody}
    toggleAllOptions={{
      onToggleAll: toggleAll
    }}
    search
    disabled
    maxItemsContainerHeight={72}
    getSelectedItemBody={getSelectedItemBody}
    selected={state.selectedItems}
    placeholder='Search...'
  />
</div>
```

```js noeditor
const items = [
  { key: "1", props: { name: "option 1", value: "1" } },
  { key: "2", props: { name: "option 2", value: "2" } }
];

const getItemBody = props => {
  if (!props) {
    return null;
  }
  return <div id={props.value}>{props.name}</div>;
};

const getSelectedItemBody = props => {
  return <div id={props.value}>{props.name}</div>;
};

<ComponentHtmlMarkup>
  <MultiSelect
    items={items}
    searchProperty="name"
    onItemSelect={() => {}}
    onItemRemove={() => {}}
    getItemBody={getItemBody}
    toggleAllOptions={{
      onToggleAll: () => {}
    }}
    search
    disabled
    maxItemsContainerHeight={72}
    getSelectedItemBody={getSelectedItemBody}
    selected={["1"]}
    placeholder="Search..."
  />
</ComponentHtmlMarkup>;
```

<h3>MultiSelect with controlled dropdown visibility</h3>

```js
const items = [
  {key: '1', props: {name: 'option 1', value: '1'}},
  {key: '2', props: {name: 'option 2', value: '2'}},
  {key: '3', props: {name: 'option 3', value: '3'}},
  {key: '4', props: {name: 'option 4', value: '4'}},
  {key: '5', props: {name: 'option 5', value: '5'}},
  {key: '6', props: {name: 'option 6', value: '6'}},
  {key: '7', props: {name: 'option 7', value: '7'}},
  {key: '8', props: {name: 'option 8', value: '8'}},
  {key: '9', props: {name: 'option 9', value: '9'}},
  {key: '10', props: {name: 'option 10', value: '10'}}
];
initialState = {
  selectedItems: null,
  isOpen: false
};

const buttonRef = React.createRef();

const handleDropdownToggle = isOpen => {
  setState({
    isOpen
  })
}

const toggleDropdown = () => {
  setTimeout(() => {
    setState({
      isOpen: !state.isOpen
    })
  })
}

const handleItemSelect = item => {
  if (!state.selectedItems) {
    return setState({selectedItems: [item]})
  }
  if (state.selectedItems.some(selected => item === selected)) {
    const newState = state.selectedItems.filter(selected => item !== selected);
    return setState({selectedItems: newState.length === 0 ? null : newState});
  }
  return setState({selectedItems: [...state.selectedItems, item]});
}

const handleItemRemove = item => {
  const newState = state.selectedItems.filter(selected => selected !== item);
  return setState({selectedItems: newState.length > 0 ? newState : null});
}

const getItemBody = props => {
  if (!props) {
    return null;
  }
  return <div id={props.value}>{props.name}</div>;
};

const getSelectedItemBody = props => {
  return <div id={props.value}>{props.name}</div>;
};

const toggleAll = items => {
  if (!items) {
    return setState({
      selectedItems: null
    })
  }
  return setState({
    selectedItems: items
  })
}

<div style={{width: '340px'}}>
  <div style={{margin: '10px 0'}}>
    <Button ref={buttonRef} onClick={toggleDropdown}>{state.isOpen ? 'Hide' : 'Show'}</Button>
  </div>
  <MultiSelect
    items={items}
    searchProperty="name"
    onItemSelect={handleItemSelect}
    onItemRemove={handleItemRemove}
    getItemBody={getItemBody}
    toggleAllOptions={{
      onToggleAll: toggleAll
    }}
    isOpen={state.isOpen}
    search
    maxItemsContainerHeight={72}
    getSelectedItemBody={getSelectedItemBody}
    selected={state.selectedItems}
    placeholder="Search..."
    onDropdownToggle={handleDropdownToggle}
  />
</div>
```

Multi-selects let users search and choose multiple options from a list. Multiselect doesn’t close after choosing an item.

When an item is selected, it appears as a tag in the input field. Selected items are also marked on the selection menu. Users can deselect items either from the menu list, or from the input field. When an item is deselected it disappears from the text input field.

Selected items don’t change order on the list to to increase findability.
