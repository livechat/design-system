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
}) => {
  const mergedClassNames = cx(styles[baseClass], className);
  const { isSubNavBarVisible } = useAppFrame();

  return (
    <div className={mergedClassNames}>
      <NavBar activeOptionKey={activeOptionKey} navBarOptions={navBarOptions} />
      <div className={styles[pageContainerClass]}>
        <div className={styles[`${pageContainerClass}__top-bar`]}>
          {topBarNode}
        </div>
        <div className={styles[`${pageContainerClass}__content-wrapper`]}>
          {subNavBar && (
            <div
              className={cx(
                styles[
                  `${pageContainerClass}__content-wrapper__nav-bar-wrapper`
                ],
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
            className={
              styles[`${pageContainerClass}__content-wrapper__content`]
            }
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
