```js
const handleChange = value => {
  console.log(value);
}

const selectItems = [
  {id: 'today', label: 'Today', value: {from: new Date(), to: new Date()}},
  {id: 'yesterday', label: 'Yesterday', value: {from: DateFns.subDays(new Date(), 1), to: DateFns.subDays(new Date(), 1)}},
  {id: 'last_7_days', label: 'Last 7 days', value: {from: DateFns.subDays(new Date(), 7), to: new Date()}},
  {id: 'custom_date',  isManual: true, label: 'Custom date', value: null}
];

<div style={{ width: '550px' }}>
  <RangeDatePicker
    onChange={handleChange}
    options={selectItems}
    initialSelectedItemKey='custom_date'
    initialFromDate={new Date(2014, 1, 1)}
    initialToDate={new Date(2015, 1, 1)}
    toMonth={new Date()}
  >
    {({ select, datepickers, selectedOption }) => (
      <React.Fragment>
        <SelectField
          {...select}
          id="date-select"
          search
          placeholder="Select option"
          searchPlaceholder="Search..."
        />
        {selectedOption && selectedOption.isManual ? (
          <DatePickerRangeCalendarsWrapper>
            <div style={{ borderRight: '1px solid #e7e8e9', paddingRight: '14px' }}>
              <DatePicker {...datepickers.from} />
            </div>

          </DatePickerRangeCalendarsWrapper>
        ) : null}
      </React.Fragment>
    )}
  </RangeDatePicker>
</div>
```