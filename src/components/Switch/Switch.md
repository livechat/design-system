Use toggles to immediately switch between two states (e.g. ON / OFF)

Basic size
```js
initialState = {
  isOn: false
};
const onChange = (e) => setState({isOn: !state.isOn});

<div style={{display: 'flex', alignItems: 'center'}}>
  <span style={{marginRight: '10px', alignItems: 'center'}}> Enable sound notifications for customers </span>
  <Switch onChange={onChange} on={state.isOn} />
</div>
```

```js noeditor
initialState = {
  isOn: true
};
const onChange = (e) => setState({isOn: !state.isOn});

  <ComponentHtmlMarkup>
    <div style={{display: 'flex', alignItems: 'center'}}>
      <span style={{marginRight: '10px', alignItems: 'center'}}> Enable sound notifications for customers </span>
      <Switch onChange={onChange} on={state.isOn} />
    </div>
  </ComponentHtmlMarkup>
```

Compact size
```js
initialState = {
  isOn: true
};
const onChange = (e) => setState({isOn: !state.isOn});

<div style={{display: 'flex', alignItems: 'center'}}>
  <span style={{marginRight: '10px', alignItems: 'center'}}> Enable sound notifications for customers </span>
  <Switch size="compact" onChange={onChange} on={state.isOn}/>
</div>
```
```js noeditor
initialState = {
  isOn: true
};
const onChange = (e) => setState({isOn: !state.isOn});
<ComponentHtmlMarkup>
  <div style={{display: 'flex', alignItems: 'center'}}>
    <span style={{marginRight: '10px', alignItems: 'center'}}> Enable sound notifications for customers </span>
    <Switch size="compact" onChange={onChange} on={state.isOn}/>
  </div>
</ComponentHtmlMarkup>
```

Based on component state
```js
  <div style={{display: 'flex', alignItems: 'center'}}>
    <span style={{marginRight: '10px', alignItems: 'center'}}> Enable sound notifications for customers </span>
    <Switch size="compact" defaultOn/>
  </div>
```

```js noeditor
<ComponentHtmlMarkup>
  <div style={{display: 'flex', alignItems: 'center'}}>
    <span style={{marginRight: '10px', alignItems: 'center'}}> Enable sound notifications for customers </span>
    <Switch size="compact" defaultOn/>
  </div>
</ComponentHtmlMarkup>
```

<h3>Best practices</h3>
<ul>
  <li>Don’t require users to press a button to confirm the change. </li>
  <li>If you need users to press a button, use checkboxes instead. </li>
  <li>Write clear labels to make the choice less ambigous.</li>
  <li>Use positive and active wording for labels </li>
</ul>