MultiSelectField
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
    searchPlaceholder='Search...'
  />
</div>
```
```js noeditor
const items = [
  {key: '1', props: {name: 'option 1', value: '1'}},
  {key: '2', props: {name: 'option 2', value: '2'}},
  {key: '3', props: {name: 'option 3', value: '3'}}
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
    searchProperty='name'
    onItemSelect={() => {}}
    onItemRemove={() => {}}
    getItemBody={getItemBody}
    toggleAllOptions={{
      onToggleAll: () => {}
    }}
    search
    maxItemsContainerHeight={72}
    getSelectedItemBody={getSelectedItemBody}
    selected={['1']}
    searchPlaceholder='Search...'
  />
</ComponentHtmlMarkup>
```