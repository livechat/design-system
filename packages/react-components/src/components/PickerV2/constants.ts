export const ITEM_HEIGHT = 37;

export const DEFAULT_PICKER_OPTIONS = [
  { key: 'groupA', name: 'Group A title header', groupHeader: true },
  { key: 'one', name: 'Option one' },
  { key: 'two', name: 'Option two' },
  { key: 'three', name: 'Option three', disabled: true },
  { key: 'groupB', name: 'Group B title header', groupHeader: true },
  { key: 'four', name: 'Option four' },
  { key: 'five', name: 'Option five' },
  { key: 'six', name: 'Option six', disabled: true },
  { key: 'seven', name: 'Option seven', disabled: true },
  ...[...Array(100)].map((_, index) => ({
    key: `option${index + 8}`,
    name: `Option #${index + 8}`,
  })),
];

export const SELECTED_OPTIONS = [
  { key: 'two', name: 'Option two' },
  { key: 'five', name: 'Option five' },
  {
    key: `option107`,
    name: `Option #107`,
  },
];
