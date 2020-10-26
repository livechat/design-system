import * as React from 'react';
import * as PropTypes from 'prop-types';
import ChevronLeftIcon from 'react-material-icon-svg/dist/ChevronLeftIcon';
import ChevronRightIcon from 'react-material-icon-svg/dist/ChevronRightIcon';
import ChevronDoubleLeftIcon from 'react-material-icon-svg/dist/ChevronDoubleLeftIcon';
import ChevronDoubleRightIcon from 'react-material-icon-svg/dist/ChevronDoubleRightIcon';
import cx from 'classnames';

const DatePickerNavbar = props => {
  const {
    onPreviousClick,
    onNextClick,
    onNextYearClick,
    onPreviousYearClick,
    showNextButton,
    showPreviousButton,
    className,
    classNames,
  } = props;

  const handlePrevClick = () => onPreviousClick();
  const handleNextClick = () => onNextClick();
  const handlePrevYearClick = () => onPreviousYearClick();
  const handleNextYearClick = () => onNextYearClick();

  return (
    <div className={className}>
      <div style={{ display: 'flex' }}>
        <button
          className={cx({
            [classNames.navButtonPrev]: true,
            [classNames.navButtonInteractionDisabled]: !showPreviousButton
          })}
          onClick={handlePrevYearClick}
        >
          <ChevronDoubleLeftIcon width="20px" height="20px" fill="#4384f5" />
        </button>
        <button
          className={cx({
            [classNames.navButtonPrev]: true,
            [classNames.navButtonInteractionDisabled]: !showPreviousButton
          })}
          onClick={handlePrevClick}
        >
          <ChevronLeftIcon width="20px" height="20px" fill="#4384f5" />
        </button>
      </div>
      <div style={{ display: 'flex' }}>
        <button
          className={cx({
            [classNames.navButtonNext]: true,
            [classNames.navButtonInteractionDisabled]: !showNextButton
          })}
          onClick={handleNextClick}
        >
          <ChevronRightIcon width="20px" height="20px" fill="#4384f5" />
        </button>
        <button
          className={cx({
            [classNames.navButtonNext]: true,
            [classNames.navButtonInteractionDisabled]: !showNextButton
          })}
          onClick={handleNextYearClick}
        >
          <ChevronDoubleRightIcon width="20px" height="20px" fill="#4384f5" />
        </button>
      </div>
    </div>
  );
};

DatePickerNavbar.propTypes = {
  className: PropTypes.string,
  showNextButton: PropTypes.bool,
  showPreviousButton: PropTypes.bool,
  classNames: PropTypes.objectOf(PropTypes.string),
  onPreviousClick: PropTypes.func,
  onNextClick: PropTypes.func,
  onPreviousYearClick: PropTypes.func,
  onNextYearClick: PropTypes.func,
};

export default DatePickerNavbar;
