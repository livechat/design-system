import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import FieldDescription from '../FieldDescription';
import Checkbox from './Checkbox';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const cx = classNames.bind(styles);

const CheckboxField = props => {
  const {
    className,
    children,
    checked,
    disabled,
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
      <label className={styles[`${baseClass}__label`]}>
        <Checkbox {...restProps} checked={checked} disabled={disabled} />
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
