Field Group
```js
initialState = { formValue: '1' };

onRadioClick = (e) => {
  setState({
    formValue: e.target.value
  })
}

<FieldGroup labelText='Field Group example'>
  <FormGroup inline>
    <RadioButton
      checked={state.formValue === '1'}
      value='1'
      name='field-group-example'
      id='field-group-example-1'
      onClick={onRadioClick}
    >
      Radio button label 1
    </RadioButton>
    <RadioButton
      checked={state.formValue === '2'}
      value='2'
      name='field-group-example'
      id='field-group-example-2'
      onClick={onRadioClick}
    >
      Radio button label 2
    </RadioButton>
  </FormGroup>
</FieldGroup>
```

```js noeditor

<ComponentHtmlMarkup>
  <FieldGroup labelText='Field Group example'>
    <FormGroup inline>
      <RadioButton
        checked
        value='1'
        name='field-group-example'
        id='field-group-example-1'
      >
        Radio button label 1
      </RadioButton>
      <RadioButton
        value='2'
        name='field-group-example'
        id='field-group-example-2'
      >
        Radio button label 2
      </RadioButton>
    </FormGroup>
  </FieldGroup>
</ComponentHtmlMarkup>
```
