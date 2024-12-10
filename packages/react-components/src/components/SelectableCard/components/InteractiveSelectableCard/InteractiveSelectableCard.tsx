import { FC } from 'react';

import cx from 'clsx';

import { SelectableCard } from '../../SelectableCard';

import { IInteractiveSelectableCardProps } from './types';

import styles from './InteractiveSelectableCard.module.scss';

const baseClass = `interactive-selectable-card`;

export const InteractiveSelectableCard: FC<IInteractiveSelectableCardProps> = ({
  children,
  contentClassName,
  ...props
}) => {
  return (
    <SelectableCard {...props} kind="interactive">
      <div
        role="presentation"
        className={cx(styles[baseClass], contentClassName)}
      >
        {children}
      </div>
    </SelectableCard>
  );
};
