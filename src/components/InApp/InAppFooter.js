import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';
import Button from '../Button';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'inapp__footer';

const InAppFooter = props => {
  const ctaButton = props.buttons.cta;
  const remindButton = props.buttons.remind;
  const mergedClassNames = getMergedClassNames(
    styles[`${baseClass}`],
    props.className
  );

  return (
    <div className={mergedClassNames}>
      <Button
        fullWidth
        primary={remindButton.type === 'primary'}
        destructive={remindButton.type === 'destructive'}
        size={remindButton.size || 'regular'}
        onClick={remindButton.action}
      >
        {remindButton.label}
      </Button>
      <Button
        fullWidth
        primary={ctaButton.type === 'primary'}
        destructive={ctaButton.type === 'destructive'}
        size={ctaButton.size || 'regular'}
        onClick={ctaButton.action}
      >
        {ctaButton.label}
      </Button>
    </div>
  );
};

InAppFooter.propTypes = {
  className: PropTypes.string,
  buttons: PropTypes.shape({
    cta: PropTypes.shape({
      label: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired,
      type: PropTypes.string,
      size: PropTypes.string
    }).isRequired,
    remind: PropTypes.shape({
      label: PropTypes.string.isRequired,
      action: PropTypes.func.isRequired,
      type: PropTypes.string,
      size: PropTypes.string
    })
  })
};

export default InAppFooter;
