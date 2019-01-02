```js
const handleChange = value => {
  console.log(value);
}

const options = [
  {id: 'today', label: 'Today', value: {from: new Date(), to: new Date()}},
  {id: 'yesterday', label: 'Yesterday', value: {from: DateFns.subDays(new Date(), 1), to: DateFns.subDays(new Date(), 1)}},
  {id: 'last_7_days', label: 'Last 7 days', value: {from: DateFns.subDays(new Date(), 7), to: new Date()}},
  {id: 'custom_date',  isManual: true, label: 'Custom date', value: null}
];

const selectItems = options.map(option => ({
  key: option.id,
  props: {
    label: option.label,
    value: option.id,
    isManual: option.isManual || false
  }
}));

const getSelectedItemBody = (props, inputs) => {
  if (props.isManual) {
    return (
      <DatePickerRangeSelectInputs
        from={{
          onChange: inputs.from.onChange,
          value: inputs.from.value,
          ref: inputs.from.ref
        }}
        to={{
          onChange: inputs.to.onChange,
          value: inputs.to.value,
          onFocus: inputs.to.onFocus,
          fromDate: inputs.to.fromDate
        }}
      />
    );
  }
  return (
    <div 
      style={{
        width: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        display: 'inline-block',
        fontSize: '14px',
        lineHeight: 1.2
      }}
      id={props.value}
    >
      {props.label}
    </div>
  );
};

const getItemBody = props => (
    <div 
      style={{
        width: '100%',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        display: 'inline-block',
        fontSize: '14px',
        lineHeight: 1.2
      }}
      id={props.value}
    >
      {props.label}
    </div>
  );

<div style={{ width: '550px' }}>
  <RangeDatePicker
    onChange={handleChange}
    options={options}
    initialSelectedItemKey='custom_date'
    initialFromDate={new Date(2014, 1, 1)}
    initialToDate={new Date(2015, 1, 1)}
    toMonth={new Date()}
  >
    {({ select, datepicker, selectedOption, inputs }) => (
      <React.Fragment>
        <SelectField
          {...select}
          id="date-select"
          search
          items={selectItems}
          getItemBody={getItemBody}
          getSelectedItemBody={selectedItemProps => getSelectedItemBody(selectedItemProps, inputs)}
          placeholder="Select option"
          searchPlaceholder="Search..."
        />
        {selectedOption && selectedOption.isManual ? (
          <DatePickerRangeCalendarsWrapper>
            <div style={{ borderRight: '1px solid #e7e8e9', paddingRight: '14px' }}>
              <DatePicker {...datepicker} />
            </div>

          </DatePickerRangeCalendarsWrapper>
        ) : null}
      </React.Fragment>
    )}
  </RangeDatePicker>
</div>
```