import * as React from 'react';

import cx from 'clsx';

import {
  AppFrameProvider,
  useAppFrame,
} from '../../providers/AppFrameProvider';

import { IAppFrameProps } from './types';

import styles from './AppFrame.module.scss';

const baseClass = 'app-frame';
const pageContainerClass = `${baseClass}__page-content-container`;

const Frame = (props: IAppFrameProps) => {
  const {
    children,
    className,
    navigation,
    sideNavigation,
    topBar,
    topBarClassName,
    sideNavigationContainerClassName,
    contentClassName,
  } = props;
  const mergedClassNames = cx(styles[baseClass], className);
  const { isSideNavigationVisible } = useAppFrame();
  const [isSideNavMounted, setIsSideNavMounted] = React.useState(
    isSideNavigationVisible
  );
  const [isSideNavOpen, setIsSideNavOpen] = React.useState(
    isSideNavigationVisible
  );
  const sideNavWrapperRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (isSideNavigationVisible) {
      setIsSideNavMounted(true);
      requestAnimationFrame(() => setIsSideNavOpen(true));

      return;
    }

    return setIsSideNavOpen(false);
  }, [isSideNavigationVisible]);

  React.useEffect(() => {
    const sideNavWrapper = sideNavWrapperRef.current;

    if (!isSideNavOpen && sideNavWrapper) {
      const handleTransitionEnd = () => {
        setIsSideNavMounted(false);
      };

      sideNavWrapper.addEventListener('transitionend', handleTransitionEnd);

      return () => {
        sideNavWrapper.removeEventListener(
          'transitionend',
          handleTransitionEnd
        );
      };
    }
  }, [isSideNavOpen]);

  return (
    <div className={mergedClassNames}>
      {navigation}
      <div className={styles[pageContainerClass]}>
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
        <div
          className={cx(styles[`${pageContainerClass}__content-wrapper`], {
            [styles[`${pageContainerClass}__content-wrapper--with-top-bar`]]:
              topBar,
          })}
        >
          {sideNavigation && (
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
                  ]]: isSideNavOpen,
                }
              )}
            >
              {isSideNavMounted && sideNavigation}
            </div>
          )}
          <div
            className={cx(
              styles[`${pageContainerClass}__content-wrapper__content`],
              contentClassName
            )}
          >
            {children}
          </div>
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
