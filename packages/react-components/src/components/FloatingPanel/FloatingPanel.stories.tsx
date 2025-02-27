import { ReactElement, useState } from 'react';

import * as Icons from '@livechat/design-system-icons';
import { Meta } from '@storybook/react';

import { AppFrame } from '../AppFrame';
import {
  Navigation,
  NavigationItem,
  NavigationGroup,
  ExpirationCounter,
  MobileNavigation,
} from '../AppFrame/components';
import {
  ExampleTopBar,
  getArchivesSubMenu,
  getBadgeContent,
  getChatsMenu,
  getEngageSubMenu,
} from '../AppFrame/stories-helpers';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Checkbox } from '../Checkbox';
import { Icon } from '../Icon';
import { ProductSwitcher, useProductSwitcher } from '../ProductSwitcher';
import { Tooltip } from '../Tooltip';

import { FloatingPanel } from './FloatingPanel';
import { ExampleAppContent } from './stories-helpers';

import './FloatingPanelStories.css';

export default {
  title: 'Components/FloatingPanel',
  component: FloatingPanel,
  parameters: {
    chromatic: { delay: 500 },
    layout: 'fullscreen',
  },
} as Meta<typeof FloatingPanel>;

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

const defaultImage =
  'https://cdn-labs.livechat-files.com/api/file/lc/img/100019504/df59da4b5b0cdb6030efb08787fd255d.jpg';

export const Example = (): ReactElement => {
  const [activeItem, setActiveItem] = useState('archives');
  const [activeSubItem, setActiveSubItem] = useState(0);
  const [topBarVisible] = useState(true);
  const [visibleAlert, setVisibleAlert] = useState<number | null>(0);
  const [isBottomBarVisisble, setIsBottomBarVisisble] = useState(true);
  const [isTopBarVisisble, setIsTopBarVisisble] = useState(false);
  const [isLeftBarVisisble, setIsLeftBarVisisble] = useState(false);
  const [isRightBarVisisble, setIsRightBarVisisble] = useState(false);

  const closePanels = () => {
    setIsBottomBarVisisble(false);
    setIsTopBarVisisble(false);
    setIsLeftBarVisisble(false);
    setIsRightBarVisisble(false);
  };

  const handleBarVisibilityChange = (kind: string) => {
    switch (kind) {
      case 'bottom':
        closePanels();
        setIsBottomBarVisisble(!isBottomBarVisisble);
        break;
      case 'top':
        closePanels();
        setIsTopBarVisisble(!isTopBarVisisble);
        break;
      case 'left':
        closePanels();
        setIsLeftBarVisisble(!isLeftBarVisisble);
        break;
      case 'right':
        closePanels();
        setIsRightBarVisisble(!isRightBarVisisble);
        break;
      default:
        break;
    }
  };

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
    mainProductId: 'livechat',
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
    <>
      <AppFrame
        navigation={
          <Navigation>
            <NavigationGroup scrollable>
              <li className="product-switcher-height">
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
              <ExpirationCounter
                id="expiration"
                daysLeft={7}
                onClick={(e, id) => {
                  e.preventDefault();
                  setActiveItem(id);
                }}
              />
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
        mobileNavigation={
          <MobileNavigation>
            {navigationItems.slice(0, 5).map((item, index) => (
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
          </MobileNavigation>
        }
        sideNavigation={getSubNav()}
        topBar={
          topBarVisible ? (
            <ExampleTopBar
              topBarVisible={topBarVisible}
              visibleAlert={visibleAlert}
              setVisibleAlert={setVisibleAlert}
            />
          ) : null
        }
      >
        <ExampleAppContent
          isBottomBarVisisble={isBottomBarVisisble}
          isTopBarVisisble={isTopBarVisisble}
          isLeftBarVisisble={isLeftBarVisisble}
          isRightBarVisisble={isRightBarVisisble}
          handleBarVisibilityChange={handleBarVisibilityChange}
        />
        <FloatingPanel isVisible={isBottomBarVisisble}>
          <div className="horizontal-panel">
            <Button kind="primary" onClick={() => {}}>
              Save
            </Button>
            <Button onClick={() => {}}>Cancel</Button>
          </div>
        </FloatingPanel>
        <FloatingPanel isVisible={isTopBarVisisble} placement="top">
          <div className="horizontal-panel">
            <Button kind="primary" onClick={() => {}}>
              Save
            </Button>
            <Button onClick={() => {}}>Cancel</Button>
          </div>
        </FloatingPanel>
        <FloatingPanel isVisible={isLeftBarVisisble} placement="left">
          <div className="vertical-panel">
            <Checkbox>Option 1</Checkbox>
            <Checkbox>Option 2</Checkbox>
            <Checkbox>Option 3</Checkbox>
            <Checkbox>Option 4</Checkbox>
            <Checkbox>Option 5</Checkbox>
          </div>
        </FloatingPanel>
        <FloatingPanel isVisible={isRightBarVisisble} placement="right">
          <div className="vertical-panel">
            <Checkbox>Option 1</Checkbox>
            <Checkbox>Option 2</Checkbox>
            <Checkbox>Option 3</Checkbox>
            <Checkbox>Option 4</Checkbox>
            <Checkbox>Option 5</Checkbox>
          </div>
        </FloatingPanel>
      </AppFrame>
    </>
  );
};
