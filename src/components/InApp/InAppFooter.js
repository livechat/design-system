import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';
import Button from '../Button';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'inapp__footer';

const InAppFooter = props => {
  const mergedClassNames = getMergedClassNames(
    styles[`${baseClass}`],
    props.className
  );

  return (
    <div className={mergedClassNames}>
      {props.buttons.remind && (<Button fullWidth {...props.buttons.remind} />)}
      <Button fullWidth primary {...props.buttons.cta} />
    </div>
  );
};

InAppFooter.propTypes = {
  className: PropTypes.string,
  buttons: PropTypes.shape({
    cta: Button.propTypes.isRequired,
    remind: Button.propTypes
  })
};

export default InAppFooter;
