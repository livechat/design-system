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
import { Card } from '../Card';
import { Icon } from '../Icon';

import { ListItem } from './ListItem';

import './ListItem.css';

export default {
  title: 'Components/ListItem',
  component: ListItem,
  parameters: {
    chromatic: { delay: 300 },
  },
};

const defaultOptions = [
  {
    key: 'one',
    element: <ListItem>Simple Item 1</ListItem>,
    onClick: noop,
  },
  {
    key: 'two',
    element: (
      <ListItem
        leftNode={<Icon source={ContentCopy} />}
        rightNode={<Icon source={CloseCircle} />}
      >
        Complex Item 2
      </ListItem>
    ),
    onClick: noop,
  },
];

const warningOptions = [
  {
    key: 'one',
    element: <ListItem kind="warning">Simple Item 1</ListItem>,
    onClick: noop,
  },
  {
    key: 'two',
    element: (
      <ListItem
        kind="warning"
        leftNode={<Icon source={ContentCopy} />}
        rightNode={<Icon source={CloseCircle} />}
      >
        Complex Item 2
      </ListItem>
    ),
    onClick: noop,
  },
];
export const Default = (): ReactElement => {
  return (
    <div style={{ height: customHeightForChromatic('1000px') }}>
      <div className="list-item-preview">
        <ListItem
          leftNode={<Icon source={ContentCopy} />}
          rightNode={<Icon source={CloseCircle} />}
        >
          List Item
        </ListItem>
      </div>
    </div>
  );
};

export const CardList = (): ReactElement => {
  return (
    <div style={{ height: customHeightForChromatic('1000px'), width: '300px' }}>
      <Card>
        <ListItem
          leftNode={<Icon source={ContentCopy} />}
          rightNode={<Icon source={CloseCircle} />}
        >
          List Item 1
        </ListItem>
        <ListItem leftNode={<Icon source={ContentCopy} />}>
          List Item 2
        </ListItem>
      </Card>
    </div>
  );
};

export const WithActionMenu = (): ReactElement => {
  return (
    <div style={{ height: customHeightForChromatic('1000px') }}>
      <div className="list-item-preview">
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

export const WithActionMenuWarningKind = (): ReactElement => {
  return (
    <div style={{ height: customHeightForChromatic('1000px') }}>
      <div className="list-item-preview">
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
