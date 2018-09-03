Fields Group
```js
initialState = { formValue: '1' };

onRadioChange = (e) => {
  setState({
    formValue: e.target.value
  })
}

<FieldsGroup>
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
</FieldsGroup>

```
```js noeditor
<ComponentHtmlMarkup>
  <FieldsGroup>
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
  </FieldsGroup>
</ComponentHtmlMarkup>
```

Fields Group inline
```js
initialState = { formValue: '1' };

onRadioChange = (e) => {
  setState({
    formValue: e.target.value
  })
}

<FieldsGroup inline>
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
</FieldsGroup>
```
```js noeditor
<ComponentHtmlMarkup>
  <FieldsGroup inline>
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
  </FieldsGroup>
</ComponentHtmlMarkup>
```