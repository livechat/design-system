```js
initialState = {
  selectedDate: null
};

const handleDayClick = (day) => {
  setState({
    selectedDate: day
  }, () => {
    console.log(state.selectedDate)
  })
};
<div style={{display: 'flex'}}>
  <Card
    title="Example card"
  >
    <DatePicker onDayClick={handleDayClick} selectedDays={state.selectedDate}/>
  </Card>
</div>
```

```js
  <Card
    title="Example card with icon"
    img="https://via.placeholder.com/100"
  >
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris 
  </Card>
```
```js
<div style={{display: 'flex'}}>
  <Card
    title="Example empty card"
    img="https://via.placeholder.com/100"
  />
</div>
```