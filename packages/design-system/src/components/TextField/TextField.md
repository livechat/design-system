TextField is useful if you need to develop custom input field, but want to reuse the logic behind labels, descriptions and errors present in other form components like InputField, TextAreaField etc.

<h3>Text Field with custom input</h3>

```js
<TextField
  labelText="Input Field label"
  error="Some error"
  htmlFor="input-field-example-1"
  description="Some description of this field"
>
  <input id="input-field-example-1" />
</TextField>
```

```js noeditor
initialState = { value: "Input Field text", error: "Validation message here" };

<ComponentHtmlMarkup>
  <TextField
    labelText="Input Field label"
    error="Some error"
    htmlFor="input-field-example-1"
    description="Some description of this field"
  >
    <input id="input-field-example-1" />
  </TextField>
</ComponentHtmlMarkup>;
```
