Use radio buttons where there’s a list of two or more mutually exclusive items, and the users must select exactly one option.

<h3>Radio Button</h3>

```js
initialState = { checked: false };

<RadioButton
  checked={state.checked}
  onClick={() => setState({checked: !state.checked})}
  id='radio-example-1'
  description='radio button helper text'
>
  Radio button label
</RadioButton>
```
```js noeditor
  <ComponentHtmlMarkup>
    <RadioButton
      checked
      id='radio-example-1'
      description='radio button helper text'
    >
      Radio button label
    </RadioButton>
  </ComponentHtmlMarkup>
```

<h3>Radio Button Disabled</h3>

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

<h3>Best practices</h3>
<ul>
  <li>Labels appear to the right of radio buttons, and start with a captital letter.</li>
  <li>Labels state clearly what will happen if the button is selected.</li>
  <li>Users can select the button by clicking on the radio or its label.</li>
  <li>Clicking a non-selected radio button deselects whatever other button was previously selected.</li>
  <li>Always provide a default option. If you need an unselected state, just add a ‘None’ radio button.</li>
</ul>