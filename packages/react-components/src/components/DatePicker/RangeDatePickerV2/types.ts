import { DateRange } from 'react-day-picker';

import { IRangeDatePickerCoreProps } from '../types';

export type RANGE_DATE_PICKER_OPTION_ID =
  | 'today'
  | 'yesterday'
  | 'last7days'
  | 'last30days'
  | 'lastMonth'
  | 'currentMonth';

export interface IRangeDatePickerV2Props
  extends Omit<IRangeDatePickerCoreProps, 'children'> {
  triggerClassName?: string;
  rangeDatePickerClassName?: string;
  initiallyOpen?: boolean;
  initialSelectedOptionId?: RANGE_DATE_PICKER_OPTION_ID;
  onRangeSelect: (
    selected: DateRange | null,
    id?: RANGE_DATE_PICKER_OPTION_ID
  ) => void;
}
