import * as React from 'react';

import { Button } from '../Button';
import { Tooltip } from '../Tooltip';

import * as styles from './styles';
import { IActionBarItem } from './types';

export const ActionBarItem: React.FC<IActionBarItem> = ({
  option,
  isActive,
  vertical,
}) => {
  const button = (
    <Button
      id={option.key}
      key={option.key}
      title={option?.showTooltip ? undefined : option.label}
      kind="plain"
      onClick={option.onClick}
      icon={option.element}
      className={styles.actionBarItemButton(!!option.withDivider, !!vertical)}
    />
  );

  if (option.showTooltip) {
    return (
      <div
        data-testid={option.key}
        key={option.key}
        className={styles.actionBarItemButtonWrapper(!!isActive, !!vertical)}
      >
        <Tooltip
          kind="invert"
          placement={vertical ? 'left' : 'bottom'}
          triggerClassName={styles.actionBarItemTooltip}
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
    <div
      data-testid={option.key}
      className={styles.actionBarItemButtonWrapper(!!isActive, !!vertical)}
    >
      {button}
    </div>
  );
};
