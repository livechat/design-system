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

const selectItems = [
  {id: 'today', label: 'Today', value: {from: new Date(), to: new Date()}},
  {id: 'yesterday', label: 'Yesterday', value: {from: DateFns.subDays(new Date(), 1), to: DateFns.subDays(new Date(), 1)}},
  {id: 'last_7_days', label: 'Last 7 days', value: {from: DateFns.subDays(new Date(), 7), to: new Date()}},
  {id: 'custom_date',  isManual: true, label: 'Custom date', value: null}
];

<div style={{ width: '340px' }}>
  <SelectDatePicker
    onChange={handleChange}
    options={selectItems}
    initialSelectedItemKey='custom_date'
    initialFromDate={new Date(2014, 1, 1)}
    initialToDate={new Date(2015, 1, 1)}
  />
</div>
```