Text Input
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

<TextInput
  value={state.value}
  labelText='Text Input label'
  error={state.error}
  id='text-input-example-1'
  placeholder='Placeholder...'
  description='Text longer than 5 character will trigger error'
  onChange={onInputChange}
/>
```
```js noeditor
initialState = { value: 'Text Input text', error: 'Validation message here' };

<ComponentHtmlMarkup>
  <TextInput
    value={state.value}
    labelText='Text Input label'
    error={state.error}
    id='text-input-example-1'
    placeholder='Placeholder...'
    description='Optional helper text goes here'
    onChange={onInputChange}
  />
</ComponentHtmlMarkup>
```

Inline Text Input
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

<TextInput
  value={state.value}
  inline
  labelText='Text Input label'
  error={state.error}
  id='text-input-example-3'
  placeholder='Placeholder...'
  description='Text longer than 5 character will trigger error'
  onChange={onInputChange}
/>
```
```js noeditor
initialState = { value: 'Text Input text', error: 'Validation message here' };

<ComponentHtmlMarkup>
  <TextInput
    value={state.value}
    inline
    labelText='Text Input label'
    error={state.error}
    id='text-input-example-4'
    placeholder='Placeholder...'
    description='Validation message here'
    onChange={onInputChange}
  />
</ComponentHtmlMarkup>
```

Text Input Disabled
```js
<TextInput
  value='Text Input text'
  labelText='Text Input label'
  disabled
  id='text-input-example-5'
  placeholder='Placeholder...'
  description='Input is disabled'
/>
```
```js noeditor
<ComponentHtmlMarkup>
  <TextInput
    value='Text Input text'
    labelText='Text Input label'
    disabled
    id='text-input-example-5'
    placeholder='Placeholder...'
    description='Input is disabled'
  />
</ComponentHtmlMarkup>
```