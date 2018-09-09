import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import styles from './style.scss';

const Form = ({ className, children, ...restProps }) => (
  <form className={classnames(styles.form, className)} {...restProps}>
    {children}
  </form>
);

Form.propTypes = {
  /**
   * Provide children to be rendered inside of the <form> element
   */
  children: PropTypes.node,

  /**
   * Provide a custom className to be applied on the containing <form> node
   */
  className: PropTypes.string
};

export default Form;
