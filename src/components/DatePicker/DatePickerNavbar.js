import * as React from 'react';
import * as PropTypes from 'prop-types';
import ChevronLeftIcon from 'react-material-icon-svg/dist/ChevronLeftIcon';
import ChevronRightIcon from 'react-material-icon-svg/dist/ChevronRightIcon';
import ChevronDoubleLeftIcon from 'react-material-icon-svg/dist/ChevronDoubleLeftIcon';
import ChevronDoubleRightIcon from 'react-material-icon-svg/dist/ChevronDoubleRightIcon';

const DatePickerNavbar = ({
  onPreviousClick,
  onPrevYearClick,
  onNextClick,
  onNexYearClick,
  // month,
  className,
  classNames
}) => {
  const handlePrevClick = () => onPreviousClick();
  const handleNextClick = () => onNextClick();
  // const handlePrevYearClick = () =>

  return (
    <div className={className}>
      <div style={{ display: 'flex' }}>
        <button className={classNames.navButtonPrev} onClick={onPrevYearClick}>
          <ChevronDoubleLeftIcon width="20px" height="20px" fill="#4384f5" />
        </button>
        <button className={classNames.navButtonPrev} onClick={handlePrevClick}>
          <ChevronLeftIcon width="20px" height="20px" fill="#4384f5" />
        </button>
      </div>
      <div style={{ display: 'flex' }}>
        <button className={classNames.navButtonNext} onClick={handleNextClick}>
          <ChevronRightIcon width="20px" height="20px" fill="#4384f5" />
        </button>
        <button className={classNames.navButtonNext} onClick={onNexYearClick}>
          <ChevronDoubleRightIcon width="20px" height="20px" fill="#4384f5" />
        </button>
      </div>
    </div>
  );
};

DatePickerNavbar.propTypes = {
  className: PropTypes.string,
  onPreviousClick: PropTypes.func,
  onPrevYearClick: PropTypes.func,
  onNexYearClick: PropTypes.func,
  onNextClick: PropTypes.func,
  // month: PropTypes.instanceOf(Date),
  classNames: PropTypes.objectOf(PropTypes.string)
};

export default DatePickerNavbar;
