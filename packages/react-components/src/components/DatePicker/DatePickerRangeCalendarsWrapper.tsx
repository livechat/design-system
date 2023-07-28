import * as React from 'react';

import { clsx } from 'clsx';

import styles from './DatePicker.module.scss';

export const DatePickerRangeCalendarsWrapper: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const { className, children, ...restProps } = props;

  const mergedClassNames = clsx(
    className,
    styles['date-picker--range__calendars-wrapper']
  );

  return (
    <div {...restProps} className={mergedClassNames}>
      {children}
    </div>
  );
};
