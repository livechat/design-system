export const StackingContextLevelToken = {
  Modal: '--modal',
  Tooltip: '--tooltip',
  Dropdown: '--dropdown',
  Popover: '--popover',
};

export type StackingContextLevelTokenKey =
  keyof typeof StackingContextLevelToken;
