Use checkboxes when there is a short list of options and the user can select multiple options, all or none.

<h3>Checkbox Field</h3>

```js
initialState = { checked: false };

<CheckboxField
  checked={state.checked}
  onClick={() => setState({checked: !state.checked})}
  id="checkbox-example-1"
  description="checkbox helper text"
>
  Checkbox label
</CheckboxField>
```
```js noeditor
  <ComponentHtmlMarkup>
    <CheckboxField
      checked
      id="checkbox-example-1"
      description="checkbox helper text"
    >
      Checkbox label
    </CheckboxField>
  </ComponentHtmlMarkup>
```

<h3>CheckboxField Disabled</h3>

```js
<CheckboxField
  checked
  disabled
  id="checkbox-example-2"
>
  Checkbox Field label
</CheckboxField>
```
```js noeditor
  <ComponentHtmlMarkup>
    <CheckboxField
      checked
      disabled
      id="checkbox-example-2"
    >
      Checkbox Field label
    </CheckboxField>
  </ComponentHtmlMarkup>
```

<h3>Best practices</h3>
<ul>
  <li>Labels appear to the right of checkboxes, and start with a captital letter.</li>
  <li>Labels state clearly what will happen if the box is checked.</li>
  <li>Use positive wording (“Turn on notifications” instead of “Turn off notifications”).</li>
  <li>Don’t use commas at the end of each line.</li>
  <li>Users can select the checkbox by clicking on the box or its label.</li>
  <li>Each checkbox is independent – selecting one doesn't uncheck others in the list.</li>
  <li>List options from most likely to least likely to be selected.</li>
</ul>
