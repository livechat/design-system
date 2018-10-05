Use FieldGroup component to group elements and display it in nice layout (inline or stacked).

Field Group
```js
initialState = { formValue: '1' };

onRadioChange = (e) => {
  setState({
    formValue: e.target.value
  })
}

<FieldGroup>
  <RadioButton
    checked={state.formValue === '1'}
    value='1'
    id='field-group-example-1'
    name='field-group-example'
    onChange={onRadioChange}
  >
    Radio button label
  </RadioButton>
  <RadioButton
    checked={state.formValue === '2'}
    value='2'
    id='field-group-example-2'
    name='field-group-example'
    onChange={onRadioChange}
  >
    Radio button label
  </RadioButton>
</FieldGroup>

```
```js noeditor
<ComponentHtmlMarkup>
  <FieldGroup>
    <RadioButton
      checked
      value='1'
      id='field-group-example-1'
      name='field-group-example'
    >
      Radio button label
    </RadioButton>
    <RadioButton
      value='2'
      id='field-group-example-2'
      name='field-group-example'
    >
      Radio button label
    </RadioButton>
  </FieldGroup>
</ComponentHtmlMarkup>
```

Field Group inline
```js
initialState = { formValue: '1' };

onRadioChange = (e) => {
  setState({
    formValue: e.target.value
  })
}

<FieldGroup inline>
  <RadioButton
    checked={state.formValue === '1'}
    value='1'
    name='field-group-example'
    id='field-group-example-3'
    onClick={onRadioChange}
  >
    Radio button label
  </RadioButton>
  <RadioButton
    checked={state.formValue === '2'}
    value='2'
    id='field-group-example-4'
    name='field-group-example'
    onClick={onRadioChange}
  >
    Radio button label
  </RadioButton>
</FieldGroup>
```
```js noeditor
<ComponentHtmlMarkup>
  <FieldGroup inline>
    <RadioButton
      checked
      value='1'
      id='field-group-example-3'
      name='field-group-example'
    >
      Radio button label
    </RadioButton>
    <RadioButton
      value='2'
      id='field-group-example-4'
      name='field-group-example'
    >
      Radio button label
    </RadioButton>
  </FieldGroup>
</ComponentHtmlMarkup>
```