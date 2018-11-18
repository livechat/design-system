<h3>Numeric Input</h3>

```js
initialState = { value: 51, error: null };

onInputChange = (value) => {
  setState({
    value,
    error: value !== null ? null : 'Field required'
  });
}

<NumericInput
  min={1}
  max={50}
  value={state.value}
  error={state.error}
  onChange={onInputChange}
/>
```

<h3>Numeric Input Field</h3>

```js
initialState = { value: 1000, error: null };

onInputChange = (value) => {
  setState({
    value,
    error: value !== null ? null : 'Field required'
  });
}

<NumericInputField
  min={-10}
  max={1000}
  value={state.value}
  error={state.error}
  onChange={onInputChange}
  labelText="Number"
  description="Choose number"
/>
```

<h3>Disabled Numeric Input</h3>

```js
initialState = { value: 51, error: null };

onInputChange = (value) => {
  setState({
    value,
    error: value !== null ? null : 'Field required'
  });
}

<NumericInput
  min={1}
  max={50}
  disabled
  value={1}
  onChange={() => {}}
/>
```
