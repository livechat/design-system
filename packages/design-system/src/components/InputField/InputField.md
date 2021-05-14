<h3>Input Field</h3>

```js
initialState = { value: '', error: null };

onInputChange = (e) => {
  if (e.target.value.length > 5) {
    setState({
      value: e.target.value,
      error: 'Validation message here'
    });
  } else {
    setState({
      value: e.target.value,
      error: null
    });
  }
}

<InputField
  value={state.value}
  labelText='Input Field label'
  error={state.error}
  id='input-field-example-1'
  placeholder='Placeholder...'
  description='Text longer than 5 character will trigger error'
  onChange={onInputChange}
/>
```

```js noeditor
initialState = { value: "Input Field text", error: "Validation message here" };

<ComponentHtmlMarkup>
  <InputField
    value={state.value}
    labelText="Input Field label"
    error={state.error}
    id="input-field-example-1"
    placeholder="Placeholder..."
    description="Optional helper text goes here"
    onChange={() => {}}
  />
</ComponentHtmlMarkup>;
```

<h3>Input with label right node</h3>

```js
initialState = { value: '', error: null, chars: 0 };

onInputChange = (e) => {
  if (e.target.value.length >= 5) {
    setState({
      value: e.target.value,
      error: 'Input value reached maximum lenght',
      chars: 5
    });
  } else {
    setState({
      value: e.target.value,
      error: null,
      chars: e.target.value.length
    });
  }
}
<div style={{width: '250px'}}>
<InputField
  value={state.value}
  labelText='Input with characters count'
  error={state.error}
  style={{ width: '100%'}}
  id='input-field-example-2'
  placeholder='Placeholder...'
  onChange={onInputChange}
  maxLength={5}
  labelRightNode={<span>{state.chars} / 5</span>}
/>
<InputField
  labelText='Input with custom label'
  id='input-field-example-3'
  style={{ width: '100%'}}
  placeholder='Placeholder...'
  labelRightNode={<a href="/">link</a>}
/>
</div>
```

<h3>Inline Input Field</h3>

```js
initialState = { value: '', error: null };

onInputChange = (e) => {
  if (e.target.value.length > 5) {
    setState({
      value: e.target.value,
      error: 'Validation message here'
    });
  } else {
    setState({
      value: e.target.value,
      error: null
    });
  }
}

<InputField
  value={state.value}
  inline
  labelText='Input Field label'
  error={state.error}
  id='input-field-example-4'
  placeholder='Placeholder...'
  description='Text longer than 5 character will trigger error'
  onChange={onInputChange}
/>
```

```js noeditor
initialState = { value: "Input Field text", error: "Validation message here" };

<ComponentHtmlMarkup>
  <InputField
    value={state.value}
    inline
    labelText="Input Field label"
    error={state.error}
    id="input-field-example-4"
    placeholder="Placeholder..."
    description="Validation message here"
    onChange={() => {}}
  />
</ComponentHtmlMarkup>;
```

<h3>Input Field Disabled</h3>

```js
<InputField
  value="Input Field text"
  labelText="Input Field label"
  disabled
  id="input-field-example-5"
  placeholder="Placeholder..."
  description="Input is disabled"
  onChange={() => {}}
/>
```

```js noeditor
<ComponentHtmlMarkup>
  <InputField
    value="Input Field text"
    labelText="Input Field label"
    disabled
    id="input-field-example-5"
    placeholder="Placeholder..."
    description="Input is disabled"
    onChange={() => {}}
  />
</ComponentHtmlMarkup>
```

<h3>Best practices</h3>
<ul>
  <li><b>Labels:</b>
    Form labels should be short, set in sentence case, without punctuation or articles.
  </li>
  <li><b>Default values:</b>
    Whenever possible, pre-fill inputs with default options to reduce errors and save time.
  </li>
  <li><b>Placeholder text:</b>
    Only use where clarification is needed. Don’t use a placeholder text as a label.
  </li>
  <li><b>Validation text:</b>
    Use visuals (border + validation) to help users spot correct errors. Validate inputs as soon as the user clicks away from the input. Once the user corrects the error, the validation should disappear.<br>
    The validation text should inform the user what has happened, and what to do next. Use passive voice to avoid blaming users for the error (‘Email required’  insetead of ‘You didn’t enter the email’).
  </li>
  <li><b>Optional vs. required fields:</b>
    All fields in a form are assumed required, only mark optional fields.
  </li>
</ul>
