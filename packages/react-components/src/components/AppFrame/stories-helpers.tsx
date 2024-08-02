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
}

export const ExampleAppContent: React.FC<ExampleAppContentProps> = ({
  showToggle,
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
    </div>
  );
};

export const ExampleTopBar: React.FC = () => (
  <div className="example-top-bar">
    <div className="alert">Example top bar element</div>
    <span>Example top bar element</span>
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

const getSimpleNavElements = (
  activeSubItem: number,
  handler: (o: number) => void
) =>
  [...Array(4)].map((_, index) => (
    <SideNavigationItem
      key={index}
      label={`Option ${index + 1} ${
        index === 3 ? 'with very long label name' : ''
      }`}
      shouldKeepIconSpace={false}
      isActive={activeSubItem === index}
      onClick={() => handler(index)}
    />
  ));

export const getChatsMenu = (
  activeSubItem: number,
  handler: (o: number) => void
) => (
  <SideNavigation noGaps title="Chats">
    {getSimpleNavElements(activeSubItem, handler)}
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

const getCustomLabelElement = (index: number) => {
  switch (index) {
    case 5:
      return <Badge count={1} size="compact" />;
    case 6:
      return <Badge type="alert" size="compact" />;
    case 7:
      return <Badge type="dot" size="compact" />;
    default:
      return null;
  }
};

const getLabelRightNode = (index: number) => {
  switch (index) {
    case 5:
      return <Badge count={5} kind="tertiary" />;
    case 6:
      return <Badge kind="tertiary" />;
    case 7:
      return <Tag size="small">NEW</Tag>;
    default:
      return null;
  }
};

const getAdvancedNavElements = (
  activeSubItem: number,
  handler: (o: number) => void
) =>
  [...Array(3)].map((_, index) => (
    <SideNavigationItem
      label={getCustomLabel(
        `Option ${index + 5}`,
        getCustomLabelElement(index + 5)
      )}
      leftNode={
        <Tooltip
          placement="top-start"
          floatingStrategy="fixed"
          triggerRenderer={<Icon source={Icons.HelpFilled} size="small" />}
        >
          {`Option ${index + 5} custom tooltip`}
        </Tooltip>
      }
      rightNode={getLabelRightNode(index + 5)}
      isActive={activeSubItem === index + 5}
      onClick={() => handler(index + 5)}
    />
  ));

export const getEngageSubMenu = (
  activeSubItem: number,
  handler: (o: number) => void
) => (
  <SideNavigation noGaps title="Engage">
    {getAdvancedNavElements(activeSubItem, handler)}
  </SideNavigation>
);

export const getArchivesSubMenu = (
  activeSubItem: number,
  handler: (o: number) => void
) => (
  <SideNavigation noGaps title="Archives" customFooter={<h3>Custom footer</h3>}>
    <SideNavigationGroup
      label="Group 1 (non collapsible) with very long label name"
      rightNode={<Badge count={5} kind="tertiary" />}
    >
      {getSimpleNavElements(activeSubItem, handler)}
    </SideNavigationGroup>
    <SideNavigationGroup
      isCollapsible
      shouldOpenOnInit
      label="Group 2 with very long label name"
    >
      {getAdvancedNavElements(activeSubItem, handler)}
    </SideNavigationGroup>
    <SideNavigationGroup isCollapsible label="Group 3">
      {[...Array(5)].map((_, index) => (
        <SideNavigationItem
          key={index}
          label={`Option ${index + 8}`}
          isActive={activeSubItem === index + 8}
          onClick={() => handler(index + 8)}
        />
      ))}
    </SideNavigationGroup>
    {[...Array(3)].map((_, index) => (
      <SideNavigationItem
        key={index}
        label={`Option ${index + 13} (not grouped)`}
        isActive={activeSubItem === index + 13}
        onClick={() => handler(index + 13)}
        shouldKeepIconSpace={false}
      />
    ))}
    <SideNavigationGroup isCollapsible shouldOpenOnInit label="Group 4">
      {[...Array(5)].map((_, index) => (
        <SideNavigationItem
          key={index}
          label={`Option ${index + 16}`}
          isActive={activeSubItem === index + 16}
          onClick={() => handler(index + 16)}
        />
      ))}
    </SideNavigationGroup>
  </SideNavigation>
);
