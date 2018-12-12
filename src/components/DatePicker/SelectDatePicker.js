import * as React from 'react';
import * as PropTypes from 'prop-types';
import { format, isFuture, isAfter, isSameDay, subMonths } from 'date-fns';
import { DateUtils } from 'react-day-picker';
import memoizeOne from 'memoize-one';
import SelectField from '../SelectField/SelectField';
import styles from './style.scss';
import DatePicker from './DatePicker';
import DatePickerRangeSelectItem from './DatePickerRangeSelectItem';
import DatePickerRangeCalendarsWrapper from './DatePickerRangeCalendarsWrapper';
import { isValidDateFormat, isDateWithinRange } from './helpers';

const initialState = {
  selectedItem: null,
  fromInputValue: '',
  toInputValue: '',
  from: undefined,
  to: undefined,
  error: null,
  enteredTo: null
};

class SelectDatePicker extends React.Component {
  constructor(props) {
    super(props);

    const initialStateFromProps = this.getStateFromInitialPropsValues(props);

    this.state = {
      ...initialState,
      ...initialStateFromProps
    };
  }

  getStateFromInitialPropsValues = props => {
    const state = {};
    if (props.initialSelectedItemKey) {
      const selectedItem = this.getSelectedOption(
        props.options,
        props.initialSelectedItemKey
      );

      if (!selectedItem) {
        return {};
      }

      state.selectedItem = props.initialSelectedItemKey;

      if (!selectedItem.isManual) {
        return state;
      }

      if (props.initialFromDate) {
        state.from = props.initialFromDate;
        state.fromInputValue = this.mapDateToInputValue(props.initialFromDate);
      }
      if (props.initialToDate) {
        state.to = props.initialToDate;
        state.enteredTo = props.initialToDate;
        state.toInputValue = this.mapDateToInputValue(props.initialToDate);
      }
    }
    return state;
  };

  getSelectOptions = memoizeOne(options =>
    options.map(option => ({
      key: option.id,
      props: {
        label: option.label,
        value: option.id,
        isManual: option.isManual || false
      }
    }))
  );

  getSelectedOption = memoizeOne((options, itemId) =>
    options.find(item => item.id === itemId)
  );

  getTodayDate = () => new Date(new Date().setHours(0, 0, 0, 0));

  getItemBody = props => <div id={props.value}>{props.label}</div>;

  getSelectedItemBody = props => {
    if (props.isManual) {
      return (
        <DatePickerRangeSelectItem
          from={{
            onChange: this.handleDateFromChange,
            value: this.state.fromInputValue,
            ref: this.fromInputRef
          }}
          to={{
            onChange: this.handleDateToChange,
            value: this.state.toInputValue,
            onFocus: this.handleDateToInputFocus
          }}
        />
      );
    }
    return <div id={props.value}>{props.label}</div>;
  };

  mapDateToInputValue = date => format(date, 'YYYY-MM-DD');

  handleDayClick = day => {
    const { from, to } = this.state;
    if (!isDateWithinRange(day, { to: this.getTodayDate() })) {
      return;
    }

    if (this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        from: day,
        to: null,
        fromInputValue: this.mapDateToInputValue(day),
        enteredTo: null
      });
    } else if (
      isSameDay(day, this.state.from) ||
      isAfter(day, this.state.from)
    ) {
      this.setState(
        {
          to: day,
          toInputValue: this.mapDateToInputValue(day),
          enteredTo: day
        },
        () => {
          const selectedOption = this.getSelectedOption(
            this.props.options,
            this.state.selectedItem
          );

          this.props.onChange({
            ...selectedOption,
            value: {
              from: this.state.from,
              to: this.state.to
            }
          });
        }
      );
    }
  };

  handleItemSelect = itemKey => {
    if (itemKey === null) {
      this.setState({ ...initialState }, () => {
        this.props.onChange(null);
      });
    } else {
      const selectedOption = this.getSelectedOption(
        this.props.options,
        itemKey
      );

      if (selectedOption === undefined) {
        return;
      }

      this.setState({ selectedItem: itemKey }, () => {
        if (!selectedOption.isManual) {
          const optionsHash = this.props.options.reduce(
            (acc, option) => ({ ...acc, [option.id]: option }),
            {}
          );
          this.props.onChange(optionsHash[itemKey]);
        } else {
          this.props.onChange({
            ...selectedOption,
            value: {
              from: this.state.from,
              to: this.state.to
            }
          });
        }
      });
    }
  };

  handleDateFromChange = e => {
    const { value } = e.target;

    const newState = {
      fromInputValue: value,
      error: null,
      from: undefined,
      to: undefined,
      toInputValue: '',
      enteredTo: null
    };

    if (!isValidDateFormat(value)) {
      return this.setState({
        ...newState,
        error: 'Not valid date'
      });
    }

    if (!isDateWithinRange(new Date(value), { to: new Date() })) {
      return this.setState({
        ...newState,
        error: 'Date outside'
      });
    }

    if (this.state.to === undefined) {
      return this.setState(
        {
          ...newState,
          error: 'Select second date',
          from: new Date(value)
        },
        () => {
          this.datePickerFromRef.current.showMonth(this.state.from);
        }
      );
    }

    return this.setState(
      {
        ...newState,
        from: new Date(value)
      },
      () => {
        this.datePickerFromRef.current.showMonth(this.state.from);
        this.props.onChange({
          from: this.state.from,
          to: this.state.to
        });
      }
    );
  };

  handleDateToChange = e => {
    const { value } = e.target;

    const newState = {
      error: null,
      to: undefined,
      toInputValue: value,
      enteredTo: null
    };

    if (!isValidDateFormat(value)) {
      return this.setState({
        ...newState,
        error: 'Not valid date'
      });
    }

    if (!isDateWithinRange(new Date(value), { to: new Date() })) {
      return this.setState({
        ...newState,
        error: 'Date outside'
      });
    }

    if (this.state.from === undefined) {
      return this.setState(
        {
          ...newState,
          error: 'Select second date',
          to: new Date(value),
          enteredTo: new Date(value)
        },
        () => {
          this.datePickerToRef.current.showMonth(this.state.to);
        }
      );
    }

    return this.setState(
      {
        ...newState,
        to: new Date(value),
        enteredTo: new Date(value)
      },
      () => {
        this.datePickerToRef.current.showMonth(this.state.to);
        this.props.onChange({
          from: this.state.from,
          to: this.state.to
        });
      }
    );
  };

  handleDateToInputFocus = () => {
    if (this.state.from === undefined && this.fromInputRef.current) {
      this.fromInputRef.current.focus();
    }
  };

  handleDayMouseEnter = day => {
    const { from, to } = this.state;
    if (!this.isSelectingFirstDay(from, to, day) && !isFuture(day)) {
      this.setState({
        enteredTo: day
      });
    }
  };

  isSelectingFirstDay = (from, to, day) => {
    const isBeforeFirstDay = from && DateUtils.isDayBefore(day, from);
    const isRangeSelected = from && to;
    return !from || isBeforeFirstDay || isRangeSelected;
  };

  datePickerFromRef = React.createRef();
  datePickerToRef = React.createRef();
  toInputRef = React.createRef();
  fromInputRef = React.createRef();

  render() {
    const modifiers = {
      [styles['date-picker__day--start']]: this.state.from,
      [styles['date-picker__day--end']]: this.state.enteredTo,
      [styles['date-picker__day--monday']]: { daysOfWeek: [1] },
      [styles['date-picker__day--sunday']]: { daysOfWeek: [0] }
    };

    const selectedOption = this.getSelectedOption(
      this.props.options,
      this.state.selectedItem
    );

    return (
      <div>
        <SelectField
          id="date-select"
          items={this.getSelectOptions(this.props.options)}
          searchProperty="label"
          onItemSelect={this.handleItemSelect}
          getItemBody={this.getItemBody}
          search
          error={this.state.error}
          selectedItemRenderer={selectedItemProps =>
            this.getSelectedItemBody(selectedItemProps)
          }
          placeholder="Select option"
          getSelectedItemBody={this.getSelectedItemBody}
          selected={this.state.selectedItem}
          searchPlaceholder="Search..."
        />
        {selectedOption &&
          selectedOption.isManual && (
            <DatePickerRangeCalendarsWrapper>
              <DatePicker
                ref={this.datePickerFromRef}
                onDayClick={this.handleDayClick}
                selectedDays={[
                  this.state.from,
                  { from: this.state.from, to: this.state.enteredTo }
                ]}
                modifiers={modifiers}
                initialMonth={
                  this.state.from || subMonths(this.getTodayDate(), 1)
                }
                toMonth={this.getTodayDate()}
                disabledDays={{ after: this.getTodayDate() }}
                onDayMouseEnter={this.handleDayMouseEnter}
              />
              <DatePicker
                ref={this.datePickerToRef}
                onDayClick={this.handleDayClick}
                selectedDays={[
                  this.state.from,
                  { from: this.state.from, to: this.state.enteredTo }
                ]}
                initialMonth={this.state.to}
                modifiers={modifiers}
                toMonth={this.getTodayDate()}
                disabledDays={{ after: this.getTodayDate() }}
                onDayMouseEnter={this.handleDayMouseEnter}
              />
            </DatePickerRangeCalendarsWrapper>
          )}
      </div>
    );
  }
}

SelectDatePicker.propTypes = {
  onChange: PropTypes.func,
  options: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      id: PropTypes.string.isRequired,
      isManual: PropTypes.bool,
      value: PropTypes.shape({
        from: PropTypes.instanceOf(Date),
        to: PropTypes.instanceOf(Date)
      })
    })
  ).isRequired,
  initialSelectedItemKey: PropTypes.string,
  initialFromDate: PropTypes.instanceOf(Date),
  initialToDate: PropTypes.instanceOf(Date)
};

export default SelectDatePicker;
