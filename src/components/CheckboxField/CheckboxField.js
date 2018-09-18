import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import { CheckIcon } from 'react-material-icon-svg';
import FieldDescription from '../FieldDescription';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const cx = classNames.bind(styles);

const CheckboxField = props => {
  const {
    className,
    children,
    checked,
    disabled,
    id,
    description,
    ...restProps
  } = props;

  const baseClass = 'checkbox';
  const mergedClassNames = getMergedClassNames(
    cx({
      [baseClass]: true,
      [`${baseClass}--selected`]: checked,
      [`${baseClass}--disabled`]: disabled
    }),
    className
  );

  return (
    <div className={mergedClassNames}>
      <label className={styles[`${baseClass}__label`]} htmlFor={id}>
        <div className={styles[`${baseClass}__square`]}>
          <CheckIcon className={styles[`${baseClass}__checkmark`]} />
          <input
            className={styles[`${baseClass}__input`]}
            {...restProps}
            type="checkbox"
            id={id}
            checked={checked}
            disabled={disabled}
          />
        </div>
        <div className={styles[`${baseClass}__text`]}>{children}</div>
      </label>
      {description && (
        <FieldDescription className={styles[`${baseClass}__helper`]}>
          {description}
        </FieldDescription>
      )}
    </div>
  );
};

CheckboxField.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  checked: PropTypes.bool.isRequired,
  children: PropTypes.node.isRequired,
  description: PropTypes.string,
  disabled: PropTypes.bool
};

CheckboxField.defaultProps = {
  onChange: () => {}
};

export default CheckboxField;
