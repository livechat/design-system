import * as React from 'react';
import * as PropTypes from 'prop-types';
import { format, isFuture, isAfter, isSameDay, subMonths } from 'date-fns';
import { DateUtils } from 'react-day-picker';
import memoizeOne from 'memoize-one';
import styles from './style.scss';
import { isValidDateFormat, isDateWithinRange } from './helpers';

const initialState = {
  selectedItem: null,
  fromInputValue: '',
  toInputValue: '',
  from: undefined,
  to: undefined,
  error: null,
  enteredTo: undefined
};

class RangeDatePicker extends React.Component {
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

  getSelectedOption = memoizeOne((options, itemId) =>
    options.find(item => item.id === itemId)
  );

  getRangeDatePickerApi = memoizeOne((props, state) => {
    const modifiers = {
      [styles['date-picker__day--start']]: state.from,
      [styles['date-picker__day--end']]: state.enteredTo,
      [styles['date-picker__day--monday']]: { daysOfWeek: [1] },
      [styles['date-picker__day--sunday']]: { daysOfWeek: [0] }
    };

    const selectedOption = this.getSelectedOption(
      props.options,
      state.selectedItem
    );

    return {
      select: {
        onItemSelect: this.handleItemSelect,
        error: this.state.error,
        selected: this.state.selectedItem
      },
      inputs: {
        from: {
          onChange: this.handleDateFromChange,
          value: state.fromInputValue,
          ref: this.fromInputRef,
          fromDate: state.from,
          toDate: state.to
        },
        to: {
          onChange: this.handleDateToChange,
          value: state.toInputValue,
          onFocus: this.handleDateToInputFocus,
          fromDate: state.from,
          toDate: state.to
        }
      },
      datepicker: {
        innerRef: this.datePickerRef,
        numberOfMonths: 2,
        onDayClick: this.handleDayClick,
        selectedDays: [state.from, { from: state.from, to: state.enteredTo }],
        modifiers,
        initialMonth: state.from || subMonths(new Date(), 1),
        toMonth: props.toMonth,
        disabledDays: { after: props.toMonth },
        onDayMouseEnter: this.handleDayMouseEnter
      },
      selectedOption
    };
  });

  mapDateToInputValue = date => format(date, 'YYYY-MM-DD');

  handleDayClick = day => {
    const { from, to } = this.state;
    if (!isDateWithinRange(day, { to: this.props.toMonth })) {
      return;
    }

    if (this.isSelectingFirstDay(from, to, day)) {
      this.setState({
        from: day,
        to: undefined,
        fromInputValue: this.mapDateToInputValue(day),
        enteredTo: undefined,
        error: null
      });
    } else if (
      isSameDay(day, this.state.from) ||
      isAfter(day, this.state.from)
    ) {
      this.setState(
        {
          to: day,
          toInputValue: this.mapDateToInputValue(day),
          enteredTo: day,
          error: null
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

      if (!selectedOption) {
        return;
      }

      const optionsHash = this.props.options.reduce(
        (acc, option) => ({ ...acc, [option.id]: option }),
        {}
      );

      this.setState(
        {
          ...initialState,
          selectedItem: itemKey
        },
        () => {
          if (!selectedOption.isManual) {
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
        }
      );
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
      enteredTo: undefined
    };

    if (!/^[0-9.-]*$/.test(value)) {
      return false;
    }

    if (!isValidDateFormat(value)) {
      return this.setState({
        ...newState,
        error: 'Invalid date format'
      });
    }

    if (!isDateWithinRange(new Date(value), { to: new Date() })) {
      return this.setState({
        ...newState,
        error: "The start date can't be later than today"
      });
    }

    if (this.state.to === undefined) {
      return this.setState(
        {
          ...newState,
          error: 'Please choose the end date',
          from: new Date(value)
        },
        () => {
          this.datePickerRef.current.showMonth(this.state.from);
        }
      );
    }

    return this.setState(
      {
        ...newState,
        from: new Date(value)
      },
      () => {
        this.datePickerRef.current.showMonth(this.state.from);
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
  };

  handleDateToChange = e => {
    const { value } = e.target;

    const newState = {
      error: null,
      to: undefined,
      toInputValue: value,
      enteredTo: undefined
    };

    if (!/^[0-9.-]*$/.test(value)) {
      return false;
    }

    if (!isValidDateFormat(value)) {
      return this.setState({
        ...newState,
        error: 'Invalid date format'
      });
    }

    if (
      !isDateWithinRange(new Date(value), {
        to: new Date(),
        from: this.state.from
      })
    ) {
      return this.setState({
        ...newState,
        error: "The end date can't be before the start date"
      });
    }

    if (this.state.from === undefined) {
      return this.setState(
        {
          ...newState,
          error: 'Please choose the start date',
          to: new Date(value),
          enteredTo: new Date(value)
        },
        () => {
          this.datePickerRef.current.showMonth(this.state.to);
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
        this.datePickerRef.current.showMonth(this.state.to);
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

  datePickerRef = React.createRef();
  toInputRef = React.createRef();
  fromInputRef = React.createRef();

  render() {
    return this.props.children(
      this.getRangeDatePickerApi(this.props, this.state)
    );
  }
}

RangeDatePicker.propTypes = {
  onChange: PropTypes.func,
  children: PropTypes.func,
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
  initialToDate: PropTypes.instanceOf(Date),
  toMonth: PropTypes.instanceOf(Date)
};

RangeDatePicker.defaultProps = {
  toMonth: new Date()
};

export default RangeDatePicker;
