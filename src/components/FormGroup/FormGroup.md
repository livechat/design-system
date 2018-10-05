Use FormGroup component to group related fieldsets. Component provides label for group of fields which improves accessibility of your form.

Form Group
```js
initialState = { formValue: '1' };

onRadioClick = (e) => {
  setState({
    formValue: e.target.value
  })
}

<FormGroup labelText='Form Group example' helperText={'Form Group helper text'}>
  <FieldGroup>
    <RadioButton
      checked={state.formValue === '1'}
      value='1'
      name='form-group-example'
      id='form-group-example-1'
      onClick={onRadioClick}
    >
      Radio button label 1
    </RadioButton>
    <RadioButton
      checked={state.formValue === '2'}
      value='2'
      name='form-group-example'
      id='form-group-example-2'
      onClick={onRadioClick}
    >
      Radio button label 2
    </RadioButton>
  </FieldGroup>
</FormGroup>
```

```js noeditor

<ComponentHtmlMarkup>
  <FormGroup labelText='Form Group example' helperText={'Form Group helper text'}>
    <FieldGroup>
      <RadioButton
        checked
        value='1'
        name='form-group-example'
        id='form-group-example-1'
      >
        Radio button label 1
      </RadioButton>
      <RadioButton
        value='2'
        name='form-group-example'
        id='form-group-example-2'
      >
        Radio button label 2
      </RadioButton>
    </FieldGroup>
  </FormGroup>
</ComponentHtmlMarkup>
```
