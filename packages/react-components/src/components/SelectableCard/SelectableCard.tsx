import { FC, KeyboardEvent } from 'react';

import cx from 'clsx';

import { useInteractive } from '../../hooks';
import { Checkbox } from '../Checkbox';
import { RadioButton } from '../RadioButton';

import { ISelectableCardProps } from './types';

import styles from './SelectableCard.module.scss';

const baseClass = 'selectable-card';

export const SelectableCard: FC<ISelectableCardProps> = ({
  children,
  className,
  kind,
  selectionType,
  isSelected = false,
  onClick,
}) => {
  const mergedClassName = cx(
    styles[baseClass],
    styles[`${baseClass}--${kind}`],
    {
      [styles[`${baseClass}--selected`]]: isSelected,
    },
    className
  );
  const { handleInteractiveClick } = useInteractive({ onClick });

  const handleOnKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.currentTarget !== document.activeElement) {
      return;
    }

    if (
      e.key === 'Enter' ||
      e.key === ' ' ||
      e.key === 'Spacebar' ||
      e.key === 'Space'
    ) {
      e.preventDefault();

      onClick?.();
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={mergedClassName}
      onClick={handleInteractiveClick}
      onKeyDown={handleOnKeyDown}
    >
      <div className={styles[`${baseClass}__select-indicator`]}>
        {selectionType === 'radio' ? (
          <RadioButton tabIndex={-1} onClick={onClick} checked={isSelected} />
        ) : (
          <Checkbox
            tabIndex={-1}
            onClick={onClick}
            className={styles[`${baseClass}__select-indicator__checkbox`]}
            checked={isSelected}
          />
        )}
      </div>
      {children}
    </div>
  );
};
