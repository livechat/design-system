import * as React from 'react';
import CheckIcon from 'react-material-icon-svg/dist/CheckIcon';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'checkbox';

const Checkbox = props => {
  const { className, ...restProps } = props;
  const mergedClassNames = getMergedClassNames(
    styles[`${baseClass}__square`],
    className
  );
  return (
    <div className={mergedClassNames}>
      <CheckIcon className={styles[`${baseClass}__checkmark`]} />
      <input
        className={styles[`${baseClass}__input`]}
        {...restProps}
        type="checkbox"
      />
    </div>
  );
};

export default Checkbox;
