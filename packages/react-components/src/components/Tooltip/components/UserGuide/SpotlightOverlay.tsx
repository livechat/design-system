import * as React from 'react';

import cx from 'clsx';

import styles from '../../Tooltip.module.scss';

const baseClass = 'guide-tooltip';

const SpotlightOverlay = ({
  gap,
  isVisible,
  slide,
  disablePointerEvents,
  zIndex,
}: {
  gap: DOMRect | null;
  isVisible: boolean;
  slide: boolean;
  disablePointerEvents: boolean;
  zIndex: number;
}): React.ReactElement | null => {
  if (!gap) return null;
  const overlayLeft = {
    top: `${gap.top}px`,
    left: '0',
    width: `${gap.left}px`,
    height: `${gap.height}px`,
    zIndex: zIndex,
  };
  const overlayRight = {
    top: `${gap.top}px`,
    left: `${gap.right}px`,
    width: `calc(100% - ${gap.right}px)`,
    height: `${gap.height}px`,
    zIndex: zIndex,
  };
  const overlayTop = {
    top: '0',
    left: '0',
    width: '100%',
    height: `${gap.top}px`,
    zIndex: zIndex,
  };
  const overlayBottom = {
    top: `${gap.bottom}px`,
    left: '0',
    width: '100%',
    height: `calc(100% - ${gap.bottom}px)`,
    zIndex: zIndex,
  };

  const spotlight = {
    top: `${gap.top}px`,
    left: `${gap.left}px`,
    width: `${gap.width}px`,
    height: `${gap.height}px`,
    backgroundColor: 'transparent',
    zIndex: zIndex,
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
