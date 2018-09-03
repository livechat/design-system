Radio Button
```js
initialState = { checked: false };

<RadioButton
  checked={state.checked}
  onClick={() => setState({checked: !state.checked})}
  id='radio-example-1'
>
  Radio button label
</RadioButton>
```
```js noeditor
  <ComponentHtmlMarkup>
    <RadioButton
      checked
      id='radio-example-1'
    >
      Radio button label
    </RadioButton>
  </ComponentHtmlMarkup>
```

Radio Button Disabled
```js
<RadioButton
  checked
  disabled
  id='radio-example-2'
>
  Radio button label
</RadioButton>
```
```js noeditor
  <ComponentHtmlMarkup>
    <RadioButton
      checked
      disabled
  id='radio-example-2'
    >
      Radio button label
    </RadioButton>
  </ComponentHtmlMarkup>
```
