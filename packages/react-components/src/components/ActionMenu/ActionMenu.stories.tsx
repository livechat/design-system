import * as React from 'react';

import { MoreHoriz } from '@livechat/design-system-icons/react/tabler';

import { Icon } from '../Icon';
import { RadioButton } from '../RadioButton';
import { Switch } from '../Switch';

import { ActionMenu } from './ActionMenu';
import { ActionMenuItem } from './ActionMenuItem';
import { exampleOptions } from './constants';

import './ActionMenu.stories.css';

export default {
  title: 'Components/ActionMenu',
  component: ActionMenu,
  subcomponents: {
    ActionMenuItem,
  },
};

export const Default = (): React.ReactElement => (
  <div className="action-menu-preview">
    <ActionMenu
      options={exampleOptions}
      triggerRenderer={<Icon source={MoreHoriz} kind="primary" />}
      openedOnInit
    />
  </div>
);

export const KeepOpenOnItemClick = (): React.ReactElement => {
  const [checkboxValue, setCheckboxValue] = React.useState('one');
  const [switchOneValue, setSwitchOneValue] = React.useState(false);
  const [switchTwoValue, setSwitchTwoValue] = React.useState(false);

  return (
    <div className="action-menu-preview">
      <ActionMenu
        options={[
          {
            key: 'one',
            element: (
              <ActionMenuItem>
                <RadioButton checked={checkboxValue === 'one'}>
                  Radio label one
                </RadioButton>
              </ActionMenuItem>
            ),
            onClick: () => setCheckboxValue('one'),
          },
          {
            key: 'two',
            element: (
              <ActionMenuItem>
                <RadioButton checked={checkboxValue === 'two'}>
                  Radio label two
                </RadioButton>
              </ActionMenuItem>
            ),
            onClick: () => setCheckboxValue('two'),
          },
          {
            key: 'three',
            withDivider: true,
            element: (
              <ActionMenuItem
                rightNode={
                  <Switch on={switchOneValue} state="regular" size="medium" />
                }
              >
                Toggle label one
              </ActionMenuItem>
            ),
            onClick: () => setSwitchOneValue((s) => !s),
          },
          {
            key: 'four',
            withDivider: true,
            element: (
              <ActionMenuItem
                rightNode={
                  <Switch on={switchTwoValue} state="regular" size="medium" />
                }
              >
                Toggle label two
              </ActionMenuItem>
            ),
            onClick: () => setSwitchTwoValue((s) => !s),
          },
        ]}
        triggerRenderer={<Icon source={MoreHoriz} kind="primary" />}
        openedOnInit
        keepOpenOnClick
      />
    </div>
  );
};
