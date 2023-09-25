import * as React from 'react';

import {
  AccountCircle,
  AddTemplate,
  Adjust,
  Apps,
  Calendar,
  Contact,
} from '@livechat/design-system-icons/react/tabler';

import { Icon } from '../Icon';

import { ActionBar } from './ActionBar';

export default {
  title: 'Experimental/ActionBar',
  component: ActionBar,
  parameters: {
    layout: 'centered',
  },
};

export const Default = (): React.ReactElement => {
  const [activeKey, setActiveKey] = React.useState<string | null>(null);

  const defaultOptions = [
    {
      key: 'one',
      element: <Icon source={AccountCircle} kind="primary" />,
      label: 'One test',
      onClick: () => setActiveKey('one'),
    },
    {
      key: 'two',
      element: <Icon source={AddTemplate} kind="primary" />,
      label: 'Two test',
      showTooltip: true,
      onClick: () => setActiveKey('two'),
    },
    {
      key: 'three',
      element: <Icon source={Adjust} kind="primary" />,
      label: 'Three test',
      howTooltip: true,
      onClick: () => setActiveKey('three'),
    },
    {
      key: 'four',
      element: <Icon source={Apps} kind="primary" />,
      label: 'Four test',
      onClick: () => setActiveKey('four'),
    },
    {
      key: 'five',
      element: <Icon source={Calendar} kind="primary" />,
      label: 'Five test',
      onClick: () => setActiveKey('five'),
    },
    {
      key: 'six',
      element: <Icon source={Contact} kind="primary" />,
      label: 'Six test',
      onClick: () => setActiveKey('six'),
    },
  ];

  return (
    <div style={{ width: 155, height: 300 }}>
      <ActionBar activeOptionKey={activeKey} options={defaultOptions} />
    </div>
  );
};
