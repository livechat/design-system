Radio Button
```js
initialState = { checked: false };

<RadioButton
  checked={state.checked}
  onClick={() => setState({checked: !state.checked})}
>
  Radio button label
</RadioButton>
```
```js noeditor
  <ComponentHtmlMarkup>
    <RadioButton
      checked
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
>
  Radio button label
</RadioButton>
```
```js noeditor
  <ComponentHtmlMarkup>
    <RadioButton
      checked
      disabled
    >
      Radio button label
    </RadioButton>
  </ComponentHtmlMarkup>
```
