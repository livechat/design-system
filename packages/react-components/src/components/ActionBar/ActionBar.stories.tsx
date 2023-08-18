import * as React from 'react';

import {
  AccountCircle,
  AddTemplate,
  Adjust,
  Apps,
  Calendar,
  Contact,
} from '@livechat/design-system-icons/react/tabler';

import noop from '../../utils/noop';
import { Icon } from '../Icon';

import { ActionBar } from './ActionBar';

const defaultOptions = [
  {
    key: 'one',
    element: <Icon source={AccountCircle} kind="primary" />,
    label: 'One test',
    onClick: noop,
  },
  {
    key: 'two',
    element: <Icon source={AddTemplate} kind="primary" />,
    label: 'Two test',
    onClick: noop,
  },
  {
    key: 'three',
    element: <Icon source={Adjust} kind="primary" />,
    label: 'Three test',
    onClick: noop,
  },
  {
    key: 'four',
    element: <Icon source={Apps} kind="primary" />,
    label: 'Four test',
    onClick: noop,
  },
  {
    key: 'five',
    element: <Icon source={Calendar} kind="primary" />,
    label: 'Five test',
    onClick: noop,
  },
  {
    key: 'six',
    element: <Icon source={Contact} kind="primary" />,
    label: 'Six test',
    onClick: noop,
  },
];

export default {
  title: 'Components/ActionBar',
  component: ActionBar,
};

export const Default = (): React.ReactElement => (
  <div style={{ width: 150, height: 300 }}>
    <ActionBar options={defaultOptions} />
  </div>
);
