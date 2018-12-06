```js
initialState = {
  from: undefined,
  to: undefined
};

const handleDayClick = (day, second) => {
  console.log(day, second)
  setState({
    selectedDate: day
  }, () => {
    console.log(state.selectedDate)
  })
};

<div>
  <DatePickerInput />
  <DatePicker onDayClick={handleDayClick} selectedDays={state.selectedDate}/>
</div>
```
