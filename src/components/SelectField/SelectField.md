```js
const items = [
  {key: '1', props: {name: 'option 1', value: '1'}},
  {key: '2', props: {name: 'option 2', value: '2'}},
  {key: '3', props: {name: 'option 3', value: '3'}},
  {key: '4', props: {name: 'option 4', value: '4'}},
];
initialState = {
  selectedItem: null
};

const handleItemSelect = item => setState({selectedItem: item});

const getItemBody = props => {
  if (!props) {
    return null;
  }
  return <div id={props.value}>{props.name}</div>;
};

const getSelectedItemBody = props => {
  return <div id={props.value}>{props.name}</div>;
};

<div style={{width: '340px'}}>
  <SelectField
    items={items}
    searchProperty='name'
    onItemSelected={handleItemSelect}
    getItemBody={getItemBody}
    selectedItemPlaceholder='Select option'
    getSelectedItemBody={getSelectedItemBody}
    selectedItem={state.selectedItem}
    placeholder='Search...'
  />
</div>
```