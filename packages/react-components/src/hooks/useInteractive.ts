import * as React from 'react';

import { IUseInteractive, UseInteractiveProps } from './types';

const NON_INTERACTIVE_TAGS = ['input', 'button', 'select', 'textarea', 'a'];

export const useInteractive = ({
  onClick,
}: UseInteractiveProps): IUseInteractive => {
  const handleInteractiveClick = React.useCallback(
    (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
      const target = e.target;

      if (!(target instanceof HTMLElement)) return;

      const targetTagName = target.tagName.toLowerCase();

      if (!NON_INTERACTIVE_TAGS.includes(targetTagName)) {
        onClick(e);
      }
    },
    [onClick]
  );

  return {
    handleInteractiveClick,
  };
};
