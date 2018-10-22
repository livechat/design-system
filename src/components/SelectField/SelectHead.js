import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';

const baseClass = 'select';

const SelectHead = props => {
  const handleChange = e => props.onChange(e.target.value);

  return (
    <div className={styles[`${baseClass}__head`]} onClick={props.onClick}>
      <div className={styles[`${baseClass}__search`]}>
        <input
          className={styles[`${baseClass}__input`]}
          type="text"
          placeholder={props.placeholder}
          name="select-box-input"
          value={props.value}
          onChange={handleChange}
          autoComplete="off"
        />
      </div>
    </div>
  );
};

SelectHead.propTypes = {
  value: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default SelectHead;
