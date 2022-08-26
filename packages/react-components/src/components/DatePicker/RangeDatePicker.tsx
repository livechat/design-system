import { ReactElement, useCallback, useEffect, useMemo, useRef } from 'react';
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

export const RangeDatePicker = ({
  options,
  initialSelectedItemKey,
  initialFromDate,
  initialToDate,
  toMonth,
  onChange,
  children,
}: IRangeDatePickerProps): ReactElement => {
  const prevSelectedItem = useRef<string | null>(
    initialSelectedItemKey || null
  );
  const [state, dispatch] = useRangeDatePickerState({
    options,
    initialSelectedItemKey,
    initialFromDate,
    initialToDate,
    toMonth,
    onChange,
    children,
  });

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

    onChange &&
      onChange({
        ...selectedOption,
        value: {
          from: from,
          to: to,
        },
      });
  }, [state.from, state.to, state.selectedItem, options, onChange]);

  // handle selected option change
  useEffect(() => {
    const { selectedItem } = state;

    if (selectedItem === prevSelectedItem.current) {
      return;
    }

    if (!selectedItem) {
      onChange(null);
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

    onChange(optionsHash[selectedItem]);
  }, [onChange, state.selectedItem, options]);

  const handleDayMouseEnter = useCallback(
    (day: Date) => {
      const isInRange = toMonth
        ? differenceInCalendarDays(toMonth, day) >= 0
        : true;

      if (!isSelectingFirstDay(state.from, state.to) && isInRange) {
        dispatch({
          type: RangeDatePickerAction.NEW_TEMPORARY_TO_VALUE,
          payload: { date: day },
        });
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
    const { currentMonth, from, selectedItem, temporaryTo, to } = state;
    const modifiers = useMemo(
      () => getRangeDatePickerModifiers(from, temporaryTo),
      [from, temporaryTo]
    );
    const selectedOption = useMemo(() => {
      return getSelectedOption(selectedItem, options);
    }, [options, selectedItem]);

    const selectedDays = useMemo(() => {
      return [from, { from, to: temporaryTo }];
    }, [from, temporaryTo]);

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
        range: true,
        month: currentMonth,
        numberOfMonths: 2,
        onDayClick: handleDayClick,
        selectedDays,
        modifiers,
        initialMonth: toMonth && subMonths(toMonth, 1),
        toMonth: toMonth,
        disabledDays,
        onDayMouseEnter: handleDayMouseEnter,
        onMonthChange: handleMonthChange,
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
