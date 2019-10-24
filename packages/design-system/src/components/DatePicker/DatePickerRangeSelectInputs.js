import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Input } from '../InputField';
import callAll from '../../utils/callAll';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'date-picker--range';

const DatePickerRangeSelectInputs = props => {
  const { fromDate, toDate, from, to, ...restProps } = props;

  return (
    <div {...restProps}>
      <Input
        {...from}
        className={getMergedClassNames(
          styles[`${baseClass}__select-input`],
          from.className
        )}
        tabIndex={0}
        size={from.size || 10}
        placeholder={from.placeholder || 'YYYY-MM-DD'}
        onClick={callAll(e => e.stopPropagation(), from.onClose)}
      />
      <span> &mdash; </span>
      <Input
        {...to}
        className={getMergedClassNames(
          styles[`${baseClass}__select-input`],
          to.className
        )}
        size={to.size || 10}
        tabIndex={fromDate === undefined ? -1 : 0}
        disabled={to.disabled || fromDate === undefined}
        placeholder={to.placeholder || 'YYYY-MM-DD'}
        onClick={callAll(e => e.stopPropagation(), to.onClose)}
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
