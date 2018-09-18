import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './style.scss';

const Form = ({ className, children, labelText, helperText, ...restProps }) => (
  <form className={classnames(styles.form, className)} {...restProps}>
    <div className={styles.form__header}>
      {labelText && <h3 className={styles.form__label}>{labelText}</h3>}
      {helperText && <p className={styles.form__helper}>{helperText}</p>}
    </div>
    {children}
  </form>
);

Form.propTypes = {
  /**
   * Provide children to be rendered inside of the <form> element
   */
  children: PropTypes.node.isRequired,
  labelText: PropTypes.string,
  helperText: PropTypes.string,
  /**
   * Provide a custom className to be applied on the containing <form> node
   */
  className: PropTypes.string
};

export default Form;
