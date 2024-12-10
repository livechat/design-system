import { DayMode } from '@livechat/design-system-icons';

import image from '../../stories/assets/avatar.jpg';
import { Icon } from '../Icon';
import { TagKind } from '../Tag';

import { IPickerListItem } from './types';

export const ITEM_GAP_HEIGHT = 2;
export const MIN_LIST_HEIGHT = 200;
export const DEFAULT_LIST_HEIGHT = 400;

export const CUSTOM_ITEMS: IPickerListItem[] = [
  {
    key: 'custom-option',
    name: 'Gradient 01',
    selectedTagOptions: {
      kind: 'gradient01' as TagKind,
    },
  },
  {
    key: 'custom-option-2',
    name: 'Gradient 02',
    selectedTagOptions: {
      kind: 'success' as TagKind,
    },
  },
  {
    key: 'custom-option-3',
    name: 'Cyan',
    selectedTagOptions: {
      kind: 'error' as TagKind,
      leftNode: <Icon source={DayMode} />,
    },
  },
];

export const DEFAULT_PICKER_OPTIONS: IPickerListItem[] = [
  { key: 'one', name: 'Option one' },
  { key: 'groupA', name: 'Group A title header', groupHeader: true },
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
  {
    key: 'groupB',
    name: 'Group B title header, longer than one line',
    groupHeader: true,
  },
  { key: 'four', name: 'Option four' },
  { key: 'five', name: 'Option five' },
  { key: 'six', name: 'Option six', disabled: true },
  { key: 'seven', name: 'Option seven', disabled: true },
];

export const DEFAULT_MORE_PICKER_OPTIONS: IPickerListItem[] = [
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
    avatarSrc: image,
  },
];

export const SELECT_ALL_OPTION_KEY = 'select-all';
