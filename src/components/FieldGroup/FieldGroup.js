import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import FieldError from '../FieldError';
import styles from './style.scss';
import getMergedClassNames from '../../utils/getMergedClassNames';

const cx = classNames.bind(styles);

const FieldGroup = props => {
  const { className, children, inline, stretch, error, ...restProps } = props;

  const baseClass = 'field-group';
  const mergedClassNames = getMergedClassNames(
    cx({
      [baseClass]: true,
      [`${baseClass}--inline`]: inline,
      [`${baseClass}--stretched`]: stretch
    }),
    className
  );

  return (
    <div {...restProps} className={mergedClassNames}>
      {children}
      {error && <FieldError>{error}</FieldError>}
    </div>
  );
};

FieldGroup.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  error: PropTypes.string,
  inline: PropTypes.bool,
  stretch: PropTypes.bool
};

export default FieldGroup;
