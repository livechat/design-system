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
  const isBeforeFirstDay = from && Math.abs(DateFns.differenceInCalendarDays(day, from)) > 0;
  const isRangeSelected = from && to;
  return !from || isBeforeFirstDay || isRangeSelected;
}
function handleDayClick(day) {
  const { from, to } = state;
  if (from && to && day >= from && day <= to) {
    setState({...initialState});
    return;
  }
  if (isSelectingFirstDay(from, to, day)) {
    setState({
      from: day,
      to: null,
      enteredTo: null,
    });
  } else {
    setState({
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

<div>
  <DatePicker
    className="Range"
    numberOfMonths={2}
    fromMonth={state.from}
    selectedDays={[state.from, { from: state.from, to: state.enteredTo }]}
    disabledDays={{ before: state.from }}
    modifiers={{ start: state.from, end: state.enteredTo }}
    onDayClick={handleDayClick}
    onDayMouseEnter={handleDayMouseEnter}
    range
  />
</div>
```