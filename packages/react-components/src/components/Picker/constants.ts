import { DayMode } from '@livechat/design-system-icons';

export const ITEM_ROW_HEIGHT = 35;
export const ITEM_GAP_HEIGHT = 2;
export const ITEM_HEIGHT = ITEM_ROW_HEIGHT + ITEM_GAP_HEIGHT;
export const DEFAULT_LIST_HEIGHT = 400;

export const DEFAULT_PICKER_OPTIONS = [
  { key: 'groupA', name: 'Group A title header', groupHeader: true },
  { key: 'one', name: 'Option one' },
  { key: 'two', name: 'Option two' },
  { key: 'three', name: 'Option three' },
  { key: 'groupB', name: 'Group B title header', groupHeader: true },
  { key: 'four', name: 'Option four' },
  { key: 'five', name: 'Option five' },
  { key: 'six', name: 'Option six' },
  { key: 'seven', name: 'Option seven' },
  ...[...Array(100)].map((_, index) => ({
    key: `option${index + 8}`,
    name: `Option #${index + 8}`,
    disabled: index % 4 === 0,
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

export const DEFAULT_EXTENDED_OPTIONS = [
  { key: 'groupA', name: 'Group A title header', groupHeader: true },
  { key: 'one', name: 'Option one' },
  { key: 'two', name: 'Option two' },
  { key: 'three', name: 'Option three', disabled: true },
  { key: 'groupB', name: 'Group B title header', groupHeader: true },
  { key: 'four', name: 'Option four' },
  { key: 'five', name: 'Option five' },
  { key: 'six', name: 'Option six', disabled: true },
  { key: 'seven', name: 'Option seven', disabled: true },
];

export const DEFAULT_MORE_PICKER_OPTIONS = [
  {
    key: 'one',
    name: 'Option with 2 lines label',
    secondaryText: 'Secondary text',
  },
  { key: 'two', name: 'Option with checkbox', showCheckbox: true },
  { key: 'three', name: 'Option with icon', icon: DayMode },
  {
    key: 'four',
    name: 'Option with avatar',
    avatarSrc: 'https://avatars2.githubusercontent.com/u/29309941?s=88&v=4',
  },
];

export const SELECT_ALL_OPTION_KEY = 'select-all';
