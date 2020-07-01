```js noeditor
<Banner size="large" type="warning">This component can be used only in React applications.</Banner>
```

<h3>Date picker</h3>

DatePicker component under the hood uses react-day-picker library. It has some livechat custom styles.
Props are exactly the same as in the original library. You can check it out in official docs: http://react-day-picker.js.org/api/DayPicker. 

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

<div>
  <DatePicker onDayClick={handleDayClick} selectedDays={state.selectedDate}/>
</div>
```
