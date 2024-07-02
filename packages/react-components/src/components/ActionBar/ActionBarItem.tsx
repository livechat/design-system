import * as React from 'react';

import cx from 'clsx';

import { Button } from '../Button';
import { Tooltip } from '../Tooltip';

import { IActionBarItem } from './types';

import styles from './ActionBar.module.scss';

const baseClass = 'action-bar__items';
const menuWrapperClass = `${baseClass}__button-wrapper`;

export const ActionBarItem: React.FC<IActionBarItem> = ({
  option,
  isActive,
  vertical,
}) => {
  const mergedButtonClassNames = cx(styles[menuWrapperClass], {
    [styles[`${menuWrapperClass}--active`]]: isActive,
    [styles[`${menuWrapperClass}--vertical`]]: vertical,
  });

  const button = (
    <Button
      id={option.key}
      key={option.key}
      title={option?.showTooltip ? undefined : option.label}
      kind="plain"
      onClick={option.onClick}
      icon={option.element}
      className={cx(styles[`${menuWrapperClass}__button`], {
        [styles[`${menuWrapperClass}__button--with-vertical-divider`]]:
          vertical && option.withDivider,
        [styles[`${menuWrapperClass}__button--with-divider`]]:
          !vertical && option.withDivider,
      })}
    />
  );

  if (option.showTooltip) {
    return (
      <div
        data-testid={option.key}
        key={option.key}
        className={mergedButtonClassNames}
      >
        <Tooltip
          kind="invert"
          placement={vertical ? 'left' : 'bottom'}
          triggerClassName={styles[`${baseClass}__tooltip`]}
          triggerRenderer={() => button}
          floatingStrategy="fixed"
          useClickHookProps={{
            ignoreMouse: true,
          }}
          hoverOnDelay={800}
          hoverOffDelay={0}
        >
          <div>{option.label}</div>
        </Tooltip>
      </div>
    );
  }

  return (
    <div data-testid={option.key} className={mergedButtonClassNames}>
      {button}
    </div>
  );
};
