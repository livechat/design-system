<h3>Date picker</h3>

DatePicker component under the hood uses react-day-picker library. It has some livechat custom styles.
Props are exactly the same as in orginal library. You can check it out in official docs: http://react-day-picker.js.org/api/DayPicker. 

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

```js
initialState = {
  from: null,
  to: null,
  enteredTo: null
};

function isSelectingFirstDay(from, to, day) {
  console.log(day, from, DateFns.differenceInCalendarDays(day, from));
  const isBeforeFirstDay = from && DateFns.differenceInCalendarDays(day, from) < 0;
  const isRangeSelected = from && to;
  return !from || isBeforeFirstDay || isRangeSelected;
}
function handleDayClick(day) {
  const { from, to } = state;
  if (from && to && day >= from && day <= to) {
    return setState({...initialState});
    
  }
  if (isSelectingFirstDay(from, to, day)) {
    return setState({
      from: day,
      to: null,
      enteredTo: null,
    });
  } else {
    return setState({
      to: day,
      enteredTo: day,
    });
  }
}
function handleDayMouseEnter(day) {
  const { from, to } = state;
  if (!isSelectingFirstDay(from, to, day)) {
    setState({
      enteredTo: day,
    });
  }
}

<DatePickerRangeCalendarsWrapper>
  <DatePicker
    numberOfMonths={2}
    fromMonth={state.from}
    selectedDays={[state.from, { from: state.from, to: state.enteredTo }]}
    disabledDays={{ before: state.from }}
    modifiers={{ start: state.from, end: state.enteredTo }}
    onDayClick={handleDayClick}
    onDayMouseEnter={handleDayMouseEnter}
    range
  />
</DatePickerRangeCalendarsWrapper>
```