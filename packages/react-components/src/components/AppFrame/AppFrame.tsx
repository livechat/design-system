import * as React from 'react';

import cx from 'clsx';

import { useAnimations, useMobileViewDetector } from '../../hooks';
import { AppFrameProvider, useAppFrame } from '../../providers';

import { MOBILE_BREAKPOINT } from './constants';
import { IAppFrameProps } from './types';

import styles from './AppFrame.module.scss';

const baseClass = 'app-frame';
const pageContainerClass = `${baseClass}__page-content-container`;

const Frame = (props: IAppFrameProps) => {
  const {
    children,
    className,
    navigation,
    mobileNavigation,
    sideNavigation,
    topBar,
    topBarClassName,
    sideNavigationContainerClassName,
    contentClassName,
  } = props;
  const mergedClassNames = cx(styles[baseClass], className);
  const {
    isSideNavigationVisible,
    setIsMobileViewEnabled,
    isMobileViewEnabled,
  } = useAppFrame();
  const sideNavWrapperRef = React.useRef<HTMLDivElement>(null);
  const { isOpen, isMounted } = useAnimations({
    isVisible: isSideNavigationVisible,
    elementRef: sideNavWrapperRef,
  });
  const { isMobile, handleResizeRef } = useMobileViewDetector({
    mobileBreakpoint: MOBILE_BREAKPOINT,
  });

  React.useEffect(() => {
    setIsMobileViewEnabled(isMobile);
  }, [isMobile]);

  return (
    <div className={mergedClassNames} ref={handleResizeRef}>
      {!isMobileViewEnabled && navigation}
      <div
        className={cx(styles[pageContainerClass], {
          [styles[`${pageContainerClass}--mobile`]]: isMobileViewEnabled,
        })}
      >
        {!isMobileViewEnabled && (
          <div
            className={cx(
              styles[`${pageContainerClass}__top-bar`],
              {
                [styles[`${pageContainerClass}__top-bar--visible`]]: topBar,
              },
              'lc-dark-theme',
              topBarClassName
            )}
          >
            {topBar}
          </div>
        )}
        <div
          className={cx(styles[`${pageContainerClass}__content-wrapper`], {
            [styles[`${pageContainerClass}__content-wrapper--mobile`]]:
              isMobileViewEnabled,
          })}
        >
          {!isMobileViewEnabled && sideNavigation && (
            <div
              ref={sideNavWrapperRef}
              className={cx(
                styles[
                  `${pageContainerClass}__content-wrapper__nav-bar-wrapper`
                ],
                'lc-dark-theme',
                sideNavigationContainerClassName,
                {
                  [styles[
                    `${pageContainerClass}__content-wrapper__nav-bar-wrapper--open`
                  ]]: isOpen,
                }
              )}
            >
              {isMounted && sideNavigation}
            </div>
          )}
          <div
            className={cx(
              styles[`${pageContainerClass}__content-wrapper__content`],
              contentClassName,
              {
                [styles[
                  `${pageContainerClass}__content-wrapper__content--mobile`
                ]]: isMobileViewEnabled,
              }
            )}
          >
            {children}
          </div>
          {isMobileViewEnabled && (
            <>
              <div
                className={
                  styles[
                    `${pageContainerClass}__content-wrapper__mobile-top-bar`
                  ]
                }
              >
                {topBar}
              </div>
              {mobileNavigation}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export const AppFrame: React.FC<IAppFrameProps> = (props) => (
  <AppFrameProvider>
    <Frame {...props} />
  </AppFrameProvider>
);
