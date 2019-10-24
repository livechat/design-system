import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const FormGroup = props => {
  const { className, children, labelText, helperText } = props;

  const baseClass = 'form-group';
  const mergedClassNames = getMergedClassNames(styles[baseClass], className);

  return (
    <div role="group" aria-label={labelText} className={mergedClassNames}>
      <div className={styles[`${baseClass}__header`]}>
        <div className={styles[`${baseClass}__label`]}>{labelText}</div>
        {helperText && (
          <div className={styles[`${baseClass}__helper`]}>{helperText}</div>
        )}
      </div>
      {children}
    </div>
  );
};

FormGroup.propTypes = {
  className: PropTypes.string,
  labelText: PropTypes.string,
  helperText: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default FormGroup;
