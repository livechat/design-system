```js noeditor
<Banner size="large" type="warning">This component can be used only in React applications.</Banner>
```

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
  selectedItem: null,
  error: null
};

const handleItemSelect = item => {
  if (item === null) {
    setState({selectedItem: item, error: 'Please select one option'});
  } else {
    setState({selectedItem: item, error: null});
  }
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

<div style={{width: '340px'}}>
  <SelectField
    id='select-example'
    items={items}
    searchProperty='name'
    onItemSelect={handleItemSelect}
    getItemBody={getItemBody}
    description="Helper text"
    labelText="Select example"
    error={state.error}
    search
    placeholder='Select option'
    getSelectedItemBody={getSelectedItemBody}
    selected={state.selectedItem}
    searchPlaceholder='Search...'
    selectHeader="Select from items below"
  />
</div>
```
```js noeditor
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
  <SelectField
    id='select-example'
    items={items}
    searchProperty='name'
    onItemSelect={item => {}}
    getItemBody={getItemBody}
    description="Helper text"
    labelText="Select example"
    error="Error"
    search
    placeholder='Select option'
    getSelectedItemBody={getSelectedItemBody}
    selected="1"
    searchPlaceholder='Search...'
    selectHeader="Select from items below"
  />
</ComponentHtmlMarkup>
```

The SelectField component should be used especially in forms, when you need to validate field or add additional informations to field. It's provides additional props to Select, like: labelText, error and description.
