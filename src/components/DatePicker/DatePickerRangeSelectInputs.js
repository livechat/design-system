import * as React from 'react';
import * as PropTypes from 'prop-types';
import cx from 'classnames';
import { Input } from '../InputField';
import callAll from '../../utils/callAll';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'date-picker--range';

const DatePickerRangeSelectInputs = props => {
  const {
    from: { fromDate: fromDate2, toDate: toDate2, ...fromInputProps },
    to: { fromDate, toDate, ...toInputProps },
    ...restProps
  } = props;

  return (
    <div {...restProps}>
      <Input
        {...fromInputProps}
        className={getMergedClassNames(
          cx(
            styles[`${baseClass}__select-input`],
            styles[`${baseClass}__select-input--from`]
          ),
          fromInputProps.className
        )}
        tabIndex={0}
        size={fromInputProps.size || 10}
        placeholder={fromInputProps.placeholder || 'YYYY-MM-DD'}
        onClick={callAll(e => e.stopPropagation(), fromInputProps.onClose)}
      />
      <span> &mdash; </span>
      <Input
        {...toInputProps}
        className={getMergedClassNames(
          cx(
            styles[`${baseClass}__select-input`],
            styles[`${baseClass}__select-input--to`]
          ),
          toInputProps.className
        )}
        size={toInputProps.size || 10}
        tabIndex={fromDate === undefined ? -1 : 0}
        placeholder={toInputProps.placeholder || 'YYYY-MM-DD'}
        onClick={callAll(e => e.stopPropagation(), toInputProps.onClose)}
      />
    </div>
  );
};

DatePickerRangeSelectInputs.propTypes = {
  from: PropTypes.shape({
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    size: PropTypes.number
  }).isRequired,
  to: PropTypes.shape({
    value: PropTypes.string.isRequired,
    placeholder: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    size: PropTypes.number
  }).isRequired
};

export default DatePickerRangeSelectInputs;
