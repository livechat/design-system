import * as React from 'react';

import { MoreHoriz } from '@livechat/design-system-icons/react/tabler';

import { Checkbox } from '../Checkbox';
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
      triggerClassName="action-menu-button"
      triggerRenderer={<Icon source={MoreHoriz} kind="primary" />}
      openedOnInit
    />
  </div>
);

export const KeepOpenOnItemClick = (): React.ReactElement => {
  const [radioButtonValue, setRadioButtonValue] = React.useState('one');
  const [switchOneValue, setSwitchOneValue] = React.useState(true);
  const [switchTwoValue, setSwitchTwoValue] = React.useState(false);
  const [checkboxOneValue, setCheckboxOneValue] = React.useState(true);
  const [checkboxTwoValue, setCheckboxTwoValue] = React.useState(true);

  return (
    <div className="action-menu-preview">
      <ActionMenu
        triggerClassName="action-menu-button"
        options={[
          {
            key: 'group-1',
            element: 'Group 1',
            groupHeader: true,
          },
          {
            key: 'one',
            element: (
              <ActionMenuItem>
                <RadioButton checked={radioButtonValue === 'one'}>
                  Radio label one
                </RadioButton>
              </ActionMenuItem>
            ),
            onClick: () => setRadioButtonValue('one'),
          },
          {
            key: 'two',
            element: (
              <ActionMenuItem>
                <RadioButton checked={radioButtonValue === 'two'}>
                  Radio label two
                </RadioButton>
              </ActionMenuItem>
            ),
            onClick: () => setRadioButtonValue('two'),
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
          {
            key: 'group-2',
            element: 'Group 2',
            groupHeader: true,
          },
          {
            key: 'five',
            element: (
              <ActionMenuItem
                leftNode={
                  <Checkbox checked={checkboxOneValue}>
                    Checkbox label one
                  </Checkbox>
                }
              />
            ),
            onClick: () => setCheckboxOneValue((s) => !s),
          },
          {
            key: 'six',
            element: (
              <ActionMenuItem
                leftNode={
                  <Checkbox checked={checkboxTwoValue}>
                    Checkbox label two
                  </Checkbox>
                }
              />
            ),
            onClick: () => setCheckboxTwoValue((s) => !s),
          },
        ]}
        triggerRenderer={<Icon source={MoreHoriz} kind="primary" />}
        openedOnInit
        keepOpenOnClick
      />
    </div>
  );
};
