export interface ISelectDatePickerOption {
  id: string;
  label: string;
  isManual?: boolean;
  value: {
    from: Date;
    to: Date;
  }
}

export interface ISelectDatePickerProps {
  options: ISelectDatePickerOption[];
  initialSelectedItemKey: string;
  initialFromDate: Date;
  initialToDate: Date;
  onChange(selected: ISelectDatePickerOption): void;
}

export var SelectDatePicker: React.ComponentType<ISelectDatePickerProps>;