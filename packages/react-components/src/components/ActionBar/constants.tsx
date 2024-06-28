import {
  AccountCircle,
  AddTemplate,
  Adjust,
  Apps,
  Calendar,
  Contact,
} from '@livechat/design-system-icons';

import { Icon } from '../Icon';

import { IActionBarOption } from './types';

export const getDefaultOptions = (
  onClickHandler: (key: string) => void
): IActionBarOption[] => [
  {
    key: 'one',
    element: <Icon source={AccountCircle} kind="primary" />,
    label: 'One test',
    showTooltip: true,
    onClick: () => onClickHandler('one'),
  },
  {
    key: 'two',
    element: <Icon source={AddTemplate} kind="primary" />,
    label: 'Two test',
    showTooltip: true,
    onClick: () => onClickHandler('two'),
  },
  {
    key: 'three',
    element: <Icon source={Adjust} kind="primary" />,
    label: 'Three test',
    showTooltip: true,
    onClick: () => onClickHandler('three'),
  },
  {
    key: 'four',
    element: <Icon source={Apps} kind="primary" />,
    label: 'Four test',
    showTooltip: true,
    onClick: () => onClickHandler('four'),
  },
  {
    key: 'five',
    element: <Icon source={Calendar} kind="primary" />,
    label: 'Five test',
    showTooltip: true,
    onClick: () => onClickHandler('five'),
  },
  {
    key: 'six',
    element: <Icon source={Contact} kind="primary" />,
    label: 'Six test',
    showTooltip: true,
    onClick: () => onClickHandler('six'),
  },
];
