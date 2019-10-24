import * as React from 'react';
import * as PropTypes from 'prop-types';
import {
  format,
  isAfter,
  isSameDay,
  subMonths,
  isSameMonth,
  differenceInCalendarDays
} from 'date-fns';
import memoizeOne from 'memoize-one';
import styles from './style.scss';
import { isValidDateFormat, isDateWithinRange } from './helpers';
import { KeyCodes } from '../../constants/keyCodes';

class RangeDatePicker extends React.Component {
  constructor(props) {
    super(props);

    this.initialState = {
      selectedItem: null,
      fromInputValue: '',
      toInputValue: '',
      from: undefined,
      to: undefined,
      error: null,
      enteredTo: undefined,
      currentMonth: props.initialToDate
        ? this.calculateDatepickerMonth(
            props.initialToDate,
            props.initialFromDate &&
              !isSameMonth(props.initialFromDate, props.initialToDate)
          )
        : subMonths(props.toMonth, 1)
    };

    const initialStateFromProps = this.getStateFromInitialPropsValues(props);

    this.state = {
      ...this.initialState,
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

  getModifiers = memoizeOne((from, enteredTo) => {
    const base = {
      [styles['date-picker__day--monday']]: { daysOfWeek: [1] },
      [styles['date-picker__day--sunday']]: { daysOfWeek: [0] },
      [styles['date-picker__day--start']]: from,
      [styles['date-picker__day--end']]: from
    };

    if (enteredTo) {
      const diff = differenceInCalendarDays(enteredTo, from);
      if (diff > 0) {
        return {
          ...base,
          [styles['date-picker__day--end']]: enteredTo
        };
      } else if (diff < 0) {
        return {
          ...base,
          [styles['date-picker__day--start']]: enteredTo
        };
      }
      return {
        ...base,
        [styles['date-picker__day--start']]: [from, enteredTo],
        [styles['date-picker__day--end']]: [from, enteredTo]
      };
    }

    return base;
  });

  getRangeDatePickerApi = () => {
    const modifiers = this.getModifiers(this.state.from, this.state.enteredTo);

    const selectedOption = this.getSelectedOption(
      this.props.options,
      this.state.selectedItem
    );

    return {
      select: {
        onItemSelect: this.handleItemSelect,
        error: this.state.error,
        selected: this.state.selectedItem
      },
      inputs: {
        fromDate: this.state.from,
        toDate: this.state.to,
        from: {
          onKeyDown: this.handleFromInputKeyDown,
          onChange: this.handleDateFromChange,
          value: this.state.fromInputValue,
          ref: this.fromInputRef
        },
        to: {
          onKeyDown: this.handleToInputKeyDown,
          onChange: this.handleDateToChange,
          value: this.state.toInputValue,
          ref: this.toInputRef
        }
      },
      datepicker: {
        range: true,
        month: this.state.currentMonth,
        numberOfMonths: 2,
        onDayClick: this.handleDayClick,
        selectedDays: [
          this.state.from,
          { from: this.state.from, to: this.state.enteredTo }
        ],
        modifiers,
        initialMonth: this.state.from || subMonths(this.props.toMonth, 1),
        toMonth: this.props.toMonth,
        disabledDays: { after: this.props.toMonth },
        onDayMouseEnter: this.handleDayMouseEnter,
        onMonthChange: this.handleMonthChange
      },
      selectedOption
    };
  };

  mapDateToInputValue = date => format(date, 'YYYY-MM-DD');

  handleMonthChange = month => {
    this.setState({
      currentMonth: month
    });
  };

  handleDayClick = day => {
    const { from, to } = this.state;
    if (!isDateWithinRange(day, { to: this.props.toMonth })) {
      return;
    }

    if (this.isSelectingFirstDay(from, to, day)) {
      this.handleSelectFirstDay(day);
    } else if (
      isSameDay(day, this.state.from) ||
      isAfter(day, this.state.from)
    ) {
      this.handleSelectSecondDayAsFrom(day);
    } else {
      this.handleSelectSecondDayAsTo(day);
    }
  };

  handleSelectFirstDay = day => {
    this.setState(
      {
        from: day,
        to: undefined,
        fromInputValue: this.mapDateToInputValue(day),
        toInputValue: '',
        enteredTo: undefined,
        error: null
      },
      () => {
        if (this.toInputRef.current) {
          this.toInputRef.current.focus();
        }
      }
    );
  };

  handleSelectSecondDayAsFrom = day => {
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
  };

  handleSelectSecondDayAsTo = day => {
    this.setState(
      {
        from: day,
        to: this.state.from,
        fromInputValue: this.mapDateToInputValue(day),
        toInputValue: this.state.fromInputValue,
        enteredTo: this.state.from,
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
  };

  handleItemSelect = itemKey => {
    if (itemKey === null) {
      this.setState({ ...this.initialState }, () => {
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

      this.setState(
        {
          ...this.initialState,
          selectedItem: itemKey
        },
        () => {
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

    if (!isDateWithinRange(new Date(value), { to: this.props.toMonth })) {
      return this.setState({
        ...newState,
        error: `The date can't be later than ${format(
          this.props.toMonth,
          'YYYY-MM-DD'
        )}`
      });
    }

    if (this.state.to === undefined) {
      return this.setState({
        ...newState,
        error: 'Please choose the end date',
        from: new Date(value),
        currentMonth: this.calculateDatepickerMonth(new Date(value))
      });
    }

    return this.setState(
      {
        ...newState,
        from: new Date(value),
        currentMonth: this.calculateDatepickerMonth(new Date(value))
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
      this.props.toMonth &&
      !isDateWithinRange(new Date(value), {
        to: this.props.toMonth
      })
    ) {
      return this.setState({
        ...newState,
        error: `The date can't be later than ${format(
          this.props.toMonth,
          'YYYY-MM-DD'
        )}`
      });
    }

    if (
      !isDateWithinRange(new Date(value), {
        from: this.state.from
      })
    ) {
      return this.setState({
        ...newState,
        error: "The end date can't be before the start date"
      });
    }

    if (this.state.from === undefined) {
      return this.setState({
        ...newState,
        error: 'Please choose the start date',
        to: new Date(value),
        enteredTo: new Date(value),
        currentMonth: this.calculateDatepickerMonth(
          new Date(value),
          !isSameMonth(new Date(value), this.state.from)
        )
      });
    }

    return this.setState(
      {
        ...newState,
        to: new Date(value),
        enteredTo: new Date(value),
        currentMonth: this.calculateDatepickerMonth(
          new Date(value),
          !isSameMonth(new Date(value), this.state.from)
        )
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
  };

  handleDayMouseEnter = day => {
    const { from, to } = this.state;

    const isInRange = this.props.toMonth
      ? differenceInCalendarDays(this.props.toMonth, day) >= 0
      : true;

    if (!this.isSelectingFirstDay(from, to, day) && isInRange) {
      this.setState({
        enteredTo: day
      });
    }
  };

  handleFromInputKeyDown = e => {
    if (e.keyCode === KeyCodes.enter) {
      e.stopPropagation();
      const isValid =
        this.state.from &&
        isDateWithinRange(this.state.from, {
          to: this.props.toMonth
        });

      if (isValid && this.toInputRef.current) {
        this.toInputRef.current.focus();
      }
    }
  };

  handleToInputKeyDown = e => {
    if (e.keyCode === KeyCodes.enter) {
      e.stopPropagation();
      const isValid =
        this.state.to &&
        isDateWithinRange(this.state.to, {
          from: this.state.from,
          to: this.props.toMonth
        });

      if (isValid && this.toInputRef.current) {
        this.toInputRef.current.blur();
      }
    }
  };

  isSelectingFirstDay = (from, to) => {
    const isRangeSelected = from && to;
    return !from || isRangeSelected;
  };

  calculateDatepickerMonth = (date, forcePreviousMonth = false) => {
    if (
      forcePreviousMonth ||
      (this.props.toMonth && isSameMonth(date, this.props.toMonth))
    ) {
      return subMonths(date, 1);
    }
    return date;
  };

  toInputRef = React.createRef();
  fromInputRef = React.createRef();

  render() {
    return this.props.children(this.getRangeDatePickerApi());
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
