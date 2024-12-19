import { ReactElement } from 'react';

import {
  CloseCircle,
  ContentCopy,
  MoreHoriz,
} from '@livechat/design-system-icons';

import { customHeightForChromatic } from '../../utils/chromatic-story-helpers';
import noop from '../../utils/noop';
import { ActionMenu } from '../ActionMenu';
import { Button } from '../Button';
import { Icon } from '../Icon';

import { ActionMenuItem } from './ActionMenuItem';

import './ActionMenuItem.stories.css';

export default {
  title: 'Components/ActionMenuItem',
  component: ActionMenuItem,
  parameters: {
    chromatic: { delay: 300 },
  },
};

const defaultOptions = [
  {
    key: 'one',
    element: <ActionMenuItem>Simple Item 1</ActionMenuItem>,
    onClick: noop,
  },
  {
    key: 'two',
    element: (
      <ActionMenuItem
        leftNode={<Icon source={ContentCopy} />}
        rightNode={<Icon source={CloseCircle} />}
      >
        Complex Item 2
      </ActionMenuItem>
    ),
    onClick: noop,
  },
];

const warningOptions = [
  {
    key: 'one',
    element: <ActionMenuItem kind="warning">Simple Item 1</ActionMenuItem>,
    onClick: noop,
  },
  {
    key: 'two',
    element: (
      <ActionMenuItem
        kind="warning"
        leftNode={<Icon source={ContentCopy} />}
        rightNode={<Icon source={CloseCircle} />}
      >
        Complex Item 2
      </ActionMenuItem>
    ),
    onClick: noop,
  },
];
export const Default = (): ReactElement => {
  return (
    <div style={{ height: customHeightForChromatic('1000px') }}>
      <div className="action-menu-preview">
        <ActionMenu
          options={defaultOptions}
          triggerRenderer={
            <Button icon={<Icon source={MoreHoriz} kind="primary" />} />
          }
          openedOnInit
        />
      </div>
    </div>
  );
};

export const WarningKind = (): ReactElement => {
  return (
    <div style={{ height: customHeightForChromatic('1000px') }}>
      <div className="action-menu-preview">
        <ActionMenu
          options={warningOptions}
          triggerRenderer={
            <Button icon={<Icon source={MoreHoriz} kind="primary" />} />
          }
          openedOnInit
        />
      </div>
    </div>
  );
};
