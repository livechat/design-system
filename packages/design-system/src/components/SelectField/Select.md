<h3>Select</h3>

A select allows users to choose one option from a list of items. Use it when you have &gt;4 options.
A select can allow users to search through a list of choices. When the user types in the input, suggestions are provided.
When an item is selected, it appears highlighted, has a check mark and the primary color.
The selected item replaces the input placeholder.

<h3>Best practices</h3>
<ul>
  <li>
    Have a default selected whenever possible
	•	Sort the list in a logical order. E.g. put the most selected option at the top, or alphabetically.
  </li>
  <li>
    Sort the list in a logical order. E.g. put the most selected option at the top, or alphabetically.
  </li>
</ul>

```js
const items = [
  { key: "1", props: { name: "option 1", value: "1" } },
  { key: "2", props: { name: "option 2", value: "2" } },
  { key: "3", props: { name: "option 3", value: "3" } },
  { key: "4", props: { name: "option 4", value: "4" } },
  { key: "5", props: { name: "option 5", value: "5" } },
  { key: "6", props: { name: "option 6", value: "6" } },
  { key: "7", props: { name: "option 7", value: "7" } },
  { key: "8", props: { name: "option 8", value: "8" } }
];
initialState = {
  selectedItem: null
};

const handleItemSelect = item => setState({ selectedItem: item });

const getItemBody = props => {
  if (!props) {
    return null;
  }
  return <div id={props.value}>{props.name}</div>;
};

const getSelectedItemBody = props => {
  return <div id={props.value}>{props.name}</div>;
};

<div style={{ width: "340px" }}>
  <Select
    id="select-example"
    items={items}
    searchProperty="name"
    onItemSelect={handleItemSelect}
    getItemBody={getItemBody}
    search
    placeholder="Select option"
    getSelectedItemBody={getSelectedItemBody}
    selected={state.selectedItem}
    searchPlaceholder="Search..."
  />
</div>;
```

```js noeditor
const items = [
  { key: "1", props: { name: "option 1", value: "1" } },
  { key: "2", props: { name: "option 2", value: "2" } },
  { key: "3", props: { name: "option 3", value: "3" } },
  { key: "4", props: { name: "option 4", value: "4" } },
  { key: "5", props: { name: "option 5", value: "5" } },
  { key: "6", props: { name: "option 6", value: "6" } },
  { key: "7", props: { name: "option 7", value: "7" } },
  { key: "8", props: { name: "option 8", value: "8" } }
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
  <Select
    id="select-example"
    items={items}
    searchProperty="name"
    onItemSelect={item => {}}
    getItemBody={getItemBody}
    search
    placeholder="Select option"
    getSelectedItemBody={getSelectedItemBody}
    selected="1"
    searchPlaceholder="Search..."
  />
</ComponentHtmlMarkup>;
```

<h3>Disabled</h3>

```js
const items = [
  { key: "1", props: { name: "option 1", value: "1" } },
  { key: "2", props: { name: "option 2", value: "2" } }
];
initialState = {
  selectedItem: null
};

const handleItemSelect = item => setState({ selectedItem: item });

const getItemBody = props => {
  if (!props) {
    return null;
  }
  return <div id={props.value}>{props.name}</div>;
};

const getSelectedItemBody = props => {
  return <div id={props.value}>{props.name}</div>;
};

<div style={{ width: "340px" }}>
  <Select
    id="select-example"
    items={items}
    searchProperty="name"
    onItemSelect={handleItemSelect}
    getItemBody={getItemBody}
    search
    disabled
    placeholder="Select option"
    getSelectedItemBody={getSelectedItemBody}
    selected={state.selectedItem}
    searchPlaceholder="Search..."
  />
</div>;
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
  <Select
    id="select-example"
    items={items}
    searchProperty="name"
    onItemSelect={item => {}}
    getItemBody={getItemBody}
    search
    disabled
    placeholder="Select option"
    getSelectedItemBody={getSelectedItemBody}
    selected="1"
    searchPlaceholder="Search..."
  />
</ComponentHtmlMarkup>;
```

<h3>Select with controlled dropdown visibility</h3>

```js
const items = [
  { key: "1", props: { name: "option 1", value: "1" } },
  { key: "2", props: { name: "option 2", value: "2" } },
  { key: "3", props: { name: "option 3", value: "3" } },
  { key: "4", props: { name: "option 4", value: "4" } },
  { key: "5", props: { name: "option 5", value: "5" } },
  { key: "6", props: { name: "option 6", value: "6" } },
  { key: "7", props: { name: "option 7", value: "7" } },
  { key: "8", props: { name: "option 8", value: "8" } }
];
initialState = {
  selectedItem: null,
  isOpen: false
};

const handleItemSelect = item => setState({ selectedItem: item });

const handleDropdownToggle = isOpen => {
  setState(prevState => ({
    isOpen
  }));
};

const toggleDropdown = () => {
  setTimeout(() => {
    setState(prevState => ({
      isOpen: !prevState.isOpen
    }));
  });
};

const getItemBody = props => {
  if (!props) {
    return null;
  }
  return <div id={props.value}>{props.name}</div>;
};

const getSelectedItemBody = props => {
  return <div id={props.value}>{props.name}</div>;
};

<div style={{ width: "340px" }}>
  <div style={{ margin: "10px 0" }}>
    <Button onClick={toggleDropdown}>{state.isOpen ? "Hide" : "Show"}</Button>
  </div>
  <Select
    id="select-example"
    items={items}
    searchProperty="name"
    onItemSelect={handleItemSelect}
    getItemBody={getItemBody}
    search
    isOpen={state.isOpen}
    placeholder="Select option"
    getSelectedItemBody={getSelectedItemBody}
    selected={state.selectedItem}
    searchPlaceholder="Search..."
    onDropdownToggle={handleDropdownToggle}
  />
</div>;
```

<h3>Select with search results empty  state</h3>

```js
const items = [
  { key: "1", props: { name: "option 1", value: "1" } },
  { key: "2", props: { name: "option 2", value: "2" } }
];

initialState = {
  selectedItem: null,
  searchPhrase: ""
};

const handleItemSelect = item => setState({ selectedItem: item });

const getItemBody = props => {
  if (!props) {
    return null;
  }
  return <div id={props.value}>{props.name}</div>;
};

const getSelectedItemBody = props => {
  return <div id={props.value}>{props.name}</div>;
};

const handleSearchPhraseChange = searchPhrase => setState({ searchPhrase });

const SearchEmptyState = ({ searchPhrase }) => (
  <div style={{ width: "100%", padding: "14px 10px", boxSizing: "border-box" }}>
    No search results for phrase "{searchPhrase}
    ". :(
    <br /> Please type something different.
  </div>
);

<div style={{ width: "340px" }}>
  <Select
    id="select-example"
    items={items}
    searchProperty="name"
    onItemSelect={handleItemSelect}
    getItemBody={getItemBody}
    search
    searchEmptyState={<SearchEmptyState searchPhrase={state.searchPhrase} />}
    placeholder="Select option"
    onSearchPhraseChange={handleSearchPhraseChange}
    getSelectedItemBody={getSelectedItemBody}
    selected={state.selectedItem}
    searchPlaceholder="Search..."
  />
</div>;
```
