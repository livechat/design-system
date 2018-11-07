SelectField:

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
    search
    placeholder='Select option'
    getSelectedItemBody={getSelectedItemBody}
    selected={state.selectedItem}
    searchPlaceholder='Search...'
  />
</div>
```
