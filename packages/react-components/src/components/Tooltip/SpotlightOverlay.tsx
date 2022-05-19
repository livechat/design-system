import * as React from 'react';
import cx from 'clsx';
import styles from './Tooltip.module.scss';

const baseClass = 'guide-tooltip';

const SpotlightOverlay = ({ gap, isVisible, slide, disablePointerEvents }) => {
  if (!gap) return null;
  const overlayLeft = {
    top: `${gap.top}px`,
    left: '0',
    width: `${gap.left}px`,
    height: `${gap.height}px`,
  };
  const overlayRight = {
    top: `${gap.top}px`,
    left: `${gap.right}px`,
    width: `calc(100% - ${gap.right}px)`,
    height: `${gap.height}px`,
  };
  const overlayTop = {
    top: '0',
    left: '0',
    width: '100%',
    height: `${gap.top}px`,
  };
  const overlayBottom = {
    top: `${gap.bottom}px`,
    left: '0',
    width: '100%',
    height: `calc(100% - ${gap.bottom}px)`,
  };

  const spotlight = {
    top: `${gap.top}px`,
    left: `${gap.left}px`,
    width: `${gap.width}px`,
    height: `${gap.height}px`,
    backgroundColor: 'transparent',
  };

  return (
    <>
      <div
        className={cx({
          [styles[`${baseClass}__overlay`]]: true,
          [styles[`${baseClass}__overlay--visible`]]: isVisible,
          [styles[`${baseClass}__overlay--slide`]]: slide,
        })}
        style={overlayLeft}
      />
      <div
        className={cx({
          [styles[`${baseClass}__overlay`]]: true,
          [styles[`${baseClass}__overlay--visible`]]: isVisible,
          [styles[`${baseClass}__overlay--slide`]]: slide,
        })}
        style={overlayTop}
      />
      <div
        className={cx({
          [styles[`${baseClass}__overlay`]]: true,
          [styles[`${baseClass}__overlay--visible`]]: isVisible,
          [styles[`${baseClass}__overlay--slide`]]: slide,
        })}
        style={overlayRight}
      />
      <div
        className={cx({
          [styles[`${baseClass}__overlay`]]: true,
          [styles[`${baseClass}__overlay--visible`]]: isVisible,
          [styles[`${baseClass}__overlay--slide`]]: slide,
        })}
        style={overlayBottom}
      />
      {disablePointerEvents && (
        <div
          className={cx({
            [styles[`${baseClass}__overlay`]]: true,
            [styles[`${baseClass}__overlay--visible`]]: isVisible,
            [styles[`${baseClass}__overlay--slide`]]: slide,
          })}
          style={spotlight}
        />
      )}
    </>
  );
};

export default SpotlightOverlay;
