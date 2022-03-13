import * as React from 'react';
import cx from 'classnames';

export const DatePickerRangeCalendarsWrapper: React.FC<
  React.HTMLAttributes<HTMLDivElement>
> = (props) => {
  const { className, children, ...restProps } = props;

  const mergedClassNames = cx(
    className,
    'date-picker--range__calendars-wrapper'
  );

  return (
    <div {...restProps} className={mergedClassNames}>
      {children}
    </div>
  );
};
