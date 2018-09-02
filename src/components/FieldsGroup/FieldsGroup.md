Fields Group
```js
initialState = { formValue: '1' };

onRadioClick = (e) => {
  setState({
    formValue: e.target.value
  })
}

<FieldsGroup>
  <RadioButton
    checked={state.formValue === '1'}
    value='1'
    name='field-group-example'
    onClick={onRadioClick}
  >
    Radio button label
  </RadioButton>
  <RadioButton
    checked={state.formValue === '2'}
    value='2'
    name='field-group-example'
    onClick={onRadioClick}
  >
    Radio button label
  </RadioButton>
</FieldsGroup>

```

Fields Group inline
```js
initialState = { formValue: '1' };

onRadioClick = (e) => {
  setState({
    formValue: e.target.value
  })
}

<FieldsGroup inline>
  <RadioButton
    checked={state.formValue === '1'}
    value='1'
    name='field-group-example'
    onClick={onRadioClick}
  >
    Radio button label
  </RadioButton>
  <RadioButton
    checked={state.formValue === '2'}
    value='2'
    name='field-group-example'
    onClick={onRadioClick}
  >
    Radio button label
  </RadioButton>
</FieldsGroup>

```
