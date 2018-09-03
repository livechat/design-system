Radio Group
```js
initialState = { formValue: '1' };

onRadioClick = (e) => {
  setState({
    formValue: e.target.value
  })
}

<RadioGroup labelText='Radio Group example'>
  <FieldsGroup inline>
    <RadioButton
      checked={state.formValue === '1'}
      value='1'
      name='radio-group-example'
      id='radio-group-example-1'
      onClick={onRadioClick}
    >
      Radio button label 1
    </RadioButton>
    <RadioButton
      checked={state.formValue === '2'}
      value='2'
      name='radio-group-example'
      id='radio-group-example-2'
      onClick={onRadioClick}
    >
      Radio button label 2
    </RadioButton>
  </FieldsGroup>
</RadioGroup>
```

```js noeditor

<ComponentHtmlMarkup>
  <RadioGroup labelText='Radio Group example'>
    <FieldsGroup inline>
      <RadioButton
        checked
        value='1'
        name='radio-group-example'
        id='radio-group-example-1'
      >
        Radio button label 1
      </RadioButton>
      <RadioButton
        value='2'
        name='radio-group-example'
        id='radio-group-example-2'
      >
        Radio button label 2
      </RadioButton>
    </FieldsGroup>
  </RadioGroup>
</ComponentHtmlMarkup>
```
