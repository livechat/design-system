import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import FieldDescription from '../FieldDescription';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const cx = classNames.bind(styles);

const RadioButton = props => {
  const {
    className,
    children,
    checked,
    disabled,
    id,
    description,
    ...restProps
  } = props;

  const baseClass = 'radio';
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
        <div className={styles[`${baseClass}__circle`]}>
          <span className={styles[`${baseClass}__inner-circle`]} />
          <input
            className={styles[`${baseClass}__input`]}
            {...restProps}
            type="radio"
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

RadioButton.propTypes = {
  className: PropTypes.string,
  id: PropTypes.string.isRequired,
  onClick: PropTypes.func,
  onChange: PropTypes.func,
  checked: PropTypes.bool,
  children: PropTypes.node.isRequired,
  description: PropTypes.string,
  disabled: PropTypes.bool
};

RadioButton.defaultProps = {
  onChange: () => {}
};

export default RadioButton;
