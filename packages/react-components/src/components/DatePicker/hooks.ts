import { Dispatch, ReducerAction, ReducerState, useReducer } from 'react';
import { calculateDatePickerMonth, getInitialStateFromProps } from './helpers';
import {
  IRangeDatePickerProps,
  IRangeDatePickerReducerAction,
  IRangeDatePickerState,
  RangeDatePickerAction,
  RangeDatePickerReducer,
} from './types';

export const useRangeDatePickerState = (
  props: IRangeDatePickerProps
): [
  ReducerState<RangeDatePickerReducer>,
  Dispatch<ReducerAction<RangeDatePickerReducer>>
] => {
  const initialCurrentMonth = calculateDatePickerMonth(
    props.initialFromDate,
    props.initialToDate,
    props.toMonth
  );

  const defaultInitialState: IRangeDatePickerState = {
    selectedItem: null,
    from: undefined,
    to: undefined,
    temporaryTo: undefined,
    currentMonth: initialCurrentMonth,
  };

  const initialState = {
    ...defaultInitialState,
    ...getInitialStateFromProps(props),
  };

  function reducer(
    state: IRangeDatePickerState,
    action: IRangeDatePickerReducerAction
  ) {
    switch (action.type) {
      case RangeDatePickerAction.NEW_SELECTED_ITEM:
        return {
          selectedItem: action.payload.selectedItem,
          from: void 0,
          to: void 0,
          temporaryTo: void 0,
          currentMonth: initialCurrentMonth,
        };
      case RangeDatePickerAction.NEW_TEMPORARY_TO_VALUE:
        return {
          ...state,
          temporaryTo: action.payload.date,
        };
      case RangeDatePickerAction.SELECT_FIRST_DAY:
        return {
          ...state,
          from: action.payload.date,
          to: void 0,
          temporaryTo: void 0,
        };
      case RangeDatePickerAction.SELECT_SECOND_DAY_AS_FROM:
        return {
          ...state,
          from: action.payload.date,
          to: state.from,
          temporaryTo: state.from,
        };
      case RangeDatePickerAction.SELECT_SECOND_DAY_AS_TO:
        return {
          ...state,
          to: action.payload.date,
          temporaryTo: action.payload.date,
        };
      case RangeDatePickerAction.CURRENT_MONTH_CHANGE:
        return {
          ...state,
          currentMonth: action.payload.date,
        };
      case RangeDatePickerAction.SET_FROM:
        return {
          ...state,
          from: action.payload.date,
        };
      case RangeDatePickerAction.SET_TO:
        return {
          ...state,
          to: action.payload.date,
        };
      default:
        return state;
    }
  }

  return useReducer(reducer, initialState);
};
