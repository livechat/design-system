import * as React from 'react';

import { Icon } from '@livechat/design-system-icons';

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
      element: <Icon set="tabler" name="AccountCircle" kind="primary" />,
      label: 'One test',
      onClick: () => setActiveKey('one'),
    },
    {
      key: 'two',
      element: <Icon set="tabler" name="AddTemplate" kind="primary" />,
      label: 'Two test',
      onClick: () => setActiveKey('two'),
    },
    {
      key: 'three',
      element: <Icon set="tabler" name="Adjust" kind="primary" />,
      label: 'Three test',
      onClick: () => setActiveKey('three'),
    },
    {
      key: 'four',
      element: <Icon set="tabler" name="Apps" kind="primary" />,
      label: 'Four test',
      onClick: () => setActiveKey('four'),
    },
    {
      key: 'five',
      element: <Icon set="tabler" name="Calendar" kind="primary" />,
      label: 'Five test',
      onClick: () => setActiveKey('five'),
    },
    {
      key: 'six',
      element: <Icon set="tabler" name="Contact" kind="primary" />,
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
