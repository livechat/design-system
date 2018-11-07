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
  {key: '10', props: {name: 'option 10', value: '10'}},
  {key: '20', props: {name: 'option 20', value: '20'}},
  {key: '30', props: {name: 'option 30', value: '30'}},
  {key: '40', props: {name: 'option 40', value: '40'}},
  {key: '50', props: {name: 'option 50', value: '50'}},
  {key: '60', props: {name: 'option 60', value: '60'}},
  {key: '70', props: {name: 'option 70', value: '70'}},
  {key: '80', props: {name: 'option 80', value: '80'}},
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
  <MultiSelectField
    items={items}
    searchProperty='name'
    onItemSelected={handleItemSelect}
    getItemBody={getItemBody}
    toggleAllOptions={{
      onToggleAll: toggleAll
    }}
    search
    maxSelectedItemsContainerHeight={72}
    placeholder='Select option'
    getSelectedItemBody={getSelectedItemBody}
    selected={state.selectedItems}
    searchPlaceholder='Search...'
  />
</div>
```
