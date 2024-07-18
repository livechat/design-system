import * as React from 'react';

import * as Icons from '@livechat/design-system-icons';

import { useAppFrame } from '../../providers/AppFrameProvider';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Tag } from '../Tag';
import { Tooltip } from '../Tooltip';
import { Heading, Text } from '../Typography';

import {
  SideNavigation,
  SideNavigationItem,
  SideNavigationGroup,
} from './components';

interface ExampleAppContentProps {
  showToggle: boolean;
  topBarVisible: boolean;
  handleTopBarButtonClick: () => void;
}

export const ExampleAppContent: React.FC<ExampleAppContentProps> = ({
  showToggle,
  topBarVisible,
  handleTopBarButtonClick,
}) => {
  const { isSideNavigationVisible, toggleSideNavigationVisibility } =
    useAppFrame();

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      <Heading size="lg">App content</Heading>
      {showToggle && (
        <>
          <Text>Set sub-navigation visibility</Text>
          <Button onClick={toggleSideNavigationVisibility}>
            {isSideNavigationVisible ? 'Visible' : 'Hidden'}
          </Button>
        </>
      )}
      <>
        <Text>Set top-bar visibility</Text>
        <Button onClick={handleTopBarButtonClick}>
          {topBarVisible ? 'Close' : 'Open'}
        </Button>
      </>
    </div>
  );
};

export const ExampleTopBar: React.FC = () => (
  <div
    style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
    }}
  >
    <h3>Top bar node</h3>
  </div>
);

export const getBadgeContent = (item: string) => {
  switch (item) {
    case 'chats':
      return 5;
    case 'engage':
      return 'dot';
    case 'archives':
      return 'alert';
    default:
      return undefined;
  }
};

export const getChatsMenu = (
  activeSubItem: number,
  handler: (o: number) => void
) => (
  <SideNavigation noGaps title="Chats">
    <SideNavigationItem
      label="Option 1"
      shouldKeepIconSpace={false}
      isActive={activeSubItem === 0}
      onClick={() => handler(0)}
    />
    <SideNavigationItem
      label="Option 2"
      shouldKeepIconSpace={false}
      isActive={activeSubItem === 1}
      onClick={() => handler(1)}
    />
    <SideNavigationItem
      label="Option 3"
      shouldKeepIconSpace={false}
      isActive={activeSubItem === 2}
      onClick={() => handler(2)}
    />
    <SideNavigationItem
      label="Option 4"
      shouldKeepIconSpace={false}
      isActive={activeSubItem === 3}
      onClick={() => handler(3)}
    />
  </SideNavigation>
);

const getCustomLabel = (label: string, component: React.ReactNode) => (
  <span
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 8,
    }}
  >
    {label} {component}
  </span>
);

export const getEngageSubMenu = (
  activeSubItem: number,
  handler: (o: number) => void
) => (
  <SideNavigation noGaps title="Engage">
    <SideNavigationItem
      label={getCustomLabel('Option 1', <Badge count={1} size="compact" />)}
      leftNode={
        <Tooltip
          placement="top-start"
          floatingStrategy="fixed"
          triggerRenderer={<Icon source={Icons.HelpFilled} size="small" />}
        >
          Option 1 custom tooltip
        </Tooltip>
      }
      rightNode={<Badge count={5} kind="tertiary" />}
      isActive={activeSubItem === 0}
      onClick={() => handler(0)}
    />
    <SideNavigationItem
      label={getCustomLabel('Option 2', <Badge type="alert" size="compact" />)}
      leftNode={
        <Tooltip
          placement="top-start"
          floatingStrategy="fixed"
          triggerRenderer={<Icon source={Icons.HelpFilled} size="small" />}
        >
          Option 2 custom tooltip
        </Tooltip>
      }
      rightNode={<Badge kind="tertiary" />}
      isActive={activeSubItem === 1}
      onClick={() => handler(1)}
    />
    <SideNavigationItem
      label={getCustomLabel('Option 3', <Badge type="dot" size="compact" />)}
      leftNode={
        <Tooltip
          placement="top-start"
          floatingStrategy="fixed"
          triggerRenderer={<Icon source={Icons.HelpFilled} size="small" />}
        >
          Option 3 custom tooltip
        </Tooltip>
      }
      rightNode={<Tag size="small">NEW</Tag>}
      isActive={activeSubItem === 2}
      onClick={() => handler(2)}
    />
  </SideNavigation>
);

export const getArchivesSubMenu = (
  activeSubItem: number,
  handler: (o: number) => void
) => (
  <SideNavigation noGaps title="Archives" customFooter={<h3>Custom footer</h3>}>
    <SideNavigationGroup label="Group 1 (non collapsible)">
      <SideNavigationItem
        label="Option 1"
        isActive={activeSubItem === 0}
        onClick={() => handler(0)}
        shouldKeepIconSpace={false}
      />
      <SideNavigationItem
        label="Option 2"
        isActive={activeSubItem === 1}
        onClick={() => handler(1)}
        shouldKeepIconSpace={false}
      />
      <SideNavigationItem
        label="Option 3"
        isActive={activeSubItem === 2}
        onClick={() => handler(2)}
        shouldKeepIconSpace={false}
      />
      <SideNavigationItem
        label="Option 4"
        isActive={activeSubItem === 3}
        onClick={() => handler(3)}
        shouldKeepIconSpace={false}
      />
    </SideNavigationGroup>
    <SideNavigationGroup isCollapsible label="Group 2">
      <SideNavigationItem
        label={getCustomLabel('Option 5', <Badge count={1} size="compact" />)}
        leftNode={
          <Tooltip
            placement="top-start"
            floatingStrategy="fixed"
            triggerRenderer={<Icon source={Icons.HelpFilled} size="small" />}
          >
            Option 5 custom tooltip
          </Tooltip>
        }
        rightNode={<Badge count={5} kind="tertiary" />}
        isActive={activeSubItem === 4}
        onClick={() => handler(4)}
      />
      <SideNavigationItem
        label={getCustomLabel(
          'Option 6',
          <Badge type="alert" size="compact" />
        )}
        leftNode={
          <Tooltip
            placement="top-start"
            floatingStrategy="fixed"
            triggerRenderer={<Icon source={Icons.HelpFilled} size="small" />}
          >
            Option 6 custom tooltip
          </Tooltip>
        }
        rightNode={<Badge kind="tertiary" />}
        isActive={activeSubItem === 5}
        onClick={() => handler(5)}
      />
      <SideNavigationItem
        label={getCustomLabel('Option 7', <Badge type="dot" size="compact" />)}
        leftNode={
          <Tooltip
            placement="top-start"
            floatingStrategy="fixed"
            triggerRenderer={<Icon source={Icons.HelpFilled} size="small" />}
          >
            Option 7 custom tooltip
          </Tooltip>
        }
        rightNode={<Tag size="small">NEW</Tag>}
        isActive={activeSubItem === 6}
        onClick={() => handler(6)}
      />
    </SideNavigationGroup>
    <SideNavigationGroup isCollapsible label="Group 3">
      <SideNavigationItem
        label="Option 8"
        isActive={activeSubItem === 7}
        onClick={() => handler(7)}
      />
      <SideNavigationItem
        label="Option 9"
        isActive={activeSubItem === 8}
        onClick={() => handler(8)}
      />
      <SideNavigationItem
        label="Option 10"
        isActive={activeSubItem === 9}
        onClick={() => handler(9)}
      />
      <SideNavigationItem
        label="Option 11"
        isActive={activeSubItem === 10}
        onClick={() => handler(10)}
      />
      <SideNavigationItem
        label="Option 12"
        isActive={activeSubItem === 11}
        onClick={() => handler(11)}
      />
    </SideNavigationGroup>
    <SideNavigationItem
      label="Option 13 (not grouped)"
      isActive={activeSubItem === 12}
      onClick={() => handler(12)}
      shouldKeepIconSpace={false}
    />
    <SideNavigationItem
      label="Option 14 (not grouped)"
      isActive={activeSubItem === 13}
      onClick={() => handler(13)}
      shouldKeepIconSpace={false}
    />
    <SideNavigationItem
      label="Option 15 (not grouped)"
      isActive={activeSubItem === 14}
      onClick={() => handler(14)}
      shouldKeepIconSpace={false}
    />
    <SideNavigationGroup isCollapsible label="Group 4">
      <SideNavigationItem
        label="Option 16"
        isActive={activeSubItem === 15}
        onClick={() => handler(15)}
      />
      <SideNavigationItem
        label="Option 17"
        isActive={activeSubItem === 16}
        onClick={() => handler(16)}
      />
      <SideNavigationItem
        label="Option 18"
        isActive={activeSubItem === 17}
        onClick={() => handler(17)}
      />
      <SideNavigationItem
        label="Option 19"
        isActive={activeSubItem === 18}
        onClick={() => handler(18)}
      />
      <SideNavigationItem
        label="Option 20"
        isActive={activeSubItem === 19}
        onClick={() => handler(19)}
      />
    </SideNavigationGroup>
  </SideNavigation>
);
