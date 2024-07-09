import * as React from 'react';

import cx from 'clsx';

import { useAppFrame } from '../../providers/AppFrameProvider';

import { NavBar } from './components/NavBar';
import { IAppFrameProps } from './types';

import styles from './AppFrame.module.scss';

const baseClass = 'app-frame';
const pageContainerClass = `${baseClass}__page-content-container`;

export const AppFrame: React.FC<IAppFrameProps> = ({
  children,
  className,
  navBarOptions,
  activeOptionKey,
  subNavBar,
  topBarNode,
  navigationClassName,
  topBarClassName,
  subNavigationClassName,
  contentClassName,
  bottomNavBarOptions,
}) => {
  const mergedClassNames = cx(styles[baseClass], className);
  const { isSubNavBarVisible } = useAppFrame();

  return (
    <div className={mergedClassNames}>
      <NavBar
        className={navigationClassName}
        activeOptionKey={activeOptionKey}
        navBarOptions={navBarOptions}
        bottomNavBarOptions={bottomNavBarOptions}
      />
      <div className={styles[pageContainerClass]}>
        <div
          className={cx(
            styles[`${pageContainerClass}__top-bar`],
            {
              [styles[`${pageContainerClass}__top-bar--visible`]]: topBarNode,
            },
            topBarClassName
          )}
        >
          {topBarNode}
        </div>
        <div
          className={cx(styles[`${pageContainerClass}__content-wrapper`], {
            [styles[`${pageContainerClass}__content-wrapper--with-top-bar`]]:
              topBarNode,
          })}
        >
          {subNavBar && (
            <div
              className={cx(
                styles[
                  `${pageContainerClass}__content-wrapper__nav-bar-wrapper`
                ],
                subNavigationClassName,
                {
                  [styles[
                    `${pageContainerClass}__content-wrapper__nav-bar-wrapper--visible`
                  ]]: isSubNavBarVisible,
                }
              )}
            >
              {subNavBar}
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
