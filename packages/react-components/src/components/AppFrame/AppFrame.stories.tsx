import * as React from 'react';

import * as Icons from '@livechat/design-system-icons';

import { Avatar } from '../Avatar';
import { Icon } from '../Icon';
import { ProductSwitcher, useProductSwitcher } from '../ProductSwitcher';
import { Tooltip } from '../Tooltip';

import { AppFrame } from './AppFrame';
import {
  Navigation,
  NavigationItem,
  NavigationGroup,
  SideNavigation,
  SideNavigationItem,
  SideNavigationGroup,
  NavigationTopBar,
  NavigationTopBarAlert,
  NavigationTopBarTitle,
} from './components';
import {
  ExampleAppContent,
  ExampleTopBar,
  getArchivesSubMenu,
  getBadgeContent,
  getChatsMenu,
  getEngageSubMenu,
} from './stories-helpers';

import './AppFrame.stories.css';

const defaultImage =
  'https://cdn-labs.livechat-files.com/api/file/lc/img/100019504/df59da4b5b0cdb6030efb08787fd255d.jpg';

export default {
  title: 'Components/AppFrame',
  component: AppFrame,
  parameters: {
    layout: 'fullscreen',
  },
  subcomponents: {
    Navigation,
    NavigationItem,
    NavigationGroup,
    SideNavigation,
    SideNavigationItem,
    SideNavigationGroup,
    NavigationTopBar,
    NavigationTopBarAlert,
    NavigationTopBarTitle,
  },
};

const navigationItems = [
  'home',
  'chats',
  'engage',
  'archives',
  'tickets',
  'team',
  'reports',
  'apps',
  'billing',
  'settings',
  'news',
];
const navigationItemsIcons = [
  Icons.LiveChatMono,
  Icons.Messages,
  Icons.Automation,
  Icons.Archives,
  Icons.Tickets,
  Icons.People,
  Icons.Report,
  Icons.Apps,
];
const secondaryNavigationIcons = [
  Icons.CreditCardOutline,
  Icons.Settings,
  Icons.Notifications,
];
const SectionsWithToggle = ['chats', 'engage', 'archives'];

export const Default = (): React.ReactElement => {
  const [activeItem, setActiveItem] = React.useState('archives');
  const [activeSubItem, setActiveSubItem] = React.useState(0);
  const [topBarVisible, setTopBarVisible] = React.useState(true);
  const [visibleAlerts, setVisibleAlerts] = React.useState<boolean[]>(
    Array(3).fill(false)
  );

  const { products } = useProductSwitcher({
    env: 'labs',
    installedProducts: [
      {
        product: 'ChatBot',
      },
      {
        product: 'HelpDesk',
      },
      {
        product: 'KnowledgeBase',
      },
      {
        product: 'LiveChat',
      },
      {
        product: 'OpenWidget',
      },
    ],
    organizationId: 'organizationId',
    subscriptions: {
      livechat: { status: 'active' },
      chatbot: { status: 'expired' },
    },
  });

  const getSubNav = () => {
    switch (activeItem) {
      case 'chats':
        return getChatsMenu(activeSubItem, setActiveSubItem);
      case 'engage':
        return getEngageSubMenu(activeSubItem, setActiveSubItem);
      case 'archives':
        return getArchivesSubMenu(activeSubItem, setActiveSubItem);
      default:
        return null;
    }
  };

  return (
    <AppFrame
      navigation={
        <Navigation>
          <NavigationGroup scrollable>
            <li className="lc-dark-theme product-switcher-height">
              <ProductSwitcher
                mainProductId="livechat"
                productOptions={products}
              />
            </li>
            {navigationItems.slice(0, 8).map((item, index) => (
              <NavigationItem
                key={item}
                id={item}
                label={item.charAt(0).toUpperCase() + item.slice(1)}
                icon={<Icon source={navigationItemsIcons[index]} />}
                onClick={(e, id) => {
                  e.preventDefault();
                  setActiveItem(id);
                }}
                isActive={activeItem === item}
                badge={getBadgeContent(item)}
              />
            ))}
          </NavigationGroup>
          <NavigationGroup>
            {navigationItems.slice(8, 11).map((item, index) => (
              <NavigationItem
                key={item}
                id={item}
                disabled={index % 2 === 0}
                label={item.charAt(0).toUpperCase() + item.slice(1)}
                icon={<Icon source={secondaryNavigationIcons[index]} />}
                onClick={(e, id) => {
                  e.preventDefault();
                  setActiveItem(id);
                }}
                isActive={activeItem === item}
              />
            ))}
            <NavigationItem
              id="user"
              disableOpacity
              icon={
                <Tooltip
                  floatingStrategy="fixed"
                  placement="right"
                  triggerRenderer={
                    <Avatar
                      className="avatar"
                      status="available"
                      type="image"
                      src={defaultImage}
                      alt="User avatar"
                    />
                  }
                >
                  Custom element with own tooltip (native nav tooltip is
                  disabled)
                </Tooltip>
              }
              onClick={(e) => e.preventDefault()}
            />
          </NavigationGroup>
        </Navigation>
      }
      sideNavigation={getSubNav()}
      topBar={
        topBarVisible && visibleAlerts.length > 0 ? (
          <ExampleTopBar
            topBarVisible={topBarVisible}
            visibleAlerts={visibleAlerts}
            setAlerts={setVisibleAlerts}
          />
        ) : null
      }
    >
      <ExampleAppContent
        showToggle={SectionsWithToggle.includes(activeItem)}
        alerts={visibleAlerts}
        setAlerts={setVisibleAlerts}
        topBarVisible={topBarVisible}
        setTopBarVisible={setTopBarVisible}
      />
    </AppFrame>
  );
};
