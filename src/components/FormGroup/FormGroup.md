Use FormGroup component to group fields not related to each other.

Form Group
```js
initialState = { formValue: '1' };

onRadioChange = (e) => {
  setState({
    formValue: e.target.value
  })
}

<FormGroup>
  <RadioButton
    checked={state.formValue === '1'}
    value='1'
    id='form-group-example-1'
    name='form-group-example'
    onChange={onRadioChange}
  >
    Radio button label
  </RadioButton>
  <RadioButton
    checked={state.formValue === '2'}
    value='2'
    id='form-group-example-2'
    name='form-group-example'
    onChange={onRadioChange}
  >
    Radio button label
  </RadioButton>
</FormGroup>

```
```js noeditor
<ComponentHtmlMarkup>
  <FormGroup>
    <RadioButton
      checked
      value='1'
      id='form-group-example-1'
      name='form-group-example'
    >
      Radio button label
    </RadioButton>
    <RadioButton
      value='2'
      id='form-group-example-2'
      name='form-group-example'
    >
      Radio button label
    </RadioButton>
  </FormGroup>
</ComponentHtmlMarkup>
```

Form Group inline
```js
initialState = { formValue: '1' };

onRadioChange = (e) => {
  setState({
    formValue: e.target.value
  })
}

<FormGroup inline>
  <RadioButton
    checked={state.formValue === '1'}
    value='1'
    name='form-group-example'
    id='form-group-example-3'
    onClick={onRadioChange}
  >
    Radio button label
  </RadioButton>
  <RadioButton
    checked={state.formValue === '2'}
    value='2'
    id='form-group-example-4'
    name='form-group-example'
    onClick={onRadioChange}
  >
    Radio button label
  </RadioButton>
</FormGroup>
```
```js noeditor
<ComponentHtmlMarkup>
  <FormGroup inline>
    <RadioButton
      checked
      value='1'
      id='form-group-example-3'
      name='form-group-example'
    >
      Radio button label
    </RadioButton>
    <RadioButton
      value='2'
      id='form-group-example-4'
      name='form-group-example'
    >
      Radio button label
    </RadioButton>
  </FormGroup>
</ComponentHtmlMarkup>
```