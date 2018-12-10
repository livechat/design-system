```js
// initialState = {
//   selectedDate: null
// };

// const handleDayClick = (day) => {
//   setState({
//     selectedDate: day
//   }, () => {
//     console.log(state.selectedDate)
//   })
// };
const handleChange = value => {
  console.log(value);
}

<div>
  <SelectDatePicker onChange={handleChange} />
</div>
```