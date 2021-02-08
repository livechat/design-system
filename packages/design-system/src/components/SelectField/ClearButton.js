import * as React from 'react';
import * as PropTypes from 'prop-types';
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';
import classNames from 'classnames/bind';

import styles from './style.scss';

const baseClass = 'select-head';
const cx = classNames.bind(styles);

const ClearButton = React.forwardRef((props, ref) => {
  const { isVisible, clearSelectedOption } = props;
  return (
    <div
      ref={ref}
      className={cx({
        [`${baseClass}__clear`]: true,
        [`${baseClass}__clear--visible`]: isVisible
      })}
      data-testid="select-clear-button"
    >
      <CloseIcon
        width="20px"
        height="20px"
        fill="#4384f5"
        data-testid="select-clear-icon"
        onClick={clearSelectedOption}
      />
    </div>
  );
});

ClearButton.propTypes = {
  clearSelectedOption: PropTypes.func,
  isVisible: PropTypes.bool
};

export default ClearButton;
