import * as React from 'react';
import * as PropTypes from 'prop-types';
import ChevronLeftIcon from 'react-material-icon-svg/dist/ChevronLeftIcon';
import ChevronRightIcon from 'react-material-icon-svg/dist/ChevronRightIcon';

const DatePickerNavbar = ({
  onPreviousClick,
  onNextClick,
  className,
  classNames
}) => {
  const handlePrevClick = () => onPreviousClick();
  const handleNextClick = () => onNextClick();

  return (
    <div className={className}>
      <button className={classNames.navButtonPrev} onClick={handlePrevClick}>
        <ChevronLeftIcon width="20px" height="20px" fill="#4384f5" />
      </button>
      <button className={classNames.navButtonNext} onClick={handleNextClick}>
        <ChevronRightIcon width="20px" height="20px" fill="#4384f5" />
      </button>
    </div>
  );
};

DatePickerNavbar.propTypes = {
  className: PropTypes.string,
  onPreviousClick: PropTypes.func,
  onNextClick: PropTypes.func,
  classNames: PropTypes.object
};

export default DatePickerNavbar;
