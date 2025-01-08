import { ReactElement, useCallback, useEffect, useMemo, useRef } from 'react';

import {
  isAfter,
  isSameDay,
  differenceInCalendarDays,
  isBefore,
} from 'date-fns';

import {
  calculateDatePickerMonth,
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

export const RangeDatePicker = ({
  options,
  initialSelectedItemKey,
  initialFromDate,
  initialToDate,
  customTempFromDate,
  customTempToDate,
  toMonth,
  onChange,
  onRangeSelect,
  onSelect,
  onCustomTempDateRangeChange,
  children,
}: IRangeDatePickerProps): ReactElement => {
  const prevSelectedItem = useRef<string | null>(
    initialSelectedItemKey || null
  );
  const [state, dispatch] = useRangeDatePickerState({
    initialFromDate,
    initialToDate,
    toMonth,
    options,
    initialSelectedItemKey,
    customTempFromDate,
    customTempToDate,
    children,
    onChange,
    onRangeSelect,
  } as IRangeDatePickerProps);

  // handle custom temp date range change (range date picker v2)
  useEffect(() => {
    dispatch({
      type: RangeDatePickerAction.SET_CUSTOM_TEMP_RANGE,
      payload: {
        customTempFrom: customTempFromDate,
        customTempTo: customTempToDate,
      },
    });
  }, [customTempFromDate, customTempToDate]);

  // handle initialFromDate change
  useEffect(() => {
    dispatch({
      type: RangeDatePickerAction.SET_FROM,
      payload: { date: initialFromDate },
    });
  }, [initialFromDate]);

  // handle initialToDate change
  useEffect(() => {
    dispatch({
      type: RangeDatePickerAction.SET_TO,
      payload: { date: initialToDate },
    });
  }, [initialToDate]);

  // handle showing correct month on dates in props change
  useEffect(() => {
    const currentMonth = calculateDatePickerMonth(
      initialFromDate,
      initialToDate,
      toMonth
    );

    dispatch({
      type: RangeDatePickerAction.CURRENT_MONTH_CHANGE,
      payload: { date: currentMonth },
    });
  }, [toMonth, initialFromDate, initialToDate]);

  // call onChange when valid dates selected (for manual options - with date picker)
  useEffect(() => {
    const { from, selectedItem, to } = state;
    if (!(from && to)) {
      return;
    }

    const selectedOption = getSelectedOption(selectedItem, options);

    if (!selectedOption) return;

    onChange?.({
      ...selectedOption,
      value: {
        from: from,
        to: to,
      },
    });
  }, [state.from, state.to, state.selectedItem, options, onChange]);

  // call onRangeSelect when valid dates selected in new date range picker v2
  useEffect(() => {
    const { from, to } = state;
    if (!(from && to) || !onRangeSelect) {
      return;
    }

    onRangeSelect?.({
      from: from,
      to: to,
    });
  }, [state.from, state.to, onRangeSelect]);

  // handle selected option change
  useEffect(() => {
    const { selectedItem } = state;

    if (selectedItem === prevSelectedItem.current || !options) {
      return;
    }

    if (!selectedItem) {
      onChange?.(null);

      return;
    }

    const selectedOption = getSelectedOption(selectedItem, options);

    if (!selectedOption) {
      return;
    }

    const optionsHash = options.reduce(
      (
        acc: { [key: string]: IRangeDatePickerOption },
        option: IRangeDatePickerOption
      ) => ({ ...acc, [option.id]: option }),
      {}
    );

    onChange?.(optionsHash[selectedItem]);
  }, [onChange, state.selectedItem, options]);

  useEffect(() => {
    onCustomTempDateRangeChange?.({
      from: state.temporaryFrom,
      to: state.temporaryTo,
    });
  }, [state.temporaryFrom, state.temporaryTo]);

  const handleOnSelect = useCallback(() => {
    const { from, to } = state;

    if (from && to && onSelect) {
      onSelect({
        from,
        to,
      });
    }
  }, [onSelect]);

  const handleDayMouseEnter = useCallback(
    (day: Date) => {
      const { from, to } = state;
      const isInRange = toMonth
        ? differenceInCalendarDays(toMonth, day) >= 0
        : true;

      if (!isSelectingFirstDay(from, to) && isInRange) {
        if (from && isBefore(day, from)) {
          dispatch({
            type: RangeDatePickerAction.NEW_TEMPORARY_FROM_VALUE,
            payload: { date: day },
          });
          dispatch({
            type: RangeDatePickerAction.NEW_TEMPORARY_TO_VALUE,
            payload: { date: from },
          });
        } else {
          dispatch({
            type: RangeDatePickerAction.NEW_TEMPORARY_TO_VALUE,
            payload: { date: day },
          });
        }
      }
    },
    [toMonth, state.from, state.to]
  );

  const handleDayClick = useCallback(
    (day: Date) => {
      const { from, to } = state;

      if (!isDateWithinRange(day, { to: toMonth })) {
        return;
      }

      if (isSelectingFirstDay(from, to)) {
        dispatch({
          type: RangeDatePickerAction.SELECT_FIRST_DAY,
          payload: { date: day },
        });
        dispatch({
          type: RangeDatePickerAction.NEW_TEMPORARY_FROM_VALUE,
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
    [toMonth, state.from, state.to]
  );

  const handleItemSelect = useCallback(
    (itemKey: string) => {
      if (itemKey === null) {
        dispatch({
          type: RangeDatePickerAction.NEW_SELECTED_ITEM,
          payload: { selectedItem: null },
        });

        return;
      }

      const selectedOption = getSelectedOption(itemKey, options);

      if (!selectedOption) {
        return;
      }

      dispatch({
        type: RangeDatePickerAction.NEW_SELECTED_ITEM,
        payload: { selectedItem: itemKey },
      });
    },
    [options]
  );

  const handleMonthChange = useCallback((date: Date) => {
    dispatch({
      type: RangeDatePickerAction.CURRENT_MONTH_CHANGE,
      payload: { date },
    });
  }, []);

  const getRangeDatePickerApi = (): IRangeDatePickerChildrenPayload => {
    const {
      currentMonth,
      from,
      selectedItem,
      temporaryFrom,
      temporaryTo,
      to,
      customTempFrom,
      customTempTo,
    } = state;
    const selectedOption = useMemo(() => {
      return getSelectedOption(selectedItem, options);
    }, [options, selectedItem]);

    const selectedDays = useMemo(() => {
      return { from: temporaryFrom || from, to: temporaryTo };
    }, [from, temporaryFrom, temporaryTo]);

    const customSelectedDays = useMemo(() => {
      if (!customTempFrom || !customTempTo) {
        return undefined;
      }

      return { from: customTempFrom, to: customTempTo };
    }, [customTempFrom, customTempTo]);

    const disabledDays = useMemo(() => {
      return toMonth ? { after: toMonth } : void 0;
    }, [toMonth]);

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
        mode: 'range',
        month: currentMonth,
        numberOfMonths: 2,
        onDayClick: handleDayClick,
        selected: customSelectedDays || selectedDays,
        endMonth: toMonth,
        disabled: disabledDays,
        onDayMouseEnter: handleDayMouseEnter,
        onMonthChange: handleMonthChange,
        onSelect: handleOnSelect,
      },
      selectedOption,
    };
  };

  return children(getRangeDatePickerApi());
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
