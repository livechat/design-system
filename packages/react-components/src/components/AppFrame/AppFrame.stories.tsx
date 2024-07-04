import * as React from 'react';

import * as Icons from '@livechat/design-system-icons';

import { Badge } from '../Badge';
import { Icon } from '../Icon';
import { Tag } from '../Tag';

import { AppFrame } from './AppFrame';
import { SubNavBar } from './components/SubNavBar';
import { SubNavBarListItem } from './components/SubNavBarListItem';

export default {
  title: 'Components/AppFrame',
  component: AppFrame,
};

const getOptions = (handler: (o: string) => void) => [
  {
    key: 'main',
    label: 'Main',
    disableTooltip: true,
    icon: <Icon source={Icons.AccountCircleFilled} />,
    onClick: () => handler('main'),
  },
  {
    key: 'secondary',
    label: 'Secondary',
    icon: <Icon source={Icons.AppsFilled} />,
    onClick: () => handler('secondary'),
  },
  {
    key: 'tertiary',
    label: 'Tertiary',
    icon: <Icon source={Icons.ChatDotsFilled} />,
    onClick: () => handler('tertiary'),
  },
];

const getMainSubMenu = (
  activeSubItem: number,
  handler: (o: number) => void
) => (
  <SubNavBar noGaps title="Options list simple">
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

const getSecondarySubMenu = (
  activeSubItem: number,
  handler: (o: number) => void
) => (
  <SubNavBar noGaps title="Options list with elements">
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

export const Default = (): React.ReactElement => {
  const [activeItem, setActiveItem] = React.useState('main');
  const [activeSubItem, setActiveSubItem] = React.useState(0);

  const getSubNav = () => {
    switch (activeItem) {
      case 'main':
        return getMainSubMenu(activeSubItem, setActiveSubItem);
      case 'secondary':
        return getSecondarySubMenu(activeSubItem, setActiveSubItem);
      case 'tertiary':
        return null;
      default:
        return null;
    }
  };

  return (
    <div style={{ width: 800, height: 700 }}>
      <AppFrame
        activeOptionKey={activeItem}
        navBarOptions={getOptions(setActiveItem)}
        subNavBar={getSubNav()}
        topBarNode={
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
        }
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <h1>App content</h1>
        </div>
      </AppFrame>
    </div>
  );
};
