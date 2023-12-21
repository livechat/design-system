import { DayMode } from '@livechat/design-system-icons';

export const DEFAULT_PICKER_OPTIONS = [
  { key: 'one', name: 'Option one' },
  { key: 'two', name: 'Option two' },
  { key: 'three', name: 'Option three' },
  { key: 'four', name: 'Option four' },
  { key: 'five', name: 'Option five' },
  { key: 'six', name: 'Option six' },
  { key: 'seven', name: 'Option seven' },
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
