import * as React from 'react';

import { MoreHoriz, Add, Settings } from '@livechat/design-system-icons';

import { customHeightForChromatic } from '../../utils/chromatic-story-helpers';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Icon } from '../Icon';
import { ListItem } from '../ListItem';
import { RadioButton } from '../RadioButton';
import { Switch } from '../Switch';

import { ActionMenu } from './ActionMenu';
import { exampleOptions } from './stories-constants';

import './ActionMenu.stories.css';

export default {
  title: 'Components/ActionMenu',
  component: ActionMenu,
  parameters: {
    chromatic: { delay: 300 },
  },
};

export const Default = (): React.ReactElement => {
  return (
    <div style={{ height: customHeightForChromatic('1000px') }}>
      <div className="action-menu-preview">
        <ActionMenu
          options={exampleOptions}
          triggerRenderer={
            <Button icon={<Icon source={MoreHoriz} kind="primary" />} />
          }
          openedOnInit
        />
      </div>
    </div>
  );
};

export const KeepOpenOnItemClick = (): React.ReactElement => {
  const [radioButtonValue, setRadioButtonValue] = React.useState('one');
  const [switchOneValue, setSwitchOneValue] = React.useState(true);
  const [switchTwoValue, setSwitchTwoValue] = React.useState(false);
  const [checkboxOneValue, setCheckboxOneValue] = React.useState(true);
  const [checkboxTwoValue, setCheckboxTwoValue] = React.useState(true);

  return (
    <div className="action-menu-preview">
      <ActionMenu
        options={[
          {
            key: 'group-1',
            element: 'Group 1',
            groupHeader: true,
          },
          {
            key: 'one',
            element: (
              <ListItem>
                <RadioButton checked={radioButtonValue === 'one'}>
                  Radio label one
                </RadioButton>
              </ListItem>
            ),
            onClick: () => setRadioButtonValue('one'),
          },
          {
            key: 'two',
            withDivider: true,
            element: (
              <ListItem>
                <RadioButton checked={radioButtonValue === 'two'}>
                  Radio label two
                </RadioButton>
              </ListItem>
            ),
            onClick: () => setRadioButtonValue('two'),
          },
          {
            key: 'three1',
            withDivider: true,
            element: (
              <ListItem
                rightNode={
                  <Switch on={switchOneValue} state="regular" size="medium" />
                }
              >
                Toggle label one
              </ListItem>
            ),
            onClick: () => setSwitchOneValue((s) => !s),
          },
          {
            key: 'four',
            element: (
              <ListItem
                rightNode={
                  <Switch on={switchTwoValue} state="regular" size="medium" />
                }
              >
                Toggle label two
              </ListItem>
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
              <ListItem
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
              <ListItem
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
        triggerRenderer={
          <Button icon={<Icon source={MoreHoriz} kind="primary" />} />
        }
        openedOnInit
        keepOpenOnClick
      />
    </div>
  );
};

export const WithSelectedOptions = (): React.ReactElement => {
  const [selectedOptions, setSelectedOptions] = React.useState(['one']);
  const handleSelectOption = (key: string) => {
    if (selectedOptions.includes(key)) {
      return setSelectedOptions((s) => s.filter((o) => o !== key));
    }

    return setSelectedOptions((s) => [...s, key]);
  };

  return (
    <div style={{ height: customHeightForChromatic('1000px') }}>
      <div className="action-menu-preview">
        <ActionMenu
          selectedOptions={selectedOptions}
          options={[
            {
              key: 'one',
              element: <ListItem>Option one</ListItem>,
              onClick: () => handleSelectOption('one'),
            },
            {
              key: 'two',
              element: <ListItem>Option two</ListItem>,
              onClick: () => handleSelectOption('two'),
            },
            {
              key: 'three',
              element: <ListItem>Option three</ListItem>,
              onClick: () => handleSelectOption('three'),
            },
          ]}
          triggerRenderer={
            <Button icon={<Icon source={MoreHoriz} kind="primary" />} />
          }
          openedOnInit
          keepOpenOnClick
        />
      </div>
    </div>
  );
};

export const WithFooter = (): React.ReactElement => {
  return (
    <div style={{ height: customHeightForChromatic('1000px') }}>
      <div className="action-menu-preview">
        <ActionMenu
          options={exampleOptions}
          triggerRenderer={
            <Button icon={<Icon source={MoreHoriz} kind="primary" />} />
          }
          openedOnInit
          footer={
            <>
              <Button icon={<Icon source={Add} />} kind="plain">
                New
              </Button>
              <Button icon={<Icon source={Settings} />} kind="text" />
            </>
          }
        />
      </div>
    </div>
  );
};
