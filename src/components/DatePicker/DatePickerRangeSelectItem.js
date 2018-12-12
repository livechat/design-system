import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Input } from '../InputField';
import callAll from '../../utils/callAll';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'date-picker--range';

const DatePickerRangeSelectItem = props => {
  const { to, from, ...restProps } = props;

  return (
    <div {...restProps}>
      <Input
        {...from}
        className={getMergedClassNames(
          styles[`${baseClass}__select-input`],
          from.className
        )}
        placeholder={from.placeholder || 'YYYY-MM-DD'}
        size={from.size || 10}
        onClick={callAll(e => e.stopPropagation(), from.onClose)}
      />
      <span> - </span>
      <Input
        {...to}
        className={getMergedClassNames(
          styles[`${baseClass}__select-input`],
          from.className
        )}
        placeholder={to.placeholder || 'YYYY-MM-DD'}
        size={from.size || 10}
        onClick={callAll(e => e.stopPropagation(), to.onClose)}
      />
    </div>
  );
};

DatePickerRangeSelectItem.propTypes = {
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

export default DatePickerRangeSelectItem;
