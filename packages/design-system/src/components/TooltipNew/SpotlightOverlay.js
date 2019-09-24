import * as React from 'react';
import * as PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './style.scss';

const baseClass = 'guide-tooltip';

const cx = classNames.bind(styles);

const SpotlightOverlay = ({ gap, isVisible, slide }) => {
  const overlayLeft = {
    top: `${gap.top}px`,
    left: '0',
    width: `${gap.left}px`,
    height: `${gap.height}px`
  };
  const overlayRight = {
    top: `${gap.top}px`,
    left: `${gap.right}px`,
    width: `calc(100% - ${gap.right}px)`,
    height: `${gap.height}px`
  };
  const overlayTop = {
    top: '0',
    left: '0',
    width: '100%',
    height: `${gap.top}px`
  };
  const overlayBottom = {
    top: `${gap.bottom}px`,
    left: '0',
    width: '100%',
    height: `calc(100% - ${gap.bottom}px)`
  };

  return (
    <React.Fragment>
      <div
        className={cx({
          [styles[`${baseClass}__overlay`]]: true,
          [styles[`${baseClass}__overlay--visible`]]: isVisible,
          [styles[`${baseClass}__overlay--slide`]]: slide
        })}
        style={overlayLeft}
      />
      <div
        className={cx({
          [styles[`${baseClass}__overlay`]]: true,
          [styles[`${baseClass}__overlay--visible`]]: isVisible,
          [styles[`${baseClass}__overlay--slide`]]: slide
        })}
        style={overlayTop}
      />
      <div
        className={cx({
          [styles[`${baseClass}__overlay`]]: true,
          [styles[`${baseClass}__overlay--visible`]]: isVisible,
          [styles[`${baseClass}__overlay--slide`]]: slide
        })}
        style={overlayRight}
      />
      <div
        className={cx({
          [styles[`${baseClass}__overlay`]]: true,
          [styles[`${baseClass}__overlay--visible`]]: isVisible,
          [styles[`${baseClass}__overlay--slide`]]: slide
        })}
        style={overlayBottom}
      />
    </React.Fragment>
  );
};

SpotlightOverlay.propTypes = {
  gap: PropTypes.shape({
    top: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    bottom: PropTypes.number.isRequired,
    right: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired
  }).isRequired,
  isVisible: PropTypes.bool.isRequired,
  slide: PropTypes.bool.isRequired
};

export default SpotlightOverlay;
