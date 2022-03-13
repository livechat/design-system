import * as React from 'react';
import {
  isAfter,
  isSameDay,
  subMonths,
  differenceInCalendarDays,
} from 'date-fns';
import {
  getRangeDatePickerModifiers,
  getSelectedOption,
  isDateWithinRange,
  isSelectingFirstDay,
} from './helpers';

import { useRangeDatePickerState } from './hooks';
import {
  IRangeDatePickerChildrenPayload,
  IRangeDatePickerOption,
  IRangeDatePickerProps,
  RangeDatePickerAction,
} from './types';

export const RangeDatePicker = (
  props: IRangeDatePickerProps
): React.ReactElement => {
  const prevSelectedItem = React.useRef<string | null>(
    props.initialSelectedItemKey || null
  );
  const [state, dispatch] = useRangeDatePickerState(props);

  React.useEffect(() => {
    const { from, selectedItem, to } = state;

    if (from && to) {
      const selectedOption = getSelectedOption(selectedItem, props.options);

      if (selectedOption) {
        console.log(to, from);
        props.onChange({
          ...selectedOption,
          value: {
            from: from,
            to: to,
          },
        });
      }
    }
  }, [state.from, state.to, state.selectedItem, props.options, props.onChange]);

  React.useEffect(() => {
    const { selectedItem } = state;

    // nothing changed
    if (selectedItem === prevSelectedItem.current) {
      return;
    }

    if (!selectedItem) {
      props.onChange(null);
      return;
    }

    const selectedOption = getSelectedOption(selectedItem, props.options);

    if (!selectedOption) {
      return;
    }

    const optionsHash = props.options.reduce(
      (
        acc: { [key: string]: IRangeDatePickerOption },
        option: IRangeDatePickerOption
      ) => ({ ...acc, [option.id]: option }),
      {}
    );

    props.onChange(optionsHash[selectedItem]);
  }, [props.onChange, state.selectedItem, props.options]);

  const handleDayMouseEnter = (day: Date) => {
    const isInRange = props.toMonth
      ? differenceInCalendarDays(props.toMonth, day) >= 0
      : true;

    if (!isSelectingFirstDay(state.from, state.to) && isInRange) {
      dispatch({
        type: RangeDatePickerAction.NEW_TEMPORARY_TO_VALUE,
        payload: { date: day },
      });
    }
  };

  const handleDayClick = (day: Date) => {
    const { from, to } = state;

    if (!isDateWithinRange(day, { to: props.toMonth })) {
      return;
    }

    if (isSelectingFirstDay(from, to)) {
      dispatch({
        type: RangeDatePickerAction.SELECT_FIRST_DAY,
        payload: { date: day },
      });
    } else if ((from && isSameDay(day, from)) || (from && isAfter(day, from))) {
      dispatch({
        type: RangeDatePickerAction.SELECT_SECOND_DAY_AS_TO,
        payload: { date: day },
      });
    } else {
      dispatch({
        type: RangeDatePickerAction.SELECT_SECOND_DAY_AS_FROM,
        payload: { date: day },
      });
    }
  };

  const handleItemSelect = (itemKey: string) => {
    if (itemKey === null) {
      dispatch({
        type: RangeDatePickerAction.NEW_SELECTED_ITEM,
        payload: { selectedItem: null },
      });
      return;
    }

    const selectedOption = getSelectedOption(itemKey, props.options);

    if (!selectedOption) {
      return;
    }

    dispatch({
      type: RangeDatePickerAction.NEW_SELECTED_ITEM,
      payload: { selectedItem: itemKey },
    });
  };

  const handleMonthChange = (date: Date) => {
    dispatch({
      type: RangeDatePickerAction.CURRENT_MONTH_CHANGE,
      payload: { date },
    });
  };

  const getRangeDatePickerApi = (): IRangeDatePickerChildrenPayload => {
    const { currentMonth, from, selectedItem, temporaryTo, to } = state;
    const modifiers = React.useMemo(
      () => getRangeDatePickerModifiers(from, temporaryTo),
      [from, temporaryTo]
    );
    const selectedOption = React.useMemo(() => {
      // eslint-disable-next-line
      return getSelectedOption(selectedItem, props.options);
    }, [props.options, selectedItem]);

    return {
      select: {
        onItemSelect: handleItemSelect,
        selected: selectedItem || '',
      },
      inputs: {
        fromDate: from,
        toDate: to,
      },
      datepicker: {
        range: true,
        month: currentMonth,
        numberOfMonths: 2,
        onDayClick: handleDayClick,
        selectedDays: [from, { from, to: temporaryTo }],
        modifiers,
        initialMonth: from || (props.toMonth && subMonths(props.toMonth, 1)),
        toMonth: props.toMonth,
        disabledDays: props.toMonth ? { after: props.toMonth } : void 0,
        onDayMouseEnter: handleDayMouseEnter,
        onMonthChange: handleMonthChange,
      },
      selectedOption,
    };
  };

  return props.children(getRangeDatePickerApi());
};

RangeDatePicker.defaultProps = {
  toMonth: new Date(),
  options: [
    {
      id: 'default',
      label: 'Default option',
      isManual: true,
      value: {
        from: void 0,
        to: void 0,
      },
    },
  ],
};

// class RangeDatePicker2 extends React.Component {
//   constructor(props) {
//     super(props);

//     this.initialState = {
//       selectedItem: null,
//       from: undefined,
//       to: undefined,
//       error: null,
//       enteredTo: undefined,
//       currentMonth: props.initialToDate
//         ? this.calculateDatepickerMonth(
//             props.initialToDate,
//             props.initialFromDate &&
//               !isSameMonth(props.initialFromDate, props.initialToDate)
//           )
//         : subMonths(props.toMonth, 1)
//     };

//     const initialStateFromProps = this.getStateFromInitialPropsValues(props);

//     this.state = {
//       ...this.initialState,
//       ...initialStateFromProps
//     };
//   }

//   getStateFromInitialPropsValues = props => {
//     const state = {};

//     if (props.initialSelectedItemKey) {
//       const selectedItem = this.getSelectedOption(
//         props.options,
//         props.initialSelectedItemKey
//       );

//       if (!selectedItem) {
//         return {};
//       }

//       state.selectedItem = props.initialSelectedItemKey;

//       if (!selectedItem.isManual) {
//         return state;
//       }

//       if (props.initialFromDate) {
//         state.from = props.initialFromDate;
//       }
//       if (props.initialToDate) {
//         state.to = props.initialToDate;
//         state.enteredTo = props.initialToDate;
//       }
//     }
//     return state;
//   };

//   getSelectedOption = memoizeOne((options, itemId) =>
//     options.find(item => item.id === itemId)
//   );

//   getModifiers = memoizeOne((from, enteredTo) => {
//     const base = {
//       [styles['date-picker__day--monday']]: { daysOfWeek: [1] },
//       [styles['date-picker__day--sunday']]: { daysOfWeek: [0] },
//       [styles['date-picker__day--start']]: from,
//       [styles['date-picker__day--end']]: from
//     };

//     if (enteredTo) {
//       const diff = differenceInCalendarDays(enteredTo, from);
//       if (diff > 0) {
//         return {
//           ...base,
//           [styles['date-picker__day--end']]: enteredTo
//         };
//       } else if (diff < 0) {
//         return {
//           ...base,
//           [styles['date-picker__day--start']]: enteredTo
//         };
//       }
//       return {
//         ...base,
//         [styles['date-picker__day--start']]: [from, enteredTo],
//         [styles['date-picker__day--end']]: [from, enteredTo]
//       };
//     }

//     return base;
//   });

//   getRangeDatePickerApi = () => {
//     const modifiers = this.getModifiers(this.state.from, this.state.enteredTo);

//     const selectedOption = this.getSelectedOption(
//       this.props.options,
//       this.state.selectedItem
//     );

//     return {
//       select: {
//         onItemSelect: this.handleItemSelect,
//         error: this.state.error,
//         selected: this.state.selectedItem
//       },
//       inputs: {
//         fromDate: this.state.from,
//         toDate: this.state.to,
//       },
//       datepicker: {
//         range: true,
//         month: this.state.currentMonth,
//         numberOfMonths: 2,
//         onDayClick: this.handleDayClick,
//         selectedDays: [
//           this.state.from,
//           { from: this.state.from, to: this.state.enteredTo }
//         ],
//         modifiers,
//         initialMonth: this.state.from || subMonths(this.props.toMonth, 1),
//         toMonth: this.props.toMonth,
//         disabledDays: { after: this.props.toMonth },
//         onDayMouseEnter: this.handleDayMouseEnter,
//         onMonthChange: this.handleMonthChange
//       },
//       selectedOption
//     };
//   };

//   handleMonthChange = month => {
//     this.setState({
//       currentMonth: month
//     });
//   };

//   handleDayClick = day => {
//     const { from, to } = this.state;
//     if (!isDateWithinRange(day, { to: this.props.toMonth })) {
//       return;
//     }

//     if (this.isSelectingFirstDay(from, to, day)) {
//       this.handleSelectFirstDay(day);
//     } else if (
//       isSameDay(day, this.state.from) ||
//       isAfter(day, this.state.from)
//     ) {
//       this.handleSelectSecondDayAsFrom(day);
//     } else {
//       this.handleSelectSecondDayAsTo(day);
//     }
//   };

//   handleSelectFirstDay = day => {
//     this.setState(
//       {
//         from: day,
//         to: undefined,
//         enteredTo: undefined,
//         error: null
//       }
//     );
//   };

//   handleSelectSecondDayAsFrom = day => {
//     this.setState(
//       {
//         to: day,
//         enteredTo: day,
//         error: null
//       },
//       () => {
//         const selectedOption = this.getSelectedOption(
//           this.props.options,
//           this.state.selectedItem
//         );

//         this.props.onChange({
//           ...selectedOption,
//           value: {
//             from: this.state.from,
//             to: this.state.to
//           }
//         });
//       }
//     );
//   };

//   handleSelectSecondDayAsTo = day => {
//     this.setState(
//       {
//         from: day,
//         to: this.state.from,
//         enteredTo: this.state.from,
//         error: null
//       },
//       () => {
//         const selectedOption = this.getSelectedOption(
//           this.props.options,
//           this.state.selectedItem
//         );

//         this.props.onChange({
//           ...selectedOption,
//           value: {
//             from: this.state.from,
//             to: this.state.to
//           }
//         });
//       }
//     );
//   };

//   handleItemSelect = itemKey => {
//     if (itemKey === null) {
//       this.setState({ ...this.initialState }, () => {
//         this.props.onChange(null);
//       });
//     } else {
//       const selectedOption = this.getSelectedOption(
//         this.props.options,
//         itemKey
//       );

//       if (!selectedOption) {
//         return;
//       }

//       this.setState(
//         {
//           ...this.initialState,
//           selectedItem: itemKey
//         },
//         () => {
//           if (!selectedOption.isManual) {
//             const optionsHash = this.props.options.reduce(
//               (acc, option) => ({ ...acc, [option.id]: option }),
//               {}
//             );
//             this.props.onChange(optionsHash[itemKey]);
//           } else {
//             this.props.onChange({
//               ...selectedOption,
//               value: {
//                 from: this.state.from,
//                 to: this.state.to
//               }
//             });
//           }
//         }
//       );
//     }
//   };

//   handleDayMouseEnter = day => {
//     const { from, to } = this.state;

//     const isInRange = this.props.toMonth
//       ? differenceInCalendarDays(this.props.toMonth, day) >= 0
//       : true;

//     if (!this.isSelectingFirstDay(from, to, day) && isInRange) {
//       this.setState({
//         enteredTo: day
//       });
//     }
//   };

//   isSelectingFirstDay = (from, to) => {
//     const isRangeSelected = from && to;
//     return !from || isRangeSelected;
//   };

//   calculateDatepickerMonth = (date, forcePreviousMonth = false) => {
//     if (
//       forcePreviousMonth ||
//       (this.props.toMonth && isSameMonth(date, this.props.toMonth))
//     ) {
//       return subMonths(date, 1);
//     }
//     return date;
//   };

//   render() {
//     return this.props.children(this.getRangeDatePickerApi());
//   }
// }

// RangeDatePicker.propTypes = {
//   onChange: PropTypes.func,
//   children: PropTypes.func,
//   options: PropTypes.arrayOf(
//     PropTypes.shape({
//       label: PropTypes.string.isRequired,
//       id: PropTypes.string.isRequired,
//       isManual: PropTypes.bool,
//       value: PropTypes.shape({
//         from: PropTypes.instanceOf(Date),
//         to: PropTypes.instanceOf(Date)
//       })
//     })
//   ).isRequired,
//   initialSelectedItemKey: PropTypes.string,
//   initialFromDate: PropTypes.instanceOf(Date),
//   initialToDate: PropTypes.instanceOf(Date),
//   toMonth: PropTypes.instanceOf(Date)
// };

// RangeDatePicker2.defaultProps = {
//   toMonth: new Date()
// };
