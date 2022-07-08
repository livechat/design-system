import * as React from 'react';
import {
  isAfter,
  isSameDay,
  subMonths,
  differenceInCalendarDays,
} from 'date-fns';
import {
  calculateDatePickerMonth,
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

  // handle initialFromDate change
  React.useEffect(() => {
    dispatch({
      type: RangeDatePickerAction.SET_FROM,
      payload: { date: props.initialFromDate },
    });
  }, [props.initialFromDate]);

  // handle initialToDate change
  React.useEffect(() => {
    dispatch({
      type: RangeDatePickerAction.SET_TO,
      payload: { date: props.initialToDate },
    });
  }, [props.initialToDate]);

  // handle showing correct month on dates in props change
  React.useEffect(() => {
    const currentMonth = calculateDatePickerMonth(
      props.initialFromDate,
      props.initialToDate,
      props.toMonth
    );

    dispatch({
      type: RangeDatePickerAction.CURRENT_MONTH_CHANGE,
      payload: { date: currentMonth },
    });
  }, [props.toMonth, props.initialFromDate, props.initialToDate]);

  // call onChange when valid dates selected (for manual options - with date picker)
  React.useEffect(() => {
    const { from, selectedItem, to } = state;

    if (from && to) {
      const selectedOption = getSelectedOption(selectedItem, props.options);

      if (selectedOption) {
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

  // handle selected option change
  React.useEffect(() => {
    const { selectedItem } = state;

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

  const handleDayMouseEnter = React.useCallback(
    (day: Date) => {
      const isInRange = props.toMonth
        ? differenceInCalendarDays(props.toMonth, day) >= 0
        : true;

      if (!isSelectingFirstDay(state.from, state.to) && isInRange) {
        dispatch({
          type: RangeDatePickerAction.NEW_TEMPORARY_TO_VALUE,
          payload: { date: day },
        });
      }
    },
    [props.toMonth, state.from, state.to]
  );

  const handleDayClick = React.useCallback(
    (day: Date) => {
      const { from, to } = state;

      if (!isDateWithinRange(day, { to: props.toMonth })) {
        return;
      }

      if (isSelectingFirstDay(from, to)) {
        dispatch({
          type: RangeDatePickerAction.SELECT_FIRST_DAY,
          payload: { date: day },
        });
      } else if (
        (from && isSameDay(day, from)) ||
        (from && isAfter(day, from))
      ) {
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
    },
    [props.toMonth, state.from, state.to]
  );

  const handleItemSelect = React.useCallback(
    (itemKey: string) => {
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
    },
    [props.options]
  );

  const handleMonthChange = React.useCallback((date: Date) => {
    dispatch({
      type: RangeDatePickerAction.CURRENT_MONTH_CHANGE,
      payload: { date },
    });
  }, []);

  const getRangeDatePickerApi = (): IRangeDatePickerChildrenPayload => {
    const { currentMonth, from, selectedItem, temporaryTo, to } = state;
    const modifiers = React.useMemo(
      () => getRangeDatePickerModifiers(from, temporaryTo),
      [from, temporaryTo]
    );
    const selectedOption = React.useMemo(() => {
      return getSelectedOption(selectedItem, props.options);
    }, [props.options, selectedItem]);

    const selectedDays = React.useMemo(() => {
      return [from, { from, to: temporaryTo }];
    }, [from, temporaryTo]);

    const disabledDays = React.useMemo(() => {
      return props.toMonth ? { after: props.toMonth } : void 0;
    }, [props.toMonth]);

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
        selectedDays,
        modifiers,
        initialMonth: props.toMonth && subMonths(props.toMonth, 1),
        toMonth: props.toMonth,
        disabledDays,
        onDayMouseEnter: handleDayMouseEnter,
        onMonthChange: handleMonthChange,
      },
      selectedOption,
    };
  };

  return props.children(getRangeDatePickerApi());
};

RangeDatePicker.defaultProps = {
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
