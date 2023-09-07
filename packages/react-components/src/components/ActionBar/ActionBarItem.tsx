import * as React from 'react';

import cx from 'clsx';

import { Button } from '../Button';
import { Tooltip } from '../Tooltip';

import styles from './ActionBar.module.scss';

export type IActionBarOption = {
  key: string;
  element: React.ReactElement;
  label?: string;
  onClick: () => void;
};

interface ActionBarItem {
  option: IActionBarOption;
  menuItemsKeys: string[];
  activeOptionKey?: string | null;
}

const baseClass = 'action-bar__items';

export const ActionBarItem: React.FC<ActionBarItem> = ({
  option,
  menuItemsKeys,
  activeOptionKey,
}) => {
  const mergedButtonClassNames = cx(styles[`${baseClass}__button`], {
    [styles[`${baseClass}__button--hidden`]]: menuItemsKeys.includes(
      option.key
    ),
    [styles[`${baseClass}__button--active`]]: option.key === activeOptionKey,
  });

  if (option.label) {
    const tooltipVisibility = menuItemsKeys.includes(option.key) && {
      isVisible: false,
    };

    return (
      <Tooltip
        theme="invert"
        placement="top"
        triggerRenderer={() => (
          <Button
            id={option.key}
            key={option.key}
            title={option.label}
            kind="plain"
            size="compact"
            className={mergedButtonClassNames}
            onClick={option.onClick}
            icon={option.element}
          />
        )}
        {...tooltipVisibility}
      >
        <div>{option.label}</div>
      </Tooltip>
    );
  }

  return (
    <Button
      id={option.key}
      key={option.key}
      title={option.label}
      kind="plain"
      className={mergedButtonClassNames}
      onClick={option.onClick}
    >
      {option.element}
    </Button>
  );
};
