import clsx from 'clsx';
import { FC, HTMLAttributes } from 'react';

import styles from './DatePicker.module.scss';

export const DatePickerRangeCalendarsWrapper: FC<
  HTMLAttributes<HTMLDivElement>
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
