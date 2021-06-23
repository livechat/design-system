import * as React from 'react';
import * as PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './style.scss';

const Form = ({
  className,
  children,
  labelText,
  helperText,
  formFooter,
  ...restProps
}) => (
  <form className={classnames(styles.form, className)} {...restProps}>
    {(labelText || helperText) && (
      <div className={styles.form__header}>
        {labelText && <h3 className={styles.form__label}>{labelText}</h3>}
        {helperText && <p className={styles.form__helper}>{helperText}</p>}
      </div>
    )}
    {children}
    {formFooter && <div className={styles.form__footer}>{formFooter}</div>}
  </form>
);

Form.propTypes = {
  /**
   * Provide children to be rendered inside of the <form> element
   */
  children: PropTypes.node.isRequired,
  labelText: PropTypes.string,
  helperText: PropTypes.string,
  formFooter: PropTypes.node,
  /**
   * Provide a custom className to be applied on the containing <form> node
   */
  className: PropTypes.string
};

export default Form;
