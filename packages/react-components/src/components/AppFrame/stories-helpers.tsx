import * as React from 'react';

import * as Icons from '@livechat/design-system-icons';

import { useAppFrame } from '../../providers/AppFrameProvider';
import { Badge } from '../Badge';
import { Button } from '../Button';
import { Icon } from '../Icon';
import { Tag } from '../Tag';
import { Heading, Text } from '../Typography';

import { SubNavBar, SubNavBarList, SubNavBarListItem } from './components';
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
  const { isSubNavBarVisible, toggleSubNavBarVisibility } = useAppFrame();

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
          <Button onClick={toggleSubNavBarVisibility}>
            {isSubNavBarVisible ? 'Visible' : 'Hidden'}
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

export const getChatsMenu = (
  activeSubItem: number,
  handler: (o: number) => void
) => (
  <SubNavBar noGaps title="Simple list">
    <SubNavBarListItem
      label="Option 1"
      shouldKeepIconSpace={false}
      isActive={activeSubItem === 0}
      onClick={() => handler(0)}
    />
    <SubNavBarListItem
      label="Option 2"
      shouldKeepIconSpace={false}
      isActive={activeSubItem === 1}
      onClick={() => handler(1)}
    />
    <SubNavBarListItem
      label="Option 3"
      shouldKeepIconSpace={false}
      isActive={activeSubItem === 2}
      onClick={() => handler(2)}
    />
    <SubNavBarListItem
      label="Option 4"
      shouldKeepIconSpace={false}
      isActive={activeSubItem === 3}
      onClick={() => handler(3)}
    />
  </SubNavBar>
);

export const getEngageSubMenu = (
  activeSubItem: number,
  handler: (o: number) => void
) => (
  <SubNavBar noGaps title="List of options with additional elements">
    <SubNavBarListItem
      label="Option 1"
      icon={<Icon source={Icons.HelpFilled} size="small" />}
      rightNode={<Badge count={5} />}
      isActive={activeSubItem === 0}
      onClick={() => handler(0)}
    />
    <SubNavBarListItem
      label="Option 2"
      icon={<Icon source={Icons.ErrorFilled} size="small" />}
      rightNode={<Badge kind="tertiary" />}
      isActive={activeSubItem === 1}
      onClick={() => handler(1)}
    />
    <SubNavBarListItem
      label="Option 3"
      icon={<Icon source={Icons.CloseCircleFilled} size="small" />}
      rightNode={<Tag size="small">NEW</Tag>}
      isActive={activeSubItem === 2}
      onClick={() => handler(2)}
    />
  </SubNavBar>
);

export const getArchivesSubMenu = (
  activeSubItem: number,
  handler: (o: number) => void
) => (
  <SubNavBar noGaps title="Options with collapsable list">
    <SubNavBarList isCollapsible label="Simple">
      <SubNavBarListItem
        label="Option 1"
        isActive={activeSubItem === 0}
        onClick={() => handler(0)}
      />
      <SubNavBarListItem
        label="Option 2"
        isActive={activeSubItem === 1}
        onClick={() => handler(1)}
      />
      <SubNavBarListItem
        label="Option 3"
        isActive={activeSubItem === 2}
        onClick={() => handler(2)}
      />
      <SubNavBarListItem
        label="Option 4"
        isActive={activeSubItem === 3}
        onClick={() => handler(3)}
      />
    </SubNavBarList>
    <SubNavBarList isCollapsible label="With elements">
      <SubNavBarListItem
        label="Option 5"
        icon={<Icon source={Icons.HelpFilled} size="small" />}
        rightNode={<Badge count={5} />}
        isActive={activeSubItem === 4}
        onClick={() => handler(4)}
      />
      <SubNavBarListItem
        label="Option 6"
        icon={<Icon source={Icons.ErrorFilled} size="small" />}
        rightNode={<Badge kind="tertiary" />}
        isActive={activeSubItem === 5}
        onClick={() => handler(5)}
      />
      <SubNavBarListItem
        label="Option 7"
        icon={<Icon source={Icons.CloseCircleFilled} size="small" />}
        rightNode={<Tag size="small">NEW</Tag>}
        isActive={activeSubItem === 6}
        onClick={() => handler(6)}
      />
    </SubNavBarList>
    <SubNavBarList isCollapsible label="Collapsable">
      <SubNavBarListItem
        label="Option 8"
        isActive={activeSubItem === 7}
        onClick={() => handler(7)}
      />
      <SubNavBarListItem
        label="Option 9"
        isActive={activeSubItem === 8}
        onClick={() => handler(8)}
      />
      <SubNavBarListItem
        label="Option 10"
        isActive={activeSubItem === 9}
        onClick={() => handler(9)}
      />
      <SubNavBarListItem
        label="Option 11"
        isActive={activeSubItem === 10}
        onClick={() => handler(10)}
      />
      <SubNavBarListItem
        label="Option 12"
        isActive={activeSubItem === 11}
        onClick={() => handler(11)}
      />
    </SubNavBarList>
    <SubNavBarListItem
      label="Option 13"
      isMainEntry
      isActive={activeSubItem === 12}
      onClick={() => handler(12)}
    />
    <SubNavBarListItem
      label="Option 14"
      isMainEntry
      isActive={activeSubItem === 13}
      onClick={() => handler(13)}
    />
    <SubNavBarListItem
      label="Option 15"
      isMainEntry
      isActive={activeSubItem === 14}
      onClick={() => handler(14)}
    />
    <SubNavBarList isCollapsible label="Collapsable">
      <SubNavBarListItem
        label="Option 16"
        isActive={activeSubItem === 15}
        onClick={() => handler(15)}
      />
      <SubNavBarListItem
        label="Option 17"
        isActive={activeSubItem === 16}
        onClick={() => handler(16)}
      />
      <SubNavBarListItem
        label="Option 18"
        isActive={activeSubItem === 17}
        onClick={() => handler(17)}
      />
      <SubNavBarListItem
        label="Option 19"
        isActive={activeSubItem === 18}
        onClick={() => handler(18)}
      />
      <SubNavBarListItem
        label="Option 20"
        isActive={activeSubItem === 19}
        onClick={() => handler(19)}
      />
    </SubNavBarList>
  </SubNavBar>
);
