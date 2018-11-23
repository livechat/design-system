<h3>Numeric Input</h3>

Use when the input requires a numerical value.

```js
initialState = { value: '1', error: null };

requiredValidator = value => value !== '' && value !== '-';
handleInputChange = (value) => {
  setState({
    value,
    error: requiredValidator(value) ? null : 'Field required'
  });
}

<NumericInput
  width="60px"
  min={1}
  value={state.value}
  error={state.error}
  onChange={handleInputChange}
/>
```
```js noeditor
<ComponentHtmlMarkup>
  <NumericInput
    width="60px"
    value="1"
    error="Field required"
    onChange={() => {}}
  />
</ComponentHtmlMarkup>
```

<h3>Numeric Input Field</h3>

You can pass min and max prop to component. In this example value should be within range [-10, 1000]

```js
initialState = { value: '1000', error: null };

requiredValidator = value => value !== '' && value !== '-';
handleInputChange = (value) => {
  setState({
    value,
    error: requiredValidator(value) ? null : 'Field required'
  });
}

<NumericInputField
  id="num-input-field"
  min={-10}
  max={1000}
  width="75px"
  value={state.value}
  error={state.error}
  onChange={handleInputChange}
  labelText="Number"
  description="Choose number"
/>
```
```js noeditor
<ComponentHtmlMarkup>
  <NumericInput
    id="num-input-field"
    min={-10}
    max={1000}
    width="75px"
    value="1000"
    error="Field required"
    onChange={() => {}}
    labelText="Number"
    description="Choose number"
  />
</ComponentHtmlMarkup>
```

<h3>Numeric Input without controls</h3>

```js
initialState = { value: '51' };

handleInputChange = (value) => {
  setState({
    value
  });
}

<NumericInput
  width="35px"
  value={state.value}
  noControls
  onChange={handleInputChange}
/>
```
```js noeditor
<ComponentHtmlMarkup>
  <NumericInput
    width="35px"
    value="51"
    noControls
    onChange={() => {}}
  />
</ComponentHtmlMarkup>
```

<h3>Disabled Numeric Input</h3>

```js
initialState = { value: '51' };
requiredValidator = value => value !== '' && value !== '-';

handleInputChange = (value) => {
  setState({
    value,
  });
}

<NumericInput
  min={1}
  max={50}
  disabled
  value="1"
  onChange={() => {}}
/>
```
```js noeditor
<ComponentHtmlMarkup>
  <NumericInput
    min={1}
    max={50}
    disabled
    value="1"
    onChange={() => {}}
  />
</ComponentHtmlMarkup>
```
