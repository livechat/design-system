```js
const items = [
  { 
    key: '1', 
    props: {
      name: 'asdas',
      value: '1'
    }
  },
  { 
    key: '2', 
    props: {
      name: 'as',
      value: '2'
    }
  },
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
  if (!props) {
    return null;
  }
  return <div id={props.value}>{props.name}</div>;
};

<div style={{width: '340px'}}>
  <SelectField
    items={items}
    searchProperty='name'
    onItemSelected={handleItemSelect}
    getItemBody={getItemBody}
    getSelectedItemBody={getSelectedItemBody}
    selectedItem={state.selectedItem}
    placeholder='Search...'
  />
</div>
```