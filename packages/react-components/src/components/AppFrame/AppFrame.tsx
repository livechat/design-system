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
              className={cx(
                styles[
                  `${pageContainerClass}__content-wrapper__nav-bar-wrapper`
                ],
                'lc-dark-theme',
                sideNavigationContainerClassName,
                {
                  [styles[
                    `${pageContainerClass}__content-wrapper__nav-bar-wrapper--visible`
                  ]]: isSideNavigationVisible,
                }
              )}
            >
              {sideNavigation}
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
