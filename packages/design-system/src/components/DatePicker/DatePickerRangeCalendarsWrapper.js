import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'date-picker--range';

const DatePickerRangeCalendarsWrapper = props => {
  const { className, children, ...restProps } = props;

  return (
    <div
      {...restProps}
      className={getMergedClassNames(
        styles[`${baseClass}__calendars-wrapper`],
        className
      )}
    >
      {children}
    </div>
  );
};

DatePickerRangeCalendarsWrapper.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string
};

export default DatePickerRangeCalendarsWrapper;
