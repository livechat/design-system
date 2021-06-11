Text Area Field is an input field that requires more information.

Component has always 100% height and width of its container. You can control size of textarea by styling its wrapper. Once the max-height is reached, a scroll bar appears to let users view the entire content of the text area field.



<h3>Text Area Field</h3>

```js
initialState = { value: '', error: null };

onInputChange = (e) => {
  if (e.target.value.length > 100) {
    setState({
      value: e.target.value.substring(0, 100),
      error: 'Validation message here'
    });
  } else {
    setState({
      value: e.target.value,
      error: null
    });
  }
}


<TextAreaField
  value={state.value}
  labelText='Text Area Field label'
  error={state.error}
  labelRightNode={`${state.value.length}/100`}
  id='text-area-field-example-1'
  placeholder='Placeholder...'
  description='Text longer than 100 character will trigger error'
  onChange={onInputChange}
/>
```
```js noeditor
initialState = { value: 'Text Area text', error: 'Validation message here' };

<ComponentHtmlMarkup>
  <TextAreaField
    value={state.value}
    labelText='Text Area Field label'
    error={state.error}
    id='text-area-field-example-1'
    placeholder='Placeholder...'
    description='Optional helper text goes here'
    onChange={onInputChange}
  />
</ComponentHtmlMarkup>
```

<h3>Inline Text Area Field</h3>

```js
initialState = { value: '', error: null };

onInputChange = (e) => {
  if (e.target.value.length > 100) {
    setState({
      value: e.target.value.substring(0, 100),
      error: 'Validation message here'
    });
  } else {
    setState({
      value: e.target.value,
      error: null
    });
  }
}

<TextAreaField
  value={state.value}
  inline
  labelText='Text Area Field label'
  labelRightNode={`${state.value.length}/100`}
  error={state.error}
  id='text-area-field-example-3'
  placeholder='Placeholder...'
  description='Text longer than 5 character will trigger error'
  onChange={onInputChange}
/>
```
```js noeditor
initialState = { value: 'Text Area text', error: 'Validation message here' };

<ComponentHtmlMarkup>
  <TextAreaField
    value={state.value}
    inline
    labelText='Text Area Field label'
    error={state.error}
    id='text-area-field-example-4'
    placeholder='Placeholder...'
    description='Validation message here'
    onChange={onInputChange}
  />
</ComponentHtmlMarkup>
```

<h3>Text Area Field Disabled</h3>

```js
<TextAreaField
  value='Text Area Field text'
  labelText='Text Area Field label'
  disabled
  id='text-area-field-example-5'
  placeholder='Placeholder...'
  description='Textarea is disabled'
/>
```
```js noeditor
<ComponentHtmlMarkup>
  <TextAreaField
    value='Text Area Field text'
    labelText='Text Area Field label'
    disabled
    id='text-area-field-example-5'
    placeholder='Placeholder...'
    description='Textarea is disabled'
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
