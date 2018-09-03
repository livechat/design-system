import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const RadioGroup = props => {
  const { className, children, labelText } = props;

  const baseClass = 'radio-group';
  const mergedClassNames = getMergedClassNames(styles[baseClass], className);

  return (
    <fieldset className={mergedClassNames}>
      <legend className={styles[`${baseClass}__label`]}>{labelText}</legend>
      {children}
    </fieldset>
  );
};

RadioGroup.propTypes = {
  className: PropTypes.string,
  labelText: PropTypes.string,
  children: PropTypes.node.isRequired
};

export default RadioGroup;
