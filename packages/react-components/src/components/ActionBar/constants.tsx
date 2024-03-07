import * as React from 'react';

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
    onClick: () => onClickHandler('one'),
  },
  {
    key: 'two',
    element: <Icon source={AddTemplate} kind="primary" />,
    label: 'Two test',
    onClick: () => onClickHandler('two'),
  },
  {
    key: 'three',
    element: <Icon source={Adjust} kind="primary" />,
    label: 'Three test',
    onClick: () => onClickHandler('three'),
  },
  {
    key: 'four',
    element: <Icon source={Apps} kind="primary" />,
    label: 'Four test',
    onClick: () => onClickHandler('four'),
  },
  {
    key: 'five',
    element: <Icon source={Calendar} kind="primary" />,
    label: 'Five test',
    onClick: () => onClickHandler('five'),
  },
  {
    key: 'six',
    element: <Icon source={Contact} kind="primary" />,
    label: 'Six test',
    onClick: () => onClickHandler('six'),
  },
];
