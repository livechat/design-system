import * as React from 'react';
import * as PropTypes from 'prop-types';
import styles from './style.scss';
import { Button } from '../Button';
import getMergedClassNames from '../../utils/getMergedClassNames';

const baseClass = 'inapp__footer';

const InAppMessageFooter = props => {
  const mergedClassNames = getMergedClassNames(
    styles[`${baseClass}`],
    !props.buttons.remind ? styles[`${baseClass}__single_button`] : null,
    props.className
  );

  let RemindButton = () => null;

  if (props.buttons.remind) {
    const { children: remindChildren, ...remindProps } = props.buttons.remind;
    RemindButton = () => (
      <Button secondary fullWidth {...remindProps}>
        {remindChildren}
      </Button>
    );
  }
  const { children: ctaChildren, ...ctaProps } = props.buttons.cta;

  return (
    <div className={mergedClassNames}>
      <RemindButton />
      <Button fullWidth primary {...ctaProps}>
        {ctaChildren}
      </Button>
    </div>
  );
};

InAppMessageFooter.propTypes = {
  className: PropTypes.string,
  buttons: PropTypes.shape({
    cta: PropTypes.shape({ ...Button.propTypes.isRequired }).isRequired,
    remind: PropTypes.shape({ ...Button.propTypes })
  })
};

export default InAppMessageFooter;
