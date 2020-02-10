import * as React from 'react';
import * as PropTypes from 'prop-types';
import CloseIcon from 'react-material-icon-svg/dist/CloseIcon';
import styles from './style.scss';

const baseClass = 'select-head';

const ClearButton = React.forwardRef((props, ref) => {
  const { clearSelectedOption } = props;
  return (
    <div
      ref={ref}
      className={styles[`${baseClass}__clear`]}
    >
      <CloseIcon
        width="20px"
        height="20px"
        fill="#4384f5"
        onClick={clearSelectedOption}
      />
    </div>
  );
});

ClearButton.propTypes = {
  clearSelectedOption: PropTypes.func
};

export default ClearButton;
